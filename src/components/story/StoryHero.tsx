'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';
import { useLanguage } from '@/lib/languageContext';
import { storyHero } from '@/data/story';
import { Container } from '@/components/ui/Container';

const ease = [0.2, 0.7, 0.2, 1] as const;

export function StoryHero() {
  const { t, getHref, dict } = useLanguage();
  return (
    <section className="relative overflow-hidden bg-[#F8F4ED]">
      <div aria-hidden className="absolute -top-40 -right-40 w-[34rem] h-[34rem] rounded-full bg-[#F5660A]/15 blur-3xl" />
      <Container size="wide" className="relative">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center pt-10 pb-16 lg:py-20">
          <div className="lg:col-span-7 order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease }}
              className="eyebrow-label inline-flex items-center gap-2 rounded-full border border-[#F5660A]/30 bg-white px-4 py-1.5 text-xs font-semibold tracking-wide text-[#D45300]"
            >
              <MapPin className="w-3.5 h-3.5" /> {t(storyHero.eyebrow)}
            </motion.div>
            <h1 className="mt-5 font-editorial text-[clamp(2rem,8vw,3rem)] font-bold leading-[1.1] text-[#151210] sm:text-5xl xl:text-[58px]">
              {storyHero.lines.map((line, i) => (
                <motion.span
                  key={i}
                  className={`block ${i === 1 ? 'text-[#F5660A]' : ''}`}
                  initial={{ opacity: 0, y: 28 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, ease, delay: 0.15 + i * 0.15 }}
                >
                  {t(line)}
                </motion.span>
              ))}
            </h1>
            <motion.p
              className="mt-6 max-w-2xl text-base sm:text-lg leading-relaxed text-[#6B625A]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.7 }}
            >
              {t(storyHero.description)}
            </motion.p>
            <motion.p
              className="mt-3 text-sm font-semibold text-[#151210]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.85 }}
            >
              {t(storyHero.roles)}
            </motion.p>
            <motion.div
              className="mt-8 flex flex-wrap gap-3"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
            >
              {storyHero.buttons.map((b) => (
                <Link
                  key={b.path}
                  href={getHref(b.path)}
                  className={
                    b.primary
                      ? 'rounded-full bg-[#F5660A] px-6 py-3 text-sm font-semibold text-white hover:bg-[#D45300]'
                      : 'rounded-full border border-[#151210]/15 bg-white px-6 py-3 text-sm font-semibold text-[#151210] hover:border-[#F5660A] hover:text-[#F5660A]'
                  }
                >
                  {t(b.label)}
                </Link>
              ))}
            </motion.div>
          </div>

          <motion.div
            className="lg:col-span-5 order-1 lg:order-2 relative mx-auto w-full max-w-md"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease }}
          >
            <div className="absolute inset-x-6 bottom-0 top-16 rounded-[2.5rem] bg-gradient-to-b from-[#F5660A] to-[#D45300]" />
            <div className="relative aspect-[4/5]">
              <Image
                src={storyHero.image}
                alt={dict.brand.name}
                fill
                priority
                sizes="(max-width:1024px) 90vw, 36vw"
                className="object-cover object-[center_20%]  drop-shadow-2xl"
              />
            </div>
            <motion.div
              className="absolute -bottom-3 left-2 right-2 rounded-2xl bg-white/95 px-5 py-3 shadow-lg backdrop-blur"
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <div className="font-editorial text-lg font-bold text-[#151210]">{dict.brand.name}</div>
              <div className="text-xs text-[#6B625A]">{t(storyHero.tagline)}</div>
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
