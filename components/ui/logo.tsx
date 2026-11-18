import { cn } from "@/lib/utils";

export function LogoMark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "relative inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-ink-soft shadow-[0_0_30px_-10px_rgba(168,85,247,0.8)]",
        className,
      )}
      aria-hidden="true"
    >
      <svg viewBox="0 0 64 64" className="h-6 w-6" fill="none">
        <defs>
          <linearGradient id="logo-gradient" x1="8" y1="8" x2="56" y2="56">
            <stop stopColor="#c084fc" />
            <stop offset="0.55" stopColor="#818cf8" />
            <stop offset="1" stopColor="#22d3ee" />
          </linearGradient>
        </defs>
        <path
          d="M32 10 51 52h-9.4l-3.4-8.2H25.8L22.4 52H13L32 10Zm0 16.6-4.2 10.2h8.4L32 26.6Z"
          fill="url(#logo-gradient)"
        />
      </svg>
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
