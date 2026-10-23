'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, Play, Quote } from 'lucide-react';
import { useLanguage } from '@/lib/languageContext';
import { photoGalleryData, videoGalleryData } from '@/data/media';
import { homeStory, newsHead, newsItems, serviceCards, shortBio } from '@/data/story';
import { AccentTitle, SectionHead } from './Blocks';
import { Item, Reveal, Stagger, TiltImage } from './motion';

/** Text beside a tilting portrait on a warm band. */
export function StoryFeature() {
  const { t, getHref } = useLanguage();
  return (
    <section className="section-pad bg-[var(--paper-2)]">
      <div className="container-site grid gap-10 lg:grid-cols-[1.02fr_.98fr] lg:items-center lg:gap-16">
        <Reveal>
          <div className="ed-eyebrow mb-3">{t(homeStory.eyebrow)}</div>
          <AccentTitle title={t(homeStory.title)} accent={t(homeStory.accent)} />
          <p className="ed-body mt-5">{t(shortBio)}</p>
          <Link href={getHref('/journey')} className="group mt-7 inline-flex items-center gap-3 font-bold text-[var(--navy)]">
            {t(homeStory.link)}
            <ArrowRight className="h-[18px] w-[18px] transition-transform group-hover:translate-x-1.5" />
          </Link>
        </Reveal>
        <Reveal delay={0.12}>
          <TiltImage src={homeStory.image} alt="Ashish Shukla" className="min-h-[360px] sm:min-h-[440px] lg:min-h-[520px] object-cover object-[center_20%]" />
        </Reveal>
      </div>
    </section>
  );
}

