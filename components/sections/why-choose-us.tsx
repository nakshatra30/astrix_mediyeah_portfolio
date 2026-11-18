import Link from "next/link";
import { ArrowRight, Code2, Compass, Gauge, Users } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";

const reasons = [
  {
    icon: Users,
    title: "Senior-only team",
    description:
      "The people in your kickoff are the people doing the work. No account layers, no juniors learning on your budget.",
  },
  {
    icon: Compass,
    title: "Strategy before pixels",
    description:
      "We interrogate the business before we design a thing. Positioning, audience and metrics come first — always.",
  },
  {
    icon: Code2,
    title: "Design and engineering, fused",
    description:
      "The same team designs and builds. Nothing gets lost in a handoff, and nothing ships that we wouldn't put our name on.",
  },
  {
    icon: Gauge,
    title: "Measured by impact",
    description:
      "We define success before we start, instrument it properly, and report honestly. Aesthetics matter — outcomes decide.",
  },
];

export function WhyChooseUs() {
  return (
    <section className="section-pad relative overflow-hidden">
      <div
        className="pointer-events-none absolute -left-32 top-1/4 h-96 w-96 rounded-full bg-neon/[0.07] blur-[110px]"
        aria-hidden="true"
      />
      <Container className="relative grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div className="flex flex-col">
          <SectionHeading
            eyebrow="Why Astrix"
            title={
              <>
                Built like a partner.
                <br />
                <span className="text-zinc-500">Not a vendor.</span>
              </>
            }
            description="Most agencies sell hours. We sell a working system: strategy, craft and engineering in one accountable team."
          />

          <Reveal delay={0.2}>
            <div className="mt-10 flex items-center gap-6 rounded-2xl border border-white/[0.08] bg-white/[0.025] p-6">
              <div className="shrink-0">
                <p className="font-display text-4xl font-semibold text-white">
                  9<span className="text-neon-bright">+</span>
                </p>
                <p className="mt-1 text-[10px] uppercase tracking-[0.18em] text-zinc-600">
                  Years of craft
                </p>
              </div>
              <div className="h-12 w-px bg-white/10" />
              <p className="text-sm leading-relaxed text-zinc-400">
                A senior studio shaped by nine years of launches, rebuilds and
                growth programmes across five continents.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.28}>
            <Link
              href="/about"
              className="group mt-8 inline-flex items-center gap-2 text-sm font-medium text-zinc-300 transition-colors hover:text-white"
            >
              Meet the studio
              <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 transition-colors group-hover:border-neon/40 group-hover:text-neon-bright">
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          </Reveal>
        </div>

        <RevealGroup className="grid gap-4 sm:grid-cols-2">
          {reasons.map((reason) => (
            <RevealItem key={reason.title} className="h-full">
              <div className="glass-card group h-full p-6">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-neon-bright transition-colors duration-500 group-hover:border-neon/35 group-hover:text-electric-bright">
                  <reason.icon className="h-5 w-5" strokeWidth={1.6} />
                </span>
                <h3 className="mt-5 text-base font-semibold text-white">
                  {reason.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-zinc-400">
                  {reason.description}
                </p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}
