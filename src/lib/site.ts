/**
 * Single source of truth for the public site address. Set NEXT_PUBLIC_SITE_URL
 * (for example https://www.example.com) in the hosting environment to the
 * domain the site is actually served from.
 */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://ashish-shukla.org').replace(/\/+$/u, '');

export const OG_IMAGE = '/og-image.jpg';

export const locales = ['en', 'hi'] as const;
