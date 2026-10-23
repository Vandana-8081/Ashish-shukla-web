import type { LocalizedString } from '@/types';

export type EcardMotif =
  | 'diyas' | 'diyas-moon' | 'sun' | 'splash' | 'rakhi' | 'kite' | 'bow' | 'feather'
  | 'crescent' | 'ghat' | 'om' | 'lotus' | 'tree' | 'chakra' | 'fireworks' | 'balloons' | 'portrait';

export interface EcardOccasion {
  id: string;
  label: LocalizedString;
  /** Big title printed on the card. */
  title: LocalizedString;
  /** Main wish inside the message box. */
  main: LocalizedString;
  /** Smaller line under the main wish. */
  sub: LocalizedString;
  /** Background gradient, top to bottom. */
  colors: [string, string];
  accent: string;
  motif: EcardMotif;
}

const L = (en: string, hi: string): LocalizedString => ({ en, hi });

export const ecardOccasions: EcardOccasion[] = [
  { id: 'dev-deepawali', motif: 'ghat', colors: ['#2B1259', '#12062E'], accent: '#FFC24D', label: L('Dev Deepawali', 'देव दीपावली'), title: L('Dev Deepawali', 'देव दीपावली'), main: L('May the lamps on the ghats light every home.', 'घाटों के दीपों से हर घर जगमगाए।'), sub: L('On Kartik Purnima, lakhs of diyas light the ghats along the Ganga.', 'कार्तिक पूर्णिमा पर गंगा तट दीपों की रोशनी से आलोकित होते हैं।') },
  { id: 'deepawali', motif: 'diyas', colors: ['#B3350A', '#4A1200'], accent: '#FFC24D', label: L('Deepawali', 'दीपावली'), title: L('Happy Deepawali', 'शुभ दीपावली'), main: L('May the light of diyas fill your life with joy.', 'दीपों का प्रकाश आपके जीवन में खुशियाँ भर दे।'), sub: L('Wishing you and your family prosperity and happiness.', 'आपको और आपके परिवार को सुख-समृद्धि की शुभकामनाएँ।') },
  { id: 'chhath', motif: 'sun', colors: ['#C2570B', '#5A1E00'], accent: '#FFD36B', label: L('Chhath Puja', 'छठ पूजा'), title: L('Chhath Puja', 'छठ पूजा'), main: L('May Chhathi Maiya bless you and your family.', 'छठी मैया आप और आपके परिवार पर कृपा बनाए रखें।'), sub: L('Offering arghya to the rising and setting sun with devotion.', 'उगते और डूबते सूर्य को श्रद्धा से अर्घ्य।') },
  { id: 'holi', motif: 'splash', colors: ['#7B1FA2', '#2A0A47'], accent: '#FFE066', label: L('Holi', 'होली'), title: L('Happy Holi', 'होली की शुभकामनाएँ'), main: L('May the colours of Holi fill your life with joy.', 'रंगों का यह पर्व आपके जीवन में खुशियों के रंग भरे।'), sub: L('Let love, unity and brotherhood colour every heart.', 'प्रेम, एकता और भाईचारे के रंग हर दिल में बसें।') },
  { id: 'navratri', motif: 'lotus', colors: ['#A3122B', '#43060F'], accent: '#FFC24D', label: L('Navratri / Vijayadashami', 'नवरात्रि / विजयादशमी'), title: L('Navratri & Vijayadashami', 'नवरात्रि एवं विजयादशमी'), main: L('May Maa Durga bless you with strength and victory.', 'माँ दुर्गा आपको शक्ति और विजय का आशीर्वाद दें।'), sub: L('The victory of good over evil, truth over falsehood.', 'अच्छाई की बुराई पर, सत्य की असत्य पर विजय का पर्व।') },
  { id: 'mahashivratri', motif: 'om', colors: ['#27307A', '#0E1236'], accent: '#FFD36B', label: L('Mahashivratri', 'महाशिवरात्रि'), title: L('Mahashivratri', 'महाशिवरात्रि'), main: L('Har Har Mahadev!', 'हर हर महादेव!'), sub: L('May Lord Shiva bless you with peace, health and strength.', 'भगवान शिव आपको शांति, स्वास्थ्य और शक्ति दें।') },
  { id: 'raksha-bandhan', motif: 'rakhi', colors: ['#9C1F52', '#4A0B28'], accent: '#FFD36B', label: L('Raksha Bandhan', 'रक्षाबंधन'), title: L('Raksha Bandhan', 'रक्षाबंधन'), main: L("A sister's love, a brother's promise.", 'बहन का स्नेह, भाई का वचन।'), sub: L('The sacred thread of protection and affection between brothers and sisters.', 'भाई-बहन के पवित्र स्नेह और रक्षा का धागा।') },
  { id: 'makar-sankranti', motif: 'kite', colors: ['#E58A00', '#8A3200'], accent: '#FFF1B8', label: L('Makar Sankranti', 'मकर संक्रांति'), title: L('Makar Sankranti', 'मकर संक्रांति'), main: L('May your life soar high like a kite.', 'आपका जीवन पतंग की तरह ऊँचाइयाँ छुए।'), sub: L('Wishing you warmth, sweetness and new beginnings.', 'नई शुरुआत, मिठास और उमंग की शुभकामनाएँ।') },
  { id: 'ram-navami', motif: 'bow', colors: ['#C2570B', '#521B00'], accent: '#FFD36B', label: L('Ram Navami', 'रामनवमी'), title: L('Ram Navami', 'रामनवमी'), main: L('Jai Shri Ram!', 'जय श्री राम!'), sub: L("May Lord Ram's ideals guide us towards truth and dharma.", 'प्रभु श्रीराम के आदर्श हमें सत्य और धर्म के पथ पर चलाएँ।') },
  { id: 'janmashtami', motif: 'feather', colors: ['#1B5FA8', '#0A2347'], accent: '#FFD36B', label: L('Janmashtami', 'जन्माष्टमी'), title: L('Shri Krishna Janmashtami', 'श्रीकृष्ण जन्माष्टमी'), main: L('May Shri Krishna fill your life with happiness.', 'श्री कृष्ण आपके जीवन में सुख और शांति भरें।'), sub: L('Hathi ghoda palki, jai Kanhaiya Lal ki!', 'हाथी घोड़ा पालकी, जय कन्हैया लाल की!') },
  { id: 'eid', motif: 'crescent', colors: ['#157A52', '#06301F'], accent: '#FFE9A8', label: L('Eid', 'ईद'), title: L('Eid Mubarak', 'ईद मुबारक'), main: L('May this Eid bring peace and happiness to all.', 'यह ईद सभी के जीवन में अमन और खुशियाँ लाए।'), sub: L('Wishing you love, harmony and blessings.', 'प्रेम, सद्भाव और बरकत की शुभकामनाएँ।') },
  { id: 'christmas', motif: 'tree', colors: ['#B71C1C', '#4A0A0A'], accent: '#FFE08A', label: L('Christmas', 'क्रिसमस'), title: L('Merry Christmas', 'क्रिसमस की शुभकामनाएँ'), main: L('Wishing you love, peace and joy.', 'आपके जीवन में प्रेम, शांति और खुशियाँ बनी रहें।'), sub: L('May the spirit of Christmas bring us all together.', 'क्रिसमस की भावना हम सबको जोड़े रखे।') },
  { id: 'independence-day', motif: 'chakra', colors: ['#12306B', '#06143A'], accent: '#FFB04D', label: L('Independence Day', 'स्वतंत्रता दिवस'), title: L('Independence Day', 'स्वतंत्रता दिवस'), main: L('Vande Mataram! Jai Hind!', 'वंदे मातरम्! जय हिंद!'), sub: L('Salute to the brave who gave us freedom.', 'आज़ादी दिलाने वाले वीरों को नमन।') },
  { id: 'republic-day', motif: 'chakra', colors: ['#0E4A2C', '#04200F'], accent: '#FFB04D', label: L('Republic Day', 'गणतंत्र दिवस'), title: L('Republic Day', 'गणतंत्र दिवस'), main: L('Proud to be Indian. Jai Hind!', 'हमें भारतीय होने पर गर्व है। जय हिंद!'), sub: L('Let us uphold the values of our Constitution.', 'आइए संविधान के मूल्यों को अपनाएँ।') },
  { id: 'new-year', motif: 'fireworks', colors: ['#2A1366', '#0A0626'], accent: '#FFD166', label: L('New Year', 'नव वर्ष'), title: L('Happy New Year', 'नव वर्ष की शुभकामनाएँ'), main: L('May the new year bring new hope and success.', 'नया वर्ष नई आशा, उमंग और सफलता लाए।'), sub: L('Wishing you good health and happiness all year round.', 'पूरे वर्ष आप स्वस्थ और प्रसन्न रहें।') },
  { id: 'birthday', motif: 'balloons', colors: ['#D4510A', '#6E1F00'], accent: '#FFE08A', label: L('Birthday wishes', 'जन्मदिन की बधाई'), title: L('Happy Birthday', 'जन्मदिन की शुभकामनाएँ'), main: L('May you be blessed with a long and happy life.', 'आप स्वस्थ रहें, प्रसन्न रहें और दीर्घायु हों।'), sub: L('Wishing you a wonderful year ahead.', 'आने वाला वर्ष आपके लिए मंगलमय हो।') },
];

