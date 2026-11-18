import type { Metadata } from "next";
import { CalendarCheck, Eye, ShieldCheck } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";
import { ProcessSection } from "@/components/sections/process-section";
import { CTASection } from "@/components/sections/cta";

export const metadata: Metadata = {
  title: "Process",
  description:
    "How Astrix Mediyeah runs projects: discover, define, design, build, launch and grow — with weekly previews and no surprises.",
  alternates: { canonical: "/process" },
};

const principles = [
  {
    icon: Eye,
    title: "Weekly previews, always",
    description:
      "You see work in progress every week — not a grand reveal at the end. Feedback lands while it's still cheap to act on.",
  },
  {
    icon: CalendarCheck,
    title: "Fixed rhythm, clear owners",
    description:
      "One senior lead owns your account end to end. You always know what's happening this week and who to ask.",
  },
  {
    icon: ShieldCheck,
    title: "No surprise invoices",
    description:
      "Scope and pricing are agreed upfront. If something needs to change, we flag it before it costs you anything.",
  },
];

export default function ProcessPage() {
  return (
    <>
      <PageHeader
        eyebrow="How we work"
        title={
          <>
            No black boxes.
            <br />
            <span className="gradient-text">No drama.</span>
          </>
        }
        description="A repeatable rhythm refined across 180+ launches. It keeps projects fast, honest and genuinely collaborative from first call to post-launch growth."
      />

      <ProcessSection showLink={false} />

      <section className="border-t border-white/[0.06] py-16 sm:py-20">
        <Container>
          <SectionHeading
            eyebrow="Working principles"
            title="The rules we run every project by"
            description="Process is only as good as the behaviour behind it. These are non-negotiables."
          />
          <RevealGroup className="mt-12 grid gap-4 lg:grid-cols-3">
            {principles.map((principle) => (
              <RevealItem key={principle.title} className="h-full">
                <div className="glass-card h-full p-7">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-electric-bright">
                    <principle.icon className="h-5 w-5" strokeWidth={1.6} />
                  </span>
                  <h3 className="mt-5 text-lg font-semibold text-white">
                    {principle.title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-zinc-400">
                    {principle.description}
                  </p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>

          <div className="mt-10 rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 sm:p-8">
            <h3 className="text-lg font-semibold text-white">
              Typical timeline
            </h3>
            <div className="mt-5 grid gap-4 sm:grid-cols-4">
              {[
                { phase: "Discovery", duration: "1–2 weeks" },
                { phase: "Strategy & design", duration: "2–3 weeks" },
                { phase: "Build & QA", duration: "2–4 weeks" },
                { phase: "Launch & grow", duration: "Ongoing" },
              ].map((item) => (
                <div
                  key={item.phase}
                  className="rounded-xl border border-white/[0.07] bg-ink/40 p-4"
                >
                  <p className="text-xs font-medium text-zinc-200">
                    {item.phase}
                  </p>
                  <p className="mt-1 text-[11px] uppercase tracking-[0.16em] text-zinc-600">
                    {item.duration}
                  </p>
                </div>
              ))}
            </div>
            <p className="mt-4 text-xs text-zinc-600">
              Most launch projects go live in 4–8 weeks. Larger programmes run in
              phases so value ships continuously.
            </p>
          </div>
        </Container>
      </section>

      <CTASection
        title="Ready to see the process up close?"
        description="Bring your toughest brief. We'll walk you through exactly how we'd tackle it, who'd be involved and what it would take."
      />
    </>
  );
}
