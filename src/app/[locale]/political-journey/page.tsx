import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import { PoliticalPage } from '@/components/story/Pages2';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const hi = locale === 'hi';
  return pageMetadata({
    locale,
    path: '/political-journey',
    title: hi ? 'राजनीतिक एवं सार्वजनिक यात्रा' : 'Political & Public Journey',
    description: hi
      ? 'आशीष शुक्ला की राजनीतिक यात्रा — भारतीय जनता पार्टी से जुड़ाव और 2023 में नगर पंचायत भगवंतनगर के अध्यक्ष के रूप में निर्वाचन।'
      : 'The political journey of Ashish Shukla — from local governance and the Bharatiya Janata Party to Chairman of Bhagwantnagar Nagar Panchayat, elected in 2023.',
  });
}

export default function Page() {
  return <PoliticalPage />;
}
