'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '@/lib/languageContext';
import { StoryIcon } from './StoryIcon';
import { Banner, Chips, PageHero, SectionHead } from './Blocks';
import { Item, ParallaxBg, Reveal, Stagger, TiltImage } from './motion';
import { mediaIntro, placePage, politicalPage, servicePage } from '@/data/story2';

const responsibilityImages = [
  '/images/public-life/villageroad.webp',
  '/images/updates/safai.webp',
  '/images/public-life/light.webp',
  '/images/updates/janseva.jpg',
];

function ScrollingPhotoColumn({ photos, className = '' }: { photos: string[]; className?: string }) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<{ startY: number; startScroll: number } | null>(null);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const speed = 68;
    let frame = 0;
    let previousTime = performance.now();

    const scroll = (time: number) => {
      const elapsed = Math.min(time - previousTime, 50);
      previousTime = time;
      const cycleHeight = viewport.scrollHeight / 2;

      if (!dragRef.current && cycleHeight > viewport.clientHeight) {
        let next = viewport.scrollTop + speed * elapsed / 1000;
        const wrapAt = cycleHeight * 2 - viewport.clientHeight;
        if (next >= wrapAt) next -= cycleHeight;
        viewport.scrollTop = Math.round(next);
      }

      frame = requestAnimationFrame(scroll);
    };

    viewport.scrollTop = viewport.scrollHeight / 2;
    frame = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(frame);
  }, []);

  const loopedPhotos = [...photos, ...photos];

  return (
    <div
      ref={viewportRef}
      className={`h-full min-h-0 overflow-y-auto overscroll-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden cursor-grab active:cursor-grabbing select-none touch-pan-y ${className}`}
      onPointerDown={(event) => {
        if (event.button !== 0) return;
        dragRef.current = { startY: event.clientY, startScroll: event.currentTarget.scrollTop };
        event.currentTarget.setPointerCapture(event.pointerId);
      }}
      onPointerMove={(event) => {
        if (!dragRef.current) return;
        event.currentTarget.scrollTop = dragRef.current.startScroll - (event.clientY - dragRef.current.startY);
      }}
      onPointerUp={() => { dragRef.current = null; }}
      onPointerCancel={() => { dragRef.current = null; }}
    >
      <div className="flex flex-col gap-4">
        {loopedPhotos.map((src, photoIndex) => (
          <div key={`${src}-${photoIndex}`} className="relative aspect-[4/3] w-full shrink-0 overflow-hidden rounded-[22px] bg-[var(--paper)] shadow-[var(--shadow-soft)]">
            <Image src={src} alt={`Bhagwant Nagar community ${photoIndex + 1}`} fill sizes="(max-width:1024px) 45vw, 24vw" draggable={false} className="pointer-events-none object-cover" />
          </div>
        ))}
      </div>
    </div>
  );
}

const placeGalleryColumns = [
  [
    '/images/public-life/a1.jpg',
    '/images/public-life/ashish2.jpg',
    '/images/public-life/jan-sunwai-page.jpg',
    '/images/public-life/ashish4.jpg',
  ],
  [
    '/images/public-life/a2.jpg',
    '/images/public-life/ashish3.jpg',
    '/images/public-life/a3.jpg',
  ],
];

