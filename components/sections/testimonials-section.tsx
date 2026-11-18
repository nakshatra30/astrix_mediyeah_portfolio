import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { TestimonialCard } from "@/components/ui/testimonial-card";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";
import type { PublicTestimonial } from "@/types/content";

export function TestimonialsSection({
  testimonials,
  limit = 3,
  align = "center",
}: {
  testimonials: PublicTestimonial[];
  limit?: number;
  align?: "center" | "left";
}) {
  if (!testimonials.length) return null;

  return (
    <section className="section-pad relative" id="testimonials">
      <Container>
        <SectionHeading
          eyebrow="Client voices"
          title="The work speaks. So do they."
          description="No paid reviews, no cherry-picked soundbites — just founders and marketing leads describing what changed."
          align={align}
          className={align === "center" ? "mx-auto items-center" : undefined}
        />

        <RevealGroup className="mt-12 grid gap-5 md:grid-cols-2 lg:mt-14 lg:grid-cols-3">
          {testimonials.slice(0, limit).map((testimonial) => (
            <RevealItem key={testimonial.id} className="h-full">
              <TestimonialCard testimonial={testimonial} />
            </RevealItem>
          ))}
        </RevealGroup>

        <div className="mt-12 flex justify-center">
          <Link
            href="/testimonials"
            className="group inline-flex items-center gap-2 text-sm font-medium text-zinc-300 transition-colors hover:text-white"
          >
            Read all testimonials
            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 transition-colors group-hover:border-electric/40 group-hover:text-electric-bright">
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </span>
          </Link>
        </div>
      </Container>
    </section>
  );
}
