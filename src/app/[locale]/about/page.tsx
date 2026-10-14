import type { Metadata } from 'next';
import { Biography } from '@/components/about/Biography';
import type { Locale } from '@/types';
import { getDictionary } from '@/data/translations';
import { JourneyTimeline } from '@/components/journey/JourneyTimeline';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const dict = getDictionary((locale === 'hi' ? 'hi' : 'en') as Locale);
  return {
    title: locale === 'hi' ? 'जीवन परिचय एवं यात्रा' : 'Biography & Journey',
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
  return (
    <div className="bg-white">
      <Biography />
      <section id="journey" className="bg-white py-4 md:py-8 scroll-mt-24">
        <JourneyTimeline />
      </section>
    </div>
  );
}
