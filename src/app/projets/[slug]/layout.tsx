import type { Metadata } from "next";
import { projectsData, projectsSlugs } from "@/data/projects";

const siteUrl = "https://agencehds.fr";

export async function generateStaticParams() {
  return projectsSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projectsData[slug];
  if (!project) return {};

  return {
    title: `${project.title} — Projet ${project.category}`,
    description: project.description,
    openGraph: {
      title: `${project.title} — Agence HDS`,
      description: project.description,
      url: `${siteUrl}/projets/${slug}`,
      images: project.image ? [{ url: project.image, alt: project.title }] : undefined,
    },
    twitter: {
      title: `${project.title} — Agence HDS`,
      description: project.description,
      images: project.image ? [project.image] : undefined,
    },
    alternates: {
      canonical: `${siteUrl}/projets/${slug}`,
    },
  };
}

function JsonLd({ slug, project }: { slug: string; project: (typeof projectsData)[string] }) {
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "Projets", item: `${siteUrl}/projets` },
      { "@type": "ListItem", position: 3, name: project.title, item: `${siteUrl}/projets/${slug}` },
    ],
  };

  const creativeWork = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.description,
    creator: { "@id": `${siteUrl}/#organization` },
    image: project.image ? `${siteUrl}${project.image}` : undefined,
    dateCreated: project.year,
    url: `${siteUrl}/projets/${slug}`,
    keywords: project.tags.join(", "),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(creativeWork) }} />
    </>
  );
}

export default async function ProjetSlugLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projectsData[slug];

  return (
    <>
      {project && <JsonLd slug={slug} project={project} />}
      {children}
    </>
  );
}
