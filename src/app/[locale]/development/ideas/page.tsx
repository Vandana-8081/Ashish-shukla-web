import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Container } from '@/components/ui/Container';
import { IdeaCard } from '@/components/development/IdeasParts';
import { ideaArticles, ideasIntro } from '@/data/ideas';
import type { Locale } from '@/types';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const l: Locale = locale === 'hi' ? 'hi' : 'en';
  return {
    title: ideasIntro.ideasHeading[l],
    description: ideasIntro.ideasIntro[l],
    alternates: { canonical: `/${l}/development/ideas`, languages: { en: '/en/development/ideas', hi: '/hi/development/ideas' } },
  };
}

export default async function IdeasPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ category?: string | string[] }>;
}) {
  const [{ locale: raw }, query] = await Promise.all([params, searchParams]);
  if (raw !== 'en' && raw !== 'hi') notFound();
  const locale = raw as Locale;
  const hi = locale === 'hi';

  // One filter chip per category, in the order each first appears, with its article count.
  const categories = ideaArticles.reduce<{ id: string; name: string; count: number }[]>((list, article) => {
    const existing = list.find((item) => item.id === article.categoryId);
    if (existing) existing.count += 1;
    else list.push({ id: article.categoryId, name: article.category[locale], count: 1 });
    return list;
  }, []);
  const requested = Array.isArray(query.category) ? query.category[0] : query.category;
  const selected = categories.some((item) => item.id === requested) ? requested ?? '' : '';
  const visible = selected ? ideaArticles.filter((article) => article.categoryId === selected) : ideaArticles;

  const chip = (active: boolean) => `inline-flex items-center gap-1.5 rounded-full border px-4 py-1.5 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F47216] ${active ? 'border-[#B84F08] bg-[#B84F08] text-white' : 'border-[#EBE2D8] bg-white text-[#1C1410] hover:border-[#F47216]'}`;
  const count = (active: boolean) => `text-sm font-normal ${active ? 'text-white/80' : 'text-[#6E625A]'}`;
  const base = `/${locale}/development/ideas`;

  return (
    <main className="min-h-[70vh] bg-white">
      <header className="border-b border-[#EBE2D8] bg-[#FAF6F1]/50">
        <Container size="wide" className="pb-10 pt-7 lg:pb-12">
          <nav aria-label="Breadcrumb" className="text-sm text-[#6E625A]">
            <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-1">
              <li><Link href={`/${locale}`} className="hover:text-[#B84F08]">{hi ? 'होम' : 'Home'}</Link></li>
              <li aria-hidden="true">›</li>
              <li><Link href={`/${locale}/development`} className="hover:text-[#B84F08]">{ideasIntro.title[locale]}</Link></li>
              <li aria-hidden="true">›</li>
              <li className="font-semibold text-[#1C1410]">{ideasIntro.ideasHeading[locale]}</li>
            </ol>
          </nav>
          <h1 className="mt-6 max-w-3xl font-editorial text-4xl font-bold leading-tight tracking-tight text-[#1C1410] sm:text-4xl">{ideasIntro.ideasHeading[locale]}</h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-[#4A3F37]">{ideasIntro.ideasIntro[locale]}</p>
        </Container>
      </header>

      <section className="py-10 md:py-14">
        <Container size="wide">
          <h2 className="sr-only">{hi ? 'लेख एवं योजनाएँ' : 'Articles & schemes'}</h2>
          <div role="group" className="flex flex-wrap gap-2">
            <Link href={base} aria-current={!selected ? 'true' : undefined} className={chip(!selected)}>
              {hi ? 'सभी' : 'All'} <span className={count(!selected)}>{ideaArticles.length}</span>
            </Link>
            {categories.map((item) => (
              <Link key={item.id} href={`${base}?category=${item.id}`} aria-current={selected === item.id ? 'true' : undefined} className={chip(selected === item.id)}>
                {item.name} <span className={count(selected === item.id)}>{item.count}</span>
              </Link>
            ))}
          </div>
          <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((article) => <li key={article.slug}><IdeaCard article={article} locale={locale} /></li>)}
          </ul>
        </Container>
      </section>
    </main>
  );
}
