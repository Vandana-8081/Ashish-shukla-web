'use client';

import React from 'react';
import { socialLinks } from '@/data/socialLinks';
import { FacebookIcon, InstagramIcon, XIcon } from '@/components/ui/SocialIcons';
import { ArrowUpRight } from 'lucide-react';

export function SocialLinksList() {
  const getSocialIcon = (platform: string) => {
    switch (platform) {
      case 'facebook':
        return <FacebookIcon size={24} className="text-white" />;
      case 'instagram':
        return <InstagramIcon size={24} className="text-white" />;
      case 'x':
        return <XIcon size={22} className="text-white" />;
      default:
        return null;
    }
  };

  return (
    <div className="divide-y divide-white/30">
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
            <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors shrink-0">
              {getSocialIcon(item.platform)}
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-bold text-white font-editorial">
                {item.label}
              </div>
              <div className="text-sm font-medium text-white/90">
                @{item.username}
              </div>
            </div>
          </div>

          <div className="w-10 h-10 rounded-full border border-white/50 flex items-center justify-center text-white group-hover:bg-white group-hover:text-[#F5660A] transition">
            <ArrowUpRight className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>
        </a>
      ))}
    </div>
  );
}
