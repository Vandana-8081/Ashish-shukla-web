import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { IdeaCard, JourneyStatCard } from '@/components/development/IdeasParts';
import { ideaArticles, ideasIntro } from '@/data/ideas';
import { journeyStats } from '@/data/journey-stats';
import type { Locale } from '@/types';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const l: Locale = locale === 'hi' ? 'hi' : 'en';
  return {
    title: ideasIntro.title[l],
    description: ideasIntro.subtitle[l],
    alternates: { canonical: `/${l}/development`, languages: { en: '/en/development', hi: '/hi/development' } },
  };
}

export default async function DevelopmentPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  if (raw !== 'en' && raw !== 'hi') notFound();
  const locale = raw as Locale;
  const hi = locale === 'hi';
  const link = 'inline-flex items-center gap-1.5 text-sm font-bold text-[#A94300] hover:text-[#752D00]';

  return (
    <main className="min-h-[70vh] bg-white">
      <header className="border-b border-[#EBE2D8] bg-[#FAF6F1]/50">
        <Container size="wide" className="pb-10 pt-7 lg:pb-12">
          <nav aria-label="Breadcrumb" className="text-sm text-[#6E625A]">
            <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-1">
              <li><Link href={`/${locale}`} className="hover:text-[#B84F08]">{hi ? 'होम' : 'Home'}</Link></li>
              <li aria-hidden="true">›</li>
              <li className="font-semibold text-[#1C1410]">{ideasIntro.title[locale]}</li>
            </ol>
          </nav>
          <h1 className="mt-6 max-w-3xl font-editorial text-4xl font-bold leading-tight tracking-tight text-[#1C1410] sm:text-5xl">{ideasIntro.title[locale]}</h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-[#4A3F37]">{ideasIntro.subtitle[locale]}</p>
        </Container>
      </header>

      <Container size="wide" className="py-10 md:py-14">
        <section aria-labelledby="ideas-heading" className="mb-16">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
            <div className="max-w-2xl">
              <h2 id="ideas-heading" className="font-editorial text-2xl font-bold text-[#171412]">{ideasIntro.ideasHeading[locale]}</h2>
              <p className="mt-2 text-sm leading-relaxed text-[#625950]">{ideasIntro.ideasIntro[locale]}</p>
            </div>
            <Link href={`/${locale}/development/ideas`} className={link}>{hi ? 'सभी लेख' : 'All articles'}<ArrowRight aria-hidden="true" className="h-4 w-4" /></Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {ideaArticles.map((article) => <IdeaCard key={article.slug} article={article} locale={locale} />)}
          </div>
        </section>

        <section aria-labelledby="journey-heading">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
            <div className="max-w-2xl">
              <h2 id="journey-heading" className="font-editorial text-2xl font-bold text-[#171412]">{ideasIntro.journeyHeading[locale]}</h2>
              <p className="mt-2 text-sm leading-relaxed text-[#625950]">{ideasIntro.journeyIntro[locale]}</p>
            </div>
            <Link href={`/${locale}/development/journey`} className={link}>{hi ? 'खोलें' : 'Open'}<ArrowRight aria-hidden="true" className="h-4 w-4" /></Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {journeyStats.slice(0, 3).map((stat) => <JourneyStatCard key={stat.id} stat={stat} locale={locale} />)}
          </div>
        </section>
      </Container>
    </main>
  );
}
