import type { LocalizedString } from '@/types';

export interface IdeaSection {
  heading: LocalizedString;
  paragraphs: LocalizedString[];
}

export interface IdeaArticle {
  slug: string;
  categoryId: string;
  /** Public path of the cover photo, under /images/blog. */
  image: string;
  category: LocalizedString;
  /** Big number shown on the card, e.g. "₹5 lakh". */
  figure?: LocalizedString;
  figureCaption?: LocalizedString;
  readMinutes: number;
  /** ISO date shown as the publish date. */
  publishedAt: string;
  title: LocalizedString;
  summary: LocalizedString;
  sections: IdeaSection[];
  sourceName: LocalizedString;
  sourceUrl: string;
}

export const ideasIntro = {
  title: { en: 'Development & Ideas', hi: 'विकास एवं विचार' },
  subtitle: {
    en: 'What the government is doing, what we think about it, and what the numbers say.',
    hi: 'सरकार क्या कर रही है, हम उसके बारे में क्या सोचते हैं, और आँकड़े क्या कहते हैं।',
  },
  ideasHeading: { en: 'Ideas & Articles', hi: 'विचार एवं लेख' },
  ideasIntro: {
    en: 'Plain explanations of the schemes that matter to families and farmers: what each gives, who qualifies and how to apply.',
    hi: 'परिवारों और किसानों के काम की योजनाओं की सरल जानकारी: हर योजना क्या देती है, कौन पात्र है और आवेदन कैसे करें।',
  },
  journeyHeading: { en: 'Development Journey', hi: 'विकास यात्रा' },
  journeyIntro: {
    en: 'How the country’s infrastructure has grown, in official figures.',
    hi: 'देश का बुनियादी ढाँचा कितना बढ़ा है, सरकारी आँकड़ों में।',
  },
};

export const ourApproach = {
  title: { en: 'Our Approach', hi: 'हमारी सोच' },
  mainIdea: {
    text: {
      en: 'I believe being a public representative means more than leading. It means staying among the people, understanding their expectations, and living up to their trust. My connection to Bhagwantnagar and my responsibility towards its people are the foundation of my approach.',
      hi: 'मेरा विश्वास है कि जनप्रतिनिधि होने का अर्थ केवल नेतृत्व करना नहीं, बल्कि अपने लोगों के बीच रहना, उनकी अपेक्षाओं को समझना और उनके विश्वास पर खरा उतरना है। भगवंतनगर की मिट्टी से जुड़ाव और यहाँ के लोगों के प्रति जिम्मेदारी ही मेरी सोच का आधार है।',
    },
  },
  commitment: {
    paragraphs: [
      {
        en: 'For me, Bhagwantnagar’s development is not limited to roads and facilities; it is connected to a better future for every family. I want to work towards an environment where citizens’ voices are valued, young people have opportunities to move forward, and everyone can take pride in the progress of their area.',
        hi: 'मेरे लिए भगवंतनगर का विकास केवल सड़कों और सुविधाओं तक सीमित नहीं, बल्कि हर परिवार के बेहतर भविष्य से जुड़ा है। मैं ऐसा वातावरण बनाने की दिशा में प्रयास करना चाहता हूँ, जहाँ नागरिकों की आवाज़ को महत्व मिले, युवाओं को आगे बढ़ने के अवसर मिलें और हर व्यक्ति अपने क्षेत्र की प्रगति पर गर्व कर सके।',
      },
      {
        en: 'My priority is to sustain public trust, preserve warmth in our relationships, and ensure that the benefits of development reach every section of society.',
        hi: 'मेरी प्राथमिकता है कि जनविश्वास बना रहे, रिश्तों में अपनापन रहे और विकास का लाभ समाज के हर वर्ग तक पहुँचे।',
      },
      {
        en: 'I believe development truly succeeds when its benefits reach every section of society and no citizen feels overlooked when facing a need or problem. By valuing public dialogue, transparency, and mutual trust, I believe in continuously working to understand what residents expect and to help address their concerns.',
        hi: 'मेरा मानना है कि विकास की वास्तविक सफलता तब है, जब उसका लाभ समाज के हर वर्ग तक पहुँचे और कोई भी नागरिक अपनी आवश्यकताओं तथा समस्याओं को लेकर स्वयं को उपेक्षित महसूस न करे। जनसंवाद, पारदर्शिता और आपसी विश्वास को महत्व देते हुए मैं नागरिकों की अपेक्षाओं को समझने और उनकी समस्याओं के समाधान की दिशा में निरंतर प्रयास करने के पक्ष में हूँ।',
      },
    ],
  },
};

