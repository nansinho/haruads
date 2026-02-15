import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "À Propos — Notre Histoire & Passion depuis 2015",
  description:
    "Découvrez l'histoire de l'Agence HDS : d'une passion de Geek à l'entrepreneuriat digital. Nos origines, nos valeurs et notre mission depuis 2015.",
  openGraph: {
    title: "À Propos — Agence HDS | Notre Histoire",
    description:
      "Du Geek passionné à l'entrepreneur digital. Découvrez l'histoire, les valeurs et la mission de l'Agence HDS depuis 2015.",
    url: "https://agencehds.fr/a-propos",
  },
  twitter: {
    title: "À Propos — Agence HDS",
    description:
      "Notre histoire, nos origines, nos valeurs. Une passion devenue entreprise depuis 2015.",
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
