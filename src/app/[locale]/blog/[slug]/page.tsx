import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { blogArticles, getBlogCategory, getPublishedBlogArticles } from '@/data/blogs';
import type { Locale } from '@/types';

interface ArticlePageProps { params: Promise<{ locale: string; slug: string }> }

export function generateStaticParams() {
  return ['en', 'hi'].flatMap((locale) => getPublishedBlogArticles().map((article) => ({ locale, slug: article.slug })));
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { locale: rawLocale, slug } = await params;
  const locale: Locale = rawLocale === 'hi' ? 'hi' : 'en';
  const article = getPublishedBlogArticles().find((item) => item.slug === slug);
  if (!article) return { title: locale === 'hi' ? 'लेख उपलब्ध नहीं' : 'Article not found' };
  const title = article.title[locale];
  const description = article.excerpt[locale];
  return {
    title,
    description,
    alternates: { canonical: `/${locale}/blog/${slug}`, languages: { en: `/en/blog/${slug}`, hi: `/hi/blog/${slug}` } },
    openGraph: {
      type: 'article', title, description, url: `/${locale}/blog/${slug}`,
      ...(article.publishedAt ? { publishedTime: new Date(`${article.publishedAt}T12:00:00Z`).toISOString() } : {}),
      ...(article.updatedAt ? { modifiedTime: new Date(`${article.updatedAt}T12:00:00Z`).toISOString() } : {}),
      ...(article.image ? { images: [{ url: article.image, alt: article.imageAlt[locale] }] } : {}),
    },
  };
}

export default async function BlogArticlePage({ params }: ArticlePageProps) {
  const { locale: rawLocale, slug } = await params;
  if (rawLocale !== 'en' && rawLocale !== 'hi') notFound();
  const locale = rawLocale as Locale;
  const article = getPublishedBlogArticles().find((item) => item.slug === slug);
  if (!article) notFound();
  const related = blogArticles.filter((item) => item.status === 'published' && item.categoryId === article.categoryId && item.slug !== article.slug).slice(0, 3);
  const labels = locale === 'hi'
    ? { back: 'ब्लॉग पर वापस जाएँ', source: 'आधिकारिक स्रोत एवं संदर्भ', related: 'संबंधित लेख', disclaimer: 'यह लेख जनसूचना के लिए है। पात्रता, प्रक्रियाओं और ताज़ा निर्देशों के लिए संबंधित विभाग का वर्तमान विवरण देखें।' }
    : { back: 'Back to Blog', source: 'Official sources & references', related: 'Related articles', disclaimer: 'This article is for public information. Check the responsible department’s current information for eligibility, procedures, and updated instructions.' };
  const isAuthorConfirmed = article.author[locale] !== 'Author to be confirmed' && article.author[locale] !== 'लेखक की पुष्टि लंबित';
  const articleJsonLd = {
    '@context': 'https://schema.org', '@type': 'Article', headline: article.title[locale], description: article.excerpt[locale],
    ...(article.publishedAt ? { datePublished: article.publishedAt } : {}),
    ...(article.updatedAt ? { dateModified: article.updatedAt } : {}),
    ...(isAuthorConfirmed ? { author: { '@type': 'Person', name: article.author[locale] } } : {}),
    mainEntityOfPage: `https://ashish-shukla.org/${locale}/blog/${slug}`,
    ...(article.image ? { image: `https://ashish-shukla.org${article.image}` } : {}),
  };

  return (
    <article className="bg-[#FAF7F2] py-10 md:py-16">
      <Container size="narrow">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
        <Link href={`/${locale}/blog`} className="mb-7 inline-flex items-center gap-2 text-sm font-semibold text-[#A94300] hover:text-[#752D00] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C64C00]"><ArrowLeft aria-hidden="true" className="h-4 w-4" />{labels.back}</Link>
        <header className="mb-8">
          <p className="mb-3 text-sm font-semibold text-[#A94300]">{getBlogCategory(article.categoryId, locale)}</p>
          <h1 className="font-editorial text-2xl font-bold leading-tight text-[#171412] sm:text-3xl md:text-4xl">{article.title[locale]}</h1>
          <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 border-y border-[#E5DDD3] py-3 text-sm text-[#6B625A]">
            <span>{locale === 'hi' ? 'लेखक:' : 'By'} {article.author[locale]}</span>
          </div>
          <p className="mt-5 text-lg leading-relaxed text-[#625950]">{article.excerpt[locale]}</p>
        </header>

        {article.image && <div className="relative mb-9 aspect-[16/9] overflow-hidden rounded-xl bg-[#E8E2D8]"><Image src={article.image} alt={article.imageAlt[locale]} fill priority sizes="(max-width: 768px) 100vw, 800px" className="object-cover" /></div>}

        <div className="space-y-9">
          {article.sections.map((section) => (
            <section key={section.heading.en} className="space-y-4">
              <h2 className="font-editorial text-xl font-bold text-[#171412] sm:text-2xl">{section.heading[locale]}</h2>
              {section.paragraphs.map((paragraph, index) => <p key={index} className="text-base leading-8 text-[#332F2B] sm:text-lg">{paragraph[locale]}</p>)}
            </section>
          ))}
        </div>

        {article.sources.length > 0 && <aside className="mt-10 border-t border-[#E5DDD3] pt-6">
          <h2 className="font-editorial text-xl font-bold text-[#171412]">{labels.source}</h2>
          <ul className="mt-4 space-y-3">
            {article.sources.map((source) => <li key={source.url}><a href={source.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-start gap-2 text-sm font-medium leading-relaxed text-[#A94300] underline decoration-[#D8CEC2] underline-offset-4 hover:text-[#752D00] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C64C00]"><span>{source.name[locale]}</span><ExternalLink aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0" /></a></li>)}
          </ul>
          <p className="mt-5 text-xs leading-relaxed text-[#6B625A]">{labels.disclaimer}</p>
        </aside>}

        {related.length > 0 && <aside className="mt-10 border-t border-[#E5DDD3] pt-6">
          <h2 className="font-editorial text-xl font-bold text-[#171412]">{labels.related}</h2>
          <ul className="mt-4 space-y-3">{related.map((item) => <li key={item.slug}><Link href={`/${locale}/blog/${item.slug}`} className="font-semibold text-[#A94300] hover:text-[#752D00]">{item.title[locale]}</Link></li>)}</ul>
        </aside>}
      </Container>
    </article>
  );
}
