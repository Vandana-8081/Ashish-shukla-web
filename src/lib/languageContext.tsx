'use client';

import React, { createContext, useContext } from 'react';
import type { Locale, LocalizedString } from '@/types';
import { getDictionary, translations, type TranslationDictionary } from '@/data/translations';

interface LanguageContextType {
  locale: Locale;
  language: Locale;
  dict: TranslationDictionary;
  t: (localized: LocalizedString) => string;
  getHref: (path: string) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  locale: 'en',
  language: 'en',
  dict: translations.en,
  t: (loc) => loc?.en || '',
  getHref: (p) => `/en${p}`,
});

export function LanguageProvider({
  children,
  locale = 'en',
}: {
  children: React.ReactNode;
  locale?: Locale;
}) {
  const dict = getDictionary(locale);

  const t = (loc: LocalizedString): string => {
    if (!loc) return '';
    return loc[locale] || loc.en || '';
  };

  const getHref = (path: string): string => {
    // If external or starts with http
    if (path.startsWith('http')) return path;
    if (path.startsWith('#')) return path;

    const cleanPath = path.startsWith('/') ? path : `/${path}`;
    if (cleanPath === '/' || cleanPath === '') {
      return `/${locale}`;
    }
    return `/${locale}${cleanPath}`;
  };

  return (
    <LanguageContext.Provider value={{ locale, language: locale, dict, t, getHref }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
