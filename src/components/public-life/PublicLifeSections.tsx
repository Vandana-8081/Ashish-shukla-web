'use client';

import React from 'react';
import Image from 'next/image';
import { useLanguage } from '@/lib/languageContext';
import { janSunwaiData, publicLifeItems } from '@/data/publicLife';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { CheckCircle2, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function PublicLifeSections() {
  const { t, dict, getHref, locale } = useLanguage();

  return (
    <div className="pt-4 pb-12 md:pb-20 space-y-20">
      {/* Jan Sunwai Comprehensive Section */}
      <Container size="wide" id="jan-sunwai">
        <div className="bg-white rounded-3xl border border-[#E8E2D8] p-6 sm:p-10 lg:p-14 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
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

              <div className="space-y-4 pt-2">
                {janSunwaiData.principles.map((pr, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3.5 rounded-xl bg-[#FAF7F2] border border-[#E8E2D8]/70">
                    <CheckCircle2 className="w-5 h-5 text-[#F5660A] shrink-0 mt-0.5" />
                    <div>
                      <div className="text-sm font-bold text-[#151210]">{t(pr.title)}</div>
                      <div className="text-xs text-[#6B625A] mt-0.5 leading-relaxed">{t(pr.description)}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-4 rounded-xl bg-[#F8F4ED] border border-[#E8E2D8] flex items-center gap-3 text-xs text-[#151210]">
                <MapPin className="w-5 h-5 text-[#F5660A] shrink-0" />
                <span>{t(janSunwaiData.scheduleInfo)}</span>
              </div>
            </div>

            <div className="lg:col-span-6 space-y-6">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-[#E8E2D8] shadow-md border border-[#E8E2D8]">
                <Image
                  src={janSunwaiData.image}
                  alt={dict.publicLifeSection.heading}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>

              <div className="bg-[#FAF7F2] p-6 rounded-2xl border border-[#E8E2D8] text-center space-y-2">
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
        </div>
      </Container>

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
