import type { Metadata } from "next";
import { plans } from "@/data/pricing";
import JsonLd from "@/components/seo/JsonLd";
import { seoConfig, pageSeo } from "@/lib/seo-config";

const page = pageSeo["/tarifs"];

export const metadata: Metadata = {
  title: page.title,
  description: page.description,
  keywords: page.keywords,
  openGraph: {
    title: page.title,
    description: page.description,
    url: `${seoConfig.siteUrl}/tarifs`,
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
    canonical: `${seoConfig.siteUrl}/tarifs`,
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Accueil", item: seoConfig.siteUrl },
    { "@type": "ListItem", position: 2, name: "Tarifs", item: `${seoConfig.siteUrl}/tarifs` },
  ],
};

const offersSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Tarifs Agence HDS",
  itemListElement: plans.map((plan, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: {
      "@type": "Offer",
      name: plan.name,
      description: plan.desc,
      price: plan.price,
      priceCurrency: "EUR",
      url: `${seoConfig.siteUrl}/tarifs`,
    },
  })),
};

export default function TarifsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={offersSchema} />
      {children}
    </>
  );
}
