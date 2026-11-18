import type { Metadata } from "next";
import { Hero } from "@/components/sections/hero";
import { LogoMarquee } from "@/components/sections/logo-marquee";
import { ServicesOverview } from "@/components/sections/services-overview";
import { WhyChooseUs } from "@/components/sections/why-choose-us";
import { FeaturedProjects } from "@/components/sections/featured-projects";
import { ProcessSection } from "@/components/sections/process-section";
import { StatsBand } from "@/components/sections/stats-band";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { CTASection } from "@/components/sections/cta";
import { getSiteSettings } from "@/lib/settings";
import {
  getPublicProjects,
  getPublicServices,
  getPublishedTestimonials,
} from "@/lib/queries";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  return {
    title: settings["seo.title"],
    description: settings["seo.description"],
    alternates: { canonical: "/" },
  };
}

function toNumber(value: string | undefined, fallback = 0) {
  const parsed = Number.parseInt((value ?? "").replace(/[^\d]/g, ""), 10);
  return Number.isNaN(parsed) ? fallback : parsed;
}

export default async function HomePage() {
  const [settings, services, projects, testimonials] = await Promise.all([
    getSiteSettings(),
    getPublicServices(6),
    getPublicProjects({ limit: 4 }),
    getPublishedTestimonials(3),
  ]);

  return (
    <>
      <Hero
        settings={{
          badge: settings["hero.badge"],
          title: settings["hero.title"],
          highlight: settings["hero.highlight"],
          description: settings["hero.description"],
          primaryCta: settings["hero.primaryCta"],
          secondaryCta: settings["hero.secondaryCta"],
          projects: toNumber(settings["stats.projects"], 180),
          clients: toNumber(settings["stats.clients"], 64),
          satisfaction: toNumber(settings["stats.satisfaction"], 98),
        }}
      />
      <LogoMarquee />
      <ServicesOverview services={services} />
      <WhyChooseUs />
      <FeaturedProjects projects={projects} />
      <ProcessSection
        title={settings["process.title"]}
        subtitle={settings["process.subtitle"]}
      />
      <StatsBand
        projects={toNumber(settings["stats.projects"], 180)}
        clients={toNumber(settings["stats.clients"], 64)}
        experience={toNumber(settings["stats.experience"], 9)}
        satisfaction={toNumber(settings["stats.satisfaction"], 98)}
      />
      <TestimonialsSection testimonials={testimonials} />
      <CTASection email={settings["contact.email"]} />
    </>
  );
}
