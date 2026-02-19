import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const disallowedPaths = [
    "/api/",
    "/_next/",
    "/admin/",
    "/espace-client/",
    "/auth/",
  ];

  return {
    rules: [
      // Google bots — full access
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: disallowedPaths,
      },
      {
        userAgent: "Googlebot-Image",
        allow: "/",
      },
      // Bing
      {
        userAgent: "Bingbot",
        allow: "/",
        disallow: disallowedPaths,
      },
      // AI crawlers — explicitly allowed for visibility
      {
        userAgent: "GPTBot",
        allow: "/",
        disallow: disallowedPaths,
      },
      {
        userAgent: "ChatGPT-User",
        allow: "/",
        disallow: disallowedPaths,
      },
      {
        userAgent: "Google-Extended",
        allow: "/",
      },
      {
        userAgent: "Claude-Web",
        allow: "/",
      },
      {
        userAgent: "anthropic-ai",
        allow: "/",
      },
      {
        userAgent: "CCBot",
        allow: "/",
      },
      {
        userAgent: "PerplexityBot",
        allow: "/",
      },
      {
        userAgent: "Bytespider",
        allow: "/",
      },
      // Default rule for all other bots
      {
        userAgent: "*",
        allow: "/",
        disallow: disallowedPaths,
      },
    ],
    sitemap: "https://agencehds.fr/sitemap.xml",
    host: "https://agencehds.fr",
  };
}
