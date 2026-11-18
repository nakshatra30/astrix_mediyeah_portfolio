import type { Metadata } from "next";
import Link from "next/link";
import { Pencil, Plus, Star } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { buttonClasses } from "@/components/ui/button";
import { AdminPageHeading } from "@/components/admin/page-heading";
import { DeleteButton } from "@/components/admin/delete-button";
import { formatDate } from "@/lib/utils";

export const dynamic = "force-dynamic";

export const metadata: Metadata = { title: "Testimonials" };

export default async function AdminTestimonialsPage() {
  const testimonials = await prisma.testimonial.findMany({
    orderBy: [{ order: "asc" }, { createdAt: "desc" }],
    include: { project: { select: { title: true } } },
  });

  return (
    <div>
      <AdminPageHeading
        title="Testimonials"
        description="Client quotes used across the site."
        actions={
          <Link
            href="/admin/testimonials/new"
            className={buttonClasses({ size: "sm" })}
          >
            <Plus className="h-3.5 w-3.5" /> New testimonial
          </Link>
        }
      />

      <div className="admin-panel overflow-x-auto">
        <table className="admin-table min-w-[820px]">
          <thead>
            <tr>
              <th>Client</th>
              <th>Quote</th>
              <th>Rating</th>
              <th>Project</th>
              <th>Status</th>
              <th>Updated</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {testimonials.map((testimonial) => (
              <tr key={testimonial.id}>
                <td>
                  <Link
                    href={`/admin/testimonials/${testimonial.id}`}
                    className="font-medium text-zinc-200 transition-colors hover:text-white"
                  >
                    {testimonial.clientName}
                  </Link>
                  <span className="mt-0.5 block text-[11px] text-zinc-600">
                    {testimonial.clientRole}
                    {testimonial.company ? ` · ${testimonial.company}` : ""}
                  </span>
                </td>
                <td className="max-w-[280px]">
                  <p className="line-clamp-2 text-[12px] text-zinc-400">
                    {testimonial.content}
                  </p>
                </td>
                <td>
                  <span className="inline-flex items-center gap-1 text-[11px] text-amber-300">
                    <Star className="h-3 w-3 fill-current" />
                    {testimonial.rating}
                  </span>
                </td>
                <td className="text-[11px] text-zinc-500">
                  {testimonial.project?.title ?? "—"}
                </td>
                <td>
                  <span
                    className={`inline-flex items-center gap-1.5 text-[11px] ${
                      testimonial.published ? "text-emerald-300" : "text-zinc-500"
                    }`}
                  >
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${
                        testimonial.published ? "bg-emerald-400" : "bg-zinc-600"
                      }`}
                    />
                    {testimonial.published ? "Published" : "Draft"}
                  </span>
                </td>
                <td className="whitespace-nowrap text-[11px] text-zinc-500">
                  {formatDate(testimonial.updatedAt)}
                </td>
                <td>
                  <div className="flex items-center justify-end gap-2">
                    <Link
                      href={`/admin/testimonials/${testimonial.id}`}
                      className={buttonClasses({
                        variant: "secondary",
                        size: "sm",
                      })}
                    >
                      <Pencil className="h-3 w-3" /> Edit
                    </Link>
                    <DeleteButton
                      endpoint={`/api/testimonials/${testimonial.id}`}
                      confirmMessage={`Delete the testimonial from ${testimonial.clientName}?`}
                      compact
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {!testimonials.length ? (
          <div className="p-10 text-center">
            <p className="text-sm text-zinc-500">No testimonials yet.</p>
            <Link
              href="/admin/testimonials/new"
              className={buttonClasses({ size: "sm", className: "mt-4" })}
            >
              <Plus className="h-3.5 w-3.5" /> Add your first testimonial
            </Link>
          </div>
        ) : null}
      </div>
    </div>
  );
}