export interface Anniversary {
  id: string;
  /** id of the matching person on the Our Ideals page (used for the portrait). */
  personId: string;
  name: LocalizedString;
  kind: 'birth' | 'death';
  month: number;
  day: number;
}

const A = (id: string, en: string, hi: string, kind: 'birth' | 'death', month: number, day: number): Anniversary =>
  ({ id: `${id}-${kind}`, personId: id, name: L(en, hi), kind, month, day });

/** Well-documented Gregorian dates of the personalities on the Our Ideals page. Verify before publishing changes. */
export const anniversaries: Anniversary[] = [
  A('atal-bihari-vajpayee', 'Shri Atal Bihari Vajpayee', 'श्री अटल बिहारी वाजपेयी', 'birth', 12, 25),
  A('atal-bihari-vajpayee', 'Shri Atal Bihari Vajpayee', 'श्री अटल बिहारी वाजपेयी', 'death', 8, 16),
  A('shyama-prasad-mukherjee', 'Dr. Syama Prasad Mukherjee', 'डॉ. श्यामा प्रसाद मुखर्जी', 'birth', 7, 6),
  A('shyama-prasad-mukherjee', 'Dr. Syama Prasad Mukherjee', 'डॉ. श्यामा प्रसाद मुखर्जी', 'death', 6, 23),
  A('deen-dayal-upadhyaya', 'Pt. Deen Dayal Upadhyaya', 'पं. दीन दयाल उपाध्याय', 'birth', 9, 25),
  A('deen-dayal-upadhyaya', 'Pt. Deen Dayal Upadhyaya', 'पं. दीन दयाल उपाध्याय', 'death', 2, 11),
  A('ashok-singhal', 'Shri Ashok Singhal', 'श्री अशोक सिंघल', 'birth', 9, 27),
  A('ashok-singhal', 'Shri Ashok Singhal', 'श्री अशोक सिंघल', 'death', 11, 17),
  A('veer-savarkar', 'Veer Savarkar', 'वीर सावरकर', 'birth', 5, 28),
  A('veer-savarkar', 'Veer Savarkar', 'वीर सावरकर', 'death', 2, 26),
  A('vallabhbhai-patel', 'Sardar Vallabhbhai Patel', 'सरदार वल्लभभाई पटेल', 'birth', 10, 31),
  A('vallabhbhai-patel', 'Sardar Vallabhbhai Patel', 'सरदार वल्लभभाई पटेल', 'death', 12, 15),
  A('bhimrao-ambedkar', 'Dr. B. R. Ambedkar', 'डॉ. भीमराव आंबेडकर', 'birth', 4, 14),
  A('bhimrao-ambedkar', 'Dr. B. R. Ambedkar', 'डॉ. भीमराव आंबेडकर', 'death', 12, 6),
  A('mahatma-gandhi', 'Mahatma Gandhi', 'महात्मा गांधी', 'birth', 10, 2),
  A('mahatma-gandhi', 'Mahatma Gandhi', 'महात्मा गांधी', 'death', 1, 30),
  A('subhas-chandra-bose', 'Netaji Subhas Chandra Bose', 'नेताजी सुभाष चन्द्र बोस', 'birth', 1, 23),
  A('swami-vivekananda', 'Swami Vivekananda', 'स्वामी विवेकानंद', 'birth', 1, 12),
  A('swami-vivekananda', 'Swami Vivekananda', 'स्वामी विवेकानंद', 'death', 7, 4),
  A('bhagat-singh', 'Shaheed Bhagat Singh', 'शहीद भगत सिंह', 'birth', 9, 28),
  A('bhagat-singh', 'Shaheed Bhagat Singh', 'शहीद भगत सिंह', 'death', 3, 23),
  A('chandrashekhar-azad', 'Chandrashekhar Azad', 'चंद्रशेखर आज़ाद', 'birth', 7, 23),
  A('chandrashekhar-azad', 'Chandrashekhar Azad', 'चंद्रशेखर आज़ाद', 'death', 2, 27),
  A('rani-lakshmibai', 'Rani Lakshmibai of Jhansi', 'रानी लक्ष्मीबाई', 'birth', 11, 19),
  A('rani-lakshmibai', 'Rani Lakshmibai of Jhansi', 'रानी लक्ष्मीबाई', 'death', 6, 18),
  A('swami-dayananda-saraswati', 'Swami Dayanand Saraswati', 'स्वामी दयानन्द सरस्वती', 'death', 10, 30),
  A('apj-abdul-kalam', 'Dr. A. P. J. Abdul Kalam', 'डॉ. ए. पी. जे. अब्दुल कलाम', 'birth', 10, 15),
  A('apj-abdul-kalam', 'Dr. A. P. J. Abdul Kalam', 'डॉ. ए. पी. जे. अब्दुल कलाम', 'death', 7, 27),
  A('shivaji-maharaj', 'Chhatrapati Shivaji Maharaj', 'छत्रपति शिवाजी महाराज', 'birth', 2, 19),
  A('shivaji-maharaj', 'Chhatrapati Shivaji Maharaj', 'छत्रपति शिवाजी महाराज', 'death', 4, 3),
];

