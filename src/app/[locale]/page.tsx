import { Hero } from '@/components/home/Hero';
import { GalleryTabs, NewsSection, ServiceCards, StoryFeature, VideosRow } from '@/components/story/HomeSections';
import { Banner, Timeline } from '@/components/story/Blocks';
import { LatestSocialMedia } from '@/components/home/LatestSocialMedia';
import { InstagramUpdates } from '@/components/home/InstagramFeed';
import { EcardHomeSection } from '@/components/ecard/EcardHomeSection';

export default function LocalizedHomePage() {
  return (
    <>
      <Hero />
      <StoryFeature />
      <Timeline />
      <ServiceCards />
      <Banner cta={{ href: '/journey', label: { en: 'Discover his journey', hi: 'उनकी यात्रा जानें' } }} />
      <NewsSection />
      <GalleryTabs />
      <VideosRow />
      <LatestSocialMedia
        instagramCard={<InstagramUpdates />}
      />
      <EcardHomeSection />
    </>
  );
}
