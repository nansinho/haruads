import { NextRequest } from "next/server";
import { getAdminUser, unauthorizedResponse, errorResponse } from "@/lib/api-auth";
import { ticketsService, logsService } from "@/lib/supabase-admin";

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const admin = await getAdminUser(request);
  if (!admin) return unauthorizedResponse();

  const { id } = await params;
  const { data, error } = await ticketsService.getById(id);
  if (error) return errorResponse(error.message, 404);

  // Also fetch messages for this ticket
  const { data: messages, error: messagesError } = await ticketsService.getMessages(id);
  if (messagesError) return errorResponse(messagesError.message, 400);

  return Response.json({ ...data, messages: messages || [] });
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const admin = await getAdminUser(request);
  if (!admin) return unauthorizedResponse();

  try {
    const { id } = await params;
    const body = await request.json();

    // Handle adding a message to the ticket
    if (body.message) {
      const { data: messageData, error: messageError } = await ticketsService.addMessage({
        ticket_id: id,
        sender_id: admin.id,
        message: body.message,
        is_internal: false,
      });
      if (messageError) return errorResponse(messageError.message, 400);

      await logsService.create({
        user_id: admin.id,
        action: "ticket_message_added",
        details: { ticket_id: id, message_id: messageData.id },
        ip_address: request.headers.get("x-forwarded-for") || "unknown",
        severity: "info",
      });

      // If there are also ticket updates (e.g., status change along with message)
      const { message: _message, ...ticketUpdates } = body;
      if (Object.keys(ticketUpdates).length > 0) {
        const { data, error } = await ticketsService.update(id, ticketUpdates);
        if (error) return errorResponse(error.message, 400);

        await logsService.create({
          user_id: admin.id,
          action: "ticket_updated",
          details: { ticket_id: id, changes: Object.keys(ticketUpdates) },
          ip_address: request.headers.get("x-forwarded-for") || "unknown",
          severity: "info",
        });

        return Response.json({ ...data, newMessage: messageData });
      }

      return Response.json({ message: messageData });
    }

    // Standard ticket update (no message)
    const { data, error } = await ticketsService.update(id, body);
    if (error) return errorResponse(error.message, 400);

    await logsService.create({
      user_id: admin.id,
      action: "ticket_updated",
      details: { ticket_id: id, changes: Object.keys(body) },
      ip_address: request.headers.get("x-forwarded-for") || "unknown",
      severity: "info",
    });

    return Response.json(data);
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Erreur serveur";
    return errorResponse(msg);
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const admin = await getAdminUser(request);
  if (!admin) return unauthorizedResponse();

  try {
    const { id } = await params;
    const { error } = await ticketsService.delete(id);
    if (error) return errorResponse(error.message, 400);

    await logsService.create({
      user_id: admin.id,
      action: "ticket_deleted",
      details: { ticket_id: id },
      ip_address: request.headers.get("x-forwarded-for") || "unknown",
      severity: "warning",
    });

    return Response.json({ success: true });
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Erreur serveur";
    return errorResponse(msg);
  }
}
