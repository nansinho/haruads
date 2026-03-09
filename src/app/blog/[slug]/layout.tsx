import type { Metadata } from "next";
import { blogService } from "@/lib/supabase-admin";

const siteUrl = "https://agencehds.fr";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  try {
    const { data: article } = await blogService.getBySlug(slug);
    if (!article) return {};

    const description = article.seo_description || article.excerpt || article.title;

    return {
      title: article.seo_title || article.title,
      description,
      openGraph: {
        title: `${article.seo_title || article.title} — Blog Agence HDS`,
        description,
        url: `${siteUrl}/blog/${slug}`,
        type: "article",
        publishedTime: article.published_at || undefined,
        images: article.cover_image ? [{ url: article.cover_image, alt: article.title }] : undefined,
      },
      twitter: {
        title: `${article.seo_title || article.title} — Blog Agence HDS`,
        description,
        images: article.cover_image ? [article.cover_image] : undefined,
      },
      alternates: {
        canonical: `${siteUrl}/blog/${slug}`,
      },
    };
  } catch {
    return {};
  }
}

export default function BlogSlugLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
