import type { Metadata } from 'next';
import './globals.css';
import { LanguageProvider } from '@/lib/languageContext';
import { SiteMotion } from '@/components/layout/SiteMotion';

export const metadata: Metadata = {
  metadataBase: new URL('https://ashish-shukla.org'),
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
    url: 'https://ashish-shukla.org',
    title: 'Ashish Shukla - Official Profile & Public Service',
    description:
      'Official public profile website of Ashish Shukla. Life journey, public service, community engagement, development priorities, and initiatives for Bhagwant Nagar.',
    siteName: 'Ashish Shukla Official',
    images: [
      {
        url: '/images/profile/ashish-shukla-portrait.jpg',
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
    images: ['/images/profile/ashish-shukla-portrait.jpg'],
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/icons/ashish.svg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = 'hi' as const;

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className="min-h-screen flex flex-col bg-[#F8F4ED] text-[#171717] antialiased selection:bg-[#F5660A] selection:text-white">
        <LanguageProvider locale={locale}>
          <SiteMotion />
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
