"use client";

import { useState } from "react";
import { Plus, Search, Filter, Edit, Trash2, Eye, Tag } from "lucide-react";

export default function OffresAdminPage() {
  const [search, setSearch] = useState("");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Offres & Tarifs</h1>
          <p className="text-gray-400 mt-1">
            Gérez vos offres commerciales, tarifs et formules.
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-violet-600 to-blue-600 text-white rounded-xl hover:from-violet-500 hover:to-blue-500 transition-all font-medium text-sm">
          <Plus size={18} />
          Nouvelle offre
        </button>
      </div>

      {/* Filters bar */}
      <div className="flex flex-wrap gap-2">
        <button className="px-4 py-2 rounded-xl text-sm font-medium bg-violet-600/20 text-violet-300 border border-violet-500/30 transition-all">
          Toutes
        </button>
        <button className="px-4 py-2 rounded-xl text-sm font-medium bg-white/5 text-gray-400 border border-white/10 hover:bg-white/10 hover:text-white transition-all">
          Populaires
        </button>
        <button className="px-4 py-2 rounded-xl text-sm font-medium bg-white/5 text-gray-400 border border-white/10 hover:bg-white/10 hover:text-white transition-all">
          Actives
        </button>
        <button className="px-4 py-2 rounded-xl text-sm font-medium bg-white/5 text-gray-400 border border-white/10 hover:bg-white/10 hover:text-white transition-all">
          Inactives
        </button>
      </div>

      {/* Data Table */}
      <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
        {/* Search */}
        <div className="p-4 border-b border-white/5">
          <div className="relative w-full sm:w-72">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
            />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Rechercher une offre..."
              className="w-full pl-9 pr-4 py-2 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-500/50"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/5">
                <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Nom
                </th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Prix
                </th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Populaire
                </th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Actif
                </th>
                <th className="px-5 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={6} className="px-5 py-12 text-center">
                  <div className="flex flex-col items-center gap-3">
                    <Tag size={40} className="text-gray-600" />
                    <p className="text-gray-500">
                      Aucune offre trouvée. Connectez Supabase pour charger les données.
                    </p>
                    <button className="mt-2 flex items-center gap-2 px-4 py-2 bg-violet-600/20 text-violet-300 border border-violet-500/30 rounded-xl text-sm font-medium hover:bg-violet-600/30 transition-all">
                      <Plus size={16} />
                      Créer votre première offre
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
