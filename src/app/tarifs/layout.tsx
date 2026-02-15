import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tarifs — Nos Offres & Prix",
  description:
    "Consultez nos tarifs pour la création de sites web, applications, e-commerce et solutions digitales. Devis gratuit. Agence HDS à Aix-en-Provence.",
  openGraph: {
    title: "Tarifs — Agence HDS",
    description:
      "Nos offres et tarifs pour sites web, applications et solutions digitales sur mesure.",
    url: "https://agencehds.fr/tarifs",
  },
  twitter: {
    title: "Tarifs — Agence HDS",
    description:
      "Nos offres et tarifs pour sites web, applications et solutions digitales sur mesure.",
  },
  alternates: {
    canonical: "https://agencehds.fr/tarifs",
  },
};

export default function TarifsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
