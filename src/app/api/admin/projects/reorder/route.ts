import { NextRequest } from "next/server";
import { getAdminUser, unauthorizedResponse, errorResponse } from "@/lib/api-auth";
import { logsService } from "@/lib/supabase-admin";
import { supabaseAdmin, supabase } from "@/lib/supabase";

export async function PUT(request: NextRequest) {
  const admin = await getAdminUser(request);
  if (!admin) return unauthorizedResponse();

  try {
    const { items } = await request.json();

    if (!Array.isArray(items) || items.length === 0) {
      return errorResponse("Liste d'items requise", 400);
    }

    const db = supabaseAdmin || supabase;
    if (!db) return errorResponse("Supabase non configuré", 500);

    const updates = items.map((item: { id: string; sort_order: number }) =>
      db.from("projects").update({ sort_order: item.sort_order }).eq("id", item.id)
    );

    const results = await Promise.all(updates);
    const failed = results.filter((r) => r.error);
    if (failed.length > 0) {
      return errorResponse("Erreur lors de la mise à jour de l'ordre", 400);
    }

    await logsService.create({
      user_id: admin.id,
      action: "projects_reordered",
      details: { count: items.length },
      ip_address: request.headers.get("x-forwarded-for") || "unknown",
      severity: "info",
    });

    return Response.json({ success: true });
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Erreur serveur";
    return errorResponse(msg);
  }
}
