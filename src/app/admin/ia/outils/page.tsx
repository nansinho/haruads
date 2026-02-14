"use client";

import {
  Sparkles,
  FileText,
  Search,
  MessageSquare,
  PenTool,
  Globe,
  Image,
  Zap,
} from "lucide-react";

const tools = [
  {
    title: "Generateur de contenu SEO",
    description:
      "Generez du contenu optimise pour le referencement naturel en quelques clics.",
    icon: <Search size={24} />,
    color: "from-violet-600/20 to-violet-600/5 border-violet-500/20",
    iconColor: "text-violet-400",
    status: "available",
  },
  {
    title: "Rewriter d'articles",
    description:
      "Reformulez et ameliorez vos textes existants tout en gardant le sens.",
    icon: <PenTool size={24} />,
    color: "from-blue-600/20 to-blue-600/5 border-blue-500/20",
    iconColor: "text-blue-400",
    status: "available",
  },
  {
    title: "Generateur de meta descriptions",
    description:
      "Creez des meta descriptions accrocheuses et optimisees SEO.",
    icon: <Globe size={24} />,
    color: "from-emerald-600/20 to-emerald-600/5 border-emerald-500/20",
    iconColor: "text-emerald-400",
    status: "available",
  },
  {
    title: "Assistant chatbot",
    description:
      "Configurez et entrainez le chatbot de votre site avec l'IA.",
    icon: <MessageSquare size={24} />,
    color: "from-cyan-600/20 to-cyan-600/5 border-cyan-500/20",
    iconColor: "text-cyan-400",
    status: "coming_soon",
  },
  {
    title: "Generateur d'images",
    description: "Creez des visuels uniques pour vos articles et pages.",
    icon: <Image size={24} />,
    color: "from-orange-600/20 to-orange-600/5 border-orange-500/20",
    iconColor: "text-orange-400",
    status: "coming_soon",
  },
  {
    title: "Analyse de performance",
    description:
      "Analysez la performance SEO de vos pages et obtenez des suggestions.",
    icon: <Zap size={24} />,
    color: "from-yellow-600/20 to-yellow-600/5 border-yellow-500/20",
    iconColor: "text-yellow-400",
    status: "coming_soon",
  },
];

export default function IAOutilsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white flex items-center gap-3">
          <Sparkles size={24} className="text-violet-400" />
          Outils IA
        </h1>
        <p className="text-gray-400 mt-1">
          Suite d&apos;outils propulses par l&apos;intelligence artificielle
        </p>
      </div>

      {/* Tools Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tools.map((tool) => (
          <div
            key={tool.title}
            className={`relative bg-gradient-to-br ${tool.color} border rounded-2xl p-6 hover:scale-[1.02] transition-all duration-300 cursor-pointer group`}
          >
            {tool.status === "coming_soon" && (
              <span className="absolute top-4 right-4 px-2.5 py-1 bg-gray-500/15 text-gray-400 border border-gray-500/20 rounded-lg text-xs font-medium">
                Bientot
              </span>
            )}
            <div className={`${tool.iconColor} mb-4`}>{tool.icon}</div>
            <h3 className="text-white font-semibold mb-2">{tool.title}</h3>
            <p className="text-gray-400 text-sm">{tool.description}</p>
            {tool.status === "available" && (
              <button className="mt-4 flex items-center gap-2 text-sm text-violet-400 hover:text-violet-300 transition-colors">
                Utiliser
                <Sparkles size={14} />
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Usage stats */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
        <h2 className="text-lg font-semibold text-white mb-4">
          Utilisation IA
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="text-center p-4">
            <p className="text-3xl font-bold text-white">0</p>
            <p className="text-sm text-gray-400 mt-1">Articles generes</p>
          </div>
          <div className="text-center p-4">
            <p className="text-3xl font-bold text-white">0</p>
            <p className="text-sm text-gray-400 mt-1">Meta descriptions</p>
          </div>
          <div className="text-center p-4">
            <p className="text-3xl font-bold text-white">0</p>
            <p className="text-sm text-gray-400 mt-1">Contenus réécrits</p>
          </div>
        </div>
      </div>
    </div>
  );
}
