'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '@/lib/languageContext';
import { Play, ArrowDown } from 'lucide-react';

export function MediaHero() {
  const { locale } = useLanguage();
  const hi = locale === 'hi';

  const labels = hi
    ? {
        home: 'होम',
        media: 'मीडिया',
        heading: 'मीडिया',
        subtitle:
          'आशीष शुक्ला के जनजीवन के आधिकारिक चित्र, वीडियो और यादगार पल।',
        viewPhotos: 'तस्वीरें देखें',
        watchVideos: 'वीडियो देखें',
        photoAlt1: 'जनसुनवाई एवं जनसंवाद कार्यक्रम',
        photoAlt2: 'विकास समीक्षा बैठक में उपस्थित नागरिक',
      }
    : {
        home: 'Home',
        media: 'Media',
        heading: 'Media',
        subtitle:
          "Official photographs, videos, and memorable moments from Ashish Shukla's public life.",
        viewPhotos: 'View Photographs',
        watchVideos: 'Watch Videos',
        photoAlt1: 'Public hearing and citizen interaction',
        photoAlt2: 'Citizens at developmental review meeting',
      };

  return (
    <header className="relative isolate overflow-hidden bg-[#FAF6EE] pt-6 pb-14 sm:pb-18 md:pb-20">
      {/* Subtle Ambient Radial Lighting Spots */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-20">
        <div className="absolute -left-32 -top-40 size-[36rem] rounded-full bg-[radial-gradient(closest-side,rgba(245,102,10,0.12),transparent)]" />
        <div className="absolute -right-28 -top-32 size-[34rem] rounded-full bg-[radial-gradient(closest-side,rgba(40,104,79,0.10),transparent)]" />
        <div className="absolute -bottom-36 left-[35%] size-[32rem] rounded-full bg-[radial-gradient(closest-side,rgba(184,150,97,0.14),transparent)]" />
      </div>

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="mb-6 sm:mb-8">
          <ol className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-[#655f57]">
            <li className="flex min-w-0 items-center gap-2">
              <Link
                href={`/${locale}`}
                className="inline-flex min-h-7 items-center hover:text-[#16191b] transition-colors"
              >
                {labels.home}
              </Link>
              <span aria-hidden="true" className="opacity-40">/</span>
            </li>
            <li className="flex min-w-0 items-center gap-2">
              <span aria-current="page" className="text-[#16191b] font-medium">
                {labels.media}
              </span>
            </li>
          </ol>
        </nav>

        {/* Main Content Grid: Text + Editorial Asymmetric Collage */}
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10 items-center">
          {/* Left Column: Heading, Line, Subtitle, Navigation Buttons */}
          <div className="lg:col-span-5 flex flex-col items-start">
            {/* Main Editorial Heading */}
            <h1 className="font-editorial text-4xl sm:text-5xl lg:text-[3.5rem] font-bold tracking-tight text-[#16191b] leading-[1.12]">
              {labels.heading}
            </h1>

            {/* Decorative Saffron/Emerald Accent Line */}
            <span
              aria-hidden="true"
              className="mt-4 block h-[3.5px] w-18 rounded-full bg-gradient-to-r from-[#F5660A] to-[#28684f]"
            />

            {/* Subtitle */}
            <p className="mt-6 text-lg sm:text-xl text-[#3f3a34] font-medium leading-relaxed font-sans max-w-xl">
              {labels.subtitle}
            </p>

            {/* Minimal Editorial Navigation Buttons */}
            <div className="mt-8 flex flex-wrap items-center gap-3.5">
              {/* Button 1: View Photographs */}
              <a
                href="#photos"
                className="inline-flex items-center gap-2 rounded-full bg-[#151210] px-6 py-3 font-sans text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:bg-[#F5660A] hover:-translate-y-0.5 active:scale-95 cursor-pointer"
              >
                <span>{labels.viewPhotos}</span>
                <ArrowDown className="size-4 opacity-75" />
              </a>

              {/* Button 2: Watch Videos */}
              <a
                href="#videos"
                className="inline-flex items-center gap-2 rounded-full border border-[#151210]/25 bg-white/80 px-6 py-3 font-sans text-sm font-semibold text-[#151210] shadow-2xs transition-all duration-300 hover:border-[#F5660A] hover:text-[#F5660A] hover:bg-white hover:-translate-y-0.5 active:scale-95 cursor-pointer"
              >
                <span>{labels.watchVideos}</span>
                <Play className="size-3.5 fill-current" />
              </a>
            </div>
          </div>

          {/* Right Column: Premium Asymmetric Photo & Video Collage */}
          <div className="lg:col-span-7">
            {/* Desktop & Mobile Responsive Asymmetric Collage */}
            <div className="relative mx-auto w-full max-w-xl lg:max-w-none pt-4 pb-6 sm:py-8">
              {/* Decorative background glow for collage */}
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-[#F5660A]/10 via-transparent to-[#28684f]/10 blur-xl -z-10" />

              {/* 1. Primary Feature Image (Largest Card) */}
              <div className="group relative w-[80%] sm:w-[82%] aspect-[4/3] rounded-2xl sm:rounded-3xl overflow-hidden bg-[#ddd5c8] shadow-[0_20px_50px_-20px_rgba(22,24,28,0.35)] ring-1 ring-black/10">
                <Image
                  src="/images/gallery/a12.jpg"
                  alt={labels.photoAlt1}
                  fill
                  priority
                  sizes="(min-width: 1024px) 45vw, (min-width: 640px) 70vw, 85vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60 transition-opacity group-hover:opacity-40" />
                <span className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 rounded-full bg-black/60 backdrop-blur-xs px-3 py-1 text-[11px] font-semibold text-white tracking-wide">
                  {hi ? 'जनसुनवाई' : 'Public Service'}
                </span>
              </div>

              {/* 2. Secondary Photo Card (Overlapping Top-Right) */}
              <div className="group absolute -top-2 right-0 sm:-top-4 sm:right-2 w-[38%] sm:w-[36%] aspect-[4/3] rounded-xl sm:rounded-2xl overflow-hidden bg-[#ddd5c8] shadow-[0_16px_40px_-12px_rgba(22,24,28,0.30)] border-4 border-[#FAF6EE] ring-1 ring-black/5">
                <Image
                  src="/images/gallery/a10.jpg"
                  alt={labels.photoAlt2}
                  fill
                  sizes="(min-width: 1024px) 20vw, 35vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>

              {/* 3. Video Thumbnail Card with Subtle Play Icon (Overlapping Bottom-Right) */}
              <a
                href="#videos"
                aria-label={labels.watchVideos}
                className="group/vid absolute -bottom-3 right-2 sm:-bottom-5 sm:right-4 w-[54%] sm:w-[50%] aspect-video rounded-xl sm:rounded-2xl overflow-hidden bg-black shadow-[0_20px_50px_-15px_rgba(22,24,28,0.40)] border-4 border-[#FAF6EE] ring-1 ring-black/10 cursor-pointer block"
              >
                {/* Video frame preview */}
                <video
                  src="/images/media/vid3.mp4"
                  muted
                  playsInline
                  preload="metadata"
                  aria-hidden="true"
                  tabIndex={-1}
                  onLoadedMetadata={(e) => {
                    const v = e.currentTarget;
                    v.currentTime = v.duration > 1 ? 1 : 0;
                  }}
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover/vid:scale-105"
                />

                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-black/15 transition-colors group-hover/vid:from-black/80" />

                {/* Subtle Play Icon Badge */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="size-10 sm:size-11 rounded-full bg-white/95 text-[#F5660A] grid place-items-center shadow-lg transition-transform duration-300 group-hover/vid:scale-110">
                    <Play className="size-4 sm:size-5 ml-0.5 fill-[#F5660A] text-[#F5660A]" />
                  </span>
                </div>

                {/* Video Tag Label */}
                <span className="absolute bottom-2 left-2.5 sm:bottom-2.5 sm:left-3 rounded-full bg-black/70 backdrop-blur-xs px-2.5 py-0.5 text-[10px] sm:text-[11px] font-semibold text-white">
                  {hi ? 'वीडियो संदेश' : 'Video Address'}
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Patriotic Tricolor Rule */}
      <div className="tricolor-rule mt-12 sm:mt-16" />
    </header>
  );
}
