import type { LocalizedString } from '@/types';

/**
 * Content for the "Bhagwantnagar Heritage & Identity" page (/en/heritage, /hi/heritage).
 *
 * ACCURACY RULES - please read before editing
 *  - Only add facts that have been verified against a credible source (district gazetteer,
 *    ASI / state archaeology records, official tourism or district-administration pages, or
 *    first-hand documentation by the office). Record the source in `source`.
 *  - Never add guessed, remembered or "typical for the region" facts, dates, monuments or people.
 *  - Use photographs actually taken at the place. Never use stock images of other places.
 *  - `timelineEvents` and `cultureItems` are intentionally EMPTY: no verified information has been
 *    supplied yet. While an array is empty, the page shows a "verified information will be added"
 *    notice instead of fictional content. `placesOfInterest` holds only names and map points so far.
 *
 * To add an entry, append an object to the matching array below. Photos live in /public/images/...
 */

export interface HeritageSource {
  /** e.g. "Unnao District Gazetteer, 1903" or "Interview with local historian, 12 Mar 2026". */
  title: string;
  url?: string;
}

export interface HeritagePlace {
  id: string;
  /** 'place' = important place, 'landmark' = public landmark. Drives the filter on the page. */
  kind: 'place' | 'landmark';
  name: LocalizedString;
  location: LocalizedString;
  /** Optional until a verified description is available; nothing is shown in its place. */
  description?: LocalizedString;
  /** Why the place matters culturally or historically. Optional until verified. */
  significance?: LocalizedString;
  /** Public path of a real photograph of this exact place, e.g. '/images/heritage/xyz.webp'. Optional: a placeholder is shown without it. */
  image?: string;
  imageAlt?: LocalizedString;
  /** CSS object-position for the card crop, e.g. 'center 15%' to keep the top of a tall photo. */
  imagePosition?: string;
  /** GPS point of the place, taken from the Google Maps listing. */
  coordinates?: { lat: number; lng: number };
  /** Link to the place on Google Maps. */
  mapUrl?: string;
  source: HeritageSource;
}

export interface HeritageTimelineEvent {
  id: string;
  /** Documented year or date, displayed as written, e.g. '1857' or '12 March 1921'. */
  date: string | LocalizedString;
  title: LocalizedString;
  description: LocalizedString;
  source: HeritageSource;
}

export type HeritageCultureKind = 'festival' | 'fair' | 'art' | 'cuisine' | 'tradition' | 'shrine';

export interface HeritageCultureItem {
  id: string;
  kind: HeritageCultureKind;
  name: LocalizedString;
  /** Optional until a verified description is available. */
  description?: LocalizedString;
  image?: string;
  imageAlt?: LocalizedString;
  coordinates?: { lat: number; lng: number };
  /** Link to the place on Google Maps. */
  mapUrl?: string;
  source: HeritageSource;
}

const MAPS_SOURCE: HeritageSource = {
  title: 'Google Maps listing, supplied by the site office',
};

/**
 * Names and coordinates below come from the Google Maps listings supplied by the office.
 * Descriptions, history, significance and photographs are NOT filled in yet - add them only
 * once verified. The place type (place / landmark) is an editorial grouping and may be changed.
 */
