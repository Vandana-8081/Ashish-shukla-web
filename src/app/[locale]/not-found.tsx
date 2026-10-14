'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '@/lib/languageContext';

export default function LocalizedNotFound() {
  const { dict, getHref } = useLanguage();

  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-[#F8F4ED] px-4 py-20">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="font-editorial text-7xl sm:text-8xl font-bold text-[#F5660A]">
          {dict.notFound.code}
        </div>
        <div className="space-y-2">
          <h1 className="font-editorial text-2xl font-bold text-[#151210]">
            {dict.notFound.title}
          </h1>
          <p className="text-sm text-[#6B625A] leading-relaxed">
            {dict.notFound.description}
          </p>
        </div>
        <div className="pt-4">
          <Link
            href={getHref('/')}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#F5660A] text-white hover:bg-[#D45300] text-sm font-semibold transition-colors group"
          >
            <span>{dict.notFound.button}</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  );
}
