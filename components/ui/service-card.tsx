import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ServiceIcon } from "@/components/ui/service-icon";
import type { PublicService } from "@/types/content";
import { cn } from "@/lib/utils";

export function ServiceCard({
  service,
  index = 0,
  className,
}: {
  service: PublicService;
  index?: number;
  className?: string;
}) {
  return (
    <Link
      href={`/services/${service.slug}`}
      className={cn(
        "glass-card group relative flex h-full flex-col gap-5 overflow-hidden p-6 sm:p-7",
        className,
      )}
    >
      <div
        className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-neon/10 blur-2xl transition-opacity duration-500 group-hover:opacity-100 sm:opacity-0"
        aria-hidden="true"
      />
      <div className="flex items-start justify-between">
        <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-gradient-to-br from-neon/20 via-transparent to-electric/10 text-neon-bright transition-all duration-500 group-hover:border-neon/40 group-hover:text-electric-bright">
          <ServiceIcon name={service.icon} className="h-5 w-5" />
        </span>
        <span className="font-display text-xs tracking-[0.2em] text-zinc-600">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-3">
        <h3 className="text-lg font-semibold text-white">{service.title}</h3>
        <p className="text-sm leading-relaxed text-zinc-400">
          {service.shortDescription}
        </p>
        <ul className="mt-auto space-y-1.5 pt-2">
          {service.features.slice(0, 3).map((feature) => (
            <li
              key={feature}
              className="flex items-start gap-2 text-[12.5px] text-zinc-500"
            >
              <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-neon/70" />
              {feature}
            </li>
          ))}
        </ul>
      </div>
      <span className="inline-flex items-center gap-1.5 text-xs font-medium text-zinc-400 transition-colors group-hover:text-electric-bright">
        Explore service
        <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
      </span>
    </Link>
  );
}
