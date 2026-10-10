import type { HeroSlide } from '@/types';

export const heroSlides: HeroSlide[] = [
{
id: 'hero-1',
image: '/images/hero/home3.png',
eyebrow: {
en: 'OFFICIAL PROFILE',
hi: 'आधिकारिक परिचय',
},
heading: {
en: 'ASHISH SHUKLA',
hi: 'आशीष शुक्ला',
},
description: {
en: 'Connected with the people of Bhagwantnagar, committed to public service and local development.',
hi: 'भगवंतनगर की जनता से जुड़ाव, जनसेवा और स्थानीय विकास के प्रति प्रतिबद्धता।',
},
primaryCta: {
label: {
en: 'Explore Public Work',
hi: 'जनसेवा के कार्य देखें',
},
path: '/public-life',
},
secondaryCta: {
label: {
en: 'View Journey',
hi: 'राजनीतिक यात्रा देखें',
},
path: '/about#journey',
},
},
{
id: 'hero-3',
image: '/images/hero/ashish1.png',
eyebrow: {
en: 'PUBLIC CONNECT',
hi: 'जनसंवाद एवं जनसेवा',
},
heading: {
en: 'Your Voice, Our Priority',
hi: 'आपकी बात, हमारी प्राथमिकता',
},
description: {
en: 'Listening to citizens and working towards solutions to public concerns.',
hi: 'जनता की समस्याओं को सुनना और उनके समाधान की दिशा में प्रयास करना।',
},
primaryCta: {
label: {
en: 'Public Hearings',
hi: 'जनसुनवाई',
},
path: '/public-life#jan-sunwai',
},
secondaryCta: {
label: {
en: 'Contact Us',
hi: 'संपर्क करें',
},
path: '/contact',
},
},

];
