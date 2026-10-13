import type { Metadata } from 'next';
import { PhotoGallery } from '@/components/media/PhotoGallery';
import { VideoSection } from '@/components/media/VideoSection';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
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
    title: dict.mediaSection.heading,
    description: dict.mediaSection.description,
    alternates: {
      canonical: `/${locale}/media`,
      languages: {
        en: '/en/media',
        hi: '/hi/media',
      },
    },
  };
}

export default async function MediaPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = getDictionary((locale === 'hi' ? 'hi' : 'en') as Locale);

  return (
    <div className="py-12 md:py-20 space-y-16">
      {/* Video Section */}
      <Container size="wide" id="videos">
        <SectionHeading
          title={dict.mediaSection.videoHeading}
          as="h1"
          description={dict.mediaSection.videoDesc}
        />
        <VideoSection />
      </Container>

      {/* Photo Gallery */}
      <Container size="wide" id="photos" className="pt-8 border-t border-[#E8E2D8]">
        <PhotoGallery />
      </Container>
    </div>
  );
}
