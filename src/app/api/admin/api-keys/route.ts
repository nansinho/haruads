import { NextRequest } from "next/server";
import { getAdminUser, unauthorizedResponse, errorResponse } from "@/lib/api-auth";
import { settingsService, logsService } from "@/lib/supabase-admin";
import { encrypt, decrypt, maskApiKey } from "@/lib/encryption";

// Keys we support, stored with category "api_keys" in site_settings
const SUPPORTED_KEYS = [
  "anthropic_api_key",
  "openai_api_key",
  "google_site_verification",
] as const;

type ApiKeyName = (typeof SUPPORTED_KEYS)[number];

/**
 * GET /api/admin/api-keys
 * Returns all API keys with masked values (never sends the full key to the client).
 */
export async function GET(request: NextRequest) {
  const admin = await getAdminUser(request);
  if (!admin) return unauthorizedResponse();

  try {
    const { data, error } = await settingsService.getAll();
    if (error) return errorResponse(error.message, 400);

    const keys: Record<string, { configured: boolean; masked: string }> = {};

    for (const keyName of SUPPORTED_KEYS) {
      const setting = data?.find(
        (s: { key: string }) => s.key === keyName
      );

      if (setting?.value) {
        try {
          const decrypted = decrypt(setting.value);
          keys[keyName] = { configured: true, masked: maskApiKey(decrypted) };
        } catch {
          // Value might not be encrypted (legacy) — still mask it
          keys[keyName] = { configured: true, masked: maskApiKey(setting.value) };
        }
      } else {
        keys[keyName] = { configured: false, masked: "" };
      }
    }

    return Response.json({ keys });
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Erreur serveur";
    return errorResponse(msg);
  }
}

/**
 * PUT /api/admin/api-keys
 * Accepts { key: "anthropic_api_key", value: "sk-ant-..." }
 * Encrypts and stores in site_settings.
 */
export async function PUT(request: NextRequest) {
  const admin = await getAdminUser(request);
  if (!admin) return unauthorizedResponse();

  try {
    const { key, value } = (await request.json()) as {
      key: ApiKeyName;
      value: string;
    };

    if (!SUPPORTED_KEYS.includes(key)) {
      return errorResponse(`Clé non supportée: ${key}`, 400);
    }

    if (!value || value.trim() === "") {
      return errorResponse("La valeur ne peut pas être vide", 400);
    }

    // Encrypt the value before storing
    const encryptedValue = encrypt(value.trim());

    const { error } = await settingsService.upsert([
      {
        key,
        value: encryptedValue,
        updated_by: admin.id,
      },
    ]);

    if (error) return errorResponse(error.message, 400);

    await logsService.create({
      user_id: admin.id,
      action: "api_key_updated",
      details: { key_name: key },
      ip_address: request.headers.get("x-forwarded-for") || "unknown",
      severity: "warning",
    });

    return Response.json({ success: true, masked: maskApiKey(value.trim()) });
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Erreur serveur";
    return errorResponse(msg);
  }
}

/**
 * DELETE /api/admin/api-keys
 * Accepts { key: "anthropic_api_key" }
 * Removes the key from site_settings.
 */
export async function DELETE(request: NextRequest) {
  const admin = await getAdminUser(request);
  if (!admin) return unauthorizedResponse();

  try {
    const { key } = (await request.json()) as { key: ApiKeyName };

    if (!SUPPORTED_KEYS.includes(key)) {
      return errorResponse(`Clé non supportée: ${key}`, 400);
    }

    const { error } = await settingsService.upsert([
      {
        key,
        value: "",
        updated_by: admin.id,
      },
    ]);

    if (error) return errorResponse(error.message, 400);

    await logsService.create({
      user_id: admin.id,
      action: "api_key_deleted",
      details: { key_name: key },
      ip_address: request.headers.get("x-forwarded-for") || "unknown",
      severity: "warning",
    });

    return Response.json({ success: true });
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Erreur serveur";
    return errorResponse(msg);
  }
}
