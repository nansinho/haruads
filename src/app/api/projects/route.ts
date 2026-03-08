import { NextRequest } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(request: NextRequest) {
  try {
    const db = supabase;
    if (!db) {
      return Response.json({ error: "Supabase non configuré" }, { status: 500 });
    }

    const { searchParams } = new URL(request.url);
    const slug = searchParams.get("slug");

    if (slug) {
      // Get single project by slug
      const { data, error } = await db
        .from("projects")
        .select("*")
        .eq("slug", slug)
        .eq("status", "published")
        .single();

      if (error) return Response.json({ error: "Projet introuvable" }, { status: 404 });
      return Response.json(data);
    }

    // List all published projects
    const { data, error } = await db
      .from("projects")
      .select("id, title, slug, description, image_url, tags, client, completed_at, category, results, featured, sort_order")
      .eq("status", "published")
      .order("completed_at", { ascending: false });

    if (error) return Response.json({ error: error.message }, { status: 400 });
    return Response.json(data);
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Erreur serveur";
    return Response.json({ error: msg }, { status: 500 });
  }
}
