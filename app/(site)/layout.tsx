import type { Metadata } from "next";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ScrollProgress } from "@/components/layout/scroll-progress";
import { seo, site } from "@/data/site";

export const metadata: Metadata = {
  title: {
    default: seo.title,
    template: `%s · ${site.name}`,
  },
  description: seo.description,
  keywords: [...seo.keywords],
  openGraph: {
    title: seo.title,
    description: seo.description,
    siteName: site.name,
    type: "website",
    images: [{ url: seo.image }],
  },
};

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ScrollProgress />
      <Navbar />
      <main id="main-content">{children}</main>
      <Footer />
    </>
  );
}
