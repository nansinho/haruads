import { NextRequest } from "next/server";
import { blogService, blogCommentsService } from "@/lib/supabase-admin";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const { data: post } = await blogService.getBySlug(slug);
    if (!post) return Response.json({ error: "Article introuvable" }, { status: 404 });

    const { data, error } = await blogCommentsService.list(post.id);
    if (error) return Response.json({ error: error.message }, { status: 400 });

    return Response.json({ data: data || [] });
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
    const body = await request.json();

    if (!body.author_name?.trim() || !body.content?.trim()) {
      return Response.json({ error: "Nom et commentaire requis" }, { status: 400 });
    }

    const { data: post } = await blogService.getBySlug(slug);
    if (!post) return Response.json({ error: "Article introuvable" }, { status: 404 });

    const { data, error } = await blogCommentsService.create({
      post_id: post.id,
      author_name: body.author_name.trim(),
      author_email: body.author_email?.trim() || undefined,
      content: body.content.trim(),
    });

    if (error) return Response.json({ error: error.message }, { status: 400 });

    return Response.json(data, { status: 201 });
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Erreur serveur";
    return Response.json({ error: msg }, { status: 500 });
  }
}
