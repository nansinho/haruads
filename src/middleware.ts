import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Skip middleware if AUTH_SECRET is not configured
  if (!process.env.AUTH_SECRET) {
    return NextResponse.next();
  }

  // Dynamic import of auth will be handled when AUTH_SECRET is set
  // For now, just pass through
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/espace-client/:path*", "/auth/:path*"],
};
