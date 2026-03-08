import { supabaseAdmin, supabase } from "@/lib/supabase";

export async function GET() {
  const db = supabaseAdmin || supabase;
  if (!db) {
    return Response.json({ error: "Supabase non configuré" }, { status: 500 });
  }

  try {
    const { data, error } = await db
      .from("offers")
      .select("id, name, slug, description, features, is_popular, sort_order")
      .eq("is_active", true)
      .order("sort_order", { ascending: true });

    if (error) {
      return Response.json({ error: error.message }, { status: 400 });
    }

    return Response.json({ data: data || [] });
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Erreur serveur";
    return Response.json({ error: msg }, { status: 500 });
  }
}
