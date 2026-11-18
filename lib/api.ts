import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { ZodError } from "zod";

export function jsonOk<T>(
  data: T,
  meta?: { page?: number; limit?: number; total?: number; totalPages?: number },
  status = 200,
) {
  return NextResponse.json(
    { success: true, data, ...(meta ? { meta } : {}) },
    { status },
  );
}

export function jsonCreated<T>(data: T) {
  return NextResponse.json({ success: true, data }, { status: 201 });
}

export function jsonError(message: string, status = 400, details?: unknown) {
  return NextResponse.json(
    { success: false, error: { message, ...(details ? { details } : {}) } },
    { status },
  );
}

export function handleApiError(error: unknown) {
  if (error instanceof ZodError) {
    return jsonError(
      "Please check the submitted fields.",
      422,
      error.flatten().fieldErrors,
    );
  }

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === "P2002") {
      const target = Array.isArray(error.meta?.target)
        ? (error.meta?.target as string[]).join(", ")
        : "field";
      return jsonError(`A record with this ${target} already exists.`, 409);
    }
    if (error.code === "P2025") {
      return jsonError("The requested record was not found.", 404);
    }
    if (error.code === "P2003") {
      return jsonError("This record is linked to other data and cannot be changed.", 409);
    }
  }

  if (error instanceof Error && error.message === "UNAUTHORIZED") {
    return jsonError("Unauthorized.", 401);
  }

  console.error("[api]", error);
  return jsonError("Something went wrong. Please try again later.", 500);
}

export function getPagination(searchParams: URLSearchParams, defaultLimit = 10) {
  const page = Math.max(1, Number(searchParams.get("page") ?? "1") || 1);
  const limitRaw = Number(searchParams.get("limit") ?? defaultLimit) || defaultLimit;
  const limit = Math.min(100, Math.max(1, limitRaw));
  return { page, limit, skip: (page - 1) * limit };
}

export function paginationMeta(total: number, page: number, limit: number) {
  return {
    page,
    limit,
    total,
    totalPages: Math.max(1, Math.ceil(total / limit)),
  };
}
