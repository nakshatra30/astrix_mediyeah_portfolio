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
import { getFeaturedProjects } from "@/data/projects";
import { SERVICES } from "@/data/services";
import { TESTIMONIALS } from "@/data/testimonials";
import { seo } from "@/data/site";

export const metadata: Metadata = {
  title: { absolute: seo.title },
  description: seo.description,
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <LogoMarquee />
      <ServicesOverview services={SERVICES} />
      <WhyChooseUs />
      <FeaturedProjects projects={getFeaturedProjects(4)} />
      <ProcessSection />
      <StatsBand />
      <TestimonialsSection testimonials={TESTIMONIALS} />
      <CTASection />
    </>
  );
}
