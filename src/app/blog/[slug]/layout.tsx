import type { Metadata } from "next";
import { articlesData, articlesSlugs, parseFrenchDate } from "@/data/articles";

const siteUrl = "https://agencehds.fr";

export async function generateStaticParams() {
  return articlesSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = articlesData[slug];
  if (!article) return {};

  return {
    title: article.title,
    description: article.content[0]?.text?.slice(0, 160) || article.title,
    openGraph: {
      title: `${article.title} — Blog Agence HDS`,
      description: article.content[0]?.text?.slice(0, 160) || article.title,
      url: `${siteUrl}/blog/${slug}`,
      type: "article",
      publishedTime: parseFrenchDate(article.date),
      authors: [article.author],
      images: article.image ? [{ url: article.image, alt: article.title }] : undefined,
    },
    twitter: {
      title: `${article.title} — Blog Agence HDS`,
      description: article.content[0]?.text?.slice(0, 160) || article.title,
      images: article.image ? [article.image] : undefined,
    },
    alternates: {
      canonical: `${siteUrl}/blog/${slug}`,
    },
  };
}

function JsonLd({ slug, article }: { slug: string; article: (typeof articlesData)[string] }) {
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${siteUrl}/blog` },
      { "@type": "ListItem", position: 3, name: article.title, item: `${siteUrl}/blog/${slug}` },
    ],
  };

  const blogPosting = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title,
    description: article.content[0]?.text?.slice(0, 160) || article.title,
    image: article.image ? `${siteUrl}${article.image}` : undefined,
    datePublished: parseFrenchDate(article.date),
    author: {
      "@type": "Organization",
      name: article.author,
      url: siteUrl,
    },
    publisher: { "@id": `${siteUrl}/#organization` },
    url: `${siteUrl}/blog/${slug}`,
    inLanguage: "fr-FR",
    mainEntityOfPage: `${siteUrl}/blog/${slug}`,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPosting) }} />
    </>
  );
}

export default async function BlogSlugLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = articlesData[slug];

  return (
    <>
      {article && <JsonLd slug={slug} article={article} />}
      {children}
    </>
  );
}
