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
    <div className="bg-[#FAF7F2] py-12 md:py-16">
      <Container size="wide">
        <SectionHeading
          eyebrow={dict.publicLifeSection.eyebrow}
          title={dict.publicLifeSection.heading}
          description={dict.publicLifeSection.description}
        />
      </Container>
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
