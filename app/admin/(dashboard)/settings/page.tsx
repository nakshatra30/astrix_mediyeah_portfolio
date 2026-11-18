import type { Metadata } from "next";
import { SETTING_DEFINITIONS, getSiteSettings } from "@/lib/settings";
import { AdminPageHeading } from "@/components/admin/page-heading";
import {
  SettingsForm,
  type SettingsSection,
} from "@/components/admin/settings-form";

export const dynamic = "force-dynamic";

export const metadata: Metadata = { title: "Settings" };

const SECTION_META: { group: string; title: string; description: string }[] = [
  {
    group: "general",
    title: "Brand",
    description: "Site identity, tagline and footer note.",
  },
  {
    group: "contact",
    title: "Contact details",
    description: "Shown in the footer, contact page and email links.",
  },
  {
    group: "social",
    title: "Social links",
    description: "Leave a field blank to hide that social icon.",
  },
];

export default async function AdminSettingsPage() {
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
        title="Settings"
        description="Global brand, contact and social configuration."
      />
      <SettingsForm sections={sections} initial={settings} />
    </div>
  );
}
