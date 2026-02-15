import { NextResponse } from "next/server";

// Simple rate limiting: track last setup attempt
let lastSetupAttempt = 0;
const COOLDOWN_MS = 60_000; // 60 seconds

export async function POST(request: Request) {
  try {
    // Rate limit
    const now = Date.now();
    if (now - lastSetupAttempt < COOLDOWN_MS) {
      return NextResponse.json(
        { error: "Trop de tentatives. Réessayez dans 1 minute." },
        { status: 429 }
      );
    }
    lastSetupAttempt = now;

    const { supabase } = await import("@/lib/supabase");
    const { hash } = await import("bcryptjs");

    if (!supabase) {
      return NextResponse.json(
        { error: "Base de données non configurée" },
        { status: 503 }
      );
    }

    // Check if an admin already exists
    const { data: existingAdmin } = await supabase
      .from("users")
      .select("id")
      .eq("role", "admin")
      .limit(1)
      .single();

    if (existingAdmin) {
      return NextResponse.json(
        { error: "Un administrateur existe déjà. Setup désactivé." },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { email, password, name } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email et mot de passe requis" },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: "Le mot de passe doit contenir au moins 8 caractères" },
        { status: 400 }
      );
    }

    const passwordHash = await hash(password, 12);

    const { data: user, error } = await supabase
      .from("users")
      .insert({
        name: name || "Admin",
        email,
        password_hash: passwordHash,
        role: "admin",
        is_active: true,
      })
      .select("id, name, email, role")
      .single();

    if (error) {
      if (error.code === "23505") {
        return NextResponse.json(
          { error: "Cet email est déjà utilisé" },
          { status: 409 }
        );
      }
      return NextResponse.json(
        { error: "Erreur lors de la création du compte" },
        { status: 500 }
      );
    }

    // Send welcome email
    try {
      const { sendEmail, welcomeEmail } = await import("@/lib/email");
      const emailContent = welcomeEmail(name || "Admin");
      await sendEmail({
        to: email,
        subject: emailContent.subject,
        html: emailContent.html,
      });
    } catch {
      // Email failure should not block setup
    }

    return NextResponse.json({
      message: "Compte admin créé avec succès",
      user,
    });
  } catch {
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const { supabase } = await import("@/lib/supabase");

    if (!supabase) {
      return NextResponse.json({ setup_required: true, db_connected: false });
    }

    const { data: existingAdmin } = await supabase
      .from("users")
      .select("id")
      .eq("role", "admin")
      .limit(1)
      .single();

    return NextResponse.json({
      setup_required: !existingAdmin,
      db_connected: true,
    });
  } catch {
    return NextResponse.json({ setup_required: true, db_connected: false });
  }
}
