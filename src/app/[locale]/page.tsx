import { Hero } from '@/components/home/Hero';
import { AboutPreview } from '@/components/home/AboutPreview';
import { JourneyPreview } from '@/components/home/JourneyPreview';
import { PublicLifePreview } from '@/components/home/PublicLifePreview';
import { DevelopmentPreview } from '@/components/home/DevelopmentPreview';
import { UpdatesPreview } from '@/components/home/UpdatesPreview';
import { SocialSection } from '@/components/home/SocialSection';
import { LatestSocialMedia } from '@/components/home/LatestSocialMedia';
import { XUpdatesCard } from '@/components/home/XUpdatesCard';
import { ContactSection } from '@/components/contact/ContactSection';

export default function LocalizedHomePage() {
  return (
    <>
      <Hero />
      <AboutPreview />
      <JourneyPreview />
      <PublicLifePreview />
      <DevelopmentPreview />
      <UpdatesPreview />
      <LatestSocialMedia xCard={<XUpdatesCard />} />
      <SocialSection />
      <ContactSection id="contact" />
    </>
  );
}
