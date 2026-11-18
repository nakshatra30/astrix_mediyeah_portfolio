import type { Metadata } from "next";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ScrollProgress } from "@/components/layout/scroll-progress";
import { getSiteSettings } from "@/lib/settings";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  return {
    title: {
      default: settings["seo.title"],
      template: `%s · ${settings["site.name"]}`,
    },
    description: settings["seo.description"],
    keywords: settings["seo.keywords"].split(",").map((word) => word.trim()),
    openGraph: {
      title: settings["seo.title"],
      description: settings["seo.description"],
      siteName: settings["site.name"],
      type: "website",
    },
  };
}

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getSiteSettings();

  return (
    <>
      <ScrollProgress />
      <Navbar siteName={settings["site.name"]} />
      <main id="main-content">{children}</main>
      <Footer
        settings={{
          name: settings["site.name"],
          description: settings["site.description"],
          email: settings["contact.email"],
          phone: settings["contact.phone"],
          address: settings["contact.address"],
          note: settings["footer.note"],
          socials: [
            { label: "Instagram", href: settings["social.instagram"] },
            { label: "LinkedIn", href: settings["social.linkedin"] },
            { label: "X / Twitter", href: settings["social.twitter"] },
            { label: "Behance", href: settings["social.behance"] },
          ],
        }}
      />
    </>
  );
}
