'use client';

import React from 'react';
import { useLanguage } from '@/lib/languageContext';
import { Container } from '@/components/ui/Container';
import { SocialLinksList } from '@/components/social/SocialLinks';

export function SocialSection() {
  const { dict } = useLanguage();

  return (
    <section className="bg-[#f89354] text-[#151210] py-20 md:py-28">
      <Container size="wide">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column */}
          <div className="lg:col-span-5 space-y-4">
            <div className="text-xs font-bold tracking-[0.2em] uppercase text-black/70">
              {dict.socialSection.eyebrow}
            </div>
            <h2 className="font-editorial text-4xl sm:text-5xl md:text-6xl font-bold text-[#151210] leading-[1.1] tracking-tight">
              {dict.socialSection.heading}
            </h2>
            <p className="text-base sm:text-lg text-black/80 leading-relaxed max-w-md pt-2">
              {dict.socialSection.description}
            </p>
          </div>

          {/* Right Column: Three Horizontal Rows */}
          <div className="lg:col-span-7">
            <SocialLinksList />
          </div>
        </div>
      </Container>
    </section>
  );
}
