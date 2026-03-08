import { NextRequest } from "next/server";
import { getAdminUser, unauthorizedResponse, errorResponse } from "@/lib/api-auth";
import { supabaseAdmin, supabase } from "@/lib/supabase";
import puppeteer from "puppeteer-core";

export async function POST(request: NextRequest) {
  const admin = await getAdminUser(request);
  if (!admin) return unauthorizedResponse();

  const db = supabaseAdmin || supabase;
  if (!db) {
    return errorResponse("Supabase non configuré", 500);
  }

  let browser;
  try {
    const { url } = await request.json();

    if (!url) {
      return errorResponse("L'URL est requise.", 400);
    }

    // Find Chromium executable path
    const executablePath =
      process.env.PUPPETEER_EXECUTABLE_PATH ||
      "/usr/bin/chromium-browser" ||
      "/usr/bin/chromium";

    browser = await puppeteer.launch({
      executablePath,
      headless: true,
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
        "--disable-gpu",
        "--disable-extensions",
        "--disable-background-networking",
        "--single-process",
      ],
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 720 });
    await page.goto(url, { waitUntil: "networkidle2", timeout: 20000 });

    // Wait a bit for any late-loading content
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const screenshotBuffer = await page.screenshot({
      type: "png",
      clip: { x: 0, y: 0, width: 1280, height: 720 },
    });

    await browser.close();
    browser = undefined;

    // Upload to Supabase Storage
    const imageBuffer = new Uint8Array(screenshotBuffer);
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
  } finally {
    if (browser) {
      await browser.close().catch(() => {});
    }
  }
}
