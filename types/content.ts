export type PublicService = {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  description: string;
  icon: string;
  features: string[];
  imageUrl: string | null;
  price: string | null;
  featured: boolean;
  order: number;
};

export type PublicProject = {
  id: string;
  title: string;
  slug: string;
  client: string;
  category: string;
  summary: string;
  description: string;
  imageUrl: string | null;
  gallery: string[];
  results: string[];
  liveUrl: string | null;
  year: number | null;
  featured: boolean;
  order: number;
  service: { title: string; slug: string } | null;
};

export type PublicTestimonial = {
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
