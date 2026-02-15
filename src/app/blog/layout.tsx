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

function BreadcrumbJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: "https://agencehds.fr" },
      { "@type": "ListItem", position: 2, name: "Blog", item: "https://agencehds.fr/blog" },
    ],
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}

export default function BlogLayout({
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
