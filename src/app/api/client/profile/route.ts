import { NextRequest } from "next/server";
import { getAuthenticatedUser, unauthorizedResponse, errorResponse } from "@/lib/api-auth";

export async function GET(request: NextRequest) {
  const user = await getAuthenticatedUser(request);
  if (!user) return unauthorizedResponse();

  try {
    const { supabase } = await import("@/lib/supabase");
    if (!supabase) return errorResponse("Base de données non configurée", 503);

    const { data, error } = await supabase
      .from("users")
      .select("id, name, email, phone, company, address, city")
      .eq("id", user.id)
      .single();

    if (error) return errorResponse("Utilisateur introuvable", 404);
    return Response.json(data);
  } catch {
    return errorResponse("Erreur serveur");
  }
}

export async function PUT(request: NextRequest) {
  const user = await getAuthenticatedUser(request);
  if (!user) return unauthorizedResponse();

  try {
    const body = await request.json();

    const allowedFields = ["name", "phone", "company", "address", "city"];
    const updateData: Record<string, string> = {};
    for (const field of allowedFields) {
      if (field in body && typeof body[field] === "string") {
        updateData[field] = body[field].trim();
      }
    }

    if (Object.keys(updateData).length === 0) {
      return errorResponse("Aucun champ à mettre à jour", 400);
    }

    const { supabase } = await import("@/lib/supabase");
    if (!supabase) return errorResponse("Base de données non configurée", 503);

    const { data, error } = await supabase
      .from("users")
      .update(updateData)
      .eq("id", user.id)
      .select("id, name, email, phone, company, address, city")
      .single();

    if (error) return errorResponse("Erreur lors de la mise à jour", 400);
    return Response.json(data);
  } catch {
    return errorResponse("Erreur serveur");
  }
}
