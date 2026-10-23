'use client';

import { ArrowUpRight, Images, Play } from 'lucide-react';
import { useLanguage } from '@/lib/languageContext';
import { socialLinks } from '@/data/socialLinks';
import { photoGalleryData } from '@/data/media';
import { InstagramIcon } from '@/components/ui/SocialIcons';
import type { SocialFeedResult } from '@/lib/socialFeeds';

const linkButton = 'inline-flex min-h-10 items-center gap-2 rounded-lg border border-[#E8E2D8] bg-white px-3 text-sm font-semibold text-[#151210] hover:border-[#F5660A] hover:text-[#F5660A] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F5660A]';

function CardShell({ children }: { children: React.ReactNode }) {
  const { dict } = useLanguage();
  const content = dict.latestSocialMedia;
  const profile = socialLinks.find((item) => item.platform === 'instagram');

  return (
    <article className="flex flex-col rounded-[28px] border border-[var(--line)] bg-[#fffdf8] p-3 sm:p-4 shadow-[var(--shadow-soft)]">
      <div className="flex items-center justify-between gap-4 border-b border-[#E8E2D8] pb-5">
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-[#F5660A]">
            <InstagramIcon size={22} aria-hidden="true" />
          </span>
          <h3 className="font-editorial text-xl font-bold text-[#151210]">{content.instagramTitle}</h3>
        </div>
        {profile && (
          <a href={profile.url} target="_blank" rel="noopener noreferrer" className={linkButton}>
            <span className="hidden sm:inline">{content.openInstagram}</span>
            <span className="sm:hidden">{content.openProfile}</span>
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </a>
        )}
      </div>

      <div role="region" aria-label={content.instagramTitle} className="mt-5 min-h-[560px] overflow-hidden rounded-xl border border-[#E8E2D8] bg-white">
        {children}
      </div>

      {profile && (
        <a href={profile.url} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#F5660A] hover:text-[#D45300] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F5660A]">
          {content.viewAllInstagram}<ArrowUpRight className="h-4 w-4" aria-hidden="true" />
        </a>
      )}
    </article>
  );
}

/** Shown while the server fetch is pending (Suspense fallback). */
export function InstagramFeedSkeleton() {
  const { dict } = useLanguage();
  return (
    <CardShell>
      <div role="status" aria-label={dict.latestSocialMedia.instagramLoading} className="grid grid-cols-2 gap-3 p-3">
        {Array.from({ length: 6 }, (_, index) => (
          <div key={index} className="aspect-square animate-pulse rounded-lg bg-[#F8F4ED]" />
        ))}
      </div>
    </CardShell>
  );
}

/**
 * Used when the API is not configured, failed, or returned nothing: Instagram's own
 * public profile embed (shows current posts, no token needed) plus a follow button.
 */
function FollowPrompt({ message }: { message: string }) {
  const { dict } = useLanguage();
  const content = dict.latestSocialMedia;
  const profile = socialLinks.find((item) => item.platform === 'instagram');

  if (profile) {
    return (
      <div className="flex min-h-[560px] flex-col">
        <ul className="grid flex-1 grid-cols-2 gap-1 overflow-y-auto bg-[#F8F4ED] p-2 sm:grid-cols-3">
          {photoGalleryData.slice(0, 6).map((photo) => (
            <li key={photo.id} className="overflow-hidden rounded-lg">
              <a href={profile.url} target="_blank" rel="noopener noreferrer" aria-label={photo.caption.en}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={photo.image} alt={photo.caption.en} loading="lazy" className="aspect-square w-full object-cover" />
              </a>
            </li>
          ))}
        </ul>
        <div className="flex flex-1 items-center justify-center border-t border-[#E8E2D8] p-3">
          <a
            href={profile.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-10 items-center rounded-lg bg-[#F5660A] px-4 text-sm font-semibold text-white hover:bg-[#D45300] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F5660A]"
          >
            {content.followOnInstagram}
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-[560px] flex-col items-center justify-center gap-4 p-6 text-center">
      <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F8F4ED] text-[#F5660A]">
        <InstagramIcon size={28} aria-hidden="true" />
      </span>
      <p className="font-editorial text-xl font-bold text-[#151210]">{content.instagramFollowText}</p>
      <p className="max-w-sm text-sm text-[#151210]/70">{message}</p>
      {profile && (
        <a
          href={profile.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-10 items-center rounded-lg bg-[#F5660A] px-4 text-sm font-semibold text-white hover:bg-[#D45300] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F5660A]"
        >
          {content.followOnInstagram}
        </a>
      )}
    </div>
  );
}

export function InstagramFeed({ result }: { result: SocialFeedResult }) {
  const { dict, locale } = useLanguage();
  const content = dict.latestSocialMedia;

  if (result.status === 'unconfigured') {
    return <CardShell><FollowPrompt message={content.instagramUnconfigured} /></CardShell>;
  }
  if (result.status === 'error') {
    return <CardShell><FollowPrompt message={content.feedError} /></CardShell>;
  }
  if (result.items.length === 0) {
    return <CardShell><FollowPrompt message={content.noInstagramPosts} /></CardShell>;
  }

  const formatter = new Intl.DateTimeFormat(locale === 'hi' ? 'hi-IN' : 'en-IN', { dateStyle: 'medium' });

  return (
    <CardShell>
      <ul className="grid max-h-[560px] grid-cols-2 gap-3 overflow-y-auto bg-[#F8F4ED] p-3 sm:grid-cols-3">
        {result.items.map((item) => (
          <li key={item.id} className="overflow-hidden rounded-xl border border-[#E8E2D8] bg-white">
            <a
              href={item.permalink}
              target="_blank"
              rel="noopener noreferrer"
              className="group block focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F5660A]"
              aria-label={`${content.viewOriginal}${item.caption ? `: ${item.caption.slice(0, 80)}` : ''}`}
            >
              <div className="relative aspect-square bg-[#F8F4ED]">
                {item.thumbnailUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={item.thumbnailUrl} alt="" loading="lazy" referrerPolicy="no-referrer" className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />
                ) : (
                  <span className="flex h-full w-full items-center justify-center text-[#F5660A]">
                    <InstagramIcon size={32} aria-hidden="true" />
                  </span>
                )}
                {item.mediaType === 'video' && (
                  <span className="absolute right-2 top-2 rounded-full bg-black/60 p-1.5 text-white"><Play className="h-3.5 w-3.5" aria-hidden="true" /></span>
                )}
                {item.mediaType === 'carousel' && (
                  <span className="absolute right-2 top-2 rounded-full bg-black/60 p-1.5 text-white"><Images className="h-3.5 w-3.5" aria-hidden="true" /></span>
                )}
              </div>
              <div className="p-2.5">
                {item.publishedAt && (
                  <time dateTime={item.publishedAt} className="text-xs font-semibold text-[#151210]/60">
                    {formatter.format(new Date(item.publishedAt))}
                  </time>
                )}
                {item.caption && <p className="mt-1 line-clamp-2 break-words text-xs leading-relaxed text-[#151210]">{item.caption}</p>}
              </div>
            </a>
          </li>
        ))}
      </ul>
    </CardShell>
  );
}
