'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useLanguage } from '@/lib/languageContext';
import { photographData } from '@/data/photographs';

export function PhotoGallery() {
  const { t, locale } = useLanguage();
  const hi = locale === 'hi';
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  const labels = hi
    ? { heading: 'तस्वीरें', close: 'बंद करें', previous: 'पिछली तस्वीर', next: 'अगली तस्वीर', open: 'तस्वीर बड़ी करें', lightbox: 'तस्वीर देखें' }
    : { heading: 'Photographs', close: 'Close', previous: 'Previous photograph', next: 'Next photograph', open: 'View photograph', lightbox: 'Photograph viewer' };

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

  useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
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
    };
  }, [isOpen, close, showPrevious, showNext]);

  const active = activeIndex === null ? null : photographData[activeIndex];

  return (
    <div className="lg:pr-14">
      <h2 className="font-editorial text-2xl font-semibold text-[#151210] sm:text-3xl">
        {labels.heading}
      </h2>
      <div aria-hidden="true" className="mt-3 mb-8 h-0.5 w-12 bg-[#F5660A]" />

      <div className="columns-1 gap-6 sm:columns-2 lg:columns-3">
        {photographData.map((item, index) => (
          <figure key={item.id} className="mb-8 break-inside-avoid">
            <button
              type="button"
              onClick={(event) => {
                triggerRef.current = event.currentTarget;
                setActiveIndex(index);
              }}
              aria-label={`${labels.open}: ${item.caption ? t(item.caption) : t(item.alt)}`}
              className="group block w-full cursor-zoom-in overflow-hidden bg-[#F1EBE2] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F5660A]"
            >
              <Image
                src={item.image}
                alt={t(item.alt)}
                width={0}
                height={0}
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                style={{ width: '100%', height: 'auto' }}
                className="block"
              />
            </button>
          </figure>
        ))}
      </div>

      {active && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={labels.lightbox}
          className="fixed inset-0 z-[70] flex flex-col bg-black/90"
          onClick={close}
        >
          <div className="flex items-center justify-between px-4 py-3 text-white sm:px-6">
            <span className="text-sm tabular-nums text-white/70">
              {(activeIndex ?? 0) + 1} / {total}
            </span>
            <button
              ref={closeRef}
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                close();
              }}
              aria-label={labels.close}
              className="flex h-11 w-11 items-center justify-center rounded-full text-white/90 transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-white"
            >
              <X className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>

          <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 sm:px-16">
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                showPrevious();
              }}
              aria-label={labels.previous}
              className="absolute left-1 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white transition-colors hover:bg-black/70 focus-visible:outline-2 focus-visible:outline-white sm:left-4"
            >
              <ChevronLeft className="h-6 w-6" aria-hidden="true" />
            </button>

            <Image
              key={active.id}
              src={active.image}
              alt={t(active.alt)}
              width={1600}
              height={1067}
              sizes="100vw"
              priority
              onClick={(event) => event.stopPropagation()}
              style={{ width: 'auto', height: 'auto', maxWidth: '100%', maxHeight: '100%' }}
              className="object-contain"
            />

            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                showNext();
              }}
              aria-label={labels.next}
              className="absolute right-1 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white transition-colors hover:bg-black/70 focus-visible:outline-2 focus-visible:outline-white sm:right-4"
            >
              <ChevronRight className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>

          <div className="h-4 sm:h-6" aria-hidden="true" />
        </div>
      )}
    </div>
  );
}
