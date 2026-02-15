import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services — Développement Web, SaaS, IA & E-Commerce",
  description:
    "Découvrez nos services : développement web, solutions SaaS, intelligence artificielle, design UI/UX, e-commerce et branding SEO. Agence web à Aix-en-Provence.",
  openGraph: {
    title: "Services — Agence HDS",
    description:
      "Développement web, SaaS, IA, design UI/UX, e-commerce et branding SEO sur mesure.",
    url: "https://agencehds.fr/services",
  },
  twitter: {
    title: "Services — Agence HDS",
    description:
      "Développement web, SaaS, IA, design UI/UX, e-commerce et branding SEO sur mesure.",
  },
  alternates: {
    canonical: "https://agencehds.fr/services",
  },
};

function BreadcrumbJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: "https://agencehds.fr" },
      { "@type": "ListItem", position: 2, name: "Services", item: "https://agencehds.fr/services" },
    ],
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <BreadcrumbJsonLd />
      {children}
    </>
  );
}
