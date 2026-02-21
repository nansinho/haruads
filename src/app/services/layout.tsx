import type { Metadata } from "next";
import JsonLd from "@/components/seo/JsonLd";
import { seoConfig, pageSeo } from "@/lib/seo-config";
import { servicesData } from "@/data/services";

const page = pageSeo["/services"];

export const metadata: Metadata = {
  title: page.title,
  description: page.description,
  keywords: page.keywords,
  openGraph: {
    title: page.title,
    description: page.description,
    url: `${seoConfig.siteUrl}/services`,
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
    canonical: `${seoConfig.siteUrl}/services`,
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Accueil", item: seoConfig.siteUrl },
    { "@type": "ListItem", position: 2, name: "Services", item: `${seoConfig.siteUrl}/services` },
  ],
};

const itemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Services Web — Agence HDS",
  itemListElement: Object.entries(servicesData).map(([slug, service], i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: service.title,
    url: `${seoConfig.siteUrl}/services/${slug}`,
  })),
};

export default function ServicesLayout({
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
