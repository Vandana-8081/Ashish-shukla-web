'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useLanguage } from '@/lib/languageContext';
import { heroSlides } from '@/data/heroSlides';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { HeroPoster } from '@/components/home/HeroPoster';
import { Autoplay, Keyboard } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperInstance } from 'swiper';
import 'swiper/css';
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
  const swiperRef = useRef<SwiperInstance | null>(null);
  // Mobile photo box follows each slide's own proportions: full width, never cropped.
  const [mobilePhotoRatio, setMobilePhotoRatio] = useState(4 / 5);
  const mobileImageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (heroSlides.length <= 1 || heroSlides.every((item) => item.poster)) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);

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
    if (swiperRef.current && !swiperRef.current.destroyed) {
      swiperRef.current.slidePrev();
      return;
    }
    setCurrentSlide((prev) =>
      prev === 0 ? heroSlides.length - 1 : prev - 1
    );
  };

  const goToNext = () => {
    if (swiperRef.current && !swiperRef.current.destroyed) {
      swiperRef.current.slideNext();
      return;
    }
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
              bottom-3
              sm:bottom-4
              lg:bottom-5
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
              py-1.5
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
              aria-label="Hero slides. Use the left and right arrow keys to change slides."
            >
              {heroSlides.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  role="tab"
                  onClick={() => {
                    if (swiperRef.current && !swiperRef.current.destroyed) swiperRef.current.slideToLoop(idx);
                    else setCurrentSlide(idx);
                  }}
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
      data-no-split="true"
      className="
        hero-section
        relative
        min-h-[calc(100svh-4.8125rem)]
        sm:min-h-[calc(100svh-5.3125rem)]
        w-full
        overflow-hidden
        bg-[#F8F4ED]
        border-b
        border-[#E8E2D8]
      "
    >
      {slide.poster && (
        <>
          <Swiper
            modules={[Autoplay, Keyboard]}
            loop={heroSlides.length > 1}
            autoplay={heroSlides.length > 1 ? { delay: 5000, disableOnInteraction: false } : false}
            keyboard={{ enabled: true, onlyInViewport: true }}
            onSwiper={(swiper) => { swiperRef.current = swiper; }}
            onSlideChange={(swiper) => setCurrentSlide(swiper.realIndex)}
            className="!absolute !inset-0 !h-full min-h-[inherit]"
          >
            {heroSlides.map((heroSlide) => (
              <SwiperSlide key={heroSlide.id}>
                <HeroPoster slide={heroSlide} />
              </SwiperSlide>
            ))}
          </Swiper>
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
          w-full
          min-h-[inherit]
        "
      >
        <div
          className="
            relative
            h-full
            w-full
            min-h-0
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
              pt-16 sm:pt-20 pb-3 sm:pb-5 lg:py-8
              pr-0
              lg:pr-8
            "
          >
            {/* Eyebrow */}
            {slide.eyebrow && (
              <div className="eyebrow-label hero-eyebrow relative mb-2 sm:mb-3 inline-flex w-fit items-center rounded-sm border border-[#F2E4D7] bg-[#FFF9F2] px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#B94F0B] shadow-sm sm:px-4 sm:py-2 sm:text-xs">
                {t(slide.eyebrow)}
              </div>
            )}

            {/* Main Heading */}
            <h1
              key={`hero-heading-main-${slide.id}-${t(slide.heading)}`}
              data-no-split="true"
              className="
                max-w-[950px]
                font-editorial
                text-[44px]
                sm:text-[54px]
                md:text-[66px]
                lg:text-[78px]
                xl:text-[88px]
                font-semibold sm:font-bold
                text-[#151210]
                leading-[1.22] sm:leading-[1.15]
                tracking-[-0.015em]
                animate-fadeIn
              "
            >
              {t(slide.heading).includes('\n') ? (
                <>
                  {t(slide.heading).split('\n')[0]}
                  <br />
                  <span className="text-saffron">{t(slide.heading).split('\n')[1]}</span>
                </>
              ) : t(slide.heading).includes(' ') ? (
                <>
                  {t(slide.heading).slice(0, t(slide.heading).lastIndexOf(' '))}
                  {' '}
                  <span className="text-saffron">{t(slide.heading).slice(t(slide.heading).lastIndexOf(' ') + 1)}</span>
                </>
              ) : (
                t(slide.heading)
              )}
            </h1>

            {slide.nickname && (
              <p
                key={`hero-nickname-main-${slide.id}-${t(slide.nickname)}`}
                data-no-split="true"
                className="mt-1 sm:mt-2 font-editorial text-lg sm:text-2xl md:text-[28px] lg:text-3xl font-semibold text-[#151210] tracking-normal animate-fadeIn"
              >
                {t(slide.nickname)}
              </p>
            )}

            {/* Subtitle */}
            {slide.subtitle && (
              <p
                key={`hero-subtitle-main-${slide.id}-${t(slide.subtitle)}`}
                data-no-split="true"
                className="mt-2.5 sm:mt-3.5 max-w-[720px] font-editorial text-[20px] sm:text-[19px] md:text-[23px] lg:text-[28px] xl:text-[32px] font-medium sm:font-semibold leading-relaxed text-[#1E1916] whitespace-pre-line tracking-normal animate-fadeIn"
              >
                {t(slide.subtitle)}
              </p>
            )}

            {/* Description */}
            {t(slide.description).trim() && (
              <p
                className="
                  mt-2.5 sm:mt-3.5
                  max-w-[700px]
                  text-xs sm:text-sm md:text-[15px] lg:text-base
                  text-[#4A433D]
                  leading-[1.65]
                  font-normal
                "
              >
                {t(slide.description)}
              </p>
            )}

            {/* CTA Buttons */}
            {(slide.primaryCta || slide.secondaryCta) && (
              <div
                className="
                  mt-4
                  sm:mt-6
                  flex
                  flex-col sm:flex-row sm:flex-wrap
                  items-stretch sm:items-center
                  gap-2.5 sm:gap-4
                "
              >
                {slide.primaryCta && (
                  <Button
                    href={getHref(slide.primaryCta.path)}
                    variant="primary"
                    size="lg"
                    icon="arrow"
                    className="w-full sm:w-auto justify-center px-3 py-3 text-center text-sm leading-snug sm:px-6 sm:py-3.5 sm:text-base bg-white text-[#F5660A] hover:bg-[#FFF5E9]"
                  >
                    {t(slide.primaryCta.label)}
                  </Button>
                )}

                {slide.secondaryCta && (
                  <Button
                    href={getHref(slide.secondaryCta.path)}
                    variant="secondary"
                    size="lg"
                    className="w-full sm:w-auto justify-center px-3 py-3 text-center text-sm leading-snug sm:px-6 sm:py-3.5 sm:text-base"
                  >
                    {t(slide.secondaryCta.label)}
                  </Button>
                )}
              </div>
            )}
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
                  object-contain
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
              max-h-[35svh]
              flex-1
              min-h-0
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
