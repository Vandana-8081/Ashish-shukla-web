import type { LocalizedString } from '@/types';

type L = LocalizedString;
export interface Item { icon: string; title: L; text?: L }

/* ───────────── Public Service ───────────── */
export const servicePage = {
  eyebrow: { en: '', hi: '' } as L,
  title: {
    en: 'Public office begins where personal convenience ends',
    hi: 'जन-पद वहाँ से शुरू होता है, जहाँ व्यक्तिगत सुविधा समाप्त होती है',
  } as L,
  intro: {
    en: 'Public service is not defined only by programmes or public appearances. For an elected representative, the real test lies in everyday accessibility. Can citizens reach the office? Does someone listen? Does the matter reach the appropriate department? Is there follow-up?',
    hi: 'जनसेवा केवल कार्यक्रमों या सार्वजनिक उपस्थिति से परिभाषित नहीं होती। निर्वाचित प्रतिनिधि की असली परीक्षा रोज़मर्रा की सुलभता में है। क्या नागरिक कार्यालय तक पहुँच सकते हैं? क्या कोई सुनता है? क्या मामला सही विभाग तक पहुँचता है? क्या फ़ॉलो-अप होता है?',
  } as L,
  chairmanTitle: { en: 'Chairman, Bhagwant Nagar Nagar Panchayat', hi: 'अध्यक्ष, नगर पंचायत भगवंत नगर' } as L,
  chairmanText: {
    en: 'Good municipal governance is reflected in the basic services citizens receive and in how effectively their concerns are resolved. Our priority is to keep improving sanitation, roads, drinking water, drainage, and electricity, and to advance development with public participation.',
    hi: 'बेहतर नगर प्रशासन की पहचान नागरिकों को मिलने वाली बुनियादी सुविधाओं और उनकी समस्याओं के प्रभावी समाधान में है। स्वच्छता, सड़क, पेयजल, जल निकासी और बिजली जैसी आवश्यकताओं पर निरंतर ध्यान देना तथा जनभागीदारी के साथ विकास को आगे बढ़ाना हमारी प्राथमिकता है।',
  } as L,
  responsibilities: [
    { icon: 'road', title: { en: 'Streets & roads', hi: 'सड़कें और गलियाँ' } },
    { icon: 'droplets', title: { en: 'Sanitation and Drainage', hi: 'स्वच्छता एवं जल निकासी' } },
    { icon: 'lightbulb', title: { en: 'Streetlights', hi: 'स्ट्रीट लाइट' } },
    { icon: 'store', title: { en: 'Community Support and Material Distribution', hi: 'जनसहयोग एवं सामग्री वितरण' } },
  ] as Item[],
  responsibilityDescriptions: [
    { en: 'Maintain connected, safer roads and neighborhood streets.', hi: 'स्थानीय सड़कों और गलियों को सुगम व सुरक्षित बनाने पर ध्यान।' },
    { en: 'Keep drains clear and improve water flow across local areas.', hi: 'नालियों की सफाई और जल निकासी व्यवस्था बेहतर करने पर ध्यान।' },
    { en: 'Improve visibility and safer movement after dark.', hi: 'रात में बेहतर रोशनी और सुरक्षित आवागमन की दिशा में प्रयास।' },
    { en: 'The purpose of public service is to stand with members of society and strengthen the spirit of support when needed.', hi: 'जनसेवा का उद्देश्य समाज के लोगों के साथ खड़े रहना और जरूरत के समय सहयोग की भावना को मजबूत करना है।' },
  ] as L[],
  fieldTitle: { en: 'A field-oriented approach', hi: 'ज़मीन पर उतरकर काम करने का तरीका' } as L,
  fieldText: {
    en: 'Public representatives understand an area differently when they see problems personally rather than only through official papers. Public visits, citizen meetings, local inspections and direct communication are an important part of effective local leadership.',
    hi: 'जब जनप्रतिनिधि समस्याओं को खुद देखते हैं, तो वे इलाके को सरकारी कागज़ों से अलग तरह से समझते हैं। जन-भ्रमण, नागरिक बैठकें, स्थानीय निरीक्षण और सीधा संवाद प्रभावी स्थानीय नेतृत्व का अहम हिस्सा हैं।',
  } as L,
  steps: [
    { en: 'See the issue', hi: 'समस्या देखें' },
    { en: 'Understand the issue', hi: 'समस्या समझें' },
    { en: 'Take it to the responsible system', hi: 'ज़िम्मेदार तंत्र तक पहुँचाएँ' },
    { en: 'Follow its progress', hi: 'प्रगति पर नज़र रखें' },
  ] as L[],
  cta: {
    title: { en: 'Your area. Your issue. Your voice.', hi: 'आपका क्षेत्र। आपकी समस्या। आपकी आवाज़।' } as L,
    button: { en: 'Share a Public Issue', hi: 'अपनी समस्या बताएं' } as L,
  },
};

