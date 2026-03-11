import { getSupabase } from "@/lib/supabase";
import type { City as DBCity } from "@/types/database";

/** Frontend city interface with camelCase fields */
export interface CityData {
  slug: string;
  name: string;
  department: string;
  postalCode: string;
  lat: number;
  lng: number;
  heroTitle: string;
  heroSubtitle: string;
  introParagraph: string;
  localContext: string;
  faqAnswer: string;
  metaTitle: string;
  metaDescription: string;
}

/** Map DB row (snake_case) to frontend interface (camelCase) */
function mapCity(row: DBCity): CityData {
  return {
    slug: row.slug,
    name: row.name,
    department: row.department || "Bouches-du-Rhône",
    postalCode: row.postal_code || "",
    lat: row.lat || 0,
    lng: row.lng || 0,
    heroTitle: row.hero_title || `Nous créons votre présence digitale à ${row.name}.`,
    heroSubtitle: row.hero_subtitle || `Design UI/UX, développement web et solutions sur mesure pour les entreprises de ${row.name}.`,
    introParagraph: row.intro_paragraph || "",
    localContext: row.local_context || "",
    faqAnswer: row.faq_answer || `Oui, l'Agence HDS intervient à ${row.name} et dans toute la région ${row.department || "Bouches-du-Rhône"}.`,
    metaTitle: row.meta_title || `Agence Web ${row.name} — Création Site Internet | Agence HDS`,
    metaDescription: row.meta_description || `Agence web à ${row.name}. Création de sites internet, applications web et e-commerce sur mesure. Devis gratuit — Agence HDS.`,
  };
}

/** Fetch all active cities from DB */
export async function fetchAllCities(): Promise<CityData[]> {
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from("cities")
    .select("*")
    .eq("is_active", true)
    .order("name", { ascending: true });
  if (error) {
    console.error("[cities] fetchAllCities error:", error.message);
    return [];
  }
  return (data ?? []).map(mapCity);
}

/** Fetch a single city by slug */
export async function fetchCityBySlug(slug: string): Promise<CityData | null> {
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from("cities")
    .select("*")
    .eq("slug", slug)
    .eq("is_active", true)
    .single();
  if (error) {
    // PGRST116 = "no rows found" → genuine 404, not a server error
    if (error.code === "PGRST116") return null;
    console.error("[cities] fetchCityBySlug error:", error.message, { slug });
    throw new Error(`Database error while fetching city "${slug}"`);
  }
  return data ? mapCity(data) : null;
}

/** Fetch all active city slugs (for sitemap / static params) */
export async function fetchAllCitySlugs(): Promise<string[]> {
  try {
    const supabase = getSupabase();
    const { data, error } = await supabase
      .from("cities")
      .select("slug")
      .eq("is_active", true)
      .order("name", { ascending: true });
    if (error || !data) {
      console.error("[cities] fetchAllCitySlugs error:", error?.message);
      return cityLinks.map((c) => c.slug);
    }
    return data.map((c) => c.slug);
  } catch {
    return cityLinks.map((c) => c.slug);
  }
}

/**
 * Static city list for client components (Footer links).
 * Minimal data — only slug and name needed for rendering links.
 */
export const cityLinks: { slug: string; name: string }[] = [
  { slug: "gardanne", name: "Gardanne" },
  { slug: "aix-en-provence", name: "Aix-en-Provence" },
  { slug: "marseille", name: "Marseille" },
  { slug: "aubagne", name: "Aubagne" },
  { slug: "vitrolles", name: "Vitrolles" },
  { slug: "martigues", name: "Martigues" },
  { slug: "salon-de-provence", name: "Salon-de-Provence" },
  { slug: "la-ciotat", name: "La Ciotat" },
];
