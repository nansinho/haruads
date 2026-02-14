"use client";

import { useState } from "react";
import { Plus, Search as SearchIcon } from "lucide-react";
import PageHeader from "@/components/admin/PageHeader";
import PageTransition, { AnimatedSection } from "@/components/admin/PageTransition";

export default function SeoAdminPage() {
  const [search, setSearch] = useState("");

  return (
    <PageTransition className="space-y-6">
      <AnimatedSection>
        <PageHeader
          title="SEO & Métadonnées"
          subtitle="Gérez les métadonnées SEO de chaque page."
          icon={<SearchIcon size={24} />}
          actions={
            <button className="flex items-center gap-2 px-5 py-2.5 bg-accent text-dark font-semibold rounded-full hover:bg-accent-hover transition-all text-sm shadow-lg shadow-accent/20">
              <Plus size={16} />
              Ajouter une page
            </button>
          }
        />
      </AnimatedSection>

      {/* Filters bar */}
      <AnimatedSection>
        <div className="flex flex-wrap gap-2">
          <button className="px-4 py-2 rounded-full text-sm font-medium bg-accent-dim text-accent border border-accent/20 transition-all">
            Toutes
          </button>
          <button className="px-4 py-2 rounded-full text-sm font-medium bg-dark-2 text-text-secondary border border-white/[0.06] hover:bg-white/[0.04] hover:text-text-primary transition-all">
            Indexées
          </button>
          <button className="px-4 py-2 rounded-full text-sm font-medium bg-dark-2 text-text-secondary border border-white/[0.06] hover:bg-white/[0.04] hover:text-text-primary transition-all">
            No Index
          </button>
        </div>
      </AnimatedSection>

      <AnimatedSection>
        <div className="bg-dark-2 border border-white/[0.06] rounded-2xl overflow-hidden">
          {/* Search */}
          <div className="p-4 border-b border-white/[0.06]">
            <div className="relative w-full sm:w-72">
              <SearchIcon
                size={15}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted"
              />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Rechercher une page..."
                className="w-full pl-9 pr-4 py-2 bg-dark border border-white/[0.06] rounded-full text-sm text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all"
              />
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/[0.06]">
                  <th className="px-5 py-3 text-left text-[0.65rem] font-mono font-semibold text-text-muted uppercase tracking-wider">
                    Page
                  </th>
                  <th className="px-5 py-3 text-left text-[0.65rem] font-mono font-semibold text-text-muted uppercase tracking-wider">
                    Titre SEO
                  </th>
                  <th className="px-5 py-3 text-left text-[0.65rem] font-mono font-semibold text-text-muted uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-5 py-3 text-left text-[0.65rem] font-mono font-semibold text-text-muted uppercase tracking-wider">
                    No Index
                  </th>
                  <th className="px-5 py-3 text-right text-[0.65rem] font-mono font-semibold text-text-muted uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan={5} className="px-5 py-12 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <SearchIcon size={40} className="text-text-muted" />
                      <p className="text-text-muted">
                        Aucune page SEO trouvée. Connectez Supabase pour charger les données.
                      </p>
                      <button className="mt-2 flex items-center gap-2 px-4 py-2 bg-accent-dim text-accent border border-accent/20 rounded-full text-sm font-medium hover:bg-accent/20 transition-all">
                        <Plus size={16} />
                        Configurer votre première page
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </AnimatedSection>
    </PageTransition>
  );
}
