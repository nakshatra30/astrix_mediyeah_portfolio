import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { testimonialSchema } from "@/lib/validations";
import { handleApiError, jsonError, jsonOk } from "@/lib/api";

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(_request: Request, { params }: RouteContext) {
  try {
    const session = await getSession();
    if (!session) return jsonError("Unauthorized.", 401);

    const { id } = await params;
    const testimonial = await prisma.testimonial.findUnique({
      where: { id },
      include: { project: { select: { id: true, title: true } } },
    });
    if (!testimonial) return jsonError("Testimonial not found.", 404);
    return jsonOk(testimonial);
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
    const data = testimonialSchema.partial().parse(body);
    const testimonial = await prisma.testimonial.update({
      where: { id },
      data,
      include: { project: { select: { id: true, title: true } } },
    });
    return jsonOk(testimonial);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function DELETE(_request: Request, { params }: RouteContext) {
  try {
    const session = await getSession();
    if (!session) return jsonError("Unauthorized.", 401);

    const { id } = await params;
    await prisma.testimonial.delete({ where: { id } });
    return jsonOk({ id });
  } catch (error) {
    return handleApiError(error);
  }
}
