import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { projectSchema } from "@/lib/validations";
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
    const category = searchParams.get("category")?.trim();

    const where = {
      ...(category && category !== "ALL" ? { category } : {}),
      ...(query
        ? {
            OR: [
              { title: { contains: query, mode: "insensitive" as const } },
              { client: { contains: query, mode: "insensitive" as const } },
            ],
          }
        : {}),
    };

    const [rows, total] = await Promise.all([
      prisma.project.findMany({
        where,
        orderBy: [{ order: "asc" }, { createdAt: "desc" }],
        include: { service: { select: { id: true, title: true } } },
        skip,
        take: limit,
      }),
      prisma.project.count({ where }),
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
    const data = projectSchema.parse(body);
    const project = await prisma.project.create({
      data,
      include: { service: { select: { id: true, title: true } } },
    });
    return jsonCreated(project);
  } catch (error) {
    return handleApiError(error);
  }
}
