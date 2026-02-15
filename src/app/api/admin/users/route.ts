import { NextRequest } from "next/server";
import { getAdminUser, unauthorizedResponse, errorResponse, getQueryParams } from "@/lib/api-auth";
import { usersService, logsService } from "@/lib/supabase-admin";

export async function GET(request: NextRequest) {
  const admin = await getAdminUser(request);
  if (!admin) return unauthorizedResponse();

  try {
    const filters = getQueryParams(request);
    const { data, count, error } = await usersService.list(filters);
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

    if (!body.email || !body.name) {
      return errorResponse("Nom et email requis", 400);
    }

    // Hash password if provided
    if (body.password) {
      const { hash } = await import("bcryptjs");
      body.password_hash = await hash(body.password, 12);
      delete body.password;
    }

    const { data, error } = await usersService.create(body);
    if (error) return errorResponse(error.message, 400);

    await logsService.create({
      user_id: admin.id,
      action: "user_created",
      details: { created_user_id: data.id, email: body.email },
      ip_address: request.headers.get("x-forwarded-for") || "unknown",
      severity: "info",
    });

    return Response.json(data, { status: 201 });
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Erreur serveur";
    return errorResponse(msg);
  }
}
