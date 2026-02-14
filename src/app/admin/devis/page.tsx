"use client";

import { useState } from "react";
import {
  Plus,
  Search,
  Download,
  Eye,
  MoreHorizontal,
  FileText,
  MessageSquare,
  RefreshCw,
} from "lucide-react";
import PageHeader from "@/components/admin/PageHeader";
import PageTransition, { AnimatedSection } from "@/components/admin/PageTransition";

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
    <PageTransition className="space-y-6">
      <PageHeader
        icon={<MessageSquare size={24} />}
        title="Demandes de Devis"
        subtitle="Gérez les demandes de devis clients"
        actions={
          <>
            <button className="flex items-center gap-2 px-4 py-2.5 bg-dark-2 border border-white/[0.06] rounded-full text-text-secondary hover:bg-white/[0.04] hover:text-text-primary transition-all text-sm">
              <Download size={16} />
              Exporter
            </button>
            <button className="flex items-center gap-2 px-4 py-2.5 bg-dark-2 border border-white/[0.06] rounded-full text-text-secondary hover:bg-white/[0.04] hover:text-text-primary transition-all text-sm">
              <RefreshCw size={16} />
              Actualiser
            </button>
            <button className="flex items-center gap-2 px-4 py-2.5 bg-accent text-dark font-semibold rounded-full hover:bg-accent-hover shadow-lg shadow-accent/20 transition-all text-sm">
              <Plus size={16} />
              Nouveau devis
            </button>
          </>
        }
      />

      {/* Filters & Search */}
      <AnimatedSection>
        <div className="bg-dark-2 border border-white/[0.06] rounded-2xl p-4 space-y-4">
          {/* Search */}
          <div className="relative">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted"
            />
            <input
              type="text"
              placeholder="Rechercher par référence, client, email, service..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-dark border border-white/[0.06] rounded-full text-sm text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all"
            />
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-2">
            {filters.map((filter) => (
              <button
                key={filter.key}
                onClick={() => setActiveFilter(filter.key)}
                className={`px-3.5 py-1.5 text-sm font-medium transition-all ${
                  activeFilter === filter.key
                    ? "bg-accent-dim text-accent border border-accent/20 rounded-full"
                    : "bg-dark-2 text-text-secondary border border-white/[0.06] hover:bg-white/[0.04] hover:text-text-primary rounded-full"
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Table */}
      <AnimatedSection>
        <div className="bg-dark-2 border border-white/[0.06] rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/[0.06]">
                  <th className="text-left px-6 py-4 text-[0.65rem] font-mono font-semibold text-text-muted uppercase tracking-wider">
                    Référence
                  </th>
                  <th className="text-left px-6 py-4 text-[0.65rem] font-mono font-semibold text-text-muted uppercase tracking-wider">
                    Client
                  </th>
                  <th className="text-left px-6 py-4 text-[0.65rem] font-mono font-semibold text-text-muted uppercase tracking-wider">
                    Email
                  </th>
                  <th className="text-left px-6 py-4 text-[0.65rem] font-mono font-semibold text-text-muted uppercase tracking-wider">
                    Service
                  </th>
                  <th className="text-left px-6 py-4 text-[0.65rem] font-mono font-semibold text-text-muted uppercase tracking-wider">
                    Budget
                  </th>
                  <th className="text-left px-6 py-4 text-[0.65rem] font-mono font-semibold text-text-muted uppercase tracking-wider">
                    Statut
                  </th>
                  <th className="text-left px-6 py-4 text-[0.65rem] font-mono font-semibold text-text-muted uppercase tracking-wider">
                    Date
                  </th>
                  <th className="text-right px-6 py-4 text-[0.65rem] font-mono font-semibold text-text-muted uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.06]">
                {filteredQuotes.length > 0 ? (
                  filteredQuotes.map((quote) => (
                    <tr
                      key={quote.id}
                      className="hover:bg-white/[0.02] transition-colors"
                    >
                      <td className="px-6 py-4">
                        <span className="text-sm font-medium text-accent">
                          {quote.reference}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-text-primary">{quote.client}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-text-secondary">
                          {quote.email}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-text-secondary">
                          {quote.service}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-text-primary font-medium">
                          {quote.budget}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <StatusBadge status={quote.status} />
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-text-muted">
                          {quote.date}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button className="p-1.5 rounded-lg hover:bg-white/[0.04] text-text-muted hover:text-text-primary transition-all">
                            <Eye size={16} />
                          </button>
                          <button className="p-1.5 rounded-lg hover:bg-white/[0.04] text-text-muted hover:text-text-primary transition-all">
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
                        <div className="w-12 h-12 rounded-2xl bg-dark border border-white/[0.06] flex items-center justify-center">
                          <FileText size={24} className="text-text-muted" />
                        </div>
                        <div>
                          <p className="text-text-muted font-medium">
                            Aucune demande de devis
                          </p>
                          <p className="text-text-muted text-sm mt-1">
                            Les nouvelles demandes de devis apparaîtront ici
                          </p>
                        </div>
                        <button className="mt-2 inline-flex items-center gap-2 px-4 py-2 bg-accent-dim text-accent border border-accent/20 rounded-full hover:bg-accent/20 transition-all text-sm font-medium">
                          <Plus size={16} />
                          Créer un devis
                        </button>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </AnimatedSection>
    </PageTransition>
  );
}
