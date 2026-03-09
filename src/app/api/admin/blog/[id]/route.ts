import { NextRequest } from "next/server";
import { getAdminUser, unauthorizedResponse, errorResponse } from "@/lib/api-auth";
import { blogService, logsService } from "@/lib/supabase-admin";

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const admin = await getAdminUser(request);
  if (!admin) return unauthorizedResponse();

  const { id } = await params;
  const { data, error } = await blogService.getById(id);
  if (error) return errorResponse(error.message, 404);
  return Response.json(data);
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const admin = await getAdminUser(request);
  if (!admin) return unauthorizedResponse();

  try {
    const { id } = await params;
    const body = await request.json();

    // Auto-set published_at when publishing without a date
    if (body.status === "published" && !body.published_at) {
      const { data: existing } = await blogService.getById(id);
      if (!existing?.published_at) {
        body.published_at = new Date().toISOString();
      }
    }

    const { data, error } = await blogService.update(id, body);
    if (error) return errorResponse(error.message, 400);

    await logsService.create({
      user_id: admin.id,
      action: "blog_post_updated",
      details: { post_id: id },
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
    const { error } = await blogService.delete(id);
    if (error) return errorResponse(error.message, 400);

    await logsService.create({
      user_id: admin.id,
      action: "blog_post_deleted",
      details: { post_id: id },
      ip_address: request.headers.get("x-forwarded-for") || "unknown",
      severity: "warning",
    });

    return Response.json({ success: true });
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Erreur serveur";
    return errorResponse(msg);
  }
}
