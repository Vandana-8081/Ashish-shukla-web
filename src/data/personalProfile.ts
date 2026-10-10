import type { LocalizedString } from '@/types';

export interface PersonalProfileItem {
  id: string;
  label: LocalizedString;
  value: LocalizedString;
  note?: LocalizedString;
}

// Set to false to temporarily hide the date of birth until it is verified.
export const showDateOfBirth = true;

export const personalProfile: PersonalProfileItem[] = [
  {
    id: 'dateOfBirth',
    label: { en: 'Date of Birth', hi: 'जन्मतिथि' },
    value: { en: '26 February 1980', hi: '26 फ़रवरी 1980' },
  },
  {
    id: 'education',
    label: { en: 'Education', hi: 'शिक्षा' },
    value: { en: 'Intermediate', hi: 'इंटरमीडिएट' },
    note: {
      en: 'R. R. B. N. Inter College, Bhagwant Nagar, Unnao',
      hi: 'आर. आर. बी. एन. इंटर कॉलेज, भगवंत नगर, उन्नाव',
    },
  },
  {
    id: 'profession',
    label: { en: 'Profession', hi: 'व्यवसाय' },
    value: { en: 'Agriculture', hi: 'कृषि' },
  },
  {
    id: 'currentPosition',
    label: { en: 'Party', hi: 'पार्टी' },
    value: {
      en: 'Bharatiya Janata Party',
      hi: 'भारतीय जनता पार्टी',
    },
  },
];
