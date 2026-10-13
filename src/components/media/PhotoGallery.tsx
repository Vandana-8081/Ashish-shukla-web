'use client';

import React from 'react';
import Image from 'next/image';
import { useLanguage } from '@/lib/languageContext';
import { photoGalleryData } from '@/data/media';

export function PhotoGallery() {
  const { t } = useLanguage();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {photoGalleryData.map((item) => (
        <div
          key={item.id}
          className="group bg-white rounded-2xl border border-[#E8E2D8] overflow-hidden shadow-2xs hover:border-[#F5660A] transition duration-300"
        >
          <div className="relative aspect-[4/3] w-full bg-[#F8F4ED]">
            <Image
              src={item.image}
              alt={t(item.caption)}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div className="p-4">
            <p className="text-xs font-bold text-saffron leading-relaxed line-clamp-2">
              {t(item.caption)}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
