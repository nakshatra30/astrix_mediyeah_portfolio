import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { testimonialSchema } from "@/lib/validations";
import {
  getPagination,
  handleApiError,
  jsonCreated,
  jsonError,
  jsonOk,
  paginationMeta,
} from "@/lib/api";

export async function GET(request: Request) {
  try {
    const session = await getSession();
    if (!session) return jsonError("Unauthorized.", 401);

    const { searchParams } = new URL(request.url);
    const { page, limit, skip } = getPagination(searchParams, 50);
    const query = searchParams.get("q")?.trim();

    const where = query
      ? {
          OR: [
            { clientName: { contains: query, mode: "insensitive" as const } },
            { company: { contains: query, mode: "insensitive" as const } },
          ],
        }
      : {};

    const [rows, total] = await Promise.all([
      prisma.testimonial.findMany({
        where,
        orderBy: [{ order: "asc" }, { createdAt: "desc" }],
        include: { project: { select: { id: true, title: true } } },
        skip,
        take: limit,
      }),
      prisma.testimonial.count({ where }),
    ]);

    return jsonOk(rows, paginationMeta(total, page, limit));
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(request: Request) {
  try {
    const session = await getSession();
    if (!session) return jsonError("Unauthorized.", 401);

    const body = await request.json();
    const data = testimonialSchema.parse(body);
    const testimonial = await prisma.testimonial.create({
      data,
      include: { project: { select: { id: true, title: true } } },
    });
    return jsonCreated(testimonial);
  } catch (error) {
    return handleApiError(error);
  }
}
