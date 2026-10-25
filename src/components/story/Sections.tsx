'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '@/lib/languageContext';
import { StoryIcon } from './StoryIcon';
import { SectionHead } from './Blocks';
import { Item, ParallaxBg, Reveal, Stagger } from './motion';
import { closing, governance, nextChapter, priorities } from '@/data/story';

export function Governance() {
  const { t, getHref } = useLanguage();
  return (
    <section className="section-pad">
      <div className="container-site">
        <SectionHead
          eyebrow={governance.eyebrow}
          title={governance.title}
          accent={{ en: 'personal convenience ends', hi: 'व्यक्तिगत सुविधा समाप्त' }}
          text={governance.intro}
        />

        <Stagger className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4">
          {governance.steps.map((s) => (
            <Item key={t(s)}>
              <div className="h-full rounded-[24px] bg-[var(--navy)] p-6 text-white transition hover:-translate-y-1.5 hover:bg-[var(--navy-deep)]">
                <div className="mt-3 text-lg font-semibold leading-snug">{t(s)}</div>
              </div>
            </Item>
          ))}
        </Stagger>

        <Stagger className="mt-5 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
          {governance.areas.map((a) => (
            <Item key={a.icon}>
              <div className="ed-card p-5 text-center">
                <StoryIcon name={a.icon} className="mx-auto h-8 w-8 text-[var(--saffron)]" />
                <div className="mt-3 text-sm font-bold text-[var(--navy)]">{t(a.title)}</div>
              </div>
            </Item>
          ))}
        </Stagger>

        <div className="mt-9">
          <Link href={getHref('/public-life')} className="pill-link">
            {t({ en: 'Explore public work', hi: 'जनसेवा देखें' })} <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

/** Home page priorities presented as a compact editorial roadmap. */
export function Priorities() {
  const { t } = useLanguage();
  return (
    <section className="section-pad relative overflow-hidden bg-[var(--navy-deep)] text-white">
      <div aria-hidden="true" className="absolute -right-24 -top-28 h-96 w-96 rounded-full border border-white/[0.06]" />
      <div aria-hidden="true" className="absolute -right-10 -top-14 h-72 w-72 rounded-full border border-white/[0.06]" />
      <div className="container-site relative grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <div className="ed-eyebrow !text-[#ffad72]">{t(priorities.eyebrow)}</div>
          <h2 className="mt-4 max-w-xl font-editorial text-[clamp(28px,3.6vw,46px)] font-semibold leading-[1.16] text-white">
            {t(priorities.title)}
          </h2>
          <p className="mt-6 max-w-lg text-base leading-8 text-white/70 sm:text-lg">
            {t(priorities.intro)}
          </p>
          <div className="mt-9 flex items-center gap-3 text-sm font-semibold text-[#ffad72]">
            <span className="h-px w-10 bg-[#ffad72]" />
            {String(priorities.items.length).padStart(2, '0')} {t({ en: 'community priorities', hi: '\u091c\u0928 \u092a\u094d\u0930\u093e\u0925\u092e\u093f\u0915\u0924\u093e\u090f\u0901' })}
          </div>
        </div>

        <div className="divide-y divide-white/15 border-y border-white/15">
          {priorities.items.map((p, index) => (
            <article key={t(p.title)} className="group grid grid-cols-[42px_1fr] gap-4 py-6 sm:grid-cols-[54px_1fr] sm:gap-6 sm:py-7">
              <span className="pt-1 font-serif text-sm tabular-nums text-white/40 transition-colors group-hover:text-[#ffad72]">
                {String(index + 1).padStart(2, '0')}
              </span>
              <div className="flex gap-4 sm:gap-5">
                <span className="mt-1 grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/15 text-[#ffad72] transition-colors group-hover:border-[#ffad72]/50 group-hover:bg-white/[0.06]">
                  <StoryIcon name={p.icon} className="h-[18px] w-[18px]" />
                </span>
                <div>
                  <h3 className="font-editorial text-lg font-semibold leading-snug text-white sm:text-xl">
                    {t(p.title)}
                  </h3>
                  <p className="mt-2 max-w-xl text-sm leading-6 text-white/60 sm:text-base">
                    {t(p.text)}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function NextChapter() {
  const { t } = useLanguage();
  return (
    <section className="relative overflow-hidden py-20 sm:py-28 md:py-40 min-h-[460px] md:min-h-[620px] flex items-center">
      <ParallaxBg src="/images/gallery/a11.jpg" position="object-top" overlay="linear-gradient(90deg,rgba(121,61,55,.92),rgba(16,45,73,.8))" />
      <div className="container-site relative z-10 text-white">
        <Reveal>
          {t(nextChapter.eyebrow).trim() && <div className="ed-eyebrow !text-[#ffb27a]">{t(nextChapter.eyebrow)}</div>}
          <h2 className="mt-4 max-w-5xl font-editorial text-[clamp(28px,3.6vw,46px)] font-bold leading-[1.08]">{t(nextChapter.title)}</h2>
          <p className="mt-6 max-w-2xl text-[17px] leading-8 text-white/80">{t(nextChapter.text)}</p>
        </Reveal>
      </div>
    </section>
  );
}

export function Closing() {
  const { t, getHref } = useLanguage();
  return (
    <section className="relative overflow-hidden bg-[var(--navy-deep)] py-16 text-center text-white md:py-20">
      <div aria-hidden className="ed-float absolute left-1/2 top-8 h-64 w-64 -translate-x-1/2 rounded-full bg-[var(--saffron)]/15 blur-3xl" />
      <div className="container-site relative">
        <Reveal>
          {t(closing.eyebrow).trim() && <div className="ed-eyebrow !text-[#ffb27a]">{t(closing.eyebrow)}</div>}
        </Reveal>
        <Stagger className="mx-auto mt-6 max-w-4xl space-y-2 text-sm leading-relaxed text-white/70 sm:text-base md:text-lg">
          {closing.lines.map((l, i) => (
            <Item key={i}><p>{t(l)}</p></Item>
          ))}
        </Stagger>
        <Reveal delay={0.2}>
          <h2 className="mx-auto mt-8 max-w-4xl text-balance font-editorial text-[clamp(28px,3.6vw,46px)] font-bold leading-[1.16] text-[#ffb27a]">{t(closing.place)}</h2>
          <div className="mt-5 space-y-1 font-editorial text-base sm:text-lg md:text-xl">
            {closing.final.map((l, i) => (
              <p key={i}>{t(l)}</p>
            ))}
          </div>
          <Link href={getHref('/contact')} className="mt-10 inline-flex items-center gap-3 rounded-full bg-white px-7 py-4 text-sm font-bold text-black transition hover:-translate-y-0.5 hover:bg-[#ffe9d6]">
            {t(closing.cta)} <ArrowRight className="h-4 w-4" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
