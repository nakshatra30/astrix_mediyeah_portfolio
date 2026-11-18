import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { ProjectCard } from "@/components/ui/project-card";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";
import type { Project } from "@/types/content";

export function FeaturedProjects({
  projects,
  eyebrow = "Selected work",
  title = "Proof, not promises.",
  description = "A few recent partnerships where strategy, design and engineering moved a real number.",
}: {
  projects: Project[];
  eyebrow?: string;
  title?: string;
  description?: string;
}) {
  if (!projects.length) return null;

  return (
    <section className="section-pad relative">
      <Container>
        <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow={eyebrow}
            title={title}
            description={description}
          />
          <Link
            href="/projects"
            className="group inline-flex shrink-0 items-center gap-2 text-sm font-medium text-zinc-300 transition-colors hover:text-white"
          >
            View portfolio
            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 transition-colors group-hover:border-electric/40 group-hover:text-electric-bright">
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </span>
          </Link>
        </div>

        <RevealGroup className="mt-12 grid gap-5 md:grid-cols-2 lg:mt-14">
          {projects.slice(0, 4).map((project, index) => (
            <RevealItem key={project.id} className="h-full">
              <ProjectCard project={project} index={index} className="h-full" />
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}
