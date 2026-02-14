import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Agence HDS - Agence Web Créative | Aix-en-Provence",
  description:
    "Agence web créative spécialisée en développement web, design UI/UX et solutions e-commerce sur mesure. Basée à Aix-en-Provence.",
  openGraph: {
    title: "Agence HDS - Agence Web Créative",
    description:
      "Solutions digitales modernes et performantes pour propulser votre entreprise.",
    type: "website",
    locale: "fr_FR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800&family=Space+Mono:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans antialiased bg-white text-text-primary">
        {children}
      </body>
    </html>
  );
}
