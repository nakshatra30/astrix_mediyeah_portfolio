import type { Service } from "@/types/content";

export const SERVICES: Service[] = [
  {
    id: "svc-marketing",
    title: "Digital Marketing",
    slug: "digital-marketing",
    shortDescription:
      "Full-funnel campaigns that turn attention into pipeline, not vanity metrics.",
    description:
      "We build demand systems around your revenue model — paid media, landing pages, lifecycle email and conversion experiments working as one engine. Every campaign is instrumented, every rupee accounted for, and every insight fed back into the next sprint.",
    icon: "megaphone",
    features: [
      "Paid search & social campaigns",
      "Conversion-focused landing pages",
      "Lifecycle email & automation",
      "Analytics and attribution setup",
      "Monthly growth experiments",
    ],
    image: "/images/projects/orbit-fitness.webp",
    price: "From $3,200 / month",
    featured: true,
    order: 1,
  },
  {
    id: "svc-social",
    title: "Social Media Management",
    slug: "social-media-management",
    shortDescription:
      "Editorial systems and community craft that make your brand worth following.",
    description:
      "From content pillars to daily publishing, we run social as a brand-building channel rather than a posting chore. Expect sharp creative, consistent cadence, community management and reporting that connects engagement to business outcomes.",
    icon: "share",
    features: [
      "Channel strategy & content pillars",
      "Monthly content calendars",
      "Design & short-form video",
      "Community management",
      "Performance reporting",
    ],
    image: "/images/projects/kite-coffee.webp",
    price: "From $1,800 / month",
    featured: true,
    order: 2,
  },
  {
    id: "svc-web",
    title: "Website Development",
    slug: "website-development",
    shortDescription:
      "Fast, accessible, conversion-ready websites built on modern foundations.",
    description:
      "We design and engineer marketing sites, e-commerce experiences and product surfaces that load fast, rank well and feel effortless. Built with Next.js, typed end to end, tested on real devices and handed over with documentation your team can actually use.",
    icon: "code",
    features: [
      "UX & UI design",
      "Next.js / React engineering",
      "Content architecture",
      "Performance & accessibility QA",
      "Analytics and SEO foundations",
    ],
    image: "/images/projects/helix-finance.webp",
    price: "From $7,500 / project",
    featured: true,
    order: 3,
  },
  {
    id: "svc-branding",
    title: "Branding & Graphic Design",
    slug: "branding-graphic-design",
    shortDescription:
      "Identity systems with a point of view — not just a logo and a colour palette.",
    description:
      "Positioning, naming, visual identity and a practical design system your team can ship with. We pressure-test every decision against your market, then package it into guidelines that keep the brand coherent everywhere it shows up.",
    icon: "palette",
    features: [
      "Brand strategy & positioning",
      "Visual identity systems",
      "Typography & colour direction",
      "Collateral and packaging",
      "Brand guidelines",
    ],
    image: "/images/projects/nocturne-skincare.webp",
    price: "From $5,000 / project",
    featured: true,
    order: 4,
  },
  {
    id: "svc-seo",
    title: "SEO",
    slug: "seo",
    shortDescription:
      "Technical excellence and content authority that compound month after month.",
    description:
      "We fix the foundations first — crawlability, Core Web Vitals, architecture — then build topical authority with content your buyers actually search for. Transparent reporting, realistic timelines and no mystery retainers.",
    icon: "search",
    features: [
      "Technical SEO audits",
      "Keyword & intent mapping",
      "On-page optimisation",
      "Content strategy & briefs",
      "Authority building",
    ],
    image: "/images/projects/lumen-health.webp",
    price: "From $2,400 / month",
    featured: false,
    order: 5,
  },
  {
    id: "svc-content",
    title: "Content Creation",
    slug: "content-creation",
    shortDescription:
      "Words, visuals and motion that carry your brand's voice with precision.",
    description:
      "A senior editorial and creative team for launch films, product photography direction, copywriting and long-form content. One consistent voice across every surface, produced on a cadence your channels can sustain.",
    icon: "pen",
    features: [
      "Copywriting & messaging",
      "Art direction",
      "Short-form video & motion",
      "Product & lifestyle photography",
      "Editorial content programs",
    ],
    image: "/images/projects/vantablack-studio.webp",
    price: "From $2,000 / month",
    featured: false,
    order: 6,
  },
];

export function getServiceBySlug(slug: string) {
  return SERVICES.find((service) => service.slug === slug) ?? null;
}
