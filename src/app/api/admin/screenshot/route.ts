import { NextRequest } from "next/server";
import { getAdminUser, unauthorizedResponse, errorResponse } from "@/lib/api-auth";
import { supabaseAdmin, supabase } from "@/lib/supabase";
import puppeteer, { type Page } from "puppeteer-core";
import fs from "fs";
import path from "path";

type DB = NonNullable<typeof supabaseAdmin | typeof supabase>;

// Remove cookie banners, popups, overlays, and fix overflow issues
async function cleanPage(page: Page) {
  await page.evaluate(() => {
    document.documentElement.style.overflowX = "hidden";
    document.body.style.overflowX = "hidden";

    const selectors = [
      '[class*="cookie"]', '[id*="cookie"]',
      '[class*="consent"]', '[id*="consent"]',
      '[class*="gdpr"]', '[id*="gdpr"]',
      '[class*="rgpd"]', '[id*="rgpd"]',
      '[class*="overlay"]', '[class*="modal"]',
      '[class*="popup"]', '[id*="popup"]',
      '[class*="banner-bottom"]',
      '#onetrust-banner-sdk', '#onetrust-consent-sdk',
      '.cc-banner', '.cc-window',
      '#cookiebanner', '#cookie-bar',
      '[aria-label*="cookie" i]', '[aria-label*="consent" i]',
    ];

    for (const sel of selectors) {
      document.querySelectorAll(sel).forEach((el) => {
        const style = window.getComputedStyle(el);
        if (
          style.position === "fixed" ||
          style.position === "sticky" ||
          style.zIndex > "999"
        ) {
          (el as HTMLElement).style.display = "none";
        }
      });
    }

    document.querySelectorAll("*").forEach((el) => {
      const style = window.getComputedStyle(el);
      if (
        (style.position === "fixed" || style.position === "sticky") &&
        parseInt(style.zIndex) > 9000
      ) {
        (el as HTMLElement).style.display = "none";
      }
    });
  });
}

async function uploadImage(db: DB, buffer: Uint8Array): Promise<string | null> {
  const timestamp = Date.now();
  const randomId = Math.random().toString(36).substring(2, 8);
  const filename = `projects/${timestamp}-${randomId}.png`;

  const { error } = await db.storage
    .from("images")
    .upload(filename, buffer, { contentType: "image/png", upsert: false });

  if (error) {
    console.error("[screenshot] Upload error:", error);
    return null;
  }

  const { data } = db.storage.from("images").getPublicUrl(filename);
  return data.publicUrl;
}

async function captureAndUpload(page: Page, db: DB): Promise<string | null> {
  await cleanPage(page);
  await new Promise((resolve) => setTimeout(resolve, 300));
  const buffer = await page.screenshot({ type: "png" });
  return uploadImage(db, new Uint8Array(buffer));
}

