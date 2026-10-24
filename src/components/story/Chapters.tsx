'use client';

import { useLanguage } from '@/lib/languageContext';
import { chapters, type Chapter } from '@/data/story';
import { Reveal, TiltImage } from './motion';

/** Story chapters as alternating image / text rows. */
export function Chapters({ items = chapters, id }: { items?: Chapter[]; id?: string }) {
  const { t } = useLanguage();
  return (
    <div id={id} className="scroll-mt-24">
      {items.map((c, i) => {
        const flip = i % 2 === 1;
        const tinted = i % 2 === 0;
        return (
          <section key={c.id} id={c.id} className={`section-pad scroll-mt-24 ${tinted ? 'bg-[var(--paper)]' : 'bg-[var(--paper-2)]'}`}>
            <div className={`container-site grid gap-10 lg:items-center lg:gap-16 ${c.image ? 'lg:grid-cols-2' : 'mx-auto max-w-[900px]'}`}>
              <Reveal className={flip ? 'lg:order-2' : ''}>
                <div className="flex items-center">
                  {t(c.kicker).trim() && <span className="ed-eyebrow">{t(c.kicker)}</span>}
                </div>
                <h2 className="ed-h2 mt-4">{t(c.title)}</h2>
                <div className="ed-body mt-5 space-y-4">
                  {c.body.map((p, k) => <p key={k}>{t(p)}</p>)}
                </div>
                {c.quote && (
                  <blockquote className="mt-7 border-l-4 border-[var(--saffron)] pl-5 font-editorial text-xl italic leading-relaxed text-[var(--navy)] md:text-2xl">
                    {t(c.quote)}
                  </blockquote>
                )}
              </Reveal>
              {c.image && (
                <Reveal delay={0.1} className={flip ? 'lg:order-1' : ''}>
                  <TiltImage src={c.image} alt={t(c.title)} sizes="(max-width:1024px) 100vw, 46vw" position="object-center" className="min-h-[360px] md:min-h-[460px]" />
                </Reveal>
              )}
            </div>
          </section>
        );
      })}
    </div>
  );
}
