import type { PublicLifeItem, LocalizedString } from '@/types';

export interface JanSunwaiDetails {
  eyebrow: LocalizedString;
  title: LocalizedString;
  description: LocalizedString;
  principles: {
    title: LocalizedString;
    description: LocalizedString;
  }[];
  scheduleInfo: LocalizedString;
  image: string;
  /** Photo used on the Public Life page only; the home page keeps `image`. */
  pageImage?: string;
}

export const janSunwaiData: JanSunwaiDetails = {
  eyebrow: {
    en: 'REGULAR GRIEVANCE REDRESSAL',
    hi: 'नियमित जनसुनवाई एवं समाधान',
  },
  title: {
    en: 'Regular Jan Sunwai: Transparent, Accountable and Accessible Leadership',
    hi: 'नियमित जनसुनवाई: पारदर्शी, जवाबदेह और सहज नेतृत्व',
  },
  description: {
    en: 'Public service in Bhagwant Nagar means being consistently present among residents. Regular Jan Sunwai gives every villager an opportunity to share concerns, suggestions, and needs directly, without a middleman.',
    hi: 'भगवंत नगर में जनसेवा का अर्थ है जनता के बीच निरंतर उपस्थिति। नियमित जनसुनवाई के माध्यम से हर ग्रामीण को बिना किसी बिचौलिए के अपनी समस्याएं, सुझाव और आवश्यकताएं सीधे रखने का अवसर मिलता है।',
  },
  principles: [
    {
      title: {
        en: 'Direct Dialogue Without Barriers',
        hi: 'बिना किसी बाधा के सीधा संवाद',
      },
      description: {
        en: 'From pensions and ration cards to a faulty transformer or tubewell, every concern is discussed face to face and followed toward a solution.',
        hi: 'पेंशन, राशन कार्ड से लेकर ट्रांसफार्मर व नलकूप की खराबी तक हर समस्या पर आमने-सामने बैठकर चर्चा और समाधान।',
      },
    },
    {
      title: {
        en: 'Time-bound Administrative Coordination',
        hi: 'समयबद्ध प्रशासनिक समन्वय',
      },
      description: {
        en: 'Every application is formally recorded, coordinated promptly with the relevant department, and monitored for progress.',
        hi: 'प्रत्येक आवेदन का विधिवत रिकॉर्ड, संबंधित विभागीय अधिकारियों से तत्काल समन्वय और प्रगति की सतत निगरानी।',
      },
    },
    {
      title: {
        en: 'Priority for Senior Citizens, Women and Farming Families',
        hi: 'बुजुर्गों एवं महिलाओं की समस्याओं को प्राथमिकता',
      },
      description: {
        en: 'Hearings give top priority to senior citizens, women, and farming families facing hardship.',
        hi: 'वरिष्ठ नागरिकों, माताओं-बहनों और पीड़ित किसान परिवारों की सुनवाई को सर्वोच्च प्राथमिकता।',
      },
    },
  ],
  scheduleInfo: {
    en: '',
    hi: '',
  },
  image: '/images/public-life/jan-sunwai.jpg',
  pageImage: '/images/public-life/jan-sunwai-page.jpg',
};

export const publicLifeItems: PublicLifeItem[] = [
  {
    id: 'village-gatherings',
    title: {
      en: 'Village Chaupals & Direct Dialogue',
      hi: 'ग्राम चौपालें एवं प्रत्यक्ष जनसंवाद',
    },
    description: {
      en: 'Spending time sitting with village elders, youth, and farmers under the shade of village trees to deliberate upon genuine local priorities.',
      hi: 'गांव की चौपालों में बुजुर्गों, युवाओं और किसानों के साथ बैठकर क्षेत्र की प्राथमिकताओं और आवश्यकताओं पर खुली चर्चा।',
    },
    image: '/images/public-life/ashish3.jpg',
    details: [
      { en: 'Direct review of water and electricity supply up to the tail end of canals', hi: 'नहरों के अंतिम छोर तक सिंचाई के पानी और बिजली की उपलब्धता की समीक्षा' },
      { en: 'Hearing the difficulties of rural artisans and small traders', hi: 'ग्रामीण दस्तकारों और छोटे व्यापारियों की कठिनाइयों की सुनवाई' },
    ],
  },
];
