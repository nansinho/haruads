import { supabase } from "@/lib/supabase";

export async function GET() {
  try {
    const db = supabase;
    if (!db) {
      return Response.json({ error: "Supabase non configuré" }, { status: 500 });
    }

    const { data, error } = await db
      .from("testimonials")
      .select("id, author_name, author_role, author_avatar, content, rating, source, sort_order")
      .eq("is_active", true)
      .order("sort_order", { ascending: true });

    if (error) return Response.json({ error: error.message }, { status: 400 });
    return Response.json(data);
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Erreur serveur";
    return Response.json({ error: msg }, { status: 500 });
  }
}
