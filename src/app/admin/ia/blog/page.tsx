"use client";

import { useState } from "react";
import {
  Sparkles,
  Send,
  FileText,
  Copy,
  RefreshCw,
  Settings,
  Wrench,
} from "lucide-react";
import PageHeader from "@/components/admin/PageHeader";
import PageTransition, { AnimatedSection } from "@/components/admin/PageTransition";

export default function IABlogPage() {
  const [topic, setTopic] = useState("");
  const [tone, setTone] = useState("professionnel");
  const [length, setLength] = useState("moyen");
  const [generating, setGenerating] = useState(false);

  return (
    <PageTransition className="space-y-6">
      <AnimatedSection>
        <PageHeader
          title="Blog IA"
          subtitle="Generez des articles de blog optimises SEO avec l'intelligence artificielle"
          icon={<Sparkles size={24} />}
        />
      </AnimatedSection>

      <AnimatedSection>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Config panel */}
          <div className="space-y-4">
            <div className="bg-dark-2 border border-white/[0.06] rounded-2xl p-6 space-y-5">
              <h2 className="font-serif text-lg text-text-primary flex items-center gap-2">
                <Settings size={18} className="text-accent" />
                Configuration
              </h2>

              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">
                  Sujet / Mot-cle
                </label>
                <input
                  type="text"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="Ex: création de site web e-commerce"
                  className="w-full px-4 py-3 bg-dark border border-white/[0.06] rounded-xl text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent/50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">
                  Ton
                </label>
                <select
                  value={tone}
                  onChange={(e) => setTone(e.target.value)}
                  className="w-full px-4 py-3 bg-dark border border-white/[0.06] rounded-xl text-text-primary focus:outline-none focus:ring-2 focus:ring-accent/50"
                >
                  <option value="professionnel">Professionnel</option>
                  <option value="decontracte">Decontracte</option>
                  <option value="educatif">Educatif</option>
                  <option value="commercial">Commercial</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">
                  Longueur
                </label>
                <div className="flex gap-2">
                  {["court", "moyen", "long"].map((l) => (
                    <button
                      key={l}
                      onClick={() => setLength(l)}
                      className={`flex-1 py-2 rounded-full text-sm font-medium transition-all ${
                        length === l
                          ? "bg-accent-dim text-accent border border-accent/20"
                          : "bg-dark-2 text-text-secondary border border-white/[0.06] hover:bg-white/[0.04] hover:text-text-primary"
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
                className="w-full flex items-center justify-center gap-2 py-3 bg-accent text-dark font-semibold rounded-full hover:bg-accent-hover transition-all shadow-lg shadow-accent/20 disabled:opacity-50 disabled:cursor-not-allowed"
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
            <div className="bg-accent/5 border border-accent/10 rounded-2xl p-5">
              <h3 className="text-sm font-semibold text-accent mb-2">
                Conseils
              </h3>
              <ul className="text-xs text-text-muted space-y-1.5">
                <li>• Soyez specifique dans le sujet pour un meilleur resultat</li>
                <li>• L&apos;article sera optimise SEO automatiquement</li>
                <li>• Vous pourrez editer le contenu avant publication</li>
                <li>• Les images devront etre ajoutees manuellement</li>
              </ul>
            </div>
          </div>

          {/* Preview panel */}
          <div className="lg:col-span-2">
            <div className="bg-dark-2 border border-white/[0.06] rounded-2xl p-6 min-h-[500px]">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-serif text-lg text-text-primary">Apercu</h2>
                <div className="flex items-center gap-2">
                  <button className="p-2 text-text-muted hover:text-text-primary bg-dark rounded-lg transition-colors">
                    <Copy size={16} />
                  </button>
                  <button className="flex items-center gap-2 px-3 py-2 bg-emerald-600/15 text-emerald-400 border border-emerald-500/20 rounded-full text-sm hover:bg-emerald-600/25 transition-colors">
                    <FileText size={14} />
                    Sauvegarder comme brouillon
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-center h-80 border border-dashed border-white/[0.06] rounded-xl">
                <div className="text-center">
                  <Sparkles size={40} className="text-text-muted mx-auto mb-3" />
                  <p className="text-text-muted">
                    Configurez les parametres et cliquez sur &quot;Generer&quot;
                  </p>
                  <p className="text-text-muted text-sm mt-1">
                    L&apos;article apparaitra ici
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>
    </PageTransition>
  );
}
