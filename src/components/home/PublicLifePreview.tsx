'use client';

import React from 'react';
import Image from 'next/image';
import { useLanguage } from '@/lib/languageContext';
import { janSunwaiData, publicLifeItems } from '@/data/publicLife';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { CheckCircle2 } from 'lucide-react';

export function PublicLifePreview() {
  const { t, dict, getHref, locale } = useLanguage();

  return (
    <section className="bg-white pt-14 sm:pt-20 md:pt-28 border-b border-[#E8E2D8]">
      <Container size="wide">
        {/* Jan Sunwai Highlight Block */}
        <div className="bg-[#FAF7F2] rounded-3xl border border-[#E8E2D8] p-6 sm:p-10 lg:p-14 mb-16 shadow-2xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left Content */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center text-xs font-bold tracking-[0.2em] uppercase text-[#F5660A]">
                <span>{dict.publicLifeSection.eyebrow}</span>
              </div>

              <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-[#151210] leading-tight">
                {dict.publicLifeSection.heading}
              </h2>

              <p className="text-justify text-sm sm:text-base text-[#6B625A] leading-relaxed">
                {dict.publicLifeSection.description}
              </p>

              {/* 3 Principles */}
              <div className="space-y-3.5 pt-2">
                {janSunwaiData.principles.map((p, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#F5660A] shrink-0 mt-0.5" />
                    <div>
                      <div className="text-sm font-bold text-[#151210]">{t(p.title)}</div>
                      <div className="text-xs text-[#6B625A] leading-normal">{t(p.description)}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-4">
                <Button href={getHref('/public-life#jan-sunwai')} variant="primary" icon="arrow">
                  {dict.publicLifeSection.buttonLabel}
                </Button>
              </div>
            </div>

            {/* Right Photo */}
            <div className="lg:col-span-6">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-[#E8E2D8] border border-[#E8E2D8] shadow-sm">
                <Image
                  src={janSunwaiData.image}
                  alt={dict.publicLifeSection.heading}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-transform duration-500 hover:scale-102"
                />
              </div>
            </div>
          </div>
        </div>

      </Container>

      {/* Community Engagement & Field Visits: full-width colour bands */}
      <div>
          {publicLifeItems.map((item, index) => {
            const hi = locale === 'hi';
            const label = hi
              ? ['ग्राम चौपाल', 'क्षेत्रीय निरीक्षण'][index] ?? 'जनसंपर्क'
              : ['VILLAGE GATHERINGS', 'FIELD INSPECTIONS'][index] ?? 'PUBLIC LIFE';
            const quote = hi
              ? ['समाधान वहीं से शुरू होता है, जहाँ लोग साथ बैठकर बात करते हैं।', 'जनता के काम की गुणवत्ता पर कोई समझौता नहीं।'][index]
              : ['Solutions begin where people sit down and talk together.', 'No compromise on the quality of public work.'][index];
            const caption = hi ? 'जनसेवा संकल्प • जनता के बीच' : 'PUBLIC SERVICE PLEDGE • AMONG THE PEOPLE';

            return (
              <div
                key={item.id}
                className={`py-12 md:py-16 ${index % 2 === 0 ? 'bg-[#E8E4DC]' : 'bg-[#FAF7F2]'}`}
              >
                <Container size="wide">
                <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-0">
                  {/* Left: heading + copy */}
                  <div className="lg:pr-14">
                    <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#F5660A]">
                      {label}
                    </div>
                    <h3 className="mt-3 font-editorial text-3xl font-bold leading-[1.15] text-[#151210] sm:text-4xl lg:text-5xl">
                      {t(item.title)}
                    </h3>

                    <p className="mt-8 border-l-2 border-[#F5660A] pl-5 text-sm leading-[1.9] text-[#4A433D] sm:text-base">
                      {t(item.description)}
                    </p>

                    {item.details && (
                      <ul className="mt-6 space-y-3 border-t border-[#D2CBBE] pt-6">
                        {item.details.map((d, i) => (
                          <li key={i} className="flex items-start gap-3 text-sm leading-[1.8] text-[#4A433D] sm:text-base">
                            <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#F5660A]" />
                            <span>{t(d)}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  {/* Right: pull quote */}
                  <div className="flex flex-col lg:border-l lg:border-[#D2CBBE] lg:pl-14">
                    <span className="font-editorial text-7xl leading-none text-[#F5660A]" aria-hidden="true">
                      &ldquo;
                    </span>
                    <blockquote className="my-auto py-8 text-center font-editorial text-2xl font-bold leading-snug text-[#151210] sm:text-3xl lg:text-4xl">
                      {quote}
                    </blockquote>
                    <div className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#F5660A]">
                      {caption}
                    </div>
                  </div>
                </div>
                </Container>
              </div>
            );
          })}
      </div>
    </section>
  );
}
