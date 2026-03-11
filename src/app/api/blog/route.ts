import { blogService, blogLikesService } from "@/lib/supabase-admin";

export async function GET() {
  try {
    const { data, error } = await blogService.listPublished();
    if (error) {
      return Response.json({ error: error.message }, { status: 400 });
    }

    const posts = data || [];
    const postIds = posts.map((p) => p.id);
    const likeCounts = await blogLikesService.getCountsByPostIds(postIds);

    const enriched = posts.map((p) => ({
      ...p,
      likes_count: likeCounts[p.id] || 0,
    }));

    return Response.json({ data: enriched });
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Erreur serveur";
    return Response.json({ error: msg }, { status: 500 });
  }
}
