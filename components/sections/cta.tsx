import { ArrowUpRight, Mail, Sparkles } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { contact } from "@/data/contact";

export function CTASection({
  title = "Let's build something they can't ignore.",
  description = "Tell us where you're headed. We'll reply within one working day with a clear next step — no pitch theatre.",
}: {
  title?: string;
  description?: string;
}) {
  return (
    <section className="relative py-12 sm:py-16">
      <Container>
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(140deg,rgba(168,85,247,0.16),rgba(10,10,20,0.85)_42%,rgba(34,211,238,0.12))] px-6 py-14 sm:px-12 sm:py-16 lg:px-20 lg:py-20">
            <div
              className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-neon/20 blur-[100px]"
              aria-hidden="true"
            />
            <div
              className="pointer-events-none absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-electric/15 blur-[100px]"
              aria-hidden="true"
            />
            <div
              className="pointer-events-none absolute inset-0 bg-grid opacity-[0.15] mask-fade-y"
              aria-hidden="true"
            />

            <div className="relative flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-2xl">
                <span className="eyebrow">
                  <Sparkles className="h-3.5 w-3.5" />
                  Limited partnerships
                </span>
                <h2 className="mt-5 text-balance text-3xl font-semibold sm:text-4xl lg:text-[3.2rem] lg:leading-[1.02]">
                  {title}
                </h2>
                <p className="mt-5 max-w-xl text-pretty text-sm leading-relaxed text-zinc-400 sm:text-base">
                  {description}
                </p>
              </div>

              <div className="flex w-full flex-col gap-3 sm:w-auto sm:min-w-64">
                <ButtonLink href="/contact" size="lg" className="group w-full">
                  Start a project
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </ButtonLink>
                <a
                  href={`mailto:${contact.email}`}
                  className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full border border-white/12 px-6 text-sm text-zinc-300 transition-colors hover:border-white/25 hover:text-white"
                >
                  <Mail className="h-4 w-4" />
                  {contact.email}
                </a>
                <p className="mt-1 text-center text-[11px] text-zinc-600">
                  Currently booking 2 new partners for Q1
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
