'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { useLanguage } from '@/lib/languageContext';
import { videoGalleryData } from '@/data/media';
import { X, Play, ChevronLeft, ChevronRight } from 'lucide-react';

export function VideoSection() {
  const { t, locale } = useLanguage();
  const hi = locale === 'hi';
  const [mounted, setMounted] = useState(false);
  const [activeVideoIndex, setActiveVideoIndex] = useState<number | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const thumbRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const total = videoGalleryData.length;
  const isOpen = activeVideoIndex !== null;
  const activeVideo = activeVideoIndex !== null ? videoGalleryData[activeVideoIndex] : null;

  const labels = hi
    ? {
        heading: 'वीडियो',
        subtitle: 'विभिन्न कार्यक्रमों, जनसंवाद, संबोधन एवं क्षेत्रीय विकास कार्यों के वीडियो।',
        playVideo: 'वीडियो देखें',
        close: 'बंद करें',
        previous: 'पिछला वीडियो',
        next: 'अगला वीडियो',
        duration: 'अवधि',
        date: 'दिनांक',
        location: 'भगवंत नगर',
        category: 'सार्वजनिक जीवन',
        moreVideos: 'अन्य वीडियो',
        watchNow: 'अभी देखें',
      }
    : {
        heading: 'Videos',
        subtitle: 'Speeches, community dialogues, and coverage of development initiatives across the constituency.',
        playVideo: 'Play video',
        close: 'Close',
        previous: 'Previous video',
        next: 'Next video',
        duration: 'Duration',
        date: 'Date',
        location: 'Bhagwant Nagar',
        category: 'Public life',
        moreVideos: 'More Videos',
        watchNow: 'Watch now',
      };

  const featuredVideo = videoGalleryData[0];

  const closeVideo = useCallback(() => {
    setActiveVideoIndex(null);
  }, []);

  const showPrevious = useCallback(() => {
    setActiveVideoIndex((idx) => (idx === null ? idx : (idx - 1 + total) % total));
  }, [total]);

  const showNext = useCallback(() => {
    setActiveVideoIndex((idx) => (idx === null ? idx : (idx + 1) % total));
  }, [total]);

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
    if (activeVideoIndex !== null && thumbRefs.current[activeVideoIndex]) {
      thumbRefs.current[activeVideoIndex]?.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center',
      });
    }
  }, [activeVideoIndex]);

  // Notify navbar & floating widgets to unmount while video theater modal is active
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

  // Lock body scroll and listen for Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.body.classList.add('lightbox-open');
    closeRef.current?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeVideo();
      else if (e.key === 'ArrowLeft') showPrevious();
      else if (e.key === 'ArrowRight') showNext();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = prev;
      document.body.classList.remove('lightbox-open');
    };
  }, [isOpen, closeVideo, showPrevious, showNext]);

  return (
    <section id="videos" aria-labelledby="videos-title" className="scroll-mt-28 py-16 md:py-24 border-t border-black/10 bg-[#FAF6EE]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col gap-2">
          <h2 id="videos-title" className="font-editorial text-3xl sm:text-4xl md:text-5xl font-bold text-[#16191b]">
            {labels.heading}
          </h2>
          <p className="max-w-2xl text-base text-[#655f57] md:text-lg">
            {labels.subtitle}
          </p>
        </div>

        {/* Featured Video Block: "From the field" */}
        {featuredVideo && (
          <div className="mt-12">
            <div className="grid items-center gap-8 md:grid-cols-12 md:gap-12">
              {/* Left Column: Responsive Video Card with Pulsating Play Button */}
              <div className="md:col-span-6 lg:col-span-5">
                <div className="relative mx-auto w-full max-w-md overflow-hidden rounded-2xl sm:rounded-3xl bg-[#ddd5c8] shadow-[0_30px_70px_-20px_rgba(22,24,28,0.45)] ring-1 ring-black/10 aspect-[16/10] sm:aspect-[4/3] md:aspect-[16/10]">
                  <button
                    type="button"
                    onClick={() => setActiveVideoIndex(0)}
                    aria-label={`${labels.playVideo}: ${t(featuredVideo.title)}`}
                    className="group absolute inset-0 block size-full cursor-pointer text-left"
                  >
                    {/* Video poster preview frame */}
                    {featuredVideo.videoPath && (
                      <video
                        src={featuredVideo.videoPath}
                        muted
                        playsInline
                        preload="metadata"
                        aria-hidden="true"
                        tabIndex={-1}
                        onLoadedMetadata={(e) => {
                          const v = e.currentTarget;
                          v.currentTime = v.duration > 1 ? 1 : 0;
                        }}
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                    )}

                    {/* Gradient Overlay */}
                    <span
                      aria-hidden="true"
                      className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-black/10 transition-colors group-hover:from-black/80"
                    />

                    {/* Center Pulsing Play Button */}
                    <span className="absolute inset-0 grid place-items-center">
                      <span className="relative grid size-18 sm:size-20 place-items-center rounded-full bg-white text-[#F5660A] shadow-2xl transition-transform duration-500 group-hover:scale-110">
                        <span
                          aria-hidden="true"
                          className="absolute inset-0 animate-ping rounded-full bg-white/40 [animation-duration:2.4s]"
                        />
                        <Play className="size-8 sm:size-9 fill-[#F5660A] text-[#F5660A] ml-1 relative z-10" />
                      </span>
                    </span>

                    {/* Duration badge */}
                    <span className="absolute bottom-3 right-3 rounded-full bg-black/80 backdrop-blur-xs px-3 py-1 text-xs font-semibold text-white shadow-md">
                      {featuredVideo.duration}
                    </span>
                  </button>
                </div>
              </div>

              {/* Right Column: Video Details & Metadata */}
              <div className="md:col-span-6 lg:col-span-7">
                <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm font-medium">
                  <time className="font-semibold text-[#F5660A]">
                    {t(featuredVideo.date)}
                  </time>
                  <span className="text-[#655f57]">{labels.location}</span>
                  <span className="text-[#655f57]">{labels.category}</span>
                </p>

                <h3 className="mt-3 font-editorial text-2xl sm:text-3xl lg:text-4xl leading-tight text-[#16191b] font-bold">
                  {t(featuredVideo.title)}
                </h3>

                <p className="mt-4 max-w-2xl text-base text-[#655f57] leading-relaxed font-sans line-clamp-4">
                  {t(featuredVideo.description)}
                </p>

                <div className="mt-6 flex items-center gap-4">
                  <button
                    type="button"
                    onClick={() => setActiveVideoIndex(0)}
                    className="inline-flex items-center gap-2.5 rounded-full bg-[#151210] px-6 py-3.5 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:bg-[#F5660A] hover:-translate-y-0.5 active:scale-95 cursor-pointer"
                  >
                    <span>{labels.watchNow}</span>
                    <Play className="size-4 fill-white text-white ml-0.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Secondary Videos Playlist (3-Column Grid) */}
        {videoGalleryData.length > 1 && (
          <div className="mt-16 pt-12 border-t border-black/10">
            <h3 className="font-editorial text-2xl font-bold leading-tight text-[#16191b] mb-8">
              {labels.moreVideos}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {videoGalleryData.slice(1).map((video, idx) => {
                const actualIndex = idx + 1;
                return (
                  <div
                    key={`${video.id}-${actualIndex}`}
                    className="group relative flex flex-col overflow-hidden rounded-2xl border border-black/10 bg-white shadow-2xs transition-all duration-300 hover:border-[#F5660A]/40 hover:shadow-xl"
                  >
                    {/* Thumbnail */}
                    <button
                      type="button"
                      onClick={() => setActiveVideoIndex(actualIndex)}
                      aria-label={`${labels.playVideo}: ${t(video.title)}`}
                      className="relative aspect-video w-full overflow-hidden bg-black text-left cursor-pointer"
                    >
                      {video.videoPath && (
                        <video
                          src={video.videoPath}
                          muted
                          playsInline
                          preload="metadata"
                          aria-hidden="true"
                          tabIndex={-1}
                          onLoadedMetadata={(e) => {
                            const v = e.currentTarget;
                            v.currentTime = v.duration > 1 ? 1 : 0;
                          }}
                          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                        />
                      )}
                      <span
                        aria-hidden="true"
                        className="absolute inset-0 bg-black/40 flex items-center justify-center transition-colors group-hover:bg-black/25"
                      >
                        <span className="size-13 rounded-full bg-white text-[#F5660A] grid place-items-center shadow-xl transition-transform duration-300 group-hover:scale-110">
                          <Play className="size-5.5 ml-0.5 fill-[#F5660A] text-[#F5660A]" />
                        </span>
                      </span>
                      <span className="absolute bottom-2.5 right-2.5 rounded-full bg-black/85 backdrop-blur-xs px-2.5 py-0.5 text-xs font-semibold text-white shadow-sm">
                        {video.duration}
                      </span>
                    </button>

                    {/* Details */}
                    <div className="flex flex-1 flex-col p-5">
                      <p className="text-xs font-semibold text-[#F5660A]">
                        {t(video.date)}
                      </p>
                      <h4 className="mt-1.5 font-editorial text-lg font-bold text-[#16191b] line-clamp-2 transition-colors group-hover:text-[#F5660A]">
                        {t(video.title)}
                      </h4>
                      <p className="mt-2 text-xs text-[#655f57] line-clamp-2 leading-relaxed flex-1 font-sans">
                        {t(video.description)}
                      </p>
                      <div className="mt-4 border-t border-black/10 pt-3 flex items-center justify-between">
                        <button
                          type="button"
                          onClick={() => setActiveVideoIndex(actualIndex)}
                          className="inline-flex cursor-pointer items-center gap-1.5 text-xs font-bold text-[#F5660A] hover:text-[#d45300] transition-colors"
                        >
                          <span>{labels.playVideo}</span>
                          <span aria-hidden="true">▶</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Fullscreen Video Theater Modal (Exact PhotoGallery Lightbox Experience) */}
      {mounted && isOpen && activeVideo && createPortal(
        <div
          role="dialog"
          aria-modal="true"
          aria-label={t(activeVideo.title)}
          style={{ zIndex: 9999999 }}
          className="fixed inset-0 flex flex-col justify-between items-center select-none overflow-hidden animate-fadeIn"
          onClick={closeVideo}
        >
          {/* 1. Fullscreen Ambient Blurred Dynamic Background */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {activeVideo.videoPath && (
              <video
                key={`bg-${activeVideo.videoPath}`}
                src={activeVideo.videoPath}
                muted
                playsInline
                preload="metadata"
                className="h-full w-full object-cover scale-110 blur-3xl opacity-45 brightness-70"
                onLoadedMetadata={(e) => {
                  const v = e.currentTarget;
                  v.currentTime = v.duration > 1 ? 1 : 0;
                }}
              />
            )}
            <div className="absolute inset-0 bg-black/60 backdrop-blur-2xl" />
          </div>

          {/* 2. Floating Circular Close Button (Top-Right of screen) */}
          <button
            ref={closeRef}
            type="button"
            onClick={closeVideo}
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

          {/* 4. Main Video Player Area (Centered between top and bottom) */}
          <div
            className="relative z-20 flex-1 w-full flex items-center justify-center px-4 sm:px-16 md:px-24 py-2 sm:py-3 min-h-0"
            onClick={(e) => e.stopPropagation()}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            <div className="relative w-full max-w-4xl rounded-2xl sm:rounded-3xl overflow-hidden shadow-[0_25px_80px_rgba(0,0,0,0.95)] border border-white/20 bg-black flex flex-col">
              {/* Native Video Player Container */}
              <div className="relative w-full aspect-video max-h-[54vh] sm:max-h-[60vh] md:max-h-[64vh] bg-black flex items-center justify-center">
                {activeVideo.videoPath && (
                  <video
                    key={activeVideo.videoPath}
                    src={activeVideo.videoPath}
                    controls
                    autoPlay
                    playsInline
                    className="w-full h-full object-contain bg-black"
                  >
                    Your browser does not support the video tag.
                  </video>
                )}
              </div>

              {/* Video Info Footer */}
              <div className="p-3.5 sm:p-5 bg-[#151718] text-white border-t border-white/10">
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-[#D4CCC0] mb-1.5">
                  <span className="font-semibold text-[#F5660A]">
                    {t(activeVideo.date)}
                  </span>
                  <span className="rounded bg-white/10 px-2 py-0.5 font-medium">{activeVideo.duration}</span>
                </div>
                <h3 className="font-editorial text-base sm:text-lg md:text-xl font-bold text-white leading-snug line-clamp-1">
                  {t(activeVideo.title)}
                </h3>
                <p className="mt-1 text-xs text-white/75 leading-relaxed font-sans line-clamp-2">
                  {t(activeVideo.description)}
                </p>
              </div>
            </div>
          </div>

          {/* 5. Bottom Thumbnail Carousel, Progress Bar & Counter (Matches PhotoGallery) */}
          <div
            className="relative z-20 w-full max-w-4xl mx-auto px-4 pb-3 sm:pb-5 pt-1 flex flex-col items-center gap-2"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Horizontal Thumbnails Carousel */}
            <div className="flex items-center gap-2 sm:gap-2.5 overflow-x-auto scroll-smooth py-1 no-scrollbar w-full justify-start sm:justify-center">
              {videoGalleryData.map((v, idx) => {
                const isCurrent = idx === activeVideoIndex;
                return (
                  <button
                    key={v.id}
                    ref={(el) => {
                      thumbRefs.current[idx] = el;
                    }}
                    type="button"
                    onClick={() => setActiveVideoIndex(idx)}
                    aria-label={`${labels.playVideo} ${idx + 1}`}
                    className={`relative h-11 w-18 sm:h-12 sm:w-22 rounded-md shrink-0 overflow-hidden transition-all duration-200 cursor-pointer bg-black ${
                      isCurrent
                        ? 'ring-2 ring-white scale-105 opacity-100 shadow-xl'
                        : 'opacity-40 hover:opacity-85'
                    }`}
                  >
                    <video
                      src={v.videoPath}
                      muted
                      playsInline
                      preload="metadata"
                      aria-hidden="true"
                      tabIndex={-1}
                      onLoadedMetadata={(e) => {
                        const vid = e.currentTarget;
                        vid.currentTime = vid.duration > 1 ? 1 : 0;
                      }}
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                      <Play className="size-3.5 fill-white text-white" />
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Horizontal Progress Bar underneath thumbnails */}
            <div className="h-1 w-full max-w-2xl bg-white/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-white/90 rounded-full transition-all duration-300"
                style={{ width: `${(((activeVideoIndex ?? 0) + 1) / total) * 100}%` }}
              />
            </div>

            {/* Bottom Counter Pill Badge (e.g. 1 / 4) */}
            <div className="mt-1 flex justify-center">
              <span className="px-4 py-1 rounded-full bg-black/80 backdrop-blur-md text-xs font-semibold text-white/95 border border-white/15 shadow-lg tabular-nums tracking-widest">
                {(activeVideoIndex ?? 0) + 1} / {total}
              </span>
            </div>
          </div>
        </div>,
        document.body
      )}
    </section>
  );
}
