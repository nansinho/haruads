import { NextRequest } from "next/server";
import { getAuthenticatedUser, unauthorizedResponse, errorResponse } from "@/lib/api-auth";
import { supabase } from "@/lib/supabase";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await getAuthenticatedUser(request);
  if (!user) return unauthorizedResponse();

  try {
    const db = supabase;
    if (!db) return errorResponse("Base de données non configurée");

    const { id } = await params;

    // Get ticket and verify it belongs to the client
    const { data: ticket, error: ticketError } = await db
      .from("tickets")
      .select("*")
      .eq("id", id)
      .eq("client_id", user.id)
      .single();

    if (ticketError || !ticket) {
      return errorResponse("Ticket non trouvé", 404);
    }

    // Get non-internal messages
    const { data: messages, error: msgError } = await db
      .from("ticket_messages")
      .select("*")
      .eq("ticket_id", id)
      .eq("is_internal", false)
      .order("created_at", { ascending: true });

    if (msgError) return errorResponse(msgError.message, 400);

    return Response.json({ ticket, messages: messages || [] });
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Erreur serveur";
    return errorResponse(msg);
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await getAuthenticatedUser(request);
  if (!user) return unauthorizedResponse();

  try {
    const db = supabase;
    if (!db) return errorResponse("Base de données non configurée");

    const { id } = await params;
    const body = await request.json();

    if (!body.message) {
      return errorResponse("Le message est requis", 400);
    }

    // Verify the ticket belongs to the client
    const { data: ticket, error: ticketError } = await db
      .from("tickets")
      .select("id, status")
      .eq("id", id)
      .eq("client_id", user.id)
      .single();

    if (ticketError || !ticket) {
      return errorResponse("Ticket non trouvé", 404);
    }

    if (ticket.status === "closed") {
      return errorResponse("Ce ticket est fermé", 400);
    }

    // Insert message
    const { data: message, error: msgError } = await db
      .from("ticket_messages")
      .insert({
        ticket_id: id,
        sender_id: user.id,
        message: body.message,
        is_internal: false,
      })
      .select()
      .single();

    if (msgError) return errorResponse(msgError.message, 400);

    // If ticket was waiting_client, reopen it
    if (ticket.status === "waiting_client") {
      await db
        .from("tickets")
        .update({ status: "open" })
        .eq("id", id);
    }

    return Response.json(message, { status: 201 });
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Erreur serveur";
    return errorResponse(msg);
  }
}
