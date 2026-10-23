'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '@/lib/languageContext';
import { timelineStops, banner, timelineHead } from '@/data/story';
import { ParallaxBg, Reveal, Stagger, Item } from './motion';
import type { LocalizedString } from '@/types';

type L = LocalizedString;

/** Renders the section title without decorative highlight styling. */
export function AccentTitle({ title, className = 'ed-h2' }: { title: string; accent?: string; className?: string }) {
  return <h2 className={className}>{title}</h2>;
}

export function SectionHead({
  eyebrow,
  title,
  accent,
  text,
  center,
  dark,
}: {
  eyebrow?: L;
  title: L;
  accent?: L;
  text?: L;
  center?: boolean;
  dark?: boolean;
}) {
  const { t } = useLanguage();
  return (
    <Reveal className={`max-w-[880px] ${center ? 'mx-auto text-center' : ''}`}>
      {eyebrow && <div className="ed-eyebrow mb-3">{t(eyebrow)}</div>}
      <AccentTitle title={t(title)} accent={accent ? t(accent) : undefined} className={`ed-h2 ${dark ? '!text-white' : ''}`} />
      {text && <p className={`ed-body mt-5 ${dark ? '!text-white/75' : ''} ${center ? 'mx-auto max-w-[760px]' : 'max-w-[760px]'}`}>{t(text)}</p>}
    </Reveal>
  );
}

/** Photo-backed page header — bottom-aligned white text on a dark gradient. */
export function PageHero({
  eyebrow,
  title,
  text,
  image = '/images/gallery/a8.jpg',
  position = 'object-center',
}: {
  eyebrow: L;
  title: L;
  text?: L;
  image?: string;
  position?: string;
}) {
  const { t } = useLanguage();
  return (
    <section className="relative flex min-h-[440px] items-end overflow-hidden bg-[var(--navy-deep)] md:min-h-[510px]">
      <motion.div
        initial={{ scale: 1.12 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2.2, ease: [0.2, 0.8, 0.2, 1] }}
        className="absolute inset-0"
      >
        <Image src={image} alt="" fill priority sizes="100vw" className={`object-cover ${position}`} />
      </motion.div>
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,29,44,.35),rgba(10,29,44,.9))]" />
      <div className="tricolor-rule absolute inset-x-0 top-0" />
      <div className="container-site relative z-10 py-14 text-white md:py-16">
        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.15 }}
          className="ed-eyebrow !text-[#ffb27a]">{t(eyebrow)}</motion.div>
        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.25 }}
          className="ed-title mt-4 max-w-[900px]">{t(title)}</motion.h1>
        {text && (
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.45 }}
            className="mt-6 max-w-3xl text-[17px] leading-8 text-white/80 md:text-[20px]">{t(text)}</motion.p>
        )}
      </div>
    </section>
  );
}

/** Vertical orange line; milestones alternate sides on desktop and reveal as you scroll. */
export function Timeline({ showHead = true }: { showHead?: boolean }) {
  const { t } = useLanguage();
  return (
    <section className="section-pad">
      <div className="container-site">
        {showHead && <SectionHead eyebrow={timelineHead.eyebrow} title={timelineHead.title} text={timelineHead.text} center />}
        <div className="journey-line relative mx-auto mt-14 max-w-[1050px]">
          {timelineStops.map((s, i) => {
            const left = i % 2 === 0;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0.15, y: 34 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
                className="relative pb-10 pl-14 md:grid md:grid-cols-2 md:gap-16 md:pl-0"
              >
                <span className="ed-pulse absolute left-[18px] top-6 z-10 h-3 w-3 -translate-x-1/2 rounded-full bg-[var(--saffron)] md:left-1/2">
                </span>
                <div className={`ed-card p-6 md:p-7 ${left ? 'md:col-start-1 md:text-right' : 'md:col-start-2'}`}>
                  <h3 className="font-editorial text-2xl font-bold text-[var(--navy)] md:text-[28px]">{t(s.title)}</h3>
                  <p className="mt-2 leading-7 text-[#5d574f]">{t(s.text)}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/** Full-width photo with parallax and a bold statement. */
export function Banner({ cta }: { cta?: { href: string; label: L } }) {
  const { t, getHref } = useLanguage();
  return (
    <section className="relative overflow-hidden py-20 md:py-28">
      <ParallaxBg src={banner.image} />
      <div className="container-site relative z-10">
        <Reveal>
          <h2 className="max-w-5xl font-editorial text-[clamp(32px,4.6vw,64px)] font-bold leading-[1.25] text-white">{t(banner.title)}</h2>
          {cta && (
            <Link href={getHref(cta.href)} className="mt-8 inline-flex items-center gap-3 rounded-full bg-white px-6 py-3.5 text-sm font-bold text-black transition hover:-translate-y-0.5 hover:bg-[#ffe9d6]">
              {t(cta.label)} <ArrowRight className="h-4 w-4" />
            </Link>
          )}
        </Reveal>
      </div>
    </section>
  );
}

/** Pill chips that pop in. */
export function Chips({ items, tone = 'light' }: { items: L[]; tone?: 'light' | 'dark' }) {
  const { t } = useLanguage();
  return (
    <Stagger className="flex flex-wrap gap-3">
      {items.map((x, i) => (
        <Item key={i}>
          <span
            className={`inline-block rounded-full border px-5 py-2.5 text-sm font-semibold ${
              tone === 'dark' ? 'border-white/20 bg-white/10 text-white' : 'border-[var(--line)] bg-[#fffdf8] text-[var(--navy)]'
            }`}
          >
            {t(x)}
          </span>
        </Item>
      ))}
    </Stagger>
  );
}

/** Slowly scrolling band of keywords. */
export function MarqueeStrip({ text }: { text: string }) {
  const row = Array.from({ length: 8 }, () => text).join('   ✦   ');
  return (
    <div aria-hidden className="overflow-hidden bg-[var(--navy)] py-4 text-white">
      <div className="ed-marquee font-editorial text-xl md:text-2xl">
        <span className="whitespace-nowrap pr-10">{row}</span>
        <span className="whitespace-nowrap pr-10">{row}</span>
      </div>
    </div>
  );
}
