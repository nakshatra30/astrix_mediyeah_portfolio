import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Building2, Calendar, Mail, Phone, Wallet } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { AdminPageHeading } from "@/components/admin/page-heading";
import { DeleteButton } from "@/components/admin/delete-button";
import { StatusBadge } from "@/components/admin/status-badge";
import { EnquiryDetailForm } from "@/components/admin/enquiry-detail";
import { formatDate } from "@/lib/utils";

export const dynamic = "force-dynamic";

export const metadata: Metadata = { title: "Enquiry" };

export default async function AdminEnquiryDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const enquiry = await prisma.contactEnquiry.findUnique({ where: { id } });
  if (!enquiry) notFound();

  return (
    <div>
      <AdminPageHeading
        title={enquiry.name}
        description={`Received ${formatDate(enquiry.createdAt, true)}`}
        backHref="/admin/enquiries"
        backLabel="Back to enquiries"
        actions={
          <>
            <StatusBadge status={enquiry.status} />
            <a
              href={`mailto:${enquiry.email}?subject=Re: your Astrix Mediyeah enquiry`}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-4 py-2 text-[12px] text-zinc-200 transition-colors hover:border-white/30 hover:bg-white/[0.08]"
            >
              <Mail className="h-3.5 w-3.5" /> Reply by email
            </a>
            <DeleteButton
              endpoint={`/api/contact/${enquiry.id}`}
              redirectTo="/admin/enquiries"
              confirmMessage={`Delete the enquiry from ${enquiry.name}? This cannot be undone.`}
            />
          </>
        }
      />

      <div className="grid gap-4 lg:grid-cols-[1fr_360px]">
        <div className="space-y-4">
          <div className="admin-panel p-5 sm:p-6">
            <h3 className="text-sm font-medium text-white">Message</h3>
            <p className="mt-4 whitespace-pre-line text-[13px] leading-relaxed text-zinc-300">
              {enquiry.message}
            </p>
          </div>

          <div className="admin-panel p-5 sm:p-6">
            <h3 className="text-sm font-medium text-white">Context</h3>
            <dl className="mt-4 grid gap-4 sm:grid-cols-2">
              <div>
                <dt className="text-[10px] uppercase tracking-[0.14em] text-zinc-600">
                  Service
                </dt>
                <dd className="mt-1 text-[13px] text-zinc-300">
                  {enquiry.service ?? "Not specified"}
                </dd>
              </div>
              <div>
                <dt className="text-[10px] uppercase tracking-[0.14em] text-zinc-600">
                  Budget
                </dt>
                <dd className="mt-1 flex items-center gap-1.5 text-[13px] text-zinc-300">
                  <Wallet className="h-3.5 w-3.5 text-zinc-600" />
                  {enquiry.budget ?? "Not specified"}
                </dd>
              </div>
            </dl>
          </div>
        </div>

        <div className="space-y-4">
          <div className="admin-panel space-y-3 p-5">
            <h3 className="text-sm font-medium text-white">Contact</h3>
            <a
              href={`mailto:${enquiry.email}`}
              className="flex items-center gap-2.5 text-[12px] text-zinc-300 transition-colors hover:text-white"
            >
              <Mail className="h-3.5 w-3.5 text-zinc-600" />
              {enquiry.email}
            </a>
            {enquiry.phone ? (
              <a
                href={`tel:${enquiry.phone}`}
                className="flex items-center gap-2.5 text-[12px] text-zinc-300 transition-colors hover:text-white"
              >
                <Phone className="h-3.5 w-3.5 text-zinc-600" />
                {enquiry.phone}
              </a>
            ) : null}
            {enquiry.company ? (
              <p className="flex items-center gap-2.5 text-[12px] text-zinc-400">
                <Building2 className="h-3.5 w-3.5 text-zinc-600" />
                {enquiry.company}
              </p>
            ) : null}
            <p className="flex items-center gap-2.5 text-[12px] text-zinc-500">
              <Calendar className="h-3.5 w-3.5 text-zinc-600" />
              {formatDate(enquiry.createdAt, true)}
            </p>
          </div>

          <EnquiryDetailForm
            id={enquiry.id}
            initialStatus={enquiry.status}
            initialNotes={enquiry.notes ?? ""}
          />
        </div>
      </div>
    </div>
  );
}
