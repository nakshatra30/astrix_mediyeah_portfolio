import { cn } from "@/lib/utils";

const STYLES: Record<string, string> = {
  NEW: "border-electric/25 bg-electric/10 text-electric-bright",
  IN_PROGRESS: "border-amber-400/25 bg-amber-400/10 text-amber-300",
  RESPONDED: "border-emerald-400/25 bg-emerald-400/10 text-emerald-300",
  CLOSED: "border-white/15 bg-white/[0.04] text-zinc-400",
};

const LABELS: Record<string, string> = {
  NEW: "New",
  IN_PROGRESS: "In progress",
  RESPONDED: "Responded",
  CLOSED: "Closed",
};

export function StatusBadge({
  status,
  className,
}: {
  status: string;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[10px] font-medium",
        STYLES[status] ?? STYLES.CLOSED,
        className,
      )}
    >
      <span className="h-1 w-1 rounded-full bg-current" />
      {LABELS[status] ?? status}
    </span>
  );
}
