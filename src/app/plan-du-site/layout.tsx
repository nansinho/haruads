import JsonLd from "@/components/seo/JsonLd";
import { seoConfig } from "@/lib/seo-config";

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Accueil", item: seoConfig.siteUrl },
    { "@type": "ListItem", position: 2, name: "Plan du Site", item: `${seoConfig.siteUrl}/plan-du-site` },
  ],
};

export default function PlanDuSiteLayout({
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
