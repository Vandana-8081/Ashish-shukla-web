'use client';

import { Container } from '@/components/ui/Container';
import { useLanguage } from '@/lib/languageContext';
import { ecardStrings as s } from '@/data/ecard';
import { EcardMaker } from './EcardMaker';

export function EcardHomeSection() {
  const { language } = useLanguage();

  return (
    <section className="bg-[#FAF7F2] pb-16 sm:pb-20">
      <header className="relative isolate overflow-hidden border-b border-[#E8E2D8] bg-gradient-to-r from-[#FAF7F2] via-[#FAF7F2] to-[#FFF1E6]">
        <Container size="wide">
          <div className="relative py-12 sm:py-16">
            <h2 className="mt-0 max-w-4xl font-editorial text-4xl font-bold leading-[1.1] tracking-tight text-[#151210] sm:text-4xl">
              {s.heading[language]}
            </h2>
            <p className="mt-4 max-w-2xl text-base text-[#151210]/75">{s.intro[language]}</p>
            <div className="mt-6 h-1 w-20 rounded-full bg-[#F5660A]" aria-hidden="true" />
          </div>
        </Container>
      </header>
      <Container size="wide" className="pt-10 sm:pt-14">
        <EcardMaker />
      </Container>
    </section>
  );
}
