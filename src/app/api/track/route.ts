import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { supabase } = await import("@/lib/supabase");
    if (!supabase) return new Response(null, { status: 204 });

    const body = await request.json();
    const pagePath = body.path as string;
    if (!pagePath || typeof pagePath !== "string") {
      return new Response(null, { status: 204 });
    }

    // Skip admin/api paths
    if (pagePath.startsWith("/admin") || pagePath.startsWith("/api")) {
      return new Response(null, { status: 204 });
    }

    const userAgent = request.headers.get("user-agent") || "";
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    const referrer = (body.referrer as string) || "";

    await supabase.from("page_views").insert({
      page_path: pagePath.slice(0, 500),
      referrer: referrer.slice(0, 1000),
      user_agent: userAgent.slice(0, 500),
      ip_address: ip,
      session_id: (body.sessionId as string) || null,
    });

    return new Response(null, { status: 204 });
  } catch {
    return new Response(null, { status: 204 });
  }
}
