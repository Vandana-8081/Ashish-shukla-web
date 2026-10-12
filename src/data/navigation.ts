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
    id: 'ideals',
    name: {
      en: 'Our Ideals',
      hi: 'हमारे आदर्श',
    },
    path: '/ideals',
  },
  {
    id: 'public-life',
    name: {
      en: 'Public Life',
      hi: 'सार्वजनिक जीवन',
    },
    path: '/public-life',
    hasDropdown: true,
    children: [
      {
        name: { en: 'Jan Sunwai & Redressal', hi: 'जनसुनवाई एवं संवाद' },
        path: '/public-life#jan-sunwai',
        
      },
      {
        name: { en: 'Community Engagement', hi: 'सामुदायिक सहभागिता' },
        path: '/public-life#community',
      
      },
      {
        name: { en: 'Field Inspections', hi: 'क्षेत्रीय निरीक्षण' },
        path: '/public-life#field-visits',
      },
    ],
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
    id: 'updates',
    name: {
      en: 'Updates',
      hi: 'अपडेट्स',
    },
    path: '/updates',
  },
  {
    id: 'blog',
    name: { en: 'Blog', hi: 'ब्लॉग' },
    path: '/blog',
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
