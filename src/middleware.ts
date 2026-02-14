import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Skip middleware if AUTH_SECRET is not configured
  if (!process.env.AUTH_SECRET) {
    return NextResponse.next();
  }

  const { pathname } = request.nextUrl;

  // Check for NextAuth v5 session cookie
  const sessionToken =
    request.cookies.get("authjs.session-token")?.value ||
    request.cookies.get("__Secure-authjs.session-token")?.value;

  const isAuthenticated = !!sessionToken;

  // Protected routes: redirect to login if not authenticated
  if (
    (pathname.startsWith("/admin") || pathname.startsWith("/espace-client")) &&
    !isAuthenticated
  ) {
    const loginUrl = new URL("/auth/login", request.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Already authenticated: redirect away from login page
  if (pathname.startsWith("/auth/login") && isAuthenticated) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/espace-client/:path*", "/auth/:path*"],
};
