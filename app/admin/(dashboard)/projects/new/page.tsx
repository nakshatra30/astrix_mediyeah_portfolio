import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { AdminPageHeading } from "@/components/admin/page-heading";
import { ProjectForm } from "@/components/admin/project-form";

export const dynamic = "force-dynamic";

export const metadata: Metadata = { title: "New project" };

export default async function NewProjectPage() {
  const services = await prisma.service.findMany({
    orderBy: { order: "asc" },
    select: { id: true, title: true },
  });

  return (
    <div>
      <AdminPageHeading
        title="New project"
        description="Add a case study to the portfolio."
        backHref="/admin/projects"
        backLabel="Back to projects"
      />
      <ProjectForm services={services} />
    </div>
  );
}
