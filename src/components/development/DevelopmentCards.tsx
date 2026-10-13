'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { useLanguage } from '@/lib/languageContext';
import { developmentPriorities } from '@/data/development';
import { Container } from '@/components/ui/Container';
import { CheckCircle2 } from 'lucide-react';

function DevelopmentPriorityImage({
  src,
  alt,
}: {
  src: string;
  alt: string;
}) {
  const [aspectRatio, setAspectRatio] = useState(4 / 3);

  return (
    <div
      className="relative overflow-hidden rounded-2xl border border-[#E8E2D8] bg-[#F8F4ED]"
      style={{ aspectRatio }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 1024px) 100vw, 40vw"
        className="object-contain"
        onLoad={(event) => {
          const { naturalWidth, naturalHeight } = event.currentTarget;
          if (naturalWidth && naturalHeight) {
            setAspectRatio(naturalWidth / naturalHeight);
          }
        }}
      />
    </div>
  );
}

export function DevelopmentCards() {
  const { t } = useLanguage();
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="py-12 md:py-20">
      <Container size="wide">
        <div className="space-y-16">
          {developmentPriorities.map((item, index) => {
            const isReversed = index % 2 === 1;

            return (
              <motion.div
                key={item.id}
                id={item.slug}
                className="bg-white rounded-3xl border border-[#E8E2D8] overflow-hidden shadow-2xs p-6 sm:p-10"
                initial={shouldReduceMotion ? false : { opacity: 0, y: 28 }}
                whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.55, delay: shouldReduceMotion ? 0 : index * 0.08, ease: 'easeOut' }}
              >
                <div
                  className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center ${
                    isReversed ? 'lg:grid-flow-dense' : ''
                  }`}
                >
                  {/* Image Column */}
                  <div className={`lg:col-span-5 ${isReversed ? 'lg:col-start-8' : ''}`}>
                    <DevelopmentPriorityImage
                      src={item.image}
                      alt={t(item.title)}
                    />
                  </div>

                  {/* Text Column */}
                  <div className={`lg:col-span-7 space-y-4 ${isReversed ? 'lg:col-start-1' : ''}`}>
                    <div className="inline-flex items-center text-xs font-bold tracking-[0.2em] uppercase text-[#F5660A]">
                      <span>{t(item.tag)}</span>
                    </div>

                    <h3 className="font-editorial text-xl sm:text-2xl font-bold text-[#151210] leading-snug">
                      {t(item.title)}
                    </h3>

                    <p className="text-base text-[#6B625A] leading-relaxed">
                      {t(item.description)}
                    </p>

                    <div className="pt-3 border-t border-[#E8E2D8] space-y-2.5">
                      <div className="text-xs font-bold uppercase tracking-wider text-[#151210]">
                        Key Action Points:
                      </div>
                      {item.keyInitiatives.map((init, i) => (
                        <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#171717]">
                          <CheckCircle2 className="w-4 h-4 text-[#F5660A] shrink-0 mt-0.5" />
                          <span>{t(init)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </div>
  );
}
