import type { Metadata } from "next";
import JsonLd from "@/components/seo/JsonLd";
import { seoConfig, pageSeo } from "@/lib/seo-config";

const page = pageSeo["/contact"];

export const metadata: Metadata = {
  title: page.title,
  description: page.description,
  keywords: page.keywords,
  openGraph: {
    title: page.title,
    description: page.description,
    url: `${seoConfig.siteUrl}/contact`,
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
    canonical: `${seoConfig.siteUrl}/contact`,
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Accueil", item: seoConfig.siteUrl },
    { "@type": "ListItem", position: 2, name: "Contact", item: `${seoConfig.siteUrl}/contact` },
  ],
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      {children}
    </>
  );
}
