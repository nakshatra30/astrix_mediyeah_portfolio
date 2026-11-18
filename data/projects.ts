import type { Project } from "@/types/content";

export const PROJECTS: Project[] = [
  {
    id: "prj-nocturne",
    title: "Nocturne Skincare",
    slug: "nocturne-skincare",
    client: "Nocturne",
    category: "Branding",
    summary:
      "A nocturnal identity and e-commerce experience for a clinical skincare label.",
    description:
      "Nocturne needed to enter a crowded skincare market without looking like another pastel startup. We built a midnight-toned identity, a modular product system and a storefront that turns ingredient transparency into a premium ritual. Launch sold through the first production run in eleven days.",
    coverImage: "/images/projects/nocturne-skincare.webp",
    gallery: [
      "/images/projects/nocturne-gallery-1.webp",
      "/images/projects/nocturne-gallery-2.webp",
    ],
    videoUrl: null,
    videoThumbnail: "/images/projects/nocturne-skincare.webp",
    instagramReelUrl: null,
    results: [
      "+214% launch revenue vs. target",
      "3.4× conversion rate",
      "11-day first-run sellout",
    ],
    liveUrl: null,
    year: 2026,
    featured: true,
    order: 1,
    service: {
      title: "Branding & Graphic Design",
      slug: "branding-graphic-design",
    },
  },
  {
    id: "prj-helix",
    title: "Helix Finance",
    slug: "helix-finance",
    client: "Helix",
    category: "Web Development",
    summary:
      "A trust-first website and product narrative for a next-gen fintech platform.",
    description:
      "Helix had a powerful product and a website that undersold it. We rebuilt the story from the investor deck outward, designed a clear product narrative, and engineered a fast, accessible Next.js site with a reusable content model for the growth team.",
    coverImage: "/images/projects/helix-finance.webp",
    gallery: ["/images/projects/helix-gallery-1.webp"],
    videoUrl: null,
    videoThumbnail: "/images/projects/helix-finance.webp",
    instagramReelUrl: null,
    results: [
      "+87% qualified demo requests",
      "98 Lighthouse performance",
      "42% lower bounce rate",
    ],
    liveUrl: null,
    year: 2026,
    featured: true,
    order: 2,
    service: { title: "Website Development", slug: "website-development" },
  },
  {
    id: "prj-vantablack",
    title: "Vantablack Studio",
    slug: "vantablack-studio",
    client: "Vantablack",
    category: "Branding",
    summary:
      "An uncompromising identity for an architecture practice that builds in shadow.",
    description:
      "A monochrome identity system driven by light, negative space and structural rhythm. We paired a custom wordmark with a typographic grid and a portfolio site that lets the work do the talking.",
    coverImage: "/images/projects/vantablack-studio.webp",
    gallery: ["/images/projects/vantablack-gallery-1.webp"],
    videoUrl: null,
    videoThumbnail: "/images/projects/vantablack-studio.webp",
    instagramReelUrl: null,
    results: [
      "Featured in two design publications",
      "+63% inbound project enquiries",
    ],
    liveUrl: null,
    year: 2025,
    featured: true,
    order: 3,
    service: {
      title: "Branding & Graphic Design",
      slug: "branding-graphic-design",
    },
  },
  {
    id: "prj-orbit",
    title: "Orbit Fitness",
    slug: "orbit-fitness",
    client: "Orbit",
    category: "Digital Marketing",
    summary:
      "A performance engine that turned a local gym network into a national funnel.",
    description:
      "We consolidated eleven disconnected location campaigns into a single acquisition system with shared creative, geo-aware landing pages and a trial-to-member nurture sequence. Cost per trial dropped by more than half in six weeks.",
    coverImage: "/images/projects/orbit-fitness.webp",
    gallery: ["/images/projects/orbit-gallery-1.webp"],
    videoUrl: null,
    videoThumbnail: "/images/projects/orbit-fitness.webp",
    instagramReelUrl: null,
    results: [
      "-56% cost per trial",
      "+31% trial-to-member conversion",
      "11 locations unified",
    ],
    liveUrl: null,
    year: 2025,
    featured: true,
    order: 4,
    service: { title: "Digital Marketing", slug: "digital-marketing" },
  },
  {
    id: "prj-lumen",
    title: "Lumen Health",
    slug: "lumen-health",
    client: "Lumen Health",
    category: "SEO",
    summary:
      "A technical and editorial overhaul that put a health platform on page one.",
    description:
      "Lumen's content was strong but invisible. We rebuilt the information architecture, fixed rendering and Core Web Vitals, and produced a clinical editorial program targeting high-intent conditions. Organic sessions more than tripled within seven months.",
    coverImage: "/images/projects/lumen-health.webp",
    gallery: ["/images/projects/lumen-gallery-1.webp"],
    videoUrl: null,
    videoThumbnail: "/images/projects/lumen-health.webp",
    instagramReelUrl: null,
    results: [
      "+238% organic sessions",
      "41 page-one keywords",
      "2.1× organic conversions",
    ],
    liveUrl: null,
    year: 2025,
    featured: false,
    order: 5,
    service: { title: "SEO", slug: "seo" },
  },
  {
    id: "prj-kite",
    title: "Kite Coffee",
    slug: "kite-coffee",
    client: "Kite Coffee",
    category: "Social Media",
    summary:
      "A social-first content system for a specialty coffee brand with cult ambitions.",
    description:
      "We turned a quiet roastery into a daily destination with a content engine built around brewing rituals, staff personalities and limited drops. Community engagement grew 4.6× without paid amplification.",
    coverImage: "/images/projects/kite-coffee.webp",
    gallery: ["/images/projects/kite-gallery-1.webp"],
    videoUrl: null,
    videoThumbnail: "/images/projects/kite-coffee.webp",
    instagramReelUrl: null,
    results: ["4.6× engagement rate", "+19k community members", "3 sold-out drops"],
    liveUrl: null,
    year: 2026,
    featured: false,
    order: 6,
    service: { title: "Social Media Management", slug: "social-media-management" },
  },
];

export const PROJECT_CATEGORIES = Array.from(
  new Set(PROJECTS.map((project) => project.category)),
);

export function getProjectBySlug(slug: string) {
  return PROJECTS.find((project) => project.slug === slug) ?? null;
}

export function getFeaturedProjects(limit?: number) {
  const projects = PROJECTS.filter((project) => project.featured);
  return limit ? projects.slice(0, limit) : projects;
}

export function getRelatedProjects(project: Project, limit = 3) {
  const sameService = PROJECTS.filter(
    (item) =>
      item.slug !== project.slug &&
      item.service?.slug === project.service?.slug,
  );
  const others = PROJECTS.filter(
    (item) =>
      item.slug !== project.slug &&
      !sameService.some((related) => related.slug === item.slug),
  );
  return [...sameService, ...others].slice(0, limit);
}
