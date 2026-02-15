import { NextRequest, NextResponse } from "next/server";
import { decode } from "@auth/core/jwt";
import { DEFAULT_THEME, type ThemeColors } from "@/lib/theme";

async function getUserFromToken(request: NextRequest) {
  const secret = process.env.AUTH_SECRET;
  if (!secret) return null;

  const cookieName = request.cookies.has("__Secure-authjs.session-token")
    ? "__Secure-authjs.session-token"
    : "authjs.session-token";

  const token = request.cookies.get(cookieName)?.value;
  if (!token) return null;

  try {
    const decoded = await decode({ token, secret, salt: cookieName });
    return decoded as {
      id?: string;
      role?: string;
      email?: string;
    } | null;
  } catch {
    return null;
  }
}

const HEX_REGEX = /^#[0-9a-fA-F]{6}$/;

export async function GET() {
  try {
    const { supabase } = await import("@/lib/supabase");

    if (!supabase) {
      return NextResponse.json({ colors: DEFAULT_THEME });
    }

    const { data, error } = await supabase
      .from("site_settings")
      .select("key, value")
      .in("key", ["theme_dark", "theme_accent"]);

    if (error || !data) {
      return NextResponse.json({ colors: DEFAULT_THEME });
    }

    const colors: ThemeColors = { ...DEFAULT_THEME };
    for (const row of data) {
      if (row.key === "theme_dark" && row.value) colors.dark = row.value;
      if (row.key === "theme_accent" && row.value) colors.accent = row.value;
    }

    return NextResponse.json({ colors });
  } catch {
    return NextResponse.json({ colors: DEFAULT_THEME });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const user = await getUserFromToken(request);
    if (!user?.id || user.role !== "admin") {
      return NextResponse.json(
        { error: "Non autorisé" },
        { status: 403 }
      );
    }

    const body = await request.json();
    const dark = body.dark as string;
    const accent = body.accent as string;

    if (!dark || !accent || !HEX_REGEX.test(dark) || !HEX_REGEX.test(accent)) {
      return NextResponse.json(
        { error: "Couleurs invalides. Format attendu : #rrggbb" },
        { status: 400 }
      );
    }

    const { supabase } = await import("@/lib/supabase");

    if (!supabase) {
      return NextResponse.json(
        { error: "Base de données non configurée" },
        { status: 503 }
      );
    }

    const entries = [
      {
        key: "theme_dark",
        value: dark,
        type: "string",
        category: "appearance",
        label: "Couleur de fond",
      },
      {
        key: "theme_accent",
        value: accent,
        type: "string",
        category: "appearance",
        label: "Couleur d'accent",
      },
    ];

    for (const entry of entries) {
      const { error } = await supabase
        .from("site_settings")
        .upsert(entry, { onConflict: "key" });

      if (error) {
        return NextResponse.json(
          { error: "Erreur lors de la sauvegarde" },
          { status: 500 }
        );
      }
    }

    return NextResponse.json({
      success: true,
      colors: { dark, accent },
    });
  } catch {
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    );
  }
}
