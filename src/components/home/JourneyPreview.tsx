'use client';

import React from 'react';
import Image from 'next/image';
import { useLanguage } from '@/lib/languageContext';
import { journeyTimeline } from '@/data/journey';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Button } from '@/components/ui/Button';

export function JourneyPreview() {
  const { t, dict, getHref } = useLanguage();

  return (
    <section className="py-20 md:py-28 bg-[#F8F4ED] border-b border-[#E8E2D8]">
      <Container size="wide">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 gap-6">
          <SectionHeading
            eyebrow={dict.journeySection.eyebrow}
            title={dict.journeySection.heading}
            description={dict.journeySection.description}
            className="mb-0 max-w-2xl"
          />
          <Button href={getHref('/about#journey')} variant="outline" icon="arrow" className="self-start md:self-auto shrink-0">
            {dict.journeySection.viewFullButton}
          </Button>
        </div>

        {/* 4 Phases Timeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {journeyTimeline.map((item, index) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-[#E8E2D8] p-5 flex flex-col justify-between hover:border-[#F5660A]/60 transition duration-300 group shadow-2xs"
            >
              <div>
                {/* Photo Frame */}
                <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden mb-4 bg-[#F8F4ED]">
                  <Image
                    src={item.image}
                    alt={t(item.title)}
                    fill
                    sizes="(max-width: 768px) 100vw, 25vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                <div className="text-xs font-bold text-[#F5660A] uppercase tracking-wider mb-1">
                  {t(item.phase)}
                </div>

                <h3 className="font-editorial text-lg font-bold text-[#151210] leading-snug group-hover:text-[#F5660A] transition-colors">
                  {t(item.title)}
                </h3>

                <p className="mt-2.5 text-justify text-xs text-[#6B625A] leading-relaxed line-clamp-3">
                  {t(item.description)}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-[#E8E2D8] text-[11px] font-medium text-[#6B625A]">
                {item.period ? t(item.period) : ''}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
