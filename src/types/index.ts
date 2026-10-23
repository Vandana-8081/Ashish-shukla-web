export type Locale = 'en' | 'hi';
export type Language = Locale;

export interface LocalizedString {
  en: string;
  hi: string;
}

export interface NavItem {
  id: string;
  name: LocalizedString;
  path: string; // e.g. '/', '/about'
  hasDropdown?: boolean;
  children?: {
    name: LocalizedString;
    path: string; // e.g. '/about#biography'
    description?: LocalizedString;
  }[];
}

export interface SocialLink {
  platform: 'facebook' | 'instagram' | 'x';
  label: string;
  username: string;
  url: string;
}

export interface HeroSlide {
  id: string;
  image: string;
  /** Poster layout: the image is a full-width background with the text and buttons laid over it. */
  poster?: boolean;
  /** Optional portrait poster used on phones and tablets, with the text laid over it. */
  mobileImage?: string;
  eyebrow: LocalizedString;
  heading: LocalizedString;
  subtitle?: LocalizedString;
  description: LocalizedString;
  primaryCta: {
    label: LocalizedString;
    path: string;
  };
  secondaryCta: {
    label: LocalizedString;
    path: string;
  };
}

export interface TimelinePhase {
  id: string;
  phase: LocalizedString;
  period?: LocalizedString;
  title: LocalizedString;
  subtitle?: LocalizedString;
  description: LocalizedString;
  highlights: LocalizedString[];
  image: string;
}

export interface PublicLifeItem {
  id: string;
  title: LocalizedString;
  description: LocalizedString;
  image: string;
  details?: LocalizedString[];
}

export interface DevelopmentPriority {
  id: string;
  title: LocalizedString;
  slug: string;
  description: LocalizedString;
  keyInitiatives: LocalizedString[];
  image: string;
  tag: LocalizedString;
}

export interface Update {
  slug: string;
  image: string;
  categoryEn: string;
  categoryHi: string;
  dateEn: string;
  dateHi: string;
  titleEn: string;
  titleHi: string;
  descriptionEn: string;
  descriptionHi: string;
  contentEn?: string[];
  contentHi?: string[];
  location?: LocalizedString;
  galleryImages?: string[];
}

export interface PhotoItem {
  id: string;
  image: string;
  caption: LocalizedString;
  category: LocalizedString;
}

export interface VideoItem {
  id: string;
  videoPath?: string;
  title: LocalizedString;
  duration: string;
  date: LocalizedString;
  description: LocalizedString;
  videoUrl?: string;
}
