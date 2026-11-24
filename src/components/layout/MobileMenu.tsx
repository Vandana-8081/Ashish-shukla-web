'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/lib/languageContext';
import { navigationItems } from '@/data/navigation';
import { socialLinks } from '@/data/socialLinks';
import { FacebookIcon, InstagramIcon, XIcon } from '@/components/ui/SocialIcons';
import { X, ArrowRight, ChevronDown } from 'lucide-react';
import { LanguageSwitcher } from './LanguageSwitcher';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const pathname = usePathname();
  const { locale, dict, t, getHref } = useLanguage();
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Handle escape key to close menu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const getSocialIcon = (platform: string) => {
    switch (platform) {
      case 'facebook':
        return <FacebookIcon size={18} />;
      case 'instagram':
        return <InstagramIcon size={18} />;
      case 'x':
        return <XIcon size={16} />;
      default:
        return null;
    }
  };

  return (
    <div
      className={`fixed inset-0 z-50 xl:hidden transition-all duration-300 ${
        isOpen ? 'pointer-events-auto' : 'pointer-events-none'
      }`}
      aria-hidden={!isOpen}
    >
      {/* Smooth Backdrop */}
      <div
        className={`fixed inset-0 bg-black/45 backdrop-blur-xs transition-opacity duration-300 ease-out ${
          isOpen ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Smooth Sliding Drawer */}
      <div
        className={`fixed inset-y-0 right-0 max-w-sm w-full bg-[#FAF6EE] shadow-2xl flex flex-col justify-between z-10 overflow-y-auto transition-transform duration-300 ease-[cubic-bezier(0.2,0.8,0.2,1)] ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div>
          {/* Header */}
          <div className="pl-4 pr-4 py-4 border-b border-black/[0.08] flex items-center justify-between bg-[#FFFDF8]">
            <Link href={`/${locale}`} onClick={onClose} className="flex items-center">
              <Image
                src="/logo/logo3.png"
                alt={dict.brand.name}
                width={2048}
                height={677}
                className="h-11 w-auto max-w-[min(65vw,16rem)] shrink-0 object-contain"
              />
            </Link>
            <button
              type="button"
              onClick={onClose}
              className="w-10 h-10 rounded-full border border-black/10 flex items-center justify-center text-[#151210] hover:bg-[#FAF6EE] active:scale-95 transition-all"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation list */}
          <div className="p-5 space-y-1">
            <div className="space-y-1">
              {navigationItems.map((item) => {
                const targetHref = getHref(item.path);
                const isActive =
                  item.path === ''
                    ? pathname === `/${locale}` || pathname === `/${locale}/`
                    : pathname.startsWith(`/${locale}${item.path}`);

                const hasChildren = !!item.children && item.children.length > 0;
                const isExpanded = expandedId === item.id;
                const rowClass = `flex items-center justify-between px-3.5 py-3 rounded-xl text-base font-medium transition-all duration-200 ${
                  isActive
                    ? 'text-[var(--navy)] bg-white font-semibold shadow-2xs border-l-3 border-[#F5660A]'
                    : 'text-[#2e2a26] hover:bg-white/80 hover:text-[var(--navy)]'
                }`;

                if (!hasChildren) {
                  return (
                    <Link key={item.id} href={targetHref} onClick={onClose} className={rowClass}>
                      <span>{t(item.name)}</span>
                      <ArrowRight className="w-4 h-4 opacity-40 transition-transform group-hover:translate-x-0.5" />
                    </Link>
                  );
                }

                return (
                  <div key={item.id} className="rounded-xl overflow-hidden">
                    <div className={rowClass}>
                      <Link href={targetHref} onClick={onClose} className="flex-1 py-0.5">
                        {t(item.name)}
                      </Link>
                      <button
                        type="button"
                        onClick={() => setExpandedId(isExpanded ? null : item.id)}
                        aria-expanded={isExpanded}
                        aria-label={t(item.name)}
                        className="w-9 h-9 -mr-1 flex items-center justify-center rounded-lg hover:bg-black/5 active:scale-90 transition-transform"
                      >
                        <ChevronDown
                          className={`w-4.5 h-4.5 opacity-60 transition-transform duration-300 ${
                            isExpanded ? 'rotate-180 text-[#F5660A]' : ''
                          }`}
                        />
                      </button>
                    </div>
                    {isExpanded && (
                      <div className="ml-4 mt-1 mb-2 pl-3 border-l-2 border-[#F5660A]/35 space-y-1">
                        {item.children?.map((sub) => (
                          <Link
                            key={sub.path}
                            href={getHref(sub.path)}
                            onClick={onClose}
                            className="block px-3.5 py-2.5 rounded-lg text-sm font-medium text-[#5c544c] hover:text-[var(--navy)] hover:bg-white/90 transition-colors"
                          >
                            {t(sub.name)}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* CTA Connect button in drawer */}
            <div className="pt-4">
              <Link
                href={getHref('/contact')}
                onClick={onClose}
                className="w-full flex items-center justify-center gap-2 py-3 px-5 rounded-full bg-[var(--navy)] text-white font-semibold text-sm hover:bg-[#F5660A] active:scale-98 transition-all duration-300 shadow-sm"
              >
                <span>{locale === 'hi' ? 'संपर्क करें' : 'Connect with Ashish Shukla'}</span>
                <span aria-hidden="true" className="text-base">↗</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Drawer Footer: Socials & Language */}
        <div className="p-5 border-t border-black/[0.08] bg-[#FFFDF8] space-y-4">
          {/* Social Links inside Mobile Menu */}
          <div>
            <div className="text-[11px] uppercase font-bold tracking-wider text-[#6B625A] mb-2">
              {dict.socialSection.heading}
            </div>
            <div className="grid grid-cols-3 gap-2">
              {socialLinks.map((link) => (
                <a
                  key={link.platform}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 bg-white border border-black/[0.08] rounded-xl flex flex-col items-center justify-center gap-1 text-[#151210] hover:text-[#F5660A] hover:border-black/20 active:scale-95 transition-all shadow-2xs"
                >
                  {getSocialIcon(link.platform)}
                  <span className="text-[11px] font-semibold">{link.label}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Language Switcher */}
          <div className="flex items-center justify-between pt-2 border-t border-black/[0.05]">
            <span className="text-xs font-medium text-[#6B625A]">
              {dict.common.switchLanguage}
            </span>
            <LanguageSwitcher locale={locale} />
          </div>
        </div>
      </div>
    </div>
  );
}
