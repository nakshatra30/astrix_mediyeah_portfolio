import type { ReactNode } from "react";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

export function PageHeader({
  eyebrow,
  title,
  description,
  children,
  className,
}: {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <header className={cn("relative overflow-hidden pb-16 pt-36 sm:pt-40", className)}>
      <div
        className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[420px] w-[820px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(168,85,247,0.22),transparent)] blur-2xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-24 top-24 -z-10 h-72 w-72 rounded-full bg-electric/10 blur-3xl animate-pulse-glow"
        aria-hidden="true"
      />
      <Container>
        <div className="flex flex-col items-start gap-5">
          <Reveal>
            <span className="eyebrow">{eyebrow}</span>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="max-w-4xl text-balance text-4xl font-semibold sm:text-5xl lg:text-[4.2rem] lg:leading-[0.98]">
              {title}
            </h1>
          </Reveal>
          {description ? (
            <Reveal delay={0.16}>
              <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-zinc-400 sm:text-lg">
                {description}
              </p>
            </Reveal>
          ) : null}
          {children ? <Reveal delay={0.24}>{children}</Reveal> : null}
        </div>
      </Container>
    </header>
  );
}
