'use client';

import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '@/lib/languageContext';
import { socialLinks } from '@/data/socialLinks';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { FacebookIcon } from '@/components/ui/SocialIcons';
import { ArrowUpRight } from 'lucide-react';

export function LatestSocialMedia() {
  const { dict } = useLanguage();
  const content = dict.latestSocialMedia;
  const facebook = socialLinks.find((item) => item.platform === 'facebook');

  // The Facebook plugin only renders correctly when its width matches the
  // container (allowed range 180-500px); a fixed 500px clips on phones.
  const embedRef = useRef<HTMLDivElement>(null);
  const [embedWidth, setEmbedWidth] = useState<number | null>(null);

  useEffect(() => {
    const element = embedRef.current;
    if (!element) return;
    const update = () => {
      const available = Math.floor(element.clientWidth);
      if (available <= 0) return;
      // Round down to 10px steps so small resizes do not reload the iframe.
      setEmbedWidth(Math.min(500, Math.max(180, Math.floor(available / 10) * 10)));
    };
    update();
    const observer = new ResizeObserver(update);
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const facebookCard = (
    <article className="rounded-2xl border border-[#E8E2D8] bg-[#F8F4ED] p-3 sm:p-4">
      <div className="flex items-center justify-between gap-4 border-b border-[#E8E2D8] pb-5">
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-[#F5660A]">
            <FacebookIcon size={22} aria-hidden="true" />
          </span>
          <h3 className="font-editorial text-xl sm:text-2xl font-bold text-[#151210]">{content.facebookTitle}</h3>
        </div>
        {facebook && (
          <a href={facebook.url} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-10 items-center gap-2 rounded-lg border border-[#E8E2D8] bg-white px-3 text-sm font-semibold text-[#151210] hover:border-[#F5660A] hover:text-[#F5660A] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F5660A]">
            <span className="hidden sm:inline">{content.openFacebook}</span>
            <span className="sm:hidden">{content.openProfile}</span>
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </a>
        )}
      </div>

      <div
        ref={embedRef}
        role="region"
        aria-label={content.facebookTitle}
        className="mt-5 flex justify-center overflow-hidden rounded-xl border border-[#E8E2D8] bg-white"
      >
        {facebook && embedWidth && (
          <iframe
            title={content.facebookTitle}
            src={`https://www.facebook.com/plugins/page.php?href=${encodeURIComponent(facebook.url)}&tabs=timeline&width=${embedWidth}&height=560&small_header=true&adapt_container_width=true&hide_cover=false&show_facepile=false`}
            width={embedWidth}
            height="560"
            className="block h-[560px] max-w-full"
            style={{ border: 'none', overflow: 'hidden' }}
            scrolling="no"
            loading="lazy"
            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
          />
        )}
      </div>

      {facebook && (
        <a href={facebook.url} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#F5660A] hover:text-[#D45300] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F5660A]">
          {content.viewAllFacebook}<ArrowUpRight className="h-4 w-4" aria-hidden="true" />
        </a>
      )}
    </article>
  );

  return (
    <section className="bg-white py-20 md:py-28 border-b border-[#E8E2D8]">
      <Container size="wide" className="px-2 sm:px-4 lg:px-6">
        <SectionHeading eyebrow={content.eyebrow} title={content.heading} description={content.description} />
        <div className="mx-auto max-w-[540px]">
          {facebookCard}
        </div>
      </Container>
    </section>
  );
}
