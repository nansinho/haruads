import { NextRequest } from "next/server";
import { blogService, blogLikesService } from "@/lib/supabase-admin";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const { data: post } = await blogService.getBySlug(slug);
    if (!post) return Response.json({ error: "Article introuvable" }, { status: 404 });

    const count = await blogLikesService.getCount(post.id);

    // Check if a specific visitor has liked
    const visitorId = request.nextUrl.searchParams.get("visitor_id");
    if (visitorId) {
      const hasLiked = await blogLikesService.hasLiked(post.id, visitorId);
      return Response.json({ count, liked: hasLiked });
    }

    return Response.json({ count });
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Erreur serveur";
    return Response.json({ error: msg }, { status: 500 });
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const { visitor_id } = await request.json();

    if (!visitor_id) {
      return Response.json({ error: "visitor_id requis" }, { status: 400 });
    }

    const { data: post } = await blogService.getBySlug(slug);
    if (!post) return Response.json({ error: "Article introuvable" }, { status: 404 });

    const liked = await blogLikesService.toggle(post.id, visitor_id);
    const count = await blogLikesService.getCount(post.id);

    return Response.json({ liked, count });
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Erreur serveur";
    return Response.json({ error: msg }, { status: 500 });
  }
}
