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

// Dead WordPress URL patterns that must return a hard 404
const DEAD_WORDPRESS_PATTERNS = [
  /^\/feed(\/|$)/,
  /^\/comments\/feed(\/|$)/,
  /^\/author(\/|$)/,
  /^\/category(\/|$)/,
  /^\/search$/,
  /^\/recherche$/,
  /^\/wp-/,
  /^\/ville(\/|$)/,
  /\/feed\/?$/,
  /^\/investissement-dans-des-technologies-de-pointe/,
  /^\/nouvelle-certification-en-securite-electrique/,
  /^\/nouveau-projet-de-fibre-optique/,
];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Dead WordPress URLs — add noindex header and let Next.js return a native 404
  // (these URLs have no matching route, so Next.js automatically serves not-found.tsx with HTTP 404)
  if (DEAD_WORDPRESS_PATTERNS.some((pattern) => pattern.test(pathname))) {
    const response = NextResponse.next();
    response.headers.set("X-Robots-Tag", "noindex, nofollow");
    return response;
  }

  if (!process.env.AUTH_SECRET) {
    return NextResponse.next();
  }
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

  // Admins go to /admin, not /espace-client
  if (pathname.startsWith("/espace-client") && role === "admin") {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  // Already authenticated: redirect away from login page based on role
  if (pathname.startsWith("/auth/login") && isAuthenticated) {
    const dest = role === "admin" ? "/admin" : "/espace-client";
    return NextResponse.redirect(new URL(dest, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/espace-client/:path*",
    "/auth/:path*",
    // Dead WordPress patterns
    "/feed/:path*",
    "/comments/:path*",
    "/author/:path*",
    "/category/:path*",
    "/search",
    "/recherche",
    "/wp-:path*",
    "/ville/:path*",
    "/investissement-dans-des-technologies-de-pointe-pour-nos-chantiers/:path*",
    "/nouvelle-certification-en-securite-electrique-pour-innovtec/:path*",
    "/nouveau-projet-de-fibre-optique-acheve-avec-succes/:path*",
  ],
};
