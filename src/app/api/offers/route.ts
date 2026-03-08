import { supabaseAdmin, supabase } from "@/lib/supabase";

export async function GET() {
  const db = supabaseAdmin || supabase;
  if (!db) {
    return Response.json({ error: "Supabase non configuré" }, { status: 500 });
  }

  try {
    // Fetch categories
    const { data: categories, error: catError } = await db
      .from("offer_categories")
      .select("*")
      .eq("is_active", true)
      .order("sort_order", { ascending: true });

    if (catError) {
      // Fallback: categories table might not exist yet
      console.warn("offer_categories not found, falling back:", catError.message);
    }

    // Fetch offers with their options
    const { data: offers, error: offersError } = await db
      .from("offers")
      .select("id, name, slug, description, features, is_popular, sort_order, category_id, tier, offer_options(id, category, icon, name, description, is_included, sort_order)")
      .eq("is_active", true)
      .order("sort_order", { ascending: true });

    if (offersError) {
      return Response.json({ error: offersError.message }, { status: 400 });
    }

    return Response.json({
      data: offers || [],
      categories: categories || [],
    });
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Erreur serveur";
    return Response.json({ error: msg }, { status: 500 });
  }
}
