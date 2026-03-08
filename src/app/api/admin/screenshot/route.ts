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
    const { url, count = 6 } = await request.json();

    if (!url) {
      return errorResponse("L'URL est requise.", 400);
    }

    const executablePath =
      process.env.PUPPETEER_EXECUTABLE_PATH ||
      "/usr/bin/chromium-browser";

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

    // 1. Navigate to homepage and capture it
    await page.goto(url, { waitUntil: "networkidle2", timeout: 20000 });
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // 2. Extract internal links from the page
    const baseUrl = new URL(url);
    const internalLinks: string[] = await page.evaluate((hostname: string) => {
      const anchors = Array.from(document.querySelectorAll("a[href]"));
      const links: string[] = [];
      const seen = new Set<string>();

      for (const a of anchors) {
        try {
          const href = (a as HTMLAnchorElement).href;
          const linkUrl = new URL(href);

          // Must be same hostname, not an anchor/hash, not a file
          if (
            linkUrl.hostname === hostname &&
            linkUrl.pathname !== "/" &&
            linkUrl.pathname !== window.location.pathname &&
            !linkUrl.pathname.match(/\.(pdf|zip|png|jpg|jpeg|gif|svg|webp|css|js)$/i) &&
            !seen.has(linkUrl.pathname)
          ) {
            seen.add(linkUrl.pathname);
            links.push(linkUrl.href);
          }
        } catch {
          // Invalid URL, skip
        }
      }
      return links;
    }, baseUrl.hostname);

    // 3. Build list of pages to capture (homepage + up to 5 internal pages)
    const pagesToCapture = [url, ...internalLinks.slice(0, count - 1)];

    // 4. Capture all pages
    const uploadedUrls: string[] = [];

    for (const pageUrl of pagesToCapture) {
      try {
        if (pageUrl !== url) {
          await page.goto(pageUrl, { waitUntil: "networkidle2", timeout: 15000 });
          await new Promise((resolve) => setTimeout(resolve, 1000));
        }

        const screenshotBuffer = await page.screenshot({
          type: "png",
          clip: { x: 0, y: 0, width: 1280, height: 720 },
        });

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

        if (!uploadError) {
          const { data: urlData } = db.storage.from("images").getPublicUrl(filename);
          uploadedUrls.push(urlData.publicUrl);
        }
      } catch {
        // Skip this page if it fails, continue with others
      }
    }

    await browser.close();
    browser = undefined;

    return Response.json({ urls: uploadedUrls });
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
