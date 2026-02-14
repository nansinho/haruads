"use client";

import { useState } from "react";
import {
  Sparkles,
  Send,
  FileText,
  Copy,
  RefreshCw,
  Settings,
} from "lucide-react";

export default function IABlogPage() {
  const [topic, setTopic] = useState("");
  const [tone, setTone] = useState("professionnel");
  const [length, setLength] = useState("moyen");
  const [generating, setGenerating] = useState(false);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white flex items-center gap-3">
          <Sparkles size={24} className="text-violet-400" />
          Generation d&apos;Articles IA
        </h1>
        <p className="text-gray-400 mt-1">
          Generez des articles de blog optimises SEO avec l&apos;intelligence
          artificielle
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Config panel */}
        <div className="space-y-4">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-5">
            <h2 className="text-lg font-semibold text-white flex items-center gap-2">
              <Settings size={18} className="text-violet-400" />
              Configuration
            </h2>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Sujet / Mot-cle
              </label>
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="Ex: création de site web e-commerce"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-500/50"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Ton
              </label>
              <select
                value={tone}
                onChange={(e) => setTone(e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-violet-500/50"
              >
                <option value="professionnel">Professionnel</option>
                <option value="decontracte">Decontracte</option>
                <option value="educatif">Educatif</option>
                <option value="commercial">Commercial</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Longueur
              </label>
              <div className="flex gap-2">
                {["court", "moyen", "long"].map((l) => (
                  <button
                    key={l}
                    onClick={() => setLength(l)}
                    className={`flex-1 py-2 rounded-xl text-sm font-medium transition-all ${
                      length === l
                        ? "bg-violet-600/15 text-violet-300 border border-violet-500/20"
                        : "bg-white/5 text-gray-400 border border-white/10 hover:bg-white/10"
                    }`}
                  >
                    {l.charAt(0).toUpperCase() + l.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => setGenerating(true)}
              disabled={!topic || generating}
              className="w-full flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-violet-600 to-blue-600 text-white font-semibold rounded-xl hover:from-violet-500 hover:to-blue-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {generating ? (
                <>
                  <RefreshCw size={18} className="animate-spin" />
                  Generation en cours...
                </>
              ) : (
                <>
                  <Sparkles size={18} />
                  Generer l&apos;article
                </>
              )}
            </button>
          </div>

          {/* Tips */}
          <div className="bg-violet-600/5 border border-violet-500/10 rounded-2xl p-5">
            <h3 className="text-sm font-semibold text-violet-300 mb-2">
              Conseils
            </h3>
            <ul className="text-xs text-gray-400 space-y-1.5">
              <li>• Soyez specifique dans le sujet pour un meilleur resultat</li>
              <li>• L&apos;article sera optimise SEO automatiquement</li>
              <li>• Vous pourrez editer le contenu avant publication</li>
              <li>• Les images devront etre ajoutees manuellement</li>
            </ul>
          </div>
        </div>

        {/* Preview panel */}
        <div className="lg:col-span-2">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 min-h-[500px]">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-white">Apercu</h2>
              <div className="flex items-center gap-2">
                <button className="p-2 text-gray-400 hover:text-white bg-white/5 rounded-lg transition-colors">
                  <Copy size={16} />
                </button>
                <button className="flex items-center gap-2 px-3 py-2 bg-emerald-600/15 text-emerald-400 border border-emerald-500/20 rounded-xl text-sm hover:bg-emerald-600/25 transition-colors">
                  <FileText size={14} />
                  Sauvegarder comme brouillon
                </button>
              </div>
            </div>

            <div className="flex items-center justify-center h-80 border border-dashed border-white/10 rounded-xl">
              <div className="text-center">
                <Sparkles size={40} className="text-gray-600 mx-auto mb-3" />
                <p className="text-gray-500">
                  Configurez les parametres et cliquez sur &quot;Generer&quot;
                </p>
                <p className="text-gray-600 text-sm mt-1">
                  L&apos;article apparaitra ici
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
