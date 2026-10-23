'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Download, ImagePlus, Share2, X } from 'lucide-react';
import { useLanguage } from '@/lib/languageContext';
import { anniversaries, ecardOccasions, ecardStrings as s, tributePalettes } from '@/data/ecard';
import { idealsCategories } from '@/data/ideals';
import { SITE_URL } from '@/lib/site';
import { CARD_H, CARD_W, drawCard, type CardSpec } from '@/components/ecard/drawCard';

const LEADER_PHOTO = '/images/hero/hero7.png';
const ANNIVERSARY_PREFIX = 'a:';
const DAY_MS = 86_400_000;

const fieldClass = 'mt-2 w-full rounded-lg border border-[#E8E2D8] bg-white px-3 py-2.5 text-[#151210] focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#F5660A]';
const chipBase = 'inline-flex min-h-11 items-center gap-2.5 rounded-full border px-4 text-left text-sm font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F5660A]';

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

function daysUntil(month: number, day: number, from: Date): number {
  const today = new Date(from.getFullYear(), from.getMonth(), from.getDate());
  let next = new Date(today.getFullYear(), month - 1, day);
  if (next < today) next = new Date(today.getFullYear() + 1, month - 1, day);
  return Math.round((next.getTime() - today.getTime()) / DAY_MS);
}

