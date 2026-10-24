import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import { ServicePage } from '@/components/story/Pages2';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const hi = locale === 'hi';
  return pageMetadata({
    locale,
    path: '/public-life',
    title: hi ? 'जनसेवा एवं भगवंतनगर का विज़न' : 'Public Service & Bhagwantnagar Vision',
    description: hi
      ? 'जन-पद वहाँ से शुरू होता है जहाँ व्यक्तिगत सुविधा समाप्त होती है — नगर पंचायत भगवंतनगर, उन्नाव में आशीष शुक्ला का नेतृत्व और जनसेवा।'
      : 'Public office begins where personal convenience ends — the municipal leadership and public service of Ashish Shukla in Bhagwantnagar, Unnao.',
  });
}

export default function Page() {
  return <ServicePage />;
}
