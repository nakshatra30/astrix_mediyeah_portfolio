import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { handleApiError, jsonError, jsonOk } from "@/lib/api";

export async function GET() {
  try {
    const session = await getSession();
    if (!session) return jsonError("Unauthorized.", 401);

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
      prisma.contactEnquiry.findMany({
        orderBy: { createdAt: "desc" },
        take: 5,
      }),
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

    return jsonOk({
      counts: {
        services,
        projects,
        testimonials,
        enquiries,
        newEnquiries,
        media,
      },
      recentEnquiries,
      recentProjects,
    });
  } catch (error) {
    return handleApiError(error);
  }
}