/* ───────────── Bhagwant Nagar ───────────── */
export const placePage = {
  eyebrow: { en: '', hi: '' } as L,
  title: {
    en: 'A journey shaped by the people of Bhagwant Nagar',
    hi: 'भगवंत नगर के लोगों से जुड़ी यह यात्रा',
  } as L,
  intro: {
    en: 'Bhagwant Nagar is home: the place where Ashish Shukla’s roots, relationships and public life come together. Time spent with residents across villages and neighbourhoods keeps local needs at the centre of his work.',
    hi: 'भगवंत नगर उनका अपना क्षेत्र है—जहाँ आशीष शुक्ला की जड़ें, रिश्ते और सार्वजनिक जीवन जुड़े हैं। गाँवों और मोहल्लों में लोगों के साथ बिताया समय स्थानीय ज़रूरतों को उनके काम के केंद्र में रखता है।',
  } as L,
  wide: {
    en: 'Every village and neighbourhood has its own priorities. Listening to residents, meeting families and seeing local conditions firsthand helps connect those needs with practical work.',
    hi: 'हर गाँव और मोहल्ले की अपनी ज़रूरतें हैं। लोगों से संवाद, परिवारों से मुलाक़ात और स्थानीय हालात को करीब से समझना इन ज़रूरतों को ज़मीनी काम से जोड़ता है।',
  } as L,
  focusTitle: { en: 'What should the next phase focus on?', hi: 'अगला चरण किन बातों पर केंद्रित हो?' } as L,
  focus: [
    { icon: 'route', title: { en: 'Roads & Connectivity', hi: 'सड़कें एवं संपर्क' }, text: { en: 'Reliable connectivity links villages to markets, students to institutions, patients to hospitals and businesses to customers. Better roads are an economic multiplier.', hi: 'भरोसेमंद संपर्क गाँवों को बाज़ार से, विद्यार्थियों को संस्थानों से, मरीज़ों को अस्पताल से और व्यवसायों को ग्राहकों से जोड़ता है। बेहतर सड़कें आर्थिक गुणक हैं।' } },
    { icon: 'graduation', title: { en: 'Education & Youth', hi: 'शिक्षा एवं युवा' }, text: { en: 'Not only degrees, but opportunity: career guidance, digital skills, competitive-exam support, sports infrastructure, vocational training and entrepreneurship awareness.', hi: 'केवल डिग्री नहीं, अवसर भी: करियर मार्गदर्शन, डिजिटल कौशल, प्रतियोगी परीक्षा सहयोग, खेल ढाँचा, व्यावसायिक प्रशिक्षण और उद्यमिता जागरूकता।' } },
    { icon: 'heart', title: { en: 'Healthcare', hi: 'स्वास्थ्य' }, text: { en: 'For vulnerable families, illness is both a health and a financial emergency. Primary care, diagnostics, maternal health, emergency services and health schemes must remain central.', hi: 'कमज़ोर परिवारों के लिए बीमारी स्वास्थ्य और आर्थिक दोनों संकट है। प्राथमिक चिकित्सा, जाँच, मातृ स्वास्थ्य, आपात सेवाएँ और स्वास्थ्य योजनाएँ केंद्र में रहें।' } },
    { icon: 'wheat', title: { en: 'Farmers & Rural Economy', hi: 'किसान एवं ग्रामीण अर्थव्यवस्था' }, text: { en: 'Agricultural infrastructure, irrigation, market access, storage, government schemes, better roads, technology and information all lift rural incomes.', hi: 'कृषि ढाँचा, सिंचाई, बाज़ार तक पहुँच, भंडारण, सरकारी योजनाएँ, बेहतर सड़कें, तकनीक और जानकारी — सब मिलकर ग्रामीण आय बढ़ाते हैं।' } },
    { icon: 'users', title: { en: 'Women & Family Well-being', hi: 'महिलाएँ एवं पारिवारिक कल्याण' }, text: { en: 'Development grows stronger when women have access to education, healthcare, safety, skills, enterprise and financial opportunity.', hi: 'जब महिलाओं को शिक्षा, स्वास्थ्य, सुरक्षा, कौशल, उद्यम और वित्तीय अवसर मिलते हैं, तब विकास मज़बूत होता है।' } },
    { icon: 'store', title: { en: 'Local Business & Employment', hi: 'स्थानीय व्यवसाय एवं रोज़गार' }, text: { en: 'Shops, markets, small enterprises and service providers sustain thousands of families. Better infrastructure and digital access can strengthen them.', hi: 'दुकानें, बाज़ार, छोटे उद्यम और सेवा प्रदाता हज़ारों परिवारों को चलाते हैं। बेहतर ढाँचा और डिजिटल पहुँच उन्हें मज़बूत कर सकते हैं।' } },
    { icon: 'trees', title: { en: 'Civic & Public Infrastructure', hi: 'नागरिक एवं सार्वजनिक ढाँचा' }, text: { en: 'Clean public spaces, safe streets, water, drainage, lighting and accessible administrative facilities should not be a privilege.', hi: 'स्वच्छ सार्वजनिक स्थल, सुरक्षित गलियाँ, पानी, नाली, रोशनी और सुलभ प्रशासनिक सुविधाएँ विशेषाधिकार नहीं होनी चाहिए।' } },
  ] as Item[],
};