export const placesOfInterest: HeritagePlace[] = [
  {
    id: 'pakka-talab',
    kind: 'place',
    name: { en: 'Pakka Talab', hi: 'पक्का तालाब' },
    location: { en: 'Bhagwantnagar, Unnao', hi: 'भगवंतनगर, उन्नाव' },
    image: '/images/heritage/pakka-talab.webp',
    imageAlt: {
      en: 'Temple with pointed spires standing beside the paved pond (Pakka Talab)',
      hi: 'पक्के तालाब (पक्का तालाब) के किनारे नुकीले शिखरों वाला मंदिर',
    },
    coordinates: { lat: 26.2260395, lng: 80.7560834 },
    mapUrl: 'https://www.google.com/maps/place/Pakka+Talab/@26.2260395,80.7560834,17z',
    source: MAPS_SOURCE,
  },
  {
    id: 'sadar-market',
    kind: 'landmark',
    name: { en: 'Sadar Market', hi: 'सदर मार्केट' },
    location: { en: 'Bhagwantnagar, Unnao', hi: 'भगवंतनगर, उन्नाव' },
    image: '/images/heritage/sadar-market.webp',
    imageAlt: {
      en: 'Shop in Sadar Market with shelves of household goods, crockery and containers',
      hi: 'सदर मार्केट की एक दुकान, जिसमें घरेलू सामान, बर्तन और डिब्बे सजे हैं',
    },
    coordinates: { lat: 26.2245492, lng: 80.7568744 },
    mapUrl: 'https://www.google.com/maps/place/Sadar+Market/@26.2245492,80.7568744,17z',
    source: MAPS_SOURCE,
  },
  {
    id: 'maa-phoolmati-temple',
    kind: 'place',
    name: { en: 'Maa PhoolMati Temple', hi: 'माँ फूलमती मंदिर' },
    location: { en: 'Bhagwantnagar, Unnao', hi: 'भगवंतनगर, उन्नाव' },
    image: '/images/heritage/maa-phoolmati-temple.webp',
    imageAlt: {
      en: 'Carved temple tower of Maa PhoolMati Temple against a clear sky',
      hi: 'साफ आसमान के सामने माँ फूलमती मंदिर का नक्काशीदार शिखर',
    },
    imagePosition: 'center 15%',
    coordinates: { lat: 26.2255805, lng: 80.7551459 },
    mapUrl: 'https://www.google.com/maps/place/Maa+PhoolMati+Temple/@26.2255805,80.7551459,17z',
    source: MAPS_SOURCE,
  },
];
const UNNAO_HISTORY_SOURCE: HeritageSource = {
  title: 'Unnao District official website - History (last updated 23.03.2018)',
  url: 'https://unnao.nic.in/history/',
};

/**
 * Events below are taken from the official Unnao district website's History page. They concern
 * Unnao district; only the 1869 entry names Bhagwantnagar directly. Re-check wording against the
 * source page before adding more.
 */
export const timelineEvents: HeritageTimelineEvent[] = [
  {
    id: 'hiuen-tsang-636',
    date: { en: '636 AD', hi: '636 ई.' },
    title: { en: 'Hiuen Tsang travels to Navadevakula', hi: 'ह्वेनसांग की नवदेवकुल यात्रा' },
    description: {
      en: 'After staying at Kannauj for three months, the Chinese traveller Hiuen Tsang travelled about 26 km to Navadevakula on the eastern bank of the Ganga, a city with a Deva temple, Buddhist monasteries and stupas. Some scholars identify it with Nawal near Bangarmau in Unnao district.',
      hi: 'कन्नौज में तीन माह ठहरने के बाद चीनी यात्री ह्वेनसांग लगभग 26 किमी की यात्रा कर गंगा के पूर्वी तट पर स्थित नवदेवकुल पहुंचे, जहां देव मंदिर, बौद्ध विहार और स्तूप थे। कुछ विद्वान इसे उन्नाव जनपद में बांगरमऊ के निकट नवल से जोड़ते हैं।',
    },
    source: UNNAO_HISTORY_SOURCE,
  },
  {
    id: 'awadh-annexed-1856',
    date: { en: 'February 1856', hi: 'फरवरी 1856' },
    title: { en: 'Awadh annexed; district headquarters moved to Unnao', hi: 'अवध का अधिग्रहण; जिला मुख्यालय उन्नाव स्थानांतरित', },
    description: {
      en: 'Britain annexed Awadh. The district was then known as Purwa, and its headquarters were moved from Purwa to Unnao.',
      hi: 'ब्रिटेन ने अवध का अधिग्रहण किया। तब जनपद पूर्वा कहलाता था और उसका मुख्यालय पूर्वा से उन्नाव ले जाया गया।',
    },
    source: UNNAO_HISTORY_SOURCE,
  },
  {
    id: 'civil-administration-1858',
    date: '1857-1858',
    title: { en: 'Civil administration re-established as Unnao district', hi: 'उन्नाव जनपद के रूप में नागरिक प्रशासन की पुनर्स्थापना' },
    description: {
      en: 'After the freedom struggle of 1857-1858, power passed from the East India Company to the British Crown. Once order returned, civil administration was re-established in a district named Unnao, with headquarters at Unnao.',
      hi: '1857-1858 के स्वतंत्रता संग्राम के बाद सत्ता ईस्ट इंडिया कंपनी से ब्रिटिश क्राउन को मिली। व्यवस्था बहाल होने पर उन्नाव नामक जनपद में, उन्नाव मुख्यालय के साथ, नागरिक प्रशासन पुनः स्थापित हुआ।',
    },
    source: UNNAO_HISTORY_SOURCE,
  },
  {
    id: 'purwa-tehsil-1869',
    date: '1869',
    title: { en: 'Bhagwantnagar placed in Purwa tehsil', hi: 'भगवंतनगर पूर्वा तहसील में सम्मिलित' },
    description: {
      en: 'The district took its present form in 1869. In that year several parganas, including Bhagwantnagar, were transferred from Rae Bareli to Purwa tehsil, and the town of Unnao became a municipality.',
      hi: '1869 में जनपद ने अपना वर्तमान स्वरूप पाया। इसी वर्ष भगवंतनगर सहित कई परगने रायबरेली से पूर्वा तहसील में स्थानांतरित किए गए और उन्नाव नगर नगरपालिका बना।',
    },
    source: UNNAO_HISTORY_SOURCE,
  },
];

