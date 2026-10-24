import type { LocalizedString } from '@/types';

/** Content for the redesigned Home / About / Journey pages. Hindi + English. */

export const storyHero = {
  eyebrow: {
    en: 'Chairman, Bhagwant Nagar Nagar Panchayat',
    hi: 'अध्यक्ष, नगर पंचायत भगवंत नगर',
  },
  roles: {
    en: 'Public Representative · Entrepreneur · Socially Engaged Citizen',
    hi: 'जनप्रतिनिधि · उद्यमी · सामाजिक रूप से सक्रिय नागरिक',
  },
  tagline: {
    en: 'From Struggle to Service. From Service to Public Responsibility.',
    hi: 'संघर्ष से सेवा तक। सेवा से जन-दायित्व तक।',
  },
  lines: [
    { en: 'Rooted in Bhagwant Nagar.', hi: 'भगवंत नगर की माटी से जुड़े।' },
    { en: 'Shaped by Struggle.', hi: 'संघर्ष से गढ़े गए।' },
    { en: 'Committed to Public Service.', hi: 'जनसेवा के लिए समर्पित।' },
  ] as LocalizedString[],
  description: {
    en: 'From difficult beginnings to entrepreneurship, from personal struggle to public responsibility — Ashish Shukla’s life has passed through realities experienced by countless ordinary families.',
    hi: 'कठिन शुरुआत से उद्यमिता तक, निजी संघर्ष से जन-दायित्व तक — आशीष शुक्ला का जीवन उन्हीं वास्तविकताओं से गुज़रा है, जिनसे अनगिनत साधारण परिवार गुज़रते हैं।',
  },
  buttons: [
    { label: { en: 'Discover His Journey', hi: 'उनकी यात्रा जानें' }, path: '/journey', primary: true },
    { label: { en: 'Explore Public Work', hi: 'जनसेवा देखें' }, path: '/public-life', primary: false },
    { label: { en: 'Vision for Bhagwant Nagar', hi: 'भगवंत नगर का विज़न' }, path: '/development', primary: false },
    { label: { en: 'Share a Public Issue', hi: 'अपनी समस्या बताएं' }, path: '/contact', primary: false },
  ],
  image: '/images/hero/about.png',
};

export const marqueeText: LocalizedString = {
  en: 'Work · Responsibility · Public Service · Bhagwant Nagar · ',
  hi: 'परिश्रम · दायित्व · जनसेवा · भगवंत नगर · ',
};

export const shortBio: LocalizedString = {
  en: 'Ashish Shukla’s journey reflects hard work, experience, and a sense of responsibility toward society. As Chairman of Bhagwantnagar Nagar Panchayat, his purpose is to understand residents’ expectations, prioritize local issues, and keep working toward better basic amenities and development in the area.',
  hi: 'आशीष शुक्ला की यात्रा परिश्रम, अनुभव और समाज के प्रति जिम्मेदारी की भावना को दर्शाती है। नगर पंचायत भगवंतनगर के अध्यक्ष के रूप में उनका उद्देश्य नागरिकों की अपेक्षाओं को समझना, स्थानीय समस्याओं को प्राथमिकता देना और क्षेत्र में बेहतर बुनियादी सुविधाओं एवं विकास के लिए निरंतर प्रयास करना है।',
};

export interface Chapter {
  id: string;
  kicker: LocalizedString;
  title: LocalizedString;
  body: LocalizedString[];
  quote?: LocalizedString;
  image?: string;
}