/* ───────────── Political Journey ───────────── */
export const politicalPage = {
  eyebrow: { en: 'Political & Public Journey', hi: 'राजनीतिक एवं सार्वजनिक यात्रा' } as L,
  title: { en: 'From local governance to a wider public responsibility', hi: 'स्थानीय शासन से व्यापक जन-दायित्व तक' } as L,
  intro: {
    en: 'Ashish Shukla’s political journey has grown from the local level. He entered public office through municipal politics and was elected Chairman of Bhagwant Nagar Nagar Panchayat in 2023 as a Bharatiya Janata Party candidate — gaining direct exposure to governance where citizens meet it most often.',
    hi: 'आशीष शुक्ला की राजनीतिक यात्रा स्थानीय स्तर से बढ़ी है। वे नगर राजनीति के रास्ते जन-पद पर आए और 2023 में भारतीय जनता पार्टी प्रत्याशी के रूप में नगर पंचायत भगवंत नगर के अध्यक्ष निर्वाचित हुए — उस स्तर पर शासन का सीधा अनुभव, जहाँ नागरिक उससे सबसे अधिक मिलते हैं।',
  } as L,
  stages: [
    { year: '2023', title: { en: 'Elected Chairman', hi: 'अध्यक्ष निर्वाचित' }, text: { en: 'Won the Bhagwant Nagar Nagar Panchayat chairmanship as a BJP candidate.', hi: 'भाजपा प्रत्याशी के रूप में नगर पंचायत भगवंत नगर की अध्यक्षता जीती।' } },
    { year: '→', title: { en: 'Municipal leadership', hi: 'नगर नेतृत्व' }, text: { en: 'Everyday civic governance: roads, water, drainage, lighting and citizen grievances.', hi: 'रोज़मर्रा का नागरिक शासन: सड़क, पानी, नाली, रोशनी और नागरिक शिकायतें।' } },
    { year: '→', title: { en: 'Wider aspiration', hi: 'व्यापक आकांक्षा' }, text: { en: 'Seeking an opportunity to serve the Bhagwant Nagar Assembly constituency through the BJP.', hi: 'भाजपा के माध्यम से भगवंत नगर विधानसभा क्षेत्र की सेवा का अवसर चाहते हैं।' } },
  ],
  whyTitle: { en: 'Why the Assembly level matters', hi: 'विधानसभा स्तर क्यों मायने रखता है' } as L,
  whyText: {
    en: 'Municipal government can address many civic concerns, but several major issues require coordination with state-level departments and institutions. Legislative representation carries a different scale of responsibility.',
    hi: 'नगर शासन कई नागरिक चिंताओं का समाधान कर सकता है, पर कई बड़े मुद्दों में राज्य स्तरीय विभागों और संस्थाओं से समन्वय चाहिए। विधायी प्रतिनिधित्व अलग पैमाने का दायित्व है।',
  } as L,
  why: [
    { en: 'Major roads', hi: 'प्रमुख सड़कें' }, { en: 'Healthcare infrastructure', hi: 'स्वास्थ्य ढाँचा' },
    { en: 'Educational institutions', hi: 'शिक्षण संस्थान' }, { en: 'Large public works', hi: 'बड़े सार्वजनिक कार्य' },
    { en: 'Rural development', hi: 'ग्रामीण विकास' }, { en: 'Irrigation', hi: 'सिंचाई' },
    { en: 'Employment programmes', hi: 'रोज़गार कार्यक्रम' }, { en: 'State schemes', hi: 'राज्य योजनाएँ' },
    { en: 'Administrative coordination', hi: 'प्रशासनिक समन्वय' },
  ] as L[],
  partyTitle: { en: 'Association with the Bharatiya Janata Party', hi: 'भारतीय जनता पार्टी से जुड़ाव' } as L,
  partyText: {
    en: 'Ashish Shukla contested and won the 2023 Bhagwant Nagar Nagar Panchayat chairmanship as a BJP candidate. As he considers a broader public role, he is seeking an opportunity to represent Bhagwant Nagar through the BJP at the legislative level.',
    hi: 'आशीष शुक्ला ने 2023 में भाजपा प्रत्याशी के रूप में नगर पंचायत भगवंत नगर की अध्यक्षता का चुनाव लड़कर जीता। व्यापक जन-भूमिका पर विचार करते हुए वे भाजपा के माध्यम से विधायी स्तर पर भगवंत नगर का प्रतिनिधित्व करने का अवसर चाहते हैं।',
  } as L,
  beyondTitle: { en: 'Public life beyond electoral seasons', hi: 'चुनावी मौसम से परे जन-जीवन' } as L,
  beyondText: {
    en: 'An elected position is temporary. A relationship with a region should not be. The larger objective is continued engagement with residents, local organisations, young people, farmers, traders and families — through accessibility, dialogue and follow-through.',
    hi: 'निर्वाचित पद अस्थायी होता है; किसी क्षेत्र से रिश्ता नहीं। बड़ा उद्देश्य निवासियों, स्थानीय संगठनों, युवाओं, किसानों, व्यापारियों और परिवारों से निरंतर संवाद है — सुलभता, बातचीत और फ़ॉलो-अप के ज़रिए।',
  } as L,
};

