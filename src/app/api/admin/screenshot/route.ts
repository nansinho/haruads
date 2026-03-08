import { NextRequest } from "next/server";
import { getAdminUser, unauthorizedResponse, errorResponse } from "@/lib/api-auth";
import { getApiKey } from "@/lib/encryption";
import { supabaseAdmin, supabase } from "@/lib/supabase";

export async function POST(request: NextRequest) {
  const admin = await getAdminUser(request);
  if (!admin) return unauthorizedResponse();

  const apiKey = await getApiKey("screenshot_api_key");
  if (!apiKey) {
    return errorResponse(
      "Clé API ScreenshotOne non configurée. Ajoutez-la dans Paramètres > Clés API.",
      503,
    );
  }

  const db = supabaseAdmin || supabase;
  if (!db) {
    return errorResponse("Supabase non configuré", 500);
  }

  try {
    const { url } = await request.json();

    if (!url) {
      return errorResponse("L'URL est requise.", 400);
    }

    // Call ScreenshotOne API
    const screenshotUrl = new URL("https://api.screenshotone.com/take");
    screenshotUrl.searchParams.set("access_key", apiKey);
    screenshotUrl.searchParams.set("url", url);
    screenshotUrl.searchParams.set("viewport_width", "1280");
    screenshotUrl.searchParams.set("viewport_height", "720");
    screenshotUrl.searchParams.set("format", "png");
    screenshotUrl.searchParams.set("block_ads", "true");
    screenshotUrl.searchParams.set("block_cookie_banners", "true");
    screenshotUrl.searchParams.set("timeout", "15");

    const res = await fetch(screenshotUrl.toString(), {
      signal: AbortSignal.timeout(20000),
    });

    if (!res.ok) {
      const errText = await res.text();
      return errorResponse(`Erreur capture screenshot: ${errText}`, 502);
    }

    const imageBuffer = new Uint8Array(await res.arrayBuffer());

    // Upload to Supabase Storage
    const timestamp = Date.now();
    const randomId = Math.random().toString(36).substring(2, 8);
    const filename = `projects/${timestamp}-${randomId}.png`;

    const { error: uploadError } = await db.storage
      .from("images")
      .upload(filename, imageBuffer, {
        contentType: "image/png",
        upsert: false,
      });

    if (uploadError) {
      return errorResponse(`Erreur upload: ${uploadError.message}`, 500);
    }

    const { data: urlData } = db.storage.from("images").getPublicUrl(filename);

    return Response.json({ url: urlData.publicUrl });
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Erreur lors de la capture";
    console.error("[screenshot]", error);
    return errorResponse(msg);
  }
}
