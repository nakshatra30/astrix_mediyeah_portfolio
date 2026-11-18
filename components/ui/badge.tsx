import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

type BadgeVariant = "neon" | "electric" | "neutral" | "success" | "warning";

const styles: Record<BadgeVariant, string> = {
  neon: "border-neon/30 bg-neon/10 text-neon-bright",
  electric: "border-electric/30 bg-electric/10 text-electric-bright",
  neutral: "border-white/10 bg-white/[0.04] text-zinc-300",
  success: "border-emerald-500/30 bg-emerald-500/10 text-emerald-300",
  warning: "border-amber-500/30 bg-amber-500/10 text-amber-300",
};

export function Badge({
  variant = "neutral",
  className,
  ...props
}: ComponentProps<"span"> & { variant?: BadgeVariant }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[11px] font-medium tracking-wide",
        styles[variant],
        className,
      )}
      {...props}
    />
  );
}
