'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '@/lib/languageContext';
import { socialLinks } from '@/data/socialLinks';
import { FacebookIcon, InstagramIcon, XIcon } from '@/components/ui/SocialIcons';
import { ArrowUpRight } from 'lucide-react';

export function Footer() {
  const { locale, dict, getHref } = useLanguage();

  const getSocialIcon = (platform: string) => {
    switch (platform) {
      case 'facebook':
        return <FacebookIcon size={16} />;
      case 'instagram':
        return <InstagramIcon size={16} />;
      case 'x':
        return <XIcon size={15} />;
      default:
        return null;
    }
  };

  const navLinks = [
    { path: '/about', label: dict.navigation.about },
    { path: '/about#journey', label: dict.navigation.journey },
    { path: '/public-life', label: dict.navigation.publicLife },
    { path: '/public-life#development', label: dict.navigation.development },
    { path: '/media', label: dict.navigation.media },
    { path: '/updates', label: dict.navigation.updates },
    { path: '/contact', label: dict.navigation.contact },
  ];

  return (
    <footer className="bg-[#151210] text-[#E8E2D8] pt-16 pb-12 border-t border-[#25201C]">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-14 border-b border-[#25201C]">
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-5">
            <div className="flex items-center gap-3.5">
              <Image
                src="/icons/ashish.svg"
                alt={dict.brand.name}
                width={2048}
                height={683}
                className="h-14 w-auto max-w-[min(60vw,14rem)] shrink-0 object-contain"
              />
            </div>

            <p className="text-sm leading-relaxed text-[#A89F95] max-w-sm">
              {dict.footer.description}
            </p>

            <div className="pt-2 text-xs text-[#8A8177]">
              <span>{dict.common.publicOfficeLocation}</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-4 space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#F5660A]">
              {dict.footer.exploreTitle}
            </h3>
            <ul className="grid grid-cols-2 gap-y-2.5 gap-x-4 text-sm">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    href={getHref(link.path)}
                    className="text-[#C4BDB3] hover:text-[#F5660A] transition-colors inline-flex items-center gap-1 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-white/20 group-hover:bg-[#F5660A] transition-colors" />
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect & Social */}
          <div className="md:col-span-3 space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#F5660A]">
              {dict.footer.connectTitle}
            </h3>
            <p className="text-xs text-[#A89F95] leading-relaxed">
              {dict.footer.connectDesc}
            </p>

            <div className="space-y-2 pt-1">
              {socialLinks.map((item) => (
                <a
                  key={item.platform}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-2.5 rounded-lg bg-[#1E1A17] border border-[#2B2521] hover:border-[#F5660A]/60 hover:bg-[#25201C] text-sm text-[#E8E2D8] transition-all group"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-[#F5660A]">{getSocialIcon(item.platform)}</span>
                    <span className="font-medium text-xs">{item.label}</span>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#8A8177] group-hover:text-white transition-colors" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Credits & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#8A8177] gap-4 sm:gap-6">
          <div>
            © 2026 {dict.brand.name}. {dict.common.allRightsReserved}
          </div>
          <a
            href="https://praibadvisors.com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Digital Experience Partner: PRAIB Advisors LLP"
            className="group inline-flex max-w-full items-center gap-3 rounded-full border border-[#49433D] bg-[#1E1A17] py-2 pl-4 pr-2.5 text-[#E8E2D8] transition-colors hover:border-[#F5660A]/70 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F5660A] sm:gap-4 sm:pl-5 sm:pr-3"
          >
            <span className="min-w-0">
              <span className="block text-[9px] font-semibold uppercase tracking-[0.18em] text-[#A89F95] sm:text-[10px]">
                Digital Experience Partner
              </span>
              <span className="mt-0.5 block truncate font-editorial text-sm font-bold text-white transition-colors group-hover:text-[#FFCA9E] sm:text-base">
                PRAIB Advisors LLP
              </span>
            </span>
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#F5660A] text-[#FF7D2B] transition-colors group-hover:bg-[#F5660A] group-hover:text-white sm:h-10 sm:w-10">
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
            </span>
          </a>
        </div>

      </div>
    </footer>
  );
}
