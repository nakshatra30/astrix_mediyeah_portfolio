import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { AdminPageHeading } from "@/components/admin/page-heading";
import { MediaLibrary, type MediaItem } from "@/components/admin/media-library";

export const dynamic = "force-dynamic";

export const metadata: Metadata = { title: "Media" };

export default async function AdminMediaPage() {
  const rows = await prisma.media.findMany({
    orderBy: { createdAt: "desc" },
    take: 60,
  });

  const items: MediaItem[] = rows.map((row) => ({
    id: row.id,
    name: row.name,
    url: row.url,
    alt: row.alt,
    type: row.type as MediaItem["type"],
    createdAt: row.createdAt.toISOString(),
  }));

  return (
    <div>
      <AdminPageHeading
        title="Media"
        description="A shared library of image, document and video URLs. Paste these URLs into services, projects or testimonials."
      />
      <MediaLibrary initial={items} />
    </div>
  );
}