// Generate a composite featured image: hero left + full page right
// Uses temp files to avoid base64 memory issues, reuses same page
async function generateFeaturedImage(
  page: Page,
  db: DB,
  url: string,
): Promise<string | null> {
  const tmpDir = "/tmp";
  const heroPath = path.join(tmpDir, `hero-${Date.now()}.png`);
  const fullPath = path.join(tmpDir, `full-${Date.now()}.png`);
  const compositePath = path.join(tmpDir, `composite-${Date.now()}.html`);

  try {
    // Navigate to homepage and clean
    await page.goto(url, { waitUntil: "networkidle2", timeout: 20000 });
    await new Promise((resolve) => setTimeout(resolve, 2000));
    await cleanPage(page);
    await new Promise((resolve) => setTimeout(resolve, 300));

    // Capture hero (viewport) to temp file
    const heroBuffer = await page.screenshot({ type: "png" });
    fs.writeFileSync(heroPath, heroBuffer);

    // Capture full page to temp file (limited to reasonable height via clip)
    // First get page height
    const pageHeight = await page.evaluate(() => {
      return Math.min(document.body.scrollHeight, 4000);
    });

    const fullBuffer = await page.screenshot({
      type: "png",
      clip: { x: 0, y: 0, width: 1280, height: pageHeight },
    });
    fs.writeFileSync(fullPath, fullBuffer);

    // Create composite HTML using file:// references
    const compositeHtml = `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;width:1280px;height:720px;overflow:hidden;background:#0a0a0a;display:flex;font-size:0;">
  <!-- Left: hero cropped & zoomed -->
  <div style="width:750px;height:720px;overflow:hidden;position:relative;flex-shrink:0;">
    <img src="file://${heroPath}"
         style="width:920px;height:auto;position:absolute;top:-10px;left:-30px;display:block;" />
    <div style="position:absolute;top:0;right:0;width:150px;height:100%;
                background:linear-gradient(to right,transparent,#0a0a0a);"></div>
  </div>
  <!-- Right: full page screenshot -->
  <div style="width:530px;height:720px;overflow:hidden;position:relative;
              display:flex;flex-direction:column;padding:20px 20px 0 0;box-sizing:border-box;">
    <img src="file://${fullPath}"
         style="width:510px;height:auto;border-radius:10px;display:block;
                box-shadow:0 8px 32px rgba(0,0,0,0.6);" />
  </div>
</body>
</html>`;

    fs.writeFileSync(compositePath, compositeHtml);

    // Render composite on the same page using file:// protocol
    await page.goto(`file://${compositePath}`, { waitUntil: "load", timeout: 10000 });
    await new Promise((resolve) => setTimeout(resolve, 500));

    const compositeBuffer = await page.screenshot({ type: "png" });
    return uploadImage(db, new Uint8Array(compositeBuffer));
  } catch (err) {
    console.error("[screenshot] Featured image generation failed:", err);
    return null;
  } finally {
    // Cleanup temp files
    for (const f of [heroPath, fullPath, compositePath]) {
      try { fs.unlinkSync(f); } catch { /* ignore */ }
    }
  }
}

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
        "--window-size=1280,720",
      ],
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 720, deviceScaleFactor: 1 });

    // 1. Navigate to homepage
    await page.goto(url, { waitUntil: "networkidle2", timeout: 20000 });
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // 2. Extract internal links FIRST (before any navigation)
    const baseUrl = new URL(url);
    const internalLinks: string[] = await page.evaluate((hostname: string) => {
      const anchors = Array.from(document.querySelectorAll("a[href]"));
      const links: string[] = [];
      const seen = new Set<string>();

      for (const a of anchors) {
        try {
          const href = (a as HTMLAnchorElement).href;
          const linkUrl = new URL(href);

          if (
            linkUrl.hostname === hostname &&
            linkUrl.pathname !== "/" &&
            linkUrl.pathname !== window.location.pathname &&
            !linkUrl.hash &&
            !linkUrl.pathname.match(/\.(pdf|zip|png|jpg|jpeg|gif|svg|webp|css|js)$/i) &&
            !linkUrl.pathname.match(/\/(cart|panier|checkout|compte|account|login|register|wp-admin)/i) &&
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

    // 3. Capture homepage screenshot for gallery
    const uploadedUrls: string[] = [];
    const homepageUrl = await captureAndUpload(page, db);
    if (homepageUrl) uploadedUrls.push(homepageUrl);

    // 4. Generate featured composite image (hero + full page)
    // This navigates the page internally, so we do it after extracting links
    let featuredUrl: string | null = null;
    try {
      featuredUrl = await generateFeaturedImage(page, db, url);
    } catch (err) {
      console.error("[screenshot] Featured image error:", err);
    }

    // 5. Capture internal pages for gallery
    const pagesToVisit = internalLinks.slice(0, count - 1);
    for (const pageUrl of pagesToVisit) {
      try {
        await page.goto(pageUrl, { waitUntil: "networkidle2", timeout: 15000 });
        await new Promise((resolve) => setTimeout(resolve, 1500));
        const capturedUrl = await captureAndUpload(page, db);
        if (capturedUrl) uploadedUrls.push(capturedUrl);
      } catch {
        // Skip failed pages
      }
    }

    await browser.close();
    browser = undefined;

    return Response.json({ urls: uploadedUrls, featured: featuredUrl });
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
