import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/ui/reveal";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
  children,
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  className?: string;
  children?: ReactNode;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-5",
        align === "center" ? "items-center text-center" : "items-start",
        className,
      )}
    >
      {eyebrow ? (
        <Reveal>
          <span className="eyebrow">{eyebrow}</span>
        </Reveal>
      ) : null}
      <Reveal delay={0.08}>
        <h2 className="max-w-3xl text-balance text-3xl font-semibold sm:text-4xl lg:text-[2.9rem] lg:leading-[1.05]">
          {title}
        </h2>
      </Reveal>
      {description ? (
        <Reveal delay={0.16}>
          <p
            className={cn(
              "max-w-2xl text-pretty text-[15px] leading-relaxed text-zinc-400 sm:text-base",
              align === "center" && "mx-auto",
            )}
          >
            {description}
          </p>
        </Reveal>
      ) : null}
      {children}
    </div>
  );
}
