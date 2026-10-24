import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import { IdealsPage } from '@/components/ideals/IdealsPage';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isHindi = locale === 'hi';

  return pageMetadata({
    locale,
    path: '/ideals',
    title: isHindi ? 'हमारे आदर्श' : 'Our Ideals',
    description: isHindi
      ? 'उन व्यक्तित्वों का परिचय जो आशीष शुक्ला के सार्वजनिक जीवन को प्रेरणा और मार्गदर्शन देते हैं।'
      : 'Meet the people who inspire and guide the public life and ideals of Ashish Shukla.',
  });
}

export default function IdealsRoute() {
  return <IdealsPage />;
}
