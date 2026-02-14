import type { MetadataRoute } from "next";

const siteUrl = "https://agencehds.fr";

export default function sitemap(): MetadataRoute.Sitemap {
  const services = [
    "developpement-web",
    "solutions-saas",
    "intelligence-artificielle",
    "design-ui-ux",
    "e-commerce",
    "branding-seo",
  ];

  const projets = [
    "aiako-ecommerce",
    "dashboard-cco",
    "landing-fintech",
    "systeme-reservation",
  ];

  const blog = [
    "tendances-web-design-2024",
    "ecommerce-conversion",
    "ia-productivite",
    "collaboration-equipe",
  ];

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteUrl}/services`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/projets`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/tarifs`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/a-propos`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${siteUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];

  const servicePages: MetadataRoute.Sitemap = services.map((slug) => ({
    url: `${siteUrl}/services/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const projetPages: MetadataRoute.Sitemap = projets.map((slug) => ({
    url: `${siteUrl}/projets/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const blogPages: MetadataRoute.Sitemap = blog.map((slug) => ({
    url: `${siteUrl}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticPages, ...servicePages, ...projetPages, ...blogPages];
}
