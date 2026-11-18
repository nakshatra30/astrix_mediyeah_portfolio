import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { ServiceCard } from "@/components/ui/service-card";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";
import type { Service } from "@/types/content";

export function ServicesOverview({
  services,
  eyebrow = "What we do",
  title = "Six disciplines. One obsessed team.",
  description = "No handoffs between strategists, designers and engineers. Every capability is built to compound the others.",
  showLink = true,
}: {
  services: Service[];
  eyebrow?: string;
  title?: string;
  description?: string;
  showLink?: boolean;
}) {
  return (
    <section className="section-pad relative" id="services">
      <Container>
        <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow={eyebrow}
            title={title}
            description={description}
          />
          {showLink ? (
            <Link
              href="/services"
              className="group inline-flex shrink-0 items-center gap-2 text-sm font-medium text-zinc-300 transition-colors hover:text-white"
            >
              All services
              <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 transition-colors group-hover:border-electric/40 group-hover:text-electric-bright">
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          ) : null}
        </div>

        <RevealGroup className="mt-12 grid gap-4 sm:grid-cols-2 lg:mt-14 lg:grid-cols-3">
          {services.map((service, index) => (
            <RevealItem key={service.id} className="h-full">
              <ServiceCard service={service} index={index} />
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}
