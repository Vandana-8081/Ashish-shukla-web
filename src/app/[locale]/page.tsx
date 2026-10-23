import { Suspense } from 'react';
import { Hero } from '@/components/home/Hero';
import { Closing } from '@/components/story/Sections';
import { GalleryTabs, NewsSection, ServiceCards, StoryFeature, VideosRow } from '@/components/story/HomeSections';
import { Banner, Timeline } from '@/components/story/Blocks';
import { SocialSection } from '@/components/home/SocialSection';
import { LatestSocialMedia } from '@/components/home/LatestSocialMedia';
import { InstagramUpdatesCard } from '@/components/home/InstagramUpdatesCard';
import { InstagramFeedSkeleton } from '@/components/home/InstagramFeed';

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
      <SocialSection />
      <LatestSocialMedia
        instagramCard={
          <Suspense fallback={<InstagramFeedSkeleton />}>
            <InstagramUpdatesCard />
          </Suspense>
        }
      />
      <Closing />
    </>
  );
}
