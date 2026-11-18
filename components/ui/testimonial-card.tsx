import { Quote } from "lucide-react";
import { Stars } from "@/components/ui/stars";
import { Cover } from "@/components/ui/cover";
import type { Testimonial } from "@/types/content";
import { cn, getInitials } from "@/lib/utils";

export function TestimonialCard({
  testimonial,
  className,
}: {
  testimonial: Testimonial;
  className?: string;
}) {
  return (
    <figure
      className={cn(
        "glass-card flex h-full flex-col gap-5 p-6 sm:p-8",
        className,
      )}
    >
      <div className="flex items-center justify-between">
        <Stars rating={testimonial.rating} />
        <Quote className="h-7 w-7 text-neon/25" strokeWidth={1.2} />
      </div>
      <blockquote className="flex-1 text-[15px] leading-relaxed text-zinc-300">
        “{testimonial.content}”
      </blockquote>
      <figcaption className="flex items-center gap-3 border-t border-white/[0.07] pt-5">
        {testimonial.avatarUrl ? (
          <Cover
            src={testimonial.avatarUrl}
            alt={testimonial.clientName}
            className="h-11 w-11 shrink-0 rounded-full"
            overlay={false}
            sizes="44px"
          />
        ) : (
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/10 bg-gradient-to-br from-neon/25 to-electric/15 text-xs font-semibold text-white">
            {getInitials(testimonial.clientName)}
          </span>
        )}
        <span className="min-w-0">
          <span className="block truncate text-sm font-medium text-white">
            {testimonial.clientName}
          </span>
          <span className="block truncate text-xs text-zinc-500">
            {testimonial.clientRole}
            {testimonial.company ? ` · ${testimonial.company}` : ""}
          </span>
        </span>
      </figcaption>
    </figure>
  );
}
