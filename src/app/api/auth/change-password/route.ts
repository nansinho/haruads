import { NextRequest, NextResponse } from "next/server";
import { decode } from "@auth/core/jwt";

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
    return decoded as { id?: string; role?: string; email?: string; name?: string } | null;
  } catch {
    return null;
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await getUserFromToken(request);
    if (!user?.id) {
      return NextResponse.json(
        { error: "Non authentifié" },
        { status: 401 }
      );
    }

    const { currentPassword, newPassword } = await request.json();

    if (!currentPassword || !newPassword) {
      return NextResponse.json(
        { error: "Ancien et nouveau mot de passe requis" },
        { status: 400 }
      );
    }

    if (newPassword.length < 8) {
      return NextResponse.json(
        { error: "Le nouveau mot de passe doit contenir au moins 8 caractères" },
        { status: 400 }
      );
    }

    const { supabase } = await import("@/lib/supabase");
    const { compare, hash } = await import("bcryptjs");

    if (!supabase) {
      return NextResponse.json(
        { error: "Base de données non configurée" },
        { status: 503 }
      );
    }

    // Get user from database
    const { data: dbUser, error: fetchError } = await supabase
      .from("users")
      .select("id, name, email, password_hash")
      .eq("id", user.id)
      .single();

    if (fetchError || !dbUser || !dbUser.password_hash) {
      return NextResponse.json(
        { error: "Utilisateur introuvable" },
        { status: 404 }
      );
    }

    // Verify current password
    const isValid = await compare(currentPassword, dbUser.password_hash);
    if (!isValid) {
      return NextResponse.json(
        { error: "Ancien mot de passe incorrect" },
        { status: 403 }
      );
    }

    // Hash new password
    const newHash = await hash(newPassword, 12);

    // Update in database
    const { error: updateError } = await supabase
      .from("users")
      .update({ password_hash: newHash })
      .eq("id", user.id);

    if (updateError) {
      return NextResponse.json(
        { error: "Erreur lors de la mise à jour" },
        { status: 500 }
      );
    }

    // Send confirmation email
    try {
      const { sendEmail, passwordChangedEmail } = await import("@/lib/email");
      const emailContent = passwordChangedEmail(dbUser.name || "");
      await sendEmail({
        to: dbUser.email,
        subject: emailContent.subject,
        html: emailContent.html,
      });
    } catch {
      // Email failure should not block password change
    }

    return NextResponse.json({ message: "Mot de passe modifié avec succès" });
  } catch {
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    );
  }
}
