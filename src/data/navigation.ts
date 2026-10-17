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
        path: '/about#journey',

      },
    ],
  },
  {
    id: 'public-life',
    name: {
      en: 'Public Life',
      hi: 'सार्वजनिक जीवन',
    },
    path: '/public-life',
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
        name: { en: 'Photo', hi: 'चित्र' },
        path: '/media#photos',
       
      },
      {
        name: { en: 'Video', hi: 'वीडियो' },
        path: '/media#videos',
       
      },
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
    id: 'contact',
    name: {
      en: 'Contact',
      hi: 'संपर्क',
    },
    path: '/contact',
  },
];
