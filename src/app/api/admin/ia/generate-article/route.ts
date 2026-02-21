import { NextRequest } from "next/server";
import { getAdminUser, unauthorizedResponse, errorResponse } from "@/lib/api-auth";

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

export async function POST(request: NextRequest) {
  const admin = await getAdminUser(request);
  if (!admin) return unauthorizedResponse();

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return errorResponse(
      "Clé API Anthropic non configurée. Ajoutez ANTHROPIC_API_KEY dans vos variables d'environnement.",
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

    const systemPrompt = `Tu es un rédacteur web expert en SEO pour l'Agence HDS, une agence web créative basée à Aix-en-Provence spécialisée en développement web (Next.js, React, Supabase), e-commerce, design UI/UX, solutions SaaS et intelligence artificielle.

Règles de rédaction :
- Écris en français
- ${toneInstruction}
- Longueur cible : ${lengthRange}
- Structure le contenu avec des titres H2 et H3 en markdown
- Utilise des paragraphes courts (3-4 phrases max)
- Inclus des listes à puces quand pertinent
- ${keywordsInstruction}
- Termine par un paragraphe de conclusion avec un appel à l'action vers l'Agence HDS
- Ne mets PAS le titre principal dans le contenu (il sera ajouté séparément)

Tu dois répondre UNIQUEMENT avec un objet JSON valide (sans backticks ni markdown autour) au format suivant :
{
  "title": "Titre SEO optimisé (max 60 caractères)",
  "excerpt": "Meta description optimisée SEO (entre 120 et 155 caractères)",
  "content": "Contenu complet en markdown avec ## et ### pour les titres",
  "seo_keywords": "mot-clé 1, mot-clé 2, mot-clé 3, mot-clé 4, mot-clé 5"
}`;

    const response = await fetch("https://api.anthropic.com/v1/messages", {
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
            content: `Écris un article de blog sur le sujet suivant : "${topic}"`,
          },
        ],
        system: systemPrompt,
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      return errorResponse(`Erreur API Anthropic: ${err}`, response.status);
    }

    const data = await response.json();
    const text = data.content?.[0]?.text;

    if (!text) {
      return errorResponse("Réponse vide de l'API Anthropic.", 502);
    }

    // Parse the JSON response from Claude
    const parsed = JSON.parse(text);

    return Response.json({
      title: parsed.title || topic,
      excerpt: parsed.excerpt || "",
      content: parsed.content || "",
      seo_keywords: parsed.seo_keywords || "",
    });
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Erreur lors de la génération";
    return errorResponse(msg);
  }
}
