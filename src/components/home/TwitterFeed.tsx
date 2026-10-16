'use client';

import { useEffect, useRef, useState } from 'react';
import Script from 'next/script';
import { ArrowUpRight } from 'lucide-react';
import { useLanguage } from '@/lib/languageContext';
import { socialLinks } from '@/data/socialLinks';
import { XIcon } from '@/components/ui/SocialIcons';
import type { XPost } from '@/lib/xFeed';
import { xPostIds } from '@/data/xPosts';

type TwitterWindow = Window & { twttr?: { widgets?: { load: (element?: HTMLElement) => void } } };

const FALLBACK_AFTER_MS = 8000;
const URL_PATTERN = /(https?:\/\/[^\s]+)/g;

function linkify(text: string) {
  return text.split(URL_PATTERN).map((part, index) =>
    /^https?:\/\//.test(part) ? (
      <a key={index} href={part} target="_blank" rel="noopener noreferrer" className="break-all text-[#F5660A] hover:underline">
        {part}
      </a>
    ) : (
      part
    ),
  );
}

export function TwitterFeed({ posts }: { posts?: XPost[] | null }) {
  const { dict, locale } = useLanguage();
  const content = dict.latestSocialMedia;
  const profile = socialLinks.find((item) => item.platform === 'x');
  const containerRef = useRef<HTMLDivElement>(null);
  const [failed, setFailed] = useState(false);

  const renderTimeline = () => {
    const container = containerRef.current;
    if (container) (window as TwitterWindow).twttr?.widgets?.load(container);
  };

  // widgets.js may already be on the page (client-side navigation, language switch).
  useEffect(() => {
    if (posts) return;
    renderTimeline();
    const timer = window.setTimeout(() => {
      if (!containerRef.current?.querySelector('iframe')) setFailed(true);
    }, FALLBACK_AFTER_MS);
    return () => window.clearTimeout(timer);
  }, [posts]);

  if (!profile) return null;

  return (
    <article className="flex flex-col rounded-2xl border border-[#E8E2D8] bg-[#F8F4ED] p-3 sm:p-4">
      <div className="flex items-center justify-between gap-4 border-b border-[#E8E2D8] pb-5">
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-[#F5660A]">
            <XIcon size={22} aria-hidden="true" />
          </span>
          <h3 className="font-editorial text-xl sm:text-xl font-bold text-[#151210]">{content.xTitle}</h3>
        </div>
        <a href={profile.url} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-10 items-center gap-2 rounded-lg border border-[#E8E2D8] bg-white px-3 text-sm font-semibold text-[#151210] hover:border-[#F5660A] hover:text-[#F5660A] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F5660A]">
          <span className="hidden sm:inline">{content.openXProfile}</span>
          <span className="sm:hidden">{content.openProfile}</span>
          <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
        </a>
      </div>

      <div role="region" aria-label={content.xTitle} className="mt-5 min-h-[560px] overflow-hidden rounded-xl border border-[#E8E2D8] bg-white">
        {posts ? (
          <ul className="flex h-[560px] flex-col gap-3 overflow-y-auto bg-[#F8F4ED] p-3">
            {posts.map((post) => (
              <li key={post.id} className="rounded-xl border border-[#E8E2D8] bg-white p-4">
                {post.createdAt && (
                  <time dateTime={post.createdAt} className="text-xs font-semibold text-[#151210]/60">
                    {new Intl.DateTimeFormat(locale === 'hi' ? 'hi-IN' : 'en-IN', { dateStyle: 'medium' }).format(new Date(post.createdAt))}
                  </time>
                )}
                <p className="mt-2 whitespace-pre-line break-words text-sm leading-relaxed text-[#151210]">{linkify(post.text)}</p>
                {post.imageUrl && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={post.imageUrl} alt="" loading="lazy" className="mt-3 w-full rounded-lg object-cover" />
                )}
                <a
                  href={`${profile.url}/status/${post.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-[#F5660A] hover:text-[#D45300]"
                >
                  {content.viewOnX}
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        ) : failed ? (
          <div className="flex min-h-[560px] flex-col items-center justify-center gap-4 p-6 text-center">
            <p className="font-editorial text-xl font-bold text-[#151210]">{content.xFallbackText}</p>
            <a
              href={profile.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-10 items-center rounded-lg bg-[#F5660A] px-4 text-sm font-semibold text-white hover:bg-[#D45300]"
            >
              {content.followOnX}
            </a>
          </div>
        ) : (
          <div ref={containerRef}>
            {xPostIds.length > 0 ? (
              <div className="h-[560px] space-y-3 overflow-y-auto p-3">
                {xPostIds.map((id) => (
                  <blockquote key={id} className="twitter-tweet" data-theme="light" data-lang={locale} data-dnt="true">
                    <a href={`https://twitter.com/${profile.username}/status/${id}`}>{content.xLoading}</a>
                  </blockquote>
                ))}
              </div>
            ) : (
              <a className="twitter-timeline" data-height="560" data-theme="light" data-lang={locale} href="https://twitter.com/Ashish4Shuka">
                Posts by @{profile.username}
              </a>
            )}
          </div>
        )}
        {!posts && <Script src="https://platform.twitter.com/widgets.js" strategy="lazyOnload" onReady={renderTimeline} />}
      </div>

      <a href={profile.url} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#F5660A] hover:text-[#D45300] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F5660A]">
        {content.viewAllX}<ArrowUpRight className="h-4 w-4" aria-hidden="true" />
      </a>
    </article>
  );
}
