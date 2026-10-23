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
      className={`inline-flex items-center bg-[#F8F4ED] p-1.5 sm:p-1 rounded-xl border border-[#E8E2D8] ${className}`}
      role="group"
      aria-label="Language selection"
    >
      {/* English Link */}
      <Link
        href={englishPath}
        onClick={() => handleLocaleChange('en')}
        scroll={false}
        className={`inline-flex min-h-8 items-center px-3 py-1 text-xs font-semibold rounded-md transition sm:min-h-9 sm:px-3.5 sm:py-1.5 sm:text-sm sm:rounded-lg ${
          locale === 'en'
            ? 'bg-[#F5660A] text-white shadow-xs font-bold'
            : 'text-[#6B625A] hover:text-[#151210]'
        }`}
        aria-label="Switch to English"
        aria-current={locale === 'en' ? 'page' : undefined}
      >
        EN
      </Link>

      <span className="text-[#D4CCC0] text-xs font-light px-0.5 sm:px-1 select-none" aria-hidden="true">
        |
      </span>

      {/* Hindi Link */}
      <Link
        href={hindiPath}
        onClick={() => handleLocaleChange('hi')}
        scroll={false}
        className={`inline-flex min-h-8 items-center px-3 py-1 text-xs font-semibold rounded-md transition sm:min-h-9 sm:px-3.5 sm:py-1.5 sm:text-sm sm:rounded-lg ${
          locale === 'hi'
            ? 'bg-[#F5660A] text-white shadow-xs font-bold'
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
