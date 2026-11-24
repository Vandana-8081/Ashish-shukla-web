import type { PhotoItem, VideoItem, PressItem } from '@/types';

export const photoGalleryData: PhotoItem[] = [
  {
    id: 'gallery-1',
    image: '/images/gallery/a01.jpg',
    category: {
      en: 'Cultural & Heritage',
      hi: 'सांस्कृतिक एवं सामाजिक',
    },
    caption: {
      en: '',
      hi: '',
    },
  },
  ...['sj1.jpg', 'sj2.jpg', 'sj3.jpg', 'sj4.jpg', 'sj5.jpg'].map((photo, index) => ({
    id: `culture-heritage-${index + 1}`,
    image: `/images/gallery/${photo}`,
    category: {
      en: 'Cultural & Heritage',
      hi: 'सांस्कृतिक एवं सामाजिक',
    },
    caption: {
      en: '',
      hi: '',
    },
  })),
  {
    id: 'gallery-2',
    image: '/images/gallery/a8.jpg',
    category: {
      en: 'Community Dialogue',
      hi: 'जनसंवाद',
    },
    caption: {
      en: '',
      hi: '',
    },
  },
   {
    id: 'gallery-02',
    image: '/images/gallery/a04.jpg',
    category: {
      en: 'Community Dialogue',
      hi: 'जनसंवाद',
    },
    caption: {
      en: '',
      hi: '',
    },
  },
  {
    id: 'gallery-06',
    image: '/images/gallery/a06.jpg',
    category: {
      en: 'Community Dialogue',
      hi: '\u091c\u0928\u0938\u0902\u0935\u093e\u0926',
    },
    caption: {
      en: '',
      hi: '',
    },
  },
  {
    id: 'gallery-07',
    image: '/images/gallery/a07.jpg',
    category: {
      en: 'Community Dialogue',
      hi: '\u091c\u0928\u0938\u0902\u0935\u093e\u0926',
    },
    caption: { en: '', hi: '' },
  },
  {
    id: 'gallery-08',
    image: '/images/gallery/a08.jpg',
    category: {
      en: 'Community Dialogue',
      hi: '\u091c\u0928\u0938\u0902\u0935\u093e\u0926',
    },
    caption: { en: '', hi: '' },
  },
  ...['jans1.jpg', 'jans2.jpg', 'jans3.jpg', 'jans4.jpg'].map((photo, index) => ({
    id: `jan-samvad-${index + 1}`,
    image: `/images/gallery/${photo}`,
    category: {
      en: 'Community Dialogue',
      hi: 'जनसंवाद',
    },
    caption: {
      en: '',
      hi: '',
    },
  })),
  {
    id: 'gallery-3',
    image: '/images/gallery/a9.png',
    category: {
      en: 'Youth & Sports',
      hi: 'युवा एवं खेल',
    },
    caption: {
      en: '',
      hi: '',
    },
  },
  {
    id: 'gallery-4',
    image: '/images/gallery/a10.jpg',
    category: {
      en: 'Civic Engagement',
      hi: 'सार्वजनिक सहभागिता',
    },
    caption: {
      en: '',
      hi: '',
    },
  },
];

