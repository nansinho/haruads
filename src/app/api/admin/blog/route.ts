import { NextRequest } from "next/server";
import { getAdminUser, unauthorizedResponse, errorResponse, getQueryParams } from "@/lib/api-auth";
import { blogService, logsService } from "@/lib/supabase-admin";
import { slugify } from "@/lib/utils";

export async function GET(request: NextRequest) {
  const admin = await getAdminUser(request);
  if (!admin) return unauthorizedResponse();

  try {
    const filters = getQueryParams(request);
    const { data, count, error } = await blogService.list(filters);
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

    if (!body.title || !body.content) {
      return errorResponse("Titre et contenu requis", 400);
    }

    // Auto-generate slug from title
    if (!body.slug) {
      body.slug = slugify(body.title);
    }

    // Set published_at if status is "published"
    if (body.status === "published" && !body.published_at) {
      body.published_at = new Date().toISOString();
    }

    const { data, error } = await blogService.create(body);
    if (error) return errorResponse(error.message, 400);

    await logsService.create({
      user_id: admin.id,
      action: "blog_post_created",
      details: { post_id: data.id, title: body.title },
      ip_address: request.headers.get("x-forwarded-for") || "unknown",
      severity: "info",
    });

    return Response.json(data, { status: 201 });
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Erreur serveur";
    return errorResponse(msg);
  }
}
