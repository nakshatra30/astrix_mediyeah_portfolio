import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { enquiryUpdateSchema } from "@/lib/validations";
import { handleApiError, jsonError, jsonOk } from "@/lib/api";

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(_request: Request, { params }: RouteContext) {
  try {
    const session = await getSession();
    if (!session) return jsonError("Unauthorized.", 401);

    const { id } = await params;
    const enquiry = await prisma.contactEnquiry.findUnique({ where: { id } });
    if (!enquiry) return jsonError("Enquiry not found.", 404);
    return jsonOk(enquiry);
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
    const data = enquiryUpdateSchema.parse(body);

    const enquiry = await prisma.contactEnquiry.update({
      where: { id },
      data,
    });
    return jsonOk(enquiry);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function DELETE(_request: Request, { params }: RouteContext) {
  try {
    const session = await getSession();
    if (!session) return jsonError("Unauthorized.", 401);

    const { id } = await params;
    await prisma.contactEnquiry.delete({ where: { id } });
    return jsonOk({ id });
  } catch (error) {
    return handleApiError(error);
  }
}
