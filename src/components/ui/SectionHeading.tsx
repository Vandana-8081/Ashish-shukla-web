import React from 'react';
import { cn } from '@/lib/utils';

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  className?: string;
  light?: boolean;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  className,
  light = false,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        'max-w-3xl mb-10 md:mb-14',
        align === 'center' ? 'mx-auto text-center' : 'text-left',
        className
      )}
    >
      {eyebrow && (
        <div
          className={cn(
            'text-xs font-semibold tracking-[0.2em] uppercase mb-3',
            align === 'center' ? 'text-center' : 'text-left',
            light ? 'text-[#FF7D2B]' : 'text-[#F5660A]'
          )}
        >
          <span>{eyebrow}</span>
        </div>
      )}
      <h2
        className={cn(
          'font-editorial text-3xl sm:text-4xl md:text-5xl font-semibold leading-[1.15] tracking-tight',
          light ? 'text-white' : 'text-[#151210]'
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            'mt-4 text-base sm:text-lg leading-relaxed',
            light ? 'text-[#D4CCC0]' : 'text-[#6B625A]'
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
