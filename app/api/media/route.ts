import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { mediaSchema } from "@/lib/validations";
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
    const { page, limit, skip } = getPagination(searchParams, 60);
    const query = searchParams.get("q")?.trim();

    const where = query
      ? { name: { contains: query, mode: "insensitive" as const } }
      : {};

    const [rows, total] = await Promise.all([
      prisma.media.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
      }),
      prisma.media.count({ where }),
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
    const data = mediaSchema.parse(body);
    const media = await prisma.media.create({
      data: { ...data, uploadedById: session.adminId },
    });
    return jsonCreated(media);
  } catch (error) {
    return handleApiError(error);
  }
}