export function EcardMaker() {
  const { locale } = useLanguage();
  const lang = locale === 'hi' ? 'hi' : 'en';
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const [selection, setSelection] = useState(ecardOccasions[0].id);
  const [name, setName] = useState('');
  const [designation, setDesignation] = useState('');
  const [leader, setLeader] = useState<HTMLImageElement | null>(null);
  const [guest, setGuest] = useState<HTMLImageElement | null>(null);
  const [portrait, setPortrait] = useState<HTMLImageElement | null>(null);
  const [message, setMessage] = useState('');
  const [fontsReady, setFontsReady] = useState(false);
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    let active = true;
    setNow(new Date());
    const fromHash = decodeURIComponent(window.location.hash.slice(1));
    if (ecardOccasions.some((item) => item.id === fromHash) || fromHash.startsWith(ANNIVERSARY_PREFIX)) setSelection(fromHash);
    loadImage(LEADER_PHOTO).then((img) => active && setLeader(img)).catch(() => undefined);
    if (document.fonts) {
      document.fonts.ready.then(() => active && setFontsReady(true)).catch(() => active && setFontsReady(true));
    } else {
      setFontsReady(true);
    }
    return () => {
      active = false;
    };
  }, []);

  const upcoming = useMemo(() => {
    if (!now) return [];
    return anniversaries
      .map((item) => ({ item, days: daysUntil(item.month, item.day, now) }))
      .sort((a, b) => a.days - b.days)
      .slice(0, 4);
  }, [now]);

  const spec: CardSpec = useMemo(() => {
    if (selection.startsWith(ANNIVERSARY_PREFIX)) {
      const item = anniversaries.find((entry) => entry.id === selection.slice(ANNIVERSARY_PREFIX.length));
      if (item) {
        return {
          title: item.name[lang],
          pill: s.tributePill[lang],
          main: (item.kind === 'birth' ? s.tributeBirthMain : s.tributeDeathMain)[lang],
          sub: s.tributeSub[lang],
          colors: tributePalettes[[...item.personId].reduce((sum, ch) => sum + ch.charCodeAt(0), 0) % tributePalettes.length],
          accent: '#FFC24D',
          motif: 'portrait',
        };
      }
    }
    const occasion = ecardOccasions.find((entry) => entry.id === selection) ?? ecardOccasions[0];
    return {
      title: occasion.title[lang],
      pill: s.pill[lang],
      main: occasion.main[lang],
      sub: occasion.sub[lang],
      colors: occasion.colors,
      accent: occasion.accent,
      motif: occasion.motif,
    };
  }, [selection, lang]);

  // Portrait of the remembered personality, taken from the Our Ideals data.
  useEffect(() => {
    setPortrait(null);
    if (!selection.startsWith(ANNIVERSARY_PREFIX)) return;
    const item = anniversaries.find((entry) => entry.id === selection.slice(ANNIVERSARY_PREFIX.length));
    const src = idealsCategories.flatMap((category) => category.people).find((person) => person.id === item?.personId)?.portrait;
    if (!src) return;
    let active = true;
    loadImage(src).then((img) => active && setPortrait(img)).catch(() => undefined);
    return () => {
      active = false;
    };
  }, [selection]);

  useEffect(() => {
    if (!canvasRef.current) return;
    const trimmed = name.trim();
    drawCard(canvasRef.current, {
      spec,
      locale: lang,
      leaderName: s.cardName[lang],
      leaderLine: s.cardLine[lang],
      footer: s.cardUrl[lang],
      senderName: trimmed,
      senderLine: designation.trim(),
      withRegards: s.withRegards[lang],
      leader,
      guest,
      portrait,
    });
  }, [spec, lang, name, designation, leader, guest, portrait, fontsReady]);

  const onPhoto = useCallback((file: File | undefined) => {
    if (!file || !file.type.startsWith('image/')) return;
    const url = URL.createObjectURL(file);
    loadImage(url).then(setGuest).catch(() => undefined).finally(() => URL.revokeObjectURL(url));
  }, []);

  const toBlob = () =>
    new Promise<Blob | null>((resolve) => (canvasRef.current ? canvasRef.current.toBlob(resolve, 'image/png') : resolve(null)));

  const ready = () => {
    if (name.trim()) return true;
    setMessage(s.nameRequired[lang]);
    return false;
  };

  const fileName = () => `ashish-shukla-${selection.replace(':', '-')}-ecard.png`;

  const download = async () => {
    if (!ready()) return;
    const blob = await toBlob();
    if (!blob) return;
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName();
    link.click();
    window.setTimeout(() => URL.revokeObjectURL(url), 2000);
    setMessage('');
  };

  const shareWhatsApp = async () => {
    if (!ready()) return;
    const blob = await toBlob();
    if (!blob) return;
    const text = `${s.shareText[lang]} ${name.trim()}\n${SITE_URL}`;
    const file = new File([blob], fileName(), { type: 'image/png' });
    if (navigator.canShare?.({ files: [file] })) {
      try {
        await navigator.share({ files: [file], text });
        setMessage('');
        return;
      } catch (error) {
        if (error instanceof DOMException && error.name === 'AbortError') return;
      }
    }
    await download();
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer');
    setMessage(s.whatsappFallback[lang]);
  };

  const chip = (selected: boolean) =>
    `${chipBase} ${selected ? 'border-[#F5660A] bg-[#FFE9D6] text-[#C94E00]' : 'border-[#E8E2D8] bg-white text-[#151210] hover:border-[#F5660A]/60'}`;

  return (
    <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,460px)] lg:gap-12">
      <form className="space-y-7 rounded-2xl border border-[#E8E2D8] bg-white p-5 sm:p-7" onSubmit={(event) => event.preventDefault()} noValidate>
        <fieldset>
          <legend className="text-base font-bold text-[#151210]">{s.occasionHeading[lang]}</legend>
          <p className="mt-3 text-sm font-semibold text-[#151210]/70">{s.occasion[lang]}</p>
          <div className="mt-3 flex flex-wrap gap-2.5" role="radiogroup" aria-label={s.occasion[lang]}>
            {ecardOccasions.map((item) => (
              <button
                key={item.id}
                type="button"
                role="radio"
                aria-checked={selection === item.id}
                onClick={() => setSelection(item.id)}
                className={chip(selection === item.id)}
              >
                <span aria-hidden="true" className="h-3.5 w-3.5 shrink-0 rounded-full" style={{ background: `linear-gradient(135deg, ${item.accent}, ${item.colors[0]})` }} />
                {item.label[lang]}
              </button>
            ))}
          </div>

          {upcoming.length > 0 && (
            <>
              <p className="mt-6 text-sm font-semibold text-[#151210]/70">{s.anniversaries[lang]}</p>
              <div className="mt-3 flex flex-wrap gap-2.5" role="radiogroup" aria-label={s.anniversaries[lang]}>
                {upcoming.map(({ item, days }) => {
                  const id = `${ANNIVERSARY_PREFIX}${item.id}`;
                  return (
                    <button key={id} type="button" role="radio" aria-checked={selection === id} onClick={() => setSelection(id)} className={chip(selection === id)}>
                      <span aria-hidden="true" className="h-3.5 w-3.5 shrink-0 rounded-full" style={{ background: 'linear-gradient(135deg, #FFC24D, #5B1A00)' }} />
                      <span>
                        {item.name[lang]}: {(item.kind === 'birth' ? s.birthAnniversary : s.deathAnniversary)[lang]}
                      </span>
                      <span className="text-xs font-bold text-[#C94E00]">
                        {days === 0 ? s.today[lang] : s.inDays[lang].replace('{n}', String(days))}
                      </span>
                    </button>
                  );
                })}
              </div>
            </>
          )}
        </fieldset>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="ecard-name" className="text-sm font-semibold text-[#151210]">{s.name[lang]} <span className="text-[#C94E00]">*</span></label>
            <input id="ecard-name" className={fieldClass} value={name} maxLength={40} required placeholder={s.namePlaceholder[lang]} onChange={(event) => setName(event.target.value)} autoComplete="name" />
          </div>
          <div>
            <label htmlFor="ecard-designation" className="text-sm font-semibold text-[#151210]">{s.designation[lang]}</label>
            <input id="ecard-designation" className={fieldClass} value={designation} maxLength={50} placeholder={s.designationPlaceholder[lang]} onChange={(event) => setDesignation(event.target.value)} />
          </div>
        </div>

        <div>
          <span className="text-sm font-semibold text-[#151210]">{s.photo[lang]}</span>
          <div className="mt-2 flex flex-wrap items-center gap-3">
            <input ref={fileRef} type="file" accept="image/*" className="sr-only" aria-label={s.choosePhoto[lang]} onChange={(event) => { onPhoto(event.target.files?.[0]); event.target.value = ''; }} />
            <button type="button" onClick={() => fileRef.current?.click()} className="inline-flex min-h-10 items-center gap-2 rounded-lg border border-[#E8E2D8] bg-white px-3 text-sm font-semibold text-[#151210] hover:border-[#F5660A] hover:text-[#F5660A] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F5660A]">
              <ImagePlus className="h-4 w-4" aria-hidden="true" />{guest ? s.changePhoto[lang] : s.choosePhoto[lang]}
            </button>
            {guest && (
              <button type="button" onClick={() => setGuest(null)} className="inline-flex min-h-10 items-center gap-1 rounded-lg px-2 text-sm font-semibold text-[#5A4E44] hover:text-[#C94E00]">
                <X className="h-4 w-4" aria-hidden="true" />{s.removePhoto[lang]}
              </button>
            )}
          </div>
          <p className="mt-2 text-xs text-[#151210]/60">{s.photoNote[lang]}</p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <button type="button" onClick={shareWhatsApp} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-[#F5660A] px-5 text-sm font-semibold text-white hover:bg-[#D45300] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F5660A]">
            <Share2 className="h-4 w-4" aria-hidden="true" />{s.whatsapp[lang]}
          </button>
          <button type="button" onClick={download} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-[#F5660A] bg-white px-5 text-sm font-semibold text-[#C94E00] hover:bg-[#FFF1E6] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F5660A]">
            <Download className="h-4 w-4" aria-hidden="true" />{s.download[lang]}
          </button>
        </div>
        <p role="status" aria-live="polite" className="min-h-5 text-sm font-medium text-[#C94E00]">{message}</p>
      </form>

      <div className="mx-auto w-full max-w-[460px] lg:sticky lg:top-28">
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-[#C94E00]">{s.preview[lang]}</p>
        <div className="overflow-hidden rounded-2xl border border-[#E8E2D8] bg-white shadow-lg" style={{ aspectRatio: `${CARD_W} / ${CARD_H}` }}>
          <canvas ref={canvasRef} width={CARD_W} height={CARD_H} role="img" aria-label={`${s.preview[lang]}: ${spec.title}`} className="block h-full w-full" />
        </div>
      </div>
    </div>
  );
}
