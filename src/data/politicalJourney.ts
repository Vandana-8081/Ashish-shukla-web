import type { LocalizedString } from '@/types';

/**
 * Content for the About page "Political Journey" timeline.
 * Only facts already present on the site (biography, public life, updates) or supplied for this
 * section are used. No dates, votes or achievements are invented; where a date is unknown none is shown.
 */
export interface JourneyMilestone {
  id: string;
  year?: string;
  title: LocalizedString;
  body: LocalizedString;
  points?: LocalizedString[];
  /** Short clarification shown under the text (e.g. "responsibilities, not completed projects"). */
  note?: LocalizedString;
  image?: { src: string; alt: LocalizedString };
  /** Link to an existing route (relative path, localised by the component). */
  link?: { path: string; label: LocalizedString };
}

export const politicalJourneyIntro = {
  heading: {
    hi: 'राजनीतिक यात्रा एवं जनसेवा',
    en: 'Political Journey & Public Service',
  },
  description: {
    hi: 'जनसेवा, जनसंवाद और भगवंतनगर के विकास के प्रति प्रतिबद्धता के साथ आशीष शुक्ला की राजनीतिक यात्रा।',
    en: "Ashish Shukla's political journey, driven by public service, dialogue with citizens and a commitment to the development of Bhagwantnagar.",
  },
  image: {
    src: '/images/gallery/a2.jpg',
    alt: {
      hi: 'ग्रामीणों के बीच आशीष शुक्ला',
      en: 'Ashish Shukla among villagers',
    },
  },
} satisfies { heading: LocalizedString; description: LocalizedString; image: { src: string; alt: LocalizedString } };

export const journeyMilestones: JourneyMilestone[] = [
  {
    id: 'early-life',
    title: { hi: 'प्रारंभिक जीवन एवं सामाजिक जुड़ाव', en: 'Early Life & Social Roots' },
    body: {
      hi: 'भगवंतनगर, उन्नाव के ग्रामीण परिवेश से जुड़े आशीष शुक्ला ने किसानों और सामान्य परिवारों की रोज़मर्रा की चुनौतियों को करीब से देखा। यही अनुभव जनसेवा के प्रति उनकी संवेदना का आधार बना।',
      en: 'Rooted in the rural surroundings of Bhagwantnagar, Unnao, Ashish Shukla saw the everyday challenges of farmers and ordinary families up close. That experience shaped his commitment to public service.',
    },
  },
  {
    id: 'public-service-begins',
    title: { hi: 'जनसेवा की शुरुआत', en: 'The Beginning of Public Service' },
    body: {
      hi: 'अपने क्षेत्र में सक्रिय होकर उन्होंने पंचायतों और गांवों में जाकर लोगों से संवाद करना, चौपालों में शामिल होना और स्थानीय समस्याओं को समझना शुरू किया।',
      en: 'Becoming active in his home region, he began visiting panchayats and villages, taking part in chaupals and listening to local concerns.',
    },
  },
  {
    id: 'nikay-election-2023',
    year: '2023',
    title: { hi: 'नगर निकाय चुनाव', en: 'Nagar Nikay Election' },
    body: {
      hi: 'वर्ष 2023 के नगर निकाय चुनाव में आशीष शुक्ला भारतीय जनता पार्टी के प्रत्याशी के रूप में नगर पंचायत भगवंतनगर के अध्यक्ष पद के लिए चुनाव मैदान में उतरे।',
      en: 'In the 2023 Nagar Nikay election, Ashish Shukla contested for the post of President of Nagar Panchayat Bhagwantnagar as the Bharatiya Janata Party candidate.',
    },
  },
  {
    id: 'nagar-panchayat-president',
    title: { hi: 'नगर पंचायत अध्यक्ष के रूप में जिम्मेदारी', en: 'Responsibility as Nagar Panchayat President' },
    body: {
      hi: 'नगर पंचायत भगवंतनगर के अध्यक्ष के रूप में उनकी जिम्मेदारियाँ स्थानीय प्रशासन और नागरिक सुविधाओं से जुड़ी हैं।',
      en: 'As President of Nagar Panchayat Bhagwantnagar, his responsibilities relate to local administration and civic amenities.',
    },
    points: [
      { hi: 'स्वच्छता एवं सफाई व्यवस्था', en: 'Sanitation and cleanliness' },
      { hi: 'सड़क संपर्क', en: 'Road connectivity' },
      { hi: 'जल निकासी', en: 'Drainage' },
      { hi: 'नागरिक सेवाएँ एवं जनसुविधाएँ', en: 'Citizen services and public amenities' },
    ],
  },
  {
    id: 'jan-sunwai',
    title: { hi: 'जनसुनवाई एवं जनसंवाद', en: 'Jan Sunwai & Public Dialogue' },
    body: {
      hi: 'नियमित जनसुनवाई के माध्यम से नागरिक अपनी समस्याएँ और सुझाव सीधे रख सकते हैं। आवेदनों का रिकॉर्ड रखा जाता है और संबंधित विभागों से समन्वय किया जाता है।',
      en: 'Through regular Jan Sunwai, citizens can present their concerns and suggestions directly. Applications are recorded and coordinated with the departments concerned.',
    },
    image: {
      src: '/images/public-life/jan-sunwai.jpg',
      alt: { hi: 'जनसुनवाई के दौरान नागरिकों के साथ बैठक', en: 'A meeting with citizens during Jan Sunwai' },
    },
    link: { path: '/public-life#jan-sunwai', label: { hi: 'जनसुनवाई के बारे में जानें', en: 'About Jan Sunwai' } },
  },
  {
    id: 'development-initiatives',
    title: { hi: 'विकास एवं सामाजिक पहल', en: 'Development & Social Initiatives' },
    body: {
      hi: 'स्वास्थ्य शिविर, किसान चौपाल और खेल पहल जैसे जनहित के कार्य।',
      en: 'Public-interest work such as health camps, farmer chaupals and sports initiatives.',
    },
    image: {
      src: '/images/gallery/a10.jpg',
      alt: { hi: 'स्वास्थ्य जांच शिविर', en: 'Health screening camp' },
    },
  },
  {
    id: 'road-ahead',
    title: { hi: 'आगे की दिशा', en: 'The Road Ahead' },
    body: {
      hi: 'भगवंतनगर के लिए आगे की प्राथमिकताएँ:',
      en: 'Priorities ahead for Bhagwantnagar:',
    },
    points: [
      { hi: 'बेहतर नागरिक सुविधाएँ', en: 'Better civic amenities' },
      { hi: 'स्वच्छता', en: 'Cleanliness' },
      { hi: 'सड़क संपर्क', en: 'Road connectivity' },
      { hi: 'जल निकासी', en: 'Drainage' },
      { hi: 'जनकल्याण', en: 'Public welfare' },
    ],
  },
];
