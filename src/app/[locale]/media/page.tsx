import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import { MediaHero } from '@/components/media/MediaHero';
import { PhotoGallery } from '@/components/media/PhotoGallery';
import { VideoSection } from '@/components/media/VideoSection';
import type { Locale } from '@/types';
import { getDictionary } from '@/data/translations';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const dict = getDictionary((locale === 'hi' ? 'hi' : 'en') as Locale);
  return pageMetadata({
    locale,
    path: '/media',
    title: dict.mediaSection.heading,
    description: dict.mediaSection.description,
  });
}

export default async function MediaPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <main id="main" tabIndex={-1} className="w-full max-w-full outline-none overflow-x-hidden">
      {/* 1. Hero Header (Breadcrumbs, Titles, Jump Links, Aspect 16/10 Photo) */}
      <MediaHero />

      {/* 2. Photographs Section (#photos - Asymmetric Dynamic Grid + Original Full-Screen Lightbox) */}
      <PhotoGallery />

      {/* 3. Videos Section (#videos - "From the field" Featured Player + Video Grid) */}
      <VideoSection />
    </main>
  );
}
