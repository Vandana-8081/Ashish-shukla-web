'use client';

import React from 'react';
import { useLanguage } from '@/lib/languageContext';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Button } from '@/components/ui/Button';
import { PhotoGallery } from '@/components/media/PhotoGallery';

export function MediaPreview() {
  const { dict, getHref } = useLanguage();

  return (
    <section className="py-20 md:py-28 bg-[#F8F4ED] border-b border-[#E8E2D8]">
      <Container size="wide">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 gap-6">
          <SectionHeading
            eyebrow={dict.mediaSection.eyebrow}
            title={dict.mediaSection.heading}
            description={dict.mediaSection.description}
            className="mb-0 max-w-2xl"
          />
          <Button href={getHref('/media')} variant="outline" icon="arrow" className="self-start md:self-auto shrink-0">
            {dict.mediaSection.viewAllButton}
          </Button>
        </div>

        <PhotoGallery />
      </Container>
    </section>
  );
}
