import type { Metadata } from 'next';
import { OG_IMAGE, SITE_URL, locales } from '@/lib/site';

type Lang = (typeof locales)[number];

interface PageMetadataInput {
  locale: string;
  /** Path after the locale, e.g. '/about'. Empty string for the home page. */
  path: string;
  title: string;
  description: string;
  /** Public path of a share image; defaults to the site-wide OG image. */
  image?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
}

/**
 * Per-page metadata with canonical, hreflang alternates and matching Open Graph
 * and Twitter tags. Next.js only inherits openGraph wholesale from the layout, so
 * without this every page would share the homepage's og:url and og:title.
 */
export function pageMetadata({
  locale,
  path,
  title,
  description,
  image = OG_IMAGE,
  type = 'website',
  publishedTime,
}: PageMetadataInput): Metadata {
  const lang: Lang = locale === 'hi' ? 'hi' : 'en';
  const url = `${SITE_URL}/${lang}${path}`;
  const images = [{ url: image, width: 1200, height: 630, alt: title }];

  return {
    title,
    description,
    alternates: {
      canonical: `/${lang}${path}`,
      languages: {
        en: `/en${path}`,
        hi: `/hi${path}`,
        'x-default': `/en${path}`,
      },
    },
    openGraph: {
      type,
      url,
      title,
      description,
      siteName: lang === 'hi' ? 'आशीष शुक्ला आधिकारिक' : 'Ashish Shukla Official',
      locale: lang === 'hi' ? 'hi_IN' : 'en_US',
      alternateLocale: lang === 'hi' ? 'en_US' : 'hi_IN',
      images,
      ...(type === 'article' && publishedTime ? { publishedTime } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      creator: '@Ashish4Shuka',
      images: images.map((item) => item.url),
    },
  };
}

/** schema.org BreadcrumbList for a page; crumbs are [name, path-after-locale]. */
export function breadcrumbJsonLd(locale: string, crumbs: [name: string, path: string][]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map(([name, path], index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name,
      item: `${SITE_URL}/${locale}${path}`,
    })),
  };
}
