import { prisma } from "@/lib/prisma";
import { loginSchema } from "@/lib/validations";
import { DUMMY_PASSWORD_HASH, verifyPassword } from "@/lib/password";
import {
  SESSION_COOKIE,
  createSessionToken,
  sessionCookieOptions,
} from "@/lib/auth";
import { handleApiError, jsonError, jsonOk } from "@/lib/api";
import { clientIp, rateLimit } from "@/lib/rate-limit";

export async function POST(request: Request) {
  try {
    const ip = clientIp(request);
    const limit = rateLimit(`login:${ip}`, 6, 15 * 60 * 1000);
    if (!limit.ok) {
      return jsonError(
        "Too many attempts. Please wait a few minutes and try again.",
        429,
      );
    }

    const body = await request.json();
    const { email, password } = loginSchema.parse(body);

    const admin = await prisma.admin.findUnique({ where: { email } });
    const valid = await verifyPassword(
      password,
      admin?.passwordHash ?? DUMMY_PASSWORD_HASH,
    );

    if (!admin || !valid) {
      return jsonError("Invalid email or password.", 401);
    }

    await prisma.admin.update({
      where: { id: admin.id },
      data: { lastLoginAt: new Date() },
    });

    const token = await createSessionToken({
      adminId: admin.id,
      email: admin.email,
      name: admin.name,
      role: admin.role,
    });

    const response = jsonOk({
      adminId: admin.id,
      email: admin.email,
      name: admin.name,
      role: admin.role,
    });
    response.cookies.set(SESSION_COOKIE, token, sessionCookieOptions());
    return response;
  } catch (error) {
    return handleApiError(error);
  }
}
