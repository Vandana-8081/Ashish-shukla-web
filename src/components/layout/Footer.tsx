'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/lib/languageContext';
import { socialLinks } from '@/data/socialLinks';
import { navigationItems } from '@/data/navigation';
import { FacebookIcon, InstagramIcon, XIcon } from '@/components/ui/SocialIcons';
import { ArrowUpRight } from 'lucide-react';

export function Footer() {
  const { locale, dict, getHref, t } = useLanguage();

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
    {
      path: '/public-life#public-service',
      label: t(navigationItems.find((item) => item.id === 'public-life')!.children![0].name),
    },
    {
      path: '/public-life#vision',
      label: t(navigationItems.find((item) => item.id === 'public-life')!.children![1].name),
    },
    {
      path: '/development',
      label: t(navigationItems.find((item) => item.id === 'development')!.name),
    },
    {
      path: '/ideals',
      label: t(navigationItems.find((item) => item.id === 'ideals')!.name),
    },
    { path: '/media', label: dict.navigation.media },
    { path: '/contact', label: dict.navigation.contact },
  ];

  return (
    <footer className="bg-[var(--navy-deep)] text-white/85">
      <div className="tricolor-rule" />
      <div className="pt-14 pb-6">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-10 border-b border-white/10">
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-5">
            <p className="font-editorial text-4xl font-bold leading-tight tracking-tight text-[#ff7a1a] sm:text-4xl">
              {dict.brand.name}
            </p>

            <p className="text-base leading-relaxed text-white/70 max-w-sm">
              {dict.footer.description}
            </p>

            <div className="pt-2 text-sm text-white/60">
              <span>{dict.common.publicOfficeLocation}</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-4 space-y-4">
            <h3 className="text-sm font-extrabold uppercase tracking-[0.14em] text-[#ffb27a]">
              {dict.footer.exploreTitle}
            </h3>
            <ul className="grid grid-cols-1 gap-y-3 gap-x-4 text-base min-[420px]:grid-cols-2">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    href={getHref(link.path)}
                    className="text-white/75 hover:text-white transition-colors inline-flex items-center gap-1 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-white/20 group-hover:bg-[#ffb27a] transition-colors" />
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect & Social */}
          <div className="md:col-span-3 space-y-4">
            <h3 className="text-sm font-extrabold uppercase tracking-[0.14em] text-[#ffb27a]">
              {dict.footer.connectTitle}
            </h3>
            <p className="text-sm text-white/70 leading-relaxed">
              {dict.footer.connectDesc}
            </p>

            <div className="space-y-2 pt-1">
              {socialLinks.map((item) => (
                <a
                  key={item.platform}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-full bg-white/5 border border-white/10 hover:border-[#ffb27a]/60 hover:bg-white/10 text-base text-white/90 transition group"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-[#ffb27a]">{getSocialIcon(item.platform)}</span>
                    <span className="font-medium text-sm">{item.label}</span>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5 text-white/50 group-hover:text-white transition-colors" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Credits & Copyright */}
        <div className="pt-5 flex flex-col sm:flex-row items-center justify-between text-sm text-white/60 gap-4 sm:gap-6">
          <div>
            © 2026 {dict.brand.name}. {dict.common.allRightsReserved}
          </div>
          <a
            href="https://praibadvisors.com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Digital Experience Partner: PRAIB Advisors LLP"
            className="group inline-flex max-w-full items-center gap-3 rounded-full border border-white/20 bg-white/5 py-1.5 pl-4 pr-2 text-white/90 transition-colors hover:border-[#ffb27a]/70 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#ffb27a] sm:gap-4 sm:pl-5 sm:pr-3"
          >
            <span className="min-w-0">
              <span className="block text-xs font-semibold uppercase tracking-[0.14em] text-white/70 sm:text-sm">
                Digital Experience Partner
              </span>
              <span className="mt-0.5 block truncate font-editorial text-base font-bold text-white transition-colors group-hover:text-[#FFCA9E] sm:text-lg">
                PRAIB Advisors LLP
              </span>
            </span>
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#ffb27a] text-[#ffb27a] transition-colors group-hover:bg-[#ffb27a] group-hover:text-[var(--navy-deep)] sm:h-9 sm:w-9">
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
            </span>
          </a>
        </div>

      </div>
      </div>
    </footer>
  );
}
