'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '@/lib/languageContext';
import { developmentPriorities, bhagwantNagarData } from '@/data/development';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Button } from '@/components/ui/Button';
import { ArrowRight, Sparkles } from 'lucide-react';

export function DevelopmentPreview() {
  const { t, dict, getHref } = useLanguage();

  return (
    <section className="py-20 md:py-28 bg-[#F8F4ED] border-b border-[#E8E2D8]">
      <Container size="wide">
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 gap-6">
          <SectionHeading
            eyebrow={dict.developmentSection.eyebrow}
            title={dict.developmentSection.heading}
            description={dict.developmentSection.description}
            className="mb-0 max-w-2xl"
          />
          <Button href={getHref('/public-life#development')} variant="outline" icon="arrow" className="self-start md:self-auto shrink-0">
            {dict.developmentSection.viewAllButton}
          </Button>
        </div>

        {/* Development Grid: 3 Top Priorities */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {developmentPriorities.slice(0, 3).map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-[#E8E2D8] overflow-hidden flex flex-col justify-between hover:border-[#F5660A] transition duration-300 group shadow-2xs"
            >
              <div>
                {/* Photo */}
                <div className="relative aspect-[16/10] w-full bg-[#FAF7F2]">
                  <Image
                    src={item.image}
                    alt={t(item.title)}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-103 transition-transform duration-500"
                  />
                </div>

                <div className="p-6">
                  <h3 className="font-editorial text-xl font-bold text-[#151210] group-hover:text-[#F5660A] transition-colors leading-snug">
                    {t(item.title)}
                  </h3>

                  <p className="mt-3 text-sm text-[#6B625A] leading-relaxed">
                    {t(item.description)}
                  </p>

                  {/* 2 Bullet Points */}
                  <div className="mt-4 pt-4 border-t border-[#E8E2D8] space-y-2">
                    {item.keyInitiatives.slice(0, 2).map((init, i) => (
                      <div key={i} className="text-xs text-[#6B625A] flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#F5660A] mt-1 shrink-0" />
                        <span>{t(init)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0">
                <Link
                  href={getHref(`/public-life#${item.slug}`)}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#F5660A] hover:text-[#D45300] transition-colors"
                >
                  <span>{dict.developmentSection.readDetails}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Dedicated Bhagwant Nagar Section */}
        <div className="relative rounded-3xl overflow-hidden bg-[#151210] text-white p-8 sm:p-12 lg:p-16 border border-[#2B2521]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] uppercase text-[#F5660A]">
                <Sparkles className="w-4 h-4 text-[#F5660A]" />
                <span>{dict.bhagwantNagarSection.tagline}</span>
              </div>

              <h2 className="font-editorial text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight">
                {dict.bhagwantNagarSection.heading}
              </h2>

              <p className="text-base sm:text-lg text-[#D4CCC0] leading-relaxed">
                {dict.bhagwantNagarSection.intro}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 border-t border-[#2B2521]">
                {bhagwantNagarData.pillars.map((pillar, i) => (
                  <div key={i} className="space-y-1.5">
                    <div className="text-sm font-bold text-[#F5660A]">{t(pillar.title)}</div>
                    <p className="text-xs text-[#A89F95] leading-relaxed">{t(pillar.description)}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative aspect-[4/5] sm:aspect-[4/3] lg:aspect-square rounded-2xl overflow-hidden border border-[#2B2521] shadow-2xl">
                <Image
                  src={bhagwantNagarData.heroImage}
                  alt={dict.bhagwantNagarSection.heading}
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-xs text-[#E8E2D8] font-medium bg-[#151210]/70 backdrop-blur-xs p-3 rounded-lg border border-white/10">
                  {dict.bhagwantNagarSection.bottomBadge}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
