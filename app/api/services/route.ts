import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { serviceSchema } from "@/lib/validations";
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
            { title: { contains: query, mode: "insensitive" as const } },
            { slug: { contains: query, mode: "insensitive" as const } },
          ],
        }
      : {};

    const [rows, total] = await Promise.all([
      prisma.service.findMany({
        where,
        orderBy: [{ order: "asc" }, { createdAt: "asc" }],
        skip,
        take: limit,
      }),
      prisma.service.count({ where }),
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
    const data = serviceSchema.parse(body);
    const service = await prisma.service.create({ data });
    return jsonCreated(service);
  } catch (error) {
    return handleApiError(error);
  }
}
