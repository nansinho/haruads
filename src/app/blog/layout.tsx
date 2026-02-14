import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog — Actualités Web & Digital",
  description:
    "Articles et conseils sur le développement web, le design, l'e-commerce et les tendances digitales. Blog de l'Agence HDS.",
  openGraph: {
    title: "Blog — Agence HDS",
    description:
      "Articles et conseils sur le développement web, le design et les tendances digitales.",
    url: "https://agencehds.fr/blog",
  },
  twitter: {
    title: "Blog — Agence HDS",
    description:
      "Articles et conseils sur le développement web, le design et les tendances digitales.",
  },
  alternates: {
    canonical: "https://agencehds.fr/blog",
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
