import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, Route, GraduationCap, HeartPulse, Droplet, MessageSquare } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { IdeaCard, JourneyStatCard } from '@/components/development/IdeasParts';
import { areaPriorities, ideaArticles, ideasIntro, ourApproach } from '@/data/ideas';
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
  const priorityIcons = [Route, GraduationCap, HeartPulse, Droplet, MessageSquare];

  return (
    <main className="min-h-[70vh] bg-white">
      <header className="relative isolate overflow-hidden border-b border-[#E5D8C7] bg-[#F2EBDD]">
        <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-40 -z-10 h-[440px] w-[440px] rounded-full border-[54px] border-[#E7D6C0]/60" />
        <div aria-hidden="true" className="pointer-events-none absolute -bottom-24 right-[12%] -z-10 h-56 w-56 rounded-full bg-[#F5660A]/[0.06] blur-2xl" />
        <Container size="wide" className="relative pb-11 pt-7 sm:pb-14 lg:pb-16">
          <nav aria-label="Breadcrumb" className="text-sm text-[#6E625A]">
            <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-1">
              <li><Link href={`/${locale}`} className="hover:text-[#B84F08]">{hi ? 'होम' : 'Home'}</Link></li>
              <li aria-hidden="true">›</li>
              <li className="font-semibold text-[#1C1410]">{ideasIntro.title[locale]}</li>
            </ol>
          </nav>
          <div className="mt-9 grid items-end gap-7 lg:grid-cols-[minmax(0,1fr)_minmax(300px,.62fr)] lg:gap-14">
            <div>
              <span className="inline-flex items-center gap-2 text-sm font-bold tracking-[0.08em] text-[#B84F08]">
                <span aria-hidden="true" className="h-1 w-7 rounded-full bg-[#F5660A]" />
                {hi ? 'विकास की दिशा' : 'IDEAS & PROGRESS'}
              </span>
              <h1 className="mt-3 max-w-4xl font-editorial text-4xl font-bold leading-[1.12] tracking-tight text-[#171412] sm:text-4xl lg:text-5xl">{ideasIntro.title[locale]}</h1>
            </div>
            <p className="max-w-xl border-l-2 border-[#F5660A] pl-5 text-base leading-7 text-[#4A3F37] sm:text-lg sm:leading-8 lg:mb-1">{ideasIntro.subtitle[locale]}</p>
          </div>
        </Container>
      </header>

      <section aria-labelledby="our-approach-heading" className="border-b border-[#EBE2D8] bg-[#FFFCF8]">
        <Container size="wide" className="py-10 md:py-14">
          <div className="grid gap-8 md:grid-cols-2 md:gap-12 lg:gap-16">
            <div className="relative overflow-hidden rounded-2xl border border-[#E8D8C8] border-l-4 border-l-[#F5660A] bg-[#F8F0E6] p-6 shadow-[0_12px_35px_rgba(61,43,29,0.07)] sm:p-9">
              <h2 id="our-approach-heading" className="font-editorial text-4xl font-bold leading-tight text-[#000000] sm:text-4xl">{ourApproach.title[locale]}</h2>
              <p className="mt-5 text-lg leading-8 text-[#403A34] sm:text-xl sm:leading-9">{ourApproach.mainIdea.text[locale]}</p>
            </div>
            <div className="border-t border-[#E7DED3] pt-6 md:border-l md:border-t-0 md:pl-10 md:pt-0">
              <div className="space-y-4 text-base leading-7 text-[#4A3F37]">
                {ourApproach.commitment.paragraphs.map((paragraph, index) => <p key={index}>{paragraph[locale]}</p>)}
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section aria-labelledby="area-priorities-heading" className="bg-[#FBF8F0]">
        <Container size="wide" className="py-10 md:py-14">
          <h2 id="area-priorities-heading" className="font-editorial text-3xl font-bold text-[#293644] sm:text-4xl">{areaPriorities.title[locale]}</h2>
          <p className="mt-3 text-base leading-relaxed text-[#4A5B6A] sm:text-lg">{areaPriorities.subtitle[locale]}</p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {areaPriorities.items.map((item, index) => {
              const Icon = priorityIcons[index];
              return (
                <article key={item.icon} className="min-h-[190px] rounded-lg border border-[#E4E3E6] bg-white p-5 shadow-[0_5px_18px_rgba(28,20,16,0.08)]">
                  <Icon aria-hidden="true" className="h-7 w-7 text-[#C63F08]" strokeWidth={2} />
                  <h3 className="mt-5 font-editorial text-lg font-bold text-[#253348]">{item.title[locale]}</h3>
                  <p className="mt-2 text-sm leading-6 text-[#4A5B6A]">{item.text[locale]}</p>
                </article>
              );
            })}
          </div>
        </Container>
      </section>

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
