"use client";

import { useState } from "react";
import {
  DollarSign,
  Plus,
  Search,
  Percent,
  Tag,
  Calendar,
  CheckCircle,
  XCircle,
  Edit,
  Trash2,
  MoreHorizontal,
} from "lucide-react";

interface DynamicPrice {
  id: string;
  name: string;
  serviceOrOffer: string;
  basePrice: number;
  currentPrice: number;
  discountPercent: number;
  validFrom: string;
  validTo: string;
  active: boolean;
}

const mockPrices: DynamicPrice[] = [
  {
    id: "1",
    name: "Promo Lancement Site Vitrine",
    serviceOrOffer: "Site Vitrine",
    basePrice: 2500,
    currentPrice: 1990,
    discountPercent: 20,
    validFrom: "2025-01-01",
    validTo: "2025-03-31",
    active: true,
  },
  {
    id: "2",
    name: "Offre E-commerce",
    serviceOrOffer: "Boutique E-commerce",
    basePrice: 5000,
    currentPrice: 4200,
    discountPercent: 16,
    validFrom: "2025-02-01",
    validTo: "2025-04-30",
    active: true,
  },
  {
    id: "3",
    name: "Pack SEO Mensuel",
    serviceOrOffer: "Referencement SEO",
    basePrice: 800,
    currentPrice: 650,
    discountPercent: 19,
    validFrom: "2025-01-15",
    validTo: "2025-06-15",
    active: true,
  },
  {
    id: "4",
    name: "Refonte Ancien Tarif",
    serviceOrOffer: "Refonte de site",
    basePrice: 3500,
    currentPrice: 3500,
    discountPercent: 0,
    validFrom: "2024-10-01",
    validTo: "2024-12-31",
    active: false,
  },
  {
    id: "5",
    name: "Maintenance Premium",
    serviceOrOffer: "Maintenance mensuelle",
    basePrice: 300,
    currentPrice: 250,
    discountPercent: 17,
    validFrom: "2025-03-01",
    validTo: "2025-12-31",
    active: true,
  },
];

export default function PrixPage() {
  const [prices] = useState<DynamicPrice[]>(mockPrices);
  const [search, setSearch] = useState("");

  const filteredPrices = prices.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.serviceOrOffer.toLowerCase().includes(search.toLowerCase())
  );

  const activeCount = prices.filter((p) => p.active).length;
  const avgDiscount =
    prices.filter((p) => p.active && p.discountPercent > 0).reduce((acc, p) => acc + p.discountPercent, 0) /
      (prices.filter((p) => p.active && p.discountPercent > 0).length || 1);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-3">
            <DollarSign className="text-violet-400" size={28} />
            Prix Dynamiques
          </h1>
          <p className="text-gray-400 mt-1">
            Gerez les prix et promotions
          </p>
        </div>
        <button className="inline-flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-violet-600 to-blue-600 text-white rounded-xl font-medium hover:opacity-90 transition-opacity">
          <Plus size={18} />
          Nouveau prix
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-violet-500/10 rounded-xl">
              <Tag size={20} className="text-violet-400" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Total prix configures</p>
              <p className="text-2xl font-bold text-white">{prices.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-emerald-500/10 rounded-xl">
              <CheckCircle size={20} className="text-emerald-400" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Promotions actives</p>
              <p className="text-2xl font-bold text-white">{activeCount}</p>
            </div>
          </div>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-orange-500/10 rounded-xl">
              <Percent size={20} className="text-orange-400" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Reduction moyenne</p>
              <p className="text-2xl font-bold text-white">{avgDiscount.toFixed(0)}%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <h2 className="text-lg font-semibold text-white">Liste des prix</h2>
          <div className="relative">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
            />
            <input
              type="text"
              placeholder="Rechercher un prix..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full sm:w-72 pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-500/50"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Nom
                </th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Service / Offre
                </th>
                <th className="text-right py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Prix de base
                </th>
                <th className="text-right py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Prix actuel
                </th>
                <th className="text-center py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Reduction %
                </th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Valide du
                </th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Valide au
                </th>
                <th className="text-center py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Actif
                </th>
                <th className="text-right py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredPrices.map((price) => (
                <tr
                  key={price.id}
                  className="hover:bg-white/5 transition-colors"
                >
                  <td className="py-3.5 px-4">
                    <span className="text-sm text-white font-medium">
                      {price.name}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="text-sm text-gray-300">
                      {price.serviceOrOffer}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <span className="text-sm text-gray-400">
                      {price.basePrice.toLocaleString("fr-FR")} &euro;
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <span className="text-sm text-white font-medium">
                      {price.currentPrice.toLocaleString("fr-FR")} &euro;
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    {price.discountPercent > 0 ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full text-xs font-medium">
                        <Percent size={10} />
                        -{price.discountPercent}%
                      </span>
                    ) : (
                      <span className="text-sm text-gray-500">-</span>
                    )}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="text-sm text-gray-400 flex items-center gap-1.5">
                      <Calendar size={12} className="text-gray-600" />
                      {new Date(price.validFrom).toLocaleDateString("fr-FR")}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="text-sm text-gray-400 flex items-center gap-1.5">
                      <Calendar size={12} className="text-gray-600" />
                      {new Date(price.validTo).toLocaleDateString("fr-FR")}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    {price.active ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full text-xs font-medium">
                        <CheckCircle size={12} />
                        Actif
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-red-500/10 text-red-400 border border-red-500/20 rounded-full text-xs font-medium">
                        <XCircle size={12} />
                        Inactif
                      </span>
                    )}
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button className="p-1.5 rounded-lg hover:bg-white/10 text-gray-400 hover:text-violet-400 transition-colors" title="Modifier">
                        <Edit size={14} />
                      </button>
                      <button className="p-1.5 rounded-lg hover:bg-white/10 text-gray-400 hover:text-red-400 transition-colors" title="Supprimer">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredPrices.length === 0 && (
          <div className="text-center py-12">
            <DollarSign size={40} className="mx-auto text-gray-600 mb-3" />
            <p className="text-gray-500">Aucun prix trouve</p>
          </div>
        )}
      </div>
    </div>
  );
}
