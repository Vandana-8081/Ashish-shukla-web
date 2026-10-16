'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, MapPin, Info } from 'lucide-react';
import { useLanguage } from '@/lib/languageContext';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import {
  cultureItems,
  heritageClosingLinks,
  heritageHero,
  heritagePending,
  heritageSections,
  identityPoints,
  placesOfInterest,
  timelineEvents,
} from '@/data/heritage';

type PlaceFilter = 'all' | 'place' | 'landmark';

function PendingNotice() {
  const { t } = useLanguage();
  return (
    <div className="mx-auto flex max-w-2xl items-start gap-4 rounded-2xl border border-dashed border-[#D9C58A] bg-white/70 p-6 sm:p-8">
      <Info className="mt-0.5 h-6 w-6 shrink-0 text-[#C9A227]" aria-hidden="true" />
      <div>
        <p className="font-editorial text-lg font-bold text-[#151210]">{t(heritagePending.title)}</p>
        <p className="mt-2 text-sm leading-relaxed text-[#6B625A] sm:text-base">{t(heritagePending.description)}</p>
      </div>
    </div>
  );
}


function GoldRule() {
  return (
    <div className="flex items-center gap-3" aria-hidden="true">
      <span className="h-px w-12 bg-[#C9A227]" />
      <span className="h-2 w-2 rotate-45 bg-[#C9A227]" />
      <span className="h-px w-12 bg-[#C9A227]" />
    </div>
  );
}

