import { NextRequest } from "next/server";
import { getAdminUser, unauthorizedResponse, errorResponse } from "@/lib/api-auth";
import { supabase } from "@/lib/supabase";

export async function POST(request: NextRequest) {
  const admin = await getAdminUser(request);
  if (!admin) return unauthorizedResponse();

  if (!supabase) {
    return errorResponse("Supabase non configuré", 500);
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return errorResponse("Aucun fichier fourni", 400);
    }

    // Validate file type
    const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif", "image/svg+xml"];
    if (!allowedTypes.includes(file.type)) {
      return errorResponse("Type de fichier non supporté. Utilisez JPG, PNG, WebP, GIF ou SVG.", 400);
    }

    // Validate file size (5MB max)
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      return errorResponse("Le fichier ne doit pas dépasser 5 Mo", 400);
    }

    // Generate unique filename
    const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
    const timestamp = Date.now();
    const randomId = Math.random().toString(36).substring(2, 8);
    const filename = `projects/${timestamp}-${randomId}.${ext}`;

    // Read file as buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);

    // Upload to Supabase Storage
    const { error: uploadError } = await supabase.storage
      .from("images")
      .upload(filename, buffer, {
        contentType: file.type,
        upsert: false,
      });

    if (uploadError) {
      return errorResponse(`Erreur upload: ${uploadError.message}`, 500);
    }

    // Get public URL
    const { data: urlData } = supabase.storage.from("images").getPublicUrl(filename);

    return Response.json({
      url: urlData.publicUrl,
      filename,
    });
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Erreur serveur";
    return errorResponse(msg);
  }
}
