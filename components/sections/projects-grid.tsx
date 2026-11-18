"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ProjectCard } from "@/components/ui/project-card";
import { cn } from "@/lib/utils";
import type { PublicProject } from "@/types/content";

export function ProjectsGrid({
  projects,
  categories,
}: {
  projects: PublicProject[];
  categories: string[];
}) {
  const [active, setActive] = useState("All");
  const reduce = useReducedMotion();

  const filters = useMemo(() => ["All", ...categories], [categories]);

  const filtered = useMemo(
    () =>
      active === "All"
        ? projects
        : projects.filter((project) => project.category === active),
    [active, projects],
  );

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {filters.map((filter) => {
          const isActive = filter === active;
          return (
            <button
              key={filter}
              type="button"
              onClick={() => setActive(filter)}
              className={cn(
                "rounded-full border px-4 py-2 text-xs font-medium transition-all duration-300",
                isActive
                  ? "border-transparent bg-white text-ink shadow-[0_0_30px_-6px_rgba(168,85,247,0.6)]"
                  : "border-white/10 bg-white/[0.02] text-zinc-400 hover:border-white/25 hover:text-white",
              )}
            >
              {filter}
            </button>
          );
        })}
      </div>

      <p className="mt-6 text-xs uppercase tracking-[0.18em] text-zinc-600">
        {filtered.length} project{filtered.length === 1 ? "" : "s"}
      </p>

      <motion.div layout className="mt-6 grid gap-5 md:grid-cols-2">
        <AnimatePresence mode="popLayout">
          {filtered.map((project, index) => (
            <motion.div
              key={project.id}
              layout
              initial={reduce ? false : { opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={reduce ? undefined : { opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <ProjectCard project={project} index={index} className="h-full" />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {!filtered.length ? (
        <div className="mt-10 rounded-2xl border border-dashed border-white/10 p-12 text-center text-sm text-zinc-500">
          No projects in this category yet. Check back soon.
        </div>
      ) : null}
    </div>
  );
}
