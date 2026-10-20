import type { LocalizedString } from '@/types';

export interface BiographyData {
  eyebrow: LocalizedString;
  title: LocalizedString;
  quote: LocalizedString;
  paragraphs: LocalizedString[];
  coreValues: {
    title: LocalizedString;
    description: LocalizedString;
  }[];
  profileImage: string;
  portraitImage: string;
}


export const biographyData: BiographyData = {
  eyebrow: {
    en: 'BIOGRAPHY',
    hi: 'जीवन परिचय',
  },

  title: {
    en: 'Ashish Shukla',
    hi: 'आशीष शुक्ला',
  },

  quote: {
    en: '“Public service begins with listening to people, understanding their concerns, and working towards the development of the community.”',
    hi: '“जनसेवा की शुरुआत जनता की बात सुनने, उनकी समस्याओं को समझने और क्षेत्र के विकास के लिए निरंतर प्रयास करने से होती है।”',
  },

  paragraphs: [
   
{
  en: 'Ashish Shukla, also popularly known as “Rinku,” is the Chairman of Bhagwantnagar Nagar Panchayat in Unnao district, Uttar Pradesh. Associated with the Bharatiya Janata Party, his public role is centred on public service, engagement with local residents, and the development of Bhagwantnagar.',

  hi: 'आशीष शुक्ला, जिन्हें “रिंकू” के नाम से भी जाना जाता है, उत्तर प्रदेश के उन्नाव जनपद की नगर पंचायत भगवंतनगर के अध्यक्ष हैं। भारतीय जनता पार्टी से जुड़े आशीष शुक्ला की सार्वजनिक भूमिका जनसेवा, स्थानीय नागरिकों से संवाद और भगवंतनगर के विकास पर केंद्रित है।',
},


    {
      en: 'Elected as a Bharatiya Janata Party candidate in the 2023 Uttar Pradesh urban local body elections, he undertakes responsibilities related to local civic administration. Roads and connectivity, sanitation, drainage, healthcare facilities, electricity-related concerns, and essential civic amenities are important issues for the area.',

      hi: 'वर्ष 2023 के उत्तर प्रदेश नगर निकाय चुनाव में भारतीय जनता पार्टी के प्रत्याशी के रूप में वे नगर पंचायत भगवंतनगर के अध्यक्ष निर्वाचित हुए। उनके दायित्व स्थानीय नागरिक सुविधाओं और प्रशासन से जुड़े हैं। सड़क एवं आवागमन, स्वच्छता, जल निकासी, स्वास्थ्य सुविधाएँ, बिजली से संबंधित समस्याएँ और आवश्यक जनसुविधाएँ क्षेत्र के महत्वपूर्ण विषय हैं।',
    },

   
{
  en: 'His public profile emphasizes listening to residents, understanding local needs, and giving attention to issues that affect everyday life. Through public engagement and a commitment to local development, he aims to contribute to better civic amenities and an improved quality of life for the people of Bhagwantnagar.',

  hi: 'उनके सार्वजनिक जीवन में नागरिकों की बात सुनना, स्थानीय आवश्यकताओं को समझना और रोजमर्रा के जीवन को प्रभावित करने वाली समस्याओं पर ध्यान देना महत्वपूर्ण है। जनसंवाद और क्षेत्र के विकास के प्रति प्रतिबद्धता के माध्यम से उनका उद्देश्य भगवंतनगर में बेहतर नागरिक सुविधाओं और लोगों के जीवन स्तर में सुधार के लिए प्रयास करना है।',
},

  ],

  coreValues: [
    {
      title: {
        en: 'Public Connect',
        hi: 'जनता से जुड़ाव',
      },

      description: {
        en: 'Listening to residents, understanding their concerns, and encouraging meaningful communication between citizens and local representatives.',

        hi: 'नागरिकों की बात सुनना, उनकी समस्याओं को समझना और जनता तथा जनप्रतिनिधियों के बीच सार्थक संवाद को बढ़ावा देना।',
      },
    },

    {
      title: {
        en: 'Local Development',
        hi: 'स्थानीय विकास',
      },

      description: {
        en: 'Focusing on local priorities, including roads, sanitation, drainage, healthcare, and essential civic amenities.',

        hi: 'सड़क, स्वच्छता, जल निकासी, स्वास्थ्य सेवाओं और आवश्यक नागरिक सुविधाओं जैसी स्थानीय प्राथमिकताओं पर ध्यान देना।',
      },
    },

    {
      title: {
        en: 'Inclusive Community',
        hi: 'समावेशी विकास',
      },

      description: {
        en: 'Recognizing the needs of different sections of society and supporting a community-focused approach to development.',

        hi: 'समाज के विभिन्न वर्गों की आवश्यकताओं को समझना और समुदाय की जरूरतों को ध्यान में रखकर विकास को प्राथमिकता देना।',
      },
    },
  ],

  profileImage: '/images/hero/ashish3.png',
  portraitImage: '/images/hero/about.png',
};


