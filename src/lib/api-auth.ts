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

const ALLOWED_SORT_COLUMNS = [
  "created_at", "updated_at", "name", "email", "title", "status",
  "role", "published_at", "order_index", "slug", "city", "priority",
];

export function getQueryParams(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const page = Math.max(1, parseInt(searchParams.get("page") || "1") || 1);
  const pageSize = Math.min(100, Math.max(1, parseInt(searchParams.get("pageSize") || "20") || 20));
  const search = (searchParams.get("search") || "").slice(0, 200);
  const sortBy = ALLOWED_SORT_COLUMNS.includes(searchParams.get("sortBy") || "")
    ? searchParams.get("sortBy")!
    : "created_at";
  const sortOrder: "asc" | "desc" = searchParams.get("sortOrder") === "asc" ? "asc" : "desc";

  return {
    page,
    pageSize,
    search,
    status: searchParams.get("status") || "",
    role: searchParams.get("role") || "",
    sortBy,
    sortOrder,
  };
}
