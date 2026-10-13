import type { MetadataRoute } from 'next';
import { getPublishedBlogArticles } from '@/data/blogs';
import { updatesData } from '@/data/updates';
import { SITE_URL, locales } from '@/lib/site';

type Entry = MetadataRoute.Sitemap[number];

/** One entry per language, each pointing at its translation via hreflang. */
function localized(
  path: string,
  options: Pick<Entry, 'changeFrequency' | 'priority' | 'lastModified'>,
): MetadataRoute.Sitemap {
  const languages = {
    ...Object.fromEntries(locales.map((locale) => [locale, `${SITE_URL}/${locale}${path}`])),
    'x-default': `${SITE_URL}/en${path}`,
  };
  return locales.map((locale) => ({
    url: `${SITE_URL}/${locale}${path}`,
    ...options,
    alternates: { languages },
  }));
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    ...localized('', { changeFrequency: 'weekly', priority: 1.0 }),
    ...localized('/about', { changeFrequency: 'monthly', priority: 0.8 }),
    ...localized('/public-life', { changeFrequency: 'weekly', priority: 0.9 }),
    ...localized('/ideals', { changeFrequency: 'monthly', priority: 0.7 }),
    ...localized('/media', { changeFrequency: 'weekly', priority: 0.7 }),
    ...localized('/updates', { changeFrequency: 'daily', priority: 0.9 }),
    ...localized('/blog', { changeFrequency: 'weekly', priority: 0.8 }),
    ...localized('/contact', { changeFrequency: 'monthly', priority: 0.8 }),
  ];

  const updateRoutes = updatesData.flatMap((update) =>
    localized(`/updates/${update.slug}`, { changeFrequency: 'monthly', priority: 0.7 }),
  );

  const blogRoutes = getPublishedBlogArticles().flatMap((article) =>
    localized(`/blog/${article.slug}`, {
      ...(article.updatedAt ? { lastModified: new Date(article.updatedAt) } : {}),
      changeFrequency: 'monthly',
      priority: 0.7,
    }),
  );

  return [...staticRoutes, ...updateRoutes, ...blogRoutes];
}
