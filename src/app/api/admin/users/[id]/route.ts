import { NextRequest } from "next/server";
import { getAdminUser, unauthorizedResponse, errorResponse } from "@/lib/api-auth";
import { usersService, logsService } from "@/lib/supabase-admin";

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const admin = await getAdminUser(request);
  if (!admin) return unauthorizedResponse();

  const { id } = await params;
  const { data, error } = await usersService.getById(id);
  if (error) return errorResponse(error.message, 404);
  return Response.json(data);
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const admin = await getAdminUser(request);
  if (!admin) return unauthorizedResponse();

  try {
    const { id } = await params;
    const body = await request.json();

    // Hash password if being changed
    if (body.password) {
      const { hash } = await import("bcryptjs");
      body.password_hash = await hash(body.password, 12);
      delete body.password;
    }

    const { data, error } = await usersService.update(id, body);
    if (error) return errorResponse(error.message, 400);

    await logsService.create({
      user_id: admin.id,
      action: "user_updated",
      details: { updated_user_id: id },
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
    const { error } = await usersService.delete(id);
    if (error) return errorResponse(error.message, 400);

    await logsService.create({
      user_id: admin.id,
      action: "user_deleted",
      details: { deleted_user_id: id },
      ip_address: request.headers.get("x-forwarded-for") || "unknown",
      severity: "warning",
    });

    return Response.json({ success: true });
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Erreur serveur";
    return errorResponse(msg);
  }
}
