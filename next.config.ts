import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  trailingSlash: false,
  images: {
    deviceSizes: [640, 672, 750, 828, 1080, 1200, 1920, 2048, 3840],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
      {
        protocol: "https",
        hostname: "images.pexels.com",
      },
    ],
  },
  serverExternalPackages: ["puppeteer-core"],
  experimental: {
    optimizePackageImports: ["framer-motion", "lucide-react"],
  },
  async redirects() {
    return [
      // Old WordPress URLs → proper Next.js routes (301 permanent)
      { source: "/about", destination: "/a-propos", permanent: true },
      { source: "/notre-societe", destination: "/a-propos", permanent: true },
      { source: "/notre-societe/", destination: "/a-propos", permanent: true },
      { source: "/nos-activites", destination: "/services", permanent: true },
      { source: "/nos-activites/", destination: "/services", permanent: true },
      { source: "/nos-certifications", destination: "/services", permanent: true },
      { source: "/nos-certifications/", destination: "/services", permanent: true },
      { source: "/agences", destination: "/a-propos", permanent: true },
      { source: "/agences/", destination: "/a-propos", permanent: true },
      { source: "/partenaires", destination: "/a-propos", permanent: true },
      { source: "/partenaires/", destination: "/a-propos", permanent: true },
      // Trailing slash normalization for existing pages
      { source: "/contact/", destination: "/contact", permanent: true },
      { source: "/carrieres/", destination: "/carrieres", permanent: true },
    ];
  },
  async headers() {
    return [
      {
        // SEO headers for all pages
        source: "/((?!api|_next|admin|espace-client|auth).*)",
        headers: [
          {
            key: "X-Robots-Tag",
            value: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
          },
        ],
      },
      {
        // Prevent indexing of private routes
        source: "/(api|admin|espace-client|auth)/:path*",
        headers: [
          {
            key: "X-Robots-Tag",
            value: "noindex, nofollow",
          },
        ],
      },
      {
        // Security headers for all routes
        source: "/:path*",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
