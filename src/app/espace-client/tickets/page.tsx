"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Ticket,
  Plus,
  Search,
  Clock,
  MessageSquare,
  ChevronRight,
  ChevronLeft,
  Send,
  X,
  Loader2,
  AlertCircle,
} from "lucide-react";
import PageTransition, { AnimatedSection } from "@/components/admin/PageTransition";

type TicketStatus = "all" | "open" | "in_progress" | "waiting_client" | "resolved" | "closed";
type TicketPriority = "low" | "medium" | "high" | "urgent";

interface TicketData {
  id: string;
  reference: string;
  subject: string;
  description: string | null;
  priority: TicketPriority;
  status: string;
  category: string;
  created_at: string;
  updated_at: string;
  messages_count: number;
}

interface TicketMessage {
  id: string;
  ticket_id: string;
  sender_id: string;
  message: string;
  created_at: string;
}

const statusConfig: Record<string, { label: string; color: string }> = {
  open: { label: "Ouvert", color: "bg-blue-500/20 text-blue-300 border-blue-500/30" },
  in_progress: { label: "En cours", color: "bg-orange-500/20 text-orange-300 border-orange-500/30" },
  waiting_client: { label: "En attente", color: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30" },
  waiting_internal: { label: "En traitement", color: "bg-purple-500/20 text-purple-300 border-purple-500/30" },
  resolved: { label: "Résolu", color: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30" },
  closed: { label: "Fermé", color: "bg-gray-500/20 text-gray-300 border-gray-500/30" },
};

const priorityConfig: Record<TicketPriority, { label: string; color: string }> = {
  low: { label: "Basse", color: "bg-gray-500/20 text-gray-300 border-gray-500/30" },
  medium: { label: "Moyenne", color: "bg-blue-500/20 text-blue-300 border-blue-500/30" },
  high: { label: "Haute", color: "bg-orange-500/20 text-orange-300 border-orange-500/30" },
  urgent: { label: "Urgente", color: "bg-red-500/20 text-red-300 border-red-500/30" },
};

const categoryOptions = [
  { value: "general", label: "Général" },
  { value: "technique", label: "Technique" },
  { value: "facturation", label: "Facturation" },
  { value: "design", label: "Design" },
  { value: "autre", label: "Autre" },
];

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
  if (!config) return null;
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-medium border ${config.color}`}>
      {config.label}
    </span>
  );
}

function formatDate(dateStr: string) {
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return "À l'instant";
  if (diffMins < 60) return `Il y a ${diffMins}min`;
  if (diffHours < 24) return `Il y a ${diffHours}h`;
  if (diffDays < 7) return `Il y a ${diffDays}j`;
  return date.toLocaleDateString("fr-FR", { day: "numeric", month: "short" });
}

function formatFullDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function ClientTicketsPage() {
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState<TicketStatus>("all");
  const [tickets, setTickets] = useState<TicketData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Create ticket modal
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [creating, setCreating] = useState(false);
  const [createForm, setCreateForm] = useState({
    subject: "",
    description: "",
    priority: "medium" as TicketPriority,
    category: "general",
  });

  // Ticket detail view
  const [selectedTicket, setSelectedTicket] = useState<TicketData | null>(null);
  const [messages, setMessages] = useState<TicketMessage[]>([]);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [sendingMessage, setSendingMessage] = useState(false);

  const fetchTickets = useCallback(async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (activeFilter !== "all") params.set("status", activeFilter);
      if (search) params.set("search", search);

      const res = await fetch(`/api/client/tickets?${params}`);
      if (!res.ok) throw new Error("Erreur lors du chargement");

      const json = await res.json();
      setTickets(json.data || []);
      setError("");
    } catch {
      setError("Impossible de charger les tickets");
    } finally {
      setLoading(false);
    }
  }, [activeFilter, search]);

  useEffect(() => {
    fetchTickets();
  }, [fetchTickets]);

  const fetchTicketDetail = async (ticket: TicketData) => {
    setSelectedTicket(ticket);
    setLoadingMessages(true);
    try {
      const res = await fetch(`/api/client/tickets/${ticket.id}`);
      if (!res.ok) throw new Error("Erreur");
      const json = await res.json();
      setMessages(json.messages || []);
    } catch {
      setMessages([]);
    } finally {
      setLoadingMessages(false);
    }
  };

  const handleCreateTicket = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!createForm.subject.trim()) return;

    setCreating(true);
    try {
      const res = await fetch("/api/client/tickets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(createForm),
      });

      if (!res.ok) {
        const json = await res.json();
        throw new Error(json.error || "Erreur lors de la création");
      }

      setShowCreateModal(false);
      setCreateForm({ subject: "", description: "", priority: "medium", category: "general" });
      fetchTickets();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur");
    } finally {
      setCreating(false);
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedTicket) return;

    setSendingMessage(true);
    try {
      const res = await fetch(`/api/client/tickets/${selectedTicket.id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: newMessage }),
      });

      if (!res.ok) throw new Error("Erreur lors de l'envoi");

      const msg = await res.json();
      setMessages((prev) => [...prev, msg]);
      setNewMessage("");
    } catch {
      setError("Impossible d'envoyer le message");
    } finally {
      setSendingMessage(false);
    }
  };

  const filterTabs: { key: TicketStatus; label: string }[] = [
    { key: "all", label: "Tous" },
    { key: "open", label: "Ouverts" },
    { key: "in_progress", label: "En cours" },
    { key: "resolved", label: "Résolus" },
  ];

  // === TICKET DETAIL VIEW ===
  if (selectedTicket) {
    return (
      <PageTransition className="space-y-6">
        <AnimatedSection>
          <button
            onClick={() => setSelectedTicket(null)}
            className="flex items-center gap-2 text-sm text-text-muted hover:text-cyan-400 transition-colors mb-4"
          >
            <ChevronLeft size={16} />
            Retour aux tickets
          </button>

          <div className="bg-dark-2 border border-white/[0.06] rounded-2xl p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs text-text-muted font-mono">{selectedTicket.reference}</span>
                  <PriorityBadge priority={selectedTicket.priority} />
                </div>
                <h2 className="text-xl font-serif text-text-primary">{selectedTicket.subject}</h2>
              </div>
              <StatusBadge status={selectedTicket.status} />
            </div>

            {selectedTicket.description && (
              <p className="text-sm text-text-secondary mb-4 bg-dark border border-white/[0.04] rounded-xl p-4">
                {selectedTicket.description}
              </p>
            )}

            <div className="flex items-center gap-4 text-xs text-text-muted">
              <span>Créé le {formatFullDate(selectedTicket.created_at)}</span>
              <span>Catégorie : {categoryOptions.find(c => c.value === selectedTicket.category)?.label || selectedTicket.category}</span>
            </div>
          </div>
        </AnimatedSection>

        {/* Messages */}
        <AnimatedSection>
          <div className="bg-dark-2 border border-white/[0.06] rounded-2xl overflow-hidden">
            <div className="p-4 border-b border-white/[0.06]">
              <h3 className="text-sm font-medium text-text-primary flex items-center gap-2">
                <MessageSquare size={16} />
                Messages
              </h3>
            </div>

            <div className="p-4 space-y-4 max-h-[400px] overflow-y-auto">
              {loadingMessages ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 size={20} className="animate-spin text-cyan-400" />
                </div>
              ) : messages.length === 0 ? (
                <p className="text-center text-text-muted text-sm py-8">
                  Aucun message pour le moment
                </p>
              ) : (
                messages.map((msg) => (
                  <div key={msg.id} className="bg-dark border border-white/[0.04] rounded-xl p-4">
                    <p className="text-sm text-text-primary whitespace-pre-wrap">{msg.message}</p>
                    <span className="text-[10px] text-text-muted mt-2 block">
                      {formatFullDate(msg.created_at)}
                    </span>
                  </div>
                ))
              )}
            </div>

            {/* Reply form */}
            {selectedTicket.status !== "closed" && (
              <form onSubmit={handleSendMessage} className="p-4 border-t border-white/[0.06]">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Votre réponse..."
                    className="flex-1 px-4 py-2.5 bg-dark border border-white/[0.06] rounded-full text-sm text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                  />
                  <button
                    type="submit"
                    disabled={sendingMessage || !newMessage.trim()}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-cyan-500 text-dark font-semibold text-sm hover:bg-cyan-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {sendingMessage ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
                  </button>
                </div>
              </form>
            )}
          </div>
        </AnimatedSection>
      </PageTransition>
    );
  }

  // === TICKETS LIST VIEW ===
  return (
    <PageTransition className="space-y-6">
      {/* Header */}
      <AnimatedSection>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-serif text-2xl text-text-primary">Mes Tickets</h1>
            <p className="text-text-secondary mt-1">Suivez vos demandes de support</p>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-cyan-500 text-dark font-semibold text-sm hover:bg-cyan-400 transition-all shadow-lg shadow-cyan-500/20"
          >
            <Plus size={16} />
            <span>Nouveau ticket</span>
          </button>
        </div>
      </AnimatedSection>

      {/* Error */}
      {error && (
        <AnimatedSection>
          <div className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-300 text-sm">
            <AlertCircle size={16} />
            {error}
            <button onClick={() => setError("")} className="ml-auto"><X size={14} /></button>
          </div>
        </AnimatedSection>
      )}

      {/* Filters */}
      <AnimatedSection>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
            <input
              type="text"
              placeholder="Rechercher un ticket..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-dark border border-white/[0.06] rounded-full text-sm text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all"
            />
          </div>
          <div className="flex items-center gap-1 bg-dark-2 border border-white/[0.06] rounded-full p-1 overflow-x-auto">
            {filterTabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveFilter(tab.key)}
                className={`px-3 py-1.5 text-xs font-medium whitespace-nowrap transition-all ${
                  activeFilter === tab.key
                    ? "bg-cyan-500/[0.06] text-cyan-400 border border-cyan-500/20 rounded-full"
                    : "bg-dark-2 text-text-secondary border border-white/[0.06] hover:bg-white/[0.04] hover:text-text-primary rounded-full"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Tickets list */}
      <AnimatedSection>
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 size={24} className="animate-spin text-cyan-400" />
          </div>
        ) : tickets.length > 0 ? (
          <div className="space-y-2">
            {tickets.map((ticket) => (
              <div
                key={ticket.id}
                onClick={() => fetchTicketDetail(ticket)}
                className="flex items-center gap-4 p-4 bg-dark-2 border border-white/[0.06] rounded-xl hover:border-cyan-500/20 transition-all group cursor-pointer"
              >
                <div className="flex-shrink-0">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      ticket.status === "open"
                        ? "bg-blue-400"
                        : ticket.status === "in_progress"
                        ? "bg-orange-400"
                        : ticket.status === "resolved"
                        ? "bg-emerald-400"
                        : "bg-gray-400"
                    }`}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] text-text-muted font-mono">{ticket.reference}</span>
                    <h3 className="text-sm font-medium text-text-primary truncate group-hover:text-cyan-400 transition-colors">
                      {ticket.subject}
                    </h3>
                    <PriorityBadge priority={ticket.priority} />
                  </div>
                  <p className="text-xs text-text-muted truncate">
                    {ticket.description || "Pas de description"}
                  </p>
                </div>
                <div className="hidden sm:flex items-center gap-3 flex-shrink-0">
                  <StatusBadge status={ticket.status} />
                  <div className="flex items-center gap-1 text-xs text-text-muted">
                    <MessageSquare size={12} />
                    <span>{ticket.messages_count}</span>
                  </div>
                </div>
                <div className="hidden md:flex items-center gap-1.5 text-xs text-text-muted flex-shrink-0">
                  <Clock size={12} />
                  <span>{formatDate(ticket.updated_at)}</span>
                </div>
                <ChevronRight size={16} className="text-text-muted group-hover:text-cyan-400 flex-shrink-0 transition-colors" />
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-dark-2 border border-white/[0.06] rounded-2xl p-12">
            <div className="text-center">
              <div className="w-16 h-16 rounded-2xl bg-cyan-500/[0.06] flex items-center justify-center mx-auto mb-4">
                <Ticket size={28} className="text-text-muted" />
              </div>
              <h3 className="text-text-primary font-medium text-lg mb-2">Aucun ticket</h3>
              <p className="text-text-muted text-sm max-w-md mx-auto mb-6">
                Vous n&apos;avez pas encore de tickets de support. Besoin d&apos;aide ? Ouvrez un nouveau ticket.
              </p>
              <button
                onClick={() => setShowCreateModal(true)}
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-cyan-500/[0.06] text-cyan-400 border border-cyan-500/20 rounded-full hover:bg-cyan-500/10 transition-all text-sm font-medium"
              >
                <Plus size={16} />
                <span>Ouvrir un ticket</span>
              </button>
            </div>
          </div>
        )}
      </AnimatedSection>

      {/* Create Ticket Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-dark-2 border border-white/[0.08] rounded-2xl w-full max-w-lg shadow-2xl">
            <div className="flex items-center justify-between p-6 border-b border-white/[0.06]">
              <h2 className="text-lg font-serif text-text-primary">Nouveau ticket</h2>
              <button
                onClick={() => setShowCreateModal(false)}
                className="p-1 text-text-muted hover:text-text-primary transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleCreateTicket} className="p-6 space-y-4">
              {/* Subject */}
              <div>
                <label className="block text-xs font-medium text-text-secondary mb-1.5">
                  Sujet *
                </label>
                <input
                  type="text"
                  required
                  value={createForm.subject}
                  onChange={(e) => setCreateForm((f) => ({ ...f, subject: e.target.value }))}
                  placeholder="Décrivez brièvement votre problème..."
                  className="w-full px-4 py-2.5 bg-dark border border-white/[0.06] rounded-xl text-sm text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-medium text-text-secondary mb-1.5">
                  Description
                </label>
                <textarea
                  value={createForm.description}
                  onChange={(e) => setCreateForm((f) => ({ ...f, description: e.target.value }))}
                  placeholder="Détaillez votre demande..."
                  rows={4}
                  className="w-full px-4 py-2.5 bg-dark border border-white/[0.06] rounded-xl text-sm text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-cyan-500/50 resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                {/* Category */}
                <div>
                  <label className="block text-xs font-medium text-text-secondary mb-1.5">
                    Catégorie
                  </label>
                  <select
                    value={createForm.category}
                    onChange={(e) => setCreateForm((f) => ({ ...f, category: e.target.value }))}
                    className="w-full px-4 py-2.5 bg-dark border border-white/[0.06] rounded-xl text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                  >
                    {categoryOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                </div>

                {/* Priority */}
                <div>
                  <label className="block text-xs font-medium text-text-secondary mb-1.5">
                    Priorité
                  </label>
                  <select
                    value={createForm.priority}
                    onChange={(e) => setCreateForm((f) => ({ ...f, priority: e.target.value as TicketPriority }))}
                    className="w-full px-4 py-2.5 bg-dark border border-white/[0.06] rounded-xl text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                  >
                    <option value="low">Basse</option>
                    <option value="medium">Moyenne</option>
                    <option value="high">Haute</option>
                    <option value="urgent">Urgente</option>
                  </select>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2.5 text-sm text-text-secondary hover:text-text-primary transition-colors"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  disabled={creating || !createForm.subject.trim()}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-cyan-500 text-dark font-semibold text-sm hover:bg-cyan-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {creating ? (
                    <Loader2 size={16} className="animate-spin" />
                  ) : (
                    <Plus size={16} />
                  )}
                  Créer le ticket
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </PageTransition>
  );
}
