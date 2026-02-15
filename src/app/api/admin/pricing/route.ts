import { NextRequest } from "next/server";
import { getAdminUser, unauthorizedResponse, errorResponse, getQueryParams } from "@/lib/api-auth";
import { pricingService, logsService } from "@/lib/supabase-admin";

export async function GET(request: NextRequest) {
  const admin = await getAdminUser(request);
  if (!admin) return unauthorizedResponse();

  try {
    const filters = getQueryParams(request);
    const { data, count, error } = await pricingService.list(filters);
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

    if (!body.name || body.base_price === undefined || body.current_price === undefined) {
      return errorResponse("Nom, prix de base et prix actuel requis", 400);
    }

    const { data, error } = await pricingService.create(body);
    if (error) return errorResponse(error.message, 400);

    await logsService.create({
      user_id: admin.id,
      action: "pricing_created",
      details: { pricing_id: data.id, name: body.name },
      ip_address: request.headers.get("x-forwarded-for") || "unknown",
      severity: "info",
    });

    return Response.json(data, { status: 201 });
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Erreur serveur";
    return errorResponse(msg);
  }
}
