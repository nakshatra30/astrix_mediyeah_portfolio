import type { Metadata } from "next";
import Link from "next/link";
import type { EnquiryStatus } from "@prisma/client";
import { Mail } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { AdminPageHeading } from "@/components/admin/page-heading";
import { StatusBadge } from "@/components/admin/status-badge";
import { formatDate } from "@/lib/utils";

export const dynamic = "force-dynamic";

export const metadata: Metadata = { title: "Enquiries" };

const STATUSES: { value: EnquiryStatus; label: string }[] = [
  { value: "NEW", label: "New" },
  { value: "IN_PROGRESS", label: "In progress" },
  { value: "RESPONDED", label: "Responded" },
  { value: "CLOSED", label: "Closed" },
];

export default async function AdminEnquiriesPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const params = await searchParams;
  const active = STATUSES.some((entry) => entry.value === params.status)
    ? (params.status as EnquiryStatus)
    : undefined;

  const [enquiries, counts] = await Promise.all([
    prisma.contactEnquiry.findMany({
      where: active ? { status: active } : {},
      orderBy: { createdAt: "desc" },
      take: 100,
    }),
    prisma.contactEnquiry.groupBy({
      by: ["status"],
      _count: { _all: true },
    }),
  ]);

  const countMap = Object.fromEntries(
    counts.map((entry) => [entry.status, entry._count._all]),
  ) as Record<string, number>;
  const total = counts.reduce((sum, entry) => sum + entry._count._all, 0);

  return (
    <div>
      <AdminPageHeading
        title="Enquiries"
        description="Inbound messages from the contact form."
      />

      <div className="mb-4 flex flex-wrap items-center gap-2">
        <Link
          href="/admin/enquiries"
          className={`rounded-full border px-3 py-1.5 text-[11px] transition-colors ${
            !active
              ? "border-white/20 bg-white/[0.07] text-white"
              : "border-white/[0.08] text-zinc-500 hover:text-zinc-200"
          }`}
        >
          All <span className="ml-1 text-zinc-600">{total}</span>
        </Link>
        {STATUSES.map((status) => (
          <Link
            key={status.value}
            href={`/admin/enquiries?status=${status.value}`}
            className={`rounded-full border px-3 py-1.5 text-[11px] transition-colors ${
              active === status.value
                ? "border-white/20 bg-white/[0.07] text-white"
                : "border-white/[0.08] text-zinc-500 hover:text-zinc-200"
            }`}
          >
            {status.label}{" "}
            <span className="ml-1 text-zinc-600">
              {countMap[status.value] ?? 0}
            </span>
          </Link>
        ))}
      </div>

      <div className="admin-panel overflow-x-auto">
        <table className="admin-table min-w-[820px]">
          <thead>
            <tr>
              <th>Contact</th>
              <th>Service</th>
              <th>Budget</th>
              <th>Status</th>
              <th>Received</th>
              <th className="text-right">Open</th>
            </tr>
          </thead>
          <tbody>
            {enquiries.map((enquiry) => (
              <tr key={enquiry.id}>
                <td>
                  <Link
                    href={`/admin/enquiries/${enquiry.id}`}
                    className="font-medium text-zinc-200 transition-colors hover:text-white"
                  >
                    {enquiry.name}
                  </Link>
                  <span className="mt-0.5 block text-[11px] text-zinc-600">
                    {enquiry.company ? `${enquiry.company} · ` : ""}
                    {enquiry.email}
                  </span>
                </td>
                <td className="text-[12px] text-zinc-400">
                  {enquiry.service ?? "—"}
                </td>
                <td className="text-[12px] text-zinc-400">
                  {enquiry.budget ?? "—"}
                </td>
                <td>
                  <StatusBadge status={enquiry.status} />
                </td>
                <td className="whitespace-nowrap text-[11px] text-zinc-500">
                  {formatDate(enquiry.createdAt, true)}
                </td>
                <td>
                  <div className="flex justify-end">
                    <Link
                      href={`/admin/enquiries/${enquiry.id}`}
                      className="inline-flex items-center gap-1 text-[11px] text-zinc-500 transition-colors hover:text-white"
                    >
                      <Mail className="h-3 w-3" /> View
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {!enquiries.length ? (
          <div className="p-10 text-center">
            <Mail className="mx-auto h-6 w-6 text-zinc-700" />
            <p className="mt-3 text-sm text-zinc-500">
              No enquiries {active ? "with this status" : "yet"}.
            </p>
          </div>
        ) : null}
      </div>
    </div>
  );
}
