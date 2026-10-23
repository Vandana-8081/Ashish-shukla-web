import type { Metadata } from 'next';
import { AboutPage } from '@/components/story/AboutPage';
import { Chapters } from '@/components/story/Chapters';
import { Banner } from '@/components/story/Blocks';
import { chapters } from '@/data/story';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: locale === 'hi' ? 'आशीष शुक्ला - परिचय' : 'About Ashish Shukla',
    description:
      locale === 'hi'
        ? 'गढ़ा हुआ जीवन, विरासत में मिला नहीं — आशीष शुक्ला का जीवन परिचय।'
        : 'A life built, not inherited — the biography of Ashish Shukla, Chairman of Bhagwant Nagar Nagar Panchayat.',
    alternates: {
      canonical: `/${locale}/about`,
      languages: { en: '/en/about', hi: '/hi/about' },
    },
  };
}

export default function AboutRoute() {
  return (
    <>
      <AboutPage />
      <section id="journey" className="scroll-mt-24">
        <Chapters items={chapters.slice(0, 3)} />
      </section>
      <Banner />
    </>
  );
}
