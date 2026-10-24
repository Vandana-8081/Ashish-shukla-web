import type { Metadata } from 'next';
import { breadcrumbJsonLd, pageMetadata } from '@/lib/seo';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ExternalLink, FileText, ListChecks, Users } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { CoverImage } from '@/components/development/IdeasParts';
import { ideaArticles, ideasIntro, type IdeaSection } from '@/data/ideas';
import { SITE_URL } from '@/lib/site';
import type { Locale } from '@/types';

interface Props { params: Promise<{ locale: string; slug: string }> }

export function generateStaticParams() {
  return ['en', 'hi'].flatMap((locale) => ideaArticles.map((article) => ({ locale, slug: article.slug })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const l: Locale = locale === 'hi' ? 'hi' : 'en';
  const article = ideaArticles.find((item) => item.slug === slug);
  if (!article) return {};
  return pageMetadata({
    locale: l,
    path: `/development/ideas/${slug}`,
    title: article.title[l],
    description: article.summary[l],
    image: article.image,
    type: 'article',
    publishedTime: article.publishedAt,
  });
}

/** Splits a paragraph into sentences (English full stop or Hindi danda). */
function sentences(text: string) {
  return text.split(/(?<=[.।])\s+/u).map((part) => part.trim()).filter(Boolean);
}

function sectionIcon(section: IdeaSection) {
  const icon = 'h-5 w-5 shrink-0 text-[#F47216]';
  if (section.heading.en === 'Who can benefit') return <Users aria-hidden="true" className={icon} />;
  if (section.heading.en === 'How to apply') return <ListChecks aria-hidden="true" className={icon} />;
  return <FileText aria-hidden="true" className={icon} />;
}

export default async function IdeaArticlePage({ params }: Props) {
  const { locale: raw, slug } = await params;
  if (raw !== 'en' && raw !== 'hi') notFound();
  const locale = raw as Locale;
  const hi = locale === 'hi';
  const article = ideaArticles.find((item) => item.slug === slug);
  if (!article) notFound();

  const published = new Intl.DateTimeFormat(hi ? 'hi-IN' : 'en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
    .format(new Date(`${article.publishedAt}T00:00:00`));
  const articleUrl = `${SITE_URL}/${locale}/development/ideas/${article.slug}`;
  const whatsappHref = `https://wa.me/?text=${encodeURIComponent(`${article.title[locale]} ${articleUrl}`)}`;
  const sourceHost = new URL(article.sourceUrl).hostname.replace(/^www\./u, '');
  const card = 'rounded-2xl border border-[#F5C9A8] bg-white p-4 shadow-sm';

  const jsonLd = [
    breadcrumbJsonLd(locale, [
      [hi ? 'होम' : 'Home', ''],
      [ideasIntro.title[locale], '/development'],
      [ideasIntro.ideasHeading[locale], '/development/ideas'],
      [article.title[locale], `/development/ideas/${article.slug}`],
    ]),
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: article.title[locale],
      description: article.summary[locale],
      image: `${SITE_URL}${article.image}`,
      datePublished: article.publishedAt,
      inLanguage: hi ? 'hi-IN' : 'en-IN',
      mainEntityOfPage: articleUrl,
      author: { '@id': `${SITE_URL}/#person` },
      publisher: { '@id': `${SITE_URL}/#person` },
    },
  ];

  return (
    <main data-site-motion-ignore className="min-h-[70vh] bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <header className="border-b border-[#EBE2D8] bg-[#FAF6F1]/50">
        <Container size="wide" className="pb-10 pt-7 lg:pb-12">
          <nav aria-label="Breadcrumb" className="text-sm text-[#6E625A]">
            <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-1">
              <li><Link href={`/${locale}`} className="hover:text-[#B84F08]">{hi ? 'होम' : 'Home'}</Link></li>
              <li aria-hidden="true">›</li>
              <li><Link href={`/${locale}/development`} className="hover:text-[#B84F08]">{ideasIntro.title[locale]}</Link></li>
              <li aria-hidden="true">›</li>
              <li><Link href={`/${locale}/development/ideas`} className="hover:text-[#B84F08]">{ideasIntro.ideasHeading[locale]}</Link></li>
              <li aria-hidden="true">›</li>
              <li aria-current="page" className="font-semibold text-[#1C1410]">{article.title[locale]}</li>
            </ol>
          </nav>

          <div className="mt-6 grid items-center gap-8 lg:grid-cols-12 lg:gap-12">
            <div className="min-w-0 lg:col-span-7">
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#B84F08]">{article.category[locale]}</p>
              <h1 className="mt-3 font-editorial text-3xl font-bold leading-tight tracking-tight text-[#1C1410] sm:text-4xl lg:text-[44px]">{article.title[locale]}</h1>
              <p className="mt-5 max-w-2xl text-lg leading-relaxed text-[#4A3F37]">{article.summary[locale]}</p>
              <p className="mt-5 text-sm text-[#6E625A]">
                {hi ? 'प्रकाशित: ' : 'Published: '}{published} · {article.readMinutes} {hi ? 'मिनट पढ़ें' : 'min read'}
              </p>
            </div>
            <div className="lg:col-span-5">
              <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-[#0F3A48] shadow-lg">
                <CoverImage src={article.image} sizes="(max-width: 1023px) 100vw, 520px" priority />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                {article.figure && (
                  <div className="absolute inset-x-5 bottom-4 text-white [text-shadow:0_1px_8px_rgb(0_0_0/0.5)]">
                    <p className="font-editorial text-4xl font-bold leading-none text-[#F2A51A]">{article.figure[locale]}</p>
                    {article.figureCaption && <p className="mt-1 text-sm text-white/90">{article.figureCaption[locale]}</p>}
                  </div>
                )}
              </div>
            </div>
          </div>
        </Container>
      </header>

      <Container size="wide" className="py-10 md:py-14">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          <article className="min-w-0 lg:col-span-7">
            {article.sections.map((section, index) => {
              const isSteps = section.heading.en === 'How to apply';
              const isList = section.heading.en === 'Who can benefit' || section.paragraphs.length >= 3;
              const items = isSteps || section.heading.en === 'Who can benefit'
                ? section.paragraphs.flatMap((paragraph) => sentences(paragraph[locale]))
                : section.paragraphs.map((paragraph) => paragraph[locale]);
              return (
                <section key={section.heading.en} className={index === 0 ? '' : 'mt-9'}>
                  <h2 className="flex items-center gap-2.5 font-editorial text-2xl font-bold text-[#1C1410]">
                    {sectionIcon(section)}{section.heading[locale]}
                  </h2>
                  {isSteps ? (
                    <ol className="mt-4 space-y-3">
                      {items.map((item, number) => (
                        <li key={item} className="flex gap-3 leading-relaxed text-[#4A3F37]">
                          <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#FDE3CF] text-xs font-bold text-[#B84F08]">{number + 1}</span>
                          <span>{item.replace(/^(Step (one|two|three):|पहला चरण:|दूसरा चरण:|तीसरा चरण:)\s*/u, '')}</span>
                        </li>
                      ))}
                    </ol>
                  ) : isList ? (
                    <ul className="mt-4 list-disc space-y-2 pl-5 leading-relaxed text-[#4A3F37] marker:text-[#F47216]">
                      {items.map((item) => <li key={item}>{item}</li>)}
                    </ul>
                  ) : (
                    items.map((item) => <p key={item} className="mt-4 leading-relaxed text-[#4A3F37]">{item}</p>)
                  )}
                </section>
              );
            })}

            <div className="mt-10">
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-lg border border-[#EBE2D8] bg-white px-5 py-2.5 text-sm font-semibold text-[#1C1410] transition-colors hover:border-[#1FA855] hover:text-[#178A45] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1FA855]"
              >
                {hi ? 'व्हाट्सऐप पर साझा करें' : 'Share on WhatsApp'}
              </a>
            </div>
          </article>

          <aside className="space-y-4 lg:col-span-4 lg:col-start-9">
            <div className={card}>
              <p className="text-xs text-[#6E625A]">{hi ? 'आधिकारिक वेबसाइट' : 'Official website'}</p>
              <a href={article.sourceUrl} target="_blank" rel="noopener noreferrer" className="mt-1 flex items-center justify-between gap-2 text-sm font-semibold text-[#1C1410] hover:text-[#B84F08]">
                {sourceHost}
                <ExternalLink aria-hidden="true" className="h-4 w-4 text-[#F47216]" />
              </a>
            </div>
            <div className={card}>
              <p className="text-xs text-[#6E625A]">{hi ? 'स्रोत' : 'Sources'}</p>
              <a href={article.sourceUrl} target="_blank" rel="noopener noreferrer" className="mt-1 block text-sm font-semibold text-[#B84F08] underline underline-offset-2">{article.sourceName[locale]}</a>
            </div>
          </aside>
        </div>
      </Container>
    </main>
  );
}
