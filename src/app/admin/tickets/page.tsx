"use client";

import { useState } from "react";
import {
  Plus,
  Search,
  Download,
  Eye,
  MoreHorizontal,
  Ticket,
  RefreshCw,
} from "lucide-react";
import PageHeader from "@/components/admin/PageHeader";
import PageTransition, { AnimatedSection } from "@/components/admin/PageTransition";

const filters = [
  { key: "all", label: "Tous" },
  { key: "open", label: "Ouvert" },
  { key: "in_progress", label: "En cours" },
  { key: "pending", label: "En attente" },
  { key: "resolved", label: "Résolu" },
  { key: "closed", label: "Fermé" },
];

function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, string> = {
    open: "bg-blue-500/15 text-blue-400 border-blue-500/20",
    in_progress: "bg-violet-500/15 text-violet-400 border-violet-500/20",
    pending: "bg-orange-500/15 text-orange-400 border-orange-500/20",
    resolved: "bg-emerald-500/15 text-emerald-400 border-emerald-500/20",
    closed: "bg-gray-500/15 text-gray-400 border-gray-500/20",
  };
  const labels: Record<string, string> = {
    open: "Ouvert",
    in_progress: "En cours",
    pending: "En attente",
    resolved: "Résolu",
    closed: "Fermé",
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

function PriorityBadge({ priority }: { priority: string }) {
  const colors: Record<string, string> = {
    urgent: "bg-red-500/15 text-red-400 border-red-500/20",
    high: "bg-orange-500/15 text-orange-400 border-orange-500/20",
    medium: "bg-yellow-500/15 text-yellow-400 border-yellow-500/20",
    low: "bg-gray-500/15 text-gray-400 border-gray-500/20",
  };
  const labels: Record<string, string> = {
    urgent: "Urgent",
    high: "Haute",
    medium: "Moyenne",
    low: "Basse",
  };
  const color =
    colors[priority] || "bg-gray-500/15 text-gray-400 border-gray-500/20";
  return (
    <span
      className={`inline-flex px-2.5 py-1 rounded-lg text-xs font-medium border ${color}`}
    >
      {labels[priority] || priority}
    </span>
  );
}

interface TicketItem {
  id: string;
  reference: string;
  subject: string;
  client: string;
  priority: string;
  status: string;
  assigned: string;
  date: string;
}

export default function TicketsPage() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [tickets] = useState<TicketItem[]>([]);

  const filteredTickets = tickets.filter((t) => {
    if (activeFilter !== "all" && t.status !== activeFilter) return false;
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        t.reference.toLowerCase().includes(query) ||
        t.subject.toLowerCase().includes(query) ||
        t.client.toLowerCase().includes(query)
      );
    }
    return true;
  });

  return (
    <PageTransition className="space-y-6">
      <PageHeader
        icon={<Ticket size={24} />}
        title="Tickets Support"
        subtitle="Gérez les tickets de support client"
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
              Nouveau ticket
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
              placeholder="Rechercher par référence, sujet, client..."
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
                    Sujet
                  </th>
                  <th className="text-left px-6 py-4 text-[0.65rem] font-mono font-semibold text-text-muted uppercase tracking-wider">
                    Client
                  </th>
                  <th className="text-left px-6 py-4 text-[0.65rem] font-mono font-semibold text-text-muted uppercase tracking-wider">
                    Priorité
                  </th>
                  <th className="text-left px-6 py-4 text-[0.65rem] font-mono font-semibold text-text-muted uppercase tracking-wider">
                    Statut
                  </th>
                  <th className="text-left px-6 py-4 text-[0.65rem] font-mono font-semibold text-text-muted uppercase tracking-wider">
                    Assigné
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
                {filteredTickets.length > 0 ? (
                  filteredTickets.map((ticket) => (
                    <tr
                      key={ticket.id}
                      className="hover:bg-white/[0.02] transition-colors"
                    >
                      <td className="px-6 py-4">
                        <span className="text-sm font-medium text-accent">
                          {ticket.reference}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-text-primary">
                          {ticket.subject}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-text-secondary">
                          {ticket.client}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <PriorityBadge priority={ticket.priority} />
                      </td>
                      <td className="px-6 py-4">
                        <StatusBadge status={ticket.status} />
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-text-muted">
                          {ticket.assigned || "Non assigné"}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-text-muted">
                          {ticket.date}
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
                          <Ticket size={24} className="text-text-muted" />
                        </div>
                        <div>
                          <p className="text-text-muted font-medium">
                            Aucun ticket
                          </p>
                          <p className="text-text-muted text-sm mt-1">
                            Les tickets de support apparaîtront ici
                          </p>
                        </div>
                        <button className="mt-2 inline-flex items-center gap-2 px-4 py-2 bg-accent-dim text-accent border border-accent/20 rounded-full hover:bg-accent/20 transition-all text-sm font-medium">
                          <Plus size={16} />
                          Créer un ticket
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