export const areaPriorities = {
  title: { en: 'Priorities for Bhagwantnagar', hi: 'क्षेत्र की प्राथमिकताएँ' },
  subtitle: {
    en: 'Five areas that deserve focused attention in Bhagwantnagar.',
    hi: 'भगवंतनगर के लिए पाँच विषय, जिन पर सबसे अधिक ध्यान है।',
  },
  items: [
    {
      icon: 'road',
      title: { en: 'Roads', hi: 'सड़क' },
      text: { en: 'Better roads connecting villages with block and district centres.', hi: 'गाँवों को ब्लॉक व जिला मुख्यालय से जोड़ने वाली बेहतर सड़कें।' },
    },
    {
      icon: 'education',
      title: { en: 'Education', hi: 'शिक्षा' },
      text: { en: 'Improving rural schools and access to quality education.', hi: 'ग्रामीण विद्यालयों व शिक्षा सुविधाओं में सुधार।' },
    },
    {
      icon: 'health',
      title: { en: 'Healthcare', hi: 'स्वास्थ्य' },
      text: { en: 'Strengthening primary healthcare centres and services.', hi: 'प्राथमिक स्वास्थ्य केंद्रों का सुदृढ़ीकरण।' },
    },
    {
      icon: 'water',
      title: { en: 'Irrigation & Electricity', hi: 'सिंचाई व बिजली' },
      text: { en: 'Reliable irrigation water and electricity for farming families.', hi: 'किसानों के लिए भरोसेमंद पानी और बिजली।' },
    },
    {
      icon: 'grievances',
      title: { en: 'Public Grievances', hi: 'जन समस्याएँ' },
      text: { en: 'Listening to residents’ concerns and working towards their timely resolution.', hi: 'जनता की समस्याओं का त्वरित निस्तारण।' },
    },
  ],
};

