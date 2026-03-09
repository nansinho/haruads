import { NextRequest } from "next/server";
import { blogService } from "@/lib/supabase-admin";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const { data, error } = await blogService.getBySlug(slug);
    if (error || !data) {
      return Response.json({ error: "Article introuvable" }, { status: 404 });
    }

    // Get related posts
    let related: { id: string; title: string; slug: string; category: string | null }[] = [];
    if (data.category) {
      const { data: relatedData } = await blogService.getRelatedPosts(data.category, slug);
      related = relatedData || [];
    }

    return Response.json({ data, related });
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Erreur serveur";
    return Response.json({ error: msg }, { status: 500 });
  }
}
