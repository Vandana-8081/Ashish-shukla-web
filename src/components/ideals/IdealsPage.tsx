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
  const selectedCategory = idealsCategories.find(({ id }) => id === selectedCategoryId)!;
  const isHindi = locale === 'hi';

  useEffect(() => {
    const dialog = dialogRef.current;
    if (activePerson && dialog && !dialog.open) dialog.showModal();
    if (!activePerson && dialog?.open) dialog.close();
  }, [activePerson]);

  const copy = isHindi
    ? {
        eyebrow: 'हमारे आदर्श',
        heading: 'हमारे आदर्श',
        categories: 'श्रेणियाँ',
        pending: 'इस श्रेणी के लिए सत्यापित परिचय और स्वीकृत चित्र शीघ्र जोड़े जाएंगे।',
        temporaryPortrait: 'अस्थायी चित्र',
        temporaryPortraitAlt: 'अस्थायी तटस्थ आकृति; यह संबंधित व्यक्ति का चित्र नहीं है',
        close: 'बंद करें',
        closeDialog: 'विवरण बंद करें',
      }
    : {
        eyebrow: 'OUR IDEALS',
        heading: 'Our Ideals',
        categories: 'CATEGORIES',
        pending: 'Verified profiles and approved portraits for this category will be added here.',
        temporaryPortrait: 'TEMPORARY IMAGE',
        temporaryPortraitAlt: 'Temporary neutral silhouette placeholder, not a depiction of this person',
        close: 'Close',
        closeDialog: 'Close details',
      };

  return (
    <main className="min-h-screen bg-[#F7F4EF] pb-14">
      <header className="border-y border-[#E8E2D8] bg-white px-4 py-10 sm:py-12">
        <div className="mx-auto flex max-w-[1440px] flex-col items-center text-center">
          <h1 className="font-editorial text-3xl font-bold tracking-tight text-[#151210] sm:text-4xl md:text-5xl">
            {copy.heading}
          </h1>
          <span aria-hidden="true" className="mt-5 h-1 w-14 rounded-full bg-[#F5660A]" />
        </div>
      </header>

      <div className="mx-auto grid w-full max-w-[1440px] grid-cols-1 gap-6 px-4 pt-8 sm:px-6 md:pt-10 lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-7 lg:px-8 xl:grid-cols-[340px_minmax(0,1fr)]">
        <aside aria-label={copy.categories} className="self-start overflow-hidden rounded-lg bg-white shadow-sm">
          <h2 className="bg-[#003B3E] px-4 py-3 text-lg font-semibold text-white">
            {copy.categories}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1">
            {idealsCategories.map((category) => {
              const active = category.id === selectedCategoryId;
              return (
                <button
                  key={category.id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setSelectedCategoryId(category.id)}
                  className={`min-h-14 border-b border-[#E5E5E5] px-4 py-3 text-left text-sm leading-relaxed transition-colors focus-visible:z-10 focus-visible:outline-2 focus-visible:outline-[#F5660A] sm:min-h-16 ${
                    active
                      ? 'bg-[#EFE7DC] text-[#003B3E]'
                      : 'bg-white text-[#373737] hover:bg-[#F7F4EF] hover:text-[#003B3E]'
                  }`}
                >
                  {isHindi ? category.title.hi : category.title.en}
                </button>
              );
            })}
          </div>
        </aside>

        <section aria-live="polite" aria-labelledby="selected-ideals-category" className="min-w-0">
          <div className="mb-5 flex flex-wrap items-end justify-between gap-3 border-b border-[#CFC8BE] pb-3 text-[#003B3E]">
            <h2 id="selected-ideals-category" className="font-editorial text-2xl font-bold sm:text-3xl">
              {copy.eyebrow}
            </h2>
            <p className="text-base font-semibold sm:text-lg">
              {isHindi ? selectedCategory.title.hi : selectedCategory.title.en}
            </p>
          </div>

          {selectedCategory.people.length > 0 ? (
            <div className="space-y-4">
              {selectedCategory.people.map((person) => (
                <article key={person.id}>
                  <button
                    type="button"
                    onClick={() => setActivePerson(person)}
                    aria-haspopup="dialog"
                    className="grid w-full grid-cols-1 items-center gap-5 rounded-xl bg-white p-5 text-left shadow-md transition-shadow hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F5660A] sm:grid-cols-[minmax(180px,28%)_1fr] sm:gap-7 sm:p-6"
                  >
                    <div className="relative mx-auto aspect-[4/3] w-full max-w-64 overflow-hidden bg-white sm:mx-0 sm:max-w-none">
                      <Image
                        src={person.portrait ?? '/images/ideals/portrait-placeholder.svg'}
                        alt={person.portrait
                          ? (isHindi ? person.portraitAlt.hi : person.portraitAlt.en)
                          : copy.temporaryPortraitAlt}
                        fill
                        sizes="(max-width: 640px) 100vw, 280px"
                        className={person.portrait ? 'object-contain' : 'object-cover'}
                      />
                      {!person.portrait && (
                        <span className="absolute inset-x-0 bottom-0 bg-[#003B3E]/80 px-2 py-1.5 text-center text-[10px] font-semibold tracking-wider text-white">
                          {copy.temporaryPortrait}
                        </span>
                      )}
                    </div>
                    <div className="flex flex-col justify-center">
                      {(person.quotation || person.description) && (
                        <p className="text-lg leading-relaxed text-[#6B625A] sm:text-xl">
                          <span aria-hidden="true" className="font-serif text-3xl font-bold text-[#A9A9A9]">“</span>
                          {person.quotation
                            ? (isHindi ? person.quotation.hi : person.quotation.en || person.quotation.hi)
                            : (isHindi ? person.description?.hi : person.description?.en)}
                          <span aria-hidden="true" className="font-serif text-3xl font-bold text-[#A9A9A9]">”</span>
                        </p>
                      )}
                      <div className="mt-4 text-right text-sm font-bold text-[#004D53] sm:text-base">
                        {isHindi ? person.name.hi : person.name.en}
                        {person.years ? ` (${isHindi && person.yearsHi ? person.yearsHi : person.years})` : ''}
                      </div>
                      {person.verificationNote && (
                        <p className="mt-2 text-right text-xs leading-relaxed text-[#7B7168]">
                          {isHindi ? person.verificationNote.hi : person.verificationNote.en}
                        </p>
                      )}
                    </div>
                  </button>
                </article>
              ))}
            </div>
          ) : (
            <p className="rounded-xl bg-white px-5 py-5 text-sm leading-relaxed text-[#5C6665] shadow-sm">
              {copy.pending}
            </p>
          )}
        </section>
      </div>

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
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xl font-bold text-[#777] transition-colors hover:bg-[#F2F2F2] hover:text-[#333] focus-visible:outline-2 focus-visible:outline-[#F5660A]"
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
                  <span className="absolute inset-x-0 bottom-0 bg-[#003B3E]/80 px-2 py-1.5 text-center text-[10px] font-semibold tracking-wider text-white">
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