/** Four image cards describing everyday public service. */
export function ServiceCards() {
  const { t, getHref } = useLanguage();
  const s = serviceCards;
  return (
    <section className="section-pad">
      <div className="container-site">
        <SectionHead eyebrow={s.eyebrow} title={s.title} accent={s.accent} />
        <Stagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {s.items.map((c) => (
            <Item key={t(c.title)}>
              <Link href={getHref('/public-life')} className="ed-card group block h-full overflow-hidden">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image src={c.image} alt={t(c.title)} fill sizes="(max-width:640px) 100vw, 25vw" className="object-cover transition-transform duration-700 group-hover:scale-110" />
                </div>
                <div className="p-6">
                  <h3 className="font-editorial text-2xl font-bold text-[var(--navy)]">{t(c.title)}</h3>
                  <p className="mt-2 text-sm leading-7 text-[#5d574f]">{t(c.text)}</p>
                </div>
              </Link>
            </Item>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

/** Dated news report with pull quote. */
export function NewsSection() {
  const { t } = useLanguage();
  const n = newsItems[0];
  const newsPhotos = [
    '/images/public-life/a2.jpg',
    '/images/public-life/a3.jpg',
    '/images/public-life/a1.jpg',
  ];
  return (
    <section className="section-pad bg-[var(--paper-2)]">
      <div className="container-site">
        <SectionHead eyebrow={newsHead.eyebrow} title={newsHead.title} accent={newsHead.accent} />
        <Reveal className="mt-12">
          <article className="grid overflow-hidden rounded-[28px] border border-[var(--line)] bg-[#fffdf8] shadow-[var(--shadow-soft)] lg:grid-cols-[.95fr_1.05fr]">
            <div className="relative min-h-[360px] p-3 sm:min-h-[440px] lg:min-h-[620px]">
              <div className="grid h-full min-h-[336px] grid-cols-2 grid-rows-2 gap-2 sm:min-h-[416px] lg:min-h-[596px]">
                {newsPhotos.map((src, i) => (
                  <div key={src} className={`relative overflow-hidden rounded-[18px] ${i === 2 ? 'col-span-2' : ''}`}>
                    <Image
                      src={src}
                      alt={t(n.title)}
                      fill
                      sizes="(max-width:1024px) 50vw, 22vw"
                      className="object-cover transition-transform duration-500 hover:scale-[1.03]"
                    />
                  </div>
                ))}
              </div>
              <span className="absolute left-6 top-6 rounded-full bg-[var(--navy)] px-4 py-2 text-xs font-bold text-white">
                {t(n.dateLabel)} · {t(n.place)}
              </span>
            </div>
            <div className="p-7 md:p-11">
              <h3 className="font-editorial text-[26px] font-bold leading-tight text-[var(--navy)] md:text-[34px]">{t(n.title)}</h3>
              <p className="mt-4 leading-8 text-[#4a443d]">{t(n.text)}</p>
              <blockquote className="mt-6 border-l-4 border-[var(--saffron)] bg-[var(--paper)] p-5">
                <Quote className="mb-2 h-5 w-5 text-[var(--saffron)]" />
                <p className="font-editorial text-lg italic leading-relaxed text-[var(--ink)]">{t(n.quote)}</p>
              </blockquote>
              <a href={n.url} target="_blank" rel="noopener noreferrer" className="pill-link mt-7">
                {t(newsHead.readMore)} · {newsHead.source} <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </article>
        </Reveal>
      </div>
    </section>
  );
}

/** Photo gallery with an infinite, centered card slider. */
export function GalleryTabs() {
  const { t, getHref, locale } = useLanguage();
  const reduceMotion = useReducedMotion();
  const hi = locale === 'hi';
  const [currentIndex, setCurrentIndex] = useState(0);
  const [viewportWidth, setViewportWidth] = useState(1280);
  const shown = photoGalleryData;
  const cardStep = viewportWidth < 640 ? Math.min(140, viewportWidth * 0.32) : Math.min(300, viewportWidth * 0.24);

  useEffect(() => {
    const updateViewportWidth = () => setViewportWidth(window.innerWidth);
    updateViewportWidth();
    window.addEventListener('resize', updateViewportWidth);
    return () => window.removeEventListener('resize', updateViewportWidth);
  }, []);

  useEffect(() => {
    if (reduceMotion || shown.length < 2) return;
    const timer = window.setInterval(() => {
      setCurrentIndex((index) => (index + 1) % shown.length);
    }, 3500);
    return () => window.clearInterval(timer);
  }, [reduceMotion, shown.length]);

  const move = (direction: number) => {
    if (shown.length > 0) setCurrentIndex((index) => (index + direction + shown.length) % shown.length);
  };
  return (
    <section className="section-pad">
      <div className="container-site">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHead
            eyebrow={{ en: 'Photo Gallery', hi: 'फोटो गैलरी' }}
            title={{ en: 'Public life in pictures', hi: 'चित्रों में जन-जीवन' }}
            accent={{ en: 'in pictures', hi: 'चित्रों में' }}
          />
          <Link href={getHref('/media#photos')} className="pill-link">{hi ? 'सभी देखें' : 'See more'} <ArrowRight className="h-4 w-4" /></Link>
        </div>
        <div
          role="region"
          aria-roledescription="carousel"
          aria-label={hi ? 'फोटो गैलरी' : 'Photo gallery'}
          className="gallery-slider relative mx-auto mt-10 h-[390px] max-w-[1240px] overflow-hidden sm:mt-12 sm:h-[480px]"
          onKeyDown={(event) => {
            if (event.key === 'ArrowLeft') move(-1);
            if (event.key === 'ArrowRight') move(1);
          }}
        >
          {shown.map((photo, index) => {
            const rawOffset = (index - currentIndex + shown.length) % shown.length;
            const offset = rawOffset > shown.length / 2 ? rawOffset - shown.length : rawOffset;
            const distance = Math.abs(offset);
            const scale = distance === 0 ? 1 : distance === 1 ? 0.76 : distance === 2 ? 0.56 : 0.4;
            const opacity = distance === 0 ? 1 : distance === 1 ? 0.86 : distance === 2 ? 0.58 : 0.28;

            return (
              <motion.button
                key={photo.id}
                type="button"
                aria-label={`${t(photo.category)}: ${t(photo.caption)}`}
                aria-pressed={distance === 0}
                onClick={() => setCurrentIndex(index)}
                animate={{
                  x: offset * cardStep,
                  y: '-56%',
                  scale,
                  opacity,
                  rotateY: reduceMotion || offset === 0 ? 0 : offset < 0 ? 9 : -9,
                }}
                transition={reduceMotion ? { duration: 0 } : { type: 'spring', stiffness: 150, damping: 24, mass: 0.8 }}
                style={{ zIndex: 20 - distance, transformOrigin: 'center center' }}
                className={`gallery-card absolute left-1/2 top-1/2 block -translate-x-1/2 overflow-hidden rounded-[22px] border bg-[#ddd5c8] text-left shadow-[0_20px_55px_rgba(16,24,31,.18)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F5660A] ${distance === 0 ? 'border-[#E85D04]' : 'border-white/70'}`}
              >
                <Image src={photo.image} alt={distance === 0 ? t(photo.caption) : ''} fill sizes="(max-width:640px) 72vw, 330px" className="pointer-events-none object-cover" />
              </motion.button>
            );
          })}
          {shown.length === 0 && <p className="absolute inset-0 grid place-items-center text-[var(--muted)]">{hi ? 'कोई तस्वीर उपलब्ध नहीं है' : 'No photos available'}</p>}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-30 flex justify-center gap-3 pb-2">
            <button type="button" onClick={() => move(-1)} className="pointer-events-auto rounded-full border border-[var(--navy)] bg-[var(--paper)] px-6 py-2.5 text-sm font-bold text-[var(--navy)] transition-colors hover:bg-[var(--navy)] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F5660A]">{hi ? 'पिछला' : 'Prev'}</button>
            <button type="button" onClick={() => move(1)} className="pointer-events-auto rounded-full border border-[var(--navy)] bg-[var(--paper)] px-6 py-2.5 text-sm font-bold text-[var(--navy)] transition-colors hover:bg-[var(--navy)] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F5660A]">{hi ? 'अगला' : 'Next'}</button>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Row of latest videos on a navy band. */
export function VideosRow() {
  const { t, getHref, locale } = useLanguage();
  const hi = locale === 'hi';
  const vids = videoGalleryData.filter((v) => v.videoPath).slice(0, 4);
  if (!vids.length) return null;
  return (
    <section className="section-pad bg-[var(--navy)]">
      <div className="container-site">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHead dark eyebrow={{ en: 'Videos', hi: 'वीडियो' }} title={{ en: 'Latest videos', hi: 'ताज़ा वीडियो' }} accent={{ en: 'videos', hi: 'वीडियो' }} />
          <Link href={getHref('/media#videos')} className="pill-link">{hi ? 'सभी देखें' : 'View all'} <ArrowRight className="h-4 w-4" /></Link>
        </div>
        <Stagger className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-5">
          {vids.map((v) => (
            <Item key={v.id}>
              <Link href={getHref('/media#videos')} className="group relative block aspect-[9/12] overflow-hidden rounded-[22px] bg-black">
                <video src={`${v.videoPath}#t=0.5`} preload="metadata" muted playsInline className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <span className="ed-pulse absolute left-1/2 top-1/2 grid h-14 w-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-[var(--saffron)] text-white transition group-hover:scale-110">
                  <Play className="h-6 w-6 fill-current" />
                </span>
                <span className="absolute inset-x-4 bottom-4 line-clamp-2 text-sm font-semibold text-white">{t(v.title)}</span>
              </Link>
            </Item>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
