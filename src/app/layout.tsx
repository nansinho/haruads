import type { Metadata } from "next";
import "./globals.css";
import AccessibilityWidget from "@/components/AccessibilityWidget";

const siteUrl = "https://agencehds.fr";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Agence HDS — Agence Web Créative | Aix-en-Provence",
    template: "%s | Agence HDS",
  },
  description:
    "Agence web créative spécialisée en développement web, design UI/UX, solutions SaaS, intelligence artificielle et e-commerce sur mesure. Basée à Aix-en-Provence.",
  keywords: [
    "agence web",
    "création site internet",
    "développement web",
    "design UI/UX",
    "e-commerce",
    "SaaS",
    "intelligence artificielle",
    "Aix-en-Provence",
    "Next.js",
    "React",
    "Agence HDS",
  ],
  authors: [{ name: "Agence HDS", url: siteUrl }],
  creator: "Agence HDS",
  publisher: "Agence HDS",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: siteUrl,
    siteName: "Agence HDS",
    title: "Agence HDS — Agence Web Créative | Aix-en-Provence",
    description:
      "Solutions digitales modernes et performantes pour propulser votre entreprise. Développement web, SaaS, IA et e-commerce.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Agence HDS — Agence Web Créative",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Agence HDS — Agence Web Créative",
    description:
      "Solutions digitales sur mesure : développement web, SaaS, IA, e-commerce. Aix-en-Provence.",
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: siteUrl,
  },
};

function JsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfessionalService",
        "@id": `${siteUrl}/#organization`,
        name: "Agence HDS",
        url: siteUrl,
        logo: `${siteUrl}/images/logos/logo-hds.svg`,
        image: `${siteUrl}/og-image.jpg`,
        description:
          "Agence web créative spécialisée en développement web, design UI/UX, solutions SaaS, intelligence artificielle et e-commerce sur mesure.",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Aix-en-Provence",
          addressRegion: "Provence-Alpes-Côte d'Azur",
          addressCountry: "FR",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: 43.5297,
          longitude: 5.4474,
        },
        email: "contact@agencehds.fr",
        priceRange: "€€",
        openingHoursSpecification: {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          opens: "09:00",
          closes: "18:00",
        },
        sameAs: [],
        areaServed: {
          "@type": "GeoCircle",
          geoMidpoint: {
            "@type": "GeoCoordinates",
            latitude: 43.5297,
            longitude: 5.4474,
          },
          geoRadius: "100000",
        },
        knowsAbout: [
          "Développement Web",
          "Solutions SaaS",
          "Intelligence Artificielle",
          "Design UI/UX",
          "E-Commerce",
          "Branding",
          "SEO",
          "Next.js",
          "React",
          "Supabase",
        ],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Services",
          itemListElement: [
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Développement Web",
                description:
                  "Sites vitrines, applications web et landing pages performantes avec React, Next.js et les technologies modernes.",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Solutions SaaS",
                description:
                  "Plateformes SaaS multi-tenant, dashboards admin et outils métier sur mesure.",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Intelligence Artificielle",
                description:
                  "Chatbots IA, automatisation des processus et intégration d'API IA.",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Design UI/UX",
                description:
                  "Interfaces intuitives et expériences utilisateur mémorables.",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "E-Commerce",
                description:
                  "Boutiques en ligne sur mesure avec solutions de paiement sécurisées.",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Branding & SEO",
                description:
                  "Identité visuelle forte et référencement naturel pour une visibilité maximale.",
              },
            },
          ],
        },
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: "Agence HDS",
        publisher: { "@id": `${siteUrl}/#organization` },
        inLanguage: "fr-FR",
      },
      {
        "@type": "FAQPage",
        "@id": `${siteUrl}/#faq`,
        mainEntity: [
          {
            "@type": "Question",
            name: "Qu'est-ce que l'Agence HDS ?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Agence web basée à Aix-en-Provence, spécialisée en création de sites, applications web et solutions e-commerce sur mesure.",
            },
          },
          {
            "@type": "Question",
            name: "Quels services proposez-vous ?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Développement web, design UI/UX, solutions SaaS, intelligence artificielle, branding, e-commerce, SEO et maintenance.",
            },
          },
          {
            "@type": "Question",
            name: "Combien de temps pour un projet ?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Site vitrine : 2-4 semaines. Application web : 6-12 semaines. E-commerce : 8-16 semaines. Chaque projet est planifié avec un calendrier clair.",
            },
          },
          {
            "@type": "Question",
            name: "Que se passe-t-il si le résultat ne convient pas ?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Des révisions sont incluses à chaque étape. Nous validons ensemble chaque phase pour garantir votre satisfaction avant de passer à la suivante.",
            },
          },
        ],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

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
          href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800&family=Space+Mono:wght@400;700&display=swap"
          rel="stylesheet"
        />
        <JsonLd />
      </head>
      <body className="font-sans antialiased bg-[#0a0a0a] text-text-primary">
        {children}
        <AccessibilityWidget />
        {/* SVG color filters for colorblind modes */}
        <svg className="hidden" aria-hidden="true">
          <defs>
            <filter id="protanopia">
              <feColorMatrix type="matrix" values="0.567,0.433,0,0,0 0.558,0.442,0,0,0 0,0.242,0.758,0,0 0,0,0,1,0" />
            </filter>
            <filter id="deuteranopia">
              <feColorMatrix type="matrix" values="0.625,0.375,0,0,0 0.7,0.3,0,0,0 0,0.3,0.7,0,0 0,0,0,1,0" />
            </filter>
            <filter id="tritanopia">
              <feColorMatrix type="matrix" values="0.95,0.05,0,0,0 0,0.433,0.567,0,0 0,0.475,0.525,0,0 0,0,0,1,0" />
            </filter>
          </defs>
        </svg>
      </body>
    </html>
  );
}
