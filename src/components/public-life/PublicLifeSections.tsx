'use client';

import React from 'react';
import Image from 'next/image';
import { useLanguage } from '@/lib/languageContext';
import { janSunwaiData, publicLifeItems } from '@/data/publicLife';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function PublicLifeSections() {
  const { t, dict, getHref, locale } = useLanguage();

  return (
    <div className="pt-4 pb-12 md:pb-20 space-y-20">
      {/* Jan Sunwai Comprehensive Section */}
      <section id="jan-sunwai" data-site-motion-ignore className="scroll-mt-24">
        <Container size="wide" className="py-10 sm:py-14 lg:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            <div className="lg:col-span-6 space-y-6 lg:py-4">
              <h2 className="max-w-2xl font-editorial text-3xl font-bold leading-[1.12] tracking-tight text-[#151210] sm:text-4xl">
                {locale === 'hi' ? 'समुदाय के साथ सीधा संवाद' : 'A direct conversation with the community'}
              </h2>
              <p className="max-w-2xl text-base sm:text-lg text-[#5D554F] leading-relaxed">
                {dict.publicLifeSection.description}
              </p>

              <div className="space-y-3 pt-1">
                {janSunwaiData.principles.map((pr, idx) => (
                  <div key={idx} className="flex items-start gap-3.5 rounded-2xl border border-[#E8E2D8] bg-white/80 p-4 transition duration-200 hover:-translate-y-0.5 hover:border-[#F5660A]/40 hover:shadow-md sm:p-5">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#FFF1E6]">
                      <CheckCircle2 className="h-5 w-5 text-[#E85D04]" />
                    </span>
                    <div className="pt-0.5">
                      <div className="text-sm font-bold text-[#151210]">{t(pr.title)}</div>
                      <div className="mt-1 text-sm text-[#6B625A] leading-relaxed">{t(pr.description)}</div>
                    </div>
                  </div>
                ))}
              </div>

            </div>

            <div className="lg:col-span-6 space-y-5">
              <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-white bg-[#E8E2D8] shadow-xl ring-1 ring-[#E8E2D8]">
                <Image
                  src={janSunwaiData.pageImage ?? janSunwaiData.image}
                  alt={dict.publicLifeSection.heading}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 hover:scale-[1.03]"
                />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/65 via-black/20 to-transparent" aria-hidden="true" />
                <div className="absolute bottom-5 left-5 rounded-full border border-white/30 bg-black/40 px-4 py-2 text-xs font-semibold tracking-wide text-white shadow-lg backdrop-blur-sm">
                  {locale === 'hi' ? 'समुदाय के साथ जनसुनवाई' : 'A public hearing with the community'}
                </div>
              </div>

              <div className="rounded-3xl border border-[#E8E2D8] border-t-4 border-t-[#F5660A] bg-white p-6 text-center shadow-sm space-y-2">
                <h4 className="font-editorial text-lg font-bold text-[#151210]">
                  {locale === 'hi' ? 'अपनी समस्या अथवा सुझाव साझा करें' : 'Submit a Grievance or Feedback'}
                </h4>
                <p className="text-xs text-[#6B625A]">
                  {locale === 'hi'
                    ? 'कार्यालय में व्यक्तिगत रूप से उपस्थित होकर अथवा संपर्क पत्र के माध्यम से अपना विवरण भेजें।'
                    : 'Submit your concerns in person at the central camp office or via our online public interaction portal.'}
                </p>
                <div className="pt-2">
                  <Button href={getHref('/contact')} variant="primary" size="sm" icon="arrow">
                    {dict.common.connect}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Community Engagement & Field Visits */}
      <Container size="wide" id="community">
        <SectionHeading
          eyebrow={locale === 'hi' ? 'जमीनी संवाद' : 'GRASSROOTS ENGAGEMENT'}
          title={dict.publicLifeSection.villageHeading}
          description={dict.publicLifeSection.villageDesc}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8" id="field-visits">
          {publicLifeItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-[#E8E2D8] overflow-hidden hover:border-[#F5660A]/70 transition shadow-2xs group"
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
              <div className="p-6 sm:p-8 space-y-3">
                <h3 className="font-editorial text-xl font-bold text-[#151210] group-hover:text-[#F5660A] transition-colors">
                  {t(item.title)}
                </h3>
                <p className="text-justify text-sm text-[#6B625A] leading-relaxed">
                  {t(item.description)}
                </p>

                {item.details && (
                  <div className="pt-3 border-t border-[#E8E2D8] space-y-2">
                    {item.details.map((dt, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-[#171717]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#F5660A] mt-1 shrink-0" />
                        <span>{t(dt)}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}
