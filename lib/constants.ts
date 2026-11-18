export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Portfolio", href: "/projects" },
  { label: "Process", href: "/process" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "Contact", href: "/contact" },
];

export const SERVICE_OPTIONS = [
  "Digital Marketing",
  "Social Media Management",
  "Website Development",
  "Branding & Graphic Design",
  "SEO",
  "Content Creation",
  "Something else",
];

export const BUDGET_OPTIONS = [
  "Under $2,500",
  "$2,500 – $5,000",
  "$5,000 – $10,000",
  "$10,000 – $25,000",
  "$25,000+",
  "Not sure yet",
];

export const ENQUIRY_STATUSES = [
  "NEW",
  "IN_PROGRESS",
  "RESPONDED",
  "CLOSED",
] as const;

export const PROJECT_CATEGORIES = [
  "Branding",
  "Web Development",
  "Digital Marketing",
  "Social Media",
  "SEO",
  "Content",
];

export const PROCESS_STEPS = [
  {
    number: "01",
    title: "Discover",
    description:
      "We interrogate the business, the market and the customer. Stakeholder interviews, analytics review and competitive teardown — no assumptions survive this phase.",
    deliverables: ["Discovery workshop", "Market & audience research", "Success metrics"],
  },
  {
    number: "02",
    title: "Define",
    description:
      "A clear strategy before a single pixel moves: positioning, messaging hierarchy, scope and the metrics that will define whether this worked.",
    deliverables: ["Positioning & messaging", "Information architecture", "Project roadmap"],
  },
  {
    number: "03",
    title: "Design",
    description:
      "High-fidelity design systems, not static comps. Every screen is pressure-tested against real content and handed over with the rules to scale it.",
    deliverables: ["Visual direction", "UI design system", "Prototype & testing"],
  },
  {
    number: "04",
    title: "Build",
    description:
      "Senior engineers translate design into fast, accessible, production-grade code — with weekly previews and no late-stage surprises.",
    deliverables: ["Front-end engineering", "CMS & integrations", "QA on real devices"],
  },
  {
    number: "05",
    title: "Launch",
    description:
      "Analytics, redirects, performance and accessibility verified before go-live. We stay on call through the launch window and beyond.",
    deliverables: ["Launch checklist", "Analytics & tracking", "Team handover"],
  },
  {
    number: "06",
    title: "Grow",
    description:
      "Post-launch, we measure honestly and iterate deliberately. Experiments, content and campaigns compound what the launch started.",
    deliverables: ["Monthly reporting", "Growth experiments", "Ongoing optimisation"],
  },
];