export const cultureItems: HeritageCultureItem[] = [];

/* ------------------------------------------------------------------------------------------
 * Page copy. Everything below is either structural text or is taken from content that already
 * exists on this website (biography, "Bhagwant Nagar: Sacred Heritage, Bright Future" section,
 * gallery captions). It adds no new historical claims.
 * ---------------------------------------------------------------------------------------- */

export const heritageMeta = {
  title: {
    en: 'Bhagwantnagar Heritage & Identity',
    hi: 'भगवंतनगर: विरासत एवं पहचान',
  },
  description: {
    en: 'Explore the heritage, places, culture and identity of Bhagwantnagar in Unnao district, Uttar Pradesh. Verified history and traditions are being compiled and added to this page.',
    hi: 'उन्नाव जनपद (उत्तर प्रदेश) के भगवंतनगर की विरासत, स्थलों, संस्कृति और पहचान को जानें। सत्यापित इतिहास और परंपराएं संकलित करके इस पृष्ठ पर जोड़ी जा रही हैं।',
  },
} satisfies Record<string, LocalizedString>;

export const heritageHero = {
  eyebrow: { en: 'HERITAGE & IDENTITY', hi: 'विरासत एवं पहचान' },
  title: { en: 'Bhagwantnagar Heritage & Identity', hi: 'भगवंतनगर: विरासत एवं पहचान' },
  intro: {
    en: 'Bhagwantnagar is not just an administrative constituency; it is the heartbeat of our heritage in Unnao. This page brings together the places, history and traditions that shape its identity, as they are verified.',
    hi: 'भगवंतनगर केवल एक क्षेत्र नहीं, बल्कि उन्नाव में हमारी आस्था और पहचान का केंद्र है। यह पृष्ठ उन स्थलों, इतिहास और परंपराओं को एक साथ लाता है जो इसकी पहचान गढ़ती हैं, जैसे-जैसे वे सत्यापित होती जाती हैं।',
  },
  /** Existing authentic photograph from the site's "Cultural & Heritage" gallery item. */
  image: '/images/gallery/a11.jpg',
  imageAlt: {
    en: 'Ashish Shukla taking part in a local traditional celebration in Bhagwant Nagar',
    hi: 'भगवंत नगर में एक क्षेत्रीय पारंपरिक उत्सव में सहभागिता करते आशीष शुक्ला',
  },
} satisfies Record<string, LocalizedString | string>;

