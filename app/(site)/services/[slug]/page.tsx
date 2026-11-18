import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { ServiceIcon } from "@/components/ui/service-icon";
import { Cover } from "@/components/ui/cover";
import { ProjectCard } from "@/components/ui/project-card";
import { Reveal } from "@/components/ui/reveal";
import { CTASection } from "@/components/sections/cta";
import { getPublicProjects, getPublicServiceBySlug } from "@/lib/queries";
import { getSiteSettings } from "@/lib/settings";

export const dynamic = "force-dynamic";

type PageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = await getPublicServiceBySlug(slug);
  if (!service) return { title: "Service not found" };
  return {
    title: service.title,
    description: service.shortDescription,
    alternates: { canonical: `/services/${service.slug}` },
  };
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const [service, settings] = await Promise.all([
    getPublicServiceBySlug(slug),
    getSiteSettings(),
  ]);

  if (!service) notFound();

  const related = await getPublicProjects({ limit: 3 });

  return (
    <>
      <PageHeader
        eyebrow="Service"
        title={service.title}
        description={service.shortDescription}
      >
        <div className="flex flex-wrap items-center gap-3">
          <ButtonLink href="/contact" size="lg">
            Start a project
            <ArrowUpRight className="h-4 w-4" />
          </ButtonLink>
          {service.price ? (
            <span className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-xs text-zinc-400">
              {service.price}
            </span>
          ) : null}
        </div>
      </PageHeader>

      <Container className="grid gap-12 pb-16 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
        <div>
          <Reveal>
            <h2 className="text-2xl font-semibold text-white sm:text-3xl">
              The engagement
            </h2>
            <p className="mt-5 whitespace-pre-line text-[15px] leading-relaxed text-zinc-400">
              {service.description}
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <h3 className="mt-12 text-sm font-medium uppercase tracking-[0.18em] text-zinc-500">
              What&apos;s included
            </h3>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {service.features.map((feature) => (
                <li
                  key={feature}
                  className="flex items-start gap-3 rounded-xl border border-white/[0.07] bg-white/[0.02] px-4 py-3.5 text-sm text-zinc-300"
                >
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-electric/25 bg-electric/10 text-electric-bright">
                    <Check className="h-3 w-3" />
                  </span>
                  {feature}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.16}>
            <div className="mt-12 rounded-2xl border border-white/[0.08] bg-[linear-gradient(130deg,rgba(168,85,247,0.08),transparent_60%)] p-6 sm:p-8">
              <h3 className="text-lg font-semibold text-white">
                Not sure this is the right fit?
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                Most projects touch two or three of our disciplines. Book a
                short call and we&apos;ll map the right scope together — honestly.
              </p>
              <ButtonLink href="/contact" variant="secondary" className="mt-5">
                Talk to a strategist
              </ButtonLink>
            </div>
          </Reveal>
        </div>

        <aside className="lg:sticky lg:top-28 lg:self-start">
          <div className="glass-card overflow-hidden">
            <Cover
              src={service.imageUrl}
              alt={service.title}
              className="aspect-[4/3]"
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="flex h-20 w-20 items-center justify-center rounded-3xl border border-white/15 bg-black/35 text-white backdrop-blur-md">
                  <ServiceIcon name={service.icon} className="h-9 w-9" />
                </span>
              </div>
            </Cover>
            <div className="p-6">
              <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-600">
                Engagement model
              </p>
              <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                Senior-led, fixed-scope or retained. We&apos;ll recommend the
                model that gets you to the outcome fastest.
              </p>
              {service.price ? (
                <p className="mt-4 border-t border-white/[0.07] pt-4 text-sm font-medium text-white">
                  {service.price}
                </p>
              ) : null}
              <ButtonLink href="/contact" className="mt-5 w-full">
                Enquire about {service.title.toLowerCase()}
              </ButtonLink>
            </div>
          </div>
        </aside>
      </Container>

      {related.length ? (
        <section className="border-t border-white/[0.06] py-16 sm:py-20">
          <Container>
            <div className="flex items-end justify-between gap-6">
              <SectionHeading eyebrow="Recent work" title="See it in action" />
              <Link
                href="/projects"
                className="hidden items-center gap-1.5 text-sm text-zinc-400 transition-colors hover:text-white sm:inline-flex"
              >
                All projects <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {related.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))}
            </div>
          </Container>
        </section>
      ) : null}

      <CTASection email={settings["contact.email"]} />
    </>
  );
}
