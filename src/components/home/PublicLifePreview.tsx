'use client';

import React from 'react';
import Image from 'next/image';
import { useLanguage } from '@/lib/languageContext';
import { janSunwaiData, publicLifeItems } from '@/data/publicLife';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Users, CheckCircle2, MapPin } from 'lucide-react';

export function PublicLifePreview() {
  const { t, dict, getHref } = useLanguage();

  return (
    <section className="py-20 md:py-28 bg-white border-b border-[#E8E2D8]">
      <Container size="wide">
        {/* Jan Sunwai Highlight Block */}
        <div className="bg-[#FAF7F2] rounded-3xl border border-[#E8E2D8] p-6 sm:p-10 lg:p-14 mb-16 shadow-2xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left Content */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center text-xs font-bold tracking-[0.2em] uppercase text-[#F5660A]">
                <span>{dict.publicLifeSection.eyebrow}</span>
              </div>

              <h2 className="font-editorial text-3xl sm:text-4xl font-bold text-[#151210] leading-tight">
                {dict.publicLifeSection.heading}
              </h2>

              <p className="text-base sm:text-lg text-[#6B625A] leading-relaxed">
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

              <div className="pt-4 flex flex-wrap items-center gap-4">
                <Button href={getHref('/public-life#jan-sunwai')} variant="primary" icon="arrow">
                  {dict.publicLifeSection.buttonLabel}
                </Button>
                <div className="flex items-center gap-1.5 text-xs text-[#6B625A]">
                  <MapPin className="w-4 h-4 text-[#F5660A]" />
                  <span>{t(janSunwaiData.scheduleInfo)}</span>
                </div>
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
                <div className="absolute bottom-3 left-3 bg-[#151210]/85 backdrop-blur-xs text-white px-3.5 py-1.5 rounded-lg text-xs font-medium flex items-center gap-2">
                  <Users className="w-3.5 h-3.5 text-[#F5660A]" />
                  <span>{dict.publicLifeSection.directBadge}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Community Engagement & Field Visits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {publicLifeItems.map((item) => (
            <div
              key={item.id}
              className="group bg-white rounded-2xl border border-[#E8E2D8] overflow-hidden hover:border-[#F5660A]/60 transition-all duration-300"
            >
              <div className="relative aspect-[16/9] w-full bg-[#F8F4ED]">
                <Image
                  src={item.image}
                  alt={t(item.title)}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover group-hover:scale-103 transition-transform duration-500"
                />
              </div>

              <div className="p-6 space-y-3">
                <h3 className="font-editorial text-xl sm:text-2xl font-bold text-[#151210] group-hover:text-[#F5660A] transition-colors">
                  {t(item.title)}
                </h3>
                <p className="text-sm text-[#6B625A] leading-relaxed">
                  {t(item.description)}
                </p>

                {item.details && (
                  <ul className="pt-2 space-y-1.5 text-xs text-[#6B625A] border-t border-[#E8E2D8]">
                    {item.details.map((d, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#F5660A]" />
                        <span>{t(d)}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
