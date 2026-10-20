import type { LocalizedString } from '@/types';

export interface JourneySource {
  name: LocalizedString;
  /** Only set when the source document has a public link. */
  url?: string;
}

export interface JourneyStat {
  id: string;
  /** Cover photo under /images/development. */
  image: string;
  /** Earlier value divided by current value (0 to 1); drives the "Then" bar. Only for before/after cards. */
  ratio?: number;
  section: 'india' | 'up';
  title: LocalizedString;
  /** Shown as the headline when present; otherwise the current value is the headline. */
  multiplier?: LocalizedString;
  nowLabel: LocalizedString;
  now: LocalizedString;
  thenLabel?: LocalizedString;
  then?: LocalizedString;
  note?: LocalizedString;
  source: JourneySource;
}

export const journeyPage = {
  title: { en: 'Vikas Yatra: the change, in figures', hi: 'विकास यात्रा: बदलाव, आँकड़ों में' },
  subtitle: {
    en: 'Figures, not slogans. Each number below comes from a government source, named under it.',
    hi: 'नारे नहीं, आँकड़े। नीचे दी गई हर संख्या एक सरकारी स्रोत से है।',
  },
  sections: {
    india: {
      title: { en: 'India: before and after 2014', hi: 'भारत: 2014 से पहले और बाद' },
      subtitle: {
        en: 'Roads, airports, healthcare and banking for the poor, ten years apart.',
        hi: 'सड़कें, हवाई अड्डे, स्वास्थ्य और गरीबों के लिए बैंकिंग, दस साल के अंतर पर।',
      },
    },
    up: {
      title: { en: 'Uttar Pradesh: since 2017', hi: 'उत्तर प्रदेश: 2017 के बाद' },
      subtitle: {
        en: 'The state’s economy has more than doubled, and expressways and investment have changed what UP is known for.',
        hi: 'राज्य की अर्थव्यवस्था दोगुने से अधिक हो गई है, और एक्सप्रेसवे व निवेश ने उत्तर प्रदेश की पहचान बदली है।',
      },
    },
  },
  since: { en: 'Since launch', hi: 'शुरुआत से अब तक' },
};

const pib: JourneySource = {
  name: {
    en: 'PIB: 11 years of transforming infrastructure (June 2025)',
    hi: 'पीआईबी: बुनियादी ढाँचे के बदलाव के 11 वर्ष (जून 2025)',
  },
  url: 'https://static.pib.gov.in/WriteReadData/specificdocs/documents/2025/jun/doc2025611568101.pdf',
};

const ians: JourneySource = {
  name: {
    en: 'Ministry of Health in Parliament, via IANS (December 2024)',
    hi: 'स्वास्थ्य मंत्रालय, संसद में, आईएएनएस के हवाले से (दिसंबर 2024)',
  },
};

const upSurvey: JourneySource = {
  name: { en: 'Uttar Pradesh Economic Survey 2025-26', hi: 'उत्तर प्रदेश आर्थिक सर्वेक्षण 2025-26' },
};

