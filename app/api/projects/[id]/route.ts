import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { projectSchema } from "@/lib/validations";
import { handleApiError, jsonError, jsonOk } from "@/lib/api";

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(_request: Request, { params }: RouteContext) {
  try {
    const session = await getSession();
    if (!session) return jsonError("Unauthorized.", 401);

    const { id } = await params;
    const project = await prisma.project.findUnique({
      where: { id },
      include: { service: { select: { id: true, title: true } } },
    });
    if (!project) return jsonError("Project not found.", 404);
    return jsonOk(project);
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
    const data = projectSchema.partial().parse(body);
    const project = await prisma.project.update({
      where: { id },
      data,
      include: { service: { select: { id: true, title: true } } },
    });
    return jsonOk(project);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function DELETE(_request: Request, { params }: RouteContext) {
  try {
    const session = await getSession();
    if (!session) return jsonError("Unauthorized.", 401);

    const { id } = await params;
    await prisma.project.delete({ where: { id } });
    return jsonOk({ id });
  } catch (error) {
    return handleApiError(error);
  }
}
