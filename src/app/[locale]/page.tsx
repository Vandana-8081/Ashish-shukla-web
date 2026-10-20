import { Hero } from '@/components/home/Hero';
import { AboutPreview } from '@/components/home/AboutPreview';
import { PoliticalJourneyPreview } from '@/components/home/PoliticalJourneyPreview';
import { PublicLifePreview } from '@/components/home/PublicLifePreview';
import { DevelopmentPreview } from '@/components/home/DevelopmentPreview';
import { SocialSection } from '@/components/home/SocialSection';
import { LatestSocialMedia } from '@/components/home/LatestSocialMedia';
import { XUpdatesCard } from '@/components/home/XUpdatesCard';

export default function LocalizedHomePage() {
  return (
    <>
      <Hero />
      <AboutPreview />
      <PoliticalJourneyPreview />
      <PublicLifePreview />
      <DevelopmentPreview />
      <LatestSocialMedia xCard={<XUpdatesCard />} />
      <SocialSection />
    </>
  );
}
