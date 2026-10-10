'use client';

import { socialLinks } from '@/data/socialLinks';
import { FacebookIcon, InstagramIcon, XIcon } from '@/components/ui/SocialIcons';
import { AssistantWidget } from '@/components/layout/AssistantWidget';

export function FloatingSocial() {
  const getSocialIcon = (platform: string) => {
    switch (platform) {
      case 'facebook':
        return <FacebookIcon size={15} />;
      case 'instagram':
        return <InstagramIcon size={15} />;
      case 'x':
        return <XIcon size={14} />;
      default:
        return null;
    }
  };

  return (
    <>
      {/* Desktop Right Side Social Bar */}
      <aside
        aria-label="Social links bar"
        className="hidden lg:flex fixed right-4 top-1/2 -translate-y-1/2 z-30 flex-col gap-2 p-1.5 bg-[#151210]/90 backdrop-blur-md border border-[#2B2521] rounded-2xl shadow-xl"
      >
        {socialLinks.map((item) => (
          <a
            key={item.platform}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Visit Ashish Shukla on ${item.label}`}
            className="w-9 h-9 rounded-xl flex items-center justify-center text-[#D4CCC0] hover:text-white hover:bg-[#F5660A] transition-all"
          >
            {getSocialIcon(item.platform)}
          </a>
        ))}
      </aside>

      <AssistantWidget />
    </>
  );
}
