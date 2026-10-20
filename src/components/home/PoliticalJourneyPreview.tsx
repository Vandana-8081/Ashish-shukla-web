'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '@/lib/languageContext';
import { Container } from '@/components/ui/Container';
import type { LocalizedString } from '@/types';

const steps: { label: LocalizedString; title: LocalizedString; body: LocalizedString }[] = [
  {
    label: { hi: 'राजनीतिक शुरुआत', en: 'Political Beginnings' },
    title: { hi: 'भाजपा की सदस्यता', en: 'BJP Membership' },
    body: {
      hi: 'भारतीय जनता पार्टी से जुड़कर सक्रिय राजनीतिक जीवन और जनसेवा के प्रति अपनी प्रतिबद्धता की शुरुआत की।',
      en: 'Began his active political journey and commitment to public service through his association with the Bharatiya Janata Party.',
    },
  },
  {
    label: { hi: 'जनसंपर्क', en: 'Public Engagement' },
    title: { hi: 'जनता से सीधा संवाद', en: 'Direct Public Engagement' },
    body: {
      hi: 'स्थानीय नागरिकों से संवाद स्थापित कर उनकी समस्याओं को समझने और जनहित से जुड़े मुद्दों को प्राथमिकता देने पर ध्यान दिया।',
      en: 'Engaged with local residents to understand their concerns and prioritise issues related to public welfare.',
    },
  },
  {
    label: { hi: 'नगर निकाय चुनाव 2023', en: 'Municipal Elections 2023' },
    title: { hi: 'नगर पंचायत अध्यक्ष', en: 'Nagar Panchayat Chairman' },
    body: {
      hi: 'वर्ष 2023 के उत्तर प्रदेश नगर निकाय चुनाव में भाजपा प्रत्याशी के रूप में नगर पंचायत भगवंतनगर के अध्यक्ष पद पर निर्वाचित हुए।',
      en: 'Elected Chairman of Bhagwantnagar Nagar Panchayat as a BJP candidate in the 2023 Uttar Pradesh urban local body elections.',
    },
  },
  {
    label: { hi: 'वर्तमान', en: 'Present' },
    title: { hi: 'अध्यक्ष, नगर पंचायत भगवंतनगर', en: 'Chairman, Bhagwantnagar Nagar Panchayat' },
    body: {
      hi: 'नगर पंचायत भगवंतनगर, जनपद उन्नाव में सड़क, स्वच्छता, जल निकासी, नागरिक सुविधाओं और स्थानीय विकास से जुड़े कार्यों के लिए प्रतिबद्ध।',
      en: 'Committed to local development in Bhagwantnagar Nagar Panchayat, Unnao, with a focus on roads, sanitation, drainage, and civic amenities.',
    },
  },
];

export function PoliticalJourneyPreview() {
  const { t, locale, getHref } = useLanguage();
  const hi = locale === 'hi';
  const last = steps.length - 1;

  return (
    <section className="py-16 md:py-24 bg-white border-b border-[#E8E2D8]">
      <Container size="wide">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-3xl">
            <div className="text-sm font-bold text-[#A63D00]">{hi ? 'प्रमुख मोड़' : 'Key milestones'}</div>
            <h2 className="mt-2 font-editorial text-4xl font-bold leading-tight text-[#151210] sm:text-5xl">
              {hi ? 'राजनीतिक यात्रा' : 'Political Journey'}
            </h2>
            <p className="mt-6 text-base text-[#4A433D] sm:text-lg">
              {hi
                ? 'संघ की शाखाओं से ब्लॉक प्रमुख तक: उनके दायित्व और सार्वजनिक जीवन के प्रमुख पड़ाव।'
                : 'From the Sangh shakhas to Block Pramukh: key responsibilities and milestones of public life.'}
            </p>
          </div>
          <Link
            href={getHref('/about#journey')}
            className="inline-flex shrink-0 items-center gap-2 text-sm font-bold text-[#F5660A] hover:underline"
          >
            {hi ? 'पूरी यात्रा देखें' : 'View full journey'}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <ol className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {steps.map((s, i) => {
            const current = i === last;
            return (
              <li key={i} className="relative">
                {/* Timeline dot + line (desktop) */}
                <div className="relative mb-6 hidden h-4 items-center lg:flex" aria-hidden="true">
                  <span className="absolute left-0 right-[-2rem] top-1/2 h-px bg-[#EBD9C8]" />
                  <span
                    className={`relative z-10 h-4 w-4 rounded-full border-2 border-[#F5660A] ${
                      current ? 'bg-[#F5660A] ring-4 ring-[#F5660A]/20' : 'bg-white'
                    }`}
                  />
                </div>

                <Link
                  href={getHref('/about#journey')}
                  className={`block h-full rounded-2xl border p-7 transition-transform duration-300 hover:-translate-y-1 ${
                    current
                      ? 'border-[#E85D04] bg-[#E85D04] text-white shadow-lg'
                      : 'border-[#E8E2D8] bg-[#FAF7F2] text-[#151210]'
                  }`}
                >
                  <div className={`text-sm font-bold ${current ? 'text-[#FFD9BD]' : 'text-[#A63D00]'}`}>
                    <span className="mr-3">{String(i + 1).padStart(2, '0')}</span>
                    {t(s.label)}
                  </div>
                  <h3 className="mt-5 font-editorial text-xl font-bold">{t(s.title)}</h3>
                  <p className={`mt-3 text-sm leading-relaxed ${current ? 'text-[#FFE7D3]' : 'text-[#4A433D]'}`}>
                    {t(s.body)}
                  </p>
                </Link>
              </li>
            );
          })}
        </ol>
      </Container>
    </section>
  );
}
