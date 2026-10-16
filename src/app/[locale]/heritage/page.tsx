import type { Metadata } from 'next';
import { HeritagePage } from '@/components/heritage/HeritagePage';
import { heritageHero, heritageMeta } from '@/data/heritage';
import type { Locale } from '@/types';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const lang = (locale === 'hi' ? 'hi' : 'en') as Locale;
  return {
    title: heritageMeta.title[lang],
    description: heritageMeta.description[lang],
    alternates: {
      canonical: `/${locale}/heritage`,
      languages: {
        en: '/en/heritage',
        hi: '/hi/heritage',
      },
    },
    openGraph: {
      title: heritageMeta.title[lang],
      description: heritageMeta.description[lang],
      images: [heritageHero.image],
    },
  };
}

export default function Page() {
  return <HeritagePage />;
}