/* ───────── Public Service ───────── */
export function ServicePage() {
  const { t, getHref } = useLanguage();
  const s = servicePage;
  return (
    <>
      <PageHero eyebrow={s.eyebrow} title={s.title} text={s.intro} image="/images/public-life/jan-sunwai-page.jpg" />

      <section id="public-service" className="section-pad relative isolate scroll-mt-24 overflow-hidden bg-[var(--paper-2)]">
        <svg
          aria-hidden="true"
          viewBox="0 0 1440 180"
          preserveAspectRatio="xMidYMax slice"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-28 w-full text-[#c65a18] opacity-[0.07] md:h-40"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M0 150h1440M0 162h1440" />
          <path d="M70 150V98l42-32 42 32v52m-70-40h56m-56 18h56m-42 22v-19h28v19" />
          <path d="M230 150V78h84v72m-68-52h20v18h-20m34-18h20v18h-20m-34 12h20v22h-20m34 0v-22h20v22" />
          <path d="M415 150V91l42-30 42 30v59m-70-42h56m-56 18h56m-42 24v-18h28v18" />
          <path d="M630 150V88h66v62m-52-45h16v17h-16m25-17h16v17h-16m-25 11h16v17h-16m25 0v-17h16v17" />
          <path d="M820 150V84l40-30 40 30v66m-66-44h52m-52 19h52m-40 25v-18h28v18" />
          <path d="M1045 150V97l40-29 40 29v53m-66-35h52m-52 18h52m-40 17v-18h28v18" />
          <path d="M1300 150V92l38-28 38 28v58m-62-39h48m-48 18h48m-36 21v-18h24v18" />
          <path d="M165 150c0-20 12-34 24-34s24 14 24 34m-24-34V81m-24 19 24-19 24 19m386 50c0-22 13-37 26-37s26 15 26 37m-26-37V75m-26 19 26-19 26 19m390 56c0-20 12-34 24-34s24 14 24 34m-24-34V84m-24 18 24-18 24 18" />
          <path d="M572 150h34l-11-31h-12zm17-31v-18m-8 18v-18m16 18v-18M0 177c170-24 310-24 480 0s310 24 480 0 310-24 480 0" />
        </svg>
        <div className="container-site relative z-10">
          <div className="mb-9 max-w-3xl md:mb-11">
            <SectionHead title={s.chairmanTitle} accent={{ en: 'Nagar Panchayat', hi: 'नगर पंचायत' }} text={s.chairmanText} />
          </div>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6">
            {s.responsibilities.map((r, i) => (
              <article key={r.icon + t(r.title)} className="group relative isolate min-h-[320px] overflow-hidden rounded-[26px] border border-[#e7ddd0] bg-[#d8cbbd] sm:min-h-[360px] lg:min-h-[400px]">
                <Image
                  src={responsibilityImages[i]}
                  alt={t(r.title)}
                  fill
                  sizes="(max-width: 767px) 100vw, 50vw"
                  className="-z-20 object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[#101820]/90 via-[#101820]/30 to-[#101820]/5 transition-colors duration-300 group-hover:from-[#101820]/95" />
                <div className="absolute inset-x-0 bottom-0 p-6 text-white sm:p-8">
                  <span className="mb-5 grid h-10 w-10 place-items-center rounded-full border border-white/40 bg-white/10 text-white backdrop-blur-sm">
                    <StoryIcon name={r.icon} className="h-[18px] w-[18px]" />
                  </span>
                  <h2 className="font-editorial text-2xl font-bold leading-tight sm:text-3xl">{t(r.title)}</h2>
                  <p className="mt-3 max-w-xl text-sm leading-6 text-white/90 sm:text-base">
                    {t(r.text ?? s.responsibilityDescriptions[i])}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="jan-sunwai" className="relative scroll-mt-24 overflow-hidden py-14 text-white sm:py-20 md:py-28">
        <ParallaxBg src="/images/public-life/jan-sunwai.jpg" />
        <div className="container-site relative z-10">
          <Reveal>
            <h2 className="max-w-4xl font-editorial text-[clamp(28px,3.6vw,46px)] font-bold leading-[1.08]">{t(s.cta.title)}</h2>
            <Link href={getHref('/contact')} className="mt-8 inline-flex items-center gap-3 rounded-full bg-white px-6 py-3.5 text-sm font-bold text-black transition hover:-translate-y-0.5 hover:bg-[#ffe9d6]">
              {t(s.cta.button)} <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>
      </section>
      <PlaceSections />
    </>
  );
}

function PlaceSections() {
  const { t } = useLanguage();
  const p = placePage;
  return (
    <>
      <section id="vision" className="section-pad scroll-mt-24 bg-[var(--paper-2)]">
        <div className="container-site grid gap-10 lg:grid-cols-[1.02fr_.98fr] lg:items-center lg:gap-16">
          <Reveal>
            <div>
              <SectionHead eyebrow={p.eyebrow} title={p.title} text={p.intro} />
              <p className="mt-8 font-editorial text-2xl font-bold leading-snug text-[var(--navy)] md:text-[34px]">{t(p.wide)}</p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="relative grid h-[440px] grid-cols-2 gap-4 overflow-hidden rounded-[28px] sm:h-[520px]" aria-label={t(p.title)}>
              {placeGalleryColumns.map((photos, columnIndex) => {
                return (
                  <ScrollingPhotoColumn
                    key={columnIndex}
                    photos={photos}
                    className={columnIndex === 1 ? 'pt-10' : ''}
                  />
                );
              })}
              <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-[var(--paper-2)] to-transparent" />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[var(--paper-2)] to-transparent" />
            </div>
          </Reveal>
        </div>
      </section>
      <Banner />
    </>
  );
}

/* ───────── Political Journey ───────── */
export function PoliticalPage() {
  const { t } = useLanguage();
  const p = politicalPage;
  return (
    <>
      <PageHero eyebrow={p.eyebrow} title={p.title} text={p.intro} image="/images/gallery/a11.jpg" />
      <section className="section-pad">
        <div className="container-site">
          <Stagger className="grid gap-5 md:grid-cols-3">
            {p.stages.map((s, i) => (
              <Item key={i}>
                <div className="ed-card h-full p-9 text-center">
                  <div className="font-editorial text-6xl font-bold text-[var(--saffron)]">{s.year}</div>
                  <h2 className="mt-3 font-editorial text-2xl font-bold text-[var(--navy)]">{t(s.title)}</h2>
                  <p className="mt-3 text-sm leading-7 text-[#5d574f]">{t(s.text)}</p>
                </div>
              </Item>
            ))}
          </Stagger>
        </div>
      </section>
      <section className="section-pad bg-[var(--paper-2)]">
        <div className="container-site">
          <SectionHead title={p.whyTitle} accent={{ en: 'Assembly level', hi: 'विधानसभा स्तर' }} text={p.whyText} />
          <div className="mt-10"><Chips items={p.why} /></div>
        </div>
      </section>
      <section className="relative overflow-hidden py-14 text-white sm:py-20 md:py-28">
        <ParallaxBg src="/images/gallery/a8.jpg" overlay="linear-gradient(90deg,rgba(121,61,55,.92),rgba(16,45,73,.82))" />
        <div className="container-site relative z-10">
          <Reveal>
            <h2 className="max-w-4xl font-editorial text-[clamp(28px,3.6vw,46px)] font-bold leading-[1.08]">{t(p.partyTitle)}</h2>
            <p className="mt-5 max-w-2xl text-[17px] leading-8 text-white/85">{t(p.partyText)}</p>
          </Reveal>
        </div>
      </section>
    </>
  );
}

/* ───────── News & Media intro (shown above existing video/photo sections) ───────── */
export function MediaIntro() {
  const { t } = useLanguage();
  const m = mediaIntro;
  return (
    <PageHero eyebrow={m.eyebrow} title={m.title} text={m.text} image="/images/gallery/a12.jpg" />
  );
}
