import { NextRequest } from "next/server";
import { getAdminUser, unauthorizedResponse, errorResponse, getQueryParams } from "@/lib/api-auth";
import { offersService, logsService } from "@/lib/supabase-admin";
import { slugify } from "@/lib/utils";

export async function GET(request: NextRequest) {
  const admin = await getAdminUser(request);
  if (!admin) return unauthorizedResponse();

  try {
    const filters = getQueryParams(request);
    const { data, count, error } = await offersService.list(filters);
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

    if (!body.name || !body.price) {
      return errorResponse("Nom et prix requis", 400);
    }

    // Auto-generate slug from name
    if (!body.slug) {
      body.slug = slugify(body.name);
    }

    const { data, error } = await offersService.create(body);
    if (error) return errorResponse(error.message, 400);

    await logsService.create({
      user_id: admin.id,
      action: "offer_created",
      details: { offer_id: data.id, name: body.name },
      ip_address: request.headers.get("x-forwarded-for") || "unknown",
      severity: "info",
    });

    return Response.json(data, { status: 201 });
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Erreur serveur";
    return errorResponse(msg);
  }
}
