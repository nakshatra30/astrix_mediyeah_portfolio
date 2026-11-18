import type { Metadata } from "next";
import { SETTING_DEFINITIONS, getSiteSettings } from "@/lib/settings";
import { AdminPageHeading } from "@/components/admin/page-heading";
import {
  SettingsForm,
  type SettingsSection,
} from "@/components/admin/settings-form";

export const dynamic = "force-dynamic";

export const metadata: Metadata = { title: "Content" };

const SECTION_META: { group: string; title: string; description: string }[] = [
  {
    group: "hero",
    title: "Homepage hero",
    description: "The first thing visitors read. Keep the headline sharp.",
  },
  {
    group: "about",
    title: "About page",
    description: "Story, mission and vision shown on the about page.",
  },
  {
    group: "stats",
    title: "Stats",
    description: "Numbers displayed in the homepage stats band.",
  },
  {
    group: "process",
    title: "Process",
    description: "Heading and introduction for the process section.",
  },
  {
    group: "seo",
    title: "SEO defaults",
    description: "Fallback metadata for pages without their own values.",
  },
];

export default async function AdminContentPage() {
  const settings = await getSiteSettings();

  const sections: SettingsSection[] = SECTION_META.map((meta) => ({
    title: meta.title,
    description: meta.description,
    fields: SETTING_DEFINITIONS.filter(
      (definition) => definition.group === meta.group,
    ),
  }));

  return (
    <div>
      <AdminPageHeading
        title="Content"
        description="Edit website copy without touching code. Fields update the public site immediately."
      />
      <SettingsForm sections={sections} initial={settings} />
    </div>
  );
}
