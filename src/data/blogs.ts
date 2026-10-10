import type { Locale, LocalizedString } from '@/types';

export interface BlogCategory {
  id: string;
  name: LocalizedString;
}

export interface BlogSection {
  heading: LocalizedString;
  paragraphs: LocalizedString[];
}

export interface BlogSource {
  name: LocalizedString;
  url: string;
}

export interface BlogArticle {
  id: string;
  slug: string;
  categoryId: string;
  title: LocalizedString;
  excerpt: LocalizedString;
  sections: BlogSection[];
  image?: string;
  imageAlt: LocalizedString;
  publishedAt: string;
  updatedAt: string;
  author: LocalizedString;
  sources: BlogSource[];
  featured?: boolean;
  status: 'published' | 'draft';
}

export const blogCategories: BlogCategory[] = [
  { id: 'schemes', name: { en: 'Government Schemes', hi: 'सरकारी योजनाएँ' } },
  { id: 'education', name: { en: 'Education', hi: 'शिक्षा' } },
  { id: 'women', name: { en: "Women's Safety & Empowerment", hi: 'महिला सुरक्षा एवं सशक्तिकरण' } },
  { id: 'employment', name: { en: 'Employment & Youth', hi: 'रोजगार एवं युवा' } },
  { id: 'development', name: { en: 'Development', hi: 'विकास' } },
  { id: 'india-comparison', name: { en: 'India Before & After 2014', hi: 'भारत: 2014 से पहले और बाद' } },
  { id: 'uttar-pradesh', name: { en: 'Uttar Pradesh After 2017', hi: '2017 के बाद उत्तर प्रदेश' } },
  { id: 'bjp-policy', name: { en: 'BJP Policies & Public Issues', hi: 'भाजपा की नीतियाँ एवं जनहित के मुद्दे' } },
  { id: 'latest', name: { en: 'Latest News', hi: 'ताज़ा समाचार' } },
  { id: 'local', name: { en: 'Bhagwant Nagar & Unnao', hi: 'भगवंत नगर एवं उन्नाव' } },
  { id: 'defence-self-reliance', name: { en: 'Defence & Self-Reliance', hi: 'रक्षा एवं आत्मनिर्भर भारत' } },
  { id: 'defence-national-security', name: { en: 'Defence & National Security', hi: 'रक्षा एवं राष्ट्रीय सुरक्षा' } },
  { id: 'governance-judicial-reforms', name: { en: 'Governance & Judicial Reforms', hi: 'शासन व्यवस्था एवं न्यायिक सुधार' } },
];

const ashish = { en: 'Ashish Shukla', hi: 'आशीष शुक्ला' };

