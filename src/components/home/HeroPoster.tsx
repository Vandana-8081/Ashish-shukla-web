'use client';

import Image from 'next/image';
import { useLanguage } from '@/lib/languageContext';
import { Button } from '@/components/ui/Button';
import type { HeroSlide } from '@/types';

/** Poster hero slide: full-width image with the usual hero text laid over its empty left side. */
export function HeroPoster({ slide }: { slide: HeroSlide }) {
  const { t, getHref, dict } = useLanguage();

  return (
    <div className="relative flex h-full w-full min-h-[inherit] flex-col overflow-hidden">
      {/* Desktop: the poster fills the hero behind the text */}
      <div className="absolute inset-0 hidden lg:block">
        <Image
          key={`poster-${slide.image}`}
          src={slide.image}
          alt={dict.hero.leaderCardTitle}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>

      {/* Phones and tablets: the whole portrait poster is the background; the text sits just above his head */}
      {slide.mobileImage && (
        <div className="absolute inset-0 overflow-hidden bg-[#FFF8F0] lg:hidden">
          {/* Extends slightly below the hero so the foot of the poster is cropped, keeping his face and shoulders in view */}
          <div className="absolute inset-0">
            <Image
              key={`poster-mobile-bg-${slide.mobileImage}`}
              src={slide.mobileImage}
              alt={dict.hero.leaderCardTitle}
              fill
              priority
              sizes="100vw"
              className="object-cover object-center sm:object-[60%_20%]"
            />
          </div>
        </div>
      )}

      <div className={`z-10 flex flex-col justify-center ${slide.mobileImage ? 'absolute inset-x-0 top-20 sm:top-24 max-lg:bottom-auto' : 'relative shrink-0 pt-20 sm:pt-24 lg:pt-0'} px-5 sm:px-8 lg:absolute lg:inset-y-0 lg:left-0 lg:w-[62%] xl:w-[58%] lg:p-0 lg:pl-[8%]`}>
        {/* Same text design as the other hero slides */}
        {slide.eyebrow && (
          <div className="eyebrow-label hero-eyebrow relative mb-2 sm:mb-3 lg:mb-4 inline-flex w-fit items-center rounded-sm border border-[#F2E4D7] bg-[#FFF9F2] px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#B94F0B] shadow-sm sm:px-4 sm:py-2 sm:text-xs">
            {t(slide.eyebrow)}
          </div>
        )}

        <h1
          key={`hero-heading-${slide.id}-${t(slide.heading)}`}
          data-no-split="true"
          className="max-w-[950px] font-editorial text-[44px] sm:text-[54px] md:text-[66px] lg:text-[78px] xl:text-[88px] font-semibold sm:font-bold leading-[1.22] sm:leading-[1.15] tracking-[-0.015em] text-[#151210] animate-fadeIn"
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
            key={`hero-nickname-${slide.id}-${t(slide.nickname)}`}
            data-no-split="true"
            className="mt-1 sm:mt-2 font-editorial text-lg sm:text-2xl md:text-[28px] lg:text-3xl font-semibold text-[#151210] tracking-normal animate-fadeIn"
          >
            {t(slide.nickname)}
          </p>
        )}

        {slide.subtitle && (
          <p
            key={`hero-subtitle-${slide.id}-${t(slide.subtitle)}`}
            data-no-split="true"
            className="mt-2.5 sm:mt-3.5 max-w-[720px] font-editorial text-[15px] sm:text-[19px] md:text-[23px] lg:text-[28px] xl:text-[32px] font-medium sm:font-semibold leading-[1.48] text-[#1E1916] whitespace-pre-line tracking-normal animate-fadeIn"
          >
            {t(slide.subtitle)}
          </p>
        )}

        {t(slide.description).trim() && (
          <p className="mt-2.5 sm:mt-3.5 max-w-[700px] text-xs sm:text-sm md:text-[15px] lg:text-base font-normal leading-[1.65] text-[#4A433D]">
            {t(slide.description)}
          </p>
        )}

        {(slide.primaryCta || slide.secondaryCta) && (
          <div className="mt-3 sm:mt-6 flex flex-col items-stretch gap-2.5 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4 max-lg:flex-row max-lg:gap-2">
            {slide.primaryCta && (
              <Button
                href={getHref(slide.primaryCta.path)}
                variant="primary"
                size="lg"
                icon="arrow"
                className="w-full justify-center bg-white px-3 py-3 text-center text-sm leading-snug text-[#F5660A] hover:bg-[#FFF5E9] sm:w-auto sm:px-6 sm:py-3.5 sm:text-base max-lg:w-auto max-lg:flex-1 max-lg:whitespace-nowrap max-lg:rounded-full max-lg:bg-[#F5660A] max-lg:px-2 max-lg:py-2 max-lg:text-[11px] max-lg:text-white max-lg:shadow-md max-lg:hover:bg-[#D45300]"
              >
                {t(slide.primaryCta.label)}
              </Button>
            )}

            {slide.secondaryCta && (
              <Button
                href={getHref(slide.secondaryCta.path)}
                variant="secondary"
                size="lg"
                className="w-full justify-center px-3 py-3 text-center text-sm leading-snug sm:w-auto sm:px-6 sm:py-3.5 sm:text-base max-lg:w-auto max-lg:flex-1 max-lg:whitespace-nowrap max-lg:rounded-full max-lg:border-[#E8E2D8] max-lg:bg-white/90 max-lg:px-2 max-lg:py-2 max-lg:text-[11px] max-lg:text-[#151210] max-lg:shadow-sm"
              >
                {t(slide.secondaryCta.label)}
              </Button>
            )}
          </div>
        )}
      </div>

      {/* Phones and tablets without a portrait poster: the photo fills the rest of the screen under the text */}
      {!slide.mobileImage && (
        <div className="relative min-h-[200px] flex-1 lg:hidden">
          <Image
            key={`poster-mobile-${slide.image}`}
            src={slide.image}
            alt={dict.hero.leaderCardTitle}
            fill
            sizes="100vw"
            className="object-cover object-[94%_15%]"
          />
          <div className="absolute inset-x-0 top-0 h-[10%] bg-gradient-to-b from-[#F8F4ED] to-transparent" />
        </div>
      )}
    </div>
  );
}
