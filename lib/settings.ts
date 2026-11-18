import { cache } from "react";
import { prisma } from "@/lib/prisma";
import type { SettingDefinition } from "@/types";

export const SETTING_DEFINITIONS: SettingDefinition[] = [
  {
    key: "site.name",
    label: "Site name",
    group: "general",
    type: "text",
    defaultValue: "Astrix Mediyeah",
  },
  {
    key: "site.tagline",
    label: "Tagline",
    group: "general",
    type: "text",
    defaultValue: "Premium digital experiences, engineered for growth.",
  },
  {
    key: "site.description",
    label: "Site description",
    group: "general",
    type: "textarea",
    defaultValue:
      "Astrix Mediyeah is a premium digital agency building brands, websites and growth systems for ambitious companies.",
  },
  {
    key: "hero.badge",
    label: "Hero badge",
    group: "hero",
    type: "text",
    defaultValue: "Now booking Q1 2027 partnerships",
  },
  {
    key: "hero.title",
    label: "Hero headline",
    group: "hero",
    type: "text",
    defaultValue: "We design digital gravity",
  },
  {
    key: "hero.highlight",
    label: "Hero highlighted word",
    group: "hero",
    type: "text",
    defaultValue: "for brands that refuse to blend in.",
  },
  {
    key: "hero.description",
    label: "Hero description",
    group: "hero",
    type: "textarea",
    defaultValue:
      "Strategy, design and engineering fused into one senior team. We build brands, websites and growth systems that make your market stop scrolling.",
  },
  {
    key: "hero.primaryCta",
    label: "Primary CTA label",
    group: "hero",
    type: "text",
    defaultValue: "Start a project",
  },
  {
    key: "hero.secondaryCta",
    label: "Secondary CTA label",
    group: "hero",
    type: "text",
    defaultValue: "Explore our work",
  },
  {
    key: "stats.projects",
    label: "Projects delivered",
    group: "stats",
    type: "text",
    defaultValue: "180",
  },
  {
    key: "stats.clients",
    label: "Happy clients",
    group: "stats",
    type: "text",
    defaultValue: "64",
  },
  {
    key: "stats.experience",
    label: "Years of craft",
    group: "stats",
    type: "text",
    defaultValue: "9",
  },
  {
    key: "stats.satisfaction",
    label: "Client satisfaction (%)",
    group: "stats",
    type: "text",
    defaultValue: "98",
  },
  {
    key: "about.title",
    label: "About heading",
    group: "about",
    type: "text",
    defaultValue: "A studio built for the next era of brands",
  },
  {
    key: "about.story",
    label: "About story",
    group: "about",
    type: "textarea",
    defaultValue:
      "Astrix Mediyeah started with a simple belief: ambitious brands deserve more than template thinking. Today we are a tight, senior-led studio blending brand strategy, design, engineering and performance marketing under one roof. No handoffs, no diluted ideas, no agency theatre — just a team obsessed with the outcome.",
  },
  {
    key: "about.mission",
    label: "Mission",
    group: "about",
    type: "textarea",
    defaultValue:
      "To give ambitious teams the design and growth firepower usually reserved for enterprise budgets — delivered with speed, clarity and zero ego.",
  },
  {
    key: "about.vision",
    label: "Vision",
    group: "about",
    type: "textarea",
    defaultValue:
      "A web where independent brands can compete with anyone on craft, clarity and customer experience.",
  },
  {
    key: "process.title",
    label: "Process heading",
    group: "process",
    type: "text",
    defaultValue: "A process with no black boxes",
  },
  {
    key: "process.subtitle",
    label: "Process description",
    group: "process",
    type: "textarea",
    defaultValue:
      "Every engagement runs on the same rhythm: understand deeply, decide clearly, build beautifully, measure honestly.",
  },
  {
    key: "contact.email",
    label: "Contact email",
    group: "contact",
    type: "email",
    defaultValue: "hello@astrixmediyeah.com",
  },
  {
    key: "contact.phone",
    label: "Contact phone",
    group: "contact",
    type: "tel",
    defaultValue: "+91 98765 43210",
  },
  {
    key: "contact.address",
    label: "Studio address",
    group: "contact",
    type: "textarea",
    defaultValue: "Remote-first studio · Bengaluru, India",
  },
  {
    key: "contact.hours",
    label: "Working hours",
    group: "contact",
    type: "text",
    defaultValue: "Mon–Fri · 10:00–19:00 IST",
  },
  {
    key: "social.instagram",
    label: "Instagram URL",
    group: "social",
    type: "url",
    defaultValue: "https://instagram.com",
  },
  {
    key: "social.linkedin",
    label: "LinkedIn URL",
    group: "social",
    type: "url",
    defaultValue: "https://linkedin.com",
  },
  {
    key: "social.twitter",
    label: "X / Twitter URL",
    group: "social",
    type: "url",
    defaultValue: "https://x.com",
  },
  {
    key: "social.behance",
    label: "Behance URL",
    group: "social",
    type: "url",
    defaultValue: "https://behance.net",
  },
  {
    key: "seo.title",
    label: "Default meta title",
    group: "seo",
    type: "text",
    defaultValue: "Astrix Mediyeah — Premium Digital Agency",
  },
  {
    key: "seo.description",
    label: "Default meta description",
    group: "seo",
    type: "textarea",
    defaultValue:
      "Astrix Mediyeah is a premium digital agency delivering branding, web development, SEO, social media and content for ambitious brands.",
  },
  {
    key: "seo.keywords",
    label: "Meta keywords",
    group: "seo",
    type: "text",
    defaultValue:
      "digital agency, branding, web development, SEO, social media management, content creation",
  },
  {
    key: "footer.note",
    label: "Footer note",
    group: "general",
    type: "text",
    defaultValue: "Built with intent. Measured by impact.",
  },
];

export const DEFAULT_SETTINGS: Record<string, string> = Object.fromEntries(
  SETTING_DEFINITIONS.map((setting) => [setting.key, setting.defaultValue]),
);

export const SETTING_GROUPS = Array.from(
  new Set(SETTING_DEFINITIONS.map((setting) => setting.group)),
);

export function definitionsForGroup(group: string) {
  return SETTING_DEFINITIONS.filter((setting) => setting.group === group);
}

export const getSiteSettings = cache(async (): Promise<Record<string, string>> => {
  try {
    const rows = await prisma.siteSetting.findMany();
    const stored = Object.fromEntries(rows.map((row) => [row.key, row.value]));
    return { ...DEFAULT_SETTINGS, ...stored };
  } catch (error) {
    console.error("[settings] falling back to defaults", error);
    return { ...DEFAULT_SETTINGS };
  }
});

export async function ensureSettings() {
  const existing = await prisma.siteSetting.findMany({
    select: { key: true },
  });
  const existingKeys = new Set(existing.map((row) => row.key));
  const missing = SETTING_DEFINITIONS.filter(
    (setting) => !existingKeys.has(setting.key),
  );

  if (missing.length) {
    await prisma.siteSetting.createMany({
      data: missing.map((setting) => ({
        key: setting.key,
        label: setting.label,
        group: setting.group,
        type: setting.type,
        value: setting.defaultValue,
      })),
      skipDuplicates: true,
    });
  }
}
