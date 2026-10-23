'use client';

import { useLanguage } from '@/lib/languageContext';
import { aboutPage } from '@/data/story';
import { StoryIcon } from './StoryIcon';
import { Banner, PageHero, SectionHead } from './Blocks';
import { Item, Reveal, Stagger, TiltImage } from './motion';

export function AboutPage() {
  const { t, dict } = useLanguage();
  return (
    <div>
      <PageHero eyebrow={aboutPage.eyebrow} title={aboutPage.title} text={aboutPage.who} image="/images/journey/ashish1.jpg" position="object-top" />
      <section className="section-pad">
        <div className="container-site">
          <Stagger className="grid gap-5 sm:grid-cols-2">
            {aboutPage.blocks.map((b) => (
              <Item key={b.id}>
                <div id={b.id} className="ed-card group h-full p-8 md:p-10">
                  <div className="flex items-center">
                    <span className="grid h-14 w-14 place-items-center rounded-2xl bg-[var(--navy)] text-white transition group-hover:rotate-6 group-hover:bg-[var(--saffron)]">
                      <StoryIcon name={b.icon} className="h-7 w-7" />
                    </span>
                  </div>
                  <h2 className="mt-6 font-editorial text-[28px] font-bold leading-tight text-[var(--navy)]">{t(b.title)}</h2>
                  <p className="mt-3 leading-8 text-[#4a443d]">{t(b.text)}</p>
                </div>
              </Item>
            ))}
          </Stagger>
        </div>
      </section>

      <Banner />

      <section className="section-pad bg-[var(--paper-2)]">
        <div className="container-site grid gap-10 lg:grid-cols-[.9fr_1.1fr] lg:items-center lg:gap-16">
          <Reveal>
            <TiltImage src="/images/hero/ashish3.png" alt={dict.brand.name} className="min-h-[420px] md:min-h-[520px] object-[center_20%]" />
          </Reveal>
          <Reveal delay={0.1}>
            <SectionHead title={aboutPage.place.title} accent={{ en: 'Bhagwant Nagar', hi: 'भगवंत नगर' }} text={aboutPage.place.text} />
          </Reveal>
        </div>
      </section>

      <section id="biography" className="section-pad scroll-mt-24">
        <div className="container-site max-w-[900px]">
          <Reveal>
            <div className="ed-eyebrow">{t(aboutPage.bioTitle)}</div>
            <h2 className="ed-h2 mt-3">{dict.brand.name}</h2>
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