/** The narrative chapters, shown on the Home page and in the Journey page. */
export const chapters: Chapter[] = [
  {
    id: 'beginning',
    kicker: { en: '', hi: '' },
    title: { en: 'A Journey That Began with His Roots', hi: 'जड़ों से शुरू हुआ एक सफर' },
    body: [
      {
        en: 'Ashish Shukla’s story begins with his connection to the soil, surroundings, and people of Bhagwant Nagar. Understanding local ways of life and the needs of ordinary people up close has been an important part of his journey.',
        hi: 'आशीष शुक्ला की कहानी भगवंतनगर की मिट्टी, स्थानीय परिवेश और लोगों से जुड़ाव से शुरू होती है। अपने क्षेत्र की जीवनशैली और आम लोगों की जरूरतों को करीब से समझना उनकी यात्रा का एक महत्वपूर्ण हिस्सा रहा।',
      },
      {
        en: 'The desire to move forward, a commitment to hard work, and a willingness to accept new responsibilities gave direction to this journey. His connection to Bhagwant Nagar became an important part of his identity and outlook on public service.',
        hi: 'जीवन में आगे बढ़ने की प्रेरणा, मेहनत के प्रति प्रतिबद्धता और नई जिम्मेदारियों को स्वीकार करने की भावना ने इस सफर को दिशा दी। भगवंतनगर से जुड़ाव उनकी पहचान और जनसेवा के प्रति दृष्टिकोण का अहम हिस्सा बना।',
      },
    ],
    quote: {
      en: 'The true strength of a journey lies not in its beginning, but in staying connected to one’s values and purpose.',
      hi: 'सफर की असली ताकत शुरुआत में नहीं, बल्कि अपने मूल्यों और उद्देश्य से जुड़े रहने में होती है।',
    },
    image: '/images/journey/ashish1.jpg',
  },
  {
    id: 'kanpur',
    kicker: { en: '', hi: '' },
    title: { en: 'Lessons Learned Through Hard Work', hi: 'मेहनत से मिली सीख' },
    body: [
      {
        en: 'Early experiences in life taught him the value of hard work, responsibility, and working together with people. They showed him that every responsibility matters and that consistent effort creates a way forward.',
        hi: 'जीवन के शुरुआती अनुभवों ने मेहनत, जिम्मेदारी और लोगों के साथ मिलकर काम करने के महत्व को समझने का अवसर दिया। इन अनुभवों से यह सीख मिली कि हर जिम्मेदारी महत्वपूर्ण होती है और निरंतर प्रयास से आगे बढ़ने का रास्ता बनता है।',
      },
    ],
    quote: {
      en: 'Every experience brings a new lesson, and every responsibility creates an opportunity to move forward.',
      hi: 'हर अनुभव एक नई सीख देता है, और हर जिम्मेदारी आगे बढ़ने का अवसर बनती है।',
    },
    image: '/images/journey/ashish2.jpg',
  },
  {
    id: 'business',
    kicker: { en: '', hi: '' },
    title: { en: 'A New Direction Through Experience', hi: 'अनुभव से मिली नई दिशा' },
    body: [
      {
        en: 'Steady effort, experience and the trust he built with people opened new opportunities. Over time, he expanded his field of work and developed a professional identity in real estate.',
        hi: 'लगातार मेहनत, अनुभव और लोगों के साथ बने विश्वास ने उनके लिए नए अवसरों के रास्ते खोले। समय के साथ उन्होंने अपने कार्यक्षेत्र का विस्तार किया और रियल एस्टेट के क्षेत्र में अपनी व्यावसायिक पहचान विकसित की।',
      },
      {
        en: 'His work experience across Kanpur and Lucknow became an important part of his professional journey. The experience he gained during this time encouraged him to understand new responsibilities and move forward.',
        hi: 'कानपुर से लखनऊ तक का उनका कार्य-अनुभव उनके पेशेवर सफर का महत्वपूर्ण हिस्सा बना। इस दौरान मिले अनुभवों ने उन्हें नई जिम्मेदारियों को समझने और आगे बढ़ने की प्रेरणा दी।',
      },
    ],
    image: '/images/public-life/a2.jpg',
  },
  {
    id: 'roots',
    kicker: { en: '', hi: '' },
    title: { en: 'From Success to Service', hi: 'सफलता से सेवा तक' },
    body: [
      {
        en: 'Alongside his professional experience, he remained connected to Bhagwantnagar. His desire to stay close to his area and its people helped him better understand local needs and residents’ expectations.',
        hi: 'व्यावसायिक अनुभवों के साथ भगवंतनगर से उनका जुड़ाव बना रहा। अपने क्षेत्र और यहाँ के लोगों से जुड़े रहने की भावना ने उन्हें स्थानीय जरूरतों और नागरिकों की अपेक्षाओं को और करीब से समझने का अवसर दिया।',
      },
      {
        en: 'Over time, active involvement in public-interest issues and dialogue with people became an important part of his public journey. This connection became the foundation for his commitment to public service and Bhagwantnagar’s development.',
        hi: 'समय के साथ जनहित के मुद्दों पर सक्रिय भागीदारी और लोगों से संवाद उनकी सार्वजनिक यात्रा का महत्वपूर्ण हिस्सा बने। यही जुड़ाव आगे चलकर जनसेवा और भगवंतनगर के विकास के प्रति उनकी जिम्मेदारी का आधार बना।',
      },
    ],
    quote: {
      en: 'A connection to one’s roots inspires a person to find ways to serve society.',
      hi: 'अपनी मिट्टी से जुड़ाव ही वह प्रेरणा है, जो व्यक्ति को समाज के लिए कुछ करने की राह दिखाती है।',
    },
  },
  {
    id: 'return',
    kicker: { en: '', hi: '' },
    title: { en: 'The return to Bhagwant Nagar', hi: 'भगवंत नगर वापसी' },
    body: [
      {
        en: 'Professional opportunities had taken Ashish outside Bhagwant Nagar. Purpose brought him back. He spent more time among residents, understood their concerns, responded to individual difficulties and took part in community life.',
        hi: 'पेशेवर अवसर आशीष को भगवंत नगर से बाहर ले गए थे; उद्देश्य उन्हें वापस ले आया। उन्होंने स्थानीय लोगों के बीच अधिक समय बिताया, उनकी चिंताएँ समझीं, व्यक्तिगत कठिनाइयों में साथ दिया और सामुदायिक जीवन में भाग लिया।',
      },
      {
        en: 'As his involvement grew, so did expectations. He entered formal local politics, contested the leadership of Bhagwant Nagar Nagar Panchayat — and a new chapter began.',
        hi: 'जैसे-जैसे सक्रियता बढ़ी, लोगों की अपेक्षाएँ भी बढ़ीं। वे औपचारिक स्थानीय राजनीति में आए, नगर पंचायत भगवंत नगर के नेतृत्व के लिए चुनाव लड़ा — और एक नया अध्याय शुरू हुआ।',
      },
    ],
    image: '/images/journey/ashish4.jpg',
  },

];

