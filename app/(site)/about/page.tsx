import type { Metadata } from "next";
import { Compass, Eye, Heart, Rocket, Sparkles, Target, Zap } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { Container } from "@/components/ui/container";
import { Cover } from "@/components/ui/cover";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { StatsBand } from "@/components/sections/stats-band";
import { CTASection } from "@/components/sections/cta";
import { getSiteSettings } from "@/lib/settings";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "About",
  description:
    "Astrix Mediyeah is a senior-led digital studio blending strategy, design, engineering and growth under one roof.",
  alternates: { canonical: "/about" },
};

const values = [
  {
    icon: Sparkles,
    title: "Taste is a discipline",
    description:
      "We treat craft as a competitive advantage — because in a market full of templates, distinctiveness is what gets remembered.",
  },
  {
    icon: Target,
    title: "Clarity over cleverness",
    description:
      "If it needs a deck to explain, it isn't clear enough. We optimise for the decision, the message and the next action.",
  },
  {
    icon: Heart,
    title: "Own the outcome",
    description:
      "We don't hide behind scope. If a metric slips, we say so, dig in and fix it — the same way we'd want our partners to behave.",
  },
  {
    icon: Zap,
    title: "Speed with standards",
    description:
      "Momentum matters. We move in weeks, not quarters, without trading away accessibility, performance or polish.",
  },
];

function toNumber(value: string | undefined, fallback: number) {
  const parsed = Number.parseInt((value ?? "").replace(/[^\d]/g, ""), 10);
  return Number.isNaN(parsed) ? fallback : parsed;
}

export default async function AboutPage() {
  const settings = await getSiteSettings();

  return (
    <>
      <PageHeader
        eyebrow="About the studio"
        title={
          <>
            Small by design.
            <br />
            <span className="gradient-text">Senior by default.</span>
          </>
        }
        description="We're a tight team of strategists, designers and engineers who got tired of watching great ideas die in agency handoffs. So we built a studio without them."
      />

      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <div className="relative">
              <Cover
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1400&q=80"
                alt="The Astrix Mediyeah studio team collaborating"
                className="aspect-[4/3] w-full rounded-3xl border border-white/10"
              />
              <div className="absolute -bottom-6 -right-3 hidden rounded-2xl border border-white/10 bg-ink-soft/95 px-6 py-5 shadow-2xl backdrop-blur sm:block">
                <p className="font-display text-3xl font-semibold text-white">
                  {settings["stats.experience"]}
                  <span className="text-neon-bright">+</span>
                </p>
                <p className="mt-1 text-[10px] uppercase tracking-[0.18em] text-zinc-500">
                  Years of craft
                </p>
              </div>
            </div>
          </Reveal>

          <div>
            <SectionHeading
              eyebrow="Our story"
              title={settings["about.title"]}
              description={settings["about.story"]}
            />
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/[0.08] bg-white/[0.025] p-5">
                <Rocket className="h-5 w-5 text-neon-bright" strokeWidth={1.6} />
                <p className="mt-3 text-sm font-semibold text-white">Mission</p>
                <p className="mt-2 text-[13px] leading-relaxed text-zinc-400">
                  {settings["about.mission"]}
                </p>
              </div>
              <div className="rounded-2xl border border-white/[0.08] bg-white/[0.025] p-5">
                <Eye className="h-5 w-5 text-electric-bright" strokeWidth={1.6} />
                <p className="mt-3 text-sm font-semibold text-white">Vision</p>
                <p className="mt-2 text-[13px] leading-relaxed text-zinc-400">
                  {settings["about.vision"]}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>

      <section className="section-pad">
        <Container>
          <SectionHeading
            eyebrow="What we believe"
            title="Four principles we don't negotiate"
            description="They shape who we hire, what we ship and how we behave when a project gets hard."
          />
          <RevealGroup className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value) => (
              <RevealItem key={value.title} className="h-full">
                <div className="glass-card h-full p-6">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-neon-bright">
                    <value.icon className="h-4.5 w-4.5" strokeWidth={1.6} />
                  </span>
                  <h3 className="mt-4 text-[15px] font-semibold text-white">
                    {value.title}
                  </h3>
                  <p className="mt-2 text-[13px] leading-relaxed text-zinc-400">
                    {value.description}
                  </p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>

          <Reveal delay={0.1}>
            <div className="mt-10 flex items-start gap-3 rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5 text-sm text-zinc-400">
              <Compass className="mt-0.5 h-4 w-4 shrink-0 text-electric-bright" />
              <p>
                Remote-first, headquartered in Bengaluru, working with partners
                across Asia, Europe and North America. Same standards, every time
                zone.
              </p>
            </div>
          </Reveal>
        </Container>
      </section>

      <StatsBand
        projects={toNumber(settings["stats.projects"], 180)}
        clients={toNumber(settings["stats.clients"], 64)}
        experience={toNumber(settings["stats.experience"], 9)}
        satisfaction={toNumber(settings["stats.satisfaction"], 98)}
      />

      <div className="mt-12">
        <CTASection
          email={settings["contact.email"]}
          title="Want to work with a smaller, sharper team?"
          description="We take on a limited number of partnerships each quarter so senior attention stays real. Tell us what you're building."
        />
      </div>
    </>
  );
}
