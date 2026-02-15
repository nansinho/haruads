import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { decode } from "@auth/core/jwt";

async function getRole(request: NextRequest): Promise<string | null> {
  const secret = process.env.AUTH_SECRET;
  if (!secret) return null;

  const cookieName = request.cookies.has("__Secure-authjs.session-token")
    ? "__Secure-authjs.session-token"
    : "authjs.session-token";

  const token = request.cookies.get(cookieName)?.value;
  if (!token) return null;

  try {
    const decoded = await decode({ token, secret, salt: cookieName });
    return (decoded?.role as string) || null;
  } catch {
    return null;
  }
}

export async function middleware(request: NextRequest) {
  if (!process.env.AUTH_SECRET) {
    return NextResponse.next();
  }

  const { pathname } = request.nextUrl;
  const role = await getRole(request);
  const isAuthenticated = role !== null;

  // Protected routes: redirect to login if not authenticated
  if (
    (pathname.startsWith("/admin") || pathname.startsWith("/espace-client")) &&
    !isAuthenticated
  ) {
    const loginUrl = new URL("/auth/login", request.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // RBAC: only admins can access /admin
  if (pathname.startsWith("/admin") && role !== "admin") {
    return NextResponse.redirect(new URL("/espace-client", request.url));
  }

  // Already authenticated: redirect away from login page based on role
  if (pathname.startsWith("/auth/login") && isAuthenticated) {
    const dest = role === "admin" ? "/admin" : "/espace-client";
    return NextResponse.redirect(new URL(dest, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/espace-client/:path*", "/auth/:path*"],
};
