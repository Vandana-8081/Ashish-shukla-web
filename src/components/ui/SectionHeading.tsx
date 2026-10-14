import React from 'react';
import { cn } from '@/lib/utils';

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  className?: string;
  light?: boolean;
  as?: 'h1' | 'h2';
  compact?: boolean;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  className,
  light = false,
  as: Heading = 'h2',
  compact = false,
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
      <Heading
        className={cn(
          'font-editorial font-semibold leading-[1.15] tracking-tight',
          compact ? 'text-xl sm:text-2xl' : 'text-2xl sm:text-3xl md:text-4xl',
          light ? 'text-white' : 'text-[#151210]'
        )}
      >
        {title}
      </Heading>
      <div
        aria-hidden="true"
        className={cn('mt-4 h-1 w-14 rounded-full', light ? 'bg-white' : 'bg-[#F5660A]', align === 'center' && 'mx-auto')}
      />
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
