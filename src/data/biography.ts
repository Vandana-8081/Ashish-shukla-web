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
    en: 'Ashish Shukla Rinku',
    hi: 'आशीष शुक्ला रिंकू',
  },

  quote: {
    en: '“Public service means staying connected with people, understanding their concerns, and working towards the development of the community.”',

    hi: '“जनसेवा का अर्थ है जनता से जुड़े रहना, उनकी समस्याओं को समझना और क्षेत्र के विकास की दिशा में निरंतर प्रयास करना।”',
  },

  paragraphs: [
    {
      en: 'Ashish Shukla, popularly known as “Rinku,” is associated with public life in Bhagwantnagar, Unnao district, Uttar Pradesh. His public profile reflects his role as President of Bhagwantnagar Nagar Panchayat and his connection with the local community.',

      hi: 'आशीष शुक्ला, जिन्हें लोकप्रिय रूप से “रिंकू” के नाम से जाना जाता है, उत्तर प्रदेश के उन्नाव जनपद स्थित भगवंतनगर के सार्वजनिक जीवन से जुड़े हैं। नगर पंचायत भगवंतनगर के अध्यक्ष के रूप में उनकी भूमिका और स्थानीय जनता से उनका जुड़ाव उनके सार्वजनिक परिचय का महत्वपूर्ण हिस्सा है।',
    },

    {
      en: 'His public responsibilities are connected with local civic administration and the development of Bhagwantnagar. Important areas of public interest include road connectivity, sanitation, healthcare facilities, drainage, electricity-related concerns, and the improvement of essential civic amenities.',

      hi: 'उनके सार्वजनिक दायित्व भगवंतनगर के स्थानीय प्रशासन और क्षेत्र के विकास से जुड़े हैं। सड़क संपर्क, स्वच्छता, स्वास्थ्य सुविधाएँ, जल निकासी, बिजली से संबंधित समस्याएँ तथा आवश्यक नागरिक सुविधाओं में सुधार स्थानीय विकास के महत्वपूर्ण विषय हैं।',
    },

    {
      en: 'As a public representative, his profile emphasizes communication with citizens, attention to local issues, and efforts towards inclusive community development. The aim is to highlight the concerns and aspirations of Bhagwantnagar residents and the importance of responsive local governance.',

      hi: 'एक जनप्रतिनिधि के रूप में उनके परिचय में नागरिकों से संवाद, स्थानीय समस्याओं पर ध्यान और समावेशी सामुदायिक विकास के प्रयासों को प्रमुखता दी गई है। इसका उद्देश्य भगवंतनगर के निवासियों की आवश्यकताओं और आकांक्षाओं तथा उत्तरदायी स्थानीय प्रशासन के महत्व को सामने लाना है।',
    },
  ],

  coreValues: [
    {
      title: {
        en: 'Public Connect',
        hi: 'जनता से जुड़ाव',
      },

      description: {
        en: 'Encouraging direct communication with citizens and giving attention to local concerns and community needs.',

        hi: 'नागरिकों से सीधे संवाद, स्थानीय समस्याओं और समुदाय की आवश्यकताओं पर ध्यान देने को प्राथमिकता।',
      },
    },

    {
      title: {
        en: 'Local Development',
        hi: 'स्थानीय विकास',
      },

      description: {
        en: 'Highlighting essential civic priorities such as roads, sanitation, drainage, healthcare, and public amenities.',

        hi: 'सड़क, स्वच्छता, जल निकासी, स्वास्थ्य सेवाओं और जनसुविधाओं जैसी आवश्यक प्राथमिकताओं पर ध्यान।',
      },
    },

    {
      title: {
        en: 'Inclusive Community',
        hi: 'समावेशी समाज',
      },

      description: {
        en: 'Supporting a development-focused approach that recognizes the needs and aspirations of people across the community.',

        hi: 'समुदाय के सभी वर्गों की आवश्यकताओं और आकांक्षाओं को ध्यान में रखते हुए विकासोन्मुख दृष्टिकोण।',
      },
    },
  ],

  profileImage: '/images/hero/about.webp',
  portraitImage: '/images/hero/hero1.png',
};

