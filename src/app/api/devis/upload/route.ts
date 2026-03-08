import { NextRequest } from "next/server";
import { supabaseAdmin, supabase } from "@/lib/supabase";

export async function POST(request: NextRequest) {
  const db = supabaseAdmin || supabase;
  if (!db) {
    return Response.json({ error: "Supabase non configuré" }, { status: 500 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return Response.json({ error: "Aucun fichier fourni" }, { status: 400 });
    }

    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
      "image/gif",
      "image/svg+xml",
      "application/pdf",
    ];
    if (!allowedTypes.includes(file.type)) {
      return Response.json(
        { error: "Type de fichier non supporté. Utilisez JPG, PNG, WebP, GIF, SVG ou PDF." },
        { status: 400 }
      );
    }

    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      return Response.json({ error: "Le fichier ne doit pas dépasser 10 Mo" }, { status: 400 });
    }

    const ext = file.name.split(".").pop()?.toLowerCase() || "bin";
    const timestamp = Date.now();
    const randomId = Math.random().toString(36).substring(2, 8);
    const filename = `devis/${timestamp}-${randomId}.${ext}`;

    const arrayBuffer = await file.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);

    const { error: uploadError } = await db.storage
      .from("images")
      .upload(filename, buffer, {
        contentType: file.type,
        upsert: false,
      });

    if (uploadError) {
      return Response.json({ error: `Erreur upload: ${uploadError.message}` }, { status: 500 });
    }

    const { data: urlData } = db.storage.from("images").getPublicUrl(filename);

    return Response.json({
      url: urlData.publicUrl,
      filename: file.name,
    });
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Erreur serveur";
    return Response.json({ error: msg }, { status: 500 });
  }
}
