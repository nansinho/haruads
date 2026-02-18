import JsonLd from "@/components/seo/JsonLd";
import { seoConfig } from "@/lib/seo-config";

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Accueil", item: seoConfig.siteUrl },
    { "@type": "ListItem", position: 2, name: "Mentions Légales", item: `${seoConfig.siteUrl}/mentions-legales` },
  ],
};

export default function MentionsLegalesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      {children}
    </>
  );
}
