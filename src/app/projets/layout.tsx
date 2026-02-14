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

export default function ProjetsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
