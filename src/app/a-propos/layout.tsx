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

export default function AProposLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
