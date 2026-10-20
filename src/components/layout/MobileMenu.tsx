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

  if (!isOpen) return null;

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
    <div className="fixed inset-0 z-50 xl:hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div className="fixed inset-y-0 right-0 max-w-sm w-full bg-[#F8F4ED] shadow-2xl flex flex-col justify-between z-10 overflow-y-auto">
        {/* Header */}
        <div className="pl-3 pr-5 py-5 border-b border-[#E8E2D8] flex items-center justify-between bg-white">
          <div className="flex items-center gap-3">
            <Image
              src="/logo/logo3.png"
              alt={dict.brand.name}
              width={2048}
              height={677}
              className="h-12 w-auto max-w-[min(72vw,18rem)] shrink-0 object-contain"
            />
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-10 h-10 rounded-xl border border-[#E8E2D8] flex items-center justify-center text-[#151210] hover:bg-[#F8F4ED]"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation list */}
        <div className="p-6 space-y-1 divide-y divide-[#E8E2D8]">
          <div className="space-y-1 pb-4">
            {navigationItems.map((item) => {
              const targetHref = getHref(item.path);
              const isActive =
                item.path === ''
                  ? pathname === `/${locale}` || pathname === `/${locale}/`
                  : pathname.startsWith(`/${locale}${item.path}`);

              const hasChildren = !!item.children && item.children.length > 0;
              const isExpanded = expandedId === item.id;
              const rowClass = `flex items-center justify-between px-3 py-3 rounded-lg text-lg font-medium transition-colors ${
                isActive
                  ? 'text-[#F5660A] bg-white font-semibold shadow-2xs'
                  : 'text-[#151210] hover:bg-white/80'
              }`;

              if (!hasChildren) {
                return (
                  <Link key={item.id} href={targetHref} onClick={onClose} className={rowClass}>
                    <span>{t(item.name)}</span>
                    <ArrowRight className="w-4 h-4 opacity-40" />
                  </Link>
                );
              }

              return (
                <div key={item.id}>
                  <div className={rowClass}>
                    <Link href={targetHref} onClick={onClose} className="flex-1 py-0.5">
                      {t(item.name)}
                    </Link>
                    <button
                      type="button"
                      onClick={() => setExpandedId(isExpanded ? null : item.id)}
                      aria-expanded={isExpanded}
                      aria-label={t(item.name)}
                      className="w-9 h-9 -mr-2 flex items-center justify-center rounded-lg"
                    >
                      <ChevronDown
                        className={`w-5 h-5 opacity-60 transition-transform duration-200 ${
                          isExpanded ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                  </div>
                  {isExpanded && (
                    <div className="ml-4 mt-1 mb-2 pl-3 border-l-2 border-[#F5660A]/30 space-y-0.5">
                      {item.children?.map((sub) => (
                        <Link
                          key={sub.path}
                          href={getHref(sub.path)}
                          onClick={onClose}
                          className="block px-3 py-2.5 rounded-lg text-base text-[#6B625A] hover:text-[#F5660A] hover:bg-white/80"
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

          {/* Social Links inside Mobile Menu */}
          <div className="pt-5 space-y-3">
            <div className="text-xs uppercase font-bold tracking-wider text-[#6B625A]">
              {dict.socialSection.heading}
            </div>
            <div className="grid grid-cols-3 gap-2">
              {socialLinks.map((link) => (
                <a
                  key={link.platform}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-white border border-[#E8E2D8] rounded-xl flex flex-col items-center justify-center gap-1.5 text-[#151210] hover:text-[#F5660A] transition-colors"
                >
                  {getSocialIcon(link.platform)}
                  <span className="text-[11px] font-semibold">{link.label}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Language switcher */}
        <div className="p-6 border-t border-[#E8E2D8] bg-white">
          <div className="flex items-center justify-between">
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
