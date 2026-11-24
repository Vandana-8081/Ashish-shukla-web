'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { Locale } from '@/types';

interface LanguageSwitcherProps {
  locale: Locale;
  className?: string;
}

export function LanguageSwitcher({ locale, className = '' }: LanguageSwitcherProps) {
  const pathname = usePathname();

  // Helper to compute path for a given target locale while preserving current page & slug
  const getLocalizedPath = (targetLocale: Locale): string => {
    if (!pathname) return `/${targetLocale}`;

    // Regex to match the starting locale (/en or /hi)
    const match = pathname.match(/^\/(en|hi)(\/.*)?$/);
    if (match) {
      const rest = match[2] || '';
      return `/${targetLocale}${rest}`;
    }

    // Fallback if accessed without locale prefix
    return `/${targetLocale}${pathname.startsWith('/') ? pathname : `/${pathname}`}`;
  };

  const handleLocaleChange = (targetLocale: Locale) => {
    try {
      // Store in cookie for future visits
      document.cookie = `locale=${targetLocale}; path=/; max-age=31536000; SameSite=Lax`;
    } catch {
      // ignore
    }
  };

  const englishPath = getLocalizedPath('en');
  const hindiPath = getLocalizedPath('hi');

  return (
    <div
      className={`inline-flex items-center bg-black/[0.04] p-1 rounded-full border border-black/[0.06] backdrop-blur-xs ${className}`}
      role="group"
      aria-label="Language selection"
    >
      {/* English Link */}
      <Link
        href={englishPath}
        onClick={() => handleLocaleChange('en')}
        scroll={false}
        className={`inline-flex min-h-7.5 items-center justify-center px-3 py-1 text-xs font-semibold rounded-full transition-all duration-300 ${
          locale === 'en'
            ? 'bg-white text-[var(--navy)] shadow-xs font-bold'
            : 'text-[#6B625A] hover:text-[#151210]'
        }`}
        aria-label="Switch to English"
        aria-current={locale === 'en' ? 'page' : undefined}
      >
        EN
      </Link>

      {/* Hindi Link */}
      <Link
        href={hindiPath}
        onClick={() => handleLocaleChange('hi')}
        scroll={false}
        className={`inline-flex min-h-7.5 items-center justify-center px-3 py-1 text-xs font-semibold rounded-full transition-all duration-300 ${
          locale === 'hi'
            ? 'bg-white text-[var(--navy)] shadow-xs font-bold'
            : 'text-[#6B625A] hover:text-[#151210]'
        }`}
        aria-label="Switch to Hindi"
        aria-current={locale === 'hi' ? 'page' : undefined}
      >
        हिन्दी
      </Link>
    </div>
  );
}
