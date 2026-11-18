import { SESSION_COOKIE, sessionCookieOptions } from "@/lib/auth";
import { jsonOk } from "@/lib/api";

export async function POST() {
  const response = jsonOk({ loggedOut: true });
  response.cookies.set(SESSION_COOKIE, "", {
    ...sessionCookieOptions(),
    maxAge: 0,
  });
  return response;
}