export const videoGalleryData: VideoItem[] = [
{
  id: 'video-3',

  videoPath: '/images/media/vid3.mp4',

  title: {
    en: 'Regional Athletics Competition at R.R.B.N. Inter College',
    hi: 'आर.आर.बी.एन. इंटर कॉलेज में क्षेत्रीय एथलेटिक्स प्रतियोगिता',
  },

  duration: '00:45',

  date: {
    en: 'July 2026',
    hi: 'जुलाई २०२६',
  },

  description: {
    en: 'Participated as the chief guest at the regional athletics competition held at R.R.B.N. Inter College, Bhagwantnagar, Unnao. Inaugurated the competition and encouraged participating athletes. Emphasized that sports promote physical and mental growth while strengthening discipline, confidence, team spirit, and healthy competition. Wished all the athletes a bright future and encouraged them to move forward with hard work, dedication, and sportsmanship, with confidence that talented athletes from the region will bring recognition to the district and state.',

    hi: 'भगवंतनगर, उन्नाव स्थित आर.आर.बी.एन. इंटर कॉलेज के मैदान में आयोजित क्षेत्रीय एथलेटिक्स प्रतियोगिता में मुख्य अतिथि के रूप में सम्मिलित होकर प्रतियोगिता का शुभारंभ किया एवं प्रतिभागी खिलाड़ियों का उत्साहवर्धन किया। खेल युवाओं के शारीरिक एवं मानसिक विकास के साथ-साथ अनुशासन, आत्मविश्वास, टीम भावना और स्वस्थ प्रतिस्पर्धा की भावना को मजबूत करते हैं। इस अवसर पर सभी प्रतिभागी खिलाड़ियों के उज्ज्वल भविष्य की कामना करते हुए उन्हें निरंतर परिश्रम, समर्पण और खेल भावना के साथ आगे बढ़ने के लिए प्रेरित किया। विश्वास है कि हमारे क्षेत्र की प्रतिभाशाली खेल प्रतिभाएं जिले और प्रदेश का नाम रोशन करेंगी।',
  },
},
{
  id: 'video-1',

  videoPath: '/images/media/vid1.mp4',

  title: {
    en: 'A Dark Chapter in Political History | Resolve for Accountability',
    hi: 'राजनीतिक इतिहास का एक काला अध्याय | जवाबदेही का संकल्प',
  },

  duration: '01:22',

  date: {
    en: 'September 2026',
    hi: 'सितंबर 2026',
  },

  description: {
    en: 'A reflection on a dark chapter in India’s political history, raising concerns about the gap between political slogans and the lived realities of the poor. The message recalls the period of the 1970s and the controversial forced sterilization drives, emphasizing that public policies should prioritize people’s welfare, dignity, accountability, and sensitivity rather than coercion.',

    hi: 'भारत के राजनीतिक इतिहास के एक काले अध्याय पर आधारित यह संदेश राजनीतिक नारों और गरीबों की वास्तविक परिस्थितियों के बीच के अंतर पर सवाल उठाता है। इसमें 1970 के दशक और जबरन नसबंदी अभियानों जैसे विवादित प्रसंगों का उल्लेख करते हुए इस बात पर जोर दिया गया है कि जनकल्याणकारी नीतियों का केंद्र जनता का हित, गरिमा, जवाबदेही और संवेदनशीलता होनी चाहिए, न कि किसी प्रकार का दमन या जबरदस्ती।',
  },
},
 {
  id: 'video-2',

  videoPath: '/images/media/vid3mp4.mp4',

  title: {
    en: 'Heartfelt Public Outreach in 166-Bhagwantnagar Assembly Constituency',
    hi: '166-भगवंतनगर विधानसभा क्षेत्र में आत्मीय जनसंपर्क',
  },

  duration: '00:48',

  date: {
    en: 'August 2026',
    hi: 'अगस्त २०२६',
  },

  description: {
    en: 'During public outreach in the 166-Bhagwantnagar Assembly Constituency, interacted warmly with local residents, inquired about their well-being, and discussed various issues concerning the area. The interaction reflected a strong sense of belonging and affection, with the relationship between the public and their representative being described as one like a family. Remained committed to the well-being of every family, resolving local issues, and maintaining the continuous pace of development in Bhagwantnagar.',

    hi: '166-भगवंतनगर विधानसभा क्षेत्र में जनसंपर्क के दौरान क्षेत्रवासियों से आत्मीय भेंट कर उनका हालचाल जाना तथा क्षेत्र से जुड़े विभिन्न विषयों एवं समस्याओं पर संवाद किया। क्षेत्रवासियों के बीच मिलने वाला अपनापन और स्नेह इस विश्वास को और मजबूत करता है कि हमारा संबंध केवल जनप्रतिनिधि और जनता का नहीं, बल्कि एक परिवार जैसा है। भगवंतनगर के प्रत्येक परिवार के सुख-समृद्धि, क्षेत्र की समस्याओं के समाधान तथा विकास की निरंतर गति को बनाए रखने के उद्देश्य से जनसेवा के दायित्व को निभाने के लिए प्रतिबद्ध हूँ।',
  },
},
{
  id: 'video-4',

  videoPath: '/images/media/vid5.mp4',

  title: {
    en: 'Public Support and Respect — My Greatest Identity',
    hi: 'जनता का समर्थन और सम्मान — मेरी सबसे बड़ी पहचान',
  },

  duration: '00:45',

  date: {
    en: 'July 2026',
    hi: 'जुलाई 2026',
  },

  description: {
    en: 'Public support and the respect of the people are my greatest identity. My connection with the people of Bhagwantnagar is my strength and inspiration to continue working for the community.',

    hi: 'जनता का समर्थन और उनका सम्मान ही मेरी सबसे बड़ी पहचान है। भगवंतनगर के लोगों से मेरा जुड़ाव मेरी ताकत और प्रेरणा है। जनसेवा के प्रति समर्पण और अपने क्षेत्र के लोगों के विश्वास को बनाए रखना ही मेरे सार्वजनिक जीवन का आधार है।',
  },
},
];

