import type { Metadata } from "next";
import { AdminPageHeading } from "@/components/admin/page-heading";
import { ServiceForm } from "@/components/admin/service-form";

export const metadata: Metadata = { title: "New service" };

export default function NewServicePage() {
  return (
    <div>
      <AdminPageHeading
        title="New service"
        description="Add a capability to the public services page."
        backHref="/admin/services"
        backLabel="Back to services"
      />
      <ServiceForm />
    </div>
  );
}
