import type { Metadata } from 'next';
import { Noto_Serif_Devanagari, Source_Serif_4 } from 'next/font/google';
import './globals.css';
import { LanguageProvider } from '@/lib/languageContext';
import { SiteMotion } from '@/components/layout/SiteMotion';
import { OG_IMAGE, SITE_URL } from '@/lib/site';

// Devanagari font used throughout Hindi pages.
const hindiHeading = Noto_Serif_Devanagari({
  subsets: ['devanagari'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-hindi-heading',
});

const displaySerif = Source_Serif_4({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  display: 'swap',
  variable: '--font-display',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Ashish Shukla - Official Profile & Public Service',
    template: '%s | Ashish Shukla',
  },
  description:
    'Official public profile website of Ashish Shukla. Life journey, public service, community engagement, development priorities, and initiatives for Bhagwant Nagar.',
  keywords: [
    'Ashish Shukla',
    'Bhagwant Nagar',
    'Unnao',
    'Jan Sunwai',
    'Public Service',
    'Rural Development',
    'Uttar Pradesh',
    'आशीष शुक्ला',
    'भगवंत नगर',
    'उन्नाव',
  ],
  authors: [{ name: 'Ashish Shukla Public Office' }],
  creator: 'Ashish Shukla',
  publisher: 'Ashish Shukla Public Office',
  openGraph: {
    type: 'website',
    locale: 'hi_IN',
    alternateLocale: 'en_US',
    url: SITE_URL,
    title: 'Ashish Shukla - Official Profile & Public Service',
    description:
      'Official public profile website of Ashish Shukla. Life journey, public service, community engagement, development priorities, and initiatives for Bhagwant Nagar.',
    siteName: 'Ashish Shukla Official',
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: 'Ashish Shukla - Bhagwant Nagar',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ashish Shukla - Official Profile & Public Service',
    description:
      'Official public profile website of Ashish Shukla. Life journey, public service, and development for Bhagwant Nagar.',
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = 'hi' as const;

  return (
    <html lang={locale} className={`${hindiHeading.variable} ${displaySerif.variable}`} suppressHydrationWarning>
      <body className="min-h-screen flex flex-col bg-[#F8F4ED] text-[#171717] antialiased selection:bg-[#F5660A] selection:text-white">
        <LanguageProvider locale={locale}>
          <SiteMotion />
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
