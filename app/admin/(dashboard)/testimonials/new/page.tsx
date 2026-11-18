import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { AdminPageHeading } from "@/components/admin/page-heading";
import { TestimonialForm } from "@/components/admin/testimonial-form";

export const dynamic = "force-dynamic";

export const metadata: Metadata = { title: "New testimonial" };

export default async function NewTestimonialPage() {
  const projects = await prisma.project.findMany({
    orderBy: { title: "asc" },
    select: { id: true, title: true },
  });

  return (
    <div>
      <AdminPageHeading
        title="New testimonial"
        description="Add a client quote to the testimonial collection."
        backHref="/admin/testimonials"
        backLabel="Back to testimonials"
      />
      <TestimonialForm projects={projects} />
    </div>
  );
}
