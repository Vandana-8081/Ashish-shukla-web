'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/lib/languageContext';
import { navigationItems } from '@/data/navigation';
import { socialLinks } from '@/data/socialLinks';
import { FacebookIcon, InstagramIcon, XIcon } from '@/components/ui/SocialIcons';
import { MobileMenu } from './MobileMenu';
import { LanguageSwitcher } from './LanguageSwitcher';

export function Navbar() {
  const pathname = usePathname();
  const { locale, dict, t, getHref } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  useEffect(() => {
    const handleLightbox = (e: Event) => {
      const customEvent = e as CustomEvent<{ open: boolean }>;
      setIsLightboxOpen(Boolean(customEvent.detail?.open));
    };
    window.addEventListener('lightbox-toggle', handleLightbox);
    return () => window.removeEventListener('lightbox-toggle', handleLightbox);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (isLightboxOpen) return null;

  const getSocialIcon = (platform: string) => {
    switch (platform) {
      case 'facebook':
        return <FacebookIcon size={15} className="text-[#1877F2]" />;
      case 'instagram':
        return <InstagramIcon size={15} className="text-[#E1306C]" />;
      case 'x':
        return <XIcon size={14} className="text-[#151210]" />;
      default:
        return null;
    }
  };

  return (
    <>
      <header
        className={`sticky top-0 z-50 w-full transition-[background-color,backdrop-filter,box-shadow,border-color] duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)] border-b ${
          isScrolled
            ? 'bg-[#faf6ee]/92 backdrop-blur-md shadow-[0_12px_36px_rgba(16,24,31,0.08)] border-black/[0.08]'
            : 'bg-[#faf6ee]/80 backdrop-blur-sm border-black/[0.05]'
        }`}
      >
        <div className="tricolor-rule" />
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-18 sm:h-20 items-center justify-between gap-4 transition-all duration-300">
            {/* Brand Logo */}
            <Link
              href={`/${locale}`}
              className="-ml-1 flex items-center gap-3.5 rounded-lg p-1 transition-transform duration-200 hover:opacity-95 active:scale-98 focus-visible:outline-2 focus-visible:outline-[#F5660A] sm:-ml-2"
              aria-label={dict.brand.name}
            >
              <Image
                src="/logo/logo3.png"
                alt={dict.brand.name}
                width={2048}
                height={677}
                priority
                className="h-12 w-auto max-w-[min(48vw,14rem)] shrink-0 object-contain sm:h-14 sm:max-w-[18rem] transition-all duration-300"
              />
            </Link>

            {/* Desktop Navigation Links (with Contact in original position & smooth animated underlines) */}
            <nav className="hidden xl:block" aria-label="Primary navigation">
              <ul className="flex items-center gap-0.5 xl:gap-1 2xl:gap-1.5">
                {navigationItems.map((item) => {
                  const targetHref = getHref(item.path);
                  const isActive =
                    item.path === ''
                      ? pathname === `/${locale}` || pathname === `/${locale}/`
                      : pathname.startsWith(`/${locale}${item.path}`);
                  const hasChildren = item.children && item.children.length > 0;

                  return (
                    <li
                      key={item.id}
                      className="group relative"
                      onMouseEnter={() => hasChildren && setActiveDropdown(item.id)}
                      onMouseLeave={() => hasChildren && setActiveDropdown(null)}
                    >
                      <Link
                        href={targetHref}
                        className={`relative flex min-h-11 items-center whitespace-nowrap px-3.5 xl:px-4 text-[0.9375rem] font-medium transition-colors duration-300
                          after:absolute after:inset-x-3.5 xl:after:inset-x-4 after:bottom-1.5 after:h-[2px] after:origin-left after:bg-[#F5660A] after:transition-transform after:duration-500 after:ease-[cubic-bezier(0.2,0.8,0.2,1)]
                          ${
                            isActive
                              ? 'text-[#16191b] font-medium after:scale-x-100'
                              : 'text-[#655f57] hover:text-[#16191b] after:scale-x-0 hover:after:scale-x-100'
                          }`}
                      >
                        {t(item.name)}
                      </Link>

                      {/* Dropdown Menu (Exact match to reference website: rohitpandey.info) */}
                      {hasChildren && (
                        <div
                          className={`invisible absolute left-0 top-full z-20 min-w-48 xl:min-w-52 pt-2 opacity-0 transition-opacity duration-150
                            group-focus-within:visible group-focus-within:opacity-100
                            group-hover:visible group-hover:opacity-100
                            ${activeDropdown === item.id ? '!visible !opacity-100' : ''}`}
                        >
                          <ul className="rounded-sm bg-[#faf6ee] p-1.5 shadow-[0_18px_40px_-18px_rgba(22,24,28,0.45)] ring-1 ring-[#131b21]/15">
                            {item.children?.map((sub) => (
                              <li key={sub.path}>
                                <Link
                                  href={getHref(sub.path)}
                                  className="flex min-h-11 items-center whitespace-nowrap rounded-sm px-4 text-[0.9375rem] text-[#655f57] transition-colors duration-150 hover:bg-[#eae6dd] hover:text-[#16191b]"
                                  onClick={() => setActiveDropdown(null)}
                                >
                                  {t(sub.name)}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>
            </nav>

            {/* Desktop Actions (Original position: Social Buttons + Language Switcher) */}
            <div className="hidden lg:flex items-center space-x-3">
              {/* Social Buttons */}
              <div className="flex items-center space-x-1.5 pr-1">
                {socialLinks.map((link) => (
                  <a
                    key={link.platform}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Follow Ashish Shukla on ${link.label}`}
                    className="w-10 h-10 rounded-full border border-black/10 bg-white/75 backdrop-blur-xs flex items-center justify-center text-[#3e3a34] shadow-2xs transition-all duration-200 hover:-translate-y-0.5 hover:bg-white hover:border-black/20 focus-visible:outline-2 focus-visible:outline-[var(--saffron)]"
                  >
                    {getSocialIcon(link.platform)}
                  </a>
                ))}
              </div>

              {/* Smooth Language Switcher */}
              <LanguageSwitcher locale={locale} />
            </div>

            {/* Mobile Header Controls */}
            <div className="flex items-center gap-2.5 xl:hidden">
              <LanguageSwitcher locale={locale} />

              {/* Rohit Pandey style smooth animated Menu button */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                className="flex items-center gap-2 rounded-full border border-black/10 bg-white/80 backdrop-blur-xs py-2 px-3.5 text-sm font-semibold text-[#151210] hover:bg-white hover:border-black/20 transition-all duration-300 shadow-2xs active:scale-95 cursor-pointer"
                aria-label={locale === 'hi' ? 'मेन्यू खोलें' : 'Open navigation menu'}
                aria-expanded={mobileMenuOpen}
              >
                <span>{locale === 'hi' ? 'मेन्यू' : 'Menu'}</span>
                <span aria-hidden="true" className="flex w-3.5 flex-col gap-[3.5px]">
                  <span className="h-[1.5px] w-full bg-[#151210] rounded-full transition-all"></span>
                  <span className="h-[1.5px] w-2/3 self-end bg-[#151210] rounded-full transition-all"></span>
                </span>
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
