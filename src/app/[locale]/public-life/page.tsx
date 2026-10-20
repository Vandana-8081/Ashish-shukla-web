import type { Metadata } from 'next';
import { PublicLifeSections } from '@/components/public-life/PublicLifeSections';
import { DevelopmentCards } from '@/components/development/DevelopmentCards';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import type { Locale } from '@/types';
import { getDictionary } from '@/data/translations';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const dict = getDictionary((locale === 'hi' ? 'hi' : 'en') as Locale);
  return {
    title: dict.publicLifeSection.heading,
    description: dict.publicLifeSection.description,
    alternates: {
      canonical: `/${locale}/public-life`,
      languages: {
        en: '/en/public-life',
        hi: '/hi/public-life',
      },
    },
  };
}

export default async function PublicLifePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = getDictionary((locale === 'hi' ? 'hi' : 'en') as Locale);

  return (
    <div className="bg-[#FAF7F2] pb-0">
      <header className="relative isolate overflow-hidden border-b border-[#E8E2D8] bg-gradient-to-r from-[#FAF7F2] via-[#FAF7F2] to-[#FFF1E6]">
        <Container size="wide">
          <div className="relative py-12 sm:py-16 lg:py-20">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#F5660A]/20 bg-white/80 px-3.5 py-2 text-[11px] font-bold tracking-[0.18em] uppercase text-[#C94E00] shadow-sm">
              <span className="h-2 w-2 rounded-full bg-[#F5660A]" aria-hidden="true" />
              <span>{dict.publicLifeSection.eyebrow}</span>
            </div>
            <h1 className="mt-5 max-w-4xl font-editorial text-4xl font-bold leading-[1.1] tracking-tight text-[#151210] sm:text-5xl lg:text-6xl">
              {dict.publicLifeSection.heading}
            </h1>
            <div className="mt-6 h-1 w-20 rounded-full bg-[#F5660A]" aria-hidden="true" />
          </div>
        </Container>
      </header>
      <PublicLifeSections />
      <section id="development" className="scroll-mt-28 border-t border-[#E8E2D8] pt-12 md:pt-16">
        <Container size="wide">
          <SectionHeading
            eyebrow={dict.developmentSection.eyebrow}
            title={dict.developmentSection.heading}
            description={dict.developmentSection.description}
          />
        </Container>
        <DevelopmentCards />
      </section>
    </div>
  );
}
