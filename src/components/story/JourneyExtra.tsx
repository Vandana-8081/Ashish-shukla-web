'use client';

import { useLanguage } from '@/lib/languageContext';
import { journeyPage } from '@/data/story';
import { PageHero } from './Blocks';
import { Item, Stagger } from './motion';

export function JourneyIntro() {
  return <PageHero eyebrow={journeyPage.eyebrow} title={journeyPage.title} text={journeyPage.intro} image="/images/journey/ashish2.jpg" position="object-[center_65%]" />;
}

export function JourneyExtra() {
  const { t } = useLanguage();
  return (
    <section className="section-pad">
      <div className="container-site">
        <Stagger className="grid gap-5 md:grid-cols-3">
          {journeyPage.extra.map((e) => (
            <Item key={t(e.title)}>
              <div className="ed-card h-full p-8">
                <div className="ed-eyebrow">{t(e.kicker)}</div>
                <h2 className="mt-3 font-editorial text-2xl font-bold leading-tight text-[var(--navy)]">{t(e.title)}</h2>
                <p className="mt-3 leading-8 text-[#4a443d]">{t(e.text)}</p>
              </div>
            </Item>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
