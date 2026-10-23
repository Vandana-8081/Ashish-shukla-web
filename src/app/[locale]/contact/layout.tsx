import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import type { Locale } from '@/types';
import { getDictionary } from '@/data/translations';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const dict = getDictionary((locale === 'hi' ? 'hi' : 'en') as Locale);
  return {
    title: locale === 'hi' ? 'संपर्क करें' : 'Contact',
    description: dict.contactSection.description,
    alternates: {
      canonical: `/${locale}/contact`,
      languages: { en: '/en/contact', hi: '/hi/contact' },
    },
  };
}

export default function ContactLayout({ children }: { children: ReactNode }) {
  return children;
}
