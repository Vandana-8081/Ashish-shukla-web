import type { PhotoItem, VideoItem } from '@/types';

export const photoGalleryData: PhotoItem[] = [
  {
    id: 'gallery-1',
    image: '/images/gallery/dharmik.jpg',
    category: {
      en: 'Cultural & Heritage',
      hi: 'सांस्कृतिक एवं सामाजिक',
    },
    caption: {
      en: 'Participating in local traditional celebrations and paying homage to Bhagwant Nagar heritage.',
      hi: 'क्षेत्रीय सांस्कृतिक उत्सवों में सहभागिता एवं पारंपरिक विरासत का नमन।',
    },
  },
  {
    id: 'gallery-2',
    image: '/images/gallery/bujurg.jpg',
    category: {
      en: 'Community Dialogue',
      hi: 'जनसंवाद',
    },
    caption: {
      en: 'Heartfelt interaction with village elders, receiving their blessings and guidance for community service.',
      hi: 'ग्राम बुजुर्गों से आत्मीय संवाद, मार्गदर्शन एवं लोककल्याण हेतु उनका आशीर्वाद।',
    },
  },
  {
    id: 'gallery-3',
    image: '/images/gallery/khel.jpg',
    category: {
      en: 'Youth & Sports',
      hi: 'युवा एवं खेल',
    },
    caption: {
      en: 'Interacting with energetic rural sports teams and encouraging fitness across panchayats.',
      hi: 'ग्रामीण खेल प्रतिभाओं से भेंट एवं युवाओं को खेल और स्वास्थ्य के प्रति प्रोत्साहन।',
    },
  },
  {
    id: 'gallery-4',
    image: '/images/gallery/ashish1.jpg',
    category: {
      en: 'Civic Engagement',
      hi: 'सार्वजनिक सहभागिता',
    },
    caption: {
      en: 'Large gathering of citizens during a developmental review meet in rural Unnao.',
      hi: 'विकास कार्यों की समीक्षा बैठक में उपस्थित जागरूक नागरिकों का समूह।',
    },
  },
];

export const videoGalleryData: VideoItem[] = [
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

    hi: '166-भगवंतनगर विधानसभा क्षेत्र में जनसंपर्क के दौरान क्षेत्रवासियों से आत्मीय भेंट कर उनका कुशलक्षेम जाना तथा क्षेत्र से जुड़े विभिन्न विषयों एवं समस्याओं पर संवाद किया। क्षेत्रवासियों के बीच मिलने वाला अपनापन और स्नेह इस विश्वास को और मजबूत करता है कि हमारा संबंध केवल जनप्रतिनिधि और जनता का नहीं, बल्कि एक परिवार जैसा है। भगवंतनगर के प्रत्येक परिवार के सुख-समृद्धि, क्षेत्र की समस्याओं के समाधान तथा विकास की निरंतर गति को बनाए रखने के उद्देश्य से जनसेवा के दायित्व को निभाने के लिए प्रतिबद्ध हूँ।',
  },
},
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
];
