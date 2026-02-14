import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Agence HDS - Studio Web Creatif | Aix-en-Provence",
  description:
    "Studio web creatif specialise en developpement web, design UI/UX et solutions e-commerce sur mesure. Base a Aix-en-Provence.",
  openGraph: {
    title: "Agence HDS - Studio Web Creatif",
    description:
      "Solutions digitales modernes et performantes pour propulser votre entreprise.",
    type: "website",
    locale: "fr_FR",
    images: ["/og-image.jpg"],
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
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Syne:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased bg-dark text-text-primary grain">
        {children}
      </body>
    </html>
  );
}
