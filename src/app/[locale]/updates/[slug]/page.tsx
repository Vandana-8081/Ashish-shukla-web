import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { updatesData } from '@/data/updates';
import { Container } from '@/components/ui/Container';
import { ArrowLeft, Calendar, MapPin } from 'lucide-react';
import type { Locale } from '@/types';
import { getDictionary } from '@/data/translations';

interface UpdatePageProps {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];
  for (const locale of ['en', 'hi']) {
    for (const update of updatesData) {
      params.push({ locale, slug: update.slug });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: UpdatePageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const isHi = locale === 'hi';
  const item = updatesData.find((u) => u.slug === slug);
  if (!item) {
    return { title: isHi ? 'अपडेट नहीं मिला' : 'Update Not Found' };
  }
  const title = isHi ? item.titleHi : item.titleEn;
  const description = isHi ? item.descriptionHi : item.descriptionEn;

  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}/updates/${slug}`,
      languages: {
        en: `/en/updates/${slug}`,
        hi: `/hi/updates/${slug}`,
      },
    },
    openGraph: {
      title,
      description,
      images: [{ url: item.image }],
    },
  };
}

export default async function LocalizedUpdateDetailPage({
  params,
}: UpdatePageProps) {
  const { locale, slug } = await params;
  if (locale !== 'en' && locale !== 'hi') {
    notFound();
  }

  const validLocale = locale as Locale;
  const dict = getDictionary(validLocale);
  const isHi = validLocale === 'hi';

  const item = updatesData.find((u) => u.slug === slug);
  if (!item) {
    notFound();
  }

  const title = isHi ? item.titleHi : item.titleEn;
  const description = isHi ? item.descriptionHi : item.descriptionEn;
  const category = isHi ? item.categoryHi : item.categoryEn;
  const date = isHi ? item.dateHi : item.dateEn;
  const location = item.location ? (isHi ? item.location.hi : item.location.en) : null;
  const contentParagraphs = isHi ? item.contentHi : item.contentEn;

  return (
    <article className="py-12 md:py-20 bg-white">
      <Container size="narrow">
        {/* Back Link */}
        <div className="mb-8">
          <Link
            href={`/${validLocale}/updates`}
            className="inline-flex items-center gap-2 text-sm font-medium text-[#6B625A] hover:text-[#F5660A] transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>{dict.common.backToUpdates}</span>
          </Link>
        </div>

        {/* Metadata Header */}
        <div className="space-y-4 mb-8">
          <div className="inline-block px-3 py-1 bg-[#FAF7F2] text-[#F5660A] font-bold text-xs uppercase tracking-wider rounded-md border border-[#E8E2D8]">
            {category}
          </div>

          <h1 className="font-editorial text-2xl sm:text-3xl md:text-4xl font-bold text-[#151210] leading-tight">
            {title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 pt-3 text-xs sm:text-sm text-[#6B625A] border-t border-b border-[#E8E2D8] py-3">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-[#F5660A]" />
              <span>{date}</span>
            </div>

            {location && (
              <>
                <span aria-hidden="true">·</span>
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4 text-[#F5660A]" />
                  <span>{location}</span>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Hero Featured Photograph */}
        <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full rounded-2xl overflow-hidden bg-[#FAF7F2] mb-10 border border-[#E8E2D8] shadow-sm">
          <Image
            src={item.image}
            alt={title}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 800px"
            className="object-cover"
          />
        </div>

        {/* Content Section Strictly in Current Locale (No-Mixing Rule) */}
        <div className="space-y-8 text-base sm:text-lg text-[#171717] leading-relaxed">
          <div className="p-6 bg-[#FAF7F2] rounded-2xl border-l-4 border-[#F5660A] italic font-editorial text-lg text-[#151210]">
            <p>{description}</p>
          </div>

          <div className="space-y-4 pt-4">
            <h3 className="font-editorial text-xl font-bold text-[#151210]">
              {dict.updatesSection.fieldReportTitle}
            </h3>
            {contentParagraphs?.map((paragraph, index) => (
              <p key={index} className="text-[#332F2B] leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        {/* Additional Images if available */}
        {item.galleryImages && item.galleryImages.length > 0 && (
          <div className="mt-12 pt-8 border-t border-[#E8E2D8] space-y-4">
            <h3 className="font-editorial text-xl font-bold text-[#151210]">
              {dict.updatesSection.additionalPhotosTitle}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {item.galleryImages.map((img, idx) => (
                <div
                  key={idx}
                  className="relative aspect-[4/3] rounded-xl overflow-hidden bg-[#FAF7F2] border border-[#E8E2D8]"
                >
                  <Image
                    src={img}
                    alt={`${title} - detail ${idx + 1}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 400px"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Back navigation footer */}
        <div className="mt-12 pt-8 border-t border-[#E8E2D8] flex items-center justify-between">
          <Link
            href={`/${validLocale}/updates`}
            className="inline-flex items-center gap-2 text-sm font-bold text-[#F5660A] hover:text-[#D45300] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{dict.common.backToUpdates}</span>
          </Link>
          <Link
            href={`/${validLocale}/contact`}
            className="text-xs text-[#6B625A] hover:text-[#151210]"
          >
            {dict.updatesSection.submitInquiryLink}
          </Link>
        </div>
      </Container>
    </article>
  );
}
