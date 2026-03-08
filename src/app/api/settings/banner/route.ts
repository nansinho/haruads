import { NextResponse } from "next/server";

export async function GET() {
  try {
    const { supabase } = await import("@/lib/supabase");

    if (!supabase) {
      return NextResponse.json({ enabled: false });
    }

    const { data, error } = await supabase
      .from("site_settings")
      .select("key, value")
      .in("key", [
        "promo_banner_enabled",
        "promo_banner_text",
        "promo_banner_link",
        "promo_banner_link_text",
      ]);

    if (error || !data) {
      return NextResponse.json({ enabled: false });
    }

    const settings: Record<string, string> = {};
    for (const row of data) {
      if (row.value) settings[row.key] = row.value;
    }

    return NextResponse.json({
      enabled: settings.promo_banner_enabled === "true",
      text: settings.promo_banner_text || "",
      link: settings.promo_banner_link || "",
      linkText: settings.promo_banner_link_text || "",
    });
  } catch {
    return NextResponse.json({ enabled: false });
  }
}