export interface TimelineStop {
  title: LocalizedString;
  text: LocalizedString;
}

/** Animated journey path. */
export const timelineStops: TimelineStop[] = [
  {
    title: { en: 'Bhagwant Nagar — Connected to the Roots', hi: 'भगवंतनगर — जड़ों से जुड़ाव' },
    text: {
      en: 'Connection with the local way of life and the people of Bhagwant Nagar laid the foundation for understanding the needs of the area. Closeness to the local surroundings and the lives of citizens shaped the approach to public service.',
      hi: 'भगवंतनगर की स्थानीय जीवनशैली और लोगों से जुड़ाव ने क्षेत्र की जरूरतों को समझने की नींव रखी। स्थानीय परिवेश और नागरिकों के जीवन से जुड़ाव ने जनसेवा के प्रति दृष्टिकोण को आकार दिया।',
    },
  },
  {
    title: { en: 'Early Struggles — Learning from Experience', hi: 'शुरुआती संघर्ष — अनुभव से सीख' },
    text: {
      en: 'Early life experiences taught the importance of responsibility, hard work and working together with people. These experiences taught how to understand challenges, keep making steady efforts and take responsibilities seriously.',
      hi: 'जीवन के शुरुआती अनुभवों से जिम्मेदारी, मेहनत और लोगों के साथ मिलकर काम करने का महत्व सीखा। इन अनुभवों ने चुनौतियों को समझने, निरंतर प्रयास करने और जिम्मेदारियों को गंभीरता से निभाने की सीख दी।',
    },
  },
  {
    title: { en: 'Public Service — Among the People', hi: 'जनसेवा — लोगों के बीच' },
    text: {
      en: 'He moved ahead with a spirit of speaking with local citizens, understanding their problems and working towards solutions. Listening to people’s needs and paying attention to issues of the area’s development is an important part of this journey of public service.',
      hi: 'स्थानीय नागरिकों से संवाद, उनकी समस्याओं को समझने और उनके समाधान की दिशा में प्रयास करने की भावना के साथ आगे बढ़े। लोगों की जरूरतों को सुनना और क्षेत्र के विकास से जुड़े मुद्दों पर ध्यान देना जनसेवा के इस सफर का महत्वपूर्ण हिस्सा है।',
    },
  },
  {
    title: { en: 'Nagar Panchayat Chairman — A New Responsibility', hi: 'नगर पंचायत अध्यक्ष — नई जिम्मेदारी' },
    text: {
      en: 'Carrying out responsibilities related to the development of Bhagwant Nagar and civic amenities after being elected Nagar Panchayat Chairman in 2023. In this role, attention to civic issues such as sanitation, roads, drainage and other basic amenities is important.',
      hi: 'वर्ष 2023 में नगर पंचायत अध्यक्ष निर्वाचित होने के बाद भगवंतनगर के विकास और नागरिक सुविधाओं से जुड़ी जिम्मेदारियों का निर्वहन। इस भूमिका में स्वच्छता, सड़क, जल निकासी और अन्य बुनियादी सुविधाओं से जुड़े नागरिक मुद्दों पर ध्यान देना महत्वपूर्ण है।',
    },
  },
];

export const governance = {
  eyebrow: { en: 'Chairman, Nagar Panchayat', hi: 'अध्यक्ष, नगर पंचायत' },
  title: {
    en: 'Public office begins where personal convenience ends',
    hi: 'जन-पद वहाँ से शुरू होता है, जहाँ व्यक्तिगत सुविधा समाप्त होती है',
  },
  intro: {
    en: 'For an elected representative the real test is everyday accessibility: Can citizens reach the office? Does someone listen? Does the matter reach the right department? Is there follow-up?',
    hi: 'निर्वाचित प्रतिनिधि की असली परीक्षा रोज़मर्रा की सुलभता है: क्या नागरिक कार्यालय तक पहुँच सकते हैं? क्या कोई सुनता है? क्या मामला सही विभाग तक पहुँचता है? क्या फ़ॉलो-अप होता है?',
  },
  steps: [
    { en: 'See the issue.', hi: 'समस्या को देखें।' },
    { en: 'Understand the issue.', hi: 'समस्या को समझें।' },
    { en: 'Take it to the responsible system.', hi: 'उसे ज़िम्मेदार तंत्र तक पहुँचाएँ।' },
    { en: 'Follow its progress.', hi: 'उसकी प्रगति पर नज़र रखें।' },
  ] as LocalizedString[],
  areas: [
    { icon: 'road', title: { en: 'Roads & Streets', hi: 'सड़क एवं गलियाँ' } },
    { icon: 'lightbulb', title: { en: 'Street Lighting', hi: 'स्ट्रीट लाइट' } },
    { icon: 'droplets', title: { en: 'Drainage & Water', hi: 'नाली एवं जल निकासी' } },
    { icon: 'trash', title: { en: 'Sanitation', hi: 'स्वच्छता' } },
    { icon: 'glass', title: { en: 'Drinking Water', hi: 'पेयजल' } },
    { icon: 'trees', title: { en: 'Public Spaces', hi: 'सार्वजनिक स्थल' } },
  ] as { icon: string; title: LocalizedString }[],
  note: {
    en: 'Verified figures from Nagar Panchayat records and government sanctions will be published here as they are documented.',
    hi: 'नगर पंचायत अभिलेखों और सरकारी स्वीकृतियों के सत्यापित आँकड़े दस्तावेज़ीकरण के बाद यहाँ प्रकाशित किए जाएँगे।',
  },
};