/** Colour schemes for tribute cards, picked per person so each card looks different. */
export const tributePalettes: Array<[string, string]> = [
  ['#5B1A00', '#1F0A00'],
  ['#14325C', '#08142B'],
  ['#0E4A2C', '#04200F'],
  ['#4A1259', '#1B0624'],
];

export const ecardStrings = {
  eyebrow: L('PUBLIC SERVICE', 'जन सेवा'),
  heading: L('e-Card: send greetings with your name', 'ई-कार्ड: अपने नाम से शुभकामनाएँ भेजें'),
  intro: L(
    'Choose an occasion, add your name and photo, and download the card or share it straight to WhatsApp.',
    'अवसर चुनें, अपना नाम और फ़ोटो जोड़ें, फिर कार्ड डाउनलोड करें या सीधे WhatsApp पर भेजें।',
  ),
  occasionHeading: L('Occasion', 'अवसर'),
  occasion: L('Festivals and national days', 'त्योहार एवं राष्ट्रीय पर्व'),
  anniversaries: L('Our Ideals: anniversaries', 'हमारे आदर्श: जयंती एवं पुण्यतिथि'),
  today: L('today', 'आज'),
  inDays: L('in {n} days', '{n} दिन में'),
  birthAnniversary: L('Birth anniversary', 'जयंती'),
  deathAnniversary: L('Death anniversary', 'पुण्यतिथि'),
  tributePill: L('Respectful Tribute', 'विनम्र श्रद्धांजलि'),
  tributeBirthMain: L('Humble tributes on the birth anniversary.', 'जयंती पर शत-शत नमन।'),
  tributeDeathMain: L('Humble tributes on the death anniversary.', 'पुण्यतिथि पर विनम्र श्रद्धांजलि।'),
  tributeSub: L('Let us remember and follow the ideals that guide our nation.', 'आइए उनके आदर्शों को स्मरण करें और उन पर चलें।'),
  withRegards: L('With best wishes', 'सादर शुभकामनाओं सहित'),
  pill: L('Warm Wishes', 'शुभकामनाएँ'),
  name: L('Your name', 'आपका नाम'),
  namePlaceholder: L('e.g. Ramesh Yadav', 'जैसे रमेश यादव'),
  designation: L('Village / designation (optional)', 'गाँव / पद (वैकल्पिक)'),
  designationPlaceholder: L('e.g. Booth President, Bhagwantnagar', 'जैसे बूथ अध्यक्ष, भगवंतनगर'),
  photo: L('Your photo (optional)', 'आपकी फ़ोटो (वैकल्पिक)'),
  choosePhoto: L('Choose photo', 'फ़ोटो चुनें'),
  changePhoto: L('Change photo', 'फ़ोटो बदलें'),
  removePhoto: L('Remove', 'हटाएँ'),
  photoNote: L('Stays on your phone; it is not uploaded.', 'फ़ोटो आपके फ़ोन में ही रहती है; अपलोड नहीं होती।'),
  whatsapp: L('Share on WhatsApp', 'WhatsApp पर भेजें'),
  download: L('Download card', 'कार्ड डाउनलोड करें'),
  nameRequired: L('Please enter your name first.', 'कृपया पहले अपना नाम लिखें।'),
  shareText: L('Greetings from', 'शुभकामनाएँ —'),
  whatsappFallback: L(
    'Card downloaded. Attach it in the WhatsApp chat that just opened.',
    'कार्ड डाउनलोड हो गया है। खुले हुए WhatsApp चैट में उसे जोड़कर भेजें।',
  ),
  preview: L('Card preview', 'कार्ड पूर्वावलोकन'),
  cardName: L('Ashish Shukla', 'आशीष शुक्ला'),
  cardLine: L('Bharatiya Janata Party · Bhagwantnagar, Unnao', 'भारतीय जनता पार्टी · भगवंतनगर, उन्नाव'),
  cardUrl: L('facebook.com/ashish4unnaao', 'facebook.com/ashish4unnaao'),
} satisfies Record<string, LocalizedString>;
