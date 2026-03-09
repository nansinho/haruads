import { blogService } from "@/lib/supabase-admin";

export async function GET() {
  try {
    const { data, error } = await blogService.listPublished();
    if (error) {
      return Response.json({ error: error.message }, { status: 400 });
    }
    return Response.json({ data: data || [] });
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Erreur serveur";
    return Response.json({ error: msg }, { status: 500 });
  }
}