export const heritageCategories = [
  {
    id: 'places',
    target: 'places' as const,
    placeFilter: 'place' as const,
    title: { en: 'Important Places', hi: 'महत्वपूर्ण स्थल' },
    description: { en: 'Notable places of the constituency.', hi: 'क्षेत्र के उल्लेखनीय स्थल।' },
  },
  {
    id: 'history',
    target: 'history' as const,
    title: { en: 'History', hi: 'इतिहास' },
    description: { en: 'A timeline of documented events.', hi: 'प्रलेखित घटनाओं की समय-रेखा।' },
  },
  {
    id: 'culture',
    target: 'culture' as const,
    title: { en: 'Culture & Traditions', hi: 'संस्कृति एवं परंपराएं' },
    description: { en: 'Festivals, fairs, art and community life.', hi: 'पर्व, मेले, कला और सामुदायिक जीवन।' },
  },
  {
    id: 'landmarks',
    target: 'places' as const,
    placeFilter: 'landmark' as const,
    title: { en: 'Public Landmarks', hi: 'सार्वजनिक स्थल' },
    description: { en: 'Landmarks that belong to everyone.', hi: 'वे स्थल जो सबके हैं।' },
  },
];

/** Shown whenever a section has no verified entries yet. */
export const heritagePending = {
  title: { en: 'Verified information will be added soon', hi: 'सत्यापित जानकारी जल्द जोड़ी जाएगी' },
  description: {
    en: 'We publish only facts that have been checked against credible sources. This section will be filled in as verified details become available.',
    hi: 'हम केवल वही तथ्य प्रकाशित करते हैं जो विश्वसनीय स्रोतों से जांचे जा चुके हों। जैसे-जैसे सत्यापित विवरण उपलब्ध होंगे, यह खंड भरा जाएगा।',
  },
} satisfies Record<string, LocalizedString>;

export const heritageSections = {
  places: {
    eyebrow: { en: 'PLACES OF INTEREST', hi: 'दर्शनीय स्थल' },
    title: { en: 'Places of Interest', hi: 'रुचि के स्थल' },
    description: {
      en: 'Places that carry the memory and character of Bhagwantnagar.',
      hi: 'वे स्थल जिनमें भगवंतनगर की स्मृति और स्वभाव बसा है।',
    },
    filterAll: { en: 'All', hi: 'सभी' },
    filterPlace: { en: 'Important places', hi: 'महत्वपूर्ण स्थल' },
    filterLandmark: { en: 'Public landmarks', hi: 'सार्वजनिक स्थल' },
    significance: { en: 'Significance', hi: 'महत्व' },
    source: { en: 'Source', hi: 'स्रोत' },
    viewOnMap: { en: 'View on Google Maps', hi: 'Google Maps पर देखें' },
    photoPending: { en: 'Photograph to be added', hi: 'चित्र जल्द जोड़ा जाएगा' },
    detailsPending: {
      en: 'Detailed history and significance will be added after verification.',
      hi: 'विस्तृत इतिहास और महत्व सत्यापन के बाद जोड़ा जाएगा।',
    },
    noneInFilter: { en: 'No entries in this category yet.', hi: 'इस श्रेणी में अभी कोई प्रविष्टि नहीं है।' },
  },
  history: {
    eyebrow: { en: 'HISTORY', hi: 'इतिहास' },
    title: { en: 'Historical Timeline', hi: 'ऐतिहासिक समय-रेखा' },
    description: {
      en: 'Key moments from the recorded history of Unnao district and Bhagwantnagar.',
      hi: 'उन्नाव जनपद और भगवंतनगर के अभिलिखित इतिहास के प्रमुख क्षण।',
    },
  },
  culture: {
    eyebrow: { en: 'CULTURE', hi: 'संस्कृति' },
    title: { en: 'Local Culture & Traditions', hi: 'स्थानीय संस्कृति एवं परंपराएं' },
    description: {
      en: 'Festivals, fairs, local art, cuisine and community traditions of Bhagwantnagar.',
      hi: 'भगवंतनगर के पर्व, मेले, लोक कला, व्यंजन और सामुदायिक परंपराएं।',
    },
    kinds: {
      festival: { en: 'Festival', hi: 'पर्व' },
      fair: { en: 'Fair', hi: 'मेला' },
      art: { en: 'Local art', hi: 'लोक कला' },
      cuisine: { en: 'Cuisine', hi: 'व्यंजन' },
      tradition: { en: 'Tradition', hi: 'परंपरा' },
      shrine: { en: 'Faith & shrine', hi: 'आस्था स्थल' },
    } satisfies Record<HeritageCultureKind, LocalizedString>,
  },
  identity: {
    eyebrow: { en: 'OUR IDENTITY', hi: 'हमारी पहचान' },
    title: { en: 'Bhagwant Nagar: Sacred Heritage, Bright Future', hi: 'भगवंत नगर: समृद्ध परंपरा, उज्ज्वल भविष्य' },
    description: {
      en: 'A constituency rooted in its villages, fields and local traditions.',
      hi: 'गांवों, खेतों और स्थानीय परंपराओं में रचा-बसा एक क्षेत्र।',
    },
  },
  closing: {
    eyebrow: { en: 'ROOTS · RESPONSIBILITY · DEVELOPMENT', hi: 'संस्कार · उत्तरदायित्व · समग्र विकास' },
    title: {
      en: 'Rooted in heritage, working for a bright future.',
      hi: 'परंपरा में जड़ें, उज्ज्वल भविष्य के लिए प्रयास।',
    },
    description: {
      en: 'Know Bhagwantnagar through the people who live here and the work being done for them.',
      hi: 'भगवंतनगर को यहां के लोगों और उनके लिए हो रहे कार्यों के माध्यम से जानें।',
    },
  },
} satisfies Record<string, Record<string, LocalizedString | Record<string, LocalizedString>>>;

