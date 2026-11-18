import type {
  PublicProject,
  PublicService,
  PublicTestimonial,
} from "@/types/content";

export const FALLBACK_SERVICES: PublicService[] = [
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
    imageUrl: null,
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
    imageUrl: null,
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
      "Headless CMS integration",
      "Performance & accessibility QA",
      "Analytics and SEO foundations",
    ],
    imageUrl: null,
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
    imageUrl: null,
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
    imageUrl: null,
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
    imageUrl: null,
    price: "From $2,000 / month",
    featured: false,
    order: 6,
  },
];

export const FALLBACK_PROJECTS: PublicProject[] = [
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
    imageUrl:
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?auto=format&fit=crop&w=1200&q=80",
    ],
    results: ["+214% launch revenue vs. target", "3.4× conversion rate", "11-day first-run sellout"],
    liveUrl: null,
    year: 2026,
    featured: true,
    order: 1,
    service: { title: "Branding & Graphic Design", slug: "branding-graphic-design" },
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
      "Helix had a powerful product and a website that undersold it. We rebuilt the story from the investor deck outward, designed a clear product narrative, and engineered a Next.js site with a 98 Lighthouse performance score and a reusable CMS for the growth team.",
    imageUrl:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1600&q=80",
    gallery: [],
    results: ["+87% qualified demo requests", "98 Lighthouse performance", "42% lower bounce rate"],
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
    imageUrl:
      "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=1600&q=80",
    gallery: [],
    results: ["Featured in two design publications", "+63% inbound project enquiries"],
    liveUrl: null,
    year: 2025,
    featured: true,
    order: 3,
    service: { title: "Branding & Graphic Design", slug: "branding-graphic-design" },
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
    imageUrl:
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1600&q=80",
    gallery: [],
    results: ["-56% cost per trial", "+31% trial-to-member conversion", "11 locations unified"],
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
    imageUrl:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1600&q=80",
    gallery: [],
    results: ["+238% organic sessions", "41 page-one keywords", "2.1× organic conversions"],
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
    imageUrl:
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1600&q=80",
    gallery: [],
    results: ["4.6× engagement rate", "+19k community members", "3 sold-out drops"],
    liveUrl: null,
    year: 2026,
    featured: false,
    order: 6,
    service: { title: "Social Media Management", slug: "social-media-management" },
  },
];

export const FALLBACK_TESTIMONIALS: PublicTestimonial[] = [
  {
    id: "tst-1",
    clientName: "Ananya Rao",
    clientRole: "Founder",
    company: "Nocturne Skincare",
    content:
      "Astrix didn't just design a brand — they found the version of it we couldn't articulate ourselves. The launch outperformed our most optimistic model by a wide margin.",
    rating: 5,
    avatarUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",
    featured: true,
    order: 1,
    project: { title: "Nocturne Skincare", slug: "nocturne-skincare" },
  },
  {
    id: "tst-2",
    clientName: "Marcus Chen",
    clientRole: "Head of Growth",
    company: "Helix Finance",
    content:
      "The clearest agency process we've worked with. Strategy, design and engineering were genuinely one team, and the site shipped faster than our internal estimate.",
    rating: 5,
    avatarUrl:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
    featured: true,
    order: 2,
    project: { title: "Helix Finance", slug: "helix-finance" },
  },
  {
    id: "tst-3",
    clientName: "Sofia Marques",
    clientRole: "Creative Director",
    company: "Vantablack Studio",
    content:
      "Rare to find a team that respects restraint. They pushed our identity further than we expected while keeping it unmistakably ours.",
    rating: 5,
    avatarUrl:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    featured: true,
    order: 3,
    project: { title: "Vantablack Studio", slug: "vantablack-studio" },
  },
  {
    id: "tst-4",
    clientName: "Dev Malhotra",
    clientRole: "Co-founder",
    company: "Orbit Fitness",
    content:
      "They rebuilt our acquisition system in weeks and gave us reporting we actually use. Cost per trial dropped by more than half — that changed our expansion plan.",
    rating: 5,
    avatarUrl:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    featured: true,
    order: 4,
    project: { title: "Orbit Fitness", slug: "orbit-fitness" },
  },
  {
    id: "tst-5",
    clientName: "Priya Nair",
    clientRole: "Marketing Lead",
    company: "Lumen Health",
    content:
      "Transparent, senior and relentlessly practical. The SEO programme compounded exactly as promised, and we finally understand what is moving the needle.",
    rating: 5,
    avatarUrl:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80",
    featured: true,
    order: 5,
    project: { title: "Lumen Health", slug: "lumen-health" },
  },
];
