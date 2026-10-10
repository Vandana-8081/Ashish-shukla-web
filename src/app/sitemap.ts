import type { MetadataRoute } from 'next';
import { getPublishedBlogArticles } from '@/data/blogs';
import { updatesData } from '@/data/updates';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://ashish-shukla.org';

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/en/ideals`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
      alternates: { languages: { en: `${baseUrl}/en/ideals`, hi: `${baseUrl}/hi/ideals` } },
    },
    {
      url: `${baseUrl}/hi/ideals`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
      alternates: { languages: { en: `${baseUrl}/en/ideals`, hi: `${baseUrl}/hi/ideals` } },
    },
    {
      url: `${baseUrl}/public-life`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/media`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/updates`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ];

  const updateRoutes: MetadataRoute.Sitemap = updatesData.map((u) => ({
    url: `${baseUrl}/updates/${u.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  const blogRoutes: MetadataRoute.Sitemap = [
    ...(['en', 'hi'] as const).map((locale) => ({
      url: `${baseUrl}/${locale}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
      alternates: { languages: { en: `${baseUrl}/en/blog`, hi: `${baseUrl}/hi/blog` } },
    })),
    ...getPublishedBlogArticles().flatMap((article) =>
      (['en', 'hi'] as const).map((locale) => ({
        url: `${baseUrl}/${locale}/blog/${article.slug}`,
        ...(article.updatedAt ? { lastModified: new Date(article.updatedAt) } : {}),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
        alternates: {
          languages: {
            en: `${baseUrl}/en/blog/${article.slug}`,
            hi: `${baseUrl}/hi/blog/${article.slug}`,
          },
        },
      })),
    ),
  ];

  return [...staticRoutes, ...updateRoutes, ...blogRoutes];
}
