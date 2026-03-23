export interface NavLink {
  label: string;
  href: string;
}

export interface Brand {
  name: string;
  tagline: string;
  phone: string;
  email: string;
  address: string;
  suburb: string;
  hours: string[];
  hoursSummary: string;
  established: number;
  dogsGroomed: string;
  googleRating: number;
  reviewCount: number;
  googleMapsUrl: string;
  socials: {
    instagram: string;
    facebook: string;
    tiktok: string;
  };
}

export interface Service {
  id: string;
  name: string;
  tag: string;
  description: string;
  price: string;
  duration: string;
  image: string;
  popular?: boolean;
}

export interface AddOnService {
  id: string;
  name: string;
  price: string;
  description: string;
}

export interface Package {
  id: string;
  name: string;
  price: string;
  interval?: string;
  description: string;
  features: string[];
  popular?: boolean;
  badge?: string;
}

export interface HowItWorksStep {
  number: number;
  title: string;
  description: string;
  icon: string;
}

export interface GalleryItem {
  id: string;
  label: string;
  description: string;
  image: string;
  category: string;
  beforeImage?: string;
  afterImage?: string;
}

export interface Review {
  id: string;
  name: string;
  text: string;
  stars: number;
  dogName?: string;
  breed?: string;
  service?: string;
  avatar?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  specialties: string[];
}

export interface FAQ {
  question: string;
  answer: string;
  category: string;
}

export interface BlogPostMeta {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  image: string;
  readTime: string;
  category: string;
}
