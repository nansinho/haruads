import { NextRequest } from "next/server";
import { getAdminUser, unauthorizedResponse, errorResponse, getQueryParams } from "@/lib/api-auth";
import { quotesService, logsService } from "@/lib/supabase-admin";

export async function GET(request: NextRequest) {
  const admin = await getAdminUser(request);
  if (!admin) return unauthorizedResponse();

  try {
    const filters = getQueryParams(request);
    const { data, count, error } = await quotesService.list(filters);
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

    if (!body.name || !body.email || !body.description) {
      return errorResponse("Nom, email et description requis", 400);
    }

    // Auto-generate reference
    if (!body.reference) {
      body.reference = await quotesService.getNextReference();
    }

    const { data, error } = await quotesService.create(body);
    if (error) return errorResponse(error.message, 400);

    await logsService.create({
      user_id: admin.id,
      action: "quote_created",
      details: { quote_id: data.id, reference: data.reference },
      ip_address: request.headers.get("x-forwarded-for") || "unknown",
      severity: "info",
    });

    return Response.json(data, { status: 201 });
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Erreur serveur";
    return errorResponse(msg);
  }
}
