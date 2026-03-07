import { NextRequest } from "next/server";
import { getAdminUser, unauthorizedResponse, errorResponse } from "@/lib/api-auth";
import { supabaseAdmin } from "@/lib/supabase";

function getClient() {
  if (!supabaseAdmin) throw new Error("Supabase admin non configuré");
  return supabaseAdmin;
}

export async function GET(request: NextRequest) {
  const admin = await getAdminUser(request);
  if (!admin) return unauthorizedResponse();

  try {
    const db = getClient();
    const { data, error } = await db
      .from("tags")
      .select("*")
      .order("name", { ascending: true });

    if (error) return errorResponse(error.message, 400);
    return Response.json({ data });
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Erreur serveur";
    return errorResponse(msg);
  }
}

export async function POST(request: NextRequest) {
  const admin = await getAdminUser(request);
  if (!admin) return unauthorizedResponse();

  try {
    const db = getClient();
    const body = await request.json();

    if (!body.name?.trim()) {
      return errorResponse("Nom du tag requis", 400);
    }

    const { data, error } = await db
      .from("tags")
      .upsert({ name: body.name.trim() }, { onConflict: "name" })
      .select()
      .single();

    if (error) return errorResponse(error.message, 400);
    return Response.json(data, { status: 201 });
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Erreur serveur";
    return errorResponse(msg);
  }
}

export async function DELETE(request: NextRequest) {
  const admin = await getAdminUser(request);
  if (!admin) return unauthorizedResponse();

  try {
    const db = getClient();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) return errorResponse("ID requis", 400);

    const { error } = await db.from("tags").delete().eq("id", id);
    if (error) return errorResponse(error.message, 400);
    return Response.json({ success: true });
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Erreur serveur";
    return errorResponse(msg);
  }
}
