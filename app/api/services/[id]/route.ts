import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { serviceSchema } from "@/lib/validations";
import { handleApiError, jsonError, jsonOk } from "@/lib/api";

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(_request: Request, { params }: RouteContext) {
  try {
    const session = await getSession();
    if (!session) return jsonError("Unauthorized.", 401);

    const { id } = await params;
    const service = await prisma.service.findUnique({ where: { id } });
    if (!service) return jsonError("Service not found.", 404);
    return jsonOk(service);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function PATCH(request: Request, { params }: RouteContext) {
  try {
    const session = await getSession();
    if (!session) return jsonError("Unauthorized.", 401);

    const { id } = await params;
    const body = await request.json();
    const data = serviceSchema.partial().parse(body);
    const service = await prisma.service.update({ where: { id }, data });
    return jsonOk(service);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function DELETE(_request: Request, { params }: RouteContext) {
  try {
    const session = await getSession();
    if (!session) return jsonError("Unauthorized.", 401);

    const { id } = await params;
    await prisma.service.delete({ where: { id } });
    return jsonOk({ id });
  } catch (error) {
    return handleApiError(error);
  }
}
