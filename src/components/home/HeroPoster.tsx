'use client';

import Image from 'next/image';
import { useLanguage } from '@/lib/languageContext';
import { Button } from '@/components/ui/Button';
import type { HeroSlide } from '@/types';

/** Poster hero slide: full-width image with the usual hero text laid over its empty left side. */
export function HeroPoster({ slide }: { slide: HeroSlide }) {
  const { t, getHref, dict } = useLanguage();

  return (
    <div className="relative flex h-[calc(100svh-5.5rem)] min-h-[560px] flex-col lg:h-[calc(100svh-5.75rem)] lg:max-h-[900px] lg:min-h-[540px]">
      {/* Desktop: the poster fills the hero behind the text */}
      <div className="absolute inset-0 hidden lg:block">
        <Image
          key={`poster-${slide.image}`}
          src={slide.image}
          alt={dict.hero.leaderCardTitle}
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_22%]"
        />
      </div>

      {/* Phones and tablets: the whole portrait poster is the background; the text sits just above his head */}
      {slide.mobileImage && (
        <div className="absolute inset-0 overflow-hidden bg-[#FFF8F0] lg:hidden">
          {/* Extends below the hero so the foot of the poster is cropped and his head sits lower */}
          <div className="absolute inset-x-0 top-0 -bottom-[9svh]">
            <Image
              key={`poster-mobile-bg-${slide.mobileImage}`}
              src={slide.mobileImage}
              alt={dict.hero.leaderCardTitle}
              fill
              priority
              sizes="100vw"
              className="object-cover object-[60%_bottom]"
            />
          </div>
        </div>
      )}

      <div className={`z-10 flex flex-col justify-center ${slide.mobileImage ? 'absolute inset-x-0 max-lg:bottom-[calc(max(100%_+_9svh,177.8vw)*0.43_-_9svh_+_84px)]' : 'relative shrink-0'} px-7 pb-3 pt-4 sm:px-10 sm:pb-6 sm:pt-12 lg:absolute lg:inset-y-0 lg:left-0 lg:w-[62%] lg:p-0 lg:pl-[9%]`}>
        {/* Same text design as the other hero slides */}
        <div className="mb-4 text-[11px] font-bold uppercase tracking-[0.22em] text-[#F5660A] sm:mb-7 sm:text-sm">
          {t(slide.eyebrow)}
        </div>

        <h1 className="max-w-[780px] font-editorial text-[34px] font-bold leading-[1.15] sm:leading-[0.98] tracking-[-0.035em] text-[#151210] sm:text-[56px] md:text-[64px] lg:text-[68px] xl:text-[76px]">
          {t(slide.heading)}
        </h1>

        {slide.nickname && (
          <p className="mt-2 font-editorial text-xl font-bold text-saffron sm:mt-3 sm:text-2xl md:text-3xl">
            {t(slide.nickname)}
          </p>
        )}

        {slide.subtitle && (
          <p className="mt-4 max-w-[680px] font-editorial text-base font-semibold leading-snug text-[#151210] sm:mt-6 sm:text-xl md:text-2xl">
            {t(slide.subtitle)}
          </p>
        )}

        <p className="mt-5 max-w-[680px] text-sm font-normal leading-relaxed text-[#4A433D] sm:mt-4 sm:text-lg sm:leading-[1.65] md:text-xl">
          {t(slide.description)}
        </p>

        <div className="mt-5 flex flex-col items-stretch gap-2.5 sm:mt-10 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
          <Button
            href={getHref(slide.primaryCta.path)}
            variant="primary"
            size="lg"
            icon="arrow"
            className="w-full justify-center bg-white px-3 py-3 text-center text-sm leading-snug text-[#F5660A] hover:bg-[#FFF5E9] sm:w-auto sm:px-6 sm:py-3.5 sm:text-base"
          >
            {t(slide.primaryCta.label)}
          </Button>

          <Button
            href={getHref(slide.secondaryCta.path)}
            variant="secondary"
            size="lg"
            className="w-full justify-center px-3 py-3 text-center text-sm leading-snug sm:w-auto sm:px-6 sm:py-3.5 sm:text-base"
          >
            {t(slide.secondaryCta.label)}
          </Button>
        </div>
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
