'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useLanguage } from '@/lib/languageContext';
import { heroSlides } from '@/data/heroSlides';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { HeroPoster } from '@/components/home/HeroPoster';
import {
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

// Feather the photo's edges into the section background so it never reads as a card.
const mobilePhotoMask = {
  maskImage: 'linear-gradient(to bottom, transparent 0, #000 12%, #000 100%)',
  WebkitMaskImage: 'linear-gradient(to bottom, transparent 0, #000 12%, #000 100%)',
} as React.CSSProperties;

const desktopPhotoMask = {
  maskImage: 'linear-gradient(to right, transparent 0, #000 22%, #000 86%, transparent 100%)',
  WebkitMaskImage: 'linear-gradient(to right, transparent 0, #000 22%, #000 86%, transparent 100%)',
} as React.CSSProperties;

export function Hero() {
  const { t, dict, getHref } = useLanguage();

  const [currentSlide, setCurrentSlide] = useState(0);
  // Mobile photo box follows each slide's own proportions: full width, never cropped.
  const [mobilePhotoRatio, setMobilePhotoRatio] = useState(4 / 5);
  const mobileImageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (heroSlides.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  const slide = heroSlides[currentSlide];

  // onLoad can fire before hydration for cached images, so also read the size of an already-loaded image.
  useEffect(() => {
    const img = mobileImageRef.current;
    if (img?.complete && img.naturalWidth && img.naturalHeight) {
      setMobilePhotoRatio(img.naturalWidth / img.naturalHeight);
    }
  }, [currentSlide]);

  const goToPrevious = () => {
    setCurrentSlide((prev) =>
      prev === 0 ? heroSlides.length - 1 : prev - 1
    );
  };

  const goToNext = () => {
    setCurrentSlide((prev) =>
      (prev + 1) % heroSlides.length
    );
  };

  const controls = heroSlides.length > 1 ? (
          <div
            className="
              pointer-events-auto
              absolute
              z-30
              bottom-7
              lg:bottom-8
              left-1/2
              -translate-x-1/2
              flex
              items-center
              gap-3
              bg-[#151210]/10
              backdrop-blur-md
              border
              border-white/40
              rounded-full
              px-3
              py-2
              shadow-sm
            "
          >
            {/* Previous */}
            <button
              type="button"
              onClick={goToPrevious}
              aria-label="Previous slide"
              className="
                w-10
                h-10
                rounded-full
                flex
                items-center
                justify-center
                text-[#151210]
                hover:bg-white/70
                transition-colors
              "
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {/* Dots */}
            <div
              className="flex items-center gap-1.5"
              role="tablist"
              aria-label="Hero slides"
            >
              {heroSlides.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  role="tab"
                  onClick={() => setCurrentSlide(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                  aria-selected={currentSlide === idx}
                  className={`
                    relative
                    h-2
                    rounded-full
                    after:absolute
                    after:-inset-2
                    after:content-['']
                    transition-[width,background-color]
                    duration-300
                    ${
                      currentSlide === idx
                        ? 'w-8 bg-white'
                        : 'w-2 bg-white/50 hover:bg-white/80'
                    }
                  `}
                />
              ))}
            </div>

            {/* Next */}
            <button
              type="button"
              onClick={goToNext}
              aria-label="Next slide"
              className="
                w-10
                h-10
                rounded-full
                flex
                items-center
                justify-center
                text-[#151210]
                hover:bg-white/70
                transition-colors
              "
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
  ) : null;

  return (
    <section
      className={`
        relative
        min-h-0
        ${slide.poster ? '' : 'lg:min-h-[720px]'}
        overflow-hidden
        bg-[#F8F4ED]
        border-b
        border-[#E8E2D8]
      `}
    >
      {slide.poster && (
        <>
          <HeroPoster slide={slide} />
          <div className="pointer-events-none absolute inset-0 z-30">
            <Container size="wide" className="relative h-full">
              {controls}
            </Container>
          </div>
        </>
      )}

      {!slide.poster && (
        <>
      {/* =====================================================
          BACKGROUND
      ====================================================== */}

      {/* Soft warm glow */}
      <div
        className="
          absolute
          left-[-180px]
          bottom-[-220px]
          w-[650px]
          h-[500px]
          rounded-full
          bg-[#F5660A]/[0.06]
          blur-3xl
          pointer-events-none
        "
      />

      {/* =====================================================
          DECORATIVE CURVE / SAFFRON SHAPE
          Similar visual language to your reference
      ====================================================== */}

      <div
        className="
          absolute
          right-[-120px]
          bottom-[-260px]
          w-[720px]
          h-[480px]
          rounded-[50%]
          border-[80px]
          border-[#F5660A]/[0.08]
          rotate-[-8deg]
          pointer-events-none
        "
      />

      <Container
        size="wide"
        className="
          relative
          z-10
          h-full
          min-h-0
          lg:min-h-[720px]
        "
      >
        <div
          className="
            relative
            min-h-0
            lg:min-h-[720px]
            grid
            grid-cols-1
            lg:grid-cols-12
            items-center
          "
        >
          {/* =================================================
              LEFT CONTENT
          ================================================== */}

          <div
            className="
              relative
              z-20
              lg:col-span-7
              xl:col-span-7
              flex
              flex-col
              justify-center
              pt-6 sm:pt-16
              pb-4 sm:pb-6
              lg:py-20
              pr-0
              lg:pr-8
            "
          >
            {/* Eyebrow */}
            <div
              className="
                eyebrow-label
                flex
                items-center
                gap-3
                mb-3
                sm:mb-7
                text-xs
                sm:text-sm
                font-bold
                tracking-[0.22em]
                uppercase
                text-[#F5660A]
              "
            >
             
                {t(slide.eyebrow)}
             
            </div>

            {/* Main Heading */}
            <h1
              className="
                max-w-[780px]
                font-editorial
                text-[38px]
                sm:text-[44px]
                md:text-[48px]
                lg:text-[52px]
                xl:text-[58px]
                font-bold
                text-[#151210]
                leading-[0.98]
                tracking-[-0.035em]
              "
            >
              {t(slide.heading)}
            </h1>

            {slide.nickname && (
              <p className="mt-2 font-editorial text-xl font-bold text-saffron sm:mt-3 sm:text-2xl md:text-3xl">
                {t(slide.nickname)}
              </p>
            )}

            {/* Subtitle */}
            {slide.subtitle && (
              <p className="mt-4 sm:mt-6 max-w-[680px] font-editorial text-lg sm:text-xl md:text-2xl font-semibold leading-snug text-[#151210]">
                {t(slide.subtitle)}
              </p>
            )}

            {/* Description */}
            <p
              className="
                mt-3 sm:mt-4
                max-w-[680px]
                text-base
                sm:text-lg
                md:text-xl
                text-[#4A433D]
                leading-[1.65]
                font-normal
              "
            >
              {t(slide.description)}
            </p>

            {/* CTA Buttons */}
            <div
              className="
                mt-5
                sm:mt-10
                flex
                flex-col sm:flex-row sm:flex-wrap
                items-stretch sm:items-center
                gap-2.5 sm:gap-4
              "
            >
              <Button
                href={getHref(slide.primaryCta.path)}
                variant="primary"
                size="lg"
                icon="arrow"
                className="w-full sm:w-auto justify-center px-3 py-3 text-center text-sm leading-snug sm:px-6 sm:py-3.5 sm:text-base bg-white text-[#F5660A] hover:bg-[#FFF5E9]"
              >
                {t(slide.primaryCta.label)}
              </Button>

              <Button
                href={getHref(slide.secondaryCta.path)}
                variant="secondary"
                size="lg"
                className="w-full sm:w-auto justify-center px-3 py-3 text-center text-sm leading-snug sm:px-6 sm:py-3.5 sm:text-base"
              >
                {t(slide.secondaryCta.label)}
              </Button>
            </div>
          </div>

          {/* =================================================
              RIGHT IMAGE
          ================================================== */}

          <div
            className="
              absolute
              right-[-5%]
              bottom-0
              hidden
              lg:block
              lg:col-span-5
              w-[53%]
              h-full
              pointer-events-none
            "
          >
            {/* Main image */}
            <div className="absolute inset-0" style={desktopPhotoMask}>

              <Image
                key={slide.image}
                src={slide.image}
                alt={dict.hero.leaderCardTitle}
                fill
                priority
                sizes="(max-width: 1024px) 0vw, 55vw"
                className="
                  object-cover
                  object-center
                "
              />

              {/* Left fade — blends image into cream background */}
              <div
                className="
                  absolute
                  inset-y-0
                  left-0
                  w-[42%]
                  bg-gradient-to-r
                  from-[#F8F4ED]
                  via-[#F8F4ED]/75
                  to-transparent
                "
              />

              {/* Bottom fade */}
              <div
                className="
                  absolute
                  inset-x-0
                  bottom-0
                  h-[28%]
                  bg-gradient-to-t
                  from-[#F8F4ED]
                  via-[#F8F4ED]/35
                  to-transparent
                "
              />

              {/* Top soft fade */}
              <div
                className="
                  absolute
                  inset-x-0
                  top-0
                  h-[15%]
                  bg-gradient-to-b
                  from-[#F8F4ED]/45
                  to-transparent
                "
              />

              {/* Very subtle warm image tint */}
              <div
                className="
                  absolute
                  inset-0
                  bg-gradient-to-tr
                  from-[#F5660A]/[0.03]
                  via-transparent
                  to-[#F5660A]/[0.04]
                  mix-blend-multiply
                "
              />
            </div>
          </div>

          {/* =================================================
              MOBILE IMAGE
          ================================================== */}

          <div
            className="
              lg:hidden
              relative
              -mx-4
              sm:-mx-6
              w-auto
              mt-2
            "
            style={{ aspectRatio: mobilePhotoRatio }}
          >
            <div className="absolute inset-0" style={mobilePhotoMask}>

              <Image
                key={`mobile-${slide.image}`}
                ref={mobileImageRef}
                src={slide.image}
                alt={dict.hero.leaderCardTitle}
                fill
                sizes="100vw"
                className="object-cover"
                onLoad={(event) => {
                  const { naturalWidth, naturalHeight } = event.currentTarget;
                  if (naturalWidth && naturalHeight) setMobilePhotoRatio(naturalWidth / naturalHeight);
                }}
              />

              {/* Top fade */}
              <div
                className="
                  absolute
                  inset-x-0
                  top-0
                  h-[8%]
                  bg-gradient-to-b
                  from-[#F8F4ED]
                  to-transparent
                "
              />

              {/* Bottom fade */}
              <div
                className="
                  absolute
                  inset-x-0
                  bottom-0
                  h-[12%]
                  bg-gradient-to-t
                  from-[#F8F4ED]
                  to-transparent
                "
              />
            </div>
          </div>
        </div>

        {/* =====================================================
            SLIDER CONTROLS
        ====================================================== */}

        {controls}
      </Container>
        </>
      )}
    </section>
  );
}
