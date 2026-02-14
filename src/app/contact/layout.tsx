import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact — Parlons de Votre Projet",
  description:
    "Contactez l'Agence HDS pour discuter de votre projet web. Premier rendez-vous gratuit, réponse sous 24h. Agence web à Aix-en-Provence.",
  openGraph: {
    title: "Contact — Agence HDS",
    description:
      "Contactez-nous pour votre projet web. Premier rendez-vous gratuit, réponse sous 24h.",
    url: "https://agencehds.fr/contact",
  },
  twitter: {
    title: "Contact — Agence HDS",
    description:
      "Contactez-nous pour votre projet web. Premier rendez-vous gratuit, réponse sous 24h.",
  },
  alternates: {
    canonical: "https://agencehds.fr/contact",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
