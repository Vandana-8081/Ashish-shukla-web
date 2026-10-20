import type { LocalizedString } from '@/types';
import { photoGalleryData } from '@/data/media';
import { publicLifeItems } from '@/data/publicLife';

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

const publicLife = (id: string) => {
  const item = publicLifeItems.find((entry) => entry.id === id);
  if (!item) throw new Error(`Missing public life item: ${id}`);
  return item;
};

const dharmik = gallery('gallery-1');
const bujurg = gallery('gallery-2');
const khel = gallery('gallery-3');
const review = gallery('gallery-4');

const health = {
  caption: {
    en: 'Mega Free Health Screening & Diagnostic Camp Benefiting Rural Families',
    hi: 'ग्रामीण परिवारों के लिए विशाल निःशुल्क स्वास्थ्य एवं नेत्र जांच शिविर का आयोजन',
  },
  note: { en: 'Community Health Center Campus, Purwa', hi: 'सामुदायिक स्वास्थ्य केंद्र परिसर, पुरवा' },
};
const kisan = {
  caption: {
    en: 'Kisan Chaupal: Resolving Tail-End Irrigation & Paddy Procurement Issues',
    hi: 'किसान चौपाल: अंतिम छोर तक सिंचाई जल व धान क्रय केंद्रों की व्यवस्था पर चर्चा',
  },
  note: { en: 'Asoha Rural Belt, Bhagwant Nagar', hi: 'असोहा ग्रामीण क्षेत्र, भगवंत नगर' },
};
const sports = {
  caption: {
    en: 'Inauguration of Inter-Panchayat Rural Athletics & Sports Kit Distribution',
    hi: 'ग्राम पंचायत स्तरीय ग्रामीण खेल प्रतियोगिता का शुभारंभ एवं खेल किट वितरण',
  },
  note: { en: 'Panchayat Stadium Ground, Bhagwant Nagar', hi: 'पंचायत खेल मैदान, भगवंत नगर' },
};
const sunwai = {
  caption: {
    en: 'Weekly Jan Sunwai: Immediate Resolution of 80+ Local Petitions',
    hi: 'साप्ताहिक जनसुनवाई: जनसमस्याओं की गंभीरता से सुनवाई एवं त्वरित निस्तारण',
  },
  note: { en: 'Public Office, Bhagwant Nagar, Unnao', hi: 'जनसेवा कार्यालय, भगवंत नगर, उन्नाव' },
};

const chaupal = publicLife('village-gatherings');
const inspections = publicLife('field-inspections');

/**
 * Real photographs already in /public/images. Captions are reused from existing
 * site content (gallery, public life and past programme reports); photos with no verified
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
  {
    id: 'festival-visit',
    image: '/images/gallery/a15.jpg',
    alt: {
      en: 'Ashish Shukla at a local festive celebration',
      hi: 'स्थानीय उत्सव में आशीष शुक्ला',
    },
    caption: {
      en: 'Meeting community members at a local festive celebration.',
      hi: 'स्थानीय उत्सव में लोगों से मुलाकात।',
    },
  },
 
];
