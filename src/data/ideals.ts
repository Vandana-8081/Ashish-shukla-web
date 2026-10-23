import type { LocalizedString } from '@/types';

export interface IdealPerson {
  id: string;
  name: LocalizedString;
  portrait?: string;
  portraitFileNeeded?: string;
  portraitAlt: LocalizedString;
  years?: string;
  yearsHi?: string;
  quotation?: { hi: string; en?: string };
  description?: LocalizedString;
  verificationNote?: LocalizedString;
}

export interface IdealCategory {
  id: string;
  title: LocalizedString;
  people: IdealPerson[];
}

// Add people only when their details, quotations, and portrait usage rights are verified.
const allIdealsCategories: IdealCategory[] = [
  {
    id: 'sangh-bjp-leaders',
    title: {
      en: 'National Leaders of the Sangh and BJP',
      hi: 'संघ एवं भाजपा के शिखर पुरुष',
    },
    people: [
      {
        id: 'atal-bihari-vajpayee',
        name: { en: 'Shri Atal Bihari Vajpayee', hi: 'श्री अटल बिहारी वाजपेयी' },
        years: '1924–2018',
        portrait: '/images/ideals/atalbihari.avif',
        portraitAlt: { en: 'Portrait of Atal Bihari Vajpayee', hi: 'अटल बिहारी वाजपेयी का चित्र' },
        quotation: {
          hi: 'देश एक मंदिर है, हम पुजारी हैं। राष्ट्रदेव की पूजा में हमें अपने को समर्पित कर देना चाहिए।',
          en: 'The nation is a temple, and we are its priests. We should dedicate ourselves to the worship of the nation.',
        },
      },
      {
        id: 'narendra-modi',
        name: { en: 'Shri Narendra Modi', hi: 'श्री नरेंद्र मोदी' },
        years: '1950–',
        portrait: '/images/ideals/modiji.avif',
        portraitAlt: { en: 'Portrait of Narendra Modi', hi: 'नरेंद्र मोदी का चित्र' },
        quotation: {
          hi: 'कुछ बनने के लिए सपने मत देखो बल्कि कुछ ऐसा करके दिखाना है ऐसा सपना देखना चाहिए।',
          en: 'Do not dream of simply becoming someone; dream of doing something remarkable.',
        },
      },
      {
        id: 'ashok-singhal',
        name: { en: 'Shri Ashok Singhal', hi: 'श्री अशोक सिंघल' },
        years: '1926–2015',
        portrait: '/images/ideals/ashokji.avif',
        portraitAlt: { en: 'Portrait of Ashok Singhal', hi: 'अशोक सिंघल का चित्र' },
        quotation: {
          hi: 'धर्म जागरण एवं कर्मनिष्ठा का सबसे बड़ा स्रोत श्रीमद्भगवद्गीता ग्रंथ है। मैं अपने जीवनकाल के सत्कर्मों की प्रेरणा स्रोत इसे ही मानता हूँ।',
          en: 'The Bhagavad Gita is the greatest source of spiritual awakening and dedication to action. I regard it as the inspiration for the good deeds of my life.',
        },
      },
      {
        id: 'veer-savarkar',
        name: { en: 'Veer Savarkar', hi: 'वीर सावरकर' },
        years: '1883–1966',
        portrait: '/images/ideals/veer-savarkar.jpg',
        portraitAlt: { en: 'Portrait of Veer Savarkar', hi: 'वीर सावरकर का चित्र' },
        quotation: {
          hi: 'मातृभूमि! तेरे चरणों में पहले ही मैं अपना मन अर्पित कर चुका हूँ। देश-सेवा ही ईश्वर-सेवा है, यह मानकर मैंने तेरी सेवा के माध्यम से भगवान की सेवा की।',
          en: 'O motherland! I have already offered my heart at your feet. Believing that service to the nation is service to God, I served God through service to you.',
        },
      },
      {
        id: 'madhav-sadashiv-golwalkar',
        name: { en: 'Shri Madhav Sadashiv Golwalkar', hi: 'श्री माधव सदाशिव गोलवलकर' },
        years: '1906–1963',
        portrait: '/images/ideals/madhav-sadashiv-golwalkar.jpeg',
        portraitAlt: { en: 'Portrait of Madhav Sadashiv Golwalkar', hi: 'माधव सदाशिव गोलवलकर का चित्र' },
        quotation: {
          hi: 'भारत-भूमि इतनी पावन है कि अखिल विश्व में दिखाई देनेवाला सत तत्व यहीं अनुभूत किया जाता है अन्यत्र नहीं।',
          en: 'The land of India is so sacred that the truth seen throughout the world is experienced here, and nowhere else.',
        },
      },
      {
        id: 'keshav-baliram-hedgewar',
        name: { en: 'Dr. Keshav Baliram Hedgewar', hi: 'डॉ. केशव बलिराम हेडगेवार' },
        years: '1889–1940',
        portrait: '/images/ideals/keshav-baliram-hedgewar.jpg',
        portraitAlt: { en: 'Portrait of Keshav Baliram Hedgewar', hi: 'केशव बलिराम हेडगेवार का चित्र' },
        quotation: {
          hi: 'इस समाज को जागृत एवं सुसंगठित करना ही राष्ट्र का जागरण एवं संगठन है, यही राष्ट्र कार्य है।',
          en: 'Awakening and organizing this society is the awakening and organization of the nation; this is the work of the nation.',
        },
      },
    ],
  },
  {
    id: 'national-heroes',
    title: {
      en: 'Great Heroes of India',
      hi: 'भारत वर्ष के महान नायक',
    },
    people: [
      {
        id: 'maharana-pratap',
        name: { en: 'Maharana Pratap', hi: 'महाराणा प्रताप' },
        years: '1540–1597',
        portrait: '/images/ideals/maharana-pratap.jpg',
        portraitAlt: { en: 'Portrait of Maharana Pratap', hi: 'महाराणा प्रताप का चित्र' },
        quotation: { hi: 'ये संसार कर्मवीरों की ही सुनता है। अतः अपने कर्म के मार्ग पर अडिग और प्रशस्त रहो।' },
        verificationNote: {
          hi: 'तिथियाँ 1540–1597 सुधारी गई हैं। उद्धरण का प्राथमिक ऐतिहासिक स्रोत पुष्ट नहीं है।',
          en: 'Dates corrected to 1540–1597. A primary historical source for the quotation has not been confirmed.',
        },
      },
      {
        id: 'shivaji-maharaj',
        name: { en: 'Shivaji Maharaj', hi: 'शिवाजी महाराज' },
        years: '1630–1680',
        portrait: '/images/ideals/shivaji-maharaj.png',
        portraitAlt: { en: 'Portrait of Shivaji Maharaj', hi: 'शिवाजी महाराज का चित्र' },
        quotation: { hi: 'सर्वप्रथम राष्ट्र, फिर गुरु, फिर माता-पिता, फिर परमेश्वर। अतः पहले खुद को नहीं राष्ट्र को देखना चाहिए।' },
        verificationNote: {
          hi: 'यह कथन सरकारी प्रकाशन सहित आधुनिक संकलनों में मिलता है; समकालीन प्राथमिक स्रोत की पुष्टि नहीं है।',
          en: 'This saying appears in modern compilations, including a government publication; a contemporary primary source has not been confirmed.',
        },
      },
      {
        id: 'guru-gobind-singh',
        name: { en: 'Guru Gobind Singh', hi: 'गुरु गोबिन्द सिंह' },
        years: '1666–1708',
        portrait: '/images/ideals/guru-gobind-singh.jpg',
        portraitAlt: { en: 'Portrait of Guru Gobind Singh', hi: 'गुरु गोबिन्द सिंह का चित्र' },
        quotation: { hi: 'सबसे महान सुख और स्थायी शांति तब प्राप्त होती है जब कोई अपने भीतर से स्वार्थ को समाप्त कर देता है।' },
        verificationNote: {
          hi: 'यह कथन आधुनिक उद्धरण-संकलनों में मिलता है; मूल स्रोत पुष्ट नहीं है।',
          en: 'This saying appears in modern quote collections; its original source has not been confirmed.',
        },
      },
      {
        id: 'samrat-ashoka',
        name: { en: 'Emperor Ashoka', hi: 'सम्राट अशोक' },
        years: 'c. 304–232 BCE',
        yearsHi: 'लगभग 304–232 ईसा पूर्व',
        portrait: '/images/ideals/samrat-ashoka.jpg',
        portraitAlt: { en: 'Portrait of Emperor Ashoka', hi: 'सम्राट अशोक का चित्र' },
        quotation: { hi: 'प्रत्येक समय, मैं चाहे भोजन कर रहा हूँ या शयनागार में हूँ, प्रतिवेदक प्रजा की स्थिति से मुझे अवगत करें। मैं सर्वत्र कार्य करूंगा। प्रजा हित मेरा कर्तव्य है और इसका मूल उद्योग तथा कार्य तत्परता है।' },
        verificationNote: {
          hi: 'तिथियाँ अनुमानित हैं। उद्धरण अशोक के छठे शिलालेख का भावानुवाद है।',
          en: 'Dates are approximate. The quotation is a paraphrase of Ashoka’s Sixth Rock Edict.',
        },
      },
      {
        id: 'chandragupta-maurya',
        name: { en: 'Chandragupta Maurya', hi: 'सम्राट चन्द्रगुप्त मौर्य' },
        years: 'reign c. 321–297 BCE',
        yearsHi: 'अनुमानित शासनकाल: c. 321–297 ईसा पूर्व',
        portrait: '/images/ideals/chandragupta-maurya.jpg',
        portraitAlt: { en: 'Portrait of Chandragupta Maurya', hi: 'चन्द्रगुप्त मौर्य का चित्र' },
        quotation: { hi: 'जीवन में एक बार जो फैसला कर लिया तो फिर पीछे मुड़कर मत देखो, क्योंकि पलट-पलट कर देखने वाले इतिहास नहीं बनाते।' },
        verificationNote: {
          hi: 'जन्म-वर्ष ज्ञात नहीं है; यहाँ अनुमानित शासनकाल दिया है। उद्धरण का ऐतिहासिक स्रोत पुष्ट नहीं है।',
          en: 'His birth year is unknown; the approximate reign is shown. A historical source for the quotation has not been confirmed.',
        },
      },
      {
        id: 'kautilya-chanakya',
        name: { en: 'Kautilya (Chanakya)', hi: 'कौटिल्य (चाणक्य)' },
        years: 'traditional dates disputed',
        yearsHi: 'पारंपरिक तिथियाँ विवादित',
        portrait: '/images/ideals/kautilya-chanakya.jpg',
        portraitAlt: { en: 'Traditional depiction of Kautilya (Chanakya)', hi: 'कौटिल्य (चाणक्य) का पारंपरिक चित्रण' },
        quotation: { hi: 'शिक्षा सबसे अच्छी मित्र है। एक शिक्षित व्यक्ति हर जगह सम्मान पाता है। शिक्षा सौंदर्य और यौवन को परास्त कर देती है।' },
        verificationNote: {
          hi: 'चाणक्य-कौटिल्य की पहचान और तिथियों पर विद्वानों में मतभेद हैं; कथन का मूल स्रोत पुष्ट नहीं है।',
          en: 'Scholars dispute Chanakya–Kautilya’s identification and dates; the saying’s original source has not been confirmed.',
        },
      },
      {
        id: 'kabir-das',
        name: { en: 'Kabir Das', hi: 'कबीर दास' },
        years: 'traditional dates c. 1398–1518; disputed',
        yearsHi: 'पारंपरिक तिथियाँ c. 1398–1518; विवादित',
        portrait: '/images/ideals/kabir-das.jpg',
        portraitAlt: { en: 'Portrait of Kabir Das', hi: 'कबीर दास का चित्र' },
        quotation: { hi: 'बुरा जो देखन मैं चला, बुरा न मिलिया कोय; जो दिल खोजा आपना, मुझसे बुरा न कोय।' },
        verificationNote: {
          hi: 'जीवन-तिथियाँ विवादित हैं और दोहे के पाठांतर मिलते हैं।',
          en: 'His dates are disputed, and versions of this couplet vary.',
        },
      },
      {
        id: 'sant-ravidas',
        name: { en: 'Sant Ravidas', hi: 'संत रविदास' },
        years: 'c. 1450–1520 (disputed estimate)',
        yearsHi: 'लगभग 1450–1520 (अनुमान विवादित)',
        portrait: '/images/ideals/sant-ravidas.jpg',
        portraitAlt: { en: 'Portrait of Sant Ravidas', hi: 'संत रविदास का चित्र' },
        quotation: { hi: 'करम बंधन में बन्ध रहियो, फल की ना तज्जियो आस। कर्म मानुष का धर्म है, सत् भाखै रविदास।' },
        verificationNote: {
          hi: 'जीवन-तिथियाँ अनुमानित और विवादित हैं; दोहे का मूल स्रोत पुष्ट नहीं है।',
          en: 'Dates are approximate and disputed; the original source of the couplet has not been confirmed.',
        },
      },
      {
        id: 'tulsidas',
        name: { en: 'Tulsidas', hi: 'तुलसी दास' },
        years: 'c. 1532–1623 (birth date disputed)',
        yearsHi: 'लगभग 1532–1623 (जन्म-वर्ष विवादित)',
        portrait: '/images/ideals/tulsidas.jpg',
        portraitAlt: { en: 'Portrait of Tulsidas', hi: 'तुलसी दास का चित्र' },
        quotation: { hi: 'तुलसी मीठे बचन ते सुख उपजत चहुँ ओर। सीकरन इक मंत्र है, परिहरू बचन कठोर।' },
        verificationNote: {
          hi: 'जन्म-वर्ष विवादित है; दोहे के पाठांतर मिलते हैं।',
          en: 'His birth year is disputed, and versions of this couplet vary.',
        },
      },
    ],
  },
  {
    id: 'religious-thinkers',
    title: {
      en: 'Great Proponents of Indian Religions',
      hi: 'भारतीय धर्म के महान प्रणेता',
    },
    people: [
      {
        id: 'lord-rama',
        name: { en: 'Lord Shri Ram', hi: 'भगवान श्री राम' },
        portrait: '/images/ideals/lord-ram.jpg',
        portraitAlt: { en: 'Portrait of Lord Shri Ram', hi: 'भगवान श्री राम का चित्र' },
        quotation: {
          hi: 'संत दूसरों को दुःख से बचाने के लिए कष्ट सहते हैं. दुष्ट लोग दूसरों को दुःख में डालने के लिए हैं।',
        },
        verificationNote: {
          hi: 'यह उद्धरण संदर्भ पृष्ठ पर दिया गया है; इसका मूल ग्रंथ-स्रोत स्वतंत्र रूप से पुष्ट नहीं है।',
          en: 'This quotation appears on the reference page; its original scriptural source has not been independently confirmed.',
        },
      },
      {
        id: 'lord-mahavira',
        name: { en: 'Lord Mahavira', hi: 'भगवान महावीर' },
        years: '599–527 BCE',
        yearsHi: '599–527 ईसा पूर्व',
        portrait: '/images/ideals/lord-mahavir.jpg',
        portraitAlt: { en: 'Portrait of Lord Mahavira', hi: 'भगवान महावीर का चित्र' },
        quotation: { hi: 'अहिंसा ही सबसे बड़ा धर्म है जो सबके कल्याण की कामना करता है।' },
        verificationNote: {
          hi: 'तिथियाँ परंपरा के अनुसार बदलती हैं; 599–527 ईसा पूर्व श्वेतांबर परंपरा में प्रचलित है। उद्धरण का मूल स्रोत पुष्ट नहीं है।',
          en: 'Dates vary by tradition; 599–527 BCE is commonly given in the Shvetambara tradition. The quotation’s original source is unconfirmed.',
        },
      },
      {
        id: 'lord-buddha',
        name: { en: 'Lord Buddha', hi: 'भगवान बुद्ध' },
        years: '563–483 BCE (traditional)',
        yearsHi: '563–483 ईसा पूर्व (परंपरागत)',
        portrait: '/images/ideals/lord-buddha.jpg',
        portraitAlt: { en: 'Portrait of Lord Buddha', hi: 'भगवान बुद्ध का चित्र' },
        quotation: { hi: 'हजारों खोखले शब्दों से अच्छा वह एक शब्द है जो शांति लाए।' },
        verificationNote: {
          hi: 'यह पारंपरिक तिथि-सीमा है; आधुनिक इतिहासकारों में बुद्ध के जीवनकाल पर मतभेद हैं। यह कथन धम्मपद 100 का प्रचलित अनुवाद है।',
          en: 'These are traditional dates; historians differ on the Buddha’s lifetime. The saying is a common rendering of Dhammapada 100.',
        },
      },
      {
        id: 'lord-krishna',
        name: { en: 'Lord Shri Krishna', hi: 'भगवान श्री कृष्ण' },
        portrait: '/images/ideals/lord-krishna.jpg',
        portraitAlt: { en: 'Portrait of Lord Shri Krishna', hi: 'भगवान श्री कृष्ण का चित्र' },
        quotation: {
          hi: 'मैं सभी प्राणियों को समान रूप से देखता हूँ, ना कोई मुझे कम प्रिय है ना अधिक। लेकिन जो मेरी प्रेमपूर्वक आराधना करते हैं वो मेरे भीतर रहते हैं और मैं उनके जीवन में आता हूँ।',
        },
        verificationNote: {
          hi: 'यह भगवद्गीता 9.29 का भावानुवाद है; शब्दशः अनुवाद अलग-अलग हो सकते हैं।',
          en: 'This is a paraphrase of Bhagavad Gita 9.29; translations vary.',
        },
      },
      {
        id: 'guru-nanak',
        name: { en: 'Guru Nanak', hi: 'गुरु नानक' },
        years: '1469–1539',
        portrait: '/images/ideals/guru-nanak.jpg',
        portraitAlt: { en: 'Portrait of Guru Nanak', hi: 'गुरु नानक का चित्र' },
        quotation: { hi: 'परमात्मा एक है और उसके लिए सब एक समान है।' },
        verificationNote: {
          hi: 'यह विचार संदर्भ पृष्ठ पर गुरु नानक से संबद्ध है; इस सटीक वाक्य का मूल स्रोत पुष्ट नहीं है।',
          en: 'This thought is attributed to Guru Nanak on the reference page; the source of this exact wording is unconfirmed.',
        },
      },
      {
        id: 'gayatri-parivar',
        name: { en: 'Gayatri Parivar', hi: 'गायत्री परिवार' },
        portrait: '/images/ideals/gayatri-parivar.jpg',
        portraitAlt: { en: 'Gayatri Parivar emblem or authorized image', hi: 'गायत्री परिवार का प्रतीक या अधिकृत चित्र' },
        quotation: {
          hi: 'सफलता का मापदंड विजय, पराजय अथवा धन-दौलत नहीं, बल्कि वे कर्तव्य हैं, जिनका किसी ने आपत्ति तथा हानि की स्थिति में भी निष्ठापूर्वक पालन किया है।',
        },
        verificationNote: {
          hi: 'यह कथन संदर्भ पृष्ठ पर गायत्री परिवार से संबद्ध है; मूल स्रोत स्वतंत्र रूप से पुष्ट नहीं है।',
          en: 'This statement is attributed to Gayatri Parivar on the reference page; its original source has not been independently confirmed.',
        },
      },
    ],
  },
  {
    id: 'social-political-leaders',
    title: {
      en: 'Leaders of Social and Political Awakening',
      hi: 'सामाजिक एवं राजनीतिक चेतना के जननायक',
    },
    people: [
      {
        id: 'vallabhbhai-patel',
        name: { en: 'Sardar Vallabhbhai Patel', hi: 'सरदार वल्लभ भाई पटेल' },
        years: '1875–1950',
        portrait: '/images/ideals/sardar-vallabhbhai-patel.jpg',
        portraitAlt: { en: 'Portrait of Sardar Vallabhbhai Patel', hi: 'सरदार वल्लभ भाई पटेल का चित्र' },
        quotation: { hi: 'हमारे देश की मिट्टी में कुछ अनूठा है तभी तो कठिन बाधाओं के बावजूद हमेशा महान आत्माओं का निवास स्थान रहा है।' },
        verificationNote: { hi: 'यह कथन संदर्भ पृष्ठ पर पटेल से संबद्ध है; मूल स्रोत स्वतंत्र रूप से पुष्ट नहीं है।', en: 'This saying is attributed to Patel on the reference page; its original source is unconfirmed.' },
      },
      {
        id: 'morarji-desai',
        name: { en: 'Morarji Desai', hi: 'मोरारजी देसाई' },
        years: '1896–1995',
        portrait: '/images/ideals/morarji-desai.jpg',
        portraitAlt: { en: 'Portrait of Morarji Desai', hi: 'मोरारजी देसाई का चित्र' },
        quotation: { hi: 'किसी भी समय जीवन मुश्किल बन सकता है और किसी भी समय जीवन बहुत आसान बन सकता है। यह सब हमारे जीवन के समायोजन पर निर्भर करता है।' },
        verificationNote: { hi: 'यह कथन संदर्भ पृष्ठ पर देसाई से संबद्ध है; मूल स्रोत स्वतंत्र रूप से पुष्ट नहीं है।', en: 'This saying is attributed to Desai on the reference page; its original source is unconfirmed.' },
      },
      {
        id: 'bhimrao-ambedkar',
        name: { en: 'Dr. Bhimrao Ambedkar', hi: 'डॉ. भीमराव अम्बेडकर' },
        years: '1891–1956',
        portrait: '/images/ideals/dr-bhimrao-ambedkar.jpg',
        portraitAlt: { en: 'Portrait of Dr. Bhimrao Ambedkar', hi: 'डॉ. भीमराव अम्बेडकर का चित्र' },
        quotation: { hi: 'समानता एक कल्पना हो सकती है लेकिन फिर भी इसे एक गवर्निंग सिद्धांत के रूप में स्वीकार करना होगा।' },
        verificationNote: { hi: 'यह विचार अम्बेडकर के लेखन में दर्ज है; यहाँ दिया गया हिंदी पाठ अनुवाद है।', en: 'This statement is documented in Ambedkar’s writings; the Hindi wording here is a translation.' },
      },
      {
        id: 'mother-teresa',
        name: { en: 'Mother Teresa', hi: 'मदर टेरेसा' },
        years: '1910–1997',
        portrait: '/images/ideals/mother-teresa.jpg',
        portraitAlt: { en: 'Portrait of Mother Teresa', hi: 'मदर टेरेसा का चित्र' },
        quotation: { hi: 'हम सब यही सोचते हैं कि हमारे किए गए कार्य तो समुद्र में एक बूंद के बराबर होते हैं, लेकिन ध्यान रखने वाली यह भी बात है कि उस बूंद के बिना सागर का पानी तो कम ही होगा।' },
        verificationNote: { hi: 'यह कथन टेरेसा से व्यापक रूप से जोड़ा जाता है; इस विस्तृत हिंदी पाठ का मूल स्रोत पुष्ट नहीं है।', en: 'This saying is widely associated with Teresa; the source of this extended Hindi wording is unconfirmed.' },
      },
      {
        id: 'apj-abdul-kalam',
        name: { en: 'Dr. A. P. J. Abdul Kalam', hi: 'अब्दुल कलाम' },
        years: '1931–2015',
        portrait: '/images/ideals/apj-abdul-kalam.png',
        portraitAlt: { en: 'Portrait of A. P. J. Abdul Kalam', hi: 'ए. पी. जे. अब्दुल कलाम का चित्र' },
        quotation: { hi: 'जीवन में सुख का अनुभव तभी प्राप्त होता है जब इन सुखों को कठिनाइयों से प्राप्त किया जाता है।' },
        verificationNote: { hi: 'यह कथन संदर्भ पृष्ठ पर कलाम से संबद्ध है; मूल स्रोत स्वतंत्र रूप से पुष्ट नहीं है।', en: 'This saying is attributed to Kalam on the reference page; its original source is unconfirmed.' },
      },
      {
        id: 'swami-vivekananda',
        name: { en: 'Swami Vivekananda', hi: 'स्वामी विवेकानन्द' },
        years: '1863–1902',
        portrait: '/images/ideals/swami-vivekananda.png',
        portraitAlt: { en: 'Portrait of Swami Vivekananda', hi: 'स्वामी विवेकानन्द का चित्र' },
        quotation: { hi: 'किसी भी कार्य को करने के लिए तुरंत उठो, जागो और तब तक नहीं रुको जब तक लक्ष्य हासिल न हो जाए।' },
        verificationNote: { hi: 'यह प्रचलित पंक्ति कठोपनिषद् से प्रेरित विवेकानन्द के प्रसिद्ध आह्वान का रूपांतर है; यह सटीक पाठ पुष्ट नहीं है।', en: 'This familiar line adapts Vivekananda’s call inspired by the Katha Upanishad; this exact wording is unconfirmed.' },
      },
      {
        id: 'ramakrishna-paramahamsa',
        name: { en: 'Ramakrishna Paramahamsa', hi: 'रामकृष्ण परमहंस' },
        years: '1836–1886',
        portrait: '/images/ideals/ramakrishna-paramahamsa.jpg',
        portraitAlt: { en: 'Portrait of Ramakrishna Paramahamsa', hi: 'रामकृष्ण परमहंस का चित्र' },
        quotation: { hi: 'जब फूल खिलता है तो मधुमक्खी बिना बुलाए आ जाती है और जब हम प्रसिद्ध होंगे तो लोग बिना बताए हमारा गुणगान करने लगेंगे।' },
        verificationNote: { hi: 'यह कथन रामकृष्ण से संबद्ध है; इसका मूल स्रोत स्वतंत्र रूप से पुष्ट नहीं है।', en: 'This saying is attributed to Ramakrishna; its original source is unconfirmed.' },
      },
      {
        id: 'rabindranath-tagore',
        name: { en: 'Rabindranath Tagore', hi: 'रवीन्द्रनाथ टैगोर' },
        years: '1861–1941',
        portrait: '/images/ideals/rabindranath-tagore.jpg',
        portraitAlt: { en: 'Portrait of Rabindranath Tagore', hi: 'रवीन्द्रनाथ टैगोर का चित्र' },
        quotation: { hi: 'हम यह प्रार्थना न करें कि हमारे ऊपर खतरे न आएँ, बल्कि यह करें कि हम उनका सामना करने में निडर रहें।' },
        verificationNote: { hi: 'यह कथन टैगोर से जुड़ी प्रार्थना का प्रचलित रूपांतर है; मूल पाठ और अनुवाद पुष्ट नहीं हैं।', en: 'This is a familiar paraphrase of a prayer associated with Tagore; the original wording and translation are unconfirmed.' },
      },
      {
        id: 'subhas-chandra-bose',
        name: { en: 'Subhas Chandra Bose', hi: 'सुभाष चन्द्र बोस' },
        years: '1897–1945',
        portrait: '/images/ideals/subhas-chandra-bose.jpg',
        portraitAlt: { en: 'Portrait of Subhas Chandra Bose', hi: 'सुभाष चन्द्र बोस का चित्र' },
        quotation: { hi: 'हमारी राह भले ही भयानक और पथरीली हो, हमारी यात्रा चाहे कितनी भी कष्टदायक हो, फिर भी हमें आगे बढ़ना ही है। सफलता का दिन दूर हो सकता है, पर उसका आना अनिवार्य है।' },
        verificationNote: { hi: 'यह कथन संदर्भ पृष्ठ पर बोस से संबद्ध है; मूल स्रोत स्वतंत्र रूप से पुष्ट नहीं है।', en: 'This saying is attributed to Bose on the reference page; its original source is unconfirmed.' },
      },
      {
        id: 'swami-dayananda-saraswati',
        name: { en: 'Swami Dayananda Saraswati', hi: 'स्वामी दयानन्द सरस्वती' },
        years: '1824–1883',
        portrait: '/images/ideals/swami-dayananda-saraswati.jpg',
        portraitAlt: { en: 'Portrait of Swami Dayananda Saraswati', hi: 'स्वामी दयानन्द सरस्वती का चित्र' },
        quotation: { hi: '(आर्य समाज) दुनिया को अपना सर्वश्रेष्ठ दीजिए और आपके पास सर्वश्रेष्ठ लौटकर आएगा।' },
        verificationNote: { hi: 'यह कथन संदर्भ पृष्ठ पर दयानन्द सरस्वती से संबद्ध है; मूल स्रोत स्वतंत्र रूप से पुष्ट नहीं है।', en: 'This saying is attributed to Dayananda Saraswati on the reference page; its original source is unconfirmed.' },
      },
      {
        id: 'chandrashekhar-azad',
        name: { en: 'Chandrashekhar Azad', hi: 'चन्द्रशेखर आजाद' },
        years: '1906–1931',
        portrait: '/images/ideals/chandrashekhar-azad.jpg',
        portraitAlt: { en: 'Portrait of Chandrashekhar Azad', hi: 'चन्द्रशेखर आजाद का चित्र' },
        quotation: { hi: 'आप हर दिन दूसरों के अपने रिकॉर्ड तोड़ने की प्रतीक्षा मत करो, बल्कि खुद उसे तोड़ने का प्रयत्न करो, क्योंकि सफलता के लिए आपकी खुद से लड़ाई है।' },
        verificationNote: { hi: 'यह कथन संदर्भ पृष्ठ पर आजाद से संबद्ध है; मूल स्रोत स्वतंत्र रूप से पुष्ट नहीं है।', en: 'This saying is attributed to Azad on the reference page; its original source is unconfirmed.' },
      },
      {
        id: 'rani-lakshmibai',
        name: { en: 'Rani Lakshmibai of Jhansi', hi: 'झाँसी की रानी लक्ष्मीबाई' },
        years: '1828–1858',
        portrait: '/images/ideals/rani-lakshmibai.jpg',
        portraitAlt: { en: 'Portrait of Rani Lakshmibai', hi: 'रानी लक्ष्मीबाई का चित्र' },
        quotation: { hi: 'चमक उठी सन सत्तावन में, वह तलवार पुरानी थी, बुंदेले हरबोलों के मुँह हमने सुनी कहानी थी, खूब लड़ी मर्दानी वह तो झाँसी वाली रानी थी।' },
        verificationNote: { hi: 'ये पंक्तियाँ सुभद्रा कुमारी चौहान की कविता “झाँसी की रानी” से हैं; ये रानी लक्ष्मीबाई के शब्द नहीं हैं।', en: 'These lines are from Subhadra Kumari Chauhan’s poem “Jhansi Ki Rani”; they are not Lakshmibai’s own words.' },
      },
      {
        id: 'jyotiba-phule',
        name: { en: 'Mahatma Jyotiba Phule', hi: 'महात्मा ज्योतिबा फुले' },
        years: '1827–1890',
        portrait: '/images/ideals/jyotiba-phule.jpg',
        portraitAlt: { en: 'Portrait of Jyotiba Phule', hi: 'ज्योतिबा फुले का चित्र' },
        quotation: { hi: 'विद्या बिन मति गई, मति बिना नीति गई, नीति बिना गति गई, गति बिना वित्त गया।' },
        verificationNote: { hi: 'यह कथन फुले से संबद्ध है; इस पाठ का मूल स्रोत स्वतंत्र रूप से पुष्ट नहीं है।', en: 'This saying is attributed to Phule; the source of this wording is unconfirmed.' },
      },
      {
        id: 'savitri-bai-phule',
        name: { en: 'Savitribai Phule', hi: 'सावित्रीबाई फुले' },
        years: '1831–1897',
        portrait: '/images/ideals/savitribai-phule.jpg',
        portraitAlt: { en: 'Portrait of Savitribai Phule', hi: 'सावित्रीबाई फुले का चित्र' },
        quotation: { hi: 'जाओ जाकर पढ़ो-लिखो, बनो आत्मनिर्भर, बनो मेहनती। काम करो, ज्ञान और धन इकट्ठा करो। ज्ञान के बिना सब खो जाता है।' },
        verificationNote: { hi: 'यह कथन फुले से संबद्ध है; इस विस्तृत हिंदी पाठ का मूल स्रोत स्वतंत्र रूप से पुष्ट नहीं है।', en: 'This saying is attributed to Phule; the source of this extended Hindi wording is unconfirmed.' },
      },
      {
        id: 'bhagat-singh',
        name: { en: 'Bhagat Singh', hi: 'भगत सिंह' },
        years: '1907–1931',
        portrait: '/images/ideals/bhagat-singh.jpg',
        portraitAlt: { en: 'Portrait of Bhagat Singh', hi: 'भगत सिंह का चित्र' },
        quotation: { hi: 'जो व्यक्ति भी विकास के लिए खड़ा है, उसे हर एक रूढ़िवादी चीज की आलोचना करनी होगी, उसमें अविश्वास करना होगा तथा उसे चुनौती देनी होगी।' },
        verificationNote: { hi: 'यह कथन भगत सिंह के प्रगतिशील विचारों का प्रचलित रूपांतर है; इस सटीक हिंदी पाठ का मूल स्रोत पुष्ट नहीं है।', en: 'This familiar saying paraphrases Bhagat Singh’s views on progress; the source of this exact Hindi wording is unconfirmed.' },
      },
      {
        id: 'mahatma-gandhi',
        name: { en: 'Mahatma Gandhi', hi: 'महात्मा गांधी' },
        years: '1869–1948',
        portrait: '/images/ideals/mahatma-gandhi.jpg',
        portraitAlt: { en: 'Portrait of Mahatma Gandhi', hi: 'महात्मा गांधी का चित्र' },
        quotation: { hi: 'हमें स्वच्छता और सफाई का मूल्य पता होना चाहिए। गंदगी को हमें अपने बीच से हटाना होगा। क्या स्वच्छता स्वयं इनाम नहीं है?' },
        verificationNote: { hi: 'यह कथन संदर्भ पृष्ठ पर गांधी से संबद्ध है; इस सटीक हिंदी पाठ का मूल स्रोत पुष्ट नहीं है।', en: 'This saying is attributed to Gandhi on the reference page; the source of this exact Hindi wording is unconfirmed.' },
      },
    ],
  },
];