/** Identity statements. Each one restates content already published elsewhere on this site. */
export const identityPoints: { id: string; title: LocalizedString; description: LocalizedString }[] = [
  {
    id: 'constituency',
    title: { en: 'A constituency in Unnao', hi: 'उन्नाव का एक क्षेत्र' },
    description: {
      en: '166-Bhagwant Nagar is an assembly constituency in Unnao district, Uttar Pradesh.',
      hi: '166-भगवंत नगर उन्नाव जनपद, उत्तर प्रदेश का एक विधानसभा क्षेत्र है।',
    },
  },
  {
    id: 'fields-bazaars',
    title: { en: 'Fields and village bazaars', hi: 'खेत और ग्रामीण बाज़ार' },
    description: {
      en: 'From fertile agricultural fields to vibrant village bazaars, daily life here is rooted in the village and the farm.',
      hi: 'उपजाऊ खेतों से लेकर जीवंत ग्रामीण बाज़ारों तक, यहां का जीवन गांव और खेती से जुड़ा है।',
    },
  },
  {
    id: 'rural-bonds',
    title: { en: 'Rural bonds and local fairs', hi: 'ग्रामीण सद्भाव और स्थानीय मेले' },
    description: {
      en: 'Traditional rural bonds, local fairs and historical shrines are part of the constituency’s identity and are to be respected and preserved.',
      hi: 'पारंपरिक ग्रामीण सद्भाव, स्थानीय मेले और ऐतिहासिक स्थल क्षेत्र की पहचान का हिस्सा हैं और सम्मान व संरक्षण के योग्य हैं।',
    },
  },
];

/** Existing pages the closing section links to. */
export const heritageClosingLinks = [
  { path: '/about', label: { en: 'About Ashish Shukla', hi: 'आशीष शुक्ला के बारे में' } },
  { path: '/public-life', label: { en: 'Public Life', hi: 'सार्वजनिक जीवन' } },
  { path: '/media#photos', label: { en: 'Photo Gallery', hi: 'फोटो गैलरी' } },
  { path: '/contact', label: { en: 'Get in touch', hi: 'संपर्क करें' } },
];
