import { NextRequest } from "next/server";
import { getAuthenticatedUser, unauthorizedResponse, errorResponse } from "@/lib/api-auth";
import { supabase } from "@/lib/supabase";

export async function GET(request: NextRequest) {
  const user = await getAuthenticatedUser(request);
  if (!user) return unauthorizedResponse();

  try {
    const db = supabase;
    if (!db) return errorResponse("Base de données non configurée");

    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status") || "";
    const search = searchParams.get("search") || "";

    let query = db
      .from("tickets")
      .select("*", { count: "exact" })
      .eq("client_id", user.id)
      .order("created_at", { ascending: false });

    if (status && status !== "all") {
      query = query.eq("status", status);
    }
    if (search) {
      query = query.or(`reference.ilike.%${search}%,subject.ilike.%${search}%`);
    }

    const { data, count, error } = await query;
    if (error) return errorResponse(error.message, 400);

    // For each ticket, get message count
    const ticketsWithCounts = await Promise.all(
      (data || []).map(async (ticket) => {
        const { count: msgCount } = await db
          .from("ticket_messages")
          .select("id", { count: "exact", head: true })
          .eq("ticket_id", ticket.id)
          .eq("is_internal", false);
        return { ...ticket, messages_count: msgCount || 0 };
      })
    );

    return Response.json({ data: ticketsWithCounts, count });
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Erreur serveur";
    return errorResponse(msg);
  }
}

export async function POST(request: NextRequest) {
  const user = await getAuthenticatedUser(request);
  if (!user) return unauthorizedResponse();

  try {
    const db = supabase;
    if (!db) return errorResponse("Base de données non configurée");

    const body = await request.json();

    if (!body.subject) {
      return errorResponse("Le sujet est requis", 400);
    }

    // Auto-generate reference TKT-YYYY-XXX
    const year = new Date().getFullYear();
    const { count } = await db
      .from("tickets")
      .select("id", { count: "exact", head: true })
      .ilike("reference", `TKT-${year}-%`);
    const reference = `TKT-${year}-${String((count || 0) + 1).padStart(3, "0")}`;

    const ticketData = {
      reference,
      client_id: user.id,
      subject: body.subject,
      description: body.description || null,
      priority: body.priority || "medium",
      category: body.category || "general",
      status: "open",
    };

    const { data, error } = await db
      .from("tickets")
      .insert(ticketData)
      .select()
      .single();

    if (error) return errorResponse(error.message, 400);

    // If the client added a first message, insert it
    if (body.description) {
      await db.from("ticket_messages").insert({
        ticket_id: data.id,
        sender_id: user.id,
        message: body.description,
        is_internal: false,
      });
    }

    return Response.json(data, { status: 201 });
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Erreur serveur";
    return errorResponse(msg);
  }
}