export const ideaArticles: IdeaArticle[] = [
  {
    slug: 'ayushman-bharat',
    image: '/images/blog/ayushman%20bharat.webp',
    categoryId: 'schemes',
    category: { en: 'Government schemes', hi: 'सरकारी योजनाएँ' },
    figure: { en: '₹5 lakh', hi: '₹5 लाख' },
    figureCaption: { en: 'per family, every year', hi: 'हर परिवार को, हर साल' },
    readMinutes: 3,
    publishedAt: '2026-10-17',
    title: {
      en: 'Ayushman Bharat: free treatment up to ₹5 lakh a year',
      hi: 'आयुष्मान भारत: साल में ₹5 लाख तक का मुफ़्त इलाज',
    },
    summary: {
      en: 'Cashless treatment at government and listed private hospitals for eligible families, and for every citizen aged 70 and above.',
      hi: 'पात्र परिवारों और 70 वर्ष या उससे अधिक उम्र के हर नागरिक को सरकारी और सूचीबद्ध निजी अस्पतालों में कैशलेस इलाज।',
    },
    sections: [
      {
        heading: { en: 'What it is', hi: 'योजना क्या है' },
        paragraphs: [{
          en: 'Ayushman Bharat PM-JAY, started in September 2018, covers hospital treatment up to ₹5 lakh per family each year. The patient does not pay cash at the hospital. Surgery, medicines and tests are covered, along with costs for three days before and fifteen days after admission.',
          hi: 'आयुष्मान भारत पीएम-जेएवाई सितंबर 2018 में शुरू हुई थी। यह हर परिवार को साल में ₹5 लाख तक के अस्पताल के इलाज की सुविधा देती है, और मरीज़ को अस्पताल में नकद भुगतान नहीं करना पड़ता। ऑपरेशन, दवाएँ और जाँचें इसमें शामिल हैं, साथ ही भर्ती होने से तीन दिन पहले और छुट्टी के पंद्रह दिन बाद तक का खर्च भी।',
        }],
      },
      {
        heading: { en: 'Who can benefit', hi: 'किन्हें लाभ मिल सकता है' },
        paragraphs: [{
          en: 'Families listed in the SECC 2011 data qualify, along with others added later by state governments. Since October 2024, every citizen aged 70 or above is eligible whatever their income, through the Ayushman Vay Vandana card.',
          hi: 'एसईसीसी 2011 की सूची में शामिल परिवार पात्र हैं, साथ ही वे लोग भी जिन्हें राज्य सरकारों ने बाद में जोड़ा है। अक्टूबर 2024 से 70 साल या उससे अधिक उम्र का हर नागरिक, आय चाहे जो हो, आयुष्मान वय वंदना कार्ड के ज़रिए पात्र है।',
        }],
      },
      {
        heading: { en: 'How to apply', hi: 'आवेदन कैसे करें' },
        paragraphs: [{
          en: 'First check your eligibility on the official beneficiary portal or in the Ayushman app, using your mobile number and Aadhaar. You can then get the card at a Common Service Centre, at a listed hospital, or through the app. At the hospital, show the card at the Ayushman Mitra desk.',
          hi: 'सबसे पहले आधिकारिक लाभार्थी पोर्टल या आयुष्मान ऐप पर मोबाइल नंबर और आधार से अपनी पात्रता जाँचें। इसके बाद कार्ड कॉमन सर्विस सेंटर, सूचीबद्ध अस्पताल या ऐप से बनवाया जा सकता है। अस्पताल में कार्ड आयुष्मान मित्र डेस्क पर दिखाएँ।',
        }],
      },
    ],
    sourceName: { en: 'National Health Authority: PM-JAY', hi: 'राष्ट्रीय स्वास्थ्य प्राधिकरण: पीएम-जेएवाई' },
    sourceUrl: 'https://pmjay.gov.in',
  },
  {
    slug: 'pm-awas-gramin',
    image: '/images/blog/pm%20aawas%20yojna.webp',
    categoryId: 'schemes',
    category: { en: 'Government schemes', hi: 'सरकारी योजनाएँ' },
    figure: { en: '₹1.20 lakh', hi: '₹1.20 लाख' },
    figureCaption: { en: 'for a house in the plains', hi: 'मैदानी क्षेत्र में घर के लिए' },
    readMinutes: 3,
    publishedAt: '2026-10-17',
    title: {
      en: 'PM Awas Yojana (Gramin): a pucca house for every family',
      hi: 'प्रधानमंत्री आवास योजना (ग्रामीण): हर परिवार को पक्का घर',
    },
    summary: {
      en: 'Money is paid in instalments straight into a bank account to build a house, with a toilet and extra help through linked schemes.',
      hi: 'घर बनाने के लिए पैसा किस्तों में सीधे बैंक खाते में आता है, साथ ही शौचालय और जुड़ी योजनाओं से अतिरिक्त मदद मिलती है।',
    },
    sections: [
      {
        heading: { en: 'What it is', hi: 'योजना क्या है' },
        paragraphs: [{
          en: 'Under PMAY-G, a family without a pucca house receives ₹1.20 lakh in the plains to build one. The money is paid in instalments as the construction moves forward. Wages for 90 days of MGNREGA work and ₹12,000 for a toilet under the Swachh Bharat Mission can be added on top.',
          hi: 'पीएमएवाई-जी के तहत पक्का घर न रखने वाले परिवार को मैदानी क्षेत्र में घर बनाने के लिए ₹1.20 लाख मिलते हैं। निर्माण आगे बढ़ने के साथ यह रकम किस्तों में दी जाती है। इसके अलावा मनरेगा के 90 दिन की मज़दूरी और स्वच्छ भारत मिशन के तहत शौचालय के लिए ₹12,000 भी जुड़ सकते हैं।',
        }],
      },
      {
        heading: { en: 'Who can benefit', hi: 'किन्हें लाभ मिल सकता है' },
        paragraphs: [{
          en: 'Homeless families and families living in kutcha houses are eligible, if they are recorded in the Awaas+ survey and approved by the Gram Sabha.',
          hi: 'बेघर परिवार और कच्चे घरों में रहने वाले परिवार पात्र हैं, यदि वे आवास प्लस सर्वे में दर्ज हों और ग्राम सभा से अनुमोदित हों।',
        }],
      },
      {
        heading: { en: 'How to apply', hi: 'आवेदन कैसे करें' },
        paragraphs: [{
          en: 'Step one: get your name included in the survey through the Gram Pradhan, the Panchayat Secretary or the Block office. Step two: keep your Aadhaar, bank passbook and job card ready. Step three: check the status of your house on pmayg.nic.in.',
          hi: 'पहला चरण: ग्राम प्रधान, पंचायत सचिव या ब्लॉक कार्यालय के माध्यम से सर्वे में अपना नाम दर्ज कराएँ। दूसरा चरण: आधार, बैंक पासबुक और जॉब कार्ड तैयार रखें। तीसरा चरण: pmayg.nic.in पर अपने घर की स्थिति देखें।',
        }],
      },
    ],
    sourceName: { en: 'Ministry of Rural Development: PMAY-G', hi: 'ग्रामीण विकास मंत्रालय: पीएमएवाई-जी' },
    sourceUrl: 'https://pmayg.nic.in',
  },
  {
    slug: 'pm-kisan',
    image: '/images/blog/pm%20kisan.webp',
    categoryId: 'farmers',
    category: { en: 'Farmers', hi: 'किसान' },
    figure: { en: '₹6,000', hi: '₹6,000' },
    figureCaption: { en: 'a year, in three instalments', hi: 'साल में, तीन किस्तों में' },
    readMinutes: 2,
    publishedAt: '2026-10-17',
    title: {
      en: 'PM Kisan Samman Nidhi: ₹6,000 a year to every farmer family',
      hi: 'पीएम किसान सम्मान निधि: हर किसान परिवार को साल में ₹6,000',
    },
    summary: {
      en: 'Farmer families who own cultivable land receive the money straight into their bank accounts, with no middleman.',
      hi: 'खेती योग्य ज़मीन के मालिक किसान परिवारों को पैसा सीधे बैंक खाते में मिलता है, बिना किसी बिचौलिए के।',
    },
    sections: [
      {
        heading: { en: 'What it is', hi: 'योजना क्या है' },
        paragraphs: [{
          en: 'PM-KISAN, started in February 2019, pays ₹6,000 a year to farmer families, in three instalments of ₹2,000 each. The money goes directly into the family’s bank account.',
          hi: 'पीएम-किसान फरवरी 2019 में शुरू हुई थी। यह किसान परिवारों को साल में ₹6,000, ₹2,000 की तीन किस्तों में देती है। रकम सीधे परिवार के बैंक खाते में जाती है।',
        }],
      },
      {
        heading: { en: 'Who can benefit', hi: 'किन्हें लाभ मिल सकता है' },
        paragraphs: [{
          en: 'Farmer families who own cultivable land in their name qualify. Income-tax payers, institutional landholders and some professionals are excluded.',
          hi: 'अपने नाम पर खेती योग्य ज़मीन रखने वाले किसान परिवार पात्र हैं। आयकर दाता, संस्थागत भूमिधारक और कुछ पेशेवर इससे बाहर हैं।',
        }],
      },
      {
        heading: { en: 'How to apply', hi: 'आवेदन कैसे करें' },
        paragraphs: [{
          en: 'Register on pmkisan.gov.in under New Farmer Registration, or at a Common Service Centre. Complete e-KYC and link your Aadhaar to your bank account, because instalments stop without it. You can check your status under Know Your Status on the same website.',
          hi: 'pmkisan.gov.in पर न्यू फार्मर रजिस्ट्रेशन में या कॉमन सर्विस सेंटर पर पंजीकरण कराएँ। ई-केवाईसी पूरी करें और अपना आधार बैंक खाते से जोड़ें, क्योंकि इसके बिना किस्तें रुक जाती हैं। अपनी स्थिति उसी वेबसाइट पर नो योर स्टेटस में देखी जा सकती है।',
        }],
      },
    ],
    sourceName: { en: 'Ministry of Agriculture: PM-KISAN', hi: 'कृषि मंत्रालय: पीएम-किसान' },
    sourceUrl: 'https://pmkisan.gov.in',
  },
  {
    slug: 'mission-shakti',
    image: '/images/blog/mission%20shakti.webp',
    categoryId: 'women',
    category: { en: 'Women’s safety', hi: 'महिला सुरक्षा' },
    readMinutes: 3,
    publishedAt: '2026-10-17',
    title: {
      en: 'Mission Shakti: safety, respect and self-reliance for women in UP',
      hi: 'मिशन शक्ति: उत्तर प्रदेश में महिलाओं की सुरक्षा, सम्मान और आत्मनिर्भरता',
    },
    summary: {
      en: 'Help desks in every police station, quick-response helplines, and schemes that give women money and skills.',
      hi: 'हर थाने में महिला हेल्प डेस्क, तुरंत मदद वाली हेल्पलाइन, और ऐसी योजनाएँ जो महिलाओं को पैसा और हुनर देती हैं।',
    },
    sections: [
      {
        heading: { en: 'What has changed', hi: 'क्या बदला है' },
        paragraphs: [
          {
            en: 'The Uttar Pradesh government launched Mission Shakti in October 2020 as a campaign for the safety, dignity and self-reliance of women and girls. Anti-Romeo squads were formed in 2017 to stop harassment in public places.',
            hi: 'उत्तर प्रदेश सरकार ने अक्टूबर 2020 में महिलाओं और बालिकाओं की सुरक्षा, सम्मान और आत्मनिर्भरता के अभियान के रूप में मिशन शक्ति शुरू किया। सार्वजनिक स्थानों पर छेड़छाड़ रोकने के लिए 2017 में एंटी-रोमियो दल बनाए गए थे।',
          },
          {
            en: 'Police stations now have women’s help desks staffed by women officers. There are pink booths and women’s patrols in markets and near schools. The Kanya Sumangala Yojana supports a girl from birth to graduation.',
            hi: 'थानों में अब महिला पुलिसकर्मियों वाले महिला हेल्प डेस्क हैं। बाज़ारों और स्कूलों के पास पिंक बूथ और महिला गश्त होती है। कन्या सुमंगला योजना बेटी को जन्म से स्नातक तक सहायता देती है।',
          },
        ],
      },
      {
        heading: { en: 'Numbers to remember', hi: 'याद रखने योग्य नंबर' },
        paragraphs: [
          { en: '1090: Women Power Line, for harassment and threats.', hi: '1090: वीमेन पावर लाइन, उत्पीड़न और धमकी की स्थिति में।' },
          { en: '181: Women’s helpline for support and counselling.', hi: '181: महिला हेल्पलाइन, सहायता और परामर्श के लिए।' },
          { en: '112: Police emergency.', hi: '112: पुलिस आपातकालीन सेवा।' },
        ],
      },
      {
        heading: { en: 'Across India', hi: 'पूरे देश में' },
        paragraphs: [{
          en: 'Several national schemes share the same aim of women being safe, educated and earning: Beti Bachao Beti Padhao (2015), Sukanya Samriddhi accounts, Ujjwala gas connections, and Lakhpati Didi through self-help groups.',
          hi: 'कई राष्ट्रीय योजनाओं का लक्ष्य भी यही है कि महिलाएँ सुरक्षित, शिक्षित और कमाने वाली हों: बेटी बचाओ बेटी पढ़ाओ (2015), सुकन्या समृद्धि खाते, उज्ज्वला गैस कनेक्शन, और स्वयं सहायता समूहों के ज़रिए लखपति दीदी।',
        }],
      },
    ],
    sourceName: { en: 'Government of Uttar Pradesh: Mission Shakti', hi: 'उत्तर प्रदेश सरकार: मिशन शक्ति' },
    sourceUrl: 'https://missionshakti.up.gov.in',
  },
  {
    slug: 'nep-2020',
    image: '/images/blog/national%20education.webp',
    categoryId: 'education',
    category: { en: 'Education', hi: 'शिक्षा' },
    readMinutes: 3,
    publishedAt: '2026-10-17',
    title: {
      en: 'National Education Policy 2020: learning in your mother tongue, skills from class 6',
      hi: 'राष्ट्रीय शिक्षा नीति 2020: मातृभाषा में पढ़ाई, कक्षा 6 से हुनर',
    },
    summary: {
      en: 'The first new education policy in 34 years, built around early learning, Indian languages and practical skills.',
      hi: '34 वर्षों में पहली नई शिक्षा नीति, जो शुरुआती शिक्षा, भारतीय भाषाओं और व्यावहारिक कौशल पर केंद्रित है।',
    },
    sections: [
      {
        heading: { en: 'What it changes', hi: 'क्या बदलता है' },
        paragraphs: [
          {
            en: 'The policy was approved in July 2020 and replaced the 1986 policy. It replaces the 10+2 school structure with a 5+3+3+4 structure that starts at age 3.',
            hi: 'यह नीति जुलाई 2020 में मंज़ूर हुई और इसने 1986 की नीति की जगह ली। यह 10+2 की स्कूली व्यवस्था की जगह 5+3+3+4 ढाँचा लाती है, जो 3 साल की उम्र से शुरू होता है।',
          },
          {
            en: 'Teaching is in the mother tongue or local language, at least until class 5 where possible. Vocational learning with internships starts from class 6. In college, students can enter and exit with a certificate, a diploma or a degree.',
            hi: 'जहाँ संभव हो, कम से कम कक्षा 5 तक पढ़ाई मातृभाषा या स्थानीय भाषा में होती है। कक्षा 6 से इंटर्नशिप के साथ व्यावसायिक शिक्षा शुरू होती है। कॉलेज में विद्यार्थी प्रमाणपत्र, डिप्लोमा या डिग्री के साथ प्रवेश और निकास कर सकते हैं।',
          },
        ],
      },
      {
        heading: { en: 'In Uttar Pradesh', hi: 'उत्तर प्रदेश में' },
        paragraphs: [{
          en: 'Under Operation Kayakalp, government primary schools are being given toilets, drinking water, boundary walls and smart classes. Nipun Bharat focuses on reading and arithmetic by class 3.',
          hi: 'ऑपरेशन कायाकल्प के तहत सरकारी प्राथमिक विद्यालयों में शौचालय, पेयजल, चारदीवारी और स्मार्ट क्लास बनाई जा रही हैं। निपुण भारत का ध्यान कक्षा 3 तक पढ़ना और गणित सिखाने पर है।',
        }],
      },
    ],
    sourceName: { en: 'Ministry of Education: NEP 2020', hi: 'शिक्षा मंत्रालय: एनईपी 2020' },
    sourceUrl: 'https://www.education.gov.in/nep',
  },
  {
    slug: 'mudra-vishwakarma',
    image: '/images/blog/mudra.webp',
    categoryId: 'employment',
    category: { en: 'Employment', hi: 'रोज़गार' },
    figure: { en: '₹20 lakh', hi: '₹20 लाख' },
    figureCaption: { en: 'maximum Mudra loan', hi: 'मुद्रा ऋण की अधिकतम सीमा' },
    readMinutes: 3,
    publishedAt: '2026-10-17',
    title: {
      en: 'Mudra and PM Vishwakarma: loans without collateral for your own work',
      hi: 'मुद्रा और पीएम विश्वकर्मा: अपने काम के लिए बिना गारंटी का ऋण',
    },
    summary: {
      en: 'Loans up to ₹20 lakh for small businesses, plus cheap credit, training and a toolkit for carpenters, potters, tailors and other artisans.',
      hi: 'छोटे कारोबार के लिए ₹20 लाख तक का ऋण, और बढ़ई, कुम्हार, दर्जी जैसे कारीगरों के लिए सस्ता ऋण, प्रशिक्षण और टूलकिट।',
    },
    sections: [
      {
        heading: { en: 'Pradhan Mantri Mudra Yojana', hi: 'प्रधानमंत्री मुद्रा योजना' },
        paragraphs: [
          {
            en: 'Started in April 2015, Mudra gives collateral-free loans through banks to start or grow a small non-farm business.',
            hi: 'अप्रैल 2015 में शुरू हुई मुद्रा योजना बैंकों के ज़रिए बिना गारंटी के ऋण देती है, ताकि कृषि के अलावा कोई छोटा कारोबार शुरू या बड़ा किया जा सके।',
          },
          { en: 'Shishu: up to ₹50,000. Kishore: ₹50,000 to ₹5 lakh. Tarun: ₹5 lakh to ₹10 lakh. Tarun Plus: up to ₹20 lakh, for those who have repaid a Tarun loan.', hi: 'शिशु: ₹50,000 तक। किशोर: ₹50,000 से ₹5 लाख। तरुण: ₹5 लाख से ₹10 लाख। तरुण प्लस: ₹20 लाख तक, उनके लिए जिन्होंने तरुण ऋण चुका दिया है।' },
        ],
      },
      {
        heading: { en: 'PM Vishwakarma', hi: 'पीएम विश्वकर्मा' },
        paragraphs: [
          {
            en: 'Launched in September 2023 for artisans in 18 traditional trades, including carpenters, potters, tailors, goldsmiths and boat makers. It offers skill training with a daily stipend and a toolkit incentive of up to ₹15,000, along with collateral-free loans of ₹1 lakh and then ₹2 lakh at 5% interest.',
            hi: 'सितंबर 2023 में 18 पारंपरिक कामों के कारीगरों के लिए शुरू हुई, जिनमें बढ़ई, कुम्हार, दर्जी, सुनार और नाव बनाने वाले शामिल हैं। इसमें दैनिक भत्ते के साथ कौशल प्रशिक्षण, ₹15,000 तक का टूलकिट प्रोत्साहन, और 5% ब्याज पर बिना गारंटी का ₹1 लाख, फिर ₹2 लाख का ऋण मिलता है।',
          },
          {
            en: 'To register, apply at a CSC with your Aadhaar, mobile and bank details. Verification is done through the Gram Panchayat.',
            hi: 'पंजीकरण के लिए आधार, मोबाइल और बैंक विवरण के साथ सीएससी पर आवेदन करें। सत्यापन ग्राम पंचायत के माध्यम से होता है।',
          },
        ],
      },
    ],
    sourceName: { en: 'MUDRA and PM Vishwakarma official websites', hi: 'मुद्रा और पीएम विश्वकर्मा की आधिकारिक वेबसाइट' },
    sourceUrl: 'https://pmvishwakarma.gov.in',
  },
  {
    slug: 'bharat-2014-ke-baad',
    image: '/images/blog/airport.webp',
    categoryId: 'development',
    category: { en: 'Development', hi: 'विकास' },
    figure: { en: '74 → 160', hi: '74 → 160' },
    figureCaption: { en: 'airports, 2014 to 2025', hi: 'हवाई अड्डे, 2014 से 2025' },
    readMinutes: 3,
    publishedAt: '2026-10-17',
    title: {
      en: 'India before and after 2014: what the figures show',
      hi: 'भारत 2014 से पहले और बाद: आँकड़े क्या बताते हैं',
    },
    summary: {
      en: 'Highways grew by more than half, airports more than doubled, medical colleges doubled, and 56 crore people got a bank account for the first time.',
      hi: 'राजमार्ग आधे से अधिक बढ़े, हवाई अड्डे दोगुने से ज़्यादा हुए, मेडिकल कॉलेज दोगुने हुए, और 56 करोड़ लोगों का पहली बार बैंक खाता खुला।',
    },
    sections: [
      {
        heading: { en: 'The figures', hi: 'आँकड़े' },
        paragraphs: [
          { en: 'National highways: 91,287 km in 2014, and 1,46,204 km by March 2025.', hi: 'राष्ट्रीय राजमार्ग: 2014 में 91,287 किमी, और मार्च 2025 तक 1,46,204 किमी।' },
          { en: 'Airports: 74 in 2014, and 160 by March 2025.', hi: 'हवाई अड्डे: 2014 में 74, और मार्च 2025 तक 160।' },
          { en: 'Medical colleges went from 387 to 780, and MBBS seats from 51,348 to 1,18,137.', hi: 'मेडिकल कॉलेज 387 से 780 हुए, और एमबीबीएस सीटें 51,348 से 1,18,137।' },
          { en: 'Jan Dhan accounts reached 56 crore, and free gas connections 10 crore.', hi: 'जन धन खाते 56 करोड़ तक पहुँचे, और मुफ़्त गैस कनेक्शन 10 करोड़।' },
          { en: 'Between 2013-14 and 2022-23, 24.82 crore people moved out of multidimensional poverty, according to a NITI Aayog estimate.', hi: '2013-14 से 2022-23 के बीच नीति आयोग के अनुमान के अनुसार 24.82 करोड़ लोग बहुआयामी गरीबी से बाहर आए।' },
        ],
      },
    ],
    sourceName: { en: 'PIB: 11 years of transforming infrastructure (June 2025)', hi: 'पीआईबी: बुनियादी ढाँचे के बदलाव के 11 वर्ष (जून 2025)' },
    sourceUrl: 'https://static.pib.gov.in/WriteReadData/specificdocs/documents/2025/jun/doc2025611568101.pdf',
  },
  {
    slug: 'uttar-pradesh-2017-ke-baad',
    image: '/images/blog/india%20before%202014.webp',
    categoryId: 'development',
    category: { en: 'Development', hi: 'विकास' },
    figure: { en: '₹30.25 lakh cr', hi: '₹30.25 लाख करोड़' },
    figureCaption: { en: 'state economy, 2024-25', hi: 'राज्य की अर्थव्यवस्था, 2024-25' },
    readMinutes: 3,
    publishedAt: '2026-10-17',
    title: {
      en: 'Uttar Pradesh since 2017: from “BIMARU” to growth engine',
      hi: 'उत्तर प्रदेश 2017 के बाद: “बीमारू” से विकास के इंजन तक',
    },
    summary: {
      en: 'The state economy grew from ₹13.30 lakh crore to ₹30.25 lakh crore, and expressways now cross the state.',
      hi: 'राज्य की अर्थव्यवस्था ₹13.30 लाख करोड़ से बढ़कर ₹30.25 लाख करोड़ हो गई है, और अब पूरे राज्य में एक्सप्रेसवे का जाल है।',
    },
    sections: [
      {
        heading: { en: 'The economy', hi: 'अर्थव्यवस्था' },
        paragraphs: [{
          en: 'According to the state’s first Economic Survey (2025-26), the economy grew from ₹13.30 lakh crore in 2016-17 to ₹30.25 lakh crore in 2024-25, a growth rate of about 10.8% a year.',
          hi: 'राज्य के पहले आर्थिक सर्वेक्षण (2025-26) के अनुसार अर्थव्यवस्था 2016-17 के ₹13.30 लाख करोड़ से बढ़कर 2024-25 में ₹30.25 लाख करोड़ हो गई, यानी लगभग 10.8% सालाना की दर से।',
        }],
      },
      {
        heading: { en: 'Expressways and investment', hi: 'एक्सप्रेसवे और निवेश' },
        paragraphs: [{
          en: 'Of 22 expressways planned, 7 are in use and 3 are under construction. Investment proposals worth over ₹50 lakh crore are in the pipeline.',
          hi: 'योजनाबद्ध 22 एक्सप्रेसवे में से 7 चालू हैं और 3 निर्माणाधीन। ₹50 लाख करोड़ से अधिक के निवेश प्रस्ताव पाइपलाइन में हैं।',
        }],
      },
    ],
    sourceName: { en: 'Uttar Pradesh Economic Survey 2025-26 (summary)', hi: 'उत्तर प्रदेश आर्थिक सर्वेक्षण 2025-26 (सार)' },
    sourceUrl: 'https://oga-prod.angelone.in/news/economy/uttar-pradesh-economic-survey-2025-26-highlights-1-trillion-roadmap',
  },
];
