'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useLanguage } from '@/lib/languageContext';
import { biographyData } from '@/data/biography';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';

export function AboutPreview() {
  const { t, dict, getHref } = useLanguage();
  // Size the photo box to the image's own proportions so it is never cropped.
  const [photoRatio, setPhotoRatio] = useState(1);

  return (
    <section className="py-20 md:py-28 bg-white border-b border-[#E8E2D8]">
      <Container size="wide">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Authentic Photograph */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="relative">
              <div
                className="relative w-full rounded-2xl overflow-hidden bg-[#F8F4ED] border border-[#E8E2D8] shadow-sm"
                style={{ aspectRatio: photoRatio }}
              >
                <Image
                  src={biographyData.profileImage}
                  alt={dict.brand.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 40vw"
                  className="object-contain"
                  onLoad={(event) => {
                    const { naturalWidth, naturalHeight } = event.currentTarget;
                    if (naturalWidth && naturalHeight) setPhotoRatio(naturalWidth / naturalHeight);
                  }}
                />
              </div>

              {/* Decorative Accent Outline */}
              <div className="hidden sm:block absolute -bottom-4 -right-4 w-full h-full rounded-2xl border-2 border-[#F5660A]/30 -z-10" />
            </div>
          </div>

          {/* Right Column: Editorial Bio */}
          <div className="lg:col-span-7 order-1 lg:order-2 space-y-6">
            <div className="inline-flex items-center text-xs font-bold tracking-[0.2em] uppercase text-[#F5660A]">
              <span>{dict.aboutSection.eyebrow}</span>
            </div>

            <h2 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-bold text-[#151210] leading-tight">
              {dict.aboutSection.heading}
            </h2>

            {/* Blockquote */}
            <div className="border-l-2 border-[#F5660A] pl-5 py-1">
              <p className="font-editorial text-lg sm:text-xl italic text-[#171717] leading-relaxed">
                {t(biographyData.quote)}
              </p>
            </div>

            {/* Summary Paragraph */}
            <div className="space-y-4 text-base sm:text-lg text-[#6B625A] leading-relaxed">
              <p>{t(biographyData.paragraphs[0])}</p>
              <p>{t(biographyData.paragraphs[1])}</p>
            </div>

            {/* Core Values Minimal List */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-[#E8E2D8]">
              {biographyData.coreValues.map((item, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="text-sm font-bold text-[#151210] flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#F5660A]" />
                    <span>{t(item.title)}</span>
                  </div>
                  <p className="text-xs text-[#6B625A] leading-normal sm:line-clamp-2">
                    {t(item.description)}
                  </p>
                </div>
              ))}
            </div>

            <div className="pt-4">
              <Button href={getHref('/about')} variant="primary" icon="arrow">
                {dict.aboutSection.readFullButton}
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