export function HeritagePage() {
  const { t, getHref } = useLanguage();
  const [placeFilter, setPlaceFilter] = useState<PlaceFilter>('all');

  const sections = heritageSections;
  const visiblePlaces = placesOfInterest.filter((place) => placeFilter === 'all' || place.kind === placeFilter);

  const filters: { id: PlaceFilter; label: string }[] = [
    { id: 'all', label: t(sections.places.filterAll) },
    { id: 'place', label: t(sections.places.filterPlace) },
    { id: 'landmark', label: t(sections.places.filterLandmark) },
  ];

  return (
    <div className="space-y-20 pb-20 md:space-y-28 md:pb-28">
      {/* 1. Hero */}
      <section className="relative overflow-hidden bg-[#FBF7EF] pt-12 pb-16 md:pt-20 md:pb-24">
        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#F5660A]/10" aria-hidden="true" />
        <Container size="wide">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <div className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#F5660A]">{t(heritageHero.eyebrow)}</div>
              <h1 className="font-editorial text-4xl font-bold leading-[1.1] tracking-tight text-[#151210] sm:text-5xl lg:text-6xl">
                {t(heritageHero.title)}
              </h1>
              <div className="my-6">
                <GoldRule />
              </div>
              <p className="max-w-xl text-base leading-relaxed text-[#6B625A] sm:text-lg">{t(heritageHero.intro)}</p>
              <a
                href="#places"
                className="mt-8 inline-flex min-h-11 items-center gap-2 rounded-lg bg-[#F5660A] px-5 text-sm font-semibold text-white transition-colors hover:bg-[#D45300] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F5660A]"
              >
                {t(heritageSections.places.eyebrow)}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>

            <figure className="mx-auto w-full max-w-xl lg:max-w-none">
              <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-[#E8E2D8] shadow-xl shadow-[#C9A227]/10">
                <Image
                  src={heritageHero.image}
                  alt={t(heritageHero.imageAlt)}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </figure>
          </div>
        </Container>
      </section>

      {/* 3. Places of interest */}
      <section id="places" className="scroll-mt-24">
        <Container size="wide">
          <SectionHeading eyebrow={t(sections.places.eyebrow)} title={t(sections.places.title)} description={t(sections.places.description)} />

          {placesOfInterest.length === 0 ? (
            <PendingNotice />
          ) : (
            <>
              <div role="group" aria-label={t(sections.places.title)} className="mb-8 flex flex-wrap gap-2">
                {filters.map((filter) => (
                  <button
                    key={filter.id}
                    type="button"
                    aria-pressed={placeFilter === filter.id}
                    onClick={() => setPlaceFilter(filter.id)}
                    className={`min-h-10 rounded-full border px-4 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F5660A] ${
                      placeFilter === filter.id
                        ? 'border-[#F5660A] bg-[#F5660A] text-white'
                        : 'border-[#E8E2D8] bg-white text-[#151210] hover:border-[#F5660A]'
                    }`}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>

              {visiblePlaces.length === 0 ? (
                <p className="text-[#6B625A]">{t(sections.places.noneInFilter)}</p>
              ) : (
                <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {visiblePlaces.map((place) => (
                    <li key={place.id}>
                      <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[#E8E2D8] bg-white shadow-sm transition-shadow duration-300 hover:shadow-lg">
                        <div className="relative aspect-[4/3] overflow-hidden bg-[#E8E2D8]">
                          {place.image ? (
                            <Image
                              src={place.image}
                              alt={place.imageAlt ? t(place.imageAlt) : t(place.name)}
                              fill
                              loading="lazy"
                              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                              style={place.imagePosition ? { objectPosition: place.imagePosition } : undefined}
                              className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                            />
                          ) : (
                            <div className="flex h-full flex-col items-center justify-center gap-2 bg-[#FBF7EF] text-center text-sm text-[#6B625A]">
                              <MapPin className="h-8 w-8 text-[#C9A227]" aria-hidden="true" />
                              <span>{t(sections.places.photoPending)}</span>
                            </div>
                          )}
                        </div>
                        <div className="flex flex-1 flex-col p-5">
                          <p className="flex items-center gap-1.5 text-xs text-[#6B625A]">
                            <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                            {t(place.location)}
                          </p>
                          <h3 className="mt-2 font-editorial text-xl font-bold text-[#151210]">{t(place.name)}</h3>
                          {place.description && <p className="mt-2 text-sm leading-relaxed text-[#6B625A]">{t(place.description)}</p>}
                          {place.significance ? (
                            <p className="mt-3 text-sm leading-relaxed text-[#151210]">
                              <span className="font-semibold text-[#C9A227]">{t(sections.places.significance)}: </span>
                              {t(place.significance)}
                            </p>
                          ) : (
                            <p className="mt-3 text-sm leading-relaxed text-[#6B625A]">{t(sections.places.detailsPending)}</p>
                          )}
                          {place.mapUrl && (
                            <a
                              href={place.mapUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[#F5660A] hover:text-[#D45300] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F5660A]"
                            >
                              {t(sections.places.viewOnMap)}
                              <ArrowRight className="h-4 w-4" aria-hidden="true" />
                            </a>
                          )}
                        </div>
                      </article>
                    </li>
                  ))}
                </ul>
              )}
            </>
          )}
        </Container>
      </section>

      {/* 4. Historical timeline */}
      <section id="history" className="scroll-mt-24 bg-[#FBF7EF] py-16 md:py-24">
        <Container size="wide">
          <SectionHeading eyebrow={t(sections.history.eyebrow)} title={t(sections.history.title)} description={t(sections.history.description)} />

          {timelineEvents.length === 0 ? (
            <PendingNotice />
          ) : (
            <ol className="relative mx-auto max-w-3xl border-l-2 border-[#C9A227]/50 pl-8">
              {timelineEvents.map((event) => (
                <li key={event.id} className="relative pb-10 last:pb-0">
                  <span className="absolute -left-[41px] top-1.5 h-4 w-4 rounded-full border-4 border-[#FBF7EF] bg-[#F5660A]" aria-hidden="true" />
                  <p className="text-sm font-bold tracking-wide text-[#F5660A]">{typeof event.date === 'string' ? event.date : t(event.date)}</p>
                  <h3 className="mt-1 font-editorial text-xl font-bold text-[#151210]">{t(event.title)}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#6B625A] sm:text-base">{t(event.description)}</p>
                </li>
              ))}
            </ol>
          )}
        </Container>
      </section>

      {/* 5. Local culture & traditions */}
      {cultureItems.length > 0 && (
      <section id="culture" className="scroll-mt-24">
        <Container size="wide">
          <SectionHeading eyebrow={t(sections.culture.eyebrow)} title={t(sections.culture.title)} description={t(sections.culture.description)} />

          {(
            <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {cultureItems.map((item) => (
                <li key={item.id}>
                  <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-[#E8E2D8] bg-white shadow-sm">
                    {item.image && (
                      <div className="relative aspect-[4/3] bg-[#E8E2D8]">
                        <Image
                          src={item.image}
                          alt={item.imageAlt ? t(item.imageAlt) : t(item.name)}
                          fill
                          loading="lazy"
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-cover"
                        />
                      </div>
                    )}
                    <div className="flex flex-1 flex-col p-5">
                      <span className="text-xs font-semibold uppercase tracking-wider text-[#C9A227]">{t(sections.culture.kinds[item.kind])}</span>
                      <h3 className="mt-2 font-editorial text-xl font-bold text-[#151210]">{t(item.name)}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-[#6B625A]">
                        {item.description ? t(item.description) : t(sections.places.detailsPending)}
                      </p>
                      {item.mapUrl && (
                        <a
                          href={item.mapUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[#F5660A] hover:text-[#D45300] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F5660A]"
                        >
                          {t(sections.places.viewOnMap)}
                          <ArrowRight className="h-4 w-4" aria-hidden="true" />
                        </a>
                      )}
                    </div>
                  </article>
                </li>
              ))}
            </ul>
          )}
        </Container>
      </section>
      )}

      {/* 6. Our identity */}
      <section id="identity" className="scroll-mt-24 bg-[#FBF7EF] py-16 md:py-24">
        <Container size="wide">
          <SectionHeading eyebrow={t(sections.identity.eyebrow)} title={t(sections.identity.title)} description={t(sections.identity.description)} />
          <ul className="grid gap-6 md:grid-cols-3">
            {identityPoints.map((point, index) => (
              <li key={point.id}>
                <article className="relative h-full overflow-hidden rounded-2xl border border-[#E8E2D8] bg-white p-7 shadow-sm">
                  <span className="font-editorial text-5xl font-bold text-[#C9A227]/40" aria-hidden="true">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <h3 className="mt-3 font-editorial text-xl font-bold text-[#151210]">{t(point.title)}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#6B625A] sm:text-base">{t(point.description)}</p>
                </article>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* 8. Closing */}
      <section id="closing">
        <Container size="narrow">
          <div className="rounded-3xl border border-[#E8D9A8] bg-[#FFF8E8] px-6 py-12 text-center shadow-sm sm:px-12 md:py-16">
            <div className="flex justify-center">
              <GoldRule />
            </div>
            <p className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-[#F5660A]">{t(sections.closing.eyebrow)}</p>
            <h2 className="mt-4 font-editorial text-3xl font-bold leading-tight text-[#151210] sm:text-4xl">{t(sections.closing.title)}</h2>
            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-[#6B625A]">{t(sections.closing.description)}</p>
            <ul className="mt-8 flex flex-wrap justify-center gap-3">
              {heritageClosingLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    href={getHref(link.path)}
                    className="inline-flex min-h-11 items-center gap-2 rounded-full border border-[#E8E2D8] bg-white px-5 text-sm font-semibold text-[#151210] transition-colors hover:border-[#F5660A] hover:text-[#F5660A] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F5660A]"
                  >
                    {t(link.label)}
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>
    </div>
  );
}
