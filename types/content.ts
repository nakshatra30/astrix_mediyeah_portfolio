export type Service = {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  description: string;
  icon: string;
  features: string[];
  image: string | null;
  price: string | null;
  featured: boolean;
  order: number;
};

export type Project = {
  id: string;
  title: string;
  slug: string;
  client: string;
  category: string;
  summary: string;
  description: string;
  coverImage: string;
  gallery: string[];
  videoUrl: string | null;
  videoThumbnail: string | null;
  instagramReelUrl: string | null;
  results: string[];
  liveUrl: string | null;
  year: number | null;
  featured: boolean;
  order: number;
  service: { title: string; slug: string } | null;
};

export type Testimonial = {
  id: string;
  clientName: string;
  clientRole: string;
  company: string | null;
  content: string;
  rating: number;
  avatarUrl: string | null;
  featured: boolean;
  order: number;
  project: { title: string; slug: string } | null;
};
