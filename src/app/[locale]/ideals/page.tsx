import type { Metadata } from 'next';
import { IdealsPage } from '@/components/ideals/IdealsPage';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isHindi = locale === 'hi';

  return {
    title: isHindi ? 'हमारे आदर्श' : 'Our Ideals',
    description: isHindi
      ? 'उन व्यक्तित्वों का परिचय जो प्रेरणा और मार्गदर्शन देते हैं।'
      : 'Meet the people who inspire and guide our ideals.',
    alternates: {
      canonical: `/${locale}/ideals`,
      languages: {
        en: '/en/ideals',
        hi: '/hi/ideals',
      },
    },
  };
}

export default function IdealsRoute() {
  return <IdealsPage />;
}
