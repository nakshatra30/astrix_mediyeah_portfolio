import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { AdminPageHeading } from "@/components/admin/page-heading";
import { ProjectForm } from "@/components/admin/project-form";

export const dynamic = "force-dynamic";

export const metadata: Metadata = { title: "Edit project" };

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [project, services] = await Promise.all([
    prisma.project.findUnique({ where: { id } }),
    prisma.service.findMany({
      orderBy: { order: "asc" },
      select: { id: true, title: true },
    }),
  ]);

  if (!project) notFound();

  return (
    <div>
      <AdminPageHeading
        title={project.title}
        description={`Editing /projects/${project.slug}`}
        backHref="/admin/projects"
        backLabel="Back to projects"
      />
      <ProjectForm
        services={services}
        initial={{
          id: project.id,
          title: project.title,
          slug: project.slug,
          client: project.client,
          category: project.category,
          summary: project.summary,
          description: project.description,
          imageUrl: project.imageUrl,
          gallery: project.gallery,
          results: project.results,
          liveUrl: project.liveUrl,
          year: project.year,
          order: project.order,
          featured: project.featured,
          published: project.published,
          serviceId: project.serviceId,
        }}
      />
    </div>
  );
}
