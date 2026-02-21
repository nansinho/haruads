import { createCipheriv, createDecipheriv, randomBytes, scryptSync } from "crypto";

const ALGORITHM = "aes-256-gcm";
const IV_LENGTH = 16;
const TAG_LENGTH = 16;

function deriveKey(secret: string): Buffer {
  return scryptSync(secret, "agencehds-api-keys", 32);
}

/**
 * Encrypt a plaintext value using AES-256-GCM.
 * Returns a hex string: iv + authTag + ciphertext
 */
export function encrypt(plaintext: string): string {
  const secret = process.env.AUTH_SECRET;
  if (!secret) throw new Error("AUTH_SECRET is required for encryption");

  const key = deriveKey(secret);
  const iv = randomBytes(IV_LENGTH);
  const cipher = createCipheriv(ALGORITHM, key, iv);

  let encrypted = cipher.update(plaintext, "utf8", "hex");
  encrypted += cipher.final("hex");
  const authTag = cipher.getAuthTag();

  // Format: iv (hex) + authTag (hex) + encrypted (hex)
  return iv.toString("hex") + authTag.toString("hex") + encrypted;
}

/**
 * Decrypt a value encrypted with encrypt().
 */
export function decrypt(encryptedHex: string): string {
  const secret = process.env.AUTH_SECRET;
  if (!secret) throw new Error("AUTH_SECRET is required for decryption");

  const key = deriveKey(secret);

  const ivHex = encryptedHex.slice(0, IV_LENGTH * 2);
  const tagHex = encryptedHex.slice(IV_LENGTH * 2, IV_LENGTH * 2 + TAG_LENGTH * 2);
  const ciphertext = encryptedHex.slice(IV_LENGTH * 2 + TAG_LENGTH * 2);

  const iv = Buffer.from(ivHex, "hex");
  const authTag = Buffer.from(tagHex, "hex");
  const decipher = createDecipheriv(ALGORITHM, key, iv);
  decipher.setAuthTag(authTag);

  let decrypted = decipher.update(ciphertext, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
}

/**
 * Mask an API key for display: shows only the last 4 characters.
 * e.g. "sk-ant-api03-abc...xyz" → "••••••••••xyz"
 */
export function maskApiKey(key: string): string {
  if (key.length <= 4) return "••••";
  return "••••••••" + key.slice(-4);
}

/**
 * Retrieve a decrypted API key from the database.
 * Falls back to the environment variable if not found in DB.
 */
export async function getApiKey(
  keyName: string,
  envFallback?: string,
): Promise<string | null> {
  // Dynamic import to avoid circular deps
  const { settingsService } = await import("@/lib/supabase-admin");

  try {
    const { data } = await settingsService.getAll();
    const setting = data?.find(
      (s: { key: string; value: string | null }) => s.key === keyName
    );

    if (setting?.value) {
      try {
        return decrypt(setting.value);
      } catch {
        // Fallback: value might not be encrypted
        return setting.value;
      }
    }
  } catch {
    // DB unavailable — fall through to env
  }

  // Fallback to environment variable
  if (envFallback) {
    return process.env[envFallback] || null;
  }

  return null;
}
