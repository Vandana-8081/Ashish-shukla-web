'use client';

import { useEffect } from 'react';
import type { Locale } from '@/types';

export function LocaleDocumentLanguage({ locale }: { locale: Locale }) {
  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = 'ltr';
  }, [locale]);

  return null;
}
