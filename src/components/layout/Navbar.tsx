'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/lib/languageContext';
import { navigationItems } from '@/data/navigation';
import { socialLinks } from '@/data/socialLinks';
import { FacebookIcon, InstagramIcon, XIcon } from '@/components/ui/SocialIcons';
import { ChevronDown, Menu } from 'lucide-react';
import { MobileMenu } from './MobileMenu';
import { LanguageSwitcher } from './LanguageSwitcher';

export function Navbar() {
  const pathname = usePathname();
  const { locale, dict, t, getHref } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition duration-300 border-t-2 border-[#F5660A] bg-white/95 backdrop-blur-md ${
          isScrolled ? 'shadow-xs border-b border-[#E8E2D8]' : 'border-b border-[#E8E2D8]/80'
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-22">
            {/* Brand Logo */}
            <Link
              href={`/${locale}`}
              className="flex items-center gap-3.5 group focus-visible:outline-2 focus-visible:outline-[#F5660A] rounded-lg p-1"
            >
              <Image
                src="/icons/ashish.svg"
                alt={dict.brand.name}
                width={2048}
                height={683}
                priority
                className="h-14 w-auto max-w-[min(48vw,12rem)] shrink-0 object-contain sm:max-w-[14rem]"
              />
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden xl:flex items-center space-x-1" aria-label="Main Navigation">
              {navigationItems.map((item) => {
                const targetHref = getHref(item.path);
                const isActive =
                  item.path === ''
                    ? pathname === `/${locale}` || pathname === `/${locale}/`
                    : pathname.startsWith(`/${locale}${item.path}`);
                const hasChildren = item.children && item.children.length > 0;

                return (
                  <div
                    key={item.id}
                    className="relative group"
                    onMouseEnter={() => hasChildren && setActiveDropdown(item.id)}
                    onMouseLeave={() => hasChildren && setActiveDropdown(null)}
                  >
                    <Link
                      href={targetHref}
                      className={`inline-flex items-center gap-1 px-3.5 py-2 text-base font-medium transition-colors rounded-md ${
                        isActive
                          ? 'text-[#F5660A] font-semibold'
                          : 'text-[#171717] hover:text-[#F5660A] hover:bg-[#F8F4ED]'
                      }`}
                    >
                      <span>{t(item.name)}</span>
                      {hasChildren && (
                        <ChevronDown className="w-3.5 h-3.5 opacity-60 group-hover:rotate-180 transition-transform duration-200" />
                      )}
                    </Link>

                    {/* Submenu Dropdown */}
                    {hasChildren && activeDropdown === item.id && (
                      <div className="absolute top-full left-0 w-64 pt-2 z-50">
                        <div className="bg-white rounded-xl shadow-lg border border-[#E8E2D8] p-2 space-y-1">
                          {item.children?.map((sub) => (
                            <Link
                              key={sub.path}
                              href={getHref(sub.path)}
                              className="block p-2.5 rounded-lg hover:bg-[#F8F4ED] transition-colors"
                              onClick={() => setActiveDropdown(null)}
                            >
                              <div className="text-sm font-semibold text-[#151210] hover:text-[#F5660A]">
                                {t(sub.name)}
                              </div>
                              {sub.description && (
                                <p className="text-xs text-[#6B625A] mt-0.5 line-clamp-1">
                                  {t(sub.description)}
                                </p>
                              )}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>

            {/* Desktop Social & Language Switcher */}
            <div className="hidden lg:flex items-center space-x-3">
              {/* Social Buttons */}
              <div className="flex items-center space-x-1.5 pr-2 border-r border-[#E8E2D8]">
                {socialLinks.map((link) => (
                  <a
                    key={link.platform}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Follow Ashish Shukla on ${link.label}`}
                    className="w-10 h-10 rounded-xl border border-[#E8E2D8] flex items-center justify-center text-[#151210] hover:text-[#F5660A] hover:border-[#F5660A] hover:bg-[#FAF7F2] transition-colors focus-visible:outline-2 focus-visible:outline-[#F5660A]"
                  >
                    {getSocialIcon(link.platform)}
                  </a>
                ))}
              </div>

              {/* Reusable URL-based Language Switcher */}
              <LanguageSwitcher locale={locale} />
            </div>

            {/* Mobile Header Controls */}
            <div className="flex items-center gap-2 xl:hidden">
              <LanguageSwitcher locale={locale} />

              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                className="w-10 h-10 rounded-xl border border-[#E8E2D8] flex items-center justify-center text-[#151210] hover:bg-[#F8F4ED] transition-colors"
                aria-label="Open navigation menu"
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
    </>
  );
}
