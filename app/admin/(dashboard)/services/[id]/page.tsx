import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { AdminPageHeading } from "@/components/admin/page-heading";
import { ServiceForm } from "@/components/admin/service-form";

export const dynamic = "force-dynamic";

export const metadata: Metadata = { title: "Edit service" };

export default async function EditServicePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const service = await prisma.service.findUnique({ where: { id } });
  if (!service) notFound();

  return (
    <div>
      <AdminPageHeading
        title={service.title}
        description={`Editing /services/${service.slug}`}
        backHref="/admin/services"
        backLabel="Back to services"
      />
      <ServiceForm
        initial={{
          id: service.id,
          title: service.title,
          slug: service.slug,
          shortDescription: service.shortDescription,
          description: service.description,
          icon: service.icon,
          features: service.features,
          imageUrl: service.imageUrl,
          price: service.price,
          order: service.order,
          featured: service.featured,
          published: service.published,
        }}
      />
    </div>
  );
}