export const priorities = {
  eyebrow: { en: 'Next Phase', hi: 'अगला चरण' },
  title: { en: 'Bhagwant Nagar: Priorities for the Next Phase', hi: 'भगवंत नगर: अगले चरण की प्राथमिकताएँ' },
  intro: {
    en: 'A scheme may be designed in Lucknow or Delhi, but its success is determined in a village, ward, school, health centre, road, field or household.',
    hi: 'कोई योजना लखनऊ या दिल्ली में बन सकती है, पर उसकी सफलता किसी गाँव, वार्ड, विद्यालय, स्वास्थ्य केंद्र, सड़क, खेत या घर में तय होती है।',
  },
  items: [
    { icon: 'route', title: { en: 'Connected Bhagwant Nagar', hi: 'जुड़ा हुआ भगवंत नगर' }, text: { en: 'Village connectivity, link roads, road safety, bridges and crossings.', hi: 'गाँवों की कनेक्टिविटी, संपर्क मार्ग, सड़क सुरक्षा, पुल और क्रॉसिंग।' } },
    { icon: 'graduation', title: { en: 'Youth Opportunity Mission', hi: 'युवा अवसर मिशन' }, text: { en: 'Career counselling, skills, digital learning, exam guidance, sports.', hi: 'करियर परामर्श, कौशल, डिजिटल शिक्षा, परीक्षा मार्गदर्शन, खेल।' } },
    { icon: 'heart', title: { en: 'Healthcare Within Reach', hi: 'पहुँच में स्वास्थ्य सेवा' }, text: { en: 'Primary care, maternal health, health schemes, camps, emergency coordination.', hi: 'प्राथमिक चिकित्सा, मातृ-शिशु स्वास्थ्य, सरकारी योजनाएँ, शिविर, आपात समन्वय।' } },
    { icon: 'wheat', title: { en: 'Stronger Rural Economy', hi: 'सशक्त ग्रामीण अर्थव्यवस्था' }, text: { en: 'Irrigation, market access, storage, farmer schemes, technology.', hi: 'सिंचाई, बाज़ार तक पहुँच, भंडारण, किसान योजनाएँ, तकनीक।' } },
    { icon: 'users', title: { en: 'Women-led Local Growth', hi: 'महिला-नेतृत्व में स्थानीय विकास' }, text: { en: 'Self-help groups, skills, micro-enterprise, digital and financial literacy.', hi: 'स्वयं सहायता समूह, कौशल, सूक्ष्म उद्यम, डिजिटल एवं वित्तीय साक्षरता।' } },
    { icon: 'store', title: { en: 'Local Enterprise & Employment', hi: 'स्थानीय उद्यम एवं रोज़गार' }, text: { en: 'MSME awareness, local entrepreneurship, skill-to-job connections.', hi: 'MSME जागरूकता, स्थानीय उद्यमिता, कौशल से रोज़गार तक।' } },
    { icon: 'landmark', title: { en: 'Accessible Public Representation', hi: 'सुलभ जन-प्रतिनिधित्व' }, text: { en: 'Physical and digital channels for grievances, suggestions and issue tracking.', hi: 'शिकायतों, सुझावों और समस्या-ट्रैकिंग के लिए भौतिक व डिजिटल माध्यम।' } },
  ] as { icon: string; title: LocalizedString; text: LocalizedString }[],
};

export const nextChapter = {
  eyebrow: { en: '', hi: '' },
  title: {
    en: 'Public Trust, Public Service, and Bhagwantnagar’s Development',
    hi: 'जनविश्वास, जनसेवा और भगवंतनगर का विकास',
  },
  text: {
    en: 'As Chairman of Bhagwantnagar Nagar Panchayat, Ashish Shukla works to understand residents’ expectations and prioritize the area’s basic needs. Through continued efforts toward better roads, sanitation, drainage, and essential civic services, he aims to advance Bhagwantnagar’s development with public participation.',
    hi: 'नगर पंचायत भगवंतनगर के अध्यक्ष के रूप में आशीष शुक्ला का प्रयास नागरिकों की अपेक्षाओं को समझना और क्षेत्र की बुनियादी आवश्यकताओं को प्राथमिकता देना है। बेहतर सड़कें, स्वच्छता, जल निकासी और आवश्यक नागरिक सुविधाओं की दिशा में निरंतर प्रयासों के साथ उनका लक्ष्य भगवंतनगर के विकास को जनभागीदारी से आगे बढ़ाना है।',
  },
};

