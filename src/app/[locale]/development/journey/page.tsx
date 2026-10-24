import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Container } from '@/components/ui/Container';
import { JourneyStatCard } from '@/components/development/IdeasParts';
import { ideasIntro } from '@/data/ideas';
import { journeyPage, journeyStats } from '@/data/journey-stats';
import type { Locale } from '@/types';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const l: Locale = locale === 'hi' ? 'hi' : 'en';
  return {
    title: journeyPage.title[l],
    description: journeyPage.subtitle[l],
    alternates: { canonical: `/${l}/development/journey`, languages: { en: '/en/development/journey', hi: '/hi/development/journey' } },
  };
}

export default async function JourneyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  if (raw !== 'en' && raw !== 'hi') notFound();
  const locale = raw as Locale;
  const hi = locale === 'hi';
  const sections = (['india', 'up'] as const).map((key) => ({
    key,
    ...journeyPage.sections[key],
    stats: journeyStats.filter((stat) => stat.section === key),
  }));

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
              <li className="font-semibold text-[#1C1410]">{ideasIntro.journeyHeading[locale]}</li>
            </ol>
          </nav>
          <div className="mt-6 grid items-center gap-8 lg:grid-cols-12 lg:gap-12">
            <div className="min-w-0 lg:col-span-7">
              <h1 className="max-w-3xl font-editorial text-4xl font-bold leading-tight tracking-tight text-[#1C1410] sm:text-4xl lg:text-5xl">{journeyPage.title[locale]}</h1>
              <p className="mt-5 max-w-2xl text-lg leading-relaxed text-[#4A3F37]">{journeyPage.subtitle[locale]}</p>
              <ul className="mt-8 flex flex-wrap gap-x-8 gap-y-3 border-t border-[#F5C9A8] pt-6 text-sm text-[#1C1410]">
                {sections.map((section) => (
                  <li key={section.key}>
                    <a href={`#${section.key}`} className="inline-flex items-center gap-2 hover:text-[#B84F08]">
                      <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-[#F47216]" />
                      {section.title[locale]}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="lg:col-span-5">
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-[#0F3A48] shadow-lg">
                <Image src="/images/development/hero.png" alt={hi ? 'श्री राम जन्मभूमि मंदिर, अयोध्या' : 'Shri Ram Janmabhoomi Mandir, Ayodhya'} fill priority sizes="(max-width: 1023px) 100vw, 520px" className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <p className="absolute inset-x-5 bottom-4 text-sm font-semibold text-white [text-shadow:0_1px_8px_rgb(0_0_0/0.5)]">{hi ? 'श्री राम जन्मभूमि मंदिर, अयोध्या' : 'Shri Ram Janmabhoomi Mandir, Ayodhya'}</p>
              </div>
            </div>
          </div>
        </Container>
      </header>

      <Container size="wide" className="py-10 md:py-14">
        {sections.map((section) => (
          <section key={section.key} id={section.key} aria-labelledby={`${section.key}-heading`} className="mb-14 scroll-mt-24">
            <h2 id={`${section.key}-heading`} className="font-editorial text-2xl font-bold text-[#171412]">{section.title[locale]}</h2>
            <p className="mb-6 mt-2 max-w-2xl text-sm leading-relaxed text-[#625950]">{section.subtitle[locale]}</p>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {section.stats.map((stat) => <JourneyStatCard key={stat.id} stat={stat} locale={locale} />)}
            </div>
          </section>
        ))}

      </Container>
    </main>
  );
}
