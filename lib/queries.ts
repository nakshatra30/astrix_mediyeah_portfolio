import { prisma } from "@/lib/prisma";
import {
  FALLBACK_PROJECTS,
  FALLBACK_SERVICES,
  FALLBACK_TESTIMONIALS,
} from "@/lib/fallback";
import type {
  PublicProject,
  PublicService,
  PublicTestimonial,
} from "@/types/content";

type ServiceRow = {
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

type ProjectRow = {
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

type TestimonialRow = {
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

function mapService(row: ServiceRow): PublicService {
  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    shortDescription: row.shortDescription,
    description: row.description,
    icon: row.icon,
    features: row.features,
    imageUrl: row.imageUrl,
    price: row.price,
    featured: row.featured,
    order: row.order,
  };
}

function mapProject(row: ProjectRow): PublicProject {
  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    client: row.client,
    category: row.category,
    summary: row.summary,
    description: row.description,
    imageUrl: row.imageUrl,
    gallery: row.gallery,
    results: row.results,
    liveUrl: row.liveUrl,
    year: row.year,
    featured: row.featured,
    order: row.order,
    service: row.service ?? null,
  };
}

function mapTestimonial(row: TestimonialRow): PublicTestimonial {
  return {
    id: row.id,
    clientName: row.clientName,
    clientRole: row.clientRole,
    company: row.company,
    content: row.content,
    rating: row.rating,
    avatarUrl: row.avatarUrl,
    featured: row.featured,
    order: row.order,
    project: row.project ?? null,
  };
}

export async function getPublicServices(limit?: number): Promise<PublicService[]> {
  try {
    const rows = await prisma.service.findMany({
      where: { published: true },
      orderBy: [{ order: "asc" }, { createdAt: "asc" }],
      ...(limit ? { take: limit } : {}),
    });
    return rows.map(mapService);
  } catch (error) {
    console.error("[queries] services fallback", error);
    return limit ? FALLBACK_SERVICES.slice(0, limit) : FALLBACK_SERVICES;
  }
}

export async function getPublicServiceBySlug(
  slug: string,
): Promise<PublicService | null> {
  try {
    const row = await prisma.service.findFirst({
      where: { slug, published: true },
    });
    return row ? mapService(row) : null;
  } catch (error) {
    console.error("[queries] service fallback", error);
    return FALLBACK_SERVICES.find((service) => service.slug === slug) ?? null;
  }
}

type ProjectFilters = {
  limit?: number;
  category?: string;
  featured?: boolean;
};

export async function getPublicProjects(
  filters: ProjectFilters = {},
): Promise<PublicProject[]> {
  const { limit, category, featured } = filters;
  try {
    const rows = await prisma.project.findMany({
      where: {
        published: true,
        ...(category ? { category } : {}),
        ...(featured ? { featured: true } : {}),
      },
      orderBy: [{ featured: "desc" }, { order: "asc" }, { createdAt: "desc" }],
      include: { service: { select: { title: true, slug: true } } },
      ...(limit ? { take: limit } : {}),
    });
    return rows.map(mapProject);
  } catch (error) {
    console.error("[queries] projects fallback", error);
    let fallback = FALLBACK_PROJECTS;
    if (category) fallback = fallback.filter((p) => p.category === category);
    if (featured) fallback = fallback.filter((p) => p.featured);
    return limit ? fallback.slice(0, limit) : fallback;
  }
}

export async function getPublicProjectBySlug(
  slug: string,
): Promise<PublicProject | null> {
  try {
    const row = await prisma.project.findFirst({
      where: { slug, published: true },
      include: { service: { select: { title: true, slug: true } } },
    });
    return row ? mapProject(row) : null;
  } catch (error) {
    console.error("[queries] project fallback", error);
    return FALLBACK_PROJECTS.find((project) => project.slug === slug) ?? null;
  }
}

export async function getPublicProjectCategories(): Promise<string[]> {
  try {
    const rows = await prisma.project.findMany({
      where: { published: true },
      select: { category: true },
      distinct: ["category"],
      orderBy: { category: "asc" },
    });
    return rows.map((row) => row.category);
  } catch {
    return Array.from(new Set(FALLBACK_PROJECTS.map((p) => p.category)));
  }
}

export async function getPublishedTestimonials(
  limit?: number,
): Promise<PublicTestimonial[]> {
  try {
    const rows = await prisma.testimonial.findMany({
      where: { published: true },
      orderBy: [{ featured: "desc" }, { order: "asc" }, { createdAt: "desc" }],
      include: { project: { select: { title: true, slug: true } } },
      ...(limit ? { take: limit } : {}),
    });
    return rows.map(mapTestimonial);
  } catch (error) {
    console.error("[queries] testimonials fallback", error);
    return limit ? FALLBACK_TESTIMONIALS.slice(0, limit) : FALLBACK_TESTIMONIALS;
  }
}

export async function getRelatedProjects(
  serviceId: string | null,
  currentId: string,
  limit = 3,
): Promise<PublicProject[]> {
  if (!serviceId) return [];
  try {
    const rows = await prisma.project.findMany({
      where: {
        published: true,
        id: { not: currentId },
        serviceId,
      },
      include: { service: { select: { title: true, slug: true } } },
      take: limit,
      orderBy: { order: "asc" },
    });
    return rows.map(mapProject);
  } catch {
    return [];
  }
}
