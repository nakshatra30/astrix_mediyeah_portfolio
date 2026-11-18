import type { Testimonial } from "@/types/content";

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "tst-1",
    clientName: "Ananya Rao",
    clientRole: "Founder",
    company: "Nocturne Skincare",
    content:
      "Astrix didn't just design a brand — they found the version of it we couldn't articulate ourselves. The launch outperformed our most optimistic model by a wide margin.",
    rating: 5,
    avatarUrl: null,
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
    avatarUrl: null,
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
    avatarUrl: null,
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
    avatarUrl: null,
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
    avatarUrl: null,
    featured: true,
    order: 5,
    project: { title: "Lumen Health", slug: "lumen-health" },
  },
];
