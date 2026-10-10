'use client';

import React from 'react';
import { socialLinks } from '@/data/socialLinks';
import { FacebookIcon, InstagramIcon, XIcon } from '@/components/ui/SocialIcons';
import { ArrowUpRight } from 'lucide-react';

export function SocialLinksList() {
  const getSocialIcon = (platform: string) => {
    switch (platform) {
      case 'facebook':
        return <FacebookIcon size={24} className="text-[#151210]" />;
      case 'instagram':
        return <InstagramIcon size={24} className="text-[#151210]" />;
      case 'x':
        return <XIcon size={22} className="text-[#151210]" />;
      default:
        return null;
    }
  };

  return (
    <div className="divide-y divide-black/20">
      {socialLinks.map((item) => (
        <a
          key={item.platform}
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between py-6 group transition-colors hover:opacity-90"
          aria-label={`Follow Ashish Shukla on ${item.label}`}
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-black/10 flex items-center justify-center group-hover:bg-black/15 transition-colors shrink-0">
              {getSocialIcon(item.platform)}
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-bold text-[#151210] font-editorial">
                {item.label}
              </div>
              <div className="text-sm font-medium text-black/70">
                @{item.username}
              </div>
            </div>
          </div>

          <div className="w-10 h-10 rounded-full border border-black/20 flex items-center justify-center text-[#151210] group-hover:bg-black group-hover:text-white transition-all">
            <ArrowUpRight className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>
        </a>
      ))}
    </div>
  );
}
