import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { AdminPageHeading } from "@/components/admin/page-heading";
import { TestimonialForm } from "@/components/admin/testimonial-form";

export const dynamic = "force-dynamic";

export const metadata: Metadata = { title: "Edit testimonial" };

export default async function EditTestimonialPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [testimonial, projects] = await Promise.all([
    prisma.testimonial.findUnique({ where: { id } }),
    prisma.project.findMany({
      orderBy: { title: "asc" },
      select: { id: true, title: true },
    }),
  ]);

  if (!testimonial) notFound();

  return (
    <div>
      <AdminPageHeading
        title={testimonial.clientName}
        description={testimonial.clientRole}
        backHref="/admin/testimonials"
        backLabel="Back to testimonials"
      />
      <TestimonialForm
        projects={projects}
        initial={{
          id: testimonial.id,
          clientName: testimonial.clientName,
          clientRole: testimonial.clientRole,
          company: testimonial.company,
          content: testimonial.content,
          rating: testimonial.rating,
          avatarUrl: testimonial.avatarUrl,
          projectId: testimonial.projectId,
          order: testimonial.order,
          featured: testimonial.featured,
          published: testimonial.published,
        }}
      />
    </div>
  );
}
