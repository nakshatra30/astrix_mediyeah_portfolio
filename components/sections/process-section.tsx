import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";
import { PROCESS_STEPS } from "@/lib/constants";

export function ProcessSection({
  title = "A process with no black boxes",
  subtitle = "Every engagement runs on the same rhythm: understand deeply, decide clearly, build beautifully, measure honestly.",
  showLink = true,
}: {
  title?: string;
  subtitle?: string;
  showLink?: boolean;
}) {
  return (
    <section className="section-pad relative overflow-hidden" id="process">
      <div
        className="pointer-events-none absolute right-0 top-1/3 h-[420px] w-[420px] rounded-full bg-electric/[0.06] blur-[120px]"
        aria-hidden="true"
      />
      <Container className="relative">
        <SectionHeading
          eyebrow="How we work"
          title={title}
          description={subtitle}
          align="center"
          className="mx-auto items-center"
        />

        <div className="relative mt-14">
          <div
            className="absolute left-0 right-0 top-[52px] hidden h-px bg-[linear-gradient(90deg,transparent,rgba(168,85,247,0.35),rgba(34,211,238,0.25),transparent)] lg:block"
            aria-hidden="true"
          />
          <RevealGroup className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {PROCESS_STEPS.map((step) => (
              <RevealItem key={step.number} className="h-full">
                <div className="glass-card group relative h-full overflow-hidden p-6">
                  <div className="flex items-center justify-between">
                    <span className="font-display text-3xl font-semibold text-white/[0.14] transition-colors duration-500 group-hover:text-neon/40">
                      {step.number}
                    </span>
                    <span className="h-1.5 w-1.5 rounded-full bg-neon/40 transition-all duration-500 group-hover:bg-electric group-hover:shadow-[0_0_12px_2px_rgba(34,211,238,0.4)]" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-white">
                    {step.title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-zinc-400">
                    {step.description}
                  </p>
                  <ul className="mt-5 space-y-1.5 border-t border-white/[0.06] pt-4">
                    {step.deliverables.map((deliverable) => (
                      <li
                        key={deliverable}
                        className="flex items-center gap-2 text-[12px] text-zinc-500"
                      >
                        <Check className="h-3 w-3 text-electric/70" />
                        {deliverable}
                      </li>
                    ))}
                  </ul>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>

        {showLink ? (
          <div className="mt-12 flex justify-center">
            <Link
              href="/process"
              className="group inline-flex items-center gap-2 text-sm font-medium text-zinc-300 transition-colors hover:text-white"
            >
              See the full process
              <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 transition-colors group-hover:border-neon/40 group-hover:text-neon-bright">
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          </div>
        ) : null}
      </Container>
    </section>
  );
}
