'use client';

import React from 'react';
import Image from 'next/image';
import { useLanguage } from '@/lib/languageContext';
import { biographyData } from '@/data/biography';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { personalProfile, showDateOfBirth } from '@/data/personalProfile';

export function Biography() {
  const { t, dict } = useLanguage();

  return (
    <div id="biography" className="py-16 md:py-24 space-y-16 scroll-mt-24">
      {/* Intro & Portrait */}
      <Container size="wide">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-[#E8E2D8] border border-[#E8E2D8] shadow-md">
              <Image
                src={biographyData.portraitImage}
                alt={dict.brand.name}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <div className="font-editorial text-2xl font-bold">
                  {dict.brand.name}
                </div>
                <div className="text-xs text-[#FF7D2B] mt-0.5">
                  {dict.brand.constituency}
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-8">
            <SectionHeading
              eyebrow={t(biographyData.eyebrow)}
              title={t(biographyData.title)}
              className="mb-0"
              as="h1"
            />

            {/* Editorial Quote */}
            <blockquote className="p-6 bg-[#FAF7F2] rounded-2xl border-l-4 border-[#F5660A] text-lg sm:text-xl font-editorial italic text-[#171717] leading-relaxed">
              {t(biographyData.quote)}
            </blockquote>

            {/* Paragraphs */}
            <div className="space-y-5 text-base sm:text-lg text-[#6B625A] leading-relaxed">
              {biographyData.paragraphs.map((p, i) => (
                <p key={i}>{t(p)}</p>
              ))}
            </div>

          </div>
        </div>
      </Container>

      <Container size="wide">
        <section
          aria-label={dict.brand.name}
          className="rounded-2xl bg-[#151210] px-6 py-8 sm:px-8 md:py-10"
        >
          <dl className="grid grid-cols-1 gap-y-7 sm:grid-cols-2 sm:gap-x-0 lg:grid-cols-4">
            {personalProfile
              .filter((item) => item.id !== 'dateOfBirth' || showDateOfBirth)
              .map((item, index, items) => (
                <div
                  key={item.id}
                  className={`min-w-0 ${
                    index % 2 === 1 ? 'sm:border-l sm:border-white/15 sm:pl-6' : 'sm:pr-6'
                  } ${index > 1 ? 'lg:mt-0' : ''} lg:border-l lg:border-white/15 lg:px-6 ${
                    index === 0 ? 'lg:border-l-0 lg:pl-0' : ''
                  } ${index === items.length - 1 ? 'lg:pr-0' : ''}`}
                >
                  <dt className="mb-3 text-sm font-semibold tracking-wide text-[#FF7D2B]">
                    {t(item.label)}
                  </dt>
                  <dd className="text-base font-medium leading-snug text-white sm:text-lg">
                    {t(item.value)}
                  </dd>
                  {item.note && (
                    <dd className="mt-2 text-sm leading-relaxed text-white/65">
                      {t(item.note)}
                    </dd>
                  )}
                </div>
              ))}
          </dl>
        </section>
      </Container>
    </div>
  );
}
