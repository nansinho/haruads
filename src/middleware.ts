import { auth } from "@/lib/auth";

export default auth((req) => {
  const { pathname } = req.nextUrl;
  const isLoggedIn = !!req.auth;
  const userRole = req.auth?.user?.role;

  // Admin routes - require admin role
  if (pathname.startsWith("/admin")) {
    if (!isLoggedIn) {
      const loginUrl = new URL("/auth/login", req.url);
      loginUrl.searchParams.set("callbackUrl", pathname);
      return Response.redirect(loginUrl);
    }
    if (userRole !== "admin" && userRole !== "editor") {
      return Response.redirect(new URL("/", req.url));
    }
  }

  // Client extranet routes - require authenticated client
  if (pathname.startsWith("/espace-client")) {
    if (!isLoggedIn) {
      const loginUrl = new URL("/auth/login", req.url);
      loginUrl.searchParams.set("callbackUrl", pathname);
      return Response.redirect(loginUrl);
    }
  }

  // Auth pages - redirect if already logged in
  if (pathname.startsWith("/auth/")) {
    if (isLoggedIn) {
      const redirectUrl =
        userRole === "admin" || userRole === "editor"
          ? "/admin"
          : "/espace-client";
      return Response.redirect(new URL(redirectUrl, req.url));
    }
  }
});

export const config = {
  matcher: ["/admin/:path*", "/espace-client/:path*", "/auth/:path*"],
};
