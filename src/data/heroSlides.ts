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
subtitle: {
en: 'Dedicated to Public Service, Committed to the Progress of Bhagwantnagar',
hi: 'जनसेवा के प्रति समर्पित, भगवंतनगर की प्रगति के लिए प्रतिबद्ध',
},
description: {
en: 'Working continuously, together with the citizens of Bhagwantnagar, for local development, better civic amenities and a brighter future for every citizen.',
hi: 'भगवंतनगर के नागरिकों के साथ मिलकर स्थानीय विकास, बेहतर नागरिक सुविधाओं और प्रत्येक नागरिक के उज्ज्वल भविष्य के लिए निरंतर प्रयासरत।',
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
