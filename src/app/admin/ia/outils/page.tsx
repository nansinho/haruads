"use client";

import { useState, useEffect } from "react";
import {
  Wrench,
  Sparkles,
  FileText,
  Search,
  Type,
  RefreshCw,
  PenTool,
  BarChart3,
  ArrowRight,
  Loader2,
  Info,
} from "lucide-react";
import Link from "next/link";
import PageHeader from "@/components/admin/PageHeader";
import PageTransition, { AnimatedSection } from "@/components/admin/PageTransition";

interface ToolCard {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  link: string;
  coming_soon: boolean;
  stat_key?: string;
}

export default function AIOutilsPage() {
  const [aiPostsCount, setAiPostsCount] = useState(0);
  const [loadingStats, setLoadingStats] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch("/api/admin/blog?is_ai_generated=true");
        if (res.ok) {
          const json = await res.json();
          const data = Array.isArray(json) ? json : json.data || [];
          setAiPostsCount(data.length);
        }
      } catch {
        // Keep 0 on error
      } finally {
        setLoadingStats(false);
      }
    };
    fetchStats();
  }, []);

  const tools: ToolCard[] = [
    {
      id: "blog-generator",
      title: "Generateur d'articles",
      description:
        "Creez des articles de blog optimises SEO avec l'IA. Choisissez le sujet, le ton et la longueur souhaitee.",
      icon: <PenTool size={24} />,
      color: "accent",
      link: "/admin/ia/blog",
      coming_soon: false,
      stat_key: "blog",
    },
    {
      id: "meta-descriptions",
      title: "Meta descriptions",
      description:
        "Generez des meta descriptions optimisees pour vos pages et articles. Ameliorez votre SEO automatiquement.",
      icon: <Search size={24} />,
      color: "blue-400",
      link: "/admin/ia/blog",
      coming_soon: true,
    },
    {
      id: "content-rewriter",
      title: "Rewriting de contenu",
      description:
        "Reformulez et ameliorez vos textes existants. L'IA preserve le sens tout en optimisant le style.",
      icon: <RefreshCw size={24} />,
      color: "emerald-400",
      link: "/admin/ia/blog",
      coming_soon: true,
    },
    {
      id: "title-generator",
      title: "Generateur de titres",
      description:
        "Proposez des titres accrocheurs pour vos articles et pages. Optimises pour le clic et le SEO.",
      icon: <Type size={24} />,
      color: "purple-400",
      link: "/admin/ia/blog",
      coming_soon: true,
    },
    {
      id: "analytics-insights",
      title: "Insights analytiques",
      description:
        "Analyse IA de vos statistiques. Obtenez des recommandations personnalisees basees sur vos donnees.",
      icon: <BarChart3 size={24} />,
      color: "orange-400",
      link: "/admin/statistiques",
      coming_soon: true,
    },
  ];

  const getStatValue = (tool: ToolCard): string => {
    if (tool.stat_key === "blog") return String(aiPostsCount);
    return "0";
  };

  const getStatLabel = (tool: ToolCard): string => {
    if (tool.stat_key === "blog") return "articles IA generes";
    if (tool.id === "meta-descriptions") return "meta descriptions generees";
    if (tool.id === "content-rewriter") return "contenus reecrits";
    return "utilisations";
  };

  return (
    <PageTransition className="space-y-6">
      <AnimatedSection>
        <PageHeader
          title="Outils IA"
          subtitle="Suite d'outils d'intelligence artificielle pour votre contenu"
          icon={<Wrench size={24} />}
        />
      </AnimatedSection>

      {/* Stats Overview */}
      <AnimatedSection>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-dark-2 border border-border-dark rounded-2xl p-5">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-accent/10 rounded-xl">
                <FileText size={20} className="text-accent" />
              </div>
              <div>
                <p className="text-sm text-text-muted">Articles IA generes</p>
                <p className="text-2xl font-bold text-text-primary">
                  {loadingStats ? (
                    <Loader2 size={20} className="animate-spin text-text-muted" />
                  ) : (
                    aiPostsCount
                  )}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-dark-2 border border-border-dark rounded-2xl p-5">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-blue-500/10 rounded-xl">
                <Search size={20} className="text-blue-400" />
              </div>
              <div>
                <p className="text-sm text-text-muted">Meta descriptions</p>
                <p className="text-2xl font-bold text-text-primary">0</p>
              </div>
            </div>
          </div>
          <div className="bg-dark-2 border border-border-dark rounded-2xl p-5">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-emerald-500/10 rounded-xl">
                <RefreshCw size={20} className="text-emerald-400" />
              </div>
              <div>
                <p className="text-sm text-text-muted">Contenus reecrits</p>
                <p className="text-2xl font-bold text-text-primary">0</p>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Tools Grid */}
      <AnimatedSection>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool) => (
            <div
              key={tool.id}
              className="bg-dark-2 border border-border-dark rounded-2xl p-6 flex flex-col justify-between group hover:border-white/[0.12] transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 bg-${tool.color}/10 rounded-xl`}>
                    <span className={`text-${tool.color}`}>{tool.icon}</span>
                  </div>
                  {tool.coming_soon && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-orange-500/10 text-orange-400 border border-orange-500/20 rounded-full text-xs font-medium">
                      <Info size={10} />
                      Bientot
                    </span>
                  )}
                </div>

                <h3 className="text-base font-semibold text-text-primary mb-2">
                  {tool.title}
                </h3>
                <p className="text-sm text-text-muted mb-4">
                  {tool.description}
                </p>

                {/* Stat */}
                <div className="flex items-center gap-2 text-xs text-text-muted mb-4">
                  <Sparkles size={12} className="text-accent" />
                  <span>
                    {getStatValue(tool)} {getStatLabel(tool)}
                  </span>
                </div>
              </div>

              <div>
                {tool.coming_soon ? (
                  <button
                    disabled
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-dark border border-border-dark text-text-muted rounded-full text-sm opacity-60 cursor-not-allowed"
                  >
                    Bientot disponible
                  </button>
                ) : (
                  <Link
                    href={tool.link}
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-accent text-dark font-semibold rounded-full hover:bg-accent-hover transition-all text-sm shadow-lg shadow-accent/20 group-hover:shadow-accent/30"
                  >
                    Utiliser
                    <ArrowRight size={14} />
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </AnimatedSection>
    </PageTransition>
  );
}