/**
 * The six photos shown in the homepage "Instagram Updates" card (no Meta API needed).
 * To refresh them, put new images in public/images/gallery and edit this list.
 */
export const currentUpdates: PhotoItem[] = [
  { file: 'a14.jpg', en: 'Inauguration ceremony with local residents.', hi: 'स्थानीय लोगों के साथ उद्घाटन समारोह।' },
  { file: 'jans1.jpg', en: 'Addressing a Gaurishankar Jan Kalyan Samiti gathering.', hi: 'गौरीशंकर जन कल्याण समिति के कार्यक्रम में संबोधन।' },
  { file: 'jans2.jpg', en: 'A moment from a public gathering.', hi: 'जनसभा का एक क्षण।' },
  { file: 'jans3.jpg', en: 'A moment from a public gathering.', hi: 'जनसभा का एक क्षण।' },
  { file: 'jans4.jpg', en: 'A moment from a public gathering.', hi: 'जनसभा का एक क्षण।' },
  { file: 'a15.jpg', en: 'Meeting and interacting with the community.', hi: 'समुदाय के साथ मुलाकात और संवाद।' },
].map(({ file, en, hi }, index) => ({
  id: `current-update-${index + 1}`,
  image: `/images/gallery/${file}`,
  category: { en: 'Latest Update', hi: 'ताज़ा अपडेट' },
  caption: { en, hi },
}));

