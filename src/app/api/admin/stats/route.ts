import { NextRequest } from "next/server";
import { getAdminUser, unauthorizedResponse, errorResponse, getQueryParams } from "@/lib/api-auth";
import { supabase } from "@/lib/supabase";

export async function GET(request: NextRequest) {
  const admin = await getAdminUser(request);
  if (!admin) return unauthorizedResponse();

  try {
    if (!supabase) return errorResponse("Supabase non configuré");

    const filters = getQueryParams(request);
    const { searchParams } = new URL(request.url);
    const days = parseInt(searchParams.get("period") || "") || parseInt(filters.status as string) || 30;
    const since = new Date();
    since.setDate(since.getDate() - days);

    // Get page views aggregated
    const { data: pageViews, error } = await supabase
      .from("page_views")
      .select("page_path, ip_address, session_id, created_at")
      .gte("created_at", since.toISOString())
      .order("created_at", { ascending: false });

    if (error) return errorResponse(error.message);

    // Aggregate by page, day, and unique visitors
    const byPage: Record<string, { views: number; ips: Set<string> }> = {};
    const byDay: Record<string, number> = {};
    const uniqueIps = new Set<string>();

    (pageViews || []).forEach((v: { page_path: string; ip_address: string | null; session_id: string | null; created_at: string }) => {
      // By page
      if (!byPage[v.page_path]) {
        byPage[v.page_path] = { views: 0, ips: new Set() };
      }
      byPage[v.page_path].views += 1;
      if (v.ip_address) byPage[v.page_path].ips.add(v.ip_address);

      // By day
      const day = v.created_at.slice(0, 10);
      byDay[day] = (byDay[day] || 0) + 1;

      // Unique visitors
      const visitorKey = v.session_id || v.ip_address;
      if (visitorKey) uniqueIps.add(visitorKey);
    });

    const topPages = Object.entries(byPage)
      .map(([path, data]) => ({
        path,
        views: data.views,
        uniqueVisitors: data.ips.size,
        avgTime: "-",
      }))
      .sort((a, b) => b.views - a.views)
      .slice(0, 20);

    const dailyViews = Object.entries(byDay)
      .map(([date, views]) => ({ date, views }))
      .sort((a, b) => a.date.localeCompare(b.date));

    // Count unique pages indexed (from blog_posts + projects + static pages)
    const totalPages = Object.keys(byPage).length;

    // Conversion rate: quote requests / unique visitors
    const { count: quoteCount } = await supabase
      .from("quote_requests")
      .select("id", { count: "exact", head: true })
      .gte("created_at", since.toISOString());

    const uniqueVisitors = uniqueIps.size;
    const conversionRate = uniqueVisitors > 0
      ? ((quoteCount || 0) / uniqueVisitors) * 100
      : 0;

    return Response.json({
      totalViews: pageViews?.length || 0,
      uniqueVisitors,
      totalPages,
      conversionRate,
      topPages,
      dailyViews,
      period: days,
    });
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Erreur serveur";
    return errorResponse(msg);
  }
}
