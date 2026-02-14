"use client";

import { useState } from "react";
import {
  Search,
  Filter,
  Download,
  Eye,
  MoreHorizontal,
  FileText,
  Calendar,
  RefreshCw,
} from "lucide-react";

const filters = [
  { key: "all", label: "Tous" },
  { key: "new", label: "Nouveau" },
  { key: "in_progress", label: "En cours" },
  { key: "quoted", label: "Devisé" },
  { key: "accepted", label: "Accepté" },
  { key: "rejected", label: "Rejeté" },
];

function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, string> = {
    new: "bg-blue-500/15 text-blue-400 border-blue-500/20",
    in_progress: "bg-violet-500/15 text-violet-400 border-violet-500/20",
    quoted: "bg-orange-500/15 text-orange-400 border-orange-500/20",
    accepted: "bg-emerald-500/15 text-emerald-400 border-emerald-500/20",
    rejected: "bg-red-500/15 text-red-400 border-red-500/20",
  };
  const labels: Record<string, string> = {
    new: "Nouveau",
    in_progress: "En cours",
    quoted: "Devisé",
    accepted: "Accepté",
    rejected: "Rejeté",
  };
  const color =
    colors[status] || "bg-gray-500/15 text-gray-400 border-gray-500/20";
  return (
    <span
      className={`inline-flex px-2.5 py-1 rounded-lg text-xs font-medium border ${color}`}
    >
      {labels[status] || status.replace(/_/g, " ")}
    </span>
  );
}

interface QuoteRequest {
  id: string;
  reference: string;
  client: string;
  email: string;
  service: string;
  budget: string;
  status: string;
  date: string;
}

export default function DevisPage() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [quotes] = useState<QuoteRequest[]>([]);

  const filteredQuotes = quotes.filter((q) => {
    if (activeFilter !== "all" && q.status !== activeFilter) return false;
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        q.reference.toLowerCase().includes(query) ||
        q.client.toLowerCase().includes(query) ||
        q.email.toLowerCase().includes(query) ||
        q.service.toLowerCase().includes(query)
      );
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Demandes de Devis</h1>
          <p className="text-gray-400 mt-1">
            Gérez les demandes de devis clients
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-gray-400 hover:text-white hover:bg-white/10 transition-all text-sm">
            <Download size={16} />
            Exporter
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-gray-400 hover:text-white hover:bg-white/10 transition-all text-sm">
            <RefreshCw size={16} />
            Actualiser
          </button>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-4 space-y-4">
        {/* Search */}
        <div className="relative">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
          />
          <input
            type="text"
            placeholder="Rechercher par référence, client, email, service..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 text-sm focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/20 transition-all"
          />
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-2">
          {filters.map((filter) => (
            <button
              key={filter.key}
              onClick={() => setActiveFilter(filter.key)}
              className={`px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all ${
                activeFilter === filter.key
                  ? "bg-violet-600/15 text-violet-300 border border-violet-500/20"
                  : "bg-white/5 text-gray-400 border border-transparent hover:bg-white/10 hover:text-gray-300"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Référence
                </th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Client
                </th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Email
                </th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Service
                </th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Budget
                </th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Statut
                </th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Date
                </th>
                <th className="text-right px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredQuotes.length > 0 ? (
                filteredQuotes.map((quote) => (
                  <tr
                    key={quote.id}
                    className="hover:bg-white/5 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <span className="text-sm font-medium text-violet-400">
                        {quote.reference}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-white">{quote.client}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-400">
                        {quote.email}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-300">
                        {quote.service}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-white font-medium">
                        {quote.budget}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge status={quote.status} />
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-400">
                        {quote.date}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button className="p-1.5 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-all">
                          <Eye size={16} />
                        </button>
                        <button className="p-1.5 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-all">
                          <MoreHorizontal size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="px-6 py-16 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                        <FileText size={24} className="text-gray-600" />
                      </div>
                      <div>
                        <p className="text-gray-400 font-medium">
                          Aucune demande de devis
                        </p>
                        <p className="text-gray-600 text-sm mt-1">
                          Les nouvelles demandes de devis apparaîtront ici
                        </p>
                      </div>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