// Manually maintained editorial content. Draft entries are intentionally excluded
// from all public routes until their sources and publication details are verified.
export const blogArticles: BlogArticle[] = [
  {
    // Neutral overview shown at the user's request. The original article,
    // author confirmation, and publication date were not provided; keep those
    // details unconfirmed and do not add them without verification.
    id: 'collegium-system-judicial-appointments-reform',
    slug: 'collegium-system-judicial-appointments-reform',
    categoryId: 'governance-judicial-reforms',
    title: {
      en: 'It Is Time to Re-evaluate the Collegium System and Address Its Flaws',
      hi: 'कॉलेजियम प्रणाली की समीक्षा और न्यायिक नियुक्तियों में सुधार की आवश्यकता',
    },
    excerpt: {
      en: "India's collegium system for appointing judges to the higher judiciary has long been debated in discussions about judicial independence, transparency, and accountability. This neutral review outlines its legal evolution, the NJAC Act of 2014, and considerations for reform.",
      hi: 'उच्च न्यायपालिका में न्यायाधीशों की नियुक्ति के लिए भारत की कॉलेजियम प्रणाली पर न्यायिक स्वतंत्रता, पारदर्शिता और जवाबदेही के संदर्भ में लंबे समय से चर्चा होती रही है। यह तटस्थ समीक्षा इसके कानूनी विकास, 2014 के राष्ट्रीय न्यायिक नियुक्ति आयोग अधिनियम और सुधार से जुड़े विचारों का परिचय देती है।',
    },
    sections: [
      {
        heading: { en: 'Judicial appointments: history and evolution', hi: 'न्यायिक नियुक्तियाँ: इतिहास और विकास' },
        paragraphs: [
          {
            en: 'Articles 124 and 217 of the Constitution describe the appointment of Supreme Court and High Court judges, respectively, and use consultation as part of the constitutional process. The Supreme Court’s interpretation of that process developed through a series of decisions known as the Judges Cases.',
            hi: 'संविधान के अनुच्छेद 124 और 217 क्रमशः सर्वोच्च न्यायालय और उच्च न्यायालय के न्यायाधीशों की नियुक्ति का वर्णन करते हैं तथा संवैधानिक प्रक्रिया में परामर्श का प्रावधान रखते हैं। इस प्रक्रिया की सर्वोच्च न्यायालय की व्याख्या उन निर्णयों की श्रृंखला से विकसित हुई जिन्हें जजेज़ केस कहा जाता है।',
          },
          {
            en: 'In S.P. Gupta v. Union of India (1981), commonly called the First Judges Case, the Court interpreted consultation as not giving the Chief Justice of India’s opinion primacy over the executive. In Supreme Court Advocates-on-Record Association v. Union of India (1993), the Second Judges Case, a larger bench changed that interpretation and gave primacy to the judiciary’s institutional opinion in appointments. The 1998 Presidential Reference, often called the Third Judges Case, clarified the collegium’s consultative composition and process. These summaries describe judicial holdings; the cases should be read for their full reasoning.',
            hi: 'एस. पी. गुप्ता बनाम भारत संघ (1981), जिसे सामान्यतः प्रथम जजेज़ केस कहा जाता है, में न्यायालय ने परामर्श की ऐसी व्याख्या की जिसमें भारत के मुख्य न्यायाधीश की राय को कार्यपालिका पर प्राथमिकता नहीं दी गई। सुप्रीम कोर्ट एडवोकेट्स-ऑन-रिकॉर्ड एसोसिएशन बनाम भारत संघ (1993), द्वितीय जजेज़ केस, में बड़ी पीठ ने इस व्याख्या को बदला और नियुक्तियों में न्यायपालिका की संस्थागत राय को प्राथमिकता दी। 1998 के राष्ट्रपति संदर्भ, जिसे अक्सर तृतीय जजेज़ केस कहा जाता है, ने कॉलेजियम की परामर्श संरचना और प्रक्रिया स्पष्ट की। ये निर्णयों के सार हैं; उनके पूरे तर्क के लिए मूल फैसले देखे जाने चाहिए।',
          },
        ],
      },
      {
        heading: { en: "The Justice P. D. Dinakaran matter: allegations and process", hi: 'न्यायमूर्ति पी. डी. दिनाकरन का मामला: आरोप और प्रक्रिया' },
        paragraphs: [
          {
            en: 'The Justice P. D. Dinakaran matter involved a removal inquiry under the Judges (Inquiry) Act, 1968. In Writ Petition (Civil) No. 218 of 2011, Justice Dinakaran challenged procedural decisions of the inquiry committee, including an order concerning access to documents and the committee’s jurisdiction to frame certain charges.',
            hi: 'न्यायमूर्ति पी. डी. दिनाकरन के मामले में न्यायाधीश (जाँच) अधिनियम, 1968 के अंतर्गत पद से हटाने की जाँच प्रक्रिया शामिल थी। रिट याचिका (सिविल) संख्या 218/2011 में न्यायमूर्ति दिनाकरन ने जाँच समिति के कुछ प्रक्रियात्मक निर्णयों को चुनौती दी थी, जिनमें दस्तावेजों तक पहुँच और कुछ आरोप तय करने के समिति के अधिकार-क्षेत्र से जुड़ा आदेश शामिल था।',
          },
          {
            en: 'The Supreme Court judgment addressed those procedural questions. It must not be described as a final finding that the allegations against Justice Dinakaran were proved. Allegations, inquiry steps, and findings are distinct; this draft does not state unverified allegations as established facts.',
            hi: 'सर्वोच्च न्यायालय के निर्णय ने उन प्रक्रियात्मक प्रश्नों पर विचार किया। इसे इस बात का अंतिम निष्कर्ष नहीं बताया जाना चाहिए कि न्यायमूर्ति दिनाकरन के विरुद्ध आरोप सिद्ध हुए थे। आरोप, जाँच के कदम और अंतिम निष्कर्ष अलग-अलग बातें हैं; यह मसौदा अपुष्ट आरोपों को स्थापित तथ्य के रूप में प्रस्तुत नहीं करता।',
          },
        ],
      },
      {
        heading: { en: 'The NJAC Act, 2014, and the Supreme Court decision', hi: 'राष्ट्रीय न्यायिक नियुक्ति आयोग अधिनियम, 2014 और सर्वोच्च न्यायालय का निर्णय' },
        paragraphs: [
          {
            en: 'The Constitution (Ninety-ninth Amendment) Act, 2014 and the National Judicial Appointments Commission (NJAC) Act, 2014 sought to replace the collegium with a six-member commission: the Chief Justice of India as chairperson, the two senior-most Supreme Court judges, the Union Law Minister, and two eminent persons selected by a committee comprising the Prime Minister, the Chief Justice of India, and the Leader of Opposition in the Lok Sabha (or the leader of the largest opposition party where applicable). The Act also provided that two members could prevent a recommendation.',
            hi: 'संविधान (निन्यानवेवाँ संशोधन) अधिनियम, 2014 और राष्ट्रीय न्यायिक नियुक्ति आयोग (NJAC) अधिनियम, 2014 ने कॉलेजियम के स्थान पर छह सदस्यीय आयोग का प्रस्ताव किया था: भारत के मुख्य न्यायाधीश अध्यक्ष के रूप में, सर्वोच्च न्यायालय के दो वरिष्ठतम न्यायाधीश, केंद्रीय विधि मंत्री और दो प्रतिष्ठित व्यक्ति। इन दोनों व्यक्तियों का चयन प्रधानमंत्री, भारत के मुख्य न्यायाधीश और लोकसभा में विपक्ष के नेता (या लागू स्थिति में सबसे बड़े विपक्षी दल के नेता) वाली समिति द्वारा होना था। अधिनियम में यह भी प्रावधान था कि दो सदस्य किसी सिफारिश को रोक सकते थे।',
          },
          {
            en: 'In Supreme Court Advocates-on-Record Association v. Union of India (2015), the Supreme Court by a 4–1 majority held the Ninety-ninth Amendment and NJAC framework unconstitutional, finding that they damaged the Constitution’s basic structure, including judicial independence. The decision restored the collegium framework. This is the Court’s holding; arguments for changing or retaining the system remain matters of public and constitutional debate.',
            hi: 'सुप्रीम कोर्ट एडवोकेट्स-ऑन-रिकॉर्ड एसोसिएशन बनाम भारत संघ (2015) में सर्वोच्च न्यायालय ने 4–1 बहुमत से निन्यानवेवें संशोधन और NJAC व्यवस्था को असंवैधानिक ठहराया। न्यायालय के अनुसार इससे संविधान की मूल संरचना, जिसमें न्यायपालिका की स्वतंत्रता शामिल है, प्रभावित हुई। निर्णय के बाद कॉलेजियम व्यवस्था बहाल हुई। यह न्यायालय का निर्णय है; व्यवस्था में बदलाव या उसे बनाए रखने के पक्ष में तर्क सार्वजनिक और संवैधानिक बहस का विषय हैं।',
          },
        ],
      },
      {
        heading: { en: 'Democratisation of the judiciary: questions for reform', hi: 'न्यायपालिका का लोकतंत्रीकरण: सुधार से जुड़े प्रश्न' },
        paragraphs: [
          {
            en: 'Public discussion of judicial appointments often weighs transparency, diversity, accountability, and timely appointments against the need to protect courts from political pressure. The collegium and the NJAC represent different approaches to that balance; neither should be assessed through slogans alone.',
            hi: 'न्यायिक नियुक्तियों पर सार्वजनिक चर्चा में पारदर्शिता, विविधता, जवाबदेही और समय पर नियुक्तियों की आवश्यकता को न्यायालयों को राजनीतिक दबाव से सुरक्षित रखने की जरूरत के साथ तौला जाता है। कॉलेजियम और NJAC इस संतुलन के अलग-अलग तरीके प्रस्तुत करते हैं; किसी का मूल्यांकन केवल नारों के आधार पर नहीं होना चाहिए।',
          },
          {
            en: 'Possible reform questions include whether selection criteria can be made clearer, how recommendations and timelines can be communicated, how conflicts of interest can be handled, and how a selection body can remain independent while broadening participation. These are policy questions for informed public debate, not findings made by the cited judgments. This draft is a neutral overview and does not reproduce the missing original article’s viewpoint.',
            hi: 'सुधार से जुड़े संभावित प्रश्नों में चयन मानदंडों को अधिक स्पष्ट करना, सिफारिशों और समय-सीमाओं के बारे में जानकारी देना, हितों के टकराव से निपटना तथा भागीदारी का दायरा बढ़ाते हुए चयन निकाय की स्वतंत्रता बनाए रखना शामिल है। ये सूचित सार्वजनिक विमर्श के नीतिगत प्रश्न हैं, उद्धृत निर्णयों के निष्कर्ष नहीं। यह मसौदा तटस्थ परिचय है और उपलब्ध न हुए मूल लेख का दृष्टिकोण प्रस्तुत करने का दावा नहीं करता।',
          },
        ],
      },
    ],
    image: '/images/blog/law.webp',
    imageAlt: {
      en: 'A person reviewing legal documents beside law books and scales of justice',
      hi: 'न्याय की तराजू और विधि की पुस्तकों के पास कानूनी दस्तावेज़ देखते व्यक्ति',
    },
    publishedAt: '',
    updatedAt: '',
    author: { en: 'Ashish Shukla', hi: 'आशीष शुक्ला' },
    sources: [],
    status: 'published',
  },
  {
    id: 'ins-vikrant-atmanirbhar-bharat',
    slug: 'ins-vikrant-atmanirbhar-bharat',
    categoryId: 'defence-self-reliance',
    title: {
      en: "INS Vikrant: A Symbol of India's Self-Reliance and Indigenous Naval Capability",
      hi: 'INS विक्रांत: आत्मनिर्भर भारत की सामरिक शक्ति और स्वदेशी सामर्थ्य का प्रतीक',
    },
    excerpt: {
      en: "India's indigenous aircraft carrier INS Vikrant represents a milestone in naval capability, domestic industrial participation, and defence self-reliance. This article reviews its construction and publicly reported facts, while distinguishing official figures from broader strategic interpretation.",
      hi: 'स्वदेशी विमानवाहक पोत INS विक्रांत भारत की नौसैनिक क्षमता, घरेलू औद्योगिक भागीदारी और रक्षा क्षेत्र में आत्मनिर्भरता के प्रयासों का एक महत्वपूर्ण उदाहरण है। यह लेख इसके निर्माण और सार्वजनिक रूप से उपलब्ध तथ्यों का परिचय देता है तथा आधिकारिक आँकड़ों और व्यापक रणनीतिक विचारों के बीच अंतर स्पष्ट रखता है।',
    },
    sections: [
      {
        heading: { en: "India's maritime role in a changing world", hi: 'बदलते वैश्विक परिदृश्य में भारत की सामरिक भूमिका' },
        paragraphs: [
          {
            en: 'Maritime security depends on many factors, including trained personnel, reliable platforms, logistics, maintenance, and cooperation. An aircraft carrier is one element of that larger picture; its presence alone does not establish a particular operational outcome.',
            hi: 'समुद्री सुरक्षा अनेक बातों पर निर्भर करती है, जिनमें प्रशिक्षित कर्मी, विश्वसनीय पोत, रसद, रखरखाव और सहयोग शामिल हैं। विमानवाहक पोत इस व्यापक व्यवस्था का एक हिस्सा है; केवल उसकी मौजूदगी से किसी विशेष परिचालन परिणाम की पुष्टि नहीं होती।',
          },
          {
            en: 'The Indian government described Vikrant’s commissioning as a contribution to maritime security in the Indian Ocean Region. That is an official policy statement, while assessments of its strategic effects depend on operational context.',
            hi: 'भारत सरकार ने विक्रांत के कमीशन होने को हिंद महासागर क्षेत्र की समुद्री सुरक्षा में योगदान के रूप में वर्णित किया। यह आधिकारिक नीति-वक्तव्य है; इसके रणनीतिक प्रभाव का आकलन परिचालन संदर्भ पर निर्भर करता है।',
          },
        ],
      },
      {
        heading: { en: 'INS Vikrant and the self-reliance effort', hi: 'INS विक्रांत और आत्मनिर्भर भारत का संकल्प' },
        paragraphs: [
          {
            en: 'The present INS Vikrant, designated IAC-1, was designed by the Indian Navy’s in-house Warship Design Bureau and built by Cochin Shipyard Limited. The keel was laid in February 2009, the ship was launched in August 2013, and its maiden sea trials began in August 2021. It was commissioned at Kochi on 2 September 2022. These are historical milestones, not current news.',
            hi: 'वर्तमान INS विक्रांत को IAC-1 नाम दिया गया। इसका डिजाइन भारतीय नौसेना के आंतरिक Warship Design Bureau ने तैयार किया और इसका निर्माण Cochin Shipyard Limited ने किया। पोत की कील फरवरी 2009 में रखी गई, इसे अगस्त 2013 में जलावतरण किया गया और अगस्त 2021 में समुद्री परीक्षण शुरू हुए। इसे 2 सितंबर 2022 को कोच्चि में कमीशन किया गया। ये ऐतिहासिक पड़ाव हैं, वर्तमान समाचार नहीं।',
          },
          {
            en: 'The commissioning and construction are often discussed alongside the Make in India and Atmanirbhar Bharat policy themes. Those themes describe the policy context; they should not be taken to mean that every component or capability is wholly indigenous.',
            hi: 'इसके निर्माण और कमीशन होने की चर्चा अक्सर मेक इन इंडिया और आत्मनिर्भर भारत की नीति-परिकल्पनाओं के संदर्भ में की जाती है। ये नीति-संदर्भ हैं; इनसे यह निष्कर्ष नहीं निकालना चाहिए कि पोत का प्रत्येक पुर्जा या क्षमता पूरी तरह स्वदेशी है।',
          },
        ],
      },
      {
        heading: { en: 'Indian industry participation', hi: 'स्वदेशी निर्माण में भारतीय उद्योगों की भागीदारी' },
        paragraphs: [
          {
            en: 'A Ministry of Defence release reported approximately 76% indigenous content for the project. The figure is an official project estimate and does not mean that the ship contains no imported equipment. The same release described participation by more than 550 original-equipment manufacturers and subcontractors, including over 100 MSMEs.',
            hi: 'रक्षा मंत्रालय की एक विज्ञप्ति में परियोजना के लिए लगभग 76% स्वदेशी सामग्री की जानकारी दी गई। यह परियोजना का आधिकारिक अनुमान है; इसका अर्थ यह नहीं है कि पोत में कोई आयातित उपकरण नहीं है। उसी विज्ञप्ति में 550 से अधिक मूल उपकरण निर्माताओं और उप-ठेकेदारों, जिनमें 100 से अधिक MSME शामिल थे, की भागीदारी बताई गई।',
          },
          {
            en: 'The Ministry of Steel reported that SAIL supplied about 30,000 tonnes of DMR-grade specialty steel, developed in collaboration with the Navy and DRDO. These figures are attributed to the respective government releases.',
            hi: 'इस्पात मंत्रालय ने बताया कि SAIL ने लगभग 30,000 टन DMR-ग्रेड विशेष इस्पात की आपूर्ति की, जिसे नौसेना और DRDO के सहयोग से विकसित किया गया था। ये आँकड़े संबंधित सरकारी विज्ञप्तियों के अनुसार दिए गए हैं।',
          },
        ],
      },
      {
        heading: { en: 'Reported employment and the domestic economy', hi: 'रोजगार और घरेलू अर्थव्यवस्था में योगदान' },
        paragraphs: [
          {
            en: 'A PIB background note reported about 2,000 direct jobs at Cochin Shipyard and approximately 12,500 indirect jobs through associated suppliers and industries. These are reported project figures; the release does not provide a detailed calculation method, so they are presented as official estimates rather than independently audited totals.',
            hi: 'PIB की एक पृष्ठभूमि विज्ञप्ति में Cochin Shipyard में लगभग 2,000 प्रत्यक्ष रोजगार और संबंधित आपूर्तिकर्ताओं एवं उद्योगों के माध्यम से करीब 12,500 अप्रत्यक्ष रोजगार की जानकारी दी गई। ये परियोजना से जुड़े प्रकाशित आँकड़े हैं; विज्ञप्ति में विस्तृत गणना-पद्धति नहीं दी गई है, इसलिए इन्हें स्वतंत्र रूप से ऑडिट किए गए कुल के बजाय आधिकारिक अनुमान के रूप में प्रस्तुत किया गया है।',
          },
          {
            en: 'The project illustrates how large shipbuilding programmes can involve a broad supplier network. The scale of any lasting economic effect requires separate evidence and should not be inferred from participation figures alone.',
            hi: 'यह परियोजना दिखाती है कि बड़े जहाज-निर्माण कार्यक्रमों में आपूर्तिकर्ताओं का व्यापक नेटवर्क शामिल हो सकता है। दीर्घकालीन आर्थिक प्रभाव का आकलन अलग प्रमाणों से होना चाहिए; केवल भागीदारी के आँकड़ों से उसका निष्कर्ष नहीं निकालना चाहिए।',
          },
        ],
      },
      {
        heading: { en: 'Maritime security in the Indian Ocean', hi: 'हिंद महासागर क्षेत्र में समुद्री सुरक्षा' },
        paragraphs: [
          {
            en: 'The government’s commissioning statement linked the carrier to India’s maritime-security objectives in the Indian Ocean Region. A carrier can support naval operations as part of a wider fleet, but its role depends on mission, deployment, escort, aircraft, and other operational conditions. This article does not make claims about classified capabilities or guarantee a particular outcome.',
            hi: 'कमीशनिंग के अवसर पर जारी सरकारी वक्तव्य ने इस पोत को हिंद महासागर क्षेत्र में भारत के समुद्री सुरक्षा उद्देश्यों से जोड़ा। विमानवाहक पोत व्यापक बेड़े के हिस्से के रूप में नौसैनिक अभियानों में सहायता कर सकता है, पर उसकी भूमिका मिशन, तैनाती, सुरक्षा-पोतों, विमानों और अन्य परिचालन परिस्थितियों पर निर्भर करती है। यह लेख गोपनीय क्षमताओं या किसी निश्चित परिणाम का दावा नहीं करता।',
          },
        ],
      },
      {
        heading: { en: 'The future of Indian naval shipbuilding', hi: 'भारतीय नौसेना और रक्षा निर्माण का भविष्य' },
        paragraphs: [
          {
            en: 'Vikrant is a significant shipbuilding project and a public example of domestic design and construction at this scale. Continued progress in naval manufacturing also depends on maintenance, supply-chain resilience, skilled work, testing, and transparent assessment of costs and capability.',
            hi: 'विक्रांत इस स्तर की घरेलू डिजाइन और निर्माण क्षमता का एक महत्वपूर्ण जहाज-निर्माण कार्यक्रम और सार्वजनिक उदाहरण है। नौसैनिक निर्माण में आगे की प्रगति के लिए रखरखाव, आपूर्ति-श्रृंखला की मजबूती, कुशल श्रम, परीक्षण तथा लागत और क्षमता का पारदर्शी आकलन भी आवश्यक है।',
          },
          {
            en: 'The broader interpretation—that such projects strengthen self-reliance—is a policy perspective. Technical specifications and measured outcomes should continue to be assessed through official documentation and independent analysis.',
            hi: 'ऐसी परियोजनाएँ आत्मनिर्भरता को मजबूत करती हैं—यह व्यापक नीति-दृष्टिकोण है। तकनीकी विनिर्देशों और मापे गए परिणामों का आकलन आधिकारिक दस्तावेजों और स्वतंत्र विश्लेषण के आधार पर किया जाना चाहिए।',
          },
        ],
      },
      {
        heading: { en: 'Uttar Pradesh and defence manufacturing: a separate context', hi: 'उत्तर प्रदेश और रक्षा विनिर्माण: एक अलग संदर्भ' },
        paragraphs: [
          {
            en: 'INS Vikrant was built at Cochin Shipyard Limited in Kerala. The official sources cited here do not establish a specific Uttar Pradesh Defence Industrial Corridor role in this ship’s construction, so no such connection is claimed. The state’s defence-manufacturing initiatives should be discussed on their own documented projects and evidence.',
            hi: 'INS विक्रांत का निर्माण केरल स्थित Cochin Shipyard Limited में हुआ। यहाँ दिए गए आधिकारिक स्रोत इस पोत के निर्माण में उत्तर प्रदेश रक्षा औद्योगिक गलियारे की किसी विशिष्ट भूमिका की पुष्टि नहीं करते, इसलिए ऐसा कोई संबंध दावा नहीं किया गया है। राज्य की रक्षा-विनिर्माण पहलों पर उनके अपने दस्तावेजीकृत कार्यक्रमों और प्रमाणों के आधार पर चर्चा की जानी चाहिए।',
          },
        ],
      },
    ],
    image: '/images/blog/ship.webp',
    imageAlt: { en: 'Ship at sea', hi: 'समुद्र में जहाज़' },
    publishedAt: '2026-10-10',
    updatedAt: '2026-10-10',
    author: { en: 'Ashish Shukla', hi: 'आशीष शुक्ला' },
    sources: [
      { name: { en: 'PIB: INS Vikrant — history, construction and reported project details', hi: 'PIB: INS विक्रांत — इतिहास, निर्माण और परियोजना संबंधी प्रकाशित विवरण' }, url: 'https://www.pib.gov.in/PressNoteDetails.aspx?ModuleId=3&NoteId=155692&lang=1&reg=3' },
      { name: { en: 'PIB: Commissioning of INS Vikrant, 2 September 2022', hi: 'PIB: INS विक्रांत का कमीशन होना, 2 सितंबर 2022' }, url: 'https://www.pib.gov.in/Pressreleaseshare.aspx?PRID=1856230&lang=2&reg=48' },
      { name: { en: 'PIB, Ministry of Steel: SAIL steel supplied for INS Vikrant', hi: 'PIB, इस्पात मंत्रालय: INS विक्रांत के लिए SAIL द्वारा इस्पात आपूर्ति' }, url: 'https://www.pib.gov.in/newsite/PrintRelease.aspx?lang=2&reg=48&relid=237623' },
    ],
    status: 'published',
  },
  {
    // Editorial review draft: do not publish until the article author and
    // actual publication date have been confirmed.
    id: 'defence-budget-2023-24',
    slug: 'defence-budget-2023-24',
    categoryId: 'defence-national-security',
    title: {
      en: "India's Defence Budget 2023–24: Military Modernisation, Border Infrastructure and Self-Reliance",
      hi: 'रक्षा बजट 2023–24: सैन्य आधुनिकीकरण, सीमा सुरक्षा और आत्मनिर्भरता',
    },
    excerpt: {
      en: "India's Union Budget for 2023–24 included allocations for military modernisation, border infrastructure, defence research, veterans' pensions, and domestic defence production. This historical review distinguishes budget estimates from spending and policy goals from measured outcomes.",
      hi: 'वित्त वर्ष 2023–24 के रक्षा बजट में सैन्य आधुनिकीकरण, सीमा अवसंरचना, रक्षा अनुसंधान, पूर्व सैनिकों की पेंशन और घरेलू रक्षा उत्पादन के लिए प्रावधान शामिल थे। यह ऐतिहासिक समीक्षा बजट अनुमानों को वास्तविक व्यय से तथा नीतिगत लक्ष्यों को मापे गए परिणामों से अलग रखती है।',
    },
    sections: [
      {
        heading: { en: 'Defence Budget 2023–24: major provisions', hi: 'रक्षा बजट 2023–24: प्रमुख प्रावधान' },
        paragraphs: [
          {
            en: 'The Ministry of Defence reported a Budget Estimate (BE) allocation of ₹5,93,537.64 crore for FY 2023–24, about 13% higher than the previous year’s BE. This total included ₹1,38,205 crore for defence pensions. These are historical budget estimates, not current allocations or actual expenditure.',
            hi: 'रक्षा मंत्रालय ने वित्त वर्ष 2023–24 के लिए ₹5,93,537.64 करोड़ का बजट अनुमान (BE) बताया था, जो पिछले वर्ष के बजट अनुमान से लगभग 13% अधिक था। इस कुल राशि में रक्षा पेंशन के लिए ₹1,38,205 करोड़ शामिल थे। ये ऐतिहासिक बजट अनुमान हैं—वर्तमान आवंटन या वास्तविक व्यय नहीं।',
          },
          {
            en: 'The government’s release described the total as the Ministry of Defence allocation. It should not be confused with the Union Government’s total expenditure or with the amount eventually spent.',
            hi: 'सरकारी विज्ञप्ति में इस राशि को रक्षा मंत्रालय का कुल आवंटन बताया गया था। इसे केंद्र सरकार के कुल व्यय या अंततः खर्च हुई राशि के समान नहीं मानना चाहिए।',
          },
        ],
      },
      {
        heading: { en: 'Military modernisation and capital expenditure', hi: 'सैन्य आधुनिकीकरण और पूंजीगत व्यय' },
        paragraphs: [
          {
            en: 'The BE for capital outlay on defence services relating to modernisation and infrastructure was ₹1,62,600 crore. The Ministry of Defence stated that this was ₹10,230 crore, or 6.7%, above the FY 2022–23 BE. Capital allocation is a provision for expenditure; it does not by itself establish what was contracted, delivered, or spent during the year.',
            hi: 'रक्षा सेवाओं के आधुनिकीकरण और अवसंरचना से संबंधित पूंजीगत परिव्यय का BE ₹1,62,600 करोड़ था। रक्षा मंत्रालय के अनुसार यह वित्त वर्ष 2022–23 के BE से ₹10,230 करोड़, अर्थात 6.7%, अधिक था। पूंजीगत आवंटन व्यय का प्रावधान होता है; इससे अपने-आप यह सिद्ध नहीं होता कि वर्ष के दौरान कितने अनुबंध हुए, कितनी सामग्री मिली या कितनी राशि खर्च हुई।',
          },
        ],
      },
      {
        heading: { en: 'Border Roads Organisation and strategic infrastructure', hi: 'सीमा सड़क संगठन और रणनीतिक अवसंरचना' },
        paragraphs: [
          {
            en: 'The Ministry of Defence reported a BRO capital budget of ₹5,000 crore for FY 2023–24 and described it as a 43% increase. This is an allocation figure. Individual road or tunnel completion status must be checked against the responsible project authority; the budget announcement alone does not confirm that a project was completed.',
            hi: 'रक्षा मंत्रालय ने वित्त वर्ष 2023–24 के लिए BRO का पूंजीगत बजट ₹5,000 करोड़ बताया और इसे 43% की वृद्धि कहा। यह आवंटन का आँकड़ा है। किसी सड़क या सुरंग की पूर्णता की स्थिति संबंधित परियोजना प्राधिकरण से अलग से जाँची जानी चाहिए; केवल बजट घोषणा से परियोजना पूरी होना प्रमाणित नहीं होता।',
          },
          {
            en: 'No completion claim for a named tunnel is made in this draft because the supplied outline did not identify the specific projects or their intended comparison dates.',
            hi: 'इस मसौदे में किसी नामित सुरंग के पूरा होने का दावा नहीं है, क्योंकि उपलब्ध रूपरेखा में विशिष्ट परियोजनाओं या उनकी तुलना के लिए तारीखों का उल्लेख नहीं था।',
          },
        ],
      },
      {
        heading: { en: 'Defence research and development', hi: 'रक्षा अनुसंधान एवं विकास' },
        paragraphs: [
          {
            en: 'The FY 2023–24 BE allocation reported for DRDO was ₹23,264 crore, a 9% increase as stated by the Ministry of Defence. The same release listed ₹116 crore for Innovations for Defence Excellence (iDEX), 93% higher than FY 2022–23, and ₹45 crore for the Defence Testing Infrastructure Scheme (DTIS), 95% higher than FY 2022–23. These comparisons follow the Ministry’s published figures and refer to budget estimates.',
            hi: 'DRDO के लिए वित्त वर्ष 2023–24 का BE आवंटन ₹23,264 करोड़ बताया गया था, जिसे रक्षा मंत्रालय ने 9% की वृद्धि कहा। उसी विज्ञप्ति में Innovations for Defence Excellence (iDEX) के लिए ₹116 करोड़—वित्त वर्ष 2022–23 से 93% अधिक—और Defence Testing Infrastructure Scheme (DTIS) के लिए ₹45 करोड़—वित्त वर्ष 2022–23 से 95% अधिक—दिए गए। ये तुलनाएँ रक्षा मंत्रालय के प्रकाशित आँकड़ों पर आधारित हैं और बजट अनुमानों से संबंधित हैं।',
          },
        ],
      },
      {
        heading: { en: 'Domestic defence production and self-reliance', hi: 'स्वदेशी रक्षा उत्पादन और आत्मनिर्भरता' },
        paragraphs: [
          {
            en: 'In February 2023, the Defence Ministry announced that 75% of the FY 2023–24 defence capital procurement budget—approximately ₹1 lakh crore—had been earmarked for domestic industry, compared with 68% in FY 2022–23. An earmark is a policy allocation, not evidence that the full amount was ultimately procured from domestic suppliers or that import dependence ended.',
            hi: 'फरवरी 2023 में रक्षा मंत्रालय ने घोषणा की कि वित्त वर्ष 2023–24 के रक्षा पूंजीगत खरीद बजट का 75%—लगभग ₹1 लाख करोड़—घरेलू उद्योग के लिए निर्धारित किया गया था; वित्त वर्ष 2022–23 में यह 68% था। यह नीति के तहत निर्धारित हिस्सा है, इस बात का प्रमाण नहीं कि पूरी राशि अंततः घरेलू आपूर्तिकर्ताओं से खर्च हुई या आयात पर निर्भरता समाप्त हो गई।',
          },
          {
            en: 'Self-reliance is a policy objective whose progress needs to be assessed using procurement, production, technology, and export data with clearly stated definitions and years. This draft does not infer those outcomes from budget announcements alone.',
            hi: 'आत्मनिर्भरता एक नीतिगत उद्देश्य है। इसकी प्रगति का आकलन स्पष्ट परिभाषाओं और वर्षों के साथ खरीद, उत्पादन, प्रौद्योगिकी और निर्यात के आँकड़ों से किया जाना चाहिए। यह मसौदा केवल बजट घोषणाओं से ऐसे परिणामों का निष्कर्ष नहीं निकालता।',
          },
        ],
      },
      {
        heading: { en: 'Veterans’ pensions and One Rank One Pension', hi: 'पूर्व सैनिकों की पेंशन और वन रैंक वन पेंशन' },
        paragraphs: [
          {
            en: 'Defence pensions were allocated ₹1,38,205 crore in BE 2023–24, compared with ₹1,19,696 crore in BE 2022–23. The Ministry separately said the FY 2022–23 Revised Estimate included ₹28,138 crore to meet costs arising from the pension revision under One Rank One Pension (OROP). The ₹28,138 crore figure belongs to the FY 2022–23 RE explanation and should not be misreported as a separate FY 2023–24 OROP allocation.',
            hi: 'वित्त वर्ष 2023–24 के BE में रक्षा पेंशन के लिए ₹1,38,205 करोड़ रखे गए थे, जबकि वित्त वर्ष 2022–23 के BE में ₹1,19,696 करोड़ थे। मंत्रालय ने अलग से बताया कि वित्त वर्ष 2022–23 के संशोधित अनुमान (RE) में वन रैंक वन पेंशन (OROP) के तहत पेंशन संशोधन की जरूरतों के लिए ₹28,138 करोड़ शामिल थे। ₹28,138 करोड़ का यह आँकड़ा वित्त वर्ष 2022–23 के RE के संदर्भ में है; इसे वित्त वर्ष 2023–24 का अलग OROP आवंटन नहीं बताना चाहिए।',
          },
        ],
      },
      {
        heading: { en: 'Conclusion: policy goals and public accountability', hi: 'निष्कर्ष: नीतिगत लक्ष्य और सार्वजनिक जवाबदेही' },
        paragraphs: [
          {
            en: 'The FY 2023–24 budget set out allocations for modernisation, infrastructure, research, pensions, and domestic procurement. Whether these provisions produced the intended results is a separate question that requires actual expenditure, delivery, and outcome data. Budget estimates provide a plan for the year; they are not, on their own, a measure of completed work or capability.',
            hi: 'वित्त वर्ष 2023–24 के बजट में आधुनिकीकरण, अवसंरचना, अनुसंधान, पेंशन और घरेलू खरीद के लिए आवंटन रखे गए थे। इन प्रावधानों से अपेक्षित परिणाम मिले या नहीं, यह अलग प्रश्न है और इसके लिए वास्तविक व्यय, आपूर्ति तथा परिणामों के आँकड़े आवश्यक हैं। बजट अनुमान वर्ष की योजना बताते हैं; वे अपने-आप पूरे हुए कार्य या क्षमता का माप नहीं होते।',
          },
        ],
      },
    ],
    imageAlt: { en: 'No verified featured image supplied', hi: 'कोई सत्यापित प्रमुख तस्वीर उपलब्ध नहीं' },
    publishedAt: '',
    updatedAt: '',
    author: { en: 'Author to be confirmed', hi: 'लेखक की पुष्टि लंबित' },
    sources: [
      { name: { en: 'Ministry of Defence / PIB: Defence Budget 2023–24 (BE figures and allocations)', hi: 'रक्षा मंत्रालय / PIB: रक्षा बजट 2023–24 (BE आँकड़े और आवंटन)' }, url: 'https://www.pib.gov.in/PressReleasePage.aspx?PRID=1895472&lang=2&reg=48' },
      { name: { en: 'Union Budget 2023–24: official budget documents', hi: 'केंद्रीय बजट 2023–24: आधिकारिक बजट दस्तावेज' }, url: 'https://www.indiabudget.gov.in/budget2023-24/' },
      { name: { en: 'Ministry of Defence / PIB: 75% capital procurement earmarked for domestic industry', hi: 'रक्षा मंत्रालय / PIB: पूंजीगत खरीद का 75% घरेलू उद्योग के लिए निर्धारित' }, url: 'https://www.pib.gov.in/PressReleasePage.aspx?PRID=1899388&lang=2&reg=48' },
    ],
    status: 'draft',
  },
  {
    id: 'government-schemes-guide',
    slug: 'government-schemes-eligibility-benefits-application-process',
    categoryId: 'schemes',
    title: { en: 'Government Schemes: Eligibility, Benefits and Application Process', hi: 'सरकारी योजनाएँ: पात्रता, लाभ और आवेदन प्रक्रिया' },
    excerpt: { en: 'A practical checklist for finding official scheme information, checking eligibility, applying through the right channel, and avoiding fraud.', hi: 'आधिकारिक योजना जानकारी खोजने, पात्रता जाँचने, सही माध्यम से आवेदन करने और धोखाधड़ी से बचने की उपयोगी जाँच-सूची।' },
    sections: [
      { heading: { en: 'Start with an official scheme page', hi: 'आधिकारिक योजना पृष्ठ से शुरुआत करें' }, paragraphs: [
        { en: 'Eligibility, benefits, documents, and application windows vary by scheme and may change. Search the myScheme portal or the responsible ministry/state department, open the specific scheme page, and read its current rules before acting. A general summary is not a substitute for the scheme guidelines.', hi: 'पात्रता, लाभ, दस्तावेज और आवेदन अवधि हर योजना में अलग होती है और बदल सकती है। मायस्कीम पोर्टल या संबंधित मंत्रालय/राज्य विभाग पर योजना खोजें, उसका विशिष्ट पृष्ठ खोलें और आवेदन से पहले वर्तमान नियम पढ़ें। सामान्य सारांश योजना के दिशा-निर्देशों का विकल्प नहीं है।' },
        { en: 'Check who can apply, which documents are required, where applications are accepted, how status is tracked, and how an appeal or grievance is made. Keep the application acknowledgement and use only contact information published by the responsible department.', hi: 'कौन आवेदन कर सकता है, कौन से दस्तावेज चाहिए, आवेदन कहाँ स्वीकार होता है, स्थिति कैसे देखी जाती है और अपील/शिकायत कैसे की जाती है—इनकी पुष्टि करें। आवेदन पावती रखें और केवल संबंधित विभाग द्वारा प्रकाशित संपर्क जानकारी का उपयोग करें।' },
      ] },
      { heading: { en: 'Protect your personal information', hi: 'अपनी निजी जानकारी सुरक्षित रखें' }, paragraphs: [
        { en: 'Do not trust a link only because it uses a government logo. Avoid unknown links, never share an OTP or password, and do not pay an unverified agent for a promised approval or benefit. If a requirement is unclear, contact the scheme office or service centre listed by the department.', hi: 'केवल सरकारी लोगो देखकर किसी लिंक पर भरोसा न करें। अनजान लिंक से बचें, OTP या पासवर्ड कभी साझा न करें और मंजूरी या लाभ के वादे पर अपुष्ट एजेंट को भुगतान न करें। कोई शर्त स्पष्ट न हो तो विभाग द्वारा बताए कार्यालय या सेवा केंद्र से संपर्क करें।' },
      ] },
    ],
    image: '/images/blog/property%20card.webp', imageAlt: { en: 'Information card for public schemes', hi: 'सार्वजनिक योजनाओं के लिए सूचना कार्ड' },
    publishedAt: '2026-10-10', updatedAt: '2026-10-10', author: ashish,
    sources: [
      { name: { en: 'myScheme: Government scheme discovery portal', hi: 'मायस्कीम: सरकारी योजना खोज पोर्टल' }, url: 'https://www.myscheme.gov.in/' },
      { name: { en: 'PM-KISAN official portal', hi: 'पीएम-किसान आधिकारिक पोर्टल' }, url: 'https://pmkisan.gov.in/' },
    ], featured: true, status: 'published',
  },
  {
    id: 'india-before-after-2014', slug: 'india-before-after-2014-public-welfare-development-indicators', categoryId: 'india-comparison',
    title: { en: 'India Before and After 2014: Public Welfare and Development Indicators', hi: '2014 से पहले और बाद का भारत: जनकल्याण एवं विकास के आँकड़े' },
    excerpt: { en: 'A planned comparison of education, employment, women’s welfare, infrastructure, healthcare, and schemes. Held as a draft until comparable official series are assembled.', hi: 'शिक्षा, रोजगार, महिला कल्याण, अवसंरचना, स्वास्थ्य और योजनाओं की प्रस्तावित तुलना। तुलनीय आधिकारिक आँकड़े संकलित होने तक मसौदे के रूप में सुरक्षित।' },
    sections: [{ heading: { en: 'Verification required before publication', hi: 'प्रकाशन से पहले सत्यापन आवश्यक' }, paragraphs: [
      { en: 'This comparison is not published. A fair before-and-after analysis requires comparable indicators, definitions, geographic coverage, and time periods, with a source and unit for every figure. Those verified data series have not yet been assembled for this article.', hi: 'यह तुलना प्रकाशित नहीं है। निष्पक्ष पहले-बाद के विश्लेषण के लिए तुलनीय संकेतक, परिभाषाएँ, भौगोलिक कवरेज और समयावधि आवश्यक हैं तथा प्रत्येक आँकड़े के साथ स्रोत और इकाई देनी होगी। इस लेख के लिए सत्यापित आँकड़ा-श्रृंखलाएँ अभी संकलित नहीं हुई हैं।' },
      { en: 'When published, the article will explain data limitations and continuing challenges, and will not attribute every change to one government.', hi: 'प्रकाशित होने पर लेख आँकड़ों की सीमाएँ और जारी चुनौतियाँ बताएगा तथा हर बदलाव का श्रेय किसी एक सरकार को नहीं देगा।' },
    ] }],
    imageAlt: { en: 'Public data comparison', hi: 'जन आँकड़ों की तुलना' }, publishedAt: '2026-10-10', updatedAt: '2026-10-10', author: ashish, sources: [], status: 'draft',
  },
  {
    id: 'uttar-pradesh-since-2017', slug: 'uttar-pradesh-since-2017-development-public-services', categoryId: 'uttar-pradesh',
    title: { en: 'Uttar Pradesh Since 2017: Development and Public Services', hi: '2017 के बाद उत्तर प्रदेश: विकास और जनसुविधाएँ' },
    excerpt: { en: 'A guide to checking public announcements and service information, separating proposals, ongoing work, completed projects, and measured outcomes.', hi: 'सरकारी घोषणाओं और सेवा-संबंधी जानकारी को जाँचने की मार्गदर्शिका—प्रस्ताव, जारी कार्य, पूर्ण परियोजना और मापे गए परिणाम अलग-अलग।' },
    sections: [
      { heading: { en: 'Read the status, not only the headline', hi: 'केवल शीर्षक नहीं, परियोजना की स्थिति भी देखें' }, paragraphs: [
        { en: 'Government departments publish scheme notices, policy announcements, and project updates. A press release can document what an office announced, but does not by itself prove that a project has been completed or that a public-service outcome has improved.', hi: 'सरकारी विभाग योजनाओं की सूचना, नीतिगत घोषणाएँ और परियोजना अपडेट प्रकाशित करते हैं। प्रेस विज्ञप्ति यह दर्ज कर सकती है कि विभाग ने क्या घोषित किया, लेकिन इससे अपने-आप परियोजना पूर्ण होने या जनसेवा के परिणाम में सुधार होने का प्रमाण नहीं मिलता।' },
        { en: 'For roads, education, healthcare, women’s safety, employment, investment, water, and sanitation, note the publication date and status: proposed, approved, tendered, under construction, commissioned, or completed. Prefer administrative records or independent measurements when discussing outcomes.', hi: 'सड़क, शिक्षा, स्वास्थ्य, महिला सुरक्षा, रोजगार, निवेश, पानी और स्वच्छता पर जानकारी लेते समय प्रकाशन की तारीख और स्थिति लिखें: प्रस्तावित, स्वीकृत, निविदा जारी, निर्माणाधीन, चालू या पूर्ण। परिणामों पर चर्चा में प्रशासनिक अभिलेख या स्वतंत्र माप को प्राथमिकता दें।' },
      ] },
      { heading: { en: 'Check geographic coverage', hi: 'भौगोलिक कवरेज जाँचें' }, paragraphs: [
        { en: 'State-wide totals do not establish a result for Unnao or Bhagwant Nagar unless the source reports that exact area. This article makes no claim about a specific local project or outcome.', hi: 'राज्य-स्तरीय कुल आँकड़े उन्नाव या भगवंतनगर का परिणाम सिद्ध नहीं करते, जब तक स्रोत उसी क्षेत्र का विवरण न दे। यह लेख किसी विशिष्ट स्थानीय परियोजना या परिणाम का दावा नहीं करता।' },
      ] },
    ],
    image: '/images/blog/road.jpg', imageAlt: { en: 'Public development event', hi: 'सार्वजनिक विकास कार्यक्रम' }, publishedAt: '2026-10-10', updatedAt: '2026-10-10', author: ashish,
    sources: [{ name: { en: 'Uttar Pradesh Information and Public Relations Department', hi: 'उत्तर प्रदेश सूचना एवं जनसंपर्क विभाग' }, url: 'https://information.up.gov.in/en/Default.aspx' }, { name: { en: 'Invest UP: official press releases', hi: 'इन्वेस्ट यूपी: आधिकारिक प्रेस विज्ञप्तियाँ' }, url: 'https://invest.up.gov.in/press-releases/' }], status: 'published',
  },
  {
    id: 'women-safety-empowerment', slug: 'women-safety-empowerment-schemes-support-services', categoryId: 'women',
    title: { en: 'Women’s Safety and Empowerment: Schemes and Support Services', hi: 'महिला सुरक्षा एवं सशक्तिकरण: योजनाएँ और सहायता सेवाएँ' },
    excerpt: { en: 'Official information on support channels, women’s helpline services, and how to find current welfare programme details.', hi: 'सहायता माध्यमों, महिला हेल्पलाइन सेवाओं और वर्तमान कल्याणकारी योजनाओं की आधिकारिक जानकारी खोजने के तरीके।' },
    sections: [
      { heading: { en: 'Support channels', hi: 'सहायता माध्यम' }, paragraphs: [
        { en: 'The Ministry of Women and Child Development identifies 181 as a toll-free Women Helpline for women seeking support or scheme information. For an immediate emergency, the Government of India’s Emergency Response Support System identifies 112 as the pan-India emergency number. Check the official service pages for current guidance.', hi: 'महिला एवं बाल विकास मंत्रालय महिलाओं की सहायता और योजना संबंधी जानकारी के लिए 181 को टोल-फ्री महिला हेल्पलाइन बताता है। तत्काल आपात स्थिति में भारत सरकार की आपातकालीन प्रतिक्रिया सहायता प्रणाली 112 को अखिल भारतीय आपात नंबर बताती है। वर्तमान निर्देश आधिकारिक सेवा पृष्ठों पर देखें।' },
        { en: 'Mission Shakti describes components including One Stop Centres and Women Helpline services. Local availability and operating arrangements should be confirmed through the relevant government portal or district office.', hi: 'मिशन शक्ति में वन स्टॉप सेंटर और महिला हेल्पलाइन जैसी सेवाओं का विवरण है। स्थानीय उपलब्धता और संचालन की पुष्टि संबंधित सरकारी पोर्टल या जिला कार्यालय से करें।' },
      ] },
      { heading: { en: 'Empowerment and awareness', hi: 'सशक्तिकरण और जागरूकता' }, paragraphs: [
        { en: 'For education, livelihood, or welfare support, read the current official scheme rules and use the named department’s application channel. Public awareness should share verified information, respect privacy, and avoid guarantees that do not appear in official notices.', hi: 'शिक्षा, आजीविका या कल्याण सहायता के लिए वर्तमान आधिकारिक नियम पढ़ें और संबंधित विभाग के आवेदन माध्यम का उपयोग करें। जनजागरूकता में सत्यापित जानकारी साझा करें, निजता का सम्मान करें और आधिकारिक सूचना में न दिए गए आश्वासन न दें।' },
      ] },
    ],
    image: '/images/blog/women.jpg', imageAlt: { en: 'Young people at a public event', hi: 'सार्वजनिक कार्यक्रम में युवा' }, publishedAt: '2026-10-10', updatedAt: '2026-10-10', author: ashish,
    sources: [{ name: { en: 'Women Helpline 181: Ministry of Women and Child Development', hi: 'महिला हेल्पलाइन 181: महिला एवं बाल विकास मंत्रालय' }, url: 'https://wcd.gov.in/women/help' }, { name: { en: 'Emergency Response Support System 112', hi: 'आपातकालीन प्रतिक्रिया सहायता प्रणाली 112' }, url: 'https://112.gov.in/' }, { name: { en: 'Mission Shakti', hi: 'मिशन शक्ति' }, url: 'https://missionshakti.wcd.gov.in/' }], status: 'published',
  },
  {
    id: 'education-skill-employment', slug: 'education-skill-development-employment-opportunities', categoryId: 'education',
    title: { en: 'Education, Skill Development and Employment Opportunities', hi: 'शिक्षा, कौशल विकास और रोजगार के अवसर' },
    excerpt: { en: 'Official portals for learning resources, skill courses, and employment services, with practical checks before applying.', hi: 'शिक्षा सामग्री, कौशल पाठ्यक्रम और रोजगार सेवाओं के आधिकारिक पोर्टल तथा आवेदन से पहले की उपयोगी जाँच।' },
    sections: [
      { heading: { en: 'Find learning and training resources', hi: 'शिक्षा और प्रशिक्षण संसाधन खोजें' }, paragraphs: [
        { en: 'DIKSHA provides digital learning resources, while Skill India Digital Hub lists courses, skill centres, and employment-related opportunities. Availability, language, entry requirements, fees, duration, and certification vary by offering; check the individual page and provider details.', hi: 'दीक्षा डिजिटल शिक्षा सामग्री उपलब्ध कराता है, जबकि स्किल इंडिया डिजिटल हब पाठ्यक्रम, कौशल केंद्र और रोजगार से जुड़े अवसर दिखाता है। उपलब्धता, भाषा, प्रवेश शर्तें, शुल्क, अवधि और प्रमाणन हर कार्यक्रम में अलग हो सकते हैं; संबंधित पृष्ठ और प्रदाता का विवरण जाँचें।' },
        { en: 'For schemes and financial support, use myScheme to discover programmes and then verify the current rules with the responsible department. A listing is not a guarantee of admission, a job, placement, or assistance.', hi: 'योजनाओं और आर्थिक सहायता के लिए मायस्कीम पर कार्यक्रम खोजें और फिर संबंधित विभाग से वर्तमान नियम सत्यापित करें। सूची में नाम होना प्रवेश, नौकरी, प्लेसमेंट या सहायता की गारंटी नहीं है।' },
      ] },
      { heading: { en: 'Apply carefully', hi: 'सावधानी से आवेदन करें' }, paragraphs: [
        { en: 'Use official application channels, keep acknowledgement details, and do not share OTPs or passwords with agents. Confirm fees and deadlines from the official provider before making decisions.', hi: 'आधिकारिक आवेदन माध्यम का उपयोग करें, पावती का विवरण रखें और एजेंट को OTP या पासवर्ड न बताएं। निर्णय लेने से पहले शुल्क और समयसीमा आधिकारिक प्रदाता से जाँचें।' },
      ] },
    ],
    image: '/images/blog/education.webp', imageAlt: { en: 'Education and professional learning', hi: 'शिक्षा और व्यावसायिक अध्ययन' }, publishedAt: '2026-10-10', updatedAt: '2026-10-10', author: ashish,
    sources: [{ name: { en: 'DIKSHA national school education platform', hi: 'दीक्षा राष्ट्रीय स्कूल शिक्षा मंच' }, url: 'https://diksha.gov.in/' }, { name: { en: 'Skill India Digital Hub', hi: 'स्किल इंडिया डिजिटल हब' }, url: 'https://www.skillindiadigital.gov.in/' }, { name: { en: 'myScheme', hi: 'मायस्कीम' }, url: 'https://www.myscheme.gov.in/' }], status: 'published',
  },
  {
    id: 'svamitva-property-cards', slug: 'svamitva-scheme-uttar-pradesh-property-cards-explained', categoryId: 'schemes',
    title: { en: 'SVAMITVA Scheme in Uttar Pradesh: Property Cards Explained', hi: 'उत्तर प्रदेश में स्वामित्व योजना: प्रॉपर्टी कार्ड की जानकारी' },
    excerpt: { en: 'Understand the rural abadi survey, property-card process, official records, and where residents can check their own area’s status.', hi: 'ग्रामीण आबादी सर्वे, संपत्ति कार्ड प्रक्रिया, आधिकारिक अभिलेख और अपने क्षेत्र की स्थिति जाँचने के माध्यम को समझें।' },
    sections: [
      { heading: { en: 'What the scheme does', hi: 'योजना का उद्देश्य' }, paragraphs: [
        { en: 'The Ministry of Panchayati Raj describes SVAMITVA as a scheme that maps rural inhabited (abadi) areas using drone technology and supports preparation of property records/cards with state departments and the Survey of India. The process depends on official survey and state-level steps.', hi: 'पंचायती राज मंत्रालय स्वामित्व को ऐसी योजना बताता है जो ड्रोन तकनीक से ग्रामीण आबादी क्षेत्रों का मानचित्रण करती है और राज्य विभागों तथा भारतीय सर्वेक्षण विभाग के सहयोग से संपत्ति अभिलेख/कार्ड तैयार करने में मदद करती है। प्रक्रिया आधिकारिक सर्वे और राज्य-स्तरीय चरणों पर निर्भर है।' },
        { en: 'A property card should be read with the applicable state records and rules. It is not a guarantee that every title dispute is settled or a replacement for legal advice. Ask the local revenue office about coverage, corrections, and the applicable process.', hi: 'संपत्ति कार्ड को लागू राज्य अभिलेखों और नियमों के साथ समझें। यह हर स्वामित्व विवाद सुलझने की गारंटी या कानूनी सलाह का विकल्प नहीं है। कवरेज, सुधार और लागू प्रक्रिया के लिए स्थानीय राजस्व कार्यालय से पूछें।' },
      ] },
      { heading: { en: 'Do not confuse state totals with local results', hi: 'राज्य के आँकड़ों को स्थानीय परिणाम न समझें' }, paragraphs: [
        { en: 'Dashboard totals cover multiple geographies. They should not be reported as Uttar Pradesh, Unnao, or Bhagwant Nagar figures unless the official data is filtered to that geography and its reporting date is stated. This article does not assert local coverage numbers.', hi: 'डैशबोर्ड के कुल आँकड़े कई क्षेत्रों को समेटते हैं। जब तक आधिकारिक आँकड़ा उसी क्षेत्र के लिए फ़िल्टर न हो और रिपोर्ट की तारीख न दी जाए, उसे उत्तर प्रदेश, उन्नाव या भगवंतनगर का आँकड़ा न बताएं। यह लेख स्थानीय कवरेज संख्या का दावा नहीं करता।' },
      ] },
    ],
    image: '/images/blog/property%20card.webp', imageAlt: { en: 'Digital card and online application', hi: 'डिजिटल कार्ड और ऑनलाइन आवेदन' }, publishedAt: '2026-10-10', updatedAt: '2026-10-10', author: ashish,
    sources: [{ name: { en: 'Ministry of Panchayati Raj: SVAMITVA', hi: 'पंचायती राज मंत्रालय: स्वामित्व' }, url: 'https://svamitva.nic.in/svamitva/index.html' }, { name: { en: 'SVAMITVA official downloads and Uttar Pradesh formats', hi: 'स्वामित्व आधिकारिक डाउनलोड एवं उत्तर प्रदेश प्रारूप' }, url: 'https://svamitva.nic.in/svamitva/download.html' }], status: 'published',
  },
  {
    id: 'rural-youth-skills', slug: 'rural-youth-skill-training-opportunities', categoryId: 'employment',
    title: { en: 'Rural Youth and Skill Training Opportunities', hi: 'ग्रामीण युवाओं के लिए कौशल प्रशिक्षण के अवसर' },
    excerpt: { en: 'How to explore official courses and training options, check eligibility, and avoid promises of guaranteed jobs or assistance.', hi: 'आधिकारिक पाठ्यक्रम और प्रशिक्षण विकल्प कैसे खोजें, पात्रता जाँचें और नौकरी या सहायता की गारंटी के वादों से बचें।' },
    sections: [
      { heading: { en: 'Explore official opportunities', hi: 'आधिकारिक अवसर खोजें' }, paragraphs: [
        { en: 'Skill India Digital Hub supports course and skill-centre discovery and links to job, apprenticeship, and entrepreneurship opportunities. For each listing, review the provider, location, language, eligibility, duration, any charges, and the certificate or assessment information.', hi: 'स्किल इंडिया डिजिटल हब पाठ्यक्रम और कौशल केंद्र खोजने तथा नौकरी, अप्रेंटिसशिप और उद्यमिता के अवसरों तक पहुँचने में मदद करता है। हर सूची में प्रदाता, स्थान, भाषा, पात्रता, अवधि, शुल्क (यदि हों) और प्रमाणपत्र/मूल्यांकन की जानकारी देखें।' },
        { en: 'myScheme can help users discover central and state programmes based on personal circumstances. Always verify current eligibility and application steps on the responsible department’s page.', hi: 'मायस्कीम व्यक्तिगत परिस्थितियों के आधार पर केंद्रीय और राज्य कार्यक्रम खोजने में मदद कर सकता है। वर्तमान पात्रता और आवेदन प्रक्रिया संबंधित विभाग के पृष्ठ पर सत्यापित करें।' },
      ] },
      { heading: { en: 'No guaranteed placement', hi: 'प्लेसमेंट की गारंटी नहीं' }, paragraphs: [
        { en: 'A course or programme listing does not guarantee a training seat, job, placement, or financial assistance. Apply through official channels, keep a record of communications, and do not pay an unverified agent promising a guaranteed result.', hi: 'पाठ्यक्रम या कार्यक्रम की सूची प्रशिक्षण सीट, नौकरी, प्लेसमेंट या आर्थिक सहायता की गारंटी नहीं है। आधिकारिक माध्यम से आवेदन करें, संवाद का रिकॉर्ड रखें और निश्चित परिणाम का वादा करने वाले अपुष्ट एजेंट को भुगतान न करें।' },
      ] },
    ],
    image: '/images/blog/education.webp', imageAlt: { en: 'Education and professional learning', hi: 'शिक्षा और व्यावसायिक अध्ययन' }, publishedAt: '2026-10-10', updatedAt: '2026-10-10', author: ashish,
    sources: [{ name: { en: 'Skill India Digital Hub', hi: 'स्किल इंडिया डिजिटल हब' }, url: 'https://www.skillindiadigital.gov.in/' }, { name: { en: 'myScheme', hi: 'मायस्कीम' }, url: 'https://www.myscheme.gov.in/' }], status: 'published',
  },
  {
    id: 'bhagwant-nagar-priorities', slug: 'bhagwant-nagar-local-development-priorities-civic-services', categoryId: 'local',
    title: { en: 'Bhagwant Nagar: Local Development Priorities and Civic Services', hi: 'भगवंत नगर: स्थानीय विकास प्राथमिकताएँ और जनसुविधाएँ' },
    excerpt: { en: 'A resident-focused overview of civic issues and official ways to submit and track a public grievance in Uttar Pradesh.', hi: 'नागरिक समस्याओं और उत्तर प्रदेश में जनशिकायत दर्ज करने तथा उसकी स्थिति देखने के आधिकारिक माध्यमों की जानकारी।' },
    sections: [
      { heading: { en: 'Raise a civic issue with useful details', hi: 'नागरिक समस्या की उपयोगी जानकारी दें' }, paragraphs: [
        { en: 'Roads, drinking water, drainage, sanitation, street lighting, education, healthcare access, and local livelihoods are topics residents may raise with the responsible public office. Describe the location, service involved, what was observed, and when. Avoid sharing another person’s private information publicly.', hi: 'सड़क, पेयजल, जल निकासी, स्वच्छता, स्ट्रीट लाइट, शिक्षा, स्वास्थ्य तक पहुँच और स्थानीय आजीविका ऐसे विषय हैं जिन्हें निवासी जिम्मेदार कार्यालय के सामने रख सकते हैं। स्थान, संबंधित सेवा, देखी गई स्थिति और समय स्पष्ट लिखें। किसी अन्य व्यक्ति की निजी जानकारी सार्वजनिक न करें।' },
        { en: 'The Uttar Pradesh Jansunwai–Samadhan portal provides grievance registration, tracking, reminders, and feedback. Read the portal instructions and exclusions before filing. An acknowledgement confirms receipt, not resolution.', hi: 'उत्तर प्रदेश जनसुनवाई–समाधान पोर्टल पर शिकायत दर्ज करने, स्थिति देखने, अनुस्मारक भेजने और प्रतिक्रिया देने की सुविधा है। शिकायत से पहले पोर्टल के निर्देश और अपवाद पढ़ें। पावती प्राप्त होना शिकायत समाधान का प्रमाण नहीं है।' },
      ] },
      { heading: { en: 'Confirm the responsible authority', hi: 'जिम्मेदार प्राधिकरण की पुष्टि करें' }, paragraphs: [
        { en: 'The appropriate office depends on the service and jurisdiction. Confirm whether the matter belongs to the Nagar Panchayat, a state department, district administration, or another provider. These are general discussion priorities, not verified findings about a specific neighbourhood or claims of completed work.', hi: 'उचित कार्यालय सेवा और अधिकार-क्षेत्र के अनुसार तय होता है। पुष्टि करें कि मामला नगर पंचायत, राज्य विभाग, जिला प्रशासन या किसी अन्य सेवा प्रदाता के अंतर्गत है। ये सामान्य चर्चा के विषय हैं, किसी खास मोहल्ले के सत्यापित निष्कर्ष या पूर्ण कार्य के दावे नहीं।' },
      ] },
    ],
    image: '/images/blog/ashish1.jpg', imageAlt: { en: 'Ashish Shukla speaking with local residents at a public meeting', hi: 'जनसभा में स्थानीय निवासियों से संवाद करते आशीष शुक्ला' }, publishedAt: '2026-10-10', updatedAt: '2026-10-10', author: ashish,
    sources: [{ name: { en: 'Uttar Pradesh Jansunwai–Samadhan', hi: 'उत्तर प्रदेश जनसुनवाई–समाधान' }, url: 'https://jansunwai.up.nic.in/?language=en_US' }, { name: { en: 'Constitution (Seventy-Fourth Amendment) Act', hi: 'संविधान (74वाँ संशोधन) अधिनियम' }, url: 'https://mohua.gov.in/upload/uploadfiles/files/ConsAct74.pdf' }], status: 'published',
  },
  {
    id: 'bjp-policy-announcements', slug: 'bjp-policies-government-schemes-official-announcements', categoryId: 'bjp-policy',
    title: { en: 'BJP Policies and Government Schemes: Understanding Official Announcements', hi: 'भाजपा की नीतियाँ और सरकारी योजनाएँ: आधिकारिक घोषणाओं को समझना' },
    excerpt: { en: 'How to distinguish a party’s published policy position from government rules, implementation records, and independently measured outcomes.', hi: 'पार्टी की प्रकाशित नीतिगत स्थिति को सरकारी नियमों, क्रियान्वयन अभिलेखों और स्वतंत्र रूप से मापे गए परिणामों से अलग पहचानने की जानकारी।' },
    sections: [
      { heading: { en: 'Party position and government action are different records', hi: 'पार्टी का दृष्टिकोण और सरकारी कार्रवाई अलग अभिलेख हैं' }, paragraphs: [
        { en: 'A party manifesto or policy document records the party’s stated commitments and positions at the time it was published. For example, the BJP’s 2024 Sankalp Patra is a party document. Its statements should be attributed to the BJP and read as political commitments, not proof that a programme was implemented or that a promised outcome occurred.', hi: 'पार्टी का घोषणापत्र या नीति दस्तावेज प्रकाशित होने के समय पार्टी की घोषित प्रतिबद्धताओं और दृष्टिकोण को दर्ज करता है। उदाहरण के लिए, भाजपा का 2024 संकल्प पत्र पार्टी दस्तावेज है। उसके कथनों का श्रेय भाजपा को दें और उन्हें राजनीतिक प्रतिबद्धताओं के रूप में पढ़ें—किसी कार्यक्रम के लागू होने या वांछित परिणाम प्राप्त होने के प्रमाण के रूप में नहीं।' },
        { en: 'To assess implementation, check the responsible government department’s scheme rules, budget or administrative records, project status, and outcome data. Keep announcements, approvals, ongoing work, completed outputs, and independently assessed outcomes clearly separated.', hi: 'क्रियान्वयन का आकलन करने के लिए जिम्मेदार सरकारी विभाग के योजना नियम, बजट या प्रशासनिक अभिलेख, परियोजना स्थिति और परिणाम आँकड़े देखें। घोषणाओं, स्वीकृतियों, जारी कार्यों, पूर्ण आउटपुट और स्वतंत्र आकलन वाले परिणामों को स्पष्ट रूप से अलग रखें।' },
      ] },
    ],
    image: '/images/blog/road.jpg', imageAlt: { en: 'Public representatives at an event', hi: 'कार्यक्रम में जनप्रतिनिधि' }, publishedAt: '2026-10-10', updatedAt: '2026-10-10', author: ashish,
    sources: [{ name: { en: 'BJP 2024 Sankalp Patra (party document)', hi: 'भाजपा संकल्प पत्र 2024 (पार्टी दस्तावेज)' }, url: 'https://www.bjp.org/files/2024-04/Modi-Ki-Guarantee-Sankalp-Patra-English.pdf' }, { name: { en: 'Lok Sabha Library: political party manifestos', hi: 'लोकसभा पुस्तकालय: राजनीतिक दलों के घोषणापत्र' }, url: 'https://sansad.in/ls/library/manifestos' }, { name: { en: 'BJP Central Library: manifesto archive', hi: 'भाजपा केंद्रीय पुस्तकालय: घोषणापत्र संग्रह' }, url: 'https://library.bjp.org/jspui/handle/123456789/260' }], status: 'published',
  },
  {
    id: 'latest-verified-updates', slug: 'latest-verified-government-uttar-pradesh-updates', categoryId: 'latest',
    title: { en: 'Latest Verified Government and Uttar Pradesh Updates', hi: 'सरकारी एवं उत्तर प्रदेश के नवीनतम सत्यापित अपडेट' },
    excerpt: { en: 'This planned roundup is not published because no specific update has yet been selected and checked against a dated official source.', hi: 'यह प्रस्तावित समाचार-संकलन प्रकाशित नहीं है क्योंकि किसी विशिष्ट अपडेट को तारीख सहित आधिकारिक स्रोत से जाँचा नहीं गया है।' },
    sections: [{ heading: { en: 'Draft — awaiting source verification', hi: 'मसौदा — स्रोत सत्यापन लंबित' }, paragraphs: [
      { en: 'No live news feed or automatic synchronization is connected to this website. This article will remain unpublished until each item has a source URL, publication date, and clear status, and any party statement is distinguished from government action.', hi: 'इस वेबसाइट से कोई लाइव समाचार फ़ीड या स्वचालित समन्वय जुड़ा नहीं है। प्रत्येक समाचार के लिए स्रोत URL, प्रकाशन तारीख और स्पष्ट स्थिति मिलने तथा पार्टी वक्तव्य को सरकारी कार्रवाई से अलग बताने तक यह लेख अप्रकाशित रहेगा।' },
    ] }], imageAlt: { en: 'Verified updates', hi: 'सत्यापित अपडेट' }, publishedAt: '2026-10-10', updatedAt: '2026-10-10', author: ashish, sources: [], status: 'draft',
  },
];

export const getPublishedBlogArticles = () => blogArticles
  .filter((article) => article.status === 'published')
  .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));

export const getBlogCategory = (id: string, locale: Locale) =>
  blogCategories.find((category) => category.id === id)?.name[locale] ?? '';