/* ───────────── News & Media ───────────── */
export const mediaIntro = {
  eyebrow: { en: '', hi: '' } as L,
  title: { en: 'Moments of public service, through photographs', hi: 'जनसेवा के पल, तस्वीरों के संग' } as L,
  text: {
    en: 'A glimpse of public dialogue, community welfare efforts, public programmes and important moments in Bhagwantnagar’s development. These photographs capture the connection with residents and activities taking place across the area.',
    hi: 'जनसंवाद, जनकल्याण के प्रयासों, सार्वजनिक कार्यक्रमों और भगवंतनगर के विकास से जुड़े महत्वपूर्ण पलों की झलक। ये तस्वीरें जनता के साथ जुड़ाव और क्षेत्र में चल रही गतिविधियों को सामने लाती हैं।',
  } as L,
  latestTitle: { en: 'Latest from the ground', hi: 'ज़मीन से ताज़ा' } as L,
  latestNote: {
    en: 'Each update carries a date, location, photographs and a concise factual description.',
    hi: 'हर अपडेट में तारीख़, स्थान, तस्वीरें और संक्षिप्त तथ्यात्मक विवरण होगा।',
  } as L,
  topics: [
    { en: 'Public meetings', hi: 'जन बैठकें' }, { en: 'Development inspections', hi: 'विकास निरीक्षण' },
    { en: 'Village visits', hi: 'गाँव भ्रमण' }, { en: 'Nagar Panchayat activities', hi: 'नगर पंचायत गतिविधियाँ' },
    { en: 'Community programmes', hi: 'सामुदायिक कार्यक्रम' }, { en: 'Meetings with officials', hi: 'अधिकारियों से बैठकें' },
    { en: 'Youth interactions', hi: 'युवा संवाद' }, { en: 'Farmer interactions', hi: 'किसान संवाद' },
    { en: 'Women-led initiatives', hi: 'महिला-नेतृत्व पहल' }, { en: 'Cultural & social programmes', hi: 'सांस्कृतिक व सामाजिक कार्यक्रम' },
    { en: 'Public statements', hi: 'सार्वजनिक वक्तव्य' }, { en: 'Scheme awareness', hi: 'योजना जागरूकता' },
  ] as L[],
  categoriesTitle: { en: 'Media centre', hi: 'मीडिया केंद्र' } as L,
  categories: [
    { en: 'Public Service', hi: 'जनसेवा' }, { en: 'Development', hi: 'विकास' }, { en: 'Bhagwant Nagar', hi: 'भगवंत नगर' },
    { en: 'Community Interaction', hi: 'जन संवाद' }, { en: 'Youth', hi: 'युवा' }, { en: 'Farmers', hi: 'किसान' },
    { en: 'Women & Self-Help Groups', hi: 'महिला एवं स्वयं सहायता समूह' }, { en: 'Cultural & Social Programmes', hi: 'सांस्कृतिक व सामाजिक कार्यक्रम' },
    { en: 'Political & Organisational', hi: 'राजनीतिक व संगठनात्मक' }, { en: 'Journey Archive', hi: 'यात्रा संग्रह' },
  ] as L[],
};
