import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import '../globals.css';
import type { Locale } from '@/types';
import { LanguageProvider } from '@/lib/languageContext';
import { LocaleDocumentLanguage } from '@/components/layout/LocaleDocumentLanguage';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { FloatingSocial } from '@/components/layout/FloatingSocial';
import { getDictionary } from '@/data/translations';
import { OG_IMAGE, SITE_URL } from '@/lib/site';

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'hi' }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (locale !== 'en' && locale !== 'hi') {
    return {};
  }
  const dict = getDictionary(locale as Locale);

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: dict.meta.siteTitle,
      template: `%s | ${dict.brand.name}`,
    },
    description: dict.meta.siteDescription,
    keywords: dict.meta.keywords.split(',').map((s) => s.trim()),
    authors: [{ name: `${dict.brand.name} Public Office` }],
    creator: dict.brand.name,
    publisher: `${dict.brand.name} Public Office`,
    alternates: {
      canonical: `/${locale}`,
      languages: {
        en: '/en',
        hi: '/hi',
        'x-default': '/en',
      },
    },
    openGraph: {
      type: 'website',
      locale: locale === 'hi' ? 'hi_IN' : 'en_US',
      alternateLocale: locale === 'hi' ? 'en_US' : 'hi_IN',
      url: `${SITE_URL}/${locale}`,
      title: dict.meta.siteTitle,
      description: dict.meta.siteDescription,
      siteName: `${dict.brand.name} Official`,
      images: [
        {
          url: OG_IMAGE,
          width: 1200,
          height: 630,
          alt: `${dict.brand.name} - Bhagwant Nagar`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: dict.meta.siteTitle,
      description: dict.meta.siteDescription,
      creator: '@Ashish4Shuka',
      images: [OG_IMAGE],
    },
    icons: {
      icon: [
      { url: '/favicon.ico?v=2', sizes: 'any' },
      { url: '/icons/icon.png?v=2', type: 'image/png', sizes: '512x512' },
    ],
      apple: '/icons/apple-touch-icon.png?v=2',
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;
  if (locale !== 'en' && locale !== 'hi') {
    notFound();
  }

  const validLocale = locale as Locale;
  const dict = getDictionary(validLocale);

  const pageUrl = `${SITE_URL}/${validLocale}`;
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': `${SITE_URL}/#person`,
        name: dict.brand.name,
        alternateName: validLocale === 'hi' ? 'रिंकू' : 'Rinku',
        description: dict.meta.siteDescription,
        url: pageUrl,
        image: `${SITE_URL}${OG_IMAGE}`,
        jobTitle:
          validLocale === 'hi'
            ? 'अध्यक्ष, नगर पंचायत भगवंतनगर'
            : 'President, Bhagwantnagar Nagar Panchayat',
        sameAs: [
          'https://www.facebook.com/ashish4unnaao',
          'https://www.instagram.com/ashish4unnao/',
          'https://x.com/Ashish4Shuka',
        ],
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Bhagwant Nagar',
          addressRegion: 'Uttar Pradesh',
          addressCountry: 'IN',
        },
      },
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        url: SITE_URL,
        name: `${dict.brand.name} Official`,
        inLanguage: validLocale === 'hi' ? 'hi-IN' : 'en-IN',
        about: { '@id': `${SITE_URL}/#person` },
      },
    ],
  };

  return (
    <LanguageProvider locale={validLocale}>
      <LocaleDocumentLanguage locale={validLocale} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
      <FloatingSocial />
    </LanguageProvider>
  );
}
