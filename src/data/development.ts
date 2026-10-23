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
  hi: 'संस्कार · जनसेवा · विकास',
},
  heading: {
    en: 'Bhagwant Nagar: Sacred Heritage, Bright Future',
    hi: 'भगवंत नगर: समृद्ध परंपरा, उज्ज्वल भविष्य',
  },
 intro: {
  en: 'Bhagwant Nagar reflects our cultural heritage, rural life, and sense of community. From fertile fields to lively rural markets, our commitment is to bring better roads, clean drinking water, accessible healthcare, and basic civic amenities to every village and hamlet in the area.',
  hi: 'भगवंतनगर हमारी सांस्कृतिक विरासत, ग्रामीण जीवन और आपसी भाईचारे की पहचान है। उपजाऊ खेतों से लेकर जीवंत ग्रामीण बाजारों तक, हमारा संकल्प है कि क्षेत्र के हर गांव और मजरे तक बेहतर सड़कें, स्वच्छ पेयजल, सुलभ स्वास्थ्य सेवाएं और बुनियादी नागरिक सुविधाएं पहुंचें।',
},
  pillars: [
    {
      title: {
        en: 'Preserving Cultural Identity',
        hi: 'सांस्कृतिक धरोहर का संरक्षण',
      },
      description: {
        en: 'Protecting and nurturing the area’s historic sites, local fairs, and traditional harmony.',
        hi: 'क्षेत्र के ऐतिहासिक स्थलों, मेलों और पारंपरिक सद्भाव की रक्षा व संवर्धन।',
      },
    },
    {
      title: {
        en: 'Equitable Village Modernization',
        hi: 'संतुलित ग्रामीण आधुनिकीकरण',
      },
      description: {
        en: 'Empowering villages through the expansion of roads, primary schools, and solar energy.',
        hi: 'सड़कों, प्राथमिक विद्यालयों और सौर ऊर्जा के विस्तार से गांवों को सशक्त बनाना।',
      },
    },
    {
      title: {
        en: 'Empowering Next-Gen Aspirations',
        hi: 'युवा पीढ़ी की आकांक्षाओं को संबल',
      },
      description: {
        en: 'Providing rural youth with sports grounds, competitive exam preparation, and skills training.',
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
      en: 'Working to make primary healthcare accessible near every village and hamlet, ensure an uninterrupted supply of essential medicines, and strengthen safe maternity care.',
      hi: 'हर गांव और मजरे के समीप प्राथमिक स्वास्थ्य सेवाओं की उपलब्धता, आवश्यक दवाओं का निर्बाध वितरण और सुरक्षित मातृत्व सेवाओं की सुदृढ़ व्यवस्था।',
    },
    keyInitiatives: [
      { en: 'Expanding basic infrastructure at community health centers and primary health sub-centers', hi: 'सीएचसी और प्राथमिक स्वास्थ्य उपकेंद्रों में बुनियादी ढांचे का विस्तार' },
      { en: 'Regular free healthcare and eye-screening camps in rural areas', hi: 'ग्रामीण क्षेत्रों में नियमित निःशुल्क स्वास्थ्य व नेत्र परीक्षण शिविर' },
      { en: 'Ensuring a steady supply of essential and emergency life-saving medicines', hi: 'आवश्यक व आपातकालीन जीवनरक्षक दवाओं की निरंतर उपलब्धता' },
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
      en: 'Building and renovating all-weather paved roads connecting remote villages and hamlets to main roads, agricultural markets, and block headquarters.',
      hi: 'सुदूर गांवों व मजरों को मुख्य मार्गों, कृषि मंडियों और विकास खंड मुख्यालयों से जोड़ने वाली बारहमासी पक्की सड़कों का निर्माण व जीर्णोद्धार।',
    },
    keyInitiatives: [
      { en: 'Expanding quality link roads with drainage', hi: 'नाली निर्माण युक्त गुणवत्तापूर्ण संपर्क मार्गों का विस्तार' },
      { en: 'Widening and strengthening key commercial and transport routes', hi: 'प्रमुख व्यापारिक और आवागमन मार्गों का चौड़ीकरण व सुदृढ़ीकरण' },
      { en: 'Building culverts over seasonal drains to keep travel open during the rainy season', hi: 'बरसाती नालों पर पुलियों का निर्माण ताकि बारिश में आवागमन बाधित न हो' },
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
      en: 'Supporting a bright future for children by ensuring modern facilities, clean drinking water, smart classrooms, and sports facilities in rural schools.',
      hi: 'ग्रामीण विद्यालयों में आधुनिक सुविधाएं, स्वच्छ पेयजल, स्मार्ट कक्षाएं और खेलकूद की सुविधाएं सुनिश्चित कर बच्चों के उज्ज्वल भविष्य की नींव रखना।',
    },
    keyInitiatives: [
      { en: 'Improving furniture, boundary walls, and toilets in council schools', hi: 'परिषदीय विद्यालयों में फर्नीचर, चारदीवारी और शौचालयों का कायाकल्प' },
      { en: 'Encouraging girls to pursue higher education and supporting safe travel', hi: 'बालिकाओं की उच्च शिक्षा हेतु प्रोत्साहन और सुरक्षित आवागमन' },
      { en: 'Promoting digital literacy and providing study materials for competitive exams', hi: 'डिजिटल साक्षरता और प्रतियोगी परीक्षाओं के लिए अध्ययन सामग्री' },
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
    en: 'Farmer Welfare & Agricultural Support',
    hi: 'किसान कल्याण एवं कृषि सहायता',
  },
  description: {
    en: 'Working towards the welfare of farming families by promoting awareness of agricultural schemes, access to farming resources, modern agricultural practices, and support services that can help farmers improve their livelihoods.',
    hi: 'किसान परिवारों के कल्याण के लिए कृषि योजनाओं की जानकारी, खेती से जुड़े संसाधनों की उपलब्धता, आधुनिक कृषि पद्धतियों और सहायक सेवाओं के प्रति जागरूकता बढ़ाने की दिशा में प्रयास।',
  },
  keyInitiatives: [
    {
      en: 'Creating awareness about government agricultural schemes and farmer benefits',
      hi: 'सरकारी कृषि योजनाओं एवं किसान हितकारी सुविधाओं के प्रति जागरूकता',
    },
    {
      en: 'Encouraging access to quality seeds, fertilizers, and agricultural guidance',
      hi: 'उन्नत बीज, खाद एवं कृषि मार्गदर्शन की उपलब्धता के लिए प्रोत्साहन',
    },
    {
      en: 'Promoting modern farming techniques and sustainable agricultural practices',
      hi: 'आधुनिक कृषि तकनीकों एवं टिकाऊ खेती को बढ़ावा देना',
    },
  ],
  image: '/images/development/farmer.webp',
  tag: {
    en: 'Farmer Welfare',
    hi: 'किसान कल्याण',
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
    en: 'Supporting young people’s overall development through sports grounds, open gyms, skills training, and financial guidance for self-employment.',
      hi: 'युवाओं के सर्वांगीण विकास के लिए खेल मैदान, ओपन जिम, कौशल विकास प्रशिक्षण और स्वरोजगार हेतु वित्तीय मार्गदर्शन।',
    },
    keyInitiatives: [
      { en: 'Organizing sports competitions to identify rural talent', hi: 'ग्रामीण प्रतिभाओं की पहचान हेतु खेल प्रतियोगिताओं का आयोजन' },
      { en: 'Coordinating skills training with regional industries and vocational institutes', hi: 'क्षेत्रीय उद्योगों और व्यावसायिक संस्थानों के साथ कौशल समन्वय' },
      { en: 'Providing practice and guidance to young people preparing for army and police recruitment', hi: 'सेना व पुलिस भर्ती की तैयारी कर रहे युवाओं को अभ्यास व मार्गदर्शन' },
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
    en: 'Women Empowerment & Digital Awareness',
    hi: 'महिला सशक्तिकरण एवं डिजिटल जागरूकता',
  },
  description: {
    en: 'Encouraging women to become more self-reliant through digital literacy, skill development, awareness of government welfare schemes, and opportunities for participation in community and economic activities.',
    hi: 'डिजिटल साक्षरता, कौशल विकास, सरकारी कल्याणकारी योजनाओं की जानकारी तथा सामाजिक और आर्थिक गतिविधियों में भागीदारी के अवसरों के माध्यम से महिलाओं को आत्मनिर्भर बनाने की दिशा में प्रयास।',
  },
  keyInitiatives: [
    {
      en: 'Promoting digital literacy and access to online services among women',
      hi: 'महिलाओं के बीच डिजिटल साक्षरता एवं ऑनलाइन सेवाओं के उपयोग को बढ़ावा देना',
    },
    {
      en: 'Encouraging skill development, self-help groups, and women-led enterprises',
      hi: 'कौशल विकास, स्वयं सहायता समूहों एवं महिला उद्यमिता को प्रोत्साहित करना',
    },
    {
      en: 'Creating awareness about women-focused government schemes and welfare services',
      hi: 'महिला हितकारी सरकारी योजनाओं एवं कल्याणकारी सेवाओं के प्रति जागरूकता बढ़ाना',
    },
  ],
  image: '/images/development/women.webp',
  tag: {
    en: 'Women Empowerment',
    hi: 'महिला सशक्तिकरण',
  },
},

];
