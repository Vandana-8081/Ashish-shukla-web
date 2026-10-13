import type { Metadata } from 'next';
import { Biography } from '@/components/about/Biography';
import type { Locale } from '@/types';
import { getDictionary } from '@/data/translations';
import { JourneyTimeline } from '@/components/journey/JourneyTimeline';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const dict = getDictionary((locale === 'hi' ? 'hi' : 'en') as Locale);
  return {
    title: locale === 'hi' ? 'आशीष शुक्ला के बारे में' : 'About Ashish Shukla',
    description: dict.aboutSection.heading,
    alternates: {
      canonical: `/${locale}/about`,
      languages: {
        en: '/en/about',
        hi: '/hi/about',
      },
    },
  };
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dict = getDictionary((locale === 'hi' ? 'hi' : 'en') as Locale);
  return (
    <div className="bg-white">
      <Biography />
      <section id="journey" className="bg-[#F8F4ED] py-12 md:py-16 scroll-mt-24">
        <Container size="wide">
          <SectionHeading eyebrow={dict.journeySection.eyebrow} title={dict.journeySection.heading} description={dict.journeySection.description} />
        </Container>
        <JourneyTimeline />
      </section>
    </div>
  );
}
