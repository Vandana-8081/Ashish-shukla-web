import { bhagwantNagarData } from '@/data/development';
import { idealsCategories } from '@/data/ideals';
import { photoGalleryData, videoGalleryData } from '@/data/media';
import { navigationItems } from '@/data/navigation';
import { socialLinks } from '@/data/socialLinks';
import { getDictionary } from '@/data/translations';
import { photographData } from '@/data/photographs';
import * as story from '@/data/story';
import * as story2 from '@/data/story2';
import * as ideas from '@/data/ideas';
import * as journeyStats from '@/data/journey-stats';
import type { Locale, LocalizedString } from '@/types';

export interface KnowledgeChunk {
  title: string;
  text: string;
}

const loc = (value: LocalizedString | undefined, locale: Locale) => (value ? value[locale] || value.en : '');

/** Always sent: short facts about the site itself. */
export function buildSiteOverview(locale: Locale): string {
  const pages = navigationItems.map((item) => `${loc(item.name, locale)} (${item.path})`).join(', ');
  const social = socialLinks.map((item) => `${item.label}: ${item.url}`).join('; ');
  const contact = getDictionary(locale).contactSection;
  const office = `${contact.officeTitle}: ${contact.officeLocationName}, ${contact.officeAddress}. ${contact.hoursTitle}: ${contact.hoursDesc}`;
  return `WEBSITE PAGES: ${pages}\nSOCIAL MEDIA: ${social}\nOFFICE: ${office}`;
}

/** Plain fields worth keeping alongside the localized text. */
const PLAIN_KEYS = new Set(['year', 'years', 'date', 'publishedAt', 'duration']);
const TITLE_KEYS = ['title', 'heading', 'name', 'eyebrow'];

function isLocalized(value: unknown): value is LocalizedString {
  return !!value && typeof value === 'object' && typeof (value as LocalizedString).en === 'string' && typeof (value as LocalizedString).hi === 'string';
}

/** Walks any data shape and gathers every localized string (plus a few plain fields) as readable text. */
function collectText(value: unknown, locale: Locale, out: string[] = []): string[] {
  if (isLocalized(value)) {
    const text = loc(value, locale).trim();
    if (text) out.push(text);
  } else if (Array.isArray(value)) {
    for (const item of value) collectText(item, locale, out);
  } else if (value && typeof value === 'object') {
    for (const [key, item] of Object.entries(value)) {
      if (typeof item === 'string' || typeof item === 'number') {
        if (PLAIN_KEYS.has(key) && String(item).trim()) out.push(String(item));
      } else {
        collectText(item, locale, out);
      }
    }
  }
  return out;
}

function titleOf(value: unknown, locale: Locale, fallback: string): string {
  if (value && typeof value === 'object') {
    for (const key of TITLE_KEYS) {
      const candidate = (value as Record<string, unknown>)[key];
      if (isLocalized(candidate) && loc(candidate, locale).trim()) return loc(candidate, locale).trim();
    }
  }
  return fallback;
}

/** One chunk per array item (articles, chapters, videos...) or one per object export. */
function chunksFromModule(moduleExports: Record<string, unknown>, locale: Locale): KnowledgeChunk[] {
  const chunks: KnowledgeChunk[] = [];
  for (const [exportName, value] of Object.entries(moduleExports)) {
    if (!value || typeof value !== 'object') continue;
    const entries = Array.isArray(value) ? value : [value];
    for (const entry of entries) {
      chunks.push({ title: titleOf(entry, locale, exportName), text: collectText(entry, locale).join(' ') });
    }
  }
  return chunks;
}

/** Searchable chunks for everything too large to send on every request. */
export function buildKnowledgeChunks(locale: Locale): KnowledgeChunk[] {
  const chunks: KnowledgeChunk[] = [];

  for (const category of idealsCategories) {
    for (const person of category.people) {
      chunks.push({
        title: `${loc(person.name, locale)} (${loc(category.title, locale)})`,
        text: [person.years ?? '', loc(person.description, locale), person.quotation ? (locale === 'hi' ? person.quotation.hi : person.quotation.en ?? person.quotation.hi) : ''].join(' '),
      });
    }
  }

  for (const photo of photoGalleryData) {
    chunks.push({ title: `${loc(photo.category, locale)} photo`, text: loc(photo.caption, locale) });
  }

  chunks.push({
    title: loc(bhagwantNagarData.heading, locale),
    text: [
      loc(bhagwantNagarData.intro, locale),
      ...bhagwantNagarData.pillars.map((pillar) => `${loc(pillar.title, locale)}: ${loc(pillar.description, locale)}`),
    ].join(' '),
  });

  chunks.push(
    ...chunksFromModule(story, locale),
    ...chunksFromModule(story2, locale),
    ...chunksFromModule(ideas, locale),
    ...chunksFromModule(journeyStats, locale),
    ...chunksFromModule({ videoGalleryData, photographData }, locale),
  );

  return chunks.filter((chunk) => chunk.text.trim());
}

const STOP_WORDS = new Set([
  'the', 'and', 'for', 'with', 'what', 'who', 'how', 'about', 'tell', 'him', 'his', 'her', 'are', 'was', 'does', 'did',
  'this', 'that', 'from', 'have', 'has', 'can', 'you', 'ashish', 'shukla', 'आशीष', 'शुक्ला', 'क्या', 'है', 'हैं', 'के', 'की', 'का', 'में', 'से', 'को', 'और', 'बारे', 'बताएं', 'बताओ',
]);

function tokenize(value: string): string[] {
  return (value.toLowerCase().match(/[\p{L}\p{M}\p{N}]+/gu) ?? []).filter((token) => token.length > 1 && !STOP_WORDS.has(token));
}

/** Picks the chunks that best match the question, within a character budget. */
export function selectRelevantChunks(chunks: KnowledgeChunk[], query: string, maxChars = 12000, maxChunks = 10): KnowledgeChunk[] {
  const queryTokens = Array.from(new Set(tokenize(query)));
  if (!queryTokens.length) return [];

  const scored = chunks.map((chunk) => {
    const title = chunk.title.toLowerCase();
    const text = chunk.text.toLowerCase();
    let score = 0;
    for (const token of queryTokens) {
      // Prefix of 5+ letters also matches simple word endings (e.g. road/roads, सड़क/सड़कों).
      const stem = token.length > 5 ? token.slice(0, token.length - 1) : token;
      if (title.includes(stem)) score += 3;
      if (text.includes(stem)) score += 1 + Math.min(text.split(stem).length - 1, 4) * 0.25;
    }
    return { chunk, score };
  }).filter((item) => item.score > 0).sort((a, b) => b.score - a.score);

  const picked: KnowledgeChunk[] = [];
  let used = 0;
  for (const { chunk } of scored) {
    if (picked.length >= maxChunks) break;
    const size = chunk.title.length + chunk.text.length;
    if (used + size > maxChars) {
      const room = maxChars - used - chunk.title.length;
      if (room > 400) picked.push({ title: chunk.title, text: chunk.text.slice(0, room) });
      break;
    }
    picked.push(chunk);
    used += size;
  }
  return picked;
}
