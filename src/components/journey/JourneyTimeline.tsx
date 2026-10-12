'use client';

import React from 'react';
import Image from 'next/image';
import { useLanguage } from '@/lib/languageContext';
import { journeyTimeline } from '@/data/journey';
import { Container } from '@/components/ui/Container';
import { CheckCircle2 } from 'lucide-react';

export function JourneyTimeline() {
  const { t, language } = useLanguage();

  return (
    <div className="py-12 md:py-20">
      <Container size="wide">
        <div className="relative">
          {/* Vertical Center Line for desktop */}
          <div className="hidden lg:block absolute left-1/2 top-8 bottom-8 w-[2px] bg-[#E8E2D8] -translate-x-1/2" />

          <div className="space-y-16 lg:space-y-24">
            {journeyTimeline.map((phase, index) => {
              const isEven = index % 2 === 0;

              return (
                <div
                  key={phase.id}
                  className={`relative grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center ${
                    isEven ? '' : 'lg:flex-row-reverse'
                  }`}
                >
                  {/* Timeline Badge for Desktop Center */}
                  <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 top-10 w-10 h-10 rounded-full bg-[#F5660A] text-white font-bold text-sm items-center justify-center shadow-md z-10 border-4 border-[#F8F4ED]">
                    0{index + 1}
                  </div>

                  {/* Content Column */}
                  <div
                    className={`lg:col-span-6 space-y-4 ${
                      isEven ? 'lg:pr-12' : 'lg:col-start-7 lg:pl-12'
                    }`}
                  >
                    <div className="inline-flex items-center text-xs font-bold tracking-[0.2em] uppercase text-[#F5660A]">
                      <span>{t(phase.phase)}</span>
                    </div>

                    <h3 className="font-editorial text-2xl sm:text-3xl md:text-4xl font-bold text-[#151210] leading-tight">
                      {t(phase.title)}
                    </h3>

                    {phase.subtitle && (
                      <p className="text-sm sm:text-base font-medium text-[#F5660A]">
                        {t(phase.subtitle)}
                      </p>
                    )}

                    <p className="text-sm sm:text-base text-[#6B625A] leading-relaxed">
                      {t(phase.description)}
                    </p>

                    {/* Key Highlights */}
                    <div className="pt-2 space-y-2.5">
                      {phase.highlights.map((h, i) => (
                        <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#171717]">
                          <CheckCircle2 className="w-4 h-4 text-[#F5660A] shrink-0 mt-0.5" />
                          <span>{t(h)}</span>
                        </div>
                      ))}
                    </div>

                    {phase.period && (
                      <div className="pt-4 text-xs font-semibold text-[#8A8177] uppercase tracking-wider">
                        {t(phase.period)}
                      </div>
                    )}
                  </div>

                  {/* Image Column */}
                  <div
                    className={`lg:col-span-6 ${
                      isEven ? 'lg:col-start-7' : 'lg:col-start-1 lg:row-start-1'
                    }`}
                  >
                    <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full rounded-2xl overflow-hidden bg-white border border-[#E8E2D8] shadow-sm group">
                      <Image
                        src={phase.image}
                        alt={t(phase.title)}
                        fill
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        className="object-cover group-hover:scale-103 transition-transform duration-500"
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </div>
  );
}
