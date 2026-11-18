import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/page-header";
import { Container } from "@/components/ui/container";
import { TestimonialCard } from "@/components/ui/testimonial-card";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";
import { StatsBand } from "@/components/sections/stats-band";
import { CTASection } from "@/components/sections/cta";
import { getPublishedTestimonials } from "@/lib/queries";
import { getSiteSettings } from "@/lib/settings";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Testimonials",
  description:
    "What founders and marketing leaders say about working with Astrix Mediyeah.",
  alternates: { canonical: "/testimonials" },
};

function toNumber(value: string | undefined, fallback: number) {
  const parsed = Number.parseInt((value ?? "").replace(/[^\d]/g, ""), 10);
  return Number.isNaN(parsed) ? fallback : parsed;
}

export default async function TestimonialsPage() {
  const [testimonials, settings] = await Promise.all([
    getPublishedTestimonials(),
    getSiteSettings(),
  ]);

  return (
    <>
      <PageHeader
        eyebrow="Client voices"
        title={
          <>
            Honest words from
            <br />
            <span className="gradient-text">real partners.</span>
          </>
        }
        description="We ask every client for feedback at the end of an engagement — the good, the hard and the useful. Here's what they say when we're not in the room."
      />

      <Container>
        {testimonials.length ? (
          <RevealGroup className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((testimonial) => (
              <RevealItem key={testimonial.id} className="h-full">
                <TestimonialCard testimonial={testimonial} />
              </RevealItem>
            ))}
          </RevealGroup>
        ) : (
          <div className="rounded-2xl border border-dashed border-white/10 p-12 text-center text-sm text-zinc-500">
            Testimonials are on their way.
          </div>
        )}
      </Container>

      <div className="section-pad">
        <Container>
          <StatsBand
            projects={toNumber(settings["stats.projects"], 180)}
            clients={toNumber(settings["stats.clients"], 64)}
            experience={toNumber(settings["stats.experience"], 9)}
            satisfaction={toNumber(settings["stats.satisfaction"], 98)}
          />
        </Container>
      </div>

      <CTASection
        email={settings["contact.email"]}
        title="Want to be the next success story?"
        description="We'd love to hear what you're building. Bring the ambition — we'll bring the senior team to match it."
      />
    </>
  );
}
