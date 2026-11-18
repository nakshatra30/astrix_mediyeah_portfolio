import type { Metadata } from "next";
import { Clock, Layers, Users } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";
import { ServicesOverview } from "@/components/sections/services-overview";
import { ProcessSection } from "@/components/sections/process-section";
import { CTASection } from "@/components/sections/cta";
import { SERVICES } from "@/data/services";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Branding, web development, SEO, social media, content and digital marketing — delivered by one senior team.",
  alternates: { canonical: "/services" },
};

const engagements = [
  {
    icon: Clock,
    title: "Launch sprint",
    timeline: "4–6 weeks",
    description:
      "A focused build for a single high-stakes moment: a rebrand, a new site, a campaign. Fixed scope, fixed price, no drift.",
  },
  {
    icon: Layers,
    title: "Growth partnership",
    timeline: "Monthly retainer",
    description:
      "A cross-functional pod working alongside your team across brand, site and acquisition — with a shared quarterly scorecard.",
  },
  {
    icon: Users,
    title: "Embedded studio",
    timeline: "Custom",
    description:
      "Senior design and engineering capacity inside your organisation, plugged into your rituals and shipping on your roadmap.",
  },
];

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Capabilities"
        title={
          <>
            Full-stack creative
            <br />
            <span className="gradient-text">firepower.</span>
          </>
        }
        description="Six connected disciplines, one senior team. Pick the capability you need — or let us assemble the combination that gets you to the outcome."
      />

      <ServicesOverview
        services={SERVICES}
        eyebrow="Disciplines"
        title="Where we do our best work"
        description="Every service is delivered by the same core team, so strategy, design and engineering never contradict each other."
        showLink={false}
      />

      <section className="section-pad border-t border-white/[0.06]">
        <Container>
          <SectionHeading
            eyebrow="Engagement models"
            title="Three ways to work together"
            description="Different moments call for different shapes. We'll recommend the one that fits — not the one that bills the most."
          />
          <RevealGroup className="mt-12 grid gap-4 lg:grid-cols-3">
            {engagements.map((engagement, index) => (
              <RevealItem key={engagement.title} className="h-full">
                <div className="glass-card flex h-full flex-col p-7">
                  <div className="flex items-center justify-between">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-neon-bright">
                      <engagement.icon className="h-5 w-5" strokeWidth={1.6} />
                    </span>
                    <span className="font-display text-xs tracking-[0.2em] text-zinc-600">
                      0{index + 1}
                    </span>
                  </div>
                  <h3 className="mt-5 text-lg font-semibold text-white">
                    {engagement.title}
                  </h3>
                  <p className="mt-1 text-[11px] uppercase tracking-[0.18em] text-electric/80">
                    {engagement.timeline}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                    {engagement.description}
                  </p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </section>

      <ProcessSection />

      <CTASection
        title="Not sure what you need yet?"
        description="That's normal. Book a 30-minute call and we'll diagnose the real bottleneck before recommending any service."
      />
    </>
  );
}
