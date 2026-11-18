import type { Metadata } from "next";
import Link from "next/link";
import { Pencil, Plus } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { buttonClasses } from "@/components/ui/button";
import { AdminPageHeading } from "@/components/admin/page-heading";
import { DeleteButton } from "@/components/admin/delete-button";
import { formatDate } from "@/lib/utils";

export const dynamic = "force-dynamic";

export const metadata: Metadata = { title: "Projects" };

export default async function AdminProjectsPage() {
  const projects = await prisma.project.findMany({
    orderBy: [{ order: "asc" }, { createdAt: "desc" }],
    include: { service: { select: { title: true } } },
  });

  return (
    <div>
      <AdminPageHeading
        title="Projects"
        description="Case studies shown in the portfolio and homepage highlights."
        actions={
          <Link
            href="/admin/projects/new"
            className={buttonClasses({ size: "sm" })}
          >
            <Plus className="h-3.5 w-3.5" /> New project
          </Link>
        }
      />

      <div className="admin-panel overflow-x-auto">
        <table className="admin-table min-w-[860px]">
          <thead>
            <tr>
              <th>Project</th>
              <th>Client</th>
              <th>Category</th>
              <th>Flags</th>
              <th>Status</th>
              <th>Updated</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr key={project.id}>
                <td>
                  <Link
                    href={`/admin/projects/${project.id}`}
                    className="font-medium text-zinc-200 transition-colors hover:text-white"
                  >
                    {project.title}
                  </Link>
                  <span className="mt-0.5 block text-[11px] text-zinc-600">
                    /projects/{project.slug}
                  </span>
                </td>
                <td className="text-zinc-400">{project.client}</td>
                <td>
                  <span className="rounded-full border border-white/10 bg-white/[0.03] px-2 py-0.5 text-[10px] text-zinc-400">
                    {project.category}
                  </span>
                </td>
                <td>
                  <div className="flex flex-wrap gap-1.5">
                    {project.featured ? (
                      <span className="rounded-full border border-neon/25 bg-neon/10 px-2 py-0.5 text-[10px] text-neon-bright">
                        Featured
                      </span>
                    ) : null}
                    {project.service ? (
                      <span className="rounded-full border border-electric/20 bg-electric/[0.07] px-2 py-0.5 text-[10px] text-electric-bright">
                        {project.service.title}
                      </span>
                    ) : null}
                    {!project.featured && !project.service ? (
                      <span className="text-[11px] text-zinc-700">—</span>
                    ) : null}
                  </div>
                </td>
                <td>
                  <span
                    className={`inline-flex items-center gap-1.5 text-[11px] ${
                      project.published ? "text-emerald-300" : "text-zinc-500"
                    }`}
                  >
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${
                        project.published ? "bg-emerald-400" : "bg-zinc-600"
                      }`}
                    />
                    {project.published ? "Published" : "Draft"}
                  </span>
                </td>
                <td className="whitespace-nowrap text-[11px] text-zinc-500">
                  {formatDate(project.updatedAt)}
                </td>
                <td>
                  <div className="flex items-center justify-end gap-2">
                    <Link
                      href={`/admin/projects/${project.id}`}
                      className={buttonClasses({
                        variant: "secondary",
                        size: "sm",
                      })}
                    >
                      <Pencil className="h-3 w-3" /> Edit
                    </Link>
                    <DeleteButton
                      endpoint={`/api/projects/${project.id}`}
                      confirmMessage={`Delete "${project.title}"? Linked testimonials will be unlinked.`}
                      compact
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {!projects.length ? (
          <div className="p-10 text-center">
            <p className="text-sm text-zinc-500">No projects yet.</p>
            <Link
              href="/admin/projects/new"
              className={buttonClasses({ size: "sm", className: "mt-4" })}
            >
              <Plus className="h-3.5 w-3.5" /> Add your first project
            </Link>
          </div>
        ) : null}
      </div>
    </div>
  );
}
