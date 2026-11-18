import Image from "next/image";
import { cn } from "@/lib/utils";

export function LogoMark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "relative inline-flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-ink-soft shadow-[0_0_30px_-10px_rgba(168,85,247,0.8)]",
        className,
      )}
      aria-hidden="true"
    >
      <Image
        src="/images/logo.png"
        alt=""
        width={24}
        height={24}
        className="h-6 w-6"
        priority
      />
    </span>
  );
}

export function Logo({
  name = "Astrix Mediyeah",
  className,
  compact = false,
}: {
  name?: string;
  className?: string;
  compact?: boolean;
}) {
  return (
    <span className={cn("flex items-center gap-3", className)}>
      <LogoMark />
      {!compact ? (
        <span className="flex flex-col leading-none">
          <span className="font-display text-[15px] font-semibold tracking-tight text-white">
            {name.split(" ")[0]}
            <span className="text-neon-bright">
              {name.split(" ").length > 1 ? ` ${name.split(" ").slice(1).join(" ")}` : ""}
            </span>
          </span>
          <span className="mt-1 text-[9px] font-medium uppercase tracking-[0.3em] text-zinc-500">
            Digital Studio
          </span>
        </span>
      ) : null}
    </span>
  );
}
