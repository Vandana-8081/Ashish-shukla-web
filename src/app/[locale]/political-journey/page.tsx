import type { Metadata } from 'next';
import { PoliticalPage } from '@/components/story/Pages2';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const hi = locale === 'hi';
  return {
    title: hi ? 'राजनीतिक एवं सार्वजनिक यात्रा' : 'Political & Public Journey',
    description: hi ? 'स्थानीय शासन से व्यापक जन-दायित्व तक।' : 'From local governance to a wider public responsibility.',
    alternates: { canonical: `/${locale}/political-journey`, languages: { en: '/en/political-journey', hi: '/hi/political-journey' } },
  };
}

export default function Page() {
  return <PoliticalPage />;
}
