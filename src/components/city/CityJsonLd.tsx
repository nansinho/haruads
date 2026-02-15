import type { CityPageData } from "@/data/cities/_types";

export default function CityJsonLd({ city }: { city: CityPageData }) {
  const siteUrl = "https://agencehds.fr";

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LocalBusiness",
        "@id": `${siteUrl}/agence-web/${city.slug}/#localbusiness`,
        name: `Agence HDS - Agence Web ${city.name}`,
        description: city.seo.description,
        url: `${siteUrl}/agence-web/${city.slug}`,
        telephone: "+33624633054",
        email: "contact@agencehds.fr",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Gardanne",
          addressRegion: "Provence-Alpes-Côte d'Azur",
          postalCode: "13120",
          addressCountry: "FR",
        },
        areaServed: {
          "@type": "City",
          name: city.name,
          sameAs: city.wikipediaUrl,
        },
        parentOrganization: {
          "@type": "Organization",
          "@id": `${siteUrl}/#organization`,
          name: "Agence HDS",
        },
        priceRange: "€€",
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Accueil",
            item: siteUrl,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Agence Web",
            item: `${siteUrl}/agence-web`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: city.name,
          },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: city.faq.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
      },
      {
        "@type": "Service",
        name: `Création de sites internet à ${city.name}`,
        provider: {
          "@id": `${siteUrl}/agence-web/${city.slug}/#localbusiness`,
        },
        areaServed: {
          "@type": "City",
          name: city.name,
        },
        serviceType: [
          "Web Development",
          "Web Design",
          "E-Commerce",
          "SaaS Development",
          "SEO",
          "Artificial Intelligence",
        ],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
