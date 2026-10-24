import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
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
  return pageMetadata({
    locale,
    path: '/about',
    title: locale === 'hi' ? 'आशीष शुक्ला - परिचय' : 'About Ashish Shukla',
    description:
      locale === 'hi'
        ? 'आशीष शुक्ला (रिंकू) का जीवन परिचय — अध्यक्ष, नगर पंचायत भगवंतनगर, उन्नाव, उत्तर प्रदेश। गढ़ा हुआ जीवन, विरासत में मिला नहीं।'
        : 'The biography of Ashish Shukla (Rinku), Chairman of Bhagwantnagar Nagar Panchayat, Unnao, Uttar Pradesh — a life built, not inherited.',
  });
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
