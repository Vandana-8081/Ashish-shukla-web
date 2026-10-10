import type { Metadata } from 'next';
import { updatesData } from '@/data/updates';
import { UpdatesGrid } from '@/components/updates/UpdatesGrid';
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
    title: dict.updatesSection.heading,
    description: dict.updatesSection.description,
    alternates: {
      canonical: `/${locale}/updates`,
      languages: {
        en: '/en/updates',
        hi: '/hi/updates',
      },
    },
  };
}

export default async function UpdatesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = getDictionary((locale === 'hi' ? 'hi' : 'en') as Locale);

  return (
    <div className="py-6 md:py-8 bg-white">
      <Container size="wide">
        <SectionHeading
          eyebrow={dict.updatesSection.eyebrow}
          title={dict.updatesSection.heading}
          description={dict.updatesSection.description}
          className="mb-6 md:mb-8"
        />
        <UpdatesGrid updates={updatesData} compact />
      </Container>
    </div>
  );
}