export const closing = {
  eyebrow: { en: '', hi: '' },
  lines: [
    { en: 'His connection with Bhagwantnagar, the people’s trust, and a sense of responsibility for development are the foundations of his public journey.', hi: 'भगवंतनगर से जुड़ाव, जनता का विश्वास और विकास के प्रति जिम्मेदारी — यही उनकी सार्वजनिक यात्रा के मूल आधार हैं।' },
    { en: 'The purpose of this journey is to listen to every resident, understand local needs, and work toward better basic amenities.', hi: 'हर नागरिक की बात सुनना, स्थानीय जरूरतों को समझना और बेहतर बुनियादी सुविधाओं की दिशा में प्रयास करना इस यात्रा का उद्देश्य है।' },
  ] as LocalizedString[],
  final: [
    { en: 'Public service. Public trust. Continued effort toward development.', hi: 'जनसेवा। जनविश्वास। विकास की ओर निरंतर प्रयास।' },
  ] as LocalizedString[],
  place: { en: 'For Bhagwantnagar, with a commitment to public service', hi: 'भगवंतनगर के लिए, जनसेवा के संकल्प के साथ' },
  cta: { en: 'Share a Public Issue', hi: 'अपनी समस्या बताएं' },
};

/** About page */
export const aboutPage = {
  eyebrow: { en: '', hi: '' },
  title: { en: 'A life built, not inherited', hi: 'गढ़ा हुआ जीवन, विरासत में मिला नहीं' },
  who: {
    en: 'Ashish Shukla is a public representative, entrepreneur and community figure associated with Bhagwant Nagar in Unnao district, Uttar Pradesh. There was no established business waiting for him, no political office, no comfortable path laid out in advance — only a family facing economic limitations and a young boy learning very early that survival required work.',
    hi: 'आशीष शुक्ला उन्नाव ज़िले (उत्तर प्रदेश) के भगवंत नगर से जुड़े जनप्रतिनिधि, उद्यमी और सामाजिक व्यक्तित्व हैं। उनके लिए न कोई स्थापित कारोबार इंतज़ार कर रहा था, न कोई राजनीतिक पद, न कोई आसान रास्ता — बस आर्थिक सीमाओं से जूझता परिवार था और एक बालक, जो बहुत जल्दी सीख गया कि जीवित रहने के लिए काम करना पड़ता है।',
  },
  blocks: [
    {
      id: 'humble',
      icon: 'sprout',
      title: { en: 'Humble beginnings', hi: 'साधारण शुरुआत, बड़े सपने' },
      text: {
        en: 'Hard work, self-confidence, and the determination to move forward gave Ashish Shukla’s life a new direction. His early experiences helped him understand people’s expectations and inspired him to keep working toward a better future.',
        hi: 'मेहनत, आत्मविश्वास और आगे बढ़ने की सोच ने अशिष शुक्ला के जीवन को नई दिशा दी। शुरुआती अनुभवों ने उन्हें लोगों की अपेक्षाओं को समझने और बेहतर भविष्य के लिए निरंतर प्रयास करने की प्रेरणा दी।',
      },
    },
    {
      id: 'kanpur',
      icon: 'train',
      title: { en: 'The journey to Kanpur', hi: 'कानपुर से मिली प्रेरणा' },
      text: {
        en: 'Kanpur’s social and business environment gave him the opportunity to understand hard work, discipline, and the varied needs of everyday life. These experiences strengthened his sense of social responsibility.',
        hi: 'कानपुर के सामाजिक और व्यावसायिक परिवेश ने उन्हें मेहनत, अनुशासन और जनजीवन की विविध आवश्यकताओं को समझने का अवसर दिया। इन अनुभवों ने समाज के प्रति उनकी सोच और जिम्मेदारी के भाव को मजबूत किया।',
      },
    },
    {
      id: 'business',
      icon: 'briefcase',
      title: { en: 'The business journey', hi: 'व्यवसाय से नेतृत्व तक' },
      text: {
        en: 'His business experience helped him develop skills in planning, management, decision-making, and recognising new opportunities. He draws on that experience to engage positively with social development and people’s aspirations.',
        hi: 'व्यावसायिक अनुभव ने उन्हें योजना, प्रबंधन, निर्णय लेने और नए अवसरों को पहचानने की समझ दी। इसी अनुभव के आधार पर वे समाज के विकास और लोगों की आकांक्षाओं से जुड़े विषयों पर सकारात्मक सोच के साथ आगे बढ़ते हैं।',
      },
    },
    {
      id: 'responsibility',
      icon: 'handshake',
      title: { en: 'Success and social responsibility', hi: 'जनसेवा और सामाजिक प्रतिबद्धता' },
      text: {
        en: 'Responsibility toward society, dialogue with people, and understanding local needs are important parts of his public role. He aims to prioritise matters of public interest and contribute to positive change.',
        hi: 'समाज के प्रति जिम्मेदारी, लोगों से संवाद और क्षेत्र की आवश्यकताओं को समझना उनकी सार्वजनिक भूमिका के महत्वपूर्ण पहलू हैं। उनका उद्देश्य जनहित के मुद्दों को प्राथमिकता देना और सकारात्मक बदलाव की दिशा में योगदान करना है।',
      },
    },
  ],
  place: {
    title: { en: 'His connection with Bhagwant Nagar', hi: 'भगवंत नगर से उनका जुड़ाव' },
    text: {
      en: 'Some places are simply where people live; others become part of their lives and stay with them wherever they go. For Ashish Shukla, Bhagwant Nagar is such a place. His childhood memories are rooted here, his family values helped shape his character, and the struggles of his early life taught him the importance of hard work, patience, and responsibility.\n\nAs he moved forward and explored new possibilities, he learned from many different experiences. Over time, he became increasingly aware that personal success is truly meaningful when it also benefits one’s community and birthplace. For him, Bhagwant Nagar is more than a place: it is an emotional bond with his identity, his people, and his roots.',
      hi: 'कुछ जगहें ऐसी होती हैं जहाँ लोग केवल रहते हैं, और कुछ ऐसी होती हैं जो जीवन का हिस्सा बनकर हमेशा उनके साथ चलती हैं। भगवंत नगर आशीष शुक्ला के लिए ऐसी ही जगह है—जहाँ उनके बचपन की यादें जुड़ी हैं, परिवार के संस्कारों ने उनके व्यक्तित्व को आकार दिया और जीवन के शुरुआती संघर्षों ने उन्हें मेहनत, धैर्य और जिम्मेदारी का महत्व सिखाया।\n\nजीवन में आगे बढ़ने और अपने लिए नई संभावनाएँ तलाशने के दौरान उन्होंने अलग-अलग अनुभवों से बहुत कुछ सीखा। लेकिन समय के साथ यह एहसास और गहरा होता गया कि व्यक्तिगत सफलता का वास्तविक अर्थ तभी पूरा होता है, जब उसका लाभ अपने समाज और अपनी जन्मभूमि तक भी पहुँचे। उनके लिए भगवंत नगर केवल एक स्थान नहीं, बल्कि अपनी पहचान, अपने लोगों और अपनी जड़ों से जुड़ा एक भावनात्मक रिश्ता है।',
    },
  },
  bioTitle: { en: '', hi: '' },
  bio: [
    {
      en: 'Ashish Shukla is the chairman of Bhagwantnagar Nagar Panchayat in Unnao district, Uttar Pradesh. As an elected representative associated with the Bharatiya Janata Party, his public life focuses on engaging with local residents, understanding public concerns, and carrying out responsibilities related to the area’s development.',
      hi: 'आशीष शुक्ला उत्तर प्रदेश के उन्नाव जनपद की नगर पंचायत भगवंतनगर के अध्यक्ष हैं। भारतीय जनता पार्टी से जुड़े जनप्रतिनिधि के रूप में उनका सार्वजनिक जीवन स्थानीय नागरिकों से संवाद, जनसमस्याओं को समझने और क्षेत्र के विकास से जुड़ी जिम्मेदारियों पर केंद्रित है।',
    },
    {
      en: 'He believes a public representative’s role extends beyond administrative duties: listening to citizens, understanding their needs, and working toward solutions to their problems are equally important.',
      hi: 'उनका मानना है कि जनप्रतिनिधि की भूमिका केवल प्रशासनिक जिम्मेदारियों तक सीमित नहीं होती, बल्कि नागरिकों की बात सुनना, उनकी जरूरतों को समझना और समस्याओं के समाधान की दिशा में प्रयास करना भी उतना ही महत्वपूर्ण है।',
    },
    {
      en: 'Better roads, sanitation, drainage, electricity, and basic civic amenities are key local development priorities in Bhagwantnagar. A responsible approach to these priorities and ongoing dialogue with residents are important parts of his public role.',
      hi: 'भगवंतनगर में बेहतर सड़कें, स्वच्छता, जल निकासी, बिजली और बुनियादी नागरिक सुविधाएँ स्थानीय विकास के महत्वपूर्ण विषय हैं। इन प्राथमिकताओं के प्रति जिम्मेदार दृष्टिकोण और जनता से निरंतर संवाद उनकी सार्वजनिक भूमिका का अहम हिस्सा है।',
    },
  ] as LocalizedString[],
  // disclaimer: {
  //   en: 'Note: Ashish Shukla has expressed an aspiration to seek an opportunity. No official party candidature has been announced.',
  //   hi: 'नोट: आशीष शुक्ला ने अवसर चाहने की आकांक्षा व्यक्त की है। पार्टी द्वारा कोई आधिकारिक उम्मीदवारी घोषित नहीं की गई है।',
  // },
};

