import { NextRequest } from "next/server";
import { getAdminUser, unauthorizedResponse, errorResponse } from "@/lib/api-auth";
import { getApiKey } from "@/lib/encryption";

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
    const { external_url } = await request.json();

    if (!external_url) {
      return errorResponse("L'URL du projet est requise.", 400);
    }

    // Fetch external site content
    let siteContent = "";
    try {
      const siteRes = await fetch(external_url, {
        headers: { "User-Agent": "Mozilla/5.0 (compatible; HDS-Bot/1.0)" },
        signal: AbortSignal.timeout(10000),
      });
      if (siteRes.ok) {
        const html = await siteRes.text();
        // Extract text content from HTML (strip tags, keep meaningful text)
        siteContent = html
          .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "")
          .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "")
          .replace(/<[^>]+>/g, " ")
          .replace(/\s+/g, " ")
          .trim()
          .substring(0, 8000);
      }
    } catch {
      // Site not reachable, continue with URL only
    }

    const siteContext = siteContent
      ? `\n\nContenu extrait du site web :\n"""${siteContent}"""`
      : "";

    const systemPrompt = `Tu es un expert en rédaction de portfolios pour l'Agence HDS, une agence web créative à Aix-en-Provence spécialisée en développement web (Next.js, React, Supabase), e-commerce, design UI/UX et solutions SaaS.

À partir de l'URL du projet${siteContent ? " et du contenu de son site web" : ""}, génère une fiche projet COMPLÈTE et professionnelle pour le portfolio.

Règles :
- Écris en français
- Sois concis et impactant
- Déduis le titre du projet, le nom du client et l'année à partir du contenu du site
- Les résultats doivent être réalistes et pertinents pour le type de projet
- Les tags doivent refléter les technologies détectées ou probables
- La catégorie doit être parmi : E-Commerce, Application Web, Site Vitrine, Design UI/UX, SaaS, Landing Page, Mobile, Autre

Tu dois répondre UNIQUEMENT avec un objet JSON valide (sans backticks ni markdown autour) :
{
  "title": "Nom du projet (court et percutant)",
  "client": "Nom du client ou de l'entreprise",
  "year": 2025,
  "description": "Description courte et accrocheuse du projet (2-3 phrases, max 300 caractères)",
  "challenge": "Le défi / problème client (3-5 phrases détaillées)",
  "solution": "La solution technique apportée (3-5 phrases détaillées)",
  "results": [
    { "label": "Nom du KPI", "value": "Valeur avec unité" }
  ],
  "tags": ["Tech1", "Tech2", "Tech3"],
  "category": "Catégorie du projet",
  "seo_title": "Titre SEO optimisé (max 60 caractères)",
  "seo_description": "Meta description SEO (120-155 caractères)"
}

Notes pour les résultats : fournis 3 à 4 KPIs réalistes (ex: "+45% de conversions", "Score Lighthouse 98/100", "2.5s temps de chargement", etc.)`;

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-5-20250929",
        max_tokens: 2048,
        messages: [
          {
            role: "user",
            content: `Analyse ce site web et génère la fiche portfolio complète du projet.\n\nURL du site : ${external_url}${siteContext}`,
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
    let text = data.content?.[0]?.text;

    if (!text) {
      return errorResponse("Réponse vide de l'API Anthropic.", 502);
    }

    // Strip markdown code blocks if Claude wraps the JSON
    text = text.replace(/^```(?:json)?\s*\n?/i, "").replace(/\n?```\s*$/i, "").trim();

    let parsed;
    try {
      parsed = JSON.parse(text);
    } catch {
      console.error("[analyze-project] JSON parse failed. Raw response:", text.substring(0, 500));
      return errorResponse(`Réponse IA invalide (non-JSON). Début: ${text.substring(0, 200)}`, 502);
    }

    return Response.json({
      title: parsed.title || "",
      client: parsed.client || "",
      year: parsed.year || new Date().getFullYear(),
      description: parsed.description || "",
      challenge: parsed.challenge || "",
      solution: parsed.solution || "",
      results: parsed.results || [],
      tags: parsed.tags || [],
      category: parsed.category || "",
      seo_title: parsed.seo_title || "",
      seo_description: parsed.seo_description || "",
    });
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Erreur lors de l'analyse";
    console.error("[analyze-project]", error);
    return errorResponse(msg);
  }
}
