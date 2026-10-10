import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Container } from '@/components/ui/Container';
import { BlogListing } from '@/components/blog/BlogListing';
import { blogCategories, getPublishedBlogArticles } from '@/data/blogs';
import type { Locale } from '@/types';

const pageCopy = {
  en: {
    title: 'BLOG',
    description: 'Articles and public information from Ashish Shukla.',
  },
  hi: {
    title: 'ब्लॉग',
    description: 'आशीष शुक्ला के लेख और जनसूचना।',
  },
} as const;

interface BlogPageProps {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ page?: string | string[]; q?: string | string[]; category?: string | string[] }>;
}

export async function generateMetadata({ params }: Pick<BlogPageProps, 'params'>): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale: Locale = rawLocale === 'hi' ? 'hi' : 'en';
  const copy = pageCopy[locale];
  return {
    title: copy.title,
    description: copy.description,
    alternates: { canonical: `/${locale}/blog`, languages: { en: '/en/blog', hi: '/hi/blog' } },
    openGraph: { type: 'website', title: copy.title, description: copy.description, url: `/${locale}/blog`, siteName: 'Ashish Shukla' },
  };
}

function firstParam(value?: string | string[]) {
  return Array.isArray(value) ? value[0] ?? '' : value ?? '';
}

function normalizeSearchText(value: string) {
  return value
    .normalize('NFKC')
    .toLocaleLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, ' ')
    .trim();
}

export default async function BlogPage({ params, searchParams }: BlogPageProps) {
  const [{ locale: rawLocale }, queryParams] = await Promise.all([params, searchParams]);
  if (rawLocale !== 'en' && rawLocale !== 'hi') notFound();
  const locale = rawLocale as Locale;
  const allArticles = getPublishedBlogArticles();
  // Draft-only categories should not be offered as filters because they can
  // never return a public article.
  const availableCategories = blogCategories.filter((item) =>
    allArticles.some((article) => article.categoryId === item.id),
  );
  const query = firstParam(queryParams.q).trim().slice(0, 120);
  const requestedCategory = firstParam(queryParams.category);
  const category = availableCategories.some((item) => item.id === requestedCategory) ? requestedCategory : '';
  const requestedPage = Number.parseInt(firstParam(queryParams.page), 10) || 1;
  // Treat each word as a search term so multi-word searches don't have to
  // appear as one exact, contiguous phrase in an article.
  const searchPhrase = normalizeSearchText(query);
  const searchTerms = searchPhrase.split(/\s+/).filter(Boolean);
  const filteredArticles = allArticles.filter((article) => {
    if (category && article.categoryId !== category) return false;
    if (!searchTerms.length) return true;
    // Search both translations and category metadata regardless of language.
    const content = normalizeSearchText([
      article.title.en, article.title.hi,
      article.excerpt.en, article.excerpt.hi,
      article.author.en, article.author.hi,
      ...availableCategories.filter((item) => item.id === article.categoryId).flatMap((item) => [item.name.en, item.name.hi]),
      ...article.sections.flatMap((section) => [
        section.heading.en, section.heading.hi,
        ...section.paragraphs.flatMap((paragraph) => [paragraph.en, paragraph.hi]),
      ]),
    ].join(' '));
    // Phrase matches are included; otherwise require each normalized word,
    // allowing punctuation and word order to differ from the article.
    return content.includes(searchPhrase) || searchTerms.every((term) => content.includes(term));
  });
  const pageSize = 5;
  const totalPages = Math.max(1, Math.ceil(filteredArticles.length / pageSize));
  const page = Math.max(1, Math.min(requestedPage, totalPages));
  const currentArticles = filteredArticles.slice((page - 1) * pageSize, page * pageSize);
  const copy = pageCopy[locale];

  return (
    <main data-site-motion-ignore className="min-h-[70vh] bg-[#FAF7F2] py-10 md:py-16">
      <Container size="wide">
        <header className="mb-10 max-w-3xl pb-7 md:mb-12">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-[#B84300]">{locale === 'hi' ? 'जनसूचना एवं विचार' : 'PUBLIC INFORMATION & PERSPECTIVES'}</p>
          <h1 className="font-editorial text-4xl font-bold tracking-wide text-[#171412] sm:text-5xl">{copy.title}</h1>
        </header>
        <BlogListing
          locale={locale}
          articles={currentArticles}
          recentArticles={allArticles.slice(0, 5)}
          categories={availableCategories}
          query={query}
          selectedCategory={category}
          page={page}
          totalPages={totalPages}
        />
      </Container>
    </main>
  );
}
