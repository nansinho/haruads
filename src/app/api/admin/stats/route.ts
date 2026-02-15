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
      .select("page_path, viewed_at")
      .gte("viewed_at", since.toISOString())
      .order("viewed_at", { ascending: false });

    if (error) return errorResponse(error.message);

    // Aggregate by page
    const byPage: Record<string, number> = {};
    const byDay: Record<string, number> = {};
    (pageViews || []).forEach((v: { page_path: string; viewed_at: string }) => {
      byPage[v.page_path] = (byPage[v.page_path] || 0) + 1;
      const day = v.viewed_at.slice(0, 10);
      byDay[day] = (byDay[day] || 0) + 1;
    });

    const topPages = Object.entries(byPage)
      .map(([page, views]) => ({ page, views }))
      .sort((a, b) => b.views - a.views)
      .slice(0, 20);

    const dailyViews = Object.entries(byDay)
      .map(([date, views]) => ({ date, views }))
      .sort((a, b) => a.date.localeCompare(b.date));

    return Response.json({
      totalViews: pageViews?.length || 0,
      topPages,
      dailyViews,
      period: days,
    });
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Erreur serveur";
    return errorResponse(msg);
  }
}
