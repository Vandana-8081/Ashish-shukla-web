import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import { JourneyIntro } from '@/components/story/JourneyExtra';
import { Chapters } from '@/components/story/Chapters';
import { NextChapter, Closing } from '@/components/story/Sections';
import { Timeline } from '@/components/story/Blocks';
import { chapters } from '@/data/story';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata({
    locale,
    path: '/journey',
    title: locale === 'hi' ? 'जीवन की यात्रा' : 'The Journey',
    description:
      locale === 'hi'
        ? 'आशीष शुक्ला की सार्वजनिक यात्रा जनसंपर्क, नागरिकों की समस्याओं को समझने और भगवंतनगर के विकास के प्रति प्रतिबद्धता पर केंद्रित है।'
        : 'From Bhagwant Nagar to Kanpur — and back: the life journey of Ashish Shukla, Chairman of Bhagwantnagar Nagar Panchayat, Unnao.',
  });
}

export default function JourneyPage() {
  return (
    <>
      <JourneyIntro />
      <Timeline showHead={false} />
      <Chapters items={chapters} />
      <NextChapter />
      <Closing />
    </>
  );
}
