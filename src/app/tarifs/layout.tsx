import type { Metadata } from "next";
import JsonLd from "@/components/seo/JsonLd";
import { seoConfig } from "@/lib/seo-config";

export const metadata: Metadata = {
  title: "Demande de Devis — Projet Web Sur Mesure | Agence HDS",
  description:
    "Décrivez votre projet et recevez un devis personnalisé sous 48h. Choisissez vos options, ajoutez vos besoins spécifiques. Agence web à Gardanne, Aix-en-Provence.",
  keywords: [
    "devis site internet",
    "devis projet web",
    "demande devis agence web",
    "devis personnalisé",
  ],
  openGraph: {
    title: "Demande de Devis — Projet Web Sur Mesure | Agence HDS",
    description:
      "Décrivez votre projet et recevez un devis personnalisé sous 48h. Choisissez vos options, ajoutez vos besoins spécifiques.",
    url: `${seoConfig.siteUrl}/tarifs`,
    siteName: seoConfig.siteName,
    locale: seoConfig.locale,
    type: "website",
    images: [{ url: `${seoConfig.siteUrl}${seoConfig.defaultImage}`, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Demande de Devis — Projet Web Sur Mesure | Agence HDS",
    description:
      "Décrivez votre projet et recevez un devis personnalisé sous 48h.",
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
    { "@type": "ListItem", position: 2, name: "Devis", item: `${seoConfig.siteUrl}/tarifs` },
  ],
};

export default function TarifsLayout({
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
