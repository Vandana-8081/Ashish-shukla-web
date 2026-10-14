import type { LocalizedString } from '@/types';
import { photoGalleryData } from '@/data/media';
import { publicLifeItems } from '@/data/publicLife';
import { updatesData } from '@/data/updates';

export interface PhotographItem {
  id: string;
  image: string;
  alt: LocalizedString;
  /** Short caption shown under the photograph. Omitted where the project has no verified description. */
  caption?: LocalizedString;
  /** Subtle secondary text, e.g. the location of an event. */
  note?: LocalizedString;
}

const genericAlt: LocalizedString = {
  en: 'Photograph from a public programme in Bhagwant Nagar',
  hi: 'भगवंत नगर में आयोजित सार्वजनिक कार्यक्रम का छायाचित्र',
};

const gallery = (id: string) => {
  const item = photoGalleryData.find((photo) => photo.id === id);
  if (!item) throw new Error(`Missing gallery photo: ${id}`);
  return item;
};

const update = (slug: string) => {
  const item = updatesData.find((entry) => entry.slug === slug);
  if (!item) throw new Error(`Missing update: ${slug}`);
  return {
    caption: { en: item.titleEn, hi: item.titleHi },
    note: item.location,
  };
};

const publicLife = (id: string) => {
  const item = publicLifeItems.find((entry) => entry.id === id);
  if (!item) throw new Error(`Missing public life item: ${id}`);
  return item;
};

const dharmik = gallery('gallery-1');
const bujurg = gallery('gallery-2');
const khel = gallery('gallery-3');
const review = gallery('gallery-4');

const health = update('free-health-screening-camp-purwa');
const kisan = update('dialogue-with-farmers-irrigation-mandis');
const sports = update('youth-sports-and-skill-initiative');
const sunwai = update('weekly-jan-sunwai-grievance-resolution');

const chaupal = publicLife('village-gatherings');
const inspections = publicLife('field-inspections');

/**
 * Real photographs already in /public/images. Captions are reused from existing
 * site content (gallery, public life and updates); photos with no verified
 * description are shown without a caption.
 */
export const photographData: PhotographItem[] = [
  { id: 'dharmik', image: dharmik.image, alt: dharmik.caption, caption: dharmik.caption },
  {
    id: 'portrait',
    image: '/images/gallery/a13.jpg',
    alt: { en: 'Portrait of Ashish Shukla', hi: 'आशीष शुक्ला का चित्र' },
  },
  { id: 'bujurg', image: bujurg.image, alt: bujurg.caption, caption: bujurg.caption },
  {
    id: 'jan-sunwai',
    image: '/images/gallery/a12.jpg',
    alt: { en: 'Jan Sunwai public hearing', hi: 'जनसुनवाई कार्यक्रम' },
    caption: { en: 'Regular Jan Sunwai', hi: 'नियमित जनसुनवाई' },
    note: { en: 'Held at the camp office and in village chaupals', hi: 'कैंप कार्यालय एवं ग्राम चौपालों में आयोजित' },
  },
  { id: 'khel', image: khel.image, alt: khel.caption, caption: khel.caption },
  {
    id: 'health-camp',
    image: '/images/gallery/a3.jpg',
    alt: health.caption,
    caption: health.caption,
    note: health.note,
  },
  { id: 'review', image: review.image, alt: review.caption, caption: review.caption },
  {
    id: 'chaupal',
    image: chaupal.image,
    alt: chaupal.title,
    caption: chaupal.title,
  },
  {
    id: 'inauguration',
    image: '/images/gallery/sister.jpg',
    alt: genericAlt,
  },
  {
    id: 'kisan',
    image: '/images/gallery/a4.jpg',
    alt: kisan.caption,
    caption: kisan.caption,
    note: kisan.note,
  },
  {
    id: 'sports-1',
    image: '/images/gallery/a5.jpg',
    alt: sports.caption,
    caption: sports.caption,
    note: sports.note,
  },
  {
    id: 'field-inspections',
    image: inspections.image,
    alt: inspections.title,
    caption: inspections.title,
  },
 
  {
    id: 'sports-2',
    image: '/images/gallery/a1.jpg',
    alt: sports.caption,
  },
  {
    id: 'sunwai-group',
    image: '/images/gallery/a14.jpg',
    alt: sunwai.caption,
    caption: sunwai.caption,
    note: sunwai.note,
  },
  {
    id: 'public-meeting',
    image: '/images/gallery/a7.jpg',
    alt: genericAlt,
  },
  {
    id: 'sunwai-1',
    image: '/images/gallery/a2.jpg',
    alt: sunwai.caption,
  },
 
];
