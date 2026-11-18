import type { Metadata } from "next";
import Link from "next/link";
import { Pencil, Plus } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { buttonClasses } from "@/components/ui/button";
import { AdminPageHeading } from "@/components/admin/page-heading";
import { DeleteButton } from "@/components/admin/delete-button";
import { formatDate } from "@/lib/utils";

export const dynamic = "force-dynamic";

export const metadata: Metadata = { title: "Services" };

export default async function AdminServicesPage() {
  const services = await prisma.service.findMany({
    orderBy: [{ order: "asc" }, { createdAt: "asc" }],
  });

  return (
    <div>
      <AdminPageHeading
        title="Services"
        description="Manage the capabilities shown across the website."
        actions={
          <Link
            href="/admin/services/new"
            className={buttonClasses({ size: "sm" })}
          >
            <Plus className="h-3.5 w-3.5" /> New service
          </Link>
        }
      />

      <div className="admin-panel overflow-x-auto">
        <table className="admin-table min-w-[760px]">
          <thead>
            <tr>
              <th>Service</th>
              <th>Order</th>
              <th>Flags</th>
              <th>Status</th>
              <th>Updated</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {services.map((service) => (
              <tr key={service.id}>
                <td>
                  <Link
                    href={`/admin/services/${service.id}`}
                    className="font-medium text-zinc-200 transition-colors hover:text-white"
                  >
                    {service.title}
                  </Link>
                  <span className="mt-0.5 block text-[11px] text-zinc-600">
                    /services/{service.slug}
                  </span>
                </td>
                <td className="text-zinc-500">{service.order}</td>
                <td>
                  {service.featured ? (
                    <span className="rounded-full border border-neon/25 bg-neon/10 px-2 py-0.5 text-[10px] text-neon-bright">
                      Featured
                    </span>
                  ) : (
                    <span className="text-[11px] text-zinc-700">—</span>
                  )}
                </td>
                <td>
                  <span
                    className={`inline-flex items-center gap-1.5 text-[11px] ${
                      service.published ? "text-emerald-300" : "text-zinc-500"
                    }`}
                  >
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${
                        service.published ? "bg-emerald-400" : "bg-zinc-600"
                      }`}
                    />
                    {service.published ? "Published" : "Draft"}
                  </span>
                </td>
                <td className="whitespace-nowrap text-[11px] text-zinc-500">
                  {formatDate(service.updatedAt)}
                </td>
                <td>
                  <div className="flex items-center justify-end gap-2">
                    <Link
                      href={`/admin/services/${service.id}`}
                      className={buttonClasses({
                        variant: "secondary",
                        size: "sm",
                      })}
                    >
                      <Pencil className="h-3 w-3" /> Edit
                    </Link>
                    <DeleteButton
                      endpoint={`/api/services/${service.id}`}
                      confirmMessage={`Delete "${service.title}"? Projects linked to it will be unlinked, not deleted.`}
                      compact
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {!services.length ? (
          <div className="p-10 text-center">
            <p className="text-sm text-zinc-500">No services yet.</p>
            <Link
              href="/admin/services/new"
              className={buttonClasses({ size: "sm", className: "mt-4" })}
            >
              <Plus className="h-3.5 w-3.5" /> Add your first service
            </Link>
          </div>
        ) : null}
      </div>
    </div>
  );
}
