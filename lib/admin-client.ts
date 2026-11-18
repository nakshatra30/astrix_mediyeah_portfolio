import type { ApiResponse } from "@/types";

export type SubmitResult<T> =
  | { ok: true; data: T }
  | { ok: false; message: string; errors: Record<string, string[]> };

export async function submitJson<T>(
  endpoint: string,
  method: "POST" | "PATCH" | "PUT",
  body: unknown,
): Promise<SubmitResult<T>> {
  try {
    const response = await fetch(endpoint, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const payload = (await response.json()) as ApiResponse<T>;

    if (!response.ok || !payload.success) {
      if (!payload.success) {
        return {
          ok: false,
          message: payload.error.message,
          errors:
            (payload.error.details as Record<string, string[]> | undefined) ??
            {},
        };
      }
      return { ok: false, message: "Request failed.", errors: {} };
    }

    return { ok: true, data: payload.data };
  } catch {
    return {
      ok: false,
      message: "Network error. Please try again.",
      errors: {},
    };
  }
}
