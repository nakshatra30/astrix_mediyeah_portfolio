import type { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";
import { absoluteUrl } from "@/lib/utils";

export const dynamic = "force-dynamic";

const STATIC_ROUTES: {
  path: string;
  priority: number;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
}[] = [
  { path: "/", priority: 1, changeFrequency: "weekly" },
  { path: "/about", priority: 0.8, changeFrequency: "monthly" },
  { path: "/services", priority: 0.9, changeFrequency: "monthly" },
  { path: "/projects", priority: 0.9, changeFrequency: "weekly" },
  { path: "/process", priority: 0.7, changeFrequency: "monthly" },
  { path: "/testimonials", priority: 0.7, changeFrequency: "monthly" },
  { path: "/contact", priority: 0.7, changeFrequency: "yearly" },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  let services: { slug: string; updatedAt: Date }[] = [];
  let projects: { slug: string; updatedAt: Date }[] = [];

  try {
    [services, projects] = await Promise.all([
      prisma.service.findMany({
        where: { published: true },
        select: { slug: true, updatedAt: true },
      }),
      prisma.project.findMany({
        where: { published: true },
        select: { slug: true, updatedAt: true },
      }),
    ]);
  } catch {
    services = [];
    projects = [];
  }

  return [
    ...STATIC_ROUTES.map((route) => ({
      url: absoluteUrl(route.path),
      lastModified: now,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    })),
    ...services.map((service) => ({
      url: absoluteUrl(`/services/${service.slug}`),
      lastModified: service.updatedAt,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...projects.map((project) => ({
      url: absoluteUrl(`/projects/${project.slug}`),
      lastModified: project.updatedAt,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
