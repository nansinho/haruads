import { NextRequest } from "next/server";
import { decode } from "@auth/core/jwt";

interface AdminUser {
  id: string;
  role: string;
  email: string;
  name?: string;
}

export async function getAdminUser(request: NextRequest): Promise<AdminUser | null> {
  const secret = process.env.AUTH_SECRET;
  if (!secret) return null;

  const cookieName = request.cookies.has("__Secure-authjs.session-token")
    ? "__Secure-authjs.session-token"
    : "authjs.session-token";

  const token = request.cookies.get(cookieName)?.value;
  if (!token) return null;

  try {
    const decoded = await decode({ token, secret, salt: cookieName });
    if (!decoded?.id || decoded?.role !== "admin") return null;
    return decoded as unknown as AdminUser;
  } catch {
    return null;
  }
}

export async function getAuthenticatedUser(request: NextRequest): Promise<AdminUser | null> {
  const secret = process.env.AUTH_SECRET;
  if (!secret) return null;

  const cookieName = request.cookies.has("__Secure-authjs.session-token")
    ? "__Secure-authjs.session-token"
    : "authjs.session-token";

  const token = request.cookies.get(cookieName)?.value;
  if (!token) return null;

  try {
    const decoded = await decode({ token, secret, salt: cookieName });
    if (!decoded?.id) return null;
    return decoded as unknown as AdminUser;
  } catch {
    return null;
  }
}

export function unauthorizedResponse() {
  return Response.json({ error: "Non autorisé" }, { status: 401 });
}

export function errorResponse(message: string, status = 500) {
  return Response.json({ error: message }, { status });
}

export function getQueryParams(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  return {
    page: parseInt(searchParams.get("page") || "1"),
    pageSize: parseInt(searchParams.get("pageSize") || "20"),
    search: searchParams.get("search") || "",
    status: searchParams.get("status") || "",
    role: searchParams.get("role") || "",
    sortBy: searchParams.get("sortBy") || "created_at",
    sortOrder: (searchParams.get("sortOrder") || "desc") as "asc" | "desc",
  };
}
