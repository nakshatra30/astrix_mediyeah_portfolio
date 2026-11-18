import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { contactSchema } from "@/lib/validations";
import {
  getPagination,
  handleApiError,
  jsonCreated,
  jsonError,
  jsonOk,
  paginationMeta,
} from "@/lib/api";
import { clientIp, rateLimit } from "@/lib/rate-limit";

export async function POST(request: Request) {
  try {
    const ip = clientIp(request);
    const limit = rateLimit(`contact:${ip}`, 5, 60 * 60 * 1000);
    if (!limit.ok) {
      return jsonError(
        "You've sent several enquiries already. Please email us directly if it's urgent.",
        429,
      );
    }

    const body = await request.json();
    const data = contactSchema.parse(body);

    if (body?.website) {
      return jsonError("Spam detected.", 400);
    }

    const enquiry = await prisma.contactEnquiry.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone ?? null,
        company: data.company ?? null,
        service: data.service ?? null,
        budget: data.budget ?? null,
        message: data.message,
      },
      select: { id: true, createdAt: true },
    });

    return jsonCreated(enquiry);
  } catch (error) {
    return handleApiError(error);
  }
}

export async function GET(request: Request) {
  try {
    const session = await getSession();
    if (!session) return jsonError("Unauthorized.", 401);

    const { searchParams } = new URL(request.url);
    const { page, limit, skip } = getPagination(searchParams, 15);
    const status = searchParams.get("status");
    const query = searchParams.get("q")?.trim();

    const where = {
      ...(status && status !== "ALL"
        ? { status: status as "NEW" | "IN_PROGRESS" | "RESPONDED" | "CLOSED" }
        : {}),
      ...(query
        ? {
            OR: [
              { name: { contains: query, mode: "insensitive" as const } },
              { email: { contains: query, mode: "insensitive" as const } },
              { company: { contains: query, mode: "insensitive" as const } },
            ],
          }
        : {}),
    };

    const [rows, total] = await Promise.all([
      prisma.contactEnquiry.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
      }),
      prisma.contactEnquiry.count({ where }),
    ]);

    return jsonOk(rows, paginationMeta(total, page, limit));
  } catch (error) {
    return handleApiError(error);
  }
}
