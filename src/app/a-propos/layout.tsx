import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "À Propos — Notre Histoire & Équipe",
  description:
    "Découvrez l'Agence HDS : notre histoire, nos valeurs et notre équipe. Agence web créative basée à Gardanne, Aix-en-Provence.",
  openGraph: {
    title: "À Propos — Agence HDS",
    description:
      "Notre histoire, nos valeurs et notre équipe. Agence web créative à Aix-en-Provence.",
    url: "https://agencehds.fr/a-propos",
  },
  twitter: {
    title: "À Propos — Agence HDS",
    description:
      "Notre histoire, nos valeurs et notre équipe. Agence web créative à Aix-en-Provence.",
  },
  alternates: {
    canonical: "https://agencehds.fr/a-propos",
  },
};

function BreadcrumbJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: "https://agencehds.fr" },
      { "@type": "ListItem", position: 2, name: "\u00c0 Propos", item: "https://agencehds.fr/a-propos" },
    ],
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}

export default function AProposLayout({
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
