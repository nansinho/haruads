import type { City } from "@/lib/cities";

export default function CityJsonLd({ city }: { city: City }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Agence HDS",
    url: `https://agencehds.fr/agence-web-${city.slug}`,
    telephone: "+33624633054",
    email: "contact@agencehds.fr",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Gardanne",
      addressLocality: city.name,
      postalCode: city.postalCode,
      addressCountry: "FR",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: city.lat,
      longitude: city.lng,
    },
    areaServed: city.name,
    priceRange: "\u20AC\u20AC",
    sameAs: [
      "https://www.facebook.com/HaruaDesignSolutions",
      "https://www.linkedin.com/in/nans-harua/",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
