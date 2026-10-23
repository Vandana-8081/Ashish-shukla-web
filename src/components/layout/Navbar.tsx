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
        return <FacebookIcon size={16} className="text-[#1877F2]" />;
      case 'instagram':
        return <InstagramIcon size={16} className="text-[#E1306C]" />;
      case 'x':
        return <XIcon size={15} className="text-dark" />;
      default:
        return null;
    }
  };

  return (
    <>
      <header
        className={`sticky top-0 z-50 w-full bg-[#faf6ee]/90 backdrop-blur-lg transition-all duration-300 ${
          isScrolled ? 'shadow-[0_10px_30px_rgba(16,24,31,.08)]' : ''
        }`}
      >
        <div className="tricolor-rule" />
        <div className="max-w-[1400px] mx-auto pl-2 pr-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between sm:h-22">
            {/* Brand Logo */}
            <Link
              href={`/${locale}`}
              className="-ml-1 flex items-center gap-3.5 rounded-lg p-1 focus-visible:outline-2 focus-visible:outline-[#F5660A] sm:-ml-2"
            >
              <Image
                src="/logo/logo3.png"
                alt={dict.brand.name}
                width={2048}
                height={677}
                priority
                className="h-14 w-auto max-w-[min(48vw,15rem)] shrink-0 object-contain sm:h-16 sm:max-w-[20rem]"
              />
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden xl:flex items-center space-x-3" aria-label="Main Navigation">
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
                    <div
                      className={`inline-flex items-center rounded-full text-sm font-semibold transition ${
                        isActive
                          ? 'bg-white text-[var(--navy)] shadow-sm'
                          : 'text-[#37322d] hover:bg-white/80'
                      }`}
                    >
                      <Link href={targetHref} className="rounded-l-full py-3 pl-2.5 pr-1.5">
                        <span className="whitespace-nowrap">{t(item.name)}</span>
                      </Link>
                      {hasChildren && (
                        <button
                          type="button"
                          aria-label={`${t(item.name)} menu`}
                          aria-expanded={activeDropdown === item.id}
                          onClick={() => setActiveDropdown(activeDropdown === item.id ? null : item.id)}
                          onKeyDown={(event) => {
                            if (event.key === 'Escape') setActiveDropdown(null);
                          }}
                          className="rounded-r-full py-3 pl-1 pr-2.5"
                        >
                          <ChevronDown
                            className={`h-3.5 w-3.5 opacity-60 transition-transform duration-200 ${
                              activeDropdown === item.id ? 'rotate-180' : ''
                            }`}
                          />
                        </button>
                      )}
                    </div>

                    {/* Submenu Dropdown */}
                    {hasChildren && activeDropdown === item.id && (
                      <div className="absolute top-full left-0 w-64 pt-2 z-50">
                        <div className="rounded-3xl border border-black/10 bg-[#fffdf8] p-2 shadow-[0_26px_80px_rgba(8,17,25,.18)] space-y-1">
                          {item.children?.map((sub) => (
                            <Link
                              key={sub.path}
                              href={getHref(sub.path)}
                              className="block rounded-2xl px-4 py-3 transition-colors hover:bg-black/[.035]"
                              onClick={() => setActiveDropdown(null)}
                            >
                              <div className="text-base font-medium text-[#4d473f] hover:text-[var(--navy)]">
                                {t(sub.name)}
                              </div>
                              {sub.description && (
                                <p className="text-sm text-[#6B625A] mt-0.5 line-clamp-1">
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
              <div className="flex items-center space-x-1.5 pr-2">
                {socialLinks.map((link) => (
                  <a
                    key={link.platform}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Follow Ashish Shukla on ${link.label}`}
                    className="w-10 h-10 rounded-full border border-black/10 bg-white/80 flex items-center justify-center text-[#3e3a34] shadow-sm transition hover:-translate-y-0.5 hover:bg-white focus-visible:outline-2 focus-visible:outline-[var(--saffron)]"
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
                className="w-11 h-11 rounded-full border border-black/10 bg-white/80 flex items-center justify-center text-[#151210] hover:bg-white transition-colors"
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
