import type { Metadata } from 'next';
import { ServicePage } from '@/components/story/Pages2';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const hi = locale === 'hi';
  return {
    title: hi ? 'जनसेवा एवं भगवंतनगर का विज़न' : 'Public Service & Bhagwantnagar Vision',
    description: hi ? 'जन-पद वहाँ से शुरू होता है जहाँ व्यक्तिगत सुविधा समाप्त होती है।' : 'Public office begins where personal convenience ends — the municipal leadership of Ashish Shukla.',
    alternates: { canonical: `/${locale}/public-life`, languages: { en: '/en/public-life', hi: '/hi/public-life' } },
  };
}

export default function Page() {
  return <ServicePage />;
}
