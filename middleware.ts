import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose/jwt/verify";

const SESSION_COOKIE = "astrix_session";

async function hasValidSession(request: NextRequest) {
  const token = request.cookies.get(SESSION_COOKIE)?.value;
  const secret = process.env.AUTH_SECRET;
  if (!token || !secret || secret.length < 32) return false;

  try {
    await jwtVerify(token, new TextEncoder().encode(secret), {
      algorithms: ["HS256"],
      issuer: "astrix-mediyeah",
      audience: "astrix-admin",
    });
    return true;
  } catch {
    return false;
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const authenticated = await hasValidSession(request);

  if (pathname === "/admin/login") {
    if (authenticated) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
    return NextResponse.next();
  }

  if (!authenticated) {
    const loginUrl = new URL("/admin/login", request.url);
    loginUrl.searchParams.set("next", pathname);
    const response = NextResponse.redirect(loginUrl);
    if (request.cookies.has(SESSION_COOKIE)) {
      response.cookies.delete(SESSION_COOKIE);
    }
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
