import type { Metadata } from "next";
import { plans } from "@/data/pricing";

const siteUrl = "https://agencehds.fr";

export const metadata: Metadata = {
  title: "Tarifs — Nos Offres & Prix",
  description:
    "Consultez nos tarifs pour la création de sites web, applications, e-commerce et solutions digitales. Devis gratuit. Agence HDS à Aix-en-Provence.",
  openGraph: {
    title: "Tarifs — Agence HDS",
    description:
      "Nos offres et tarifs pour sites web, applications et solutions digitales sur mesure.",
    url: `${siteUrl}/tarifs`,
  },
  twitter: {
    title: "Tarifs — Agence HDS",
    description:
      "Nos offres et tarifs pour sites web, applications et solutions digitales sur mesure.",
  },
  alternates: {
    canonical: `${siteUrl}/tarifs`,
  },
};

function JsonLd() {
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "Tarifs", item: `${siteUrl}/tarifs` },
    ],
  };

  const offers = {
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
        url: `${siteUrl}/tarifs`,
      },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(offers) }} />
    </>
  );
}

export default function TarifsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <JsonLd />
      {children}
    </>
  );
}
