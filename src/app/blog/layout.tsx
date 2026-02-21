import type { Metadata } from "next";
import JsonLd from "@/components/seo/JsonLd";
import { seoConfig, pageSeo } from "@/lib/seo-config";
import { articlesData } from "@/data/articles";

const page = pageSeo["/blog"];

export const metadata: Metadata = {
  title: page.title,
  description: page.description,
  keywords: page.keywords,
  openGraph: {
    title: page.title,
    description: page.description,
    url: `${seoConfig.siteUrl}/blog`,
    siteName: seoConfig.siteName,
    locale: seoConfig.locale,
    type: "website",
    images: [{ url: `${seoConfig.siteUrl}${seoConfig.defaultImage}`, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: page.title,
    description: page.description,
  },
  alternates: {
    canonical: `${seoConfig.siteUrl}/blog`,
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Accueil", item: seoConfig.siteUrl },
    { "@type": "ListItem", position: 2, name: "Blog", item: `${seoConfig.siteUrl}/blog` },
  ],
};

const itemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Blog — Agence HDS",
  itemListElement: Object.entries(articlesData).map(([slug, article], i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: article.title,
    url: `${seoConfig.siteUrl}/blog/${slug}`,
  })),
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={itemListSchema} />
      {children}
    </>
  );
}
