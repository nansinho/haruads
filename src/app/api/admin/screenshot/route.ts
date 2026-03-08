import { NextRequest } from "next/server";
import { getAdminUser, unauthorizedResponse, errorResponse } from "@/lib/api-auth";
import { supabaseAdmin, supabase } from "@/lib/supabase";
import puppeteer, { type Page } from "puppeteer-core";

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

async function captureAndUpload(page: Page, db: DB): Promise<string | null> {
  await cleanPage(page);
  await new Promise((resolve) => setTimeout(resolve, 300));
  const buffer = await page.screenshot({ type: "png" });

  const imageBuffer = new Uint8Array(buffer);
  const timestamp = Date.now();
  const randomId = Math.random().toString(36).substring(2, 8);
  const filename = `projects/${timestamp}-${randomId}.png`;

  const { error: uploadError } = await db.storage
    .from("images")
    .upload(filename, imageBuffer, { contentType: "image/png", upsert: false });

  if (uploadError) return null;

  const { data: urlData } = db.storage.from("images").getPublicUrl(filename);
  return urlData.publicUrl;
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

    // 2. Extract internal links
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

    // 3. Capture homepage first
    const uploadedUrls: string[] = [];
    const homepageUrl = await captureAndUpload(page, db);
    if (homepageUrl) uploadedUrls.push(homepageUrl);

    // 4. Capture internal pages
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
