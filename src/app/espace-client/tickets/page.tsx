"use client";

import { useState } from "react";
import {
  Ticket,
  Plus,
  Search,
  Clock,
  MessageSquare,
  ChevronRight,
} from "lucide-react";

type TicketStatus = "all" | "open" | "in_progress" | "resolved";
type TicketPriority = "low" | "medium" | "high" | "urgent";

interface SupportTicket {
  id: string;
  subject: string;
  priority: TicketPriority;
  status: "open" | "in_progress" | "resolved";
  lastMessage: string;
  date: string;
  updatedAt: string;
  messagesCount: number;
}

const statusConfig: Record<string, { label: string; color: string }> = {
  open: { label: "Ouvert", color: "bg-blue-500/20 text-blue-300 border-blue-500/30" },
  in_progress: { label: "En cours", color: "bg-orange-500/20 text-orange-300 border-orange-500/30" },
  resolved: { label: "Résolu", color: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30" },
};

const priorityConfig: Record<TicketPriority, { label: string; color: string }> = {
  low: { label: "Basse", color: "bg-gray-500/20 text-gray-300 border-gray-500/30" },
  medium: { label: "Moyenne", color: "bg-blue-500/20 text-blue-300 border-blue-500/30" },
  high: { label: "Haute", color: "bg-orange-500/20 text-orange-300 border-orange-500/30" },
  urgent: { label: "Urgente", color: "bg-red-500/20 text-red-300 border-red-500/30" },
};

function StatusBadge({ status }: { status: string }) {
  const config = statusConfig[status];
  if (!config) return null;
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium border ${config.color}`}>
      {config.label}
    </span>
  );
}

function PriorityBadge({ priority }: { priority: TicketPriority }) {
  const config = priorityConfig[priority];
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-medium border ${config.color}`}>
      {config.label}
    </span>
  );
}

function TicketRow({ ticket }: { ticket: SupportTicket }) {
  return (
    <div className="flex items-center gap-4 p-4 bg-white/5 border border-white/10 rounded-xl hover:border-blue-500/20 transition-all group cursor-pointer">
      {/* Status indicator */}
      <div className="flex-shrink-0">
        <div
          className={`w-2 h-2 rounded-full ${
            ticket.status === "open"
              ? "bg-blue-400"
              : ticket.status === "in_progress"
              ? "bg-orange-400"
              : "bg-emerald-400"
          }`}
        />
      </div>

      {/* Main content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <h3 className="text-sm font-medium text-white truncate group-hover:text-blue-300 transition-colors">
            {ticket.subject}
          </h3>
          <PriorityBadge priority={ticket.priority} />
        </div>
        <p className="text-xs text-gray-500 truncate">{ticket.lastMessage}</p>
      </div>

      {/* Meta */}
      <div className="hidden sm:flex items-center gap-3 flex-shrink-0">
        <StatusBadge status={ticket.status} />
        <div className="flex items-center gap-1 text-xs text-gray-500">
          <MessageSquare size={12} />
          <span>{ticket.messagesCount}</span>
        </div>
      </div>

      {/* Date */}
      <div className="hidden md:flex items-center gap-1.5 text-xs text-gray-500 flex-shrink-0">
        <Clock size={12} />
        <span>{ticket.updatedAt}</span>
      </div>

      {/* Arrow */}
      <ChevronRight size={16} className="text-gray-600 group-hover:text-blue-400 flex-shrink-0 transition-colors" />
    </div>
  );
}

export default function ClientTicketsPage() {
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState<TicketStatus>("all");

  // Placeholder data - will be replaced with API call
  const tickets: SupportTicket[] = [];

  const filteredTickets = tickets.filter((t) => {
    const matchSearch = t.subject.toLowerCase().includes(search.toLowerCase());
    const matchFilter = activeFilter === "all" || t.status === activeFilter;
    return matchSearch && matchFilter;
  });

  const filterTabs: { key: TicketStatus; label: string }[] = [
    { key: "all", label: "Tous" },
    { key: "open", label: "Ouvert" },
    { key: "in_progress", label: "En cours" },
    { key: "resolved", label: "Résolu" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Mes Tickets</h1>
          <p className="text-gray-400 mt-1">Suivez vos demandes de support</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 text-white text-sm font-medium hover:from-blue-500 hover:to-cyan-500 transition-all shadow-lg shadow-blue-600/20">
          <Plus size={16} />
          <span>Nouveau ticket</span>
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Search */}
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            placeholder="Rechercher un ticket..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 transition-all"
          />
        </div>

        {/* Filter tabs */}
        <div className="flex items-center gap-1 bg-white/5 border border-white/10 rounded-xl p-1 overflow-x-auto">
          {filterTabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveFilter(tab.key)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                activeFilter === tab.key
                  ? "bg-blue-600/20 text-blue-300 border border-blue-500/30"
                  : "text-gray-400 hover:text-white hover:bg-white/5 border border-transparent"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tickets list */}
      {filteredTickets.length > 0 ? (
        <div className="space-y-2">
          {filteredTickets.map((ticket) => (
            <TicketRow key={ticket.id} ticket={ticket} />
          ))}
        </div>
      ) : (
        <div className="bg-white/5 border border-white/10 rounded-2xl p-12">
          <div className="text-center">
            <div className="w-16 h-16 rounded-2xl bg-blue-600/10 flex items-center justify-center mx-auto mb-4">
              <Ticket size={28} className="text-blue-400/60" />
            </div>
            <h3 className="text-white font-medium text-lg mb-2">Aucun ticket</h3>
            <p className="text-gray-500 text-sm max-w-md mx-auto mb-6">
              Vous n&apos;avez pas encore de tickets de support. Besoin d&apos;aide ? Ouvrez un nouveau ticket.
            </p>
            <button className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 text-white text-sm font-medium hover:from-blue-500 hover:to-cyan-500 transition-all shadow-lg shadow-blue-600/20">
              <Plus size={16} />
              <span>Ouvrir un ticket</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