// The public page mirrors the reference site: three groups, twelve people.
// Nanaji Deshmukh and Rajmata Vijayaraje Scindia are still missing (no verified details or portraits yet).
const allPeople = allIdealsCategories.flatMap(({ people }) => people);
const pick = (...ids: string[]) =>
  ids.flatMap((id) => allPeople.filter((person) => person.id === id));

export const idealsCategories: IdealCategory[] = [
  {
    id: 'rss',
    title: { en: 'Rashtriya Swayamsevak Sangh', hi: 'राष्ट्रीय स्वयंसेवक संघ' },
    people: pick('keshav-baliram-hedgewar', 'madhav-sadashiv-golwalkar', 'veer-savarkar', 'ashok-singhal'),
  },
  {
    id: 'bjp',
    title: { en: 'Bharatiya Janata Party', hi: 'भारतीय जनता पार्टी' },
    people: pick('atal-bihari-vajpayee', 'narendra-modi'),
  },
  {
    id: 'nation-builders',
    title: { en: 'Nation Builders', hi: 'राष्ट्र-निर्माता' },
    people: pick('swami-vivekananda', 'apj-abdul-kalam', 'shivaji-maharaj', 'subhas-chandra-bose', 'bhagat-singh', 'vallabhbhai-patel'),
  },
];
