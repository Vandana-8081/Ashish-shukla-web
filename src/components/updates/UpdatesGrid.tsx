'use client';

import React from 'react';
import type { Update } from '@/types';
import { UpdateCard } from './UpdateCard';

interface UpdatesGridProps {
  updates: Update[];
  compact?: boolean;
  className?: string;
}

export function UpdatesGrid({ updates, compact = false, className = '' }: UpdatesGridProps) {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 ${compact ? 'gap-x-8 gap-y-8' : 'gap-x-10 gap-y-12'} ${className}`}>
      {updates.map((update) => (
        <UpdateCard key={update.slug} update={update} compact={compact} />
      ))}
    </div>
  );
}