/** Journey page */
export const journeyPage = {
  eyebrow: { en: '', hi: '' },
  title: { en: 'From a Commitment to Public Service to Leadership', hi: 'जनसेवा के संकल्प से नेतृत्व तक' },
  intro: {
    en: 'Ashish Shukla’s public journey centres on engaging with residents, understanding their concerns, and remaining committed to Bhagwantnagar’s development. As Nagar Panchayat Chairman, he aims to prioritise local needs and work continuously on matters of public interest.',
    hi: 'आशीष शुक्ला की सार्वजनिक यात्रा जनसंपर्क, नागरिकों की समस्याओं को समझने और भगवंतनगर के विकास के प्रति प्रतिबद्धता पर केंद्रित है। नगर पंचायत अध्यक्ष के रूप में उनका प्रयास स्थानीय आवश्यकताओं को प्राथमिकता देना और जनहित से जुड़े विषयों पर निरंतर कार्य करना है।',
  },
  extra: [
    {
      kicker: { en: 'Electoral Public Life', hi: 'निर्वाचित जन-जीवन' },
      title: { en: 'Entering electoral public life', hi: 'चुनावी जन-जीवन में प्रवेश' },
      text: {
        en: 'Until then he had been responsible for his own decisions. Public office would make him accountable for decisions affecting thousands. He accepted that responsibility and was elected Chairman of Bhagwant Nagar Nagar Panchayat.',
        hi: 'तब तक वे केवल अपने निर्णयों के लिए उत्तरदायी थे। जन-पद उन्हें हज़ारों लोगों को प्रभावित करने वाले निर्णयों के लिए जवाबदेह बनाने वाला था। उन्होंने यह दायित्व स्वीकार किया और नगर पंचायत भगवंत नगर के अध्यक्ष निर्वाचित हुए।',
      },
    },
    {
      kicker: { en: 'Leading the Nagar Panchayat', hi: 'नगर पंचायत का नेतृत्व' },
      title: { en: 'Governance is experienced at street level', hi: 'शासन गली-मोहल्ले में महसूस होता है' },
      text: {
        en: 'Development is rarely one large project. It is hundreds of everyday problems — a damaged road, a blocked drain, an unlit street, waste collection, water supply, a citizen seeking a certificate, a neighbourhood waiting for attention.',
        hi: 'विकास शायद ही कभी एक बड़ी परियोजना होता है। यह रोज़मर्रा की सैकड़ों समस्याएँ हैं — टूटी सड़क, जाम नाली, अँधेरी गली, कचरा उठान, जल आपूर्ति, प्रमाणपत्र के लिए आया नागरिक, ध्यान की प्रतीक्षा करता मोहल्ला।',
      },
    },
    {
      kicker: { en: 'Towards a Broader Role', hi: 'व्यापक भूमिका की ओर' },
      title: { en: 'Not an end point. A larger responsibility.', hi: 'अंत नहीं। एक बड़ा दायित्व।' },
      text: {
        en: 'After social engagement, business and municipal administration, Ashish is looking toward a broader responsibility — seeking an opportunity to serve the wider Bhagwant Nagar Assembly constituency through the Bharatiya Janata Party.',
        hi: 'सामाजिक सहभागिता, व्यवसाय और नगर प्रशासन के बाद आशीष अब व्यापक दायित्व की ओर देख रहे हैं — भारतीय जनता पार्टी के माध्यम से व्यापक भगवंत नगर विधानसभा क्षेत्र की सेवा का अवसर चाहते हैं।',
      },
    },
  ],
};

