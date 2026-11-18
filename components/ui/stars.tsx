import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

export function Stars({
  rating,
  className,
}: {
  rating: number;
  className?: string;
}) {
  return (
    <span
      className={cn("inline-flex items-center gap-1", className)}
      aria-label={`${rating} out of 5 stars`}
    >
      {Array.from({ length: 5 }).map((_, index) => (
        <Star
          key={index}
          className={cn(
            "h-3.5 w-3.5",
            index < rating
              ? "fill-amber-300 text-amber-300"
              : "fill-transparent text-zinc-700",
          )}
          strokeWidth={1.5}
          aria-hidden="true"
        />
      ))}
    </span>
  );
}
