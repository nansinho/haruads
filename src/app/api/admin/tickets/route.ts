import { NextRequest } from "next/server";
import { getAdminUser, unauthorizedResponse, errorResponse, getQueryParams } from "@/lib/api-auth";
import { ticketsService, logsService } from "@/lib/supabase-admin";
import { supabase } from "@/lib/supabase";

export async function GET(request: NextRequest) {
  const admin = await getAdminUser(request);
  if (!admin) return unauthorizedResponse();

  try {
    const filters = getQueryParams(request);
    const { data, count, error } = await ticketsService.list(filters);
    if (error) return errorResponse(error.message, 400);
    return Response.json({ data, count });
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Erreur serveur";
    return errorResponse(msg);
  }
}

export async function POST(request: NextRequest) {
  const admin = await getAdminUser(request);
  if (!admin) return unauthorizedResponse();

  try {
    const body = await request.json();

    if (!body.subject) {
      return errorResponse("Sujet requis", 400);
    }

    // Auto-generate reference TKT-YYYY-XXX
    if (!body.reference) {
      const year = new Date().getFullYear();
      if (supabase) {
        const { count } = await supabase
          .from("tickets")
          .select("id", { count: "exact", head: true })
          .ilike("reference", `TKT-${year}-%`);
        body.reference = `TKT-${year}-${String((count || 0) + 1).padStart(3, "0")}`;
      } else {
        body.reference = `TKT-${year}-001`;
      }
    }

    const { data, error } = await ticketsService.create(body);
    if (error) return errorResponse(error.message, 400);

    await logsService.create({
      user_id: admin.id,
      action: "ticket_created",
      details: { ticket_id: data.id, reference: data.reference },
      ip_address: request.headers.get("x-forwarded-for") || "unknown",
      severity: "info",
    });

    return Response.json(data, { status: 201 });
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Erreur serveur";
    return errorResponse(msg);
  }
}