export const journeyStats: JourneyStat[] = [
  {
    id: 'highways',
    ratio: 0.6244,
    image: '/images/development/highways.webp',
    section: 'india',
    title: { en: 'National highways', hi: 'राष्ट्रीय राजमार्ग' },
    multiplier: { en: '1.6× more', hi: '1.6 गुना' },
    nowLabel: { en: 'Now (March 2025)', hi: 'अब (मार्च 2025)' },
    now: { en: '1,46,204 km', hi: '1,46,204 किमी' },
    thenLabel: { en: 'Then (2013-14)', hi: 'तब (2013-14)' },
    then: { en: '91,287 km', hi: '91,287 किमी' },
    source: pib,
  },
  {
    id: 'airports',
    ratio: 0.4625,
    image: '/images/development/airports.webp',
    section: 'india',
    title: { en: 'Operational airports', hi: 'चालू हवाई अड्डे' },
    multiplier: { en: '2.2× more', hi: '2.2 गुना' },
    nowLabel: { en: 'Now (March 2025)', hi: 'अब (मार्च 2025)' },
    now: { en: '160', hi: '160' },
    thenLabel: { en: 'Then (2014)', hi: 'तब (2014)' },
    then: { en: '74', hi: '74' },
    note: { en: 'Includes water aerodromes and heliports.', hi: 'इसमें वॉटर एयरोड्रोम और हेलीपोर्ट भी शामिल हैं।' },
    source: pib,
  },
  {
    id: 'metro',
    ratio: 0.2448,
    image: '/images/development/metro.webp',
    section: 'india',
    title: { en: 'Metro rail network', hi: 'मेट्रो रेल नेटवर्क' },
    multiplier: { en: '4.1× more', hi: '4.1 गुना' },
    nowLabel: { en: 'Now (May 2025)', hi: 'अब (मई 2025)' },
    now: { en: '1,013 km', hi: '1,013 किमी' },
    thenLabel: { en: 'Then (2014)', hi: 'तब (2014)' },
    then: { en: '248 km', hi: '248 किमी' },
    source: pib,
  },
  {
    id: 'medical-colleges',
    ratio: 0.4962,
    image: '/images/development/medical-colleges.webp',
    section: 'india',
    title: { en: 'Medical colleges', hi: 'मेडिकल कॉलेज' },
    multiplier: { en: '2× more', hi: '2 गुना' },
    nowLabel: { en: 'Now (2024)', hi: 'अब (2024)' },
    now: { en: '780', hi: '780' },
    thenLabel: { en: 'Then (2014)', hi: 'तब (2014)' },
    then: { en: '387', hi: '387' },
    source: ians,
  },
  {
    id: 'mbbs-seats',
    ratio: 0.4347,
    image: '/images/development/mbbs.webp',
    section: 'india',
    title: { en: 'MBBS seats', hi: 'एमबीबीएस सीटें' },
    multiplier: { en: '2.3× more', hi: '2.3 गुना' },
    nowLabel: { en: 'Now (2024)', hi: 'अब (2024)' },
    now: { en: '1,18,137', hi: '1,18,137' },
    thenLabel: { en: 'Then (2014)', hi: 'तब (2014)' },
    then: { en: '51,348', hi: '51,348' },
    source: ians,
  },
  {
    id: 'railway-electrification',
    ratio: 0.1153,
    image: '/images/development/rail-electrification.webp',
    section: 'india',
    title: { en: 'Railway lines electrified', hi: 'विद्युतीकृत रेल लाइनें' },
    multiplier: { en: '8.7× more', hi: '8.7 गुना' },
    nowLabel: { en: 'In 2014-25', hi: '2014-25 में' },
    now: { en: '45,000+ route km', hi: '45,000+ रूट किमी' },
    thenLabel: { en: 'In 2004-14', hi: '2004-14 में' },
    then: { en: '5,188 route km', hi: '5,188 रूट किमी' },
    source: pib,
  },
  {
    id: 'jan-dhan',
    image: '/images/development/jan-dhan.webp',
    section: 'india',
    title: { en: 'Jan Dhan bank accounts', hi: 'जन धन बैंक खाते' },
    nowLabel: { en: 'Since launch (August 2025)', hi: 'शुरुआत से अब तक (अगस्त 2025)' },
    now: { en: '56.16 crore', hi: '56.16 करोड़' },
    note: { en: 'Launched August 2014; deposits of ₹2.67 lakh crore.', hi: 'अगस्त 2014 में शुरू; जमा राशि ₹2.67 लाख करोड़।' },
    source: {
      name: { en: 'PIB: 11 years of PM Jan Dhan Yojana (August 2025)', hi: 'पीआईबी: प्रधानमंत्री जन धन योजना के 11 वर्ष (अगस्त 2025)' },
    },
  },
  {
    id: 'ujjwala',
    image: '/images/development/ujjwala.webp',
    section: 'india',
    title: { en: 'Free LPG connections (Ujjwala)', hi: 'मुफ़्त एलपीजी कनेक्शन (उज्ज्वला)' },
    nowLabel: { en: 'Since launch (1 March 2025)', hi: 'शुरुआत से अब तक (1 मार्च 2025)' },
    now: { en: '10.33 crore', hi: '10.33 करोड़' },
    note: { en: 'Launched in Ballia, Uttar Pradesh, in May 2016.', hi: 'मई 2016 में उत्तर प्रदेश के बलिया से शुरू।' },
    source: {
      name: { en: 'PIB: PM Ujjwala Yojana, nine years (April 2025)', hi: 'पीआईबी: प्रधानमंत्री उज्ज्वला योजना के नौ वर्ष (अप्रैल 2025)' },
    },
  },
  {
    id: 'poverty',
    image: '/images/development/poverty.webp',
    section: 'india',
    title: { en: 'People out of multidimensional poverty', hi: 'बहुआयामी गरीबी से बाहर आए लोग' },
    nowLabel: { en: '2013-14 to 2022-23', hi: '2013-14 से 2022-23 तक' },
    now: { en: '24.82 crore', hi: '24.82 करोड़' },
    source: {
      name: { en: 'NITI Aayog discussion paper, reported by PTI (January 2024)', hi: 'नीति आयोग चर्चा पत्र, पीटीआई के हवाले से (जनवरी 2024)' },
    },
  },
  {
    id: 'up-gsdp',
    ratio: 0.4397,
    image: '/images/development/gsdp.webp',
    section: 'up',
    title: { en: 'Size of the state economy (GSDP)', hi: 'राज्य की अर्थव्यवस्था का आकार (जीएसडीपी)' },
    multiplier: { en: '2.3× more', hi: '2.3 गुना' },
    nowLabel: { en: 'Now (2024-25)', hi: 'अब (2024-25)' },
    now: { en: '₹30.25 lakh crore', hi: '₹30.25 लाख करोड़' },
    thenLabel: { en: 'Then (2016-17)', hi: 'तब (2016-17)' },
    then: { en: '₹13.3 lakh crore', hi: '₹13.3 लाख करोड़' },
    note: { en: 'About 10.8% growth every year.', hi: 'हर साल लगभग 10.8% की वृद्धि।' },
    source: upSurvey,
  },
  {
    id: 'up-expressways',
    image: '/images/development/expressways.webp',
    section: 'up',
    title: { en: 'Expressways planned and built', hi: 'योजनाबद्ध और बने एक्सप्रेसवे' },
    nowLabel: { en: 'Total (2025-26)', hi: 'कुल (2025-26)' },
    now: { en: '22', hi: '22' },
    note: {
      en: '7 already in use and 3 under construction; includes the Purvanchal, Bundelkhand and Ganga expressways.',
      hi: '7 चालू और 3 निर्माणाधीन; इनमें पूर्वांचल, बुंदेलखंड और गंगा एक्सप्रेसवे शामिल हैं।',
    },
    source: upSurvey,
  },
  {
    id: 'up-investment',
    image: '/images/development/investment.webp',
    section: 'up',
    title: { en: 'Investment proposals in the pipeline', hi: 'पाइपलाइन में निवेश प्रस्ताव' },
    nowLabel: { en: 'Total (2025-26)', hi: 'कुल (2025-26)' },
    now: { en: '₹50+ lakh crore', hi: '₹50+ लाख करोड़' },
    source: upSurvey,
  },
];
