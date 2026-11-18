import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { handleApiError, jsonError, jsonOk } from "@/lib/api";

type RouteContext = { params: Promise<{ id: string }> };

export async function DELETE(_request: Request, { params }: RouteContext) {
  try {
    const session = await getSession();
    if (!session) return jsonError("Unauthorized.", 401);

    const { id } = await params;
    await prisma.media.delete({ where: { id } });
    return jsonOk({ id });
  } catch (error) {
    return handleApiError(error);
  }
}
