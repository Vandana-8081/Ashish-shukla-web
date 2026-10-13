import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Search, Ship } from 'lucide-react';
import type { BlogArticle, BlogCategory } from '@/data/blogs';
import type { Locale } from '@/types';

interface BlogListingProps {
  locale: Locale;
  articles: BlogArticle[];
  recentArticles: BlogArticle[];
  categories: BlogCategory[];
  query: string;
  selectedCategory: string;
  page: number;
  totalPages: number;
}

function pageHref(locale: Locale, page: number, query: string, category: string) {
  const params = new URLSearchParams();
  params.set('page', String(page));
  if (query) params.set('q', query);
  if (category) params.set('category', category);
  const suffix = params.toString();
  return `/${locale}/blog${suffix ? `?${suffix}` : ''}`;
}

export function BlogListing({ locale, articles, recentArticles, categories, query, selectedCategory, page, totalPages }: BlogListingProps) {
  const hi = locale === 'hi';
  const text = hi
    ? { author: 'लेखक', readMore: 'पूरा पढ़ें', search: 'शीर्षक या लेख में खोजें', searchButton: 'खोजें', category: 'विषय', all: 'सभी विषय', recent: 'हाल के ब्लॉग', previous: 'पिछला', next: 'अगला', page: 'पृष्ठ', emptySearch: 'आपकी खोज से कोई प्रकाशित लेख नहीं मिला।', emptyCategory: 'इस विषय में अभी कोई प्रकाशित लेख नहीं है।', clear: 'फ़िल्टर हटाएँ', featured: 'विशेष लेख', noImage: 'तस्वीर उपलब्ध नहीं' }
    : { author: 'By', readMore: 'Read More', search: 'Search titles and article text', searchButton: 'Search', category: 'Category', all: 'All categories', recent: 'Recent Posts', previous: 'Previous', next: 'Next', page: 'Page', emptySearch: 'No published articles match your search.', emptyCategory: 'There are no published articles in this category yet.', clear: 'Clear filters', featured: 'Featured', noImage: 'Image unavailable' };
  const featuredSlug = 'government-schemes-eligibility-benefits-application-process';

  return (
    <div className="grid gap-10 xl:grid-cols-[minmax(0,1fr)_19rem] xl:gap-12">
      <div>
        <form action={`/${locale}/blog`} method="get" className="mb-8 rounded-xl border border-[#E8E2D8] bg-white p-4 sm:p-5">
          <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_14rem_auto]">
            <label className="relative block">
              <span className="sr-only">{text.search}</span>
              <Search aria-hidden="true" className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#756B62]" />
              <input name="q" type="search" defaultValue={query} placeholder={text.search} className="w-full rounded-lg border border-[#D8CEC2] py-2.5 pl-10 pr-3 text-sm text-[#171717] placeholder:text-[#756B62] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C64C00]" />
            </label>
            <label>
              <span className="sr-only">{text.category}</span>
              <select name="category" defaultValue={selectedCategory} className="w-full rounded-lg border border-[#D8CEC2] bg-white px-3 py-2.5 text-sm text-[#332F2B] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C64C00]">
                <option value="">{text.all}</option>
                {categories.map((category) => <option key={category.id} value={category.id}>{category.name[locale]}</option>)}
              </select>
            </label>
            <button type="submit" className="rounded-lg bg-[#C64C00] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#A33E00] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C64C00]">{text.searchButton}</button>
          </div>
          {(query || selectedCategory) && <Link href={`/${locale}/blog`} className="mt-3 inline-block text-xs font-semibold text-[#A94300] underline underline-offset-4">{text.clear}</Link>}
        </form>

        <div className="grid items-stretch gap-6 sm:grid-cols-2">
          {articles.length ? articles.map((article) => {
            const featured = article.slug === featuredSlug;
            return (
              <article key={article.id} className="group flex min-w-0 flex-col overflow-hidden rounded-2xl border border-[#E8E2D8] bg-white shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-[#F5660A]/60 hover:shadow-md">
                <Link href={`/${locale}/blog/${article.slug}`} aria-label={article.title[locale]} className="relative block aspect-[16/10] overflow-hidden bg-[#F2EDE6] focus-visible:outline-2 focus-visible:outline-[#C64C00]">
                  {article.image ? (
                    <Image src={article.image} alt={article.imageAlt[locale]} fill sizes="(max-width: 640px) 100vw, (max-width: 1279px) 50vw, 700px" className="object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
                  ) : (
                    <span className="flex h-full flex-col items-center justify-center gap-2 text-[#8B8177]"><Ship aria-hidden="true" className="h-9 w-9" /><span className="text-xs font-medium">{text.noImage}</span></span>
                  )}
                  {featured && <span className="absolute left-4 top-4 rounded-full bg-[#C64C00] px-3 py-1 text-xs font-bold text-white shadow-sm">{text.featured}</span>}
                </Link>
                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  <div className="mb-3 flex flex-wrap items-center gap-2 text-xs text-[#6B625A]">
                    <span className="rounded-full bg-[#FFF3E8] px-3 py-1 font-semibold text-[#A94300]">{article.categoryId && categories.find((c) => c.id === article.categoryId)?.name[locale]}</span>
                    <span>{text.author} {article.author[locale]}</span>
                  </div>
                  <h2 className="font-editorial text-xl font-bold leading-snug text-[#171412] sm:text-xl">
                    <Link href={`/${locale}/blog/${article.slug}`} className="transition-colors hover:text-[#A94300] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C64C00]">{article.title[locale]}</Link>
                  </h2>
                  <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-[#625950] sm:text-base">{article.excerpt[locale]}</p>
                  <Link href={`/${locale}/blog/${article.slug}`} className="mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-bold text-[#A94300] hover:text-[#752D00] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C64C00]">
                    {text.readMore}<ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </div>
              </article>
            );
          }) : (
            <div className="py-16 text-center text-[#625950]" role="status">{query ? text.emptySearch : text.emptyCategory}</div>
          )}
        </div>

        {totalPages > 1 && (
          <nav className="mt-8 flex flex-wrap items-center justify-center gap-2" aria-label={hi ? 'पृष्ठ नेविगेशन' : 'Pagination'}>
            {page > 1 ? (
              <Link href={pageHref(locale, page - 1, query, selectedCategory)} className="inline-flex items-center gap-1 rounded-lg border border-[#D8CEC2] bg-white px-3 py-2 text-sm font-semibold text-[#332F2B] hover:border-[#C64C00] focus-visible:outline-2 focus-visible:outline-[#C64C00]"><ArrowLeft aria-hidden="true" className="h-4 w-4" />{text.previous}</Link>
            ) : (
              <span aria-disabled="true" className="inline-flex items-center gap-1 rounded-lg border border-[#E8E2D8] bg-[#F5F1EB] px-3 py-2 text-sm text-[#9A9187]"><ArrowLeft aria-hidden="true" className="h-4 w-4" />{text.previous}</span>
            )}
            {Array.from({ length: totalPages }, (_, index) => index + 1).map((number) => (
              <Link key={number} href={pageHref(locale, number, query, selectedCategory)} aria-current={page === number ? 'page' : undefined} className={`min-w-10 rounded-lg border px-3 py-2 text-center text-sm font-semibold focus-visible:outline-2 focus-visible:outline-[#C64C00] ${page === number ? 'border-[#C64C00] bg-[#C64C00] text-white' : 'border-[#D8CEC2] bg-white text-[#332F2B] hover:border-[#C64C00]'}`}>{number}</Link>
            ))}
            {page < totalPages ? (
              <Link href={pageHref(locale, page + 1, query, selectedCategory)} className="inline-flex items-center gap-1 rounded-lg border border-[#D8CEC2] bg-white px-3 py-2 text-sm font-semibold text-[#332F2B] hover:border-[#C64C00] focus-visible:outline-2 focus-visible:outline-[#C64C00]">{text.next}<ArrowRight aria-hidden="true" className="h-4 w-4" /></Link>
            ) : (
              <span aria-disabled="true" className="inline-flex items-center gap-1 rounded-lg border border-[#E8E2D8] bg-[#F5F1EB] px-3 py-2 text-sm text-[#9A9187]">{text.next}<ArrowRight aria-hidden="true" className="h-4 w-4" /></span>
            )}
            <span className="sr-only">{text.page} {page} / {totalPages}</span>
          </nav>
        )}
      </div>

      <aside className="lg:border-l lg:border-[#E5DDD3] lg:pl-8">
        <h2 className="border-b border-[#E5DDD3] pb-3 font-editorial text-xl font-bold text-[#171412]">{text.recent}</h2>
        <ul className="divide-y divide-[#E5DDD3]">
          {recentArticles.map((article) => (
            <li key={article.id} className="py-4">
              <Link href={`/${locale}/blog/${article.slug}`} className="mt-1 block font-semibold leading-snug text-[#302A25] hover:text-[#A94300] focus-visible:outline-2 focus-visible:outline-[#C64C00]">{article.title[locale]}</Link>
            </li>
          ))}
        </ul>
      </aside>
    </div>
  );
}
