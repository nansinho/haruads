import type { Metadata } from "next";
import { Plus_Jakarta_Sans, DM_Serif_Display, Space_Mono } from "next/font/google";
import "./globals.css";
import ClientWidgets from "@/components/ClientWidgets";
import ThemeProvider from "@/components/ThemeProvider";
import SessionProvider from "@/components/providers/SessionProvider";
import JsonLd from "@/components/seo/JsonLd";
import { seoConfig, pageSeo } from "@/lib/seo-config";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-plus-jakarta",
});

const dmSerif = DM_Serif_Display({
  subsets: ["latin", "latin-ext"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-dm-serif",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
  variable: "--font-space-mono",
});

const siteUrl = seoConfig.siteUrl;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: pageSeo["/"].title,
    template: "%s | Agence HDS",
  },
  description: pageSeo["/"].description,
  keywords: pageSeo["/"].keywords,
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
    locale: seoConfig.locale,
    url: siteUrl,
    siteName: seoConfig.siteName,
    title: pageSeo["/"].title,
    description: pageSeo["/"].description,
    images: [
      {
        url: `${siteUrl}${seoConfig.defaultImage}`,
        width: 1200,
        height: 630,
        alt: "Agence HDS — Agence Web Créative",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: pageSeo["/"].title,
    description: pageSeo["/"].description,
    images: [`${siteUrl}${seoConfig.defaultImage}`],
  },
  alternates: {
    canonical: siteUrl,
  },
  manifest: "/manifest.json",
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || undefined,
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["LocalBusiness", "ProfessionalService"],
      "@id": `${siteUrl}/#organization`,
      name: "Agence HDS",
      alternateName: "Harua Digital Studio",
      description:
        "Agence web créative à Aix-en-Provence spécialisée en création de sites internet, applications web, e-commerce et solutions digitales sur mesure.",
      url: siteUrl,
      logo: `${siteUrl}/images/logos/logo-hds-2026-blanc.svg`,
      image: `${siteUrl}/images/nans-profile.png`,
      telephone: "+33624633054",
      email: "contact@agencehds.fr",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Gardanne",
        addressLocality: "Gardanne",
        addressRegion: "Provence-Alpes-Côte d'Azur",
        postalCode: "13120",
        addressCountry: "FR",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 43.4553,
        longitude: 5.4695,
      },
      areaServed: [
        { "@type": "City", name: "Aix-en-Provence" },
        { "@type": "City", name: "Marseille" },
        { "@type": "City", name: "Gardanne" },
        { "@type": "Country", name: "France" },
      ],
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
          ],
          opens: "09:00",
          closes: "18:00",
        },
      ],
      founder: {
        "@type": "Person",
        name: "Nans Harua",
        jobTitle: "Fondateur & Développeur Web",
        url: "https://www.linkedin.com/in/nans-harua/",
      },
      sameAs: [
        "https://www.facebook.com/HaruaDesignSolutions",
        "https://www.linkedin.com/in/nans-harua/",
      ],
      priceRange: "€€",
      currenciesAccepted: "EUR",
      paymentAccepted: "Virement, Carte bancaire",
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "5",
        reviewCount: "12",
        bestRating: "5",
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
        name: "Services Web",
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
              name: "Solutions E-Commerce",
              description:
                "Boutiques en ligne sur mesure avec WooCommerce, Stripe et solutions de paiement sécurisées.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Design UI/UX",
              description:
                "Interfaces intuitives, maquettes Figma, prototypes interactifs et design systems.",
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
              name: "Branding & SEO",
              description:
                "Identité visuelle et référencement naturel pour une visibilité maximale.",
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
      alternateName: "Harua Digital Studio",
      publisher: { "@id": `${siteUrl}/#organization` },
      inLanguage: "fr-FR",
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${siteUrl}/blog?q={search_term_string}`,
        },
        "query-input": "required name=search_term_string",
      },
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
            text: "Développement web, design UI/UX, branding, e-commerce, SEO et maintenance. Chaque service est adapté à vos besoins spécifiques.",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${plusJakarta.variable} ${dmSerif.variable} ${spaceMono.variable}`} suppressHydrationWarning>
      <head>
        {process.env.NEXT_PUBLIC_SUPABASE_URL && (
          <link rel="preconnect" href={process.env.NEXT_PUBLIC_SUPABASE_URL} />
        )}
        <JsonLd data={organizationSchema} />
      </head>
      <body className="font-sans antialiased bg-dark text-text-primary">
        <SessionProvider>
          <ThemeProvider>
            {children}
            <ClientWidgets />
          </ThemeProvider>
        </SessionProvider>
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
