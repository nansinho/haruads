import type { Metadata } from "next";
import { servicesData, servicesSlugs } from "@/data/services";

const siteUrl = "https://agencehds.fr";

export async function generateStaticParams() {
  return servicesSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = servicesData[slug];
  if (!service) return {};

  return {
    title: `${service.title} — Agence Web Aix-en-Provence`,
    description: service.description.length > 160
      ? service.description.substring(0, 157) + "..."
      : service.description,
    openGraph: {
      title: `${service.title} — Agence HDS`,
      description: service.description,
      url: `${siteUrl}/services/${slug}`,
    },
    twitter: {
      title: `${service.title} — Agence HDS`,
      description: service.subtitle,
    },
    alternates: {
      canonical: `${siteUrl}/services/${slug}`,
    },
  };
}

function JsonLd({ slug, service }: { slug: string; service: (typeof servicesData)[string] }) {
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "Services", item: `${siteUrl}/services` },
      { "@type": "ListItem", position: 3, name: service.title, item: `${siteUrl}/services/${slug}` },
    ],
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.description,
    provider: { "@id": `${siteUrl}/#organization` },
    areaServed: { "@type": "Country", name: "France" },
    url: `${siteUrl}/services/${slug}`,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
    </>
  );
}

export default async function ServiceSlugLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = servicesData[slug];

  return (
    <>
      {service && <JsonLd slug={slug} service={service} />}
      {children}
    </>
  );
}
