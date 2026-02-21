"use client";

import { useState } from "react";
import {
  Sparkles,
  FileText,
  BookOpen,
  PenTool,
  Copy,
  Save,
  Loader2,
  Info,
  CheckCircle,
} from "lucide-react";
import PageHeader from "@/components/admin/PageHeader";
import PageTransition, { AnimatedSection } from "@/components/admin/PageTransition";
import FormField from "@/components/admin/FormField";
import { useToast } from "@/components/admin/Toast";

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

export default function AIBlogPage() {
  const [topic, setTopic] = useState("");
  const [tone, setTone] = useState("professionnel");
  const [length, setLength] = useState("medium");
  const [keywords, setKeywords] = useState("");
  const [generating, setGenerating] = useState(false);
  const [generatedTitle, setGeneratedTitle] = useState("");
  const [generatedContent, setGeneratedContent] = useState("");
  const [generatedExcerpt, setGeneratedExcerpt] = useState("");
  const [generatedKeywords, setGeneratedKeywords] = useState("");
  const [savingDraft, setSavingDraft] = useState(false);
  const [showApiNotice, setShowApiNotice] = useState(false);
  const [copied, setCopied] = useState(false);

  const { toast } = useToast();

  const handleGenerate = async () => {
    if (!topic) {
      toast({ type: "error", message: "Veuillez saisir un sujet" });
      return;
    }
    setGenerating(true);
    setShowApiNotice(false);
    setGeneratedContent("");
    setGeneratedTitle("");
    setGeneratedExcerpt("");
    setGeneratedKeywords("");

    try {
      const res = await fetch("/api/admin/ia/generate-article", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic, tone, length, keywords }),
      });

      if (res.status === 503) {
        setShowApiNotice(true);
        setGenerating(false);
        return;
      }

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Erreur de generation");
      }

      const data = await res.json();
      setGeneratedTitle(data.title || topic);
      setGeneratedContent(data.content || "");
      setGeneratedExcerpt(data.excerpt || "");
      setGeneratedKeywords(data.seo_keywords || "");
      toast({ type: "success", message: "Article genere avec succes !" });
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Erreur de generation";
      toast({ type: "error", message: msg });
    } finally {
      setGenerating(false);
    }
  };

  const saveDraft = async () => {
    if (!generatedContent) {
      toast({ type: "error", message: "Aucun contenu a sauvegarder" });
      return;
    }
    setSavingDraft(true);
    try {
      const res = await fetch("/api/admin/blog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: generatedTitle || topic,
          slug: slugify(generatedTitle || topic),
          content: generatedContent,
          excerpt: generatedExcerpt || generatedContent.substring(0, 200),
          seo_description: generatedExcerpt || "",
          seo_keywords: generatedKeywords || "",
          status: "draft",
          is_ai_generated: true,
        }),
      });
      if (!res.ok) throw new Error("Erreur");
      toast({ type: "success", message: "Brouillon sauvegarde" });
    } catch {
      toast({ type: "error", message: "Erreur lors de la sauvegarde" });
    } finally {
      setSavingDraft(false);
    }
  };

  const copyContent = () => {
    if (generatedContent) {
      navigator.clipboard.writeText(generatedContent);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <PageTransition className="space-y-6">
      <AnimatedSection>
        <PageHeader
          title="Generateur de Blog IA"
          subtitle="Creez du contenu optimise SEO avec l'intelligence artificielle"
          icon={<Sparkles size={24} />}
        />
      </AnimatedSection>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Configuration Panel */}
        <AnimatedSection>
          <div className="bg-dark-2 border border-border-dark rounded-2xl p-6 lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 bg-accent/10 rounded-xl">
                <PenTool size={20} className="text-accent" />
              </div>
              <div>
                <h2 className="text-base font-semibold text-text-primary">
                  Configuration
                </h2>
                <p className="text-sm text-text-muted">
                  Parametres de generation
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <FormField
                label="Sujet / Theme"
                name="topic"
                value={topic}
                onChange={(v) => setTopic(v)}
                required
                placeholder="Ex: Les avantages du marketing digital pour les PME"
              />

              <FormField
                label="Ton"
                name="tone"
                type="select"
                value={tone}
                onChange={(v) => setTone(v)}
                options={[
                  { value: "professionnel", label: "Professionnel" },
                  { value: "casual", label: "Decontracte" },
                  { value: "expert", label: "Expert technique" },
                  { value: "commercial", label: "Commercial / Persuasif" },
                  { value: "educatif", label: "Educatif" },
                ]}
              />

              <FormField
                label="Longueur"
                name="length"
                type="select"
                value={length}
                onChange={(v) => setLength(v)}
                options={[
                  { value: "short", label: "Court (300-500 mots)" },
                  { value: "medium", label: "Moyen (800-1200 mots)" },
                  { value: "long", label: "Long (1500-2000 mots)" },
                ]}
              />

              <FormField
                label="Mots-cles SEO (optionnel)"
                name="keywords"
                type="textarea"
                value={keywords}
                onChange={(v) => setKeywords(v)}
                rows={3}
                placeholder="marketing digital, PME, croissance, strategie..."
              />

              <button
                onClick={handleGenerate}
                disabled={generating || !topic}
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 bg-accent text-dark font-semibold rounded-full hover:bg-accent-hover transition-all shadow-lg shadow-accent/20 disabled:opacity-50"
              >
                {generating ? (
                  <Loader2 size={18} className="animate-spin" />
                ) : (
                  <Sparkles size={18} />
                )}
                {generating ? "Generation en cours..." : "Generer l'article"}
              </button>
            </div>
          </div>
        </AnimatedSection>

        {/* Generated Content / Notice */}
        <AnimatedSection>
          <div className="bg-dark-2 border border-border-dark rounded-2xl p-6 lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-emerald-500/10 rounded-xl">
                  <FileText size={20} className="text-emerald-400" />
                </div>
                <div>
                  <h2 className="text-base font-semibold text-text-primary">
                    Contenu genere
                  </h2>
                  <p className="text-sm text-text-muted">
                    Apercu et edition de l&apos;article
                  </p>
                </div>
              </div>

              {generatedContent && (
                <div className="flex items-center gap-2">
                  <button
                    onClick={copyContent}
                    className="inline-flex items-center gap-2 px-3 py-2 bg-dark border border-border-dark text-text-secondary rounded-full text-sm hover:bg-dark-3 hover:text-text-primary transition-colors"
                  >
                    {copied ? <CheckCircle size={14} /> : <Copy size={14} />}
                    {copied ? "Copie !" : "Copier"}
                  </button>
                  <button
                    onClick={saveDraft}
                    disabled={savingDraft}
                    className="inline-flex items-center gap-2 px-3 py-2 bg-accent text-dark font-semibold rounded-full text-sm hover:bg-accent-hover transition-colors disabled:opacity-50"
                  >
                    {savingDraft ? (
                      <Loader2 size={14} className="animate-spin" />
                    ) : (
                      <Save size={14} />
                    )}
                    Sauvegarder comme brouillon
                  </button>
                </div>
              )}
            </div>

            {/* API Notice */}
            {showApiNotice && !generatedContent && (
              <div className="p-6 bg-blue-500/5 border border-blue-500/20 rounded-xl">
                <div className="flex items-center gap-2 mb-3">
                  <Info size={18} className="text-blue-400" />
                  <p className="text-sm font-medium text-blue-400">
                    Configuration requise
                  </p>
                </div>
                <p className="text-sm text-text-secondary mb-4">
                  Configurez une cle API IA dans les parametres pour activer cette fonctionnalite.
                </p>
                <p className="text-xs text-text-muted">
                  Rendez-vous dans Parametres &gt; Systeme pour ajouter votre cle API
                  (OpenAI, Anthropic, etc.). Une fois configuree, vous pourrez generer
                  du contenu de blog optimise SEO directement depuis cette interface.
                </p>
              </div>
            )}

            {/* Generated Content */}
            {generatedContent ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">
                    Titre
                  </label>
                  <input
                    type="text"
                    value={generatedTitle}
                    onChange={(e) => setGeneratedTitle(e.target.value)}
                    className="w-full px-4 py-3 bg-dark border border-border-dark rounded-xl text-text-primary text-base font-semibold focus:outline-none focus:ring-2 focus:ring-accent/50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">
                    Contenu
                  </label>
                  <textarea
                    value={generatedContent}
                    onChange={(e) => setGeneratedContent(e.target.value)}
                    rows={20}
                    className="w-full px-4 py-3 bg-dark border border-border-dark rounded-xl text-text-primary text-sm leading-relaxed focus:outline-none focus:ring-2 focus:ring-accent/50 resize-y"
                  />
                </div>
              </div>
            ) : !showApiNotice ? (
              <div className="flex flex-col items-center justify-center h-80 text-center border border-dashed border-border-dark rounded-xl">
                <div className="w-16 h-16 rounded-2xl bg-dark border border-border-dark flex items-center justify-center mb-4">
                  <BookOpen size={28} className="text-text-muted" />
                </div>
                <p className="text-text-secondary font-medium mb-2">
                  Pret a generer
                </p>
                <p className="text-text-muted text-sm max-w-sm">
                  Configurez les parametres a gauche et cliquez sur &quot;Generer
                  l&apos;article&quot; pour creer votre contenu.
                </p>
              </div>
            ) : null}
          </div>
        </AnimatedSection>
      </div>
    </PageTransition>
  );
}
