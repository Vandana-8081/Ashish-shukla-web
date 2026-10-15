import type { DevelopmentPriority, LocalizedString } from '@/types';

export interface BhagwantNagarSection {
  tagline: LocalizedString;
  heading: LocalizedString;
  intro: LocalizedString;
  pillars: {
    title: LocalizedString;
    description: LocalizedString;
  }[];
  heroImage: string;
}

export const bhagwantNagarData: BhagwantNagarSection = {
  tagline: {
    en: 'ROOTS · RESPONSIBILITY · DEVELOPMENT',
    hi: 'संस्कार · उत्तरदायित्व · समग्र विकास',
  },
  heading: {
    en: 'Bhagwant Nagar: Sacred Heritage, Bright Future',
    hi: 'भगवंत नगर: समृद्ध परंपरा, उज्ज्वल भविष्य',
  },
  intro: {
    en: 'Bhagwant Nagar is not just an administrative constituency; it is the heartbeat of our heritage in Unnao. From fertile agricultural fields to vibrant village bazaars, our mission is to ensure every hamlet receives dignified civic amenities, seamless roads, and modern healthcare.',
    hi: 'भगवंत नगर केवल एक क्षेत्र नहीं, बल्कि हमारी आस्था और पहचान का केंद्र है। उपजाऊ खेतों से लेकर ग्रामीण बाजारों तक, हमारा एकमात्र संकल्प है कि क्षेत्र के प्रत्येक मजरे तक पक्की सड़कें, स्वच्छ पेयजल, सुलभ स्वास्थ्य और सम्मानजनक जीवन की सुविधाएं पहुंचें।',
  },
  pillars: [
    {
      title: {
        en: 'Preserving Cultural Identity',
        hi: 'सांस्कृतिक धरोहर का संरक्षण',
      },
      description: {
        en: 'Respecting traditional rural bonds, local fairs, and historical shrines across the constituency.',
        hi: 'क्षेत्र के ऐतिहासिक स्थलों, मेलों और पारंपरिक सद्भाव की रक्षा व संवर्धन।',
      },
    },
    {
      title: {
        en: 'Equitable Village Modernization',
        hi: 'संतुलित ग्रामीण आधुनिकीकरण',
      },
      description: {
        en: 'Bridging the urban-rural divide by strengthening village schools, link roads, and solar electrification.',
        hi: 'सड़कों, प्राथमिक विद्यालयों और सौर ऊर्जा के विस्तार से गांवों को सशक्त बनाना।',
      },
    },
    {
      title: {
        en: 'Empowering Next-Gen Aspirations',
        hi: 'युवा पीढ़ी की आकांक्षाओं को संबल',
      },
      description: {
        en: 'Fostering coaching, sports grounds, and competitive examination facilities for rural boys and girls.',
        hi: 'ग्रामीण युवाओं के लिए खेल मैदान, प्रतियोगी परीक्षाओं की तैयारी और कौशल प्रशिक्षण की व्यवस्था।',
      },
    },
  ],
  heroImage: '/images/hero/home3.png',
};

