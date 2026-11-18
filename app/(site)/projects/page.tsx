import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/page-header";
import { Container } from "@/components/ui/container";
import { ProjectsGrid } from "@/components/sections/projects-grid";
import { CTASection } from "@/components/sections/cta";
import { getPublicProjectCategories, getPublicProjects } from "@/lib/queries";
import { getSiteSettings } from "@/lib/settings";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Selected branding, web development, SEO and growth work from Astrix Mediyeah.",
  alternates: { canonical: "/projects" },
};

export default async function ProjectsPage() {
  const [projects, categories, settings] = await Promise.all([
    getPublicProjects(),
    getPublicProjectCategories(),
    getSiteSettings(),
  ]);

  return (
    <>
      <PageHeader
        eyebrow="Selected work"
        title={
          <>
            Work that moved
            <br />
            <span className="gradient-text">a number.</span>
          </>
        }
        description="Brands, websites and growth systems built for ambitious teams. Browse by discipline — every project is a real partnership with measurable outcomes."
      />

      <Container>
        <ProjectsGrid projects={projects} categories={categories} />
      </Container>

      <div className="mt-10">
        <CTASection
          email={settings["contact.email"]}
          title="Your project could be next."
          description="Tell us what you're building. We'll show you exactly how we'd approach it — and what we think it takes to win."
        />
      </div>
    </>
  );
}
