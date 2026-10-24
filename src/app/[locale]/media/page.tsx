import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import { MediaIntro } from '@/components/story/Pages2';
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
  const dict = getDictionary((locale === 'hi' ? 'hi' : 'en') as Locale);

  return (
    <div>
      <MediaIntro />
      <div className="py-12 md:py-20 space-y-16">
        <Container size="wide" id="videos">
          <SectionHeading
            title={dict.mediaSection.videoHeading}
            as="h2"
            description={dict.mediaSection.videoDesc}
          />
          <VideoSection />
        </Container>

        <Container size="wide" id="photos" className="pt-8 border-t border-[#E8E2D8]">
          <PhotoGallery />
        </Container>
      </div>
    </div>
  );
}