export const developmentPriorities: DevelopmentPriority[] = [
  {
    id: 'healthcare',
    slug: 'healthcare',
    title: {
      en: 'Upgradation of Community Health Centers & Sub-centers',
      hi: 'सामुदायिक स्वास्थ्य केंद्रों एवं उपकेंद्रों का सुदृढ़ीकरण',
    },
    description: {
      en: 'Ensuring accessible primary healthcare within 15 minutes of every village hamlet, fully equipped with emergency life-support, essential medicines, and maternal care facilities.',
      hi: 'हर गांव और मजरे के समीप प्राथमिक स्वास्थ्य सेवाओं की उपलब्धता, आवश्यक दवाओं का निर्बाध वितरण और सुरक्षित मातृत्व सेवाओं की सुदृढ़ व्यवस्था।',
    },
    keyInitiatives: [
      { en: 'Modernization of CHC Purwa, Bighapur, and Asoha centers', hi: 'सीएचसी और प्राथमिक स्वास्थ्य उपकेंद्रों में बुनियादी ढांचे का विस्तार' },
      { en: 'Regular specialist medical camps and diagnostic screenings', hi: 'ग्रामीण क्षेत्रों में नियमित निःशुल्क स्वास्थ्य व नेत्र परीक्षण शिविर' },
      { en: 'Adequate stock of anti-rabies, anti-venom, and critical medicines', hi: 'आवश्यक व आपातकालीन जीवनरक्षक दवाओं की निरंतर उपलब्धता' },
    ],
    image: '/images/development/health.webp',
    tag: {
      en: 'Primary Healthcare',
      hi: 'प्राथमिक स्वास्थ्य',
    },
  },
  {
    id: 'rural-connectivity',
    slug: 'rural-connectivity',
    title: {
      en: 'Strengthening Rural Connectivity & Major Link Roads',
      hi: 'ग्रामीण संपर्क मार्गों एवं प्रमुख लिंक सड़कों का नवनिर्माण',
    },
    description: {
      en: 'Constructing robust all-weather paved roads connecting isolated rural settlements to block headquarters, agricultural mandis, and state highways.',
      hi: 'सुदूर गांवों व मजरों को मुख्य मार्गों, कृषि मंडियों और विकास खंड मुख्यालयों से जोड़ने वाली बारहमासी पक्की सड़कों का निर्माण व जीर्णोद्धार।',
    },
    keyInitiatives: [
      { en: 'Paving pothole-free village approach roads with proper drainage', hi: 'नाली निर्माण युक्त गुणवत्तापूर्ण संपर्क मार्गों का विस्तार' },
      { en: 'Widening key arterial corridors connecting Bhagwant Nagar to Unnao and Kanpur', hi: 'प्रमुख व्यापारिक और आवागमन मार्गों का चौड़ीकरण व सुदृढ़ीकरण' },
      { en: 'Expediting culvert repairs and bridge construction over seasonal drains', hi: 'बरसाती नालों पर पुलियों का निर्माण ताकि बारिश में आवागमन बाधित न हो' },
    ],
    image: '/images/development/road-paving.png',
    tag: {
      en: 'Road Infrastructure',
      hi: 'सड़क अवसंरचना',
    },
  },
  {
    id: 'education',
    slug: 'education',
    title: {
      en: 'Quality Education & Modernized Government Schools',
      hi: 'गुणवत्तापूर्ण शिक्षा एवं परिषदीय विद्यालयों का कायाकल्प',
    },
    description: {
      en: 'Transforming rural primary and composite schools into vibrant centers of learning with clean drinking water, smart classrooms, and functional library spaces.',
      hi: 'ग्रामीण विद्यालयों में आधुनिक सुविधाएं, स्वच्छ पेयजल, स्मार्ट कक्षाएं और खेलकूद की सुविधाएं सुनिश्चित कर बच्चों के उज्ज्वल भविष्य की नींव रखना।',
    },
    keyInitiatives: [
      { en: 'Comprehensive infrastructure support for composite schools', hi: 'परिषदीय विद्यालयों में फर्नीचर, चारदीवारी और शौचालयों का कायाकल्प' },
      { en: 'Encouraging girls’ higher education with safe transport and support', hi: 'बालिकाओं की उच्च शिक्षा हेतु प्रोत्साहन और सुरक्षित आवागमन' },
      { en: 'Promoting digital literacy and competitive examination resources', hi: 'डिजिटल साक्षरता और प्रतियोगी परीक्षाओं के लिए अध्ययन सामग्री' },
    ],
    image: '/images/development/education.webp',
    tag: {
      en: 'Foundational Learning',
      hi: 'शिक्षा उन्नयन',
    },
  },
  {
    id: 'farmers',
    slug: 'farmers',
    title: {
      en: 'Agricultural Welfare & Tail-End Irrigation Support',
      hi: 'किसान कल्याण एवं टेल तक सिंचाई जल की सुनिश्चितता',
    },
    description: {
      en: 'Championing the rights and practical needs of farmers: reliable electricity for tube-wells, timely fertilizer availability, and desiltation of irrigation canals.',
      hi: 'किसानों के खेतों तक समय पर पानी, नहरों की सफाई, ट्यूबवेल हेतु निर्बाध बिजली और बीज-खाद की सुलभ उपलब्धता सुनिश्चित करना।',
    },
    keyInitiatives: [
      { en: 'Intensive canal cleaning drives to reach end-mile farmland', hi: 'नहरों की सिल्ट सफाई की निगरानी ताकि अंतिम छोर के खेत तक पानी पहुंचे' },
      { en: 'Dedicated assistance during procurement seasons at local mandis', hi: 'क्रय केंद्रों पर पारदर्शी तौल और किसानों के त्वरित भुगतान की निगरानी' },
      { en: 'Assisting smallholder farmers with modern horticultural techniques', hi: 'उद्यानिकी और आधुनिक कृषि तकनीकों के प्रति कृषकों को प्रोत्साहन' },
    ],
    image: '/images/development/farmer.webp',
    tag: {
      en: 'Agricultural Growth',
      hi: 'कृषि संवर्धन',
    },
  },
  {
    id: 'youth-employment',
    slug: 'youth-employment',
    title: {
      en: 'Youth Skill Development, Sports & Livelihood Opportunities',
      hi: 'युवा कौशल विकास, खेल प्रोत्साहन एवं स्वरोजगार',
    },
    description: {
      en: 'Channeling youth energy through localized vocational training, sports competitions, open gyms, and direct entrepreneurial mentorship.',
      hi: 'युवाओं के सर्वांगीण विकास के लिए खेल मैदान, ओपन जिम, कौशल विकास प्रशिक्षण और स्वरोजगार हेतु वित्तीय मार्गदर्शन।',
    },
    keyInitiatives: [
      { en: 'Organizing constituency-level rural cricket and athletics meets', hi: 'ग्रामीण प्रतिभाओं की पहचान हेतु खेल प्रतियोगिताओं का आयोजन' },
      { en: 'Facilitating skill development tie-ups with regional industries', hi: 'क्षेत्रीय उद्योगों और व्यावसायिक संस्थानों के साथ कौशल समन्वय' },
      { en: 'Mentorship drives for rural youths aspiring for police and defense services', hi: 'सेना व पुलिस भर्ती की तैयारी कर रहे युवाओं को अभ्यास व मार्गदर्शन' },
    ],
    image: '/images/updates/khel.jpg',
    tag: {
      en: 'Youth & Livelihood',
      hi: 'युवा सशक्तिकरण',
    },
  },
  {
    id: 'women-empowerment',
    slug: 'women-empowerment',
    title: {
      en: 'Women Self-Help Groups & Community Participation',
      hi: 'महिला स्वयं सहायता समूह एवं सामाजिक सहभागिता',
    },
    description: {
      en: 'Strengthening women’s self-help groups (SHGs) with micro-credit facilitation, market linkages for rural produce, and maternal healthcare awareness.',
      hi: 'मातृशक्ति के आर्थिक स्वावलंबन हेतु स्वयं सहायता समूहों को प्रोत्साहन, उत्पादों के विपणन में सहयोग और सम्मानजनक भागीदारी।',
    },
    keyInitiatives: [
      { en: 'Supporting women-led micro-enterprises and village handicrafts', hi: 'ग्रामीण लघु उद्यमों एवं हस्तशिल्प में महिलाओं का सहयोग' },
      { en: 'Comprehensive mother and child nutrition monitoring drives', hi: 'आंगनबाड़ी केंद्रों के माध्यम से मातृ एवं शिशु पोषण की सतत निगरानी' },
      { en: 'Safe public sanitation and community spaces for village women', hi: 'सार्वजनिक स्थानों पर स्वच्छता एवं सुरक्षित परिवेश का निर्माण' },
    ],
    image: '/images/development/women.png',
    tag: {
      en: 'Women Self-Reliance',
      hi: 'मातृशक्ति स्वावलंबन',
    },
  },
];
