"use client";

import { useState } from "react";
import {
  Wrench,
  Sparkles,
  FileText,
  Search,
  MessageSquare,
  PenTool,
  Globe,
  Image,
  Zap,
} from "lucide-react";
import PageHeader from "@/components/admin/PageHeader";
import PageTransition, { AnimatedSection } from "@/components/admin/PageTransition";

const tools = [
  {
    title: "Generateur de contenu SEO",
    description:
      "Generez du contenu optimise pour le referencement naturel en quelques clics.",
    icon: <Search size={24} />,
    color: "bg-dark-2 border-white/[0.06]",
    iconColor: "text-accent",
    status: "available",
  },
  {
    title: "Rewriter d'articles",
    description:
      "Reformulez et ameliorez vos textes existants tout en gardant le sens.",
    icon: <PenTool size={24} />,
    color: "bg-dark-2 border-white/[0.06]",
    iconColor: "text-accent",
    status: "available",
  },
  {
    title: "Generateur de meta descriptions",
    description:
      "Creez des meta descriptions accrocheuses et optimisees SEO.",
    icon: <Globe size={24} />,
    color: "bg-dark-2 border-white/[0.06]",
    iconColor: "text-emerald-400",
    status: "available",
  },
  {
    title: "Assistant chatbot",
    description:
      "Configurez et entrainez le chatbot de votre site avec l'IA.",
    icon: <MessageSquare size={24} />,
    color: "bg-dark-2 border-white/[0.06]",
    iconColor: "text-cyan-400",
    status: "coming_soon",
  },
  {
    title: "Generateur d'images",
    description: "Creez des visuels uniques pour vos articles et pages.",
    icon: <Image size={24} />,
    color: "bg-dark-2 border-white/[0.06]",
    iconColor: "text-orange-400",
    status: "coming_soon",
  },
  {
    title: "Analyse de performance",
    description:
      "Analysez la performance SEO de vos pages et obtenez des suggestions.",
    icon: <Zap size={24} />,
    color: "bg-dark-2 border-white/[0.06]",
    iconColor: "text-yellow-400",
    status: "coming_soon",
  },
];

export default function IAOutilsPage() {
  return (
    <PageTransition className="space-y-6">
      <AnimatedSection>
        <PageHeader
          title="Outils IA"
          subtitle="Suite d'outils propulses par l'intelligence artificielle"
          icon={<Wrench size={24} />}
        />
      </AnimatedSection>

      {/* Tools Grid */}
      <AnimatedSection>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tools.map((tool) => (
            <div
              key={tool.title}
              className={`relative ${tool.color} border rounded-2xl p-6 hover:scale-[1.02] transition-all duration-300 cursor-pointer group`}
            >
              {tool.status === "coming_soon" && (
                <span className="absolute top-4 right-4 px-2.5 py-1 bg-dark border border-white/[0.06] text-text-muted rounded-full text-xs font-medium">
                  Bientot
                </span>
              )}
              <div className={`${tool.iconColor} mb-4`}>{tool.icon}</div>
              <h3 className="text-text-primary font-semibold mb-2">{tool.title}</h3>
              <p className="text-text-muted text-sm">{tool.description}</p>
              {tool.status === "available" && (
                <button className="mt-4 flex items-center gap-2 text-sm text-accent hover:text-accent-hover transition-colors">
                  Utiliser
                  <Sparkles size={14} />
                </button>
              )}
            </div>
          ))}
        </div>
      </AnimatedSection>

      {/* Usage stats */}
      <AnimatedSection>
        <div className="bg-dark-2 border border-white/[0.06] rounded-2xl p-6">
          <h2 className="font-serif text-lg text-text-primary mb-4">
            Utilisation IA
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="text-center p-4">
              <p className="text-3xl font-bold text-text-primary">0</p>
              <p className="text-sm text-text-muted mt-1">Articles generes</p>
            </div>
            <div className="text-center p-4">
              <p className="text-3xl font-bold text-text-primary">0</p>
              <p className="text-sm text-text-muted mt-1">Meta descriptions</p>
            </div>
            <div className="text-center p-4">
              <p className="text-3xl font-bold text-text-primary">0</p>
              <p className="text-sm text-text-muted mt-1">Contenus réécrits</p>
            </div>
          </div>
        </div>
      </AnimatedSection>
    </PageTransition>
  );
}
