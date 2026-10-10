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
}

export const janSunwaiData: JanSunwaiDetails = {
  eyebrow: {
    en: 'REGULAR GRIEVANCE REDRESSAL',
    hi: 'नियमित जनसुनवाई एवं समाधान',
  },
  title: {
    en: 'Regular Jan Sunwai: Transparent & Accessible Leadership',
    hi: 'नियमित जनसुनवाई: पारदर्शी, जवाबदेह और सहज नेतृत्व',
  },
  description: {
    en: 'In Bhagwant Nagar, democratic representation means being physically present and directly reachable. Regular Jan Sunwai sessions provide every villager an open platform to present personal and village grievances without intermediaries.',
    hi: 'भगवंत नगर में जनसेवा का अर्थ है जनता के बीच निरंतर उपस्थिति। नियमित जनसुनवाई के माध्यम से हर ग्रामीण को बिना किसी बिचौलिए के अपनी समस्याएं, सुझाव और आवश्यकताएं सीधे रखने का अवसर मिलता है।',
  },
  principles: [
    {
      title: {
        en: 'Direct Hearing Without Barriers',
        hi: 'बिना किसी बाधा के सीधा संवाद',
      },
      description: {
        en: 'Every visiting citizen sits face-to-face to discuss issues ranging from pension records to village transformer repairs.',
        hi: 'पेंशन, राशन कार्ड से लेकर ट्रांसफार्मर व नलकूप की खराबी तक हर समस्या पर आमने-सामने बैठकर चर्चा और समाधान।',
      },
    },
    {
      title: {
        en: 'Time-Bound Administrative Follow-Up',
        hi: 'समयबद्ध प्रशासनिक समन्वय',
      },
      description: {
        en: 'Formal documentation of every grievance with regular status tracking and departmental coordination.',
        hi: 'प्रत्येक आवेदन का विधिवत रिकॉर्ड, संबंधित विभागीय अधिकारियों से तत्काल समन्वय और प्रगति की सतत निगरानी।',
      },
    },
    {
      title: {
        en: 'Special Focus on Senior Citizens & Women',
        hi: 'बुजुर्गों एवं महिलाओं की समस्याओं को प्राथमिकता',
      },
      description: {
        en: 'Dedicated attention for elderly residents, widows, and farming families requiring immediate relief.',
        hi: 'वरिष्ठ नागरिकों, माताओं-बहनों और पीड़ित किसान परिवारों की सुनवाई को सर्वोच्च प्राथमिकता।',
      },
    },
  ],
  scheduleInfo: {
    en: 'Held regularly at the central camp office in Bhagwant Nagar, as well as rotational village chaupals across blocks.',
    hi: 'भगवंत नगर केंद्रीय कैंप कार्यालय एवं विकास खंडों के विभिन्न ग्रामों में चौपालों के माध्यम से नियमित आयोजित।',
  },
  image: '/images/public-life/ashish2.jpg',
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
      { en: 'Direct discussions on irrigation canal maintenance and electricity supply', hi: 'नहरों के टेल तक पानी और विद्युत आपूर्ति पर सीधी समीक्षा' },
      { en: 'Listening to small business owners and village artisans', hi: 'ग्रामीण दस्तकारों और छोटे व्यापारियों की कठिनाइयों की सुनवाई' },
    ],
  },
  {
    id: 'field-inspections',
    title: {
      en: 'On-Site Field Inspections of Civic Works',
      hi: 'विकास कार्यों का स्थलीय निरीक्षण',
    },
    description: {
      en: 'Regular surprise and scheduled reviews of newly constructed roads, community water tanks, and school facilities to enforce strict quality.',
      hi: 'सड़कों, जल जीवन मिशन के कार्यों, सामुदायिक भवनों और विद्यालयों का भौतिक सत्यापन ताकि गुणवत्ता में कोई समझौता न हो।',
    },
    image: '/images/public-life/ashish4.jpg',
    details: [
      { en: 'Ensuring adherence to engineering specifications for rural link roads', hi: 'ग्रामीण मार्गों के निर्माण में मानक और गुणवत्ता की कड़ी निगरानी' },
      { en: 'Reviewing functional readiness of primary health sub-centers', hi: 'प्राथमिक स्वास्थ्य उपकेंद्रों में दवाओं और स्टाफ की उपलब्धता का निरीक्षण' },
    ],
  },
];
