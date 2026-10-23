'use client';

import { useLanguage } from '@/lib/languageContext';
import { aboutPage } from '@/data/story';
import { PageHero, SectionHead } from './Blocks';
import { Reveal, TiltImage } from './motion';

export function AboutPage() {
  const { t, dict } = useLanguage();
  const placeParagraphs = t(aboutPage.place.text).split(/\n\s*\n/);
  return (
    <div>
      <PageHero eyebrow={aboutPage.eyebrow} title={aboutPage.title} text={aboutPage.who} image="/images/journey/ashish1.jpg" position="object-top" />
      <section className="section-pad bg-[var(--paper-2)]">
        <div className="container-site grid gap-10 lg:grid-cols-[.9fr_1.1fr] lg:items-center lg:gap-16">
          <Reveal>
            <TiltImage src="/images/hero/ashish3.png" alt={dict.brand.name} className="min-h-[420px] md:min-h-[520px] object-[center_20%]" />
          </Reveal>
          <Reveal delay={0.1}>
            <SectionHead title={aboutPage.place.title} accent={{ en: 'Bhagwant Nagar', hi: 'भगवंत नगर' }} />
            <div className="ed-body mt-5 space-y-5">
              {placeParagraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
            </div>
          </Reveal>
        </div>
      </section>

      <section id="biography" className="section-pad scroll-mt-24">
        <div className="container-site max-w-[900px]">
          <Reveal>
            <div className="ed-eyebrow">{t(aboutPage.bioTitle)}</div>
            <h2 className="ed-h2 mt-3">{dict.brand.name}</h2>
            <p className="mt-2 font-editorial text-2xl font-bold text-saffron">{t({ en: '(Rinku)', hi: '(रिंकू)' })}</p>
            <div className="ed-body mt-8 space-y-5">
              {aboutPage.bio.map((p, i) => <p key={i}>{t(p)}</p>)}
            </div>
            {/* <p className="mt-9 rounded-2xl border border-[var(--line)] bg-[#fffdf8] p-5 text-sm italic leading-7 text-[var(--muted)]">{t(aboutPage.disclaimer)}</p> */}
          </Reveal>
        </div>
      </section>
    </div>
  );
}
