'use client';

import React from 'react';
import { useLanguage } from '@/lib/languageContext';
import { updatesData } from '@/data/updates';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Button } from '@/components/ui/Button';
import { UpdatesGrid } from '@/components/updates/UpdatesGrid';

export function UpdatesPreview() {
  const { dict, getHref } = useLanguage();

  return (
    <section className="py-20 md:py-28 bg-white border-b border-[#E8E2D8]">
      <Container size="wide">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 gap-6">
          <SectionHeading
            eyebrow={dict.updatesSection.eyebrow}
            title={dict.updatesSection.heading}
            description={dict.updatesSection.description}
            className="mb-0 max-w-2xl"
          />
          <Button href={getHref('/updates')} variant="outline" icon="arrow" className="self-start md:self-auto shrink-0">
            {dict.common.viewAllUpdates}
          </Button>
        </div>

        {/* Display first 2 updates in home preview */}
        <UpdatesGrid updates={updatesData.slice(0, 2)} compact />
      </Container>
    </section>
  );
}
