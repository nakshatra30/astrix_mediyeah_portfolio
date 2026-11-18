import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";
import { Cover } from "@/components/ui/cover";
import { SectionHeading } from "@/components/ui/section-heading";
import { ProjectCard } from "@/components/ui/project-card";
import { Reveal } from "@/components/ui/reveal";
import { ResponsiveVideo } from "@/components/media/responsive-video";
import { InstagramReel } from "@/components/media/instagram-reel";
import { CTASection } from "@/components/sections/cta";
import {
  PROJECTS,
  getProjectBySlug,
  getRelatedProjects,
} from "@/data/projects";

export const dynamicParams = false;

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return PROJECTS.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: "Project not found" };
  return {
    title: `${project.title} — ${project.client}`,
    description: project.summary,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      title: `${project.title} — ${project.client}`,
      description: project.summary,
      images: [{ url: project.coverImage }],
    },
  };
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) notFound();

  const related = getRelatedProjects(project);
  const hasMotion = Boolean(project.videoUrl || project.instagramReelUrl);

  return (
    <>
      <PageHeader
        eyebrow={project.category}
        title={project.title}
        description={project.summary}
      >
        <div className="flex flex-wrap items-center gap-2.5 text-xs text-zinc-400">
          <span className="rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5">
            {project.client}
          </span>
          {project.year ? (
            <span className="rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5">
              {project.year}
            </span>
          ) : null}
          {project.service ? (
            <Link
              href={`/services/${project.service.slug}`}
              className="rounded-full border border-neon/20 bg-neon/[0.07] px-3.5 py-1.5 text-neon-bright transition-colors hover:border-neon/40"
            >
              {project.service.title}
            </Link>
          ) : null}
          {project.liveUrl ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 transition-colors hover:border-white/25 hover:text-white"
            >
              View live <ExternalLink className="h-3 w-3" />
            </a>
          ) : null}
        </div>
      </PageHeader>

      <Container>
        <Reveal>
          <Cover
            src={project.coverImage}
            alt={`${project.title} — ${project.client}`}
            className="aspect-[16/10] w-full rounded-3xl border border-white/10 sm:aspect-[16/8]"
            priority
            sizes="100vw"
          />
        </Reveal>

        <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_320px] lg:gap-16">
          <div>
            <h2 className="text-2xl font-semibold text-white sm:text-3xl">
              The story
            </h2>
            <p className="mt-5 whitespace-pre-line text-[15px] leading-relaxed text-zinc-400">
              {project.description}
            </p>
          </div>

          <aside className="space-y-4">
            <div className="glass-card p-6">
              <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-600">
                Project facts
              </p>
              <dl className="mt-4 space-y-3 text-sm">
                <div className="flex items-center justify-between gap-4">
                  <dt className="text-zinc-500">Client</dt>
                  <dd className="text-right font-medium text-zinc-200">
                    {project.client}
                  </dd>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <dt className="text-zinc-500">Category</dt>
                  <dd className="text-right font-medium text-zinc-200">
                    {project.category}
                  </dd>
                </div>
                {project.year ? (
                  <div className="flex items-center justify-between gap-4">
                    <dt className="text-zinc-500">Year</dt>
                    <dd className="text-right font-medium text-zinc-200">
                      {project.year}
                    </dd>
                  </div>
                ) : null}
                {project.service ? (
                  <div className="flex items-center justify-between gap-4">
                    <dt className="text-zinc-500">Service</dt>
                    <dd className="text-right font-medium text-zinc-200">
                      {project.service.title}
                    </dd>
                  </div>
                ) : null}
              </dl>
              {project.liveUrl ? (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/12 px-4 py-2.5 text-xs font-medium text-zinc-200 transition-colors hover:border-white/25 hover:text-white"
                >
                  Visit website <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              ) : null}
            </div>

            {project.results.length ? (
              <div className="glass-card p-6">
                <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-600">
                  Outcomes
                </p>
                <ul className="mt-4 space-y-3">
                  {project.results.map((result) => (
                    <li
                      key={result}
                      className="flex items-start gap-2.5 text-sm leading-relaxed text-zinc-300"
                    >
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-r from-neon to-electric" />
                      {result}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </aside>
        </div>

        {project.gallery.length ? (
          <section className="mt-16">
            <h2 className="text-2xl font-semibold text-white sm:text-3xl">
              Gallery
            </h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {project.gallery.map((image, index) => (
                <Reveal key={`${image}-${index}`} delay={index * 0.06}>
                  <Cover
                    src={image}
                    alt={`${project.title} visual ${index + 1}`}
                    className="aspect-[4/3] w-full rounded-2xl border border-white/10"
                    sizes="(min-width: 640px) 50vw, 100vw"
                  />
                </Reveal>
              ))}
            </div>
          </section>
        ) : null}

        {hasMotion ? (
          <section className="mt-16">
            <h2 className="text-2xl font-semibold text-white sm:text-3xl">
              Motion
            </h2>
            <div className="mt-6 grid items-start gap-5 lg:grid-cols-2">
              {project.videoUrl ? (
                <ResponsiveVideo
                  src={project.videoUrl}
                  poster={project.videoThumbnail ?? project.coverImage}
                  title={`${project.title} — project video`}
                />
              ) : null}
              {project.instagramReelUrl ? (
                <InstagramReel
                  url={project.instagramReelUrl}
                  title={project.title}
                />
              ) : null}
            </div>
          </section>
        ) : null}
      </Container>

      {related.length ? (
        <section className="py-16 sm:py-20">
          <Container>
            <div className="flex items-end justify-between gap-6">
              <SectionHeading eyebrow="Keep exploring" title="More recent work" />
              <Link
                href="/projects"
                className="hidden items-center gap-1.5 text-sm text-zinc-400 transition-colors hover:text-white sm:inline-flex"
              >
                All projects <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {related.map((item, index) => (
                <ProjectCard key={item.id} project={item} index={index} />
              ))}
            </div>
          </Container>
        </section>
      ) : null}

      <div className="mt-4 flex justify-center">
        <ButtonLink href="/contact" variant="secondary" size="lg">
          Start a project like this
        </ButtonLink>
      </div>

      <CTASection />
    </>
  );
}
