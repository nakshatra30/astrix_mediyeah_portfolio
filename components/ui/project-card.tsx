"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { MouseEvent } from "react";
import { Cover } from "@/components/ui/cover";
import type { PublicProject } from "@/types/content";
import { cn } from "@/lib/utils";

export function ProjectCard({
  project,
  index = 0,
  className,
}: {
  project: PublicProject;
  index?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();

  const handleMove = (event: MouseEvent<HTMLDivElement>) => {
    const target = event.currentTarget;
    const rect = target.getBoundingClientRect();
    target.style.setProperty("--spot-x", `${event.clientX - rect.left}px`);
    target.style.setProperty("--spot-y", `${event.clientY - rect.top}px`);
  };

  return (
    <motion.article
      initial={reduce ? false : { opacity: 0, y: 28 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.7,
        delay: Math.min(index * 0.08, 0.35),
        ease: [0.22, 1, 0.36, 1],
      }}
      className={cn(
        "spotlight-card group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.025] transition-colors duration-500 hover:border-neon/35",
        className,
      )}
      onMouseMove={handleMove}
    >
      <Link href={`/projects/${project.slug}`} className="block">
        <div className="relative overflow-hidden">
          <Cover
            src={project.imageUrl}
            alt={`${project.title} — ${project.category} project`}
            className="aspect-[4/3] w-full transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          >
            <div className="absolute inset-x-0 top-0 flex items-center justify-between p-5">
              <span className="rounded-full border border-white/20 bg-black/40 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.18em] text-white/90 backdrop-blur">
                {project.category}
              </span>
              <span className="flex h-10 w-10 translate-y-1 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white opacity-0 backdrop-blur transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                <ArrowUpRight className="h-4 w-4" />
              </span>
            </div>
            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5">
              <span className="text-[11px] uppercase tracking-[0.2em] text-white/60">
                {project.client}
              </span>
              <span className="text-[11px] text-white/50">{project.year ?? ""}</span>
            </div>
          </Cover>
        </div>
        <div className="flex flex-col gap-3 p-6 sm:p-7">
          <h3 className="text-xl font-semibold text-white transition-colors group-hover:text-neon-bright sm:text-[22px]">
            {project.title}
          </h3>
          <p className="line-clamp-2 text-sm leading-relaxed text-zinc-400">
            {project.summary}
          </p>
          {project.results.length ? (
            <div className="mt-1 flex flex-wrap gap-2">
              {project.results.slice(0, 2).map((result) => (
                <span
                  key={result}
                  className="rounded-full border border-electric/15 bg-electric/[0.06] px-2.5 py-1 text-[10px] font-medium text-electric-bright/90"
                >
                  {result}
                </span>
              ))}
            </div>
          ) : null}
        </div>
      </Link>
    </motion.article>
  );
}
