"use client";

import { useState, useCallback } from "react";
import {
  Plus,
  Search,
  Download,
  Eye,
  Pencil,
  Trash2,
  Ticket,
  RefreshCw,
  Loader2,
} from "lucide-react";
import PageHeader from "@/components/admin/PageHeader";
import PageTransition, { AnimatedSection } from "@/components/admin/PageTransition";
import Modal from "@/components/admin/Modal";
import ConfirmDialog from "@/components/admin/ConfirmDialog";
import FormField from "@/components/admin/FormField";
import { useToast } from "@/components/admin/Toast";
import { useAdminData } from "@/hooks/useAdminData";
import { formatDateTime } from "@/lib/utils";
import type { Ticket as TicketType } from "@/types/database";

const filterTabs = [
  { key: "all", label: "Tous" },
  { key: "open", label: "Ouvert" },
  { key: "in_progress", label: "En cours" },
  { key: "waiting_client", label: "Att. client" },
  { key: "waiting_internal", label: "Att. interne" },
  { key: "resolved", label: "Resolu" },
  { key: "closed", label: "Ferme" },
];

function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, string> = {
    open: "bg-blue-500/15 text-blue-400 border-blue-500/20",
    in_progress: "bg-violet-500/15 text-violet-400 border-violet-500/20",
    waiting_client: "bg-orange-500/15 text-orange-400 border-orange-500/20",
    waiting_internal: "bg-yellow-500/15 text-yellow-400 border-yellow-500/20",
    resolved: "bg-emerald-500/15 text-emerald-400 border-emerald-500/20",
    closed: "bg-gray-500/15 text-gray-400 border-gray-500/20",
  };
  const labels: Record<string, string> = {
    open: "Ouvert",
    in_progress: "En cours",
    waiting_client: "Att. client",
    waiting_internal: "Att. interne",
    resolved: "Resolu",
    closed: "Ferme",
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

interface TicketForm {
  subject: string;
  description: string;
  priority: string;
  status: string;
  category: string;
}

const defaultForm: TicketForm = {
  subject: "",
  description: "",
  priority: "medium",
  status: "open",
  category: "general",
};

export default function TicketsPage() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [editing, setEditing] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<TicketType | null>(null);
  const [form, setForm] = useState<TicketForm>(defaultForm);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const { toast } = useToast();

  const { data: tickets, loading, refetch } = useAdminData<TicketType>("/api/admin/tickets", {
    status: activeFilter,
    search: debouncedSearch,
  });

  const handleSearch = useCallback((value: string) => {
    setSearchQuery(value);
    const timeout = setTimeout(() => setDebouncedSearch(value), 300);
    return () => clearTimeout(timeout);
  }, []);

  const openCreate = () => {
    setEditing(false);
    setSelectedTicket(null);
    setForm(defaultForm);
    setShowModal(true);
  };

  const openEdit = (ticket: TicketType) => {
    setEditing(true);
    setSelectedTicket(ticket);
    setForm({
      subject: ticket.subject,
      description: "",
      priority: ticket.priority,
      status: ticket.status,
      category: ticket.category,
    });
    setShowModal(true);
  };

  const openDetail = (ticket: TicketType) => {
    setSelectedTicket(ticket);
    setShowDetail(true);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const url = editing ? `/api/admin/tickets/${selectedTicket!.id}` : "/api/admin/tickets";
      const res = await fetch(url, {
        method: editing ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Erreur");
      toast({ type: "success", message: editing ? "Ticket modifie" : "Ticket cree" });
      setShowModal(false);
      refetch();
    } catch {
      toast({ type: "error", message: "Erreur lors de l'enregistrement" });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedTicket) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/admin/tickets/${selectedTicket.id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Erreur");
      toast({ type: "success", message: "Ticket supprime" });
      setShowDelete(false);
      setSelectedTicket(null);
      refetch();
    } catch {
      toast({ type: "error", message: "Erreur lors de la suppression" });
    } finally {
      setDeleting(false);
    }
  };

  const handleStatusChange = async (ticket: TicketType, newStatus: string) => {
    try {
      const res = await fetch(`/api/admin/tickets/${ticket.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!res.ok) throw new Error("Erreur");
      toast({ type: "success", message: "Statut mis a jour" });
      setShowDetail(false);
      refetch();
    } catch {
      toast({ type: "error", message: "Erreur lors de la mise a jour" });
    }
  };

  const exportCSV = () => {
    const headers = ["Reference", "Sujet", "Priorite", "Statut", "Categorie", "Date"];
    const rows = tickets.map((t) => [
      t.reference,
      t.subject,
      t.priority,
      t.status,
      t.category,
      t.created_at,
    ]);
    const csv = [headers, ...rows]
      .map((r) => r.map((c) => `"${String(c || "").replace(/"/g, '""')}"`).join(","))
      .join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `tickets-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <PageTransition className="space-y-6">
      <PageHeader
        icon={<Ticket size={24} />}
        title="Tickets Support"
        subtitle="Gerez les tickets de support client"
        actions={
          <>
            <button
              onClick={exportCSV}
              className="flex items-center gap-2 px-4 py-2.5 bg-dark-2 border border-border-dark rounded-full text-text-secondary hover:bg-dark-3 hover:text-text-primary transition-all text-sm"
            >
              <Download size={16} />
              Exporter
            </button>
            <button
              onClick={refetch}
              className="flex items-center gap-2 px-4 py-2.5 bg-dark-2 border border-border-dark rounded-full text-text-secondary hover:bg-dark-3 hover:text-text-primary transition-all text-sm"
            >
              <RefreshCw size={16} />
              Actualiser
            </button>
            <button
              onClick={openCreate}
              className="flex items-center gap-2 px-4 py-2.5 bg-accent text-dark font-semibold rounded-full hover:bg-accent-hover shadow-lg shadow-accent/20 transition-all text-sm"
            >
              <Plus size={16} />
              Nouveau ticket
            </button>
          </>
        }
      />

      {/* Filters & Search */}
      <AnimatedSection>
        <div className="bg-dark-2 border border-border-dark rounded-2xl p-4 space-y-4">
          {/* Search */}
          <div className="relative">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted"
            />
            <input
              type="text"
              placeholder="Rechercher par reference, sujet..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-dark border border-border-dark rounded-full text-sm text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all"
            />
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-2">
            {filterTabs.map((filter) => (
              <button
                key={filter.key}
                onClick={() => setActiveFilter(filter.key)}
                className={`px-3.5 py-1.5 text-sm font-medium transition-all ${
                  activeFilter === filter.key
                    ? "bg-accent-dim text-accent border border-accent/20 rounded-full"
                    : "bg-dark-2 text-text-secondary border border-border-dark hover:bg-dark-3 hover:text-text-primary rounded-full"
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
        <div className="bg-dark-2 border border-border-dark rounded-2xl overflow-hidden">
          {loading ? (
            <div className="flex justify-center py-16">
              <Loader2 size={24} className="text-accent animate-spin" />
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border-dark">
                    <th className="text-left px-6 py-4 text-[0.65rem] font-mono font-semibold text-text-muted uppercase tracking-wider">
                      Reference
                    </th>
                    <th className="text-left px-6 py-4 text-[0.65rem] font-mono font-semibold text-text-muted uppercase tracking-wider">
                      Sujet
                    </th>
                    <th className="text-left px-6 py-4 text-[0.65rem] font-mono font-semibold text-text-muted uppercase tracking-wider">
                      Categorie
                    </th>
                    <th className="text-left px-6 py-4 text-[0.65rem] font-mono font-semibold text-text-muted uppercase tracking-wider">
                      Priorite
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
                  {tickets.length > 0 ? (
                    tickets.map((ticket) => (
                      <tr
                        key={ticket.id}
                        className="hover:bg-dark-3 transition-colors"
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
                          <span className="text-sm text-text-muted">
                            {ticket.category}
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
                            {formatDateTime(ticket.created_at)}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => openDetail(ticket)}
                              className="p-1.5 rounded-lg hover:bg-dark-3 text-text-muted hover:text-text-primary transition-all"
                              title="Voir"
                            >
                              <Eye size={16} />
                            </button>
                            <button
                              onClick={() => openEdit(ticket)}
                              className="p-1.5 rounded-lg hover:bg-dark-3 text-text-muted hover:text-accent transition-all"
                              title="Modifier"
                            >
                              <Pencil size={16} />
                            </button>
                            <button
                              onClick={() => {
                                setSelectedTicket(ticket);
                                setShowDelete(true);
                              }}
                              className="p-1.5 rounded-lg hover:bg-dark-3 text-text-muted hover:text-red-400 transition-all"
                              title="Supprimer"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={7} className="px-6 py-16 text-center">
                        <div className="flex flex-col items-center gap-3">
                          <div className="w-12 h-12 rounded-2xl bg-dark border border-border-dark flex items-center justify-center">
                            <Ticket size={24} className="text-text-muted" />
                          </div>
                          <div>
                            <p className="text-text-muted font-medium">
                              Aucun ticket
                            </p>
                            <p className="text-text-muted text-sm mt-1">
                              Les tickets de support apparaitront ici
                            </p>
                          </div>
                          <button
                            onClick={openCreate}
                            className="mt-2 inline-flex items-center gap-2 px-4 py-2 bg-accent-dim text-accent border border-accent/20 rounded-full hover:bg-accent/20 transition-all text-sm font-medium"
                          >
                            <Plus size={16} />
                            Creer un ticket
                          </button>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </AnimatedSection>

      {/* Create/Edit Modal */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={editing ? "Modifier le ticket" : "Nouveau ticket"}
        size="lg"
        footer={
          <>
            <button
              onClick={() => setShowModal(false)}
              className="px-4 py-2 text-sm text-text-secondary hover:text-text-primary border border-border-dark rounded-full hover:bg-dark-3 transition-all"
            >
              Annuler
            </button>
            <button
              onClick={handleSave}
              disabled={saving || !form.subject}
              className="px-4 py-2 text-sm font-semibold text-dark bg-accent rounded-full hover:bg-accent-hover transition-all disabled:opacity-50"
            >
              {saving ? (
                <span className="flex items-center gap-2">
                  <Loader2 size={14} className="animate-spin" />
                  Enregistrement...
                </span>
              ) : editing ? (
                "Modifier"
              ) : (
                "Creer"
              )}
            </button>
          </>
        }
      >
        <div className="space-y-4">
          <FormField
            label="Sujet"
            name="subject"
            value={form.subject}
            onChange={(v) => setForm({ ...form, subject: v })}
            required
            placeholder="Sujet du ticket"
          />
          <FormField
            label="Description"
            name="description"
            type="textarea"
            value={form.description}
            onChange={(v) => setForm({ ...form, description: v })}
            rows={4}
            placeholder="Description detaillee du probleme..."
          />
          <FormField
            label="Categorie"
            name="category"
            value={form.category}
            onChange={(v) => setForm({ ...form, category: v })}
            placeholder="Ex: general, technique, facturation"
          />
          <div className="grid grid-cols-2 gap-4">
            <FormField
              label="Priorite"
              name="priority"
              type="select"
              value={form.priority}
              onChange={(v) => setForm({ ...form, priority: v })}
              options={[
                { value: "low", label: "Basse" },
                { value: "medium", label: "Moyenne" },
                { value: "high", label: "Haute" },
                { value: "urgent", label: "Urgent" },
              ]}
            />
            <FormField
              label="Statut"
              name="status"
              type="select"
              value={form.status}
              onChange={(v) => setForm({ ...form, status: v })}
              options={[
                { value: "open", label: "Ouvert" },
                { value: "in_progress", label: "En cours" },
                { value: "waiting_client", label: "Att. client" },
                { value: "waiting_internal", label: "Att. interne" },
                { value: "resolved", label: "Resolu" },
                { value: "closed", label: "Ferme" },
              ]}
            />
          </div>
        </div>
      </Modal>

      {/* Detail Modal */}
      <Modal
        isOpen={showDetail}
        onClose={() => setShowDetail(false)}
        title={`Ticket ${selectedTicket?.reference || ""}`}
        size="lg"
        footer={
          <button
            onClick={() => setShowDetail(false)}
            className="px-4 py-2 text-sm text-text-secondary hover:text-text-primary border border-border-dark rounded-full hover:bg-dark-3 transition-all"
          >
            Fermer
          </button>
        }
      >
        {selectedTicket && (
          <div className="space-y-5">
            <div className="flex items-start justify-between pb-4 border-b border-border-dark">
              <div>
                <h3 className="text-base font-semibold text-text-primary">{selectedTicket.subject}</h3>
                <p className="text-sm text-text-muted mt-1">
                  Categorie: {selectedTicket.category}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <PriorityBadge priority={selectedTicket.priority} />
                <StatusBadge status={selectedTicket.status} />
              </div>
            </div>

            <div>
              <p className="text-xs text-text-muted mb-2">Changer le statut</p>
              <div className="flex flex-wrap gap-2">
                {["open", "in_progress", "waiting_client", "waiting_internal", "resolved", "closed"].map((s) => (
                  <button
                    key={s}
                    onClick={() => handleStatusChange(selectedTicket, s)}
                    disabled={selectedTicket.status === s}
                    className={`px-3 py-1.5 text-xs font-medium rounded-full border transition-all ${
                      selectedTicket.status === s
                        ? "bg-accent/10 text-accent border-accent/20"
                        : "text-text-secondary border-border-dark hover:bg-dark-3 hover:text-text-primary"
                    }`}
                  >
                    {s.replace(/_/g, " ")}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-4 text-xs text-text-muted pt-2">
              <span>Cree le {formatDateTime(selectedTicket.created_at)}</span>
              {selectedTicket.updated_at && (
                <span>Mis a jour le {formatDateTime(selectedTicket.updated_at)}</span>
              )}
              {selectedTicket.resolved_at && (
                <span>Resolu le {formatDateTime(selectedTicket.resolved_at)}</span>
              )}
            </div>
          </div>
        )}
      </Modal>

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={showDelete}
        onClose={() => setShowDelete(false)}
        onConfirm={handleDelete}
        message={`Etes-vous sur de vouloir supprimer le ticket "${selectedTicket?.reference}" ? Cette action est irreversible.`}
        loading={deleting}
      />
    </PageTransition>
  );
}
