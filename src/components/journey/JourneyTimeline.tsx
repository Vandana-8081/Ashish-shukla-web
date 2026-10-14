'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '@/lib/languageContext';
import { journeyMilestones, politicalJourneyIntro } from '@/data/politicalJourney';
import { updatesData } from '@/data/updates';
import { Container } from '@/components/ui/Container';

const FEATURED_UPDATES = updatesData.slice(0, 4);

export function JourneyTimeline() {
  const { t, language, getHref } = useLanguage();
  const hi = language === 'hi';

  return (
    <div className="py-12 md:py-16">
      <Container size="wide">
        {/* Heading + introduction with the section's lead photograph */}
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-14">
          <div>
            <div className="text-xs font-bold uppercase tracking-[0.2em] text-[#F5660A]">
              {hi ? 'राजनीतिक यात्रा' : 'Political Journey'}
            </div>
            <h2
              id="journey-heading"
              className="mt-3 font-editorial text-3xl font-bold leading-tight text-[#151210] sm:text-4xl md:text-5xl"
            >
              {t(politicalJourneyIntro.heading)}
            </h2>
            <div aria-hidden="true" className="mt-4 h-1 w-16 rounded-full bg-[#F5660A]" />
            <p className="mt-5 text-base leading-relaxed text-[#5C5650] sm:text-lg">
              {t(politicalJourneyIntro.description)}
            </p>
          </div>
          <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-[#E8E2DA] bg-[#FFF5E9] shadow-sm">
            <Image
              src={politicalJourneyIntro.image.src}
              alt={t(politicalJourneyIntro.image.alt)}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>

        {/* Timeline */}
        <ol aria-labelledby="journey-heading" className="relative mx-auto mt-14 max-w-4xl md:mt-20">
          <span aria-hidden="true" className="absolute bottom-3 left-[15px] top-3 w-[2px] bg-[#E8E2DA] md:left-[19px]" />
          {journeyMilestones.map((milestone, index) => (
            <li key={milestone.id} className="relative pb-10 pl-12 last:pb-0 md:pl-16">
              <span
                aria-hidden="true"
                className="absolute left-0 top-0 flex h-8 w-8 items-center justify-center rounded-full border-4 border-white bg-[#F5660A] text-xs font-bold text-white shadow-sm md:h-10 md:w-10 md:text-sm"
              >
                {index + 1}
              </span>

              <div className="rounded-2xl border border-[#E8E2DA] bg-[#FFF9F1] p-5 sm:p-6">
                {milestone.year && (
                  <span className="inline-flex rounded-full bg-[#FFF1E3] px-3 py-1 text-xs font-bold tracking-wider text-[#C95F0A]">
                    {milestone.year}
                  </span>
                )}
                <h3 className="mt-2 font-editorial text-xl font-bold leading-snug text-[#151210] sm:text-2xl">
                  {t(milestone.title)}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[#5C5650] sm:text-base">{t(milestone.body)}</p>

                {milestone.points && (
                  <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                    {milestone.points.map((point) => (
                      <li key={point.en} className="flex items-start gap-2.5 text-sm text-[#242424]">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#176B3A]" aria-hidden="true" />
                        <span>{t(point)}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {milestone.showUpdates && (
                  <ul className="mt-4 divide-y divide-[#E8E2DA] rounded-xl border border-[#E8E2DA] bg-white">
                    {FEATURED_UPDATES.map((update) => (
                      <li key={update.slug}>
                        <Link
                          href={getHref(`/updates/${update.slug}`)}
                          className="flex items-start justify-between gap-3 px-4 py-3 text-sm transition-colors hover:bg-[#FFF5E9] focus-visible:outline-2 focus-visible:outline-[#F5660A]"
                        >
                          <span>
                            <span className="block text-xs font-semibold text-[#C95F0A]">
                              {hi ? update.dateHi : update.dateEn}
                            </span>
                            <span className="block text-[#242424]">{hi ? update.titleHi : update.titleEn}</span>
                          </span>
                          <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-[#F5660A]" aria-hidden="true" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}

                {milestone.image && (
                  <div className="relative mt-5 aspect-[16/9] overflow-hidden rounded-xl border border-[#E8E2DA] bg-white">
                    <Image
                      src={milestone.image.src}
                      alt={t(milestone.image.alt)}
                      fill
                      sizes="(max-width: 768px) 100vw, 768px"
                      className="object-cover"
                    />
                  </div>
                )}

                {milestone.note && <p className="mt-4 text-xs italic text-[#5C5650]">{t(milestone.note)}</p>}

                {milestone.link && (
                  <Link
                    href={getHref(milestone.link.path)}
                    className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[#F5660A] hover:text-[#C95F0A] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F5660A]"
                  >
                    {t(milestone.link.label)}
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                )}
              </div>
            </li>
          ))}
        </ol>
      </Container>
    </div>
  );
}
