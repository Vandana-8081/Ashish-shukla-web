'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '@/lib/languageContext';
import type { Update } from '@/types';
import { ArrowRight, Calendar, MapPin } from 'lucide-react';

interface UpdateCardProps {
  update: Update;
  compact?: boolean;
}

export function UpdateCard({ update, compact = false }: UpdateCardProps) {
  const { locale, dict, t, getHref } = useLanguage();

  const title = locale === 'hi' ? update.titleHi : update.titleEn;
  const description = locale === 'hi' ? update.descriptionHi : update.descriptionEn;
  const category = locale === 'hi' ? update.categoryHi : update.categoryEn;
  const date = locale === 'hi' ? update.dateHi : update.dateEn;
  const detailUrl = getHref(`/updates/${update.slug}`);

  return (
    <article className="group flex flex-col justify-between pb-8 border-b border-[#E8E2D8]">
      <div>
        {/* Actual Image with Editorial Aspect */}
        <Link
          href={detailUrl}
          className={`relative ${compact ? 'aspect-[4/3] md:aspect-[2/1] mb-5' : 'aspect-[4/3] mb-5'} block w-full rounded-xl overflow-hidden bg-[#E8E2D8] focus-visible:outline-2 focus-visible:outline-[#F5660A]`}
        >
          <Image
            src={update.image}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          />
          <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs text-[#151210] font-semibold text-xs px-2.5 py-1 rounded-md border border-[#E8E2D8]">
            {category}
          </div>
        </Link>

        {/* Metadata Line */}
        <div className="flex items-center gap-3 text-xs text-[#6B625A] mb-2.5">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-[#F5660A]" />
            <span>{date}</span>
          </div>

          {update.location && (
            <>
              <span aria-hidden="true">·</span>
              <div className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-[#6B625A]" />
                <span className="line-clamp-1">{t(update.location)}</span>
              </div>
            </>
          )}
        </div>

        {/* Large Editorial Title */}
        <h3 className="font-editorial text-2xl sm:text-3xl font-bold text-[#151210] leading-snug group-hover:text-[#F5660A] transition-colors">
          <Link href={detailUrl}>{title}</Link>
        </h3>

        {/* Short Description */}
        <p className="mt-3 text-sm sm:text-base text-[#6B625A] leading-relaxed line-clamp-3">
          {description}
        </p>
      </div>

      {/* Read More Link with moving arrow */}
      <div className="mt-5">
        <Link
          href={detailUrl}
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#F5660A] hover:text-[#D45300] transition-colors group/link"
        >
          <span>{dict.updatesSection.readMore}</span>
          <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
        </Link>
      </div>
    </article>
  );
}
