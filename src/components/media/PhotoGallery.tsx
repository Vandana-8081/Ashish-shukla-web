'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useLanguage } from '@/lib/languageContext';
import { photographData } from '@/data/photographs';

function getGridItemStyle(index: number) {
  const pattern = index % 11;
  switch (pattern) {
    case 0:
      return {
        col: 'md:col-span-7 md:row-span-2',
        aspect: 'aspect-[11/10]',
        sizes: '(min-width: 768px) 58vw, 100vw',
      };
    case 1:
    case 2:
      return {
        col: 'md:col-span-5',
        aspect: 'aspect-[3/2] md:aspect-[16/10]',
        sizes: '(min-width: 768px) 42vw, 100vw',
      };
    case 3:
    case 4:
    case 5:
      return {
        col: 'md:col-span-4',
        aspect: 'aspect-[3/2]',
        sizes: '(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw',
      };
    case 6:
    case 7:
      return {
        col: 'md:col-span-6',
        aspect: 'aspect-[16/10]',
        sizes: '(min-width: 768px) 50vw, 100vw',
      };
    case 8:
    case 9:
    case 10:
    default:
      return {
        col: 'md:col-span-4',
        aspect: 'aspect-[3/2]',
        sizes: '(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw',
      };
  }
}

export function PhotoGallery() {
  const { t, locale } = useLanguage();
  const hi = locale === 'hi';
  const [mounted, setMounted] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const thumbRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const labels = hi
    ? {
        heading: 'तस्वीरें',
        subtitle: 'विभिन्न कार्यक्रमों, जनसंवाद एवं क्षेत्रीय विकास कार्यों के दौरान खींचे गए चित्र।',
        close: 'बंद करें',
        previous: 'पिछली तस्वीर',
        next: 'अगली तस्वीर',
        open: 'तस्वीर बड़ी करें',
        lightbox: 'तस्वीर देखें',
      }
    : {
        heading: 'Photographs',
        subtitle: 'Captured moments from community meetings, field visits, and cultural gatherings.',
        close: 'Close',
        previous: 'Previous photograph',
        next: 'Next photograph',
        open: 'View photograph',
        lightbox: 'Photograph viewer',
      };

  const total = photographData.length;
  const isOpen = activeIndex !== null;

  const close = useCallback(() => {
    setActiveIndex(null);
    triggerRef.current?.focus();
  }, []);

  const showPrevious = useCallback(
    () => setActiveIndex((index) => (index === null ? index : (index - 1 + total) % total)),
    [total],
  );

  const showNext = useCallback(
    () => setActiveIndex((index) => (index === null ? index : (index + 1) % total)),
    [total],
  );

  // Notify navbar & floating widgets to hide while lightbox is open
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('lightbox-toggle', { detail: { open: isOpen } }));
    }
    return () => {
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('lightbox-toggle', { detail: { open: false } }));
      }
    };
  }, [isOpen]);

  // Touch swipe support for mobile
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    if (distance > 50) showNext();
    if (distance < -50) showPrevious();
  };

  // Auto-scroll active thumbnail into view
  useEffect(() => {
    if (activeIndex !== null && thumbRefs.current[activeIndex]) {
      thumbRefs.current[activeIndex]?.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center',
      });
    }
  }, [activeIndex]);

  useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.body.classList.add('lightbox-open');
    closeRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close();
      else if (event.key === 'ArrowLeft') showPrevious();
      else if (event.key === 'ArrowRight') showNext();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
      document.body.classList.remove('lightbox-open');
    };
  }, [isOpen, close, showPrevious, showNext]);

  const active = activeIndex === null ? null : photographData[activeIndex];

  return (
    <section id="photos" aria-labelledby="photos-title" className="scroll-mt-28 py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="flex flex-col gap-2">
        <h2 id="photos-title" className="font-editorial text-3xl sm:text-4xl md:text-5xl font-bold text-[#16191b]">
          {labels.heading}
        </h2>
        <p className="max-w-2xl text-base text-[#655f57] md:text-lg">
          {labels.subtitle}
        </p>
      </div>

      {/* Asymmetric Editorial Grid */}
      <div className="mt-10">
        <ul className="grid grid-cols-1 items-start gap-x-5 gap-y-8 md:grid-cols-12 md:gap-y-6">
          {photographData.map((item, index) => {
            const style = getGridItemStyle(index);

            return (
              <li key={item.id} className={`group relative ${style.col}`}>
                <button
                  type="button"
                  onClick={(event) => {
                    triggerRef.current = event.currentTarget;
                    setActiveIndex(index);
                  }}
                  aria-label={`${labels.open}: ${t(item.alt)}`}
                  className={`group/btn relative block w-full overflow-hidden rounded-md bg-[#ebe5dc] text-left cursor-zoom-in ${style.aspect} shadow-2xs transition-all duration-300 hover:shadow-md`}
                >
                  <Image
                    src={item.image}
                    alt={t(item.alt)}
                    fill
                    sizes={style.sizes}
                    loading={index < 3 ? 'eager' : 'lazy'}
                    className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] group-hover/btn:scale-105"
                  />
                  {/* Floating Expand Icon ⤢ on Hover */}
                  <span
                    aria-hidden="true"
                    className="absolute right-3 top-3 grid size-9 place-items-center rounded-full bg-white/90 text-sm text-[#16191b] opacity-0 shadow-sm transition-all duration-200 group-hover/btn:opacity-100 group-hover/btn:scale-105 group-focus-within:opacity-100"
                  >
                    ⤢
                  </span>
                </button>

              </li>
            );
          })}
        </ul>
      </div>

      {/* Lightbox Dialog (Exact 1:1 match to reference screenshot) */}
      {mounted && active && createPortal(
        <div
          role="dialog"
          aria-modal="true"
          aria-label={labels.lightbox}
          style={{ zIndex: 9999999 }}
          className="fixed inset-0 flex flex-col justify-between items-center select-none overflow-hidden animate-fadeIn"
          onClick={close}
        >
          {/* 1. Fullscreen Ambient Blurred Dynamic Background */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <Image
              key={`lightbox-ambient-${active.id}`}
              src={active.image}
              alt=""
              fill
              sizes="100vw"
              priority
              className="object-cover scale-110 blur-3xl opacity-45 brightness-70 transition-all duration-700 ease-out"
            />
            {/* Subtle dark vignette backdrop */}
            <div className="absolute inset-0 bg-black/55 backdrop-blur-2xl" />
          </div>

          {/* 2. Floating Circular Close Button (Top Right of screen) */}
          <button
            ref={closeRef}
            type="button"
            onClick={close}
            aria-label={labels.close}
            className="fixed top-4 right-4 sm:top-6 sm:right-6 md:top-8 md:right-8 z-50 size-10 sm:size-11 rounded-full bg-white text-gray-800 flex items-center justify-center shadow-2xl hover:bg-neutral-100 hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            <X className="size-5 sm:size-6 stroke-[2.5]" />
          </button>

          {/* 3. Floating Circular Navigation Arrows (Sides of screen) */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              showPrevious();
            }}
            aria-label={labels.previous}
            className="fixed left-3 sm:left-6 md:left-8 top-1/2 -translate-y-1/2 z-50 size-10 sm:size-12 rounded-full bg-white text-gray-800 flex items-center justify-center shadow-2xl hover:bg-neutral-100 hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            <ChevronLeft className="size-6 sm:size-7 stroke-[2.5]" />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              showNext();
            }}
            aria-label={labels.next}
            className="fixed right-3 sm:right-6 md:right-8 top-1/2 -translate-y-1/2 z-50 size-10 sm:size-12 rounded-full bg-white text-gray-800 flex items-center justify-center shadow-2xl hover:bg-neutral-100 hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            <ChevronRight className="size-6 sm:size-7 stroke-[2.5]" />
          </button>

          {/* 4. Main Photo Area (Centered between top and bottom, hugging photo dimensions) */}
          <div
            className="relative z-20 flex-1 w-full flex items-center justify-center px-4 sm:px-16 md:px-24 py-2 sm:py-4 min-h-0"
            onClick={(e) => e.stopPropagation()}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            <div className="relative flex items-center justify-center rounded-2xl sm:rounded-3xl overflow-hidden shadow-[0_25px_80px_rgba(0,0,0,0.85)] border border-white/20 bg-black/30">
              <img
                key={active.id}
                src={active.image}
                alt={t(active.alt)}
                className="max-h-[56vh] sm:max-h-[62vh] md:max-h-[68vh] w-auto max-w-[85vw] sm:max-w-[75vw] md:max-w-[65vw] object-contain rounded-2xl sm:rounded-3xl select-none"
              />
            </div>
          </div>

          {/* 5. Bottom Thumbnail Strip, Progress Bar & Counter */}
          <div
            className="relative z-20 w-full max-w-4xl mx-auto px-4 pb-3 sm:pb-5 pt-2 flex flex-col items-center gap-2"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Horizontal Thumbnails Carousel */}
            <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto scroll-smooth py-1 no-scrollbar w-full justify-start sm:justify-center">
              {photographData.map((thumb, idx) => {
                const isCurrent = idx === activeIndex;
                return (
                  <button
                    key={thumb.id}
                    ref={(el) => {
                      thumbRefs.current[idx] = el;
                    }}
                    type="button"
                    onClick={() => setActiveIndex(idx)}
                    aria-label={`${labels.lightbox} ${idx + 1}`}
                    className={`relative h-11 w-16 sm:h-12 sm:w-20 rounded-md shrink-0 overflow-hidden transition-all duration-200 cursor-pointer ${
                      isCurrent
                        ? 'ring-2 ring-white scale-105 opacity-100 shadow-xl'
                        : 'opacity-40 hover:opacity-85'
                    }`}
                  >
                    <Image
                      src={thumb.image}
                      alt=""
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </button>
                );
              })}
            </div>

            {/* Horizontal Progress Bar underneath thumbnails */}
            <div className="h-1 w-full max-w-3xl bg-white/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-white/90 rounded-full transition-all duration-300"
                style={{ width: `${((activeIndex + 1) / total) * 100}%` }}
              />
            </div>

            {/* Bottom Counter Pill Badge (e.g. 3 / 84) */}
            <div className="mt-1 flex justify-center">
              <span className="px-4 py-1 rounded-full bg-black/80 backdrop-blur-md text-xs font-semibold text-white/95 border border-white/15 shadow-lg tabular-nums tracking-widest">
                {(activeIndex ?? 0) + 1} / {total}
              </span>
            </div>
          </div>
        </div>,
        document.body
      )}
    </section>
  );
}
