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

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
