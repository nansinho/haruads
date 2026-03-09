import { NextRequest } from "next/server";
import { getAdminUser, unauthorizedResponse, errorResponse } from "@/lib/api-auth";
import { getApiKey } from "@/lib/encryption";
import { slugify } from "@/lib/utils";

const TONE_PROMPTS: Record<string, string> = {
  professionnel: "Ton professionnel et crédible, adapté à une audience B2B.",
  casual: "Ton décontracté et accessible, avec un langage simple et engageant.",
  expert: "Ton expert technique, avec du jargon pertinent et des explications approfondies.",
  commercial: "Ton persuasif et orienté conversion, avec des appels à l'action.",
  educatif: "Ton pédagogique et structuré, qui explique clairement les concepts.",
};

const LENGTH_RANGES: Record<string, string> = {
  short: "300 à 500 mots",
  medium: "800 à 1200 mots",
  long: "1500 à 2000 mots",
};

async function searchImage(topic: string): Promise<string | null> {
  const pexelsKey = await getApiKey("pexels_api_key", "PEXELS_API_KEY");
  if (!pexelsKey) return null;

  try {
    const query = encodeURIComponent(`${topic} minimal background`);
    const res = await fetch(
      `https://api.pexels.com/v1/search?query=${query}&orientation=landscape&per_page=5&size=large`,
      { headers: { Authorization: pexelsKey } }
    );
    if (!res.ok) return null;
    const data = await res.json();
    if (data.photos && data.photos.length > 0) {
      // Return the large2x or landscape size
      return data.photos[0].src?.landscape || data.photos[0].src?.large2x || data.photos[0].src?.large || null;
    }
    return null;
  } catch {
    return null;
  }
}

export async function POST(request: NextRequest) {
  const admin = await getAdminUser(request);
  if (!admin) return unauthorizedResponse();

  const apiKey = await getApiKey("anthropic_api_key", "ANTHROPIC_API_KEY");
  if (!apiKey) {
    return errorResponse(
      "Clé API Anthropic non configurée. Ajoutez-la dans Paramètres > Clés API.",
      503,
    );
  }

  try {
    const { topic, tone, length, keywords } = await request.json();

    if (!topic) {
      return errorResponse("Le sujet est requis.", 400);
    }

    const toneInstruction = TONE_PROMPTS[tone] || TONE_PROMPTS.professionnel;
    const lengthRange = LENGTH_RANGES[length] || LENGTH_RANGES.medium;
    const keywordsInstruction = keywords
      ? `Intègre naturellement ces mots-clés SEO dans le contenu : ${keywords}.`
      : "";

    const systemPrompt = `Tu es un rédacteur web expert en SEO, SEA et AEO (Answer Engine Optimization) pour l'Agence HDS, une agence web créative basée à Aix-en-Provence spécialisée en développement web (Next.js, React, Supabase), e-commerce, design UI/UX, solutions SaaS et intelligence artificielle.

Site web : https://agencehds.com
Pages du site pour les liens internes :
- /services : Nos services
- /projets : Nos réalisations
- /tarifs : Nos tarifs
- /contact : Nous contacter
- /a-propos : À propos
- /blog : Notre blog
- /carrieres : Carrières

Règles de rédaction :
- Écris en français
- ${toneInstruction}
- Longueur cible : ${lengthRange}
- ${keywordsInstruction}

IMPORTANT - Formatage du contenu :
- N'utilise JAMAIS les titres markdown ## ou ### dans le contenu
- Pour les titres de section, utilise **Titre de la section** (en gras) sur sa propre ligne, suivi d'un saut de ligne
- Utilise **texte en gras** pour mettre en valeur les points importants
- Utilise des paragraphes courts (3-4 phrases max)
- Inclus des listes à puces avec "- " quand pertinent
- Ajoute 2-3 liens internes vers les pages du site au format [texte du lien](/page) — utilise les pages listées ci-dessus
- Ajoute 1-2 liens externes pertinents vers des sources fiables au format [texte](https://url)
- Termine par un paragraphe de conclusion avec un appel à l'action vers l'Agence HDS
- Ne mets PAS le titre principal dans le contenu (il sera ajouté séparément)

Tu dois répondre UNIQUEMENT avec un objet JSON valide (sans backticks ni markdown autour) au format suivant :
{
  "title": "Titre accrocheur et SEO optimisé (max 60 caractères)",
  "slug": "titre-en-slug-url-friendly",
  "excerpt": "Meta description optimisée SEO (entre 120 et 155 caractères, incitative au clic)",
  "content": "Contenu complet formaté selon les règles ci-dessus",
  "category": "Catégorie pertinente parmi : Développement, Design, SEO, Marketing Digital, E-Commerce, Intelligence Artificielle, Stratégie Digitale",
  "tags": ["tag1", "tag2", "tag3", "tag4", "tag5"],
  "seo_title": "Titre SEO optimisé avec mot-clé principal en début (max 60 car.)",
  "seo_description": "Description SEO (120-155 car.) avec mot-clé principal et appel à l'action",
  "seo_keywords": ["mot-clé principal", "mot-clé 2", "mot-clé 3", "mot-clé 4", "mot-clé 5"],
  "sea_keywords": ["mot-clé publicitaire 1", "mot-clé publicitaire 2", "mot-clé publicitaire 3"],
  "aeo_answer": "Réponse concise et directe (2-3 phrases) à la question principale de l'article, optimisée pour les assistants IA et les featured snippets Google. Cette réponse doit pouvoir être lue seule et apporter une valeur immédiate."
}`;

    // Launch AI generation and image search in parallel
    const [aiResponse, coverImage] = await Promise.all([
      fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey,
          "anthropic-version": "2023-06-01",
        },
        body: JSON.stringify({
          model: "claude-sonnet-4-5-20250929",
          max_tokens: 4096,
          messages: [
            {
              role: "user",
              content: `Écris un article de blog complet et riche sur le sujet suivant : "${topic}"`,
            },
          ],
          system: systemPrompt,
        }),
      }),
      searchImage(topic),
    ]);

    if (!aiResponse.ok) {
      const err = await aiResponse.text();
      return errorResponse(`Erreur API Anthropic: ${err}`, aiResponse.status);
    }

    const data = await aiResponse.json();
    let text = data.content?.[0]?.text;

    if (!text) {
      return errorResponse("Réponse vide de l'API Anthropic.", 502);
    }

    // Strip markdown code blocks if Claude wraps the JSON
    text = text.replace(/^```(?:json)?\s*\n?/i, "").replace(/\n?```\s*$/i, "").trim();

    const parsed = JSON.parse(text);

    return Response.json({
      title: parsed.title || topic,
      slug: parsed.slug || slugify(parsed.title || topic),
      excerpt: parsed.excerpt || "",
      content: parsed.content || "",
      category: parsed.category || "",
      tags: parsed.tags || [],
      cover_image: coverImage || "",
      seo_title: parsed.seo_title || parsed.title || "",
      seo_description: parsed.seo_description || parsed.excerpt || "",
      seo_keywords: parsed.seo_keywords || [],
      sea_keywords: parsed.sea_keywords || [],
      aeo_answer: parsed.aeo_answer || "",
      is_ai_generated: true,
    });
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Erreur lors de la génération";
    return errorResponse(msg);
  }
}
