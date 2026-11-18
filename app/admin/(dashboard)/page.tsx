import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowUpRight,
  FolderKanban,
  Images,
  Inbox,
  Layers,
  Plus,
  Quote,
  Sparkles,
} from "lucide-react";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { formatDate, truncate } from "@/lib/utils";
import { StatCard } from "@/components/admin/stat-card";
import { StatusBadge } from "@/components/admin/status-badge";

export const dynamic = "force-dynamic";

export const metadata: Metadata = { title: "Overview" };

const QUICK_ACTIONS = [
  { label: "Add project", href: "/admin/projects/new", icon: FolderKanban },
  { label: "Add service", href: "/admin/services/new", icon: Layers },
  { label: "Add testimonial", href: "/admin/testimonials/new", icon: Quote },
  { label: "Edit content", href: "/admin/content", icon: Sparkles },
];

export default async function AdminOverviewPage() {
  const session = await getSession();

  const [
    services,
    projects,
    testimonials,
    enquiries,
    newEnquiries,
    media,
    recentEnquiries,
    recentProjects,
  ] = await Promise.all([
    prisma.service.count(),
    prisma.project.count(),
    prisma.testimonial.count(),
    prisma.contactEnquiry.count(),
    prisma.contactEnquiry.count({ where: { status: "NEW" } }),
    prisma.media.count(),
    prisma.contactEnquiry.findMany({ orderBy: { createdAt: "desc" }, take: 5 }),
    prisma.project.findMany({
      orderBy: { createdAt: "desc" },
      take: 4,
      select: {
        id: true,
        title: true,
        client: true,
        category: true,
        createdAt: true,
        published: true,
      },
    }),
  ]);

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-600">
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              day: "numeric",
              month: "long",
            })}
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-white sm:text-3xl">
            Welcome back, {session?.name.split(" ")[0] ?? "Admin"}.
          </h2>
          <p className="mt-2 text-sm text-zinc-500">
            Here&apos;s what&apos;s happening across the site right now.
          </p>
        </div>
        <Link
          href="/admin/enquiries"
          className="group inline-flex items-center gap-2 self-start rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-xs text-zinc-300 transition-colors hover:border-neon/35 hover:text-white"
        >
          <Inbox className="h-3.5 w-3.5" />
          {newEnquiries} new enqu{newEnquiries === 1 ? "iry" : "iries"}
          <ArrowUpRight className="h-3 w-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </Link>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        <StatCard
          label="Enquiries"
          value={enquiries}
          hint={`${newEnquiries} awaiting response`}
          icon={<Inbox className="h-4 w-4" />}
          accent="electric"
        />
        <StatCard
          label="Projects"
          value={projects}
          hint="Portfolio case studies"
          icon={<FolderKanban className="h-4 w-4" />}
          accent="neon"
        />
        <StatCard
          label="Services"
          value={services}
          hint="Published capabilities"
          icon={<Layers className="h-4 w-4" />}
          accent="emerald"
        />
        <StatCard
          label="Testimonials"
          value={testimonials}
          hint="Client social proof"
          icon={<Quote className="h-4 w-4" />}
          accent="amber"
        />
        <StatCard
          label="Media assets"
          value={media}
          hint="Images and documents"
          icon={<Images className="h-4 w-4" />}
          accent="electric"
        />
        <StatCard
          label="New this week"
          value={recentEnquiries.filter(
            (item) =>
              item.createdAt.getTime() > Date.now() - 7 * 24 * 60 * 60 * 1000,
          ).length}
          hint="Enquiries in the last 7 days"
          icon={<Sparkles className="h-4 w-4" />}
          accent="neon"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {QUICK_ACTIONS.map((action) => (
          <Link
            key={action.href}
            href={action.href}
            className="group flex items-center gap-3 rounded-xl border border-white/[0.07] bg-white/[0.02] px-4 py-3.5 text-[13px] text-zinc-300 transition-colors hover:border-neon/30 hover:text-white"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] text-neon-bright">
              <action.icon className="h-4 w-4" />
            </span>
            {action.label}
            <Plus className="ml-auto h-3.5 w-3.5 text-zinc-600 transition-colors group-hover:text-electric-bright" />
          </Link>
        ))}
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="admin-panel overflow-hidden">
          <div className="flex items-center justify-between border-b border-white/[0.07] px-5 py-4">
            <div>
              <h3 className="text-sm font-medium text-white">Recent enquiries</h3>
              <p className="mt-0.5 text-[11px] text-zinc-600">
                Latest messages from the contact form
              </p>
            </div>
            <Link
              href="/admin/enquiries"
              className="text-[11px] text-zinc-400 transition-colors hover:text-white"
            >
              View all
            </Link>
          </div>

          {recentEnquiries.length ? (
            <div className="divide-y divide-white/[0.05]">
              {recentEnquiries.map((enquiry) => (
                <Link
                  key={enquiry.id}
                  href="/admin/enquiries"
                  className="flex items-start gap-3 px-5 py-4 transition-colors hover:bg-white/[0.02]"
                >
                  <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-neon/25 to-electric/15 text-[10px] font-semibold text-white">
                    {enquiry.name
                      .split(" ")
                      .slice(0, 2)
                      .map((part) => part[0])
                      .join("")}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="flex items-center justify-between gap-3">
                      <span className="truncate text-[13px] font-medium text-zinc-200">
                        {enquiry.name}
                        {enquiry.company ? (
                          <span className="ml-1.5 text-zinc-600">
                            · {enquiry.company}
                          </span>
                        ) : null}
                      </span>
                      <span className="shrink-0 text-[10px] text-zinc-600">
                        {formatDate(enquiry.createdAt)}
                      </span>
                    </span>
                    <span className="mt-1 block truncate text-[11px] text-zinc-500">
                      {truncate(enquiry.message, 90)}
                    </span>
                  </span>
                  <StatusBadge status={enquiry.status} />
                </Link>
              ))}
            </div>
          ) : (
            <p className="px-5 py-10 text-center text-xs text-zinc-600">
              No enquiries yet.
            </p>
          )}
        </div>

        <div className="admin-panel overflow-hidden">
          <div className="border-b border-white/[0.07] px-5 py-4">
            <h3 className="text-sm font-medium text-white">Latest projects</h3>
            <p className="mt-0.5 text-[11px] text-zinc-600">
              Recently added case studies
            </p>
          </div>
          {recentProjects.length ? (
            <div className="divide-y divide-white/[0.05]">
              {recentProjects.map((project) => (
                <Link
                  key={project.id}
                  href={`/admin/projects/${project.id}`}
                  className="flex items-center gap-3 px-5 py-3.5 transition-colors hover:bg-white/[0.02]"
                >
                  <span className="h-9 w-9 shrink-0 rounded-lg bg-[linear-gradient(135deg,rgba(168,85,247,0.4),rgba(34,211,238,0.25))]" />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[13px] text-zinc-200">
                      {project.title}
                    </span>
                    <span className="block truncate text-[10px] text-zinc-600">
                      {project.client} · {project.category}
                    </span>
                  </span>
                  <span
                    className={`h-1.5 w-1.5 shrink-0 rounded-full ${
                      project.published ? "bg-emerald-400" : "bg-zinc-600"
                    }`}
                    title={project.published ? "Published" : "Draft"}
                  />
                </Link>
              ))}
            </div>
          ) : (
            <p className="px-5 py-10 text-center text-xs text-zinc-600">
              No projects yet.
            </p>
          )}
          <div className="border-t border-white/[0.07] p-4">
            <Link
              href="/admin/projects/new"
              className="flex items-center justify-center gap-2 rounded-lg border border-dashed border-white/10 px-4 py-2.5 text-[11px] text-zinc-500 transition-colors hover:border-neon/30 hover:text-zinc-200"
            >
              <Plus className="h-3.5 w-3.5" /> New project
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