/* ───────── Editorial redesign additions ───────── */

export const homeStory = {
  eyebrow: { en: '', hi: '' },
  title: { en: 'From struggle to service — a life built, not inherited', hi: 'संघर्ष से सेवा तक — गढ़ा हुआ जीवन, विरासत में मिला नहीं' },
  accent: { en: 'built, not inherited', hi: 'गढ़ा हुआ जीवन' },
  link: { en: 'Read the life journey', hi: 'जीवन यात्रा पढ़ें' },
  image: '/images/hero/about.png',
};

export const timelineHead = {
  eyebrow: { en: '', hi: '' },
  title: { en: 'From Bhagwantnagar to public service', hi: 'भगवंतनगर से जनसेवा तक का सफर' },
  text: {
    en: 'A journey shaped by a bond with home, lessons from life, and a commitment to serve and support the development of Bhagwantnagar.',
    hi: 'अपनी मिट्टी से जुड़ाव, जीवन के अनुभवों से मिली सीख और जनसेवा के संकल्प के साथ भगवंतनगर के विकास की दिशा में आगे बढ़ती एक प्रेरणादायक यात्रा।',
  },
};

export const serviceCards = {
  eyebrow: { en: '', hi: '' },
  title: { en: 'Service that begins at the doorstep', hi: 'सेवा, जो चौखट से शुरू होती है' },
  accent: { en: 'at the doorstep', hi: 'चौखट से' },
  // text: {
  //   en: 'Roads, water, drainage, lighting, sanitation, pensions, housing schemes — the everyday things that decide whether governance works.',
  //   hi: 'सड़क, पानी, नाली, रोशनी, स्वच्छता, पेंशन, आवास योजनाएँ — वे रोज़मर्रा की बातें, जो तय करती हैं कि शासन काम कर रहा है या नहीं।',
  // },
  items: [
    { image: '/images/gallery/ashish1.jpg', title: { en: 'Janta Darbar', hi: 'जनता दरबार' }, text: { en: 'Elders, women, and young people share their concerns directly. They are heard patiently, and many issues are resolved on the spot.', hi: 'बुजुर्ग, महिलाएँ और युवा सीधे अपनी बात रखते हैं — धैर्य से सुनी जाती है, कई का मौके पर समाधान।' } },
    { image: '/images/updates/safai.webp', title: { en: 'Water, Drains & Lights', hi: 'पानी, नाली और रोशनी' }, text: { en: 'Taking up clean drinking water, street lighting, drains, and paved-lane construction with officials.', hi: 'स्वच्छ पेयजल, स्ट्रीट लाइट, नाली और खड़ंजा निर्माण पर अधिकारियों के साथ पहल।' } },
    { image: '/images/public-life/nagrik.jpg', title: { en: 'Schemes & Pensions', hi: 'योजनाएँ और पेंशन' }, text: { en: 'Supporting eligible families in accessing the Pradhan Mantri Awas Yojana and old-age and widow pensions.', hi: 'प्रधानमंत्री आवास योजना, वृद्धा व विधवा पेंशन — पात्र परिवारों को उनका हक दिलाने में सहयोग।' } },
    { image: '/images/gallery/khel.jpg', title: { en: 'Youth & Community', hi: 'युवा एवं समाज' }, text: { en: 'Sports, cultural programmes, and community events that bring Bhagwant Nagar together.', hi: 'खेल, सांस्कृतिक कार्यक्रम और सामुदायिक आयोजन, जो भगवंत नगर को जोड़े रखते हैं।' } },
  ],
};

