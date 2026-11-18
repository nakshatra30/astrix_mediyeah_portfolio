import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function StatCard({
  label,
  value,
  hint,
  icon,
  accent = "neon",
}: {
  label: string;
  value: number | string;
  hint?: string;
  icon: ReactNode;
  accent?: "neon" | "electric" | "emerald" | "amber";
}) {
  const accents = {
    neon: "text-neon-bright bg-neon/10 border-neon/20",
    electric: "text-electric-bright bg-electric/10 border-electric/20",
    emerald: "text-emerald-300 bg-emerald-400/10 border-emerald-400/20",
    amber: "text-amber-300 bg-amber-400/10 border-amber-400/20",
  };

  return (
    <div className="admin-panel p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[10px] uppercase tracking-[0.18em] text-zinc-600">
            {label}
          </p>
          <p className="mt-2 font-display text-3xl font-semibold text-white">
            {value}
          </p>
        </div>
        <span
          className={cn(
            "flex h-9 w-9 items-center justify-center rounded-xl border",
            accents[accent],
          )}
        >
          {icon}
        </span>
      </div>
      {hint ? <p className="mt-3 text-[11px] text-zinc-600">{hint}</p> : null}
    </div>
  );
}
