import { NextRequest } from "next/server";
import { getAdminUser, unauthorizedResponse, errorResponse } from "@/lib/api-auth";
import { blogService } from "@/lib/supabase-admin";

export async function GET(request: NextRequest) {
  const admin = await getAdminUser(request);
  if (!admin) return unauthorizedResponse();

  try {
    const [categories, tags] = await Promise.all([
      blogService.getDistinctCategories(),
      blogService.getDistinctTags(),
    ]);

    return Response.json({ categories, tags });
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Erreur serveur";
    return errorResponse(msg);
  }
}