export const pressCoverageData: PressItem[] = [
  {
    id: 'press-1',
    image: '/images/gallery/a10.jpg',
    source: 'Dainik Jagran',
    location: 'Bhagwant Nagar',
    title: {
      en: 'Kshetra Panchayat and Village Development Review Meet Organized',
      hi: 'क्षेत्र पंचायत एवं ग्राम विकास समीक्षा बैठक का आयोजन',
    },
    description: {
      en: 'Meeting of local representatives and public workers organized to address rural civic works, roads, and irrigation.',
      hi: 'ग्रामीण विकास, सड़क एवं सिंचाई से जुड़े विषयों पर समीक्षा बैठक कर समस्याओं के समयबद्ध समाधान का निर्देश।',
    },
    date: { en: 'October 2026', hi: 'अक्टूबर २०२६' },
  },
  {
    id: 'press-2',
    image: '/images/gallery/a14.jpg',
    source: 'Amar Ujala',
    location: 'Unnao',
    title: {
      en: 'Warm Welcome by Workers and Citizens Across Assembly Belt',
      hi: 'कार्यकर्ताओं एवं आम नागरिकों द्वारा विधानसभा क्षेत्र में भव्य स्वागत',
    },
    description: {
      en: 'Ashish Shukla received heartfelt public reception during community dialogue and outreach in Bhagwant Nagar.',
      hi: 'भगवंत नगर प्रवास के दौरान क्षेत्रीय नागरिकों एवं युवाओं द्वारा गर्मजोशी से स्वागत व संवाद।',
    },
    date: { en: 'September 2026', hi: 'सितंबर २०२६' },
  },
  {
    id: 'press-3',
    image: '/images/gallery/a3.jpg',
    source: 'Press Coverage',
    location: 'Purwa, Unnao',
    title: {
      en: 'Mega Free Health Screening & Diagnostic Camp in Purwa',
      hi: 'पुरवा में विशाल निःशुल्क स्वास्थ्य एवं नेत्र जांच शिविर का आयोजन',
    },
    description: {
      en: 'Over 800 rural families benefited from free checkups, specialized diagnostic tests, and medicine distribution.',
      hi: 'सैकड़ों जरूरतमंद परिवारों को निःशुल्क स्वास्थ्य परामर्श, नेत्र परीक्षण एवं दवाएं वितरित की गईं।',
    },
    date: { en: 'August 2026', hi: 'अगस्त २०२६' },
  },
  {
    id: 'press-4',
    image: '/images/gallery/a4.jpg',
    source: 'Rashtriya Sahara',
    location: 'Asoha, Bhagwant Nagar',
    title: {
      en: 'Kisan Chaupal: Resolving Tail-End Irrigation & Canal Cleaning',
      hi: 'किसान चौपाल: अंतिम छोर तक सिंचाई जल व नहर सफाई पर चर्चा',
    },
    description: {
      en: 'In-depth dialogue with farmer groups regarding procurement centers, irrigation, and agricultural support.',
      hi: 'किसानों के साथ बैठक कर धान क्रय केंद्रों, नहरों की सफाई और समय पर खाद-बीज उपलब्धता पर मंथन।',
    },
    date: { en: 'July 2026', hi: 'जुलाई २०२६' },
  },
  {
    id: 'press-5',
    image: '/images/gallery/a5.jpg',
    source: 'Hindustan',
    location: 'Bhagwant Nagar',
    title: {
      en: 'Rural Sports Tournament Inauguration & Sports Kits Distribution',
      hi: 'ग्रामीण खेलकूद प्रतियोगिता का शुभारंभ एवं खेल किट वितरण',
    },
    description: {
      en: 'Encouraging youth athleticism, physical fitness, and sportsman spirit across panchayats.',
      hi: 'युवाओं के शारीरिक एवं मानसिक विकास हेतु खेल प्रतियोगिताओं का आयोजन व प्रतिभाओं का सम्मान।',
    },
    date: { en: 'June 2026', hi: 'जून २०२६' },
  },
  {
    id: 'press-6',
    image: '/images/gallery/a12.jpg',
    source: 'Dainik Jagran',
    location: 'Unnao',
    title: {
      en: 'Weekly Jan Sunwai: Immediate Resolution of Public Grievances',
      hi: 'साप्ताहिक जनसुनवाई: जनसमस्याओं की गंभीरता से सुनवाई एवं त्वरित निस्तारण',
    },
    description: {
      en: 'Hearing hundreds of citizens directly at the central public office with administrative coordination.',
      hi: 'जनसेवा कार्यालय में ग्रामीणों की समस्याओं को सुनकर संबंधित अधिकारियों को त्वरित समाधान के निर्देश।',
    },
    date: { en: 'May 2026', hi: 'मई २०२६' },
  },
  {
    id: 'press-7',
    image: '/images/gallery/a7.jpg',
    source: 'Press Report',
    location: 'Bighapur',
    title: {
      en: 'Comprehensive Review of Rural Infrastructure and Road Paving',
      hi: 'ग्रामीण संपर्क मार्गों एवं नागरिक सुविधाओं का स्थलीय निरीक्षण',
    },
    description: {
      en: 'Inspecting ongoing road widening, street lighting, and drinking water facilities in remote villages.',
      hi: 'अधूरी सड़कों, प्रकाश व्यवस्था एवं पेयजल परियोजनाओं का स्थलीय निरीक्षण कर गुणवत्ता बनाए रखने पर बल।',
    },
    date: { en: 'April 2026', hi: 'अप्रैल २०२६' },
  },
  {
    id: 'press-8',
    image: '/images/gallery/a8.jpg',
    source: 'Amar Ujala',
    location: 'Bhagwant Nagar',
    title: {
      en: '',
      hi: '',
    },
    description: {
      en: 'Receiving blessings and constructive suggestions for youth employment, healthcare, and education.',
      hi: 'गांव-गांव जाकर बुजुर्गों का आशीर्वाद एवं क्षेत्र के सर्वांगीण विकास हेतु जनसुझाव प्राप्त किए।',
    },
    date: { en: 'March 2026', hi: 'मार्च २०२६' },
  },
];