export const banner = {
  image: '/images/gallery/a8.jpg',
  title: {
    en: 'Roots in Bhagwant Nagar. Lessons from Kanpur. A purpose that brought him home.',
    hi: 'भगवंत नगर की मिट्टी से जुड़ाव, कानपुर के अनुभवों से मिली दृष्टि और जनसेवा का संकल्प।',
  },
  // text: {
  //   en: 'Every person who works honestly deserves dignity. Every family struggling to survive deserves to be heard.',
  //   hi: 'ईमानदारी से काम करने वाले हर व्यक्ति को सम्मान मिलना चाहिए। संघर्ष कर रहे हर परिवार की बात सुनी जानी चाहिए।',
  // },
};

export const newsHead = {
  eyebrow: { en: '', hi: '' },
  title: { en: 'Latest from the ground', hi: 'ज़मीन से ताज़ा' },
  accent: { en: 'from the ground', hi: 'ज़मीन से' },
  readMore: { en: 'Read the report', hi: 'पूरी खबर पढ़ें' },
  source: 'Dainik Bhaskar',
};

export const newsItems = [
  {
    date: '2026-09-28',
    dateLabel: { en: '28 September 2026', hi: '28 सितंबर 2026' },
    place: { en: 'Bhagwant Nagar', hi: 'भगवंत नगर' },
    image: '/images/public-life/jan-sunwai-page.jpg',
    url: 'https://www.bhaskar.com/local/uttar-pradesh/unnao/sumerpur/news/bhagwant-nagar-chairman-ashish-shukla-rinku-janta-darbar-visit-139178771.html',
    title: {
      en: 'Chairman holds Janta Darbar — villagers and townspeople bring their concerns',
      hi: 'अध्यक्ष ने जनता दरबार में सुनीं समस्याएँ, क्षेत्रवासियों से मिलकर जाना हालचाल',
    },
    text: {
      en: 'Elders, women and youth from across the area raised issues of clean drinking water, street lights, sanitation, drains, PM Awas Yojana, pensions and road repair. Each petitioner was heard with patience, many matters were resolved on the spot, and complex ones were sent to officials with firm directions for timely, quality disposal.',
      hi: 'क्षेत्र भर से आए बुजुर्गों, महिलाओं और युवाओं ने स्वच्छ पेयजल, स्ट्रीट लाइट, साफ-सफाई, नाली-खड़ंजा, प्रधानमंत्री आवास योजना, पेंशन और सड़क मरम्मत जैसी समस्याएँ रखीं। हर फरियादी की बात धैर्य से सुनी गई, कई मामलों का मौके पर समाधान हुआ और जटिल मामलों में अधिकारियों को समयबद्ध, गुणवत्तापूर्ण निस्तारण के निर्देश दिए गए।',
    },
    quote: {
      en: '“The all-round development of Bhagwant Nagar and quick resolution of every citizen’s problem is our highest priority. No citizen will be made to struggle for basic facilities.”',
      hi: '“भगवंत नगर का सर्वांगीण विकास और प्रत्येक नागरिक की समस्याओं का त्वरित समाधान ही हमारी सर्वोच्च प्राथमिकता है। नगर के किसी भी नागरिक को बुनियादी सुविधाओं के लिए परेशान नहीं होने दिया जाएगा।”',
    },
  },
] as const;

export const fbNote = {
  en: 'Follow daily updates and development work on Facebook, Instagram and X.',
  hi: 'फेसबुक, इंस्टाग्राम और X पर रोज़ के अपडेट और विकास कार्य देखें।',
};
