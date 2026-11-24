import type { NavItem } from '@/types';

export const navigationItems: NavItem[] = [
  {
    id: 'home',
    name: {
      en: 'Home',
      hi: 'होम',
    },
    path: '',
  },
  {
    id: 'about',
    name: {
      en: 'About',
      hi: 'परिचय',
    },
    path: '/about',
    hasDropdown: true,
    children: [
      {
        name: { en: 'Biography', hi: 'जीवन परिचय' },
        path: '/about#biography',
        
      },
      {
        name: { en: 'Life Journey', hi: 'जीवन यात्रा' },
        path: '/journey',

      },
      // { name: { en: 'Political Journey', hi: 'राजनीतिक यात्रा' }, path: '/political-journey' },
    ],
  },
  {
    id: 'public-life',
    name: {
      en: 'Public Service & Vision',
      hi: 'जनसेवा एवं विज़न',
    },
    path: '/public-life',
    hasDropdown: true,
    children: [
      { name: { en: 'Public Service', hi: 'जनसेवा' }, path: '/public-life#public-service' },
      { name: { en: 'Bhagwant Nagar Vision', hi: 'भगवंतनगर का विज़न' }, path: '/public-life#vision' },
      { name: { en: 'E-Card', hi: 'ई-कार्ड' }, path: '/e-card' },
      
    ],
  },
 
  {
    id: 'development',
    name: { en: 'Development & Ideas', hi: 'विकास एवं विचार' },
    path: '/development',
    hasDropdown: true,
    children: [
      { name: { en: 'Ideas & Articles', hi: 'विचार एवं लेख' }, path: '/development/ideas' },
      { name: { en: 'Development Journey', hi: 'विकास यात्रा' }, path: '/development/journey' },
    ],
  },
  {
    id: 'ideals',
    name: {
      en: 'Our Ideals',
      hi: 'हमारे आदर्श',
    },
    path: '/ideals',
  },
   {
    id: 'media',
    name: {
      en: 'Media',
      hi: 'मीडिया',
    },
    path: '/media',
    hasDropdown: true,
    children: [
      {
        name: { en: 'Photographs', hi: 'तस्वीरें' },
        path: '/media#photos',
      },
      {
        name: { en: 'Videos', hi: 'वीडियो' },
        path: '/media#videos',
      },
    ],
  },
  {
    id: 'contact',
    name: { en: 'Contact', hi: 'संपर्क' },
    path: '/contact',
  },
];
