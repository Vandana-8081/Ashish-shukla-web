'use client';

import { useEffect, useRef, useState } from 'react';
import Script from 'next/script';
import { ArrowUpRight } from 'lucide-react';
import { useLanguage } from '@/lib/languageContext';
import { socialLinks } from '@/data/socialLinks';
import { XIcon } from '@/components/ui/SocialIcons';

type TwitterWindow = Window & { twttr?: { widgets?: { load: (element?: HTMLElement) => void } } };

const FALLBACK_AFTER_MS = 8000;

export function TwitterFeed() {
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
    renderTimeline();
    const timer = window.setTimeout(() => {
      if (!containerRef.current?.querySelector('iframe')) setFailed(true);
    }, FALLBACK_AFTER_MS);
    return () => window.clearTimeout(timer);
  }, []);

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
        <Script src="https://platform.twitter.com/widgets.js" strategy="lazyOnload" onReady={renderTimeline} />

        {failed ? (
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
            <a className="twitter-timeline" data-height="560" data-theme="light" data-lang={locale} href="https://twitter.com/Ashish4Shuka">
              Posts by @{profile.username}
            </a>
          </div>
        )}
      </div>

      <a href={profile.url} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#F5660A] hover:text-[#D45300] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F5660A]">
        {content.viewAllX}<ArrowUpRight className="h-4 w-4" aria-hidden="true" />
      </a>
    </article>
  );
}
