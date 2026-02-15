import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projets — Nos Réalisations Web",
  description:
    "Découvrez nos projets : sites e-commerce, dashboards, landing pages et applications web. Portfolio de l'Agence HDS à Aix-en-Provence.",
  openGraph: {
    title: "Projets — Agence HDS",
    description:
      "Portfolio de nos réalisations web : e-commerce, dashboards, landing pages et applications.",
    url: "https://agencehds.fr/projets",
  },
  twitter: {
    title: "Projets — Agence HDS",
    description:
      "Portfolio de nos réalisations web : e-commerce, dashboards, landing pages et applications.",
  },
  alternates: {
    canonical: "https://agencehds.fr/projets",
  },
};

function BreadcrumbJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: "https://agencehds.fr" },
      { "@type": "ListItem", position: 2, name: "Projets", item: "https://agencehds.fr/projets" },
    ],
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}

export default function ProjetsLayout({
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
