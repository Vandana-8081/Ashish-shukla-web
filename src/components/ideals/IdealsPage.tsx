'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '@/lib/languageContext';
import { idealsCategories } from '@/data/ideals';
import type { IdealPerson } from '@/data/ideals';

export function IdealsPage() {
  const { locale } = useLanguage();
  const [selectedCategoryId, setSelectedCategoryId] = useState(idealsCategories[0].id);
  const [activePerson, setActivePerson] = useState<IdealPerson | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const selectedCategory = idealsCategories.find(({ id }) => id === selectedCategoryId) ?? idealsCategories[0];
  const visiblePeople = (selectedCategoryId
    ? selectedCategory.people.map((person) => ({ person, category: selectedCategory }))
    : idealsCategories.flatMap((category) => category.people.map((person) => ({ person, category })))
  );
  const isHindi = locale === 'hi';

  useEffect(() => {
    const dialog = dialogRef.current;
    if (activePerson && dialog && !dialog.open) dialog.showModal();
    if (!activePerson && dialog?.open) dialog.close();
  }, [activePerson]);

  const copy = isHindi
    ? {
        eyebrow: 'हमारे आदर्श',
        kicker: 'प्रेरणा के स्रोत',
        tagline: 'वे महान व्यक्तित्व, जिनके विचार और मूल्य हमारी जनसेवा का मार्ग दिखाते हैं।',
        heading: 'हमारे आदर्श',
        all: 'सभी',
        thought: 'आज का विचार',
        pending: 'इस श्रेणी के लिए सत्यापित परिचय और स्वीकृत चित्र शीघ्र जोड़े जाएंगे।',
        temporaryPortrait: 'अस्थायी चित्र',
        temporaryPortraitAlt: 'अस्थायी तटस्थ आकृति; यह संबंधित व्यक्ति का चित्र नहीं है',
        close: 'बंद करें',
        closeDialog: 'विवरण बंद करें',
      }
    : {
        eyebrow: 'OUR IDEALS',
        kicker: 'SOURCES OF INSPIRATION',
        tagline: 'The great personalities whose thoughts and values guide our public service.',
        heading: 'Our Ideals',
        all: 'All',
        thought: 'A Thought to Remember',
        pending: 'Verified profiles and approved portraits for this category will be added here.',
        temporaryPortrait: 'TEMPORARY IMAGE',
        temporaryPortraitAlt: 'Temporary neutral silhouette placeholder, not a depiction of this person',
        close: 'Close',
        closeDialog: 'Close details',
      };

  return (
    <main className="min-h-screen bg-[#F7F4EF] pb-14">
      <header className="bg-[#F1EBE1] px-4 py-10 sm:px-6 sm:py-14 lg:py-16">
        <div className="mx-auto grid max-w-[1240px] items-center gap-8 lg:grid-cols-[1.2fr_.8fr] lg:gap-12">
          <div>
            <h1 className="mt-2 font-editorial text-4xl font-bold leading-tight text-[#172943] sm:text-4xl lg:text-5xl">
              {copy.heading}
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-8 text-[#554E46] sm:text-lg">{copy.tagline}</p>
          </div>
          {selectedCategory.people[0] && (
            <aside className="rounded-md border-t-4 border-[#F5660A] bg-[#102945] p-6 text-white shadow-lg sm:p-8">
              <p className="text-sm font-semibold text-[#FFB27A]">{copy.thought}</p>
              <blockquote className="mt-3 font-editorial text-xl leading-relaxed sm:text-2xl">
                “{isHindi ? selectedCategory.people[0].quotation?.hi : selectedCategory.people[0].quotation?.en || selectedCategory.people[0].quotation?.hi}”
              </blockquote>
              <div className="mt-5 flex items-center gap-3 border-t border-white/15 pt-4">
                <div className="relative h-14 w-12 shrink-0 overflow-hidden rounded border-2 border-[#F5660A] bg-white/10">
                  <Image src={selectedCategory.people[0].portrait ?? '/images/ideals/portrait-placeholder.svg'} alt="" fill sizes="48px" className="object-cover object-top" />
                </div>
                <p className="font-semibold text-white">
                  {isHindi ? selectedCategory.people[0].name.hi : selectedCategory.people[0].name.en}
                </p>
              </div>
            </aside>
          )}
        </div>
      </header>

      <section className="mx-auto max-w-[1440px] px-4 pb-12 pt-9 sm:px-6 sm:pt-12">
        <h2 className="sr-only">{copy.eyebrow}</h2>
        <div className="mb-8 flex flex-wrap justify-center gap-2.5 sm:mb-10 sm:gap-3">
          <button
            type="button"
            aria-pressed={!selectedCategoryId}
            onClick={() => setSelectedCategoryId('')}
            className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F5660A] ${!selectedCategoryId ? 'border-[#F5660A] bg-[#FFF4E6] text-[#B94F0B]' : 'border-[#D5D8E0] bg-white text-[#27374F] hover:border-[#F5660A] hover:text-[#B94F0B]'}`}
          >
            {copy.all}<small className="text-xs opacity-70">{idealsCategories.reduce((total, category) => total + category.people.length, 0)}</small>
          </button>
          {idealsCategories.map((category) => {
            const active = category.id === selectedCategoryId;
            return (
              <button
                key={category.id}
                type="button"
                aria-pressed={active}
                onClick={() => setSelectedCategoryId(category.id)}
                className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F5660A] ${active ? 'border-[#F5660A] bg-[#FFF4E6] text-[#B94F0B]' : 'border-[#D5D8E0] bg-white text-[#27374F] hover:border-[#F5660A] hover:text-[#B94F0B]'}`}
              >
                {isHindi ? category.title.hi : category.title.en}<small className="text-xs opacity-70">{category.people.length}</small>
              </button>
            );
          })}
        </div>

        {visiblePeople.length > 0 ? (
          <div aria-live="polite" className="grid grid-cols-1 gap-5 min-[440px]:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 sm:gap-7">
            {visiblePeople.map(({ person, category }) => (
              <article key={person.id}>
                <button
                  type="button"
                  onClick={() => setActivePerson(person)}
                  aria-haspopup="dialog"
                  className="group flex h-full w-full flex-col overflow-hidden rounded-md border border-[#E1DBD1] bg-white text-left shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F5660A]"
                >
                  <div className="relative aspect-[4/5] w-full overflow-hidden border-b-4 border-[#F5660A] bg-[#F1EBE1]">
                    <Image
                      src={person.portrait ?? '/images/ideals/portrait-placeholder.svg'}
                      alt={person.portrait
                        ? (isHindi ? person.portraitAlt.hi : person.portraitAlt.en)
                        : copy.temporaryPortraitAlt}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      className="object-cover object-[center_22%] transition-transform duration-500 group-hover:scale-105"
                    />
                    {person.years && <span className="absolute bottom-3 left-3 rounded-full bg-[#141B38]/85 px-3 py-1 text-xs font-semibold text-white">{isHindi && person.yearsHi ? person.yearsHi : person.years}</span>}
                    {!person.portrait && <span className="absolute inset-x-0 bottom-0 bg-[#F5660A]/80 px-2 py-1.5 text-center text-[11px] font-semibold text-white">{copy.temporaryPortrait}</span>}
                  </div>
                  <div className="flex flex-1 flex-col gap-2 p-4 sm:p-5">
                    <h3 className="font-editorial text-lg font-bold leading-snug text-[#172943] sm:text-xl">{isHindi ? person.name.hi : person.name.en}</h3>
                    <p className="text-sm font-semibold text-[#B94F0B]">{isHindi ? category.title.hi : category.title.en}</p>
                    {(person.quotation || person.description) && (
                      <blockquote className="mt-2 border-t border-[#E1DBD1] pt-3 text-sm leading-7 text-[#514A43] sm:text-base">
                        “{person.quotation
                          ? (isHindi ? person.quotation.hi : person.quotation.en || person.quotation.hi)
                          : (isHindi ? person.description?.hi : person.description?.en)}”
                      </blockquote>
                    )}
                  </div>
                </button>
              </article>
            ))}
          </div>
        ) : (
          <p className="rounded-xl bg-white px-5 py-5 text-sm leading-relaxed text-[#5C6665] shadow-sm">{copy.pending}</p>
        )}
      </section>

      <dialog
        ref={dialogRef}
        aria-labelledby="ideal-detail-title"
        onClose={() => setActivePerson(null)}
        onClick={(event) => {
          if (event.target === event.currentTarget) setActivePerson(null);
        }}
        style={{
          position: 'fixed',
          inset: 0,
          margin: 'auto',
          width: 'min(48rem, calc(100vw - 2rem))',
          maxWidth: 'none',
          maxHeight: 'calc(100dvh - 2rem)',
        }}
        className="overflow-x-hidden overflow-y-auto rounded-lg bg-white p-0 text-[#333] shadow-2xl backdrop:bg-black/60"
      >
        {activePerson && (
          <>
            <header className="flex items-center justify-between gap-4 border-b border-[#E5E5E5] px-5 py-4 sm:px-6">
              <h2 id="ideal-detail-title" className="text-lg font-semibold sm:text-xl">
                {isHindi ? activePerson.name.hi : activePerson.name.en}
                {activePerson.years ? ` (${isHindi && activePerson.yearsHi ? activePerson.yearsHi : activePerson.years})` : ''}
              </h2>
              <button
                type="button"
                aria-label={copy.closeDialog}
                onClick={() => setActivePerson(null)}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xl font-bold text-[#777] transition-colors hover:bg-[#F2F2F2] hover:text-[#333] focus-visible:outline-2 focus-visible:outline-[#F5660A]"
              >
                ×
              </button>
            </header>
            <div className="grid grid-cols-1 gap-5 px-5 py-6 sm:grid-cols-[minmax(180px,30%)_1fr] sm:gap-8 sm:px-6 sm:pb-14 sm:pt-11">
              <div className="relative mx-auto aspect-video w-full max-w-64 overflow-hidden bg-white sm:mx-0 sm:max-w-none">
                <Image
                  src={activePerson.portrait ?? '/images/ideals/portrait-placeholder.svg'}
                  alt={activePerson.portrait
                    ? (isHindi ? activePerson.portraitAlt.hi : activePerson.portraitAlt.en)
                    : copy.temporaryPortraitAlt}
                  fill
                  sizes="(max-width: 640px) 100vw, 240px"
                  className="object-contain"
                />
                {!activePerson.portrait && (
                  <span className="absolute inset-x-0 bottom-0 bg-[#F5660A]/80 px-2 py-1.5 text-center text-[11px] font-semibold tracking-wider text-white">
                    {copy.temporaryPortrait}
                  </span>
                )}
              </div>
              <div className="flex flex-col justify-center">
                {(activePerson.quotation || activePerson.description) && (
                  <p className="text-lg leading-relaxed text-[#6B625A] sm:text-xl">
                    <span aria-hidden="true" className="font-serif text-3xl font-bold text-[#A9A9A9]">“</span>
                    {activePerson.quotation
                      ? (isHindi ? activePerson.quotation.hi : activePerson.quotation.en || activePerson.quotation.hi)
                      : (isHindi ? activePerson.description?.hi : activePerson.description?.en)}
                    <span aria-hidden="true" className="font-serif text-3xl font-bold text-[#A9A9A9]">”</span>
                  </p>
                )}
              </div>
            </div>
            <footer className="flex justify-end border-t border-[#E5E5E5] px-5 py-6 sm:px-6">
              <button
                type="button"
                onClick={() => setActivePerson(null)}
                className="rounded-md border border-[#D0D0D0] px-4 py-2 text-sm font-medium transition-colors hover:bg-[#F5F5F5] focus-visible:outline-2 focus-visible:outline-[#F5660A]"
              >
                {copy.close}
              </button>
            </footer>
          </>
        )}
      </dialog>
    </main>
  );
}
