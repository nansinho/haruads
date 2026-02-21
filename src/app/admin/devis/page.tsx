"use client";

import { useState, useCallback } from "react";
import {
  Plus,
  Search,
  Download,
  Eye,
  MessageSquare,
  FileText,
  RefreshCw,
  Trash2,
  Loader2,
} from "lucide-react";
import PageHeader from "@/components/admin/PageHeader";
import PageTransition, { AnimatedSection } from "@/components/admin/PageTransition";
import Modal from "@/components/admin/Modal";
import ConfirmDialog from "@/components/admin/ConfirmDialog";
import FormField from "@/components/admin/FormField";
import { useToast } from "@/components/admin/Toast";
import { useAdminData } from "@/hooks/useAdminData";
import { formatDate, formatPrice } from "@/lib/utils";
import type { QuoteRequest } from "@/types/database";

const filterTabs = [
  { key: "all", label: "Tous" },
  { key: "new", label: "Nouveau" },
  { key: "in_progress", label: "En cours" },
  { key: "quoted", label: "Devisé" },
  { key: "accepted", label: "Accepté" },
  { key: "rejected", label: "Rejeté" },
];

const statusOptions = [
  { value: "new", label: "Nouveau" },
  { value: "read", label: "Lu" },
  { value: "in_progress", label: "En cours" },
  { value: "quoted", label: "Devisé" },
  { value: "accepted", label: "Accepté" },
  { value: "rejected", label: "Rejeté" },
  { value: "expired", label: "Expiré" },
];

function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, string> = {
    new: "bg-blue-500/15 text-blue-400 border-blue-500/20",
    read: "bg-gray-500/15 text-gray-400 border-gray-500/20",
    in_progress: "bg-violet-500/15 text-violet-400 border-violet-500/20",
    quoted: "bg-orange-500/15 text-orange-400 border-orange-500/20",
    accepted: "bg-emerald-500/15 text-emerald-400 border-emerald-500/20",
    rejected: "bg-red-500/15 text-red-400 border-red-500/20",
    expired: "bg-gray-500/15 text-gray-400 border-gray-500/20",
  };
  const labels: Record<string, string> = {
    new: "Nouveau",
    read: "Lu",
    in_progress: "En cours",
    quoted: "Devisé",
    accepted: "Accepté",
    rejected: "Rejeté",
    expired: "Expiré",
  };
  const color = colors[status] || "bg-gray-500/15 text-gray-400 border-gray-500/20";
  return (
    <span className={`inline-flex px-2.5 py-1 rounded-lg text-xs font-medium border ${color}`}>
      {labels[status] || status}
    </span>
  );
}

const emptyForm = { name: "", email: "", phone: "", company: "", budget_range: "", description: "" };

export default function DevisPage() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [showCreate, setShowCreate] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [selectedQuote, setSelectedQuote] = useState<QuoteRequest | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const { toast } = useToast();

  const { data: quotes, loading, refetch } = useAdminData<QuoteRequest>("/api/admin/quotes", {
    status: activeFilter,
    search: debouncedSearch,
  });

  const handleSearch = useCallback((value: string) => {
    setSearchQuery(value);
    const timeout = setTimeout(() => setDebouncedSearch(value), 300);
    return () => clearTimeout(timeout);
  }, []);

  const handleCreate = async () => {
    if (!form.name || !form.email || !form.description) {
      toast({ type: "error", message: "Nom, email et description requis" });
      return;
    }
    setSaving(true);
    try {
      const res = await fetch("/api/admin/quotes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || "Erreur");
      }
      toast({ type: "success", message: "Devis créé" });
      setShowCreate(false);
      setForm(emptyForm);
      refetch();
    } catch (err) {
      toast({ type: "error", message: err instanceof Error ? err.message : "Erreur" });
    } finally {
      setSaving(false);
    }
  };

  const updateStatus = async (quote: QuoteRequest, newStatus: string) => {
    try {
      const res = await fetch(`/api/admin/quotes/${quote.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!res.ok) throw new Error("Erreur");
      toast({ type: "success", message: "Statut mis à jour" });
      refetch();
      if (selectedQuote?.id === quote.id) {
        setSelectedQuote({ ...quote, status: newStatus as QuoteRequest["status"] });
      }
    } catch {
      toast({ type: "error", message: "Erreur lors de la mise à jour" });
    }
  };

  const handleDelete = async () => {
    if (!selectedQuote) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/admin/quotes/${selectedQuote.id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Erreur");
      toast({ type: "success", message: "Devis supprimé" });
      setShowDelete(false);
      setSelectedQuote(null);
      refetch();
    } catch {
      toast({ type: "error", message: "Erreur lors de la suppression" });
    } finally {
      setDeleting(false);
    }
  };

  const exportCSV = () => {
    const headers = ["Référence", "Client", "Email", "Budget", "Statut", "Date"];
    const rows = quotes.map((q) => [q.reference, q.name, q.email, q.budget_range || "", q.status, q.created_at]);
    const csv = [headers, ...rows].map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `devis-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <PageTransition className="space-y-6">
      <PageHeader
        icon={<MessageSquare size={24} />}
        title="Demandes de Devis"
        subtitle="Gérez les demandes de devis clients"
        actions={
          <>
            <button onClick={exportCSV} className="flex items-center gap-2 px-4 py-2.5 bg-dark-2 border border-border-dark rounded-full text-text-secondary hover:bg-dark-3 hover:text-text-primary transition-all text-sm">
              <Download size={16} />
              Exporter
            </button>
            <button onClick={refetch} className="flex items-center gap-2 px-4 py-2.5 bg-dark-2 border border-border-dark rounded-full text-text-secondary hover:bg-dark-3 hover:text-text-primary transition-all text-sm">
              <RefreshCw size={16} />
              Actualiser
            </button>
            <button onClick={() => { setForm(emptyForm); setShowCreate(true); }} className="flex items-center gap-2 px-4 py-2.5 bg-accent text-dark font-semibold rounded-full hover:bg-accent-hover shadow-lg shadow-accent/20 transition-all text-sm">
              <Plus size={16} />
              Nouveau devis
            </button>
          </>
        }
      />

      {/* Filters & Search */}
      <AnimatedSection>
        <div className="bg-dark-2 border border-border-dark rounded-2xl p-4 space-y-4">
          <div className="relative">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
            <input
              type="text"
              placeholder="Rechercher par référence, client, email..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-dark border border-border-dark rounded-full text-sm text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all"
            />
          </div>
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
                    <th className="text-left px-6 py-4 text-[0.65rem] font-mono font-semibold text-text-muted uppercase tracking-wider">Référence</th>
                    <th className="text-left px-6 py-4 text-[0.65rem] font-mono font-semibold text-text-muted uppercase tracking-wider">Client</th>
                    <th className="text-left px-6 py-4 text-[0.65rem] font-mono font-semibold text-text-muted uppercase tracking-wider">Email</th>
                    <th className="text-left px-6 py-4 text-[0.65rem] font-mono font-semibold text-text-muted uppercase tracking-wider">Budget</th>
                    <th className="text-left px-6 py-4 text-[0.65rem] font-mono font-semibold text-text-muted uppercase tracking-wider">Montant</th>
                    <th className="text-left px-6 py-4 text-[0.65rem] font-mono font-semibold text-text-muted uppercase tracking-wider">Statut</th>
                    <th className="text-left px-6 py-4 text-[0.65rem] font-mono font-semibold text-text-muted uppercase tracking-wider">Date</th>
                    <th className="text-right px-6 py-4 text-[0.65rem] font-mono font-semibold text-text-muted uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.06]">
                  {quotes.length > 0 ? (
                    quotes.map((quote) => (
                      <tr key={quote.id} className="hover:bg-dark-3 transition-colors">
                        <td className="px-6 py-4">
                          <span className="text-sm font-medium text-accent font-mono">{quote.reference}</span>
                        </td>
                        <td className="px-6 py-4">
                          <div>
                            <span className="text-sm text-text-primary">{quote.name}</span>
                            {quote.company && <p className="text-xs text-text-muted">{quote.company}</p>}
                          </div>
                        </td>
                        <td className="px-6 py-4"><span className="text-sm text-text-secondary">{quote.email}</span></td>
                        <td className="px-6 py-4"><span className="text-sm text-text-secondary">{quote.budget_range || "-"}</span></td>
                        <td className="px-6 py-4"><span className="text-sm text-text-primary font-medium">{formatPrice(quote.quoted_amount)}</span></td>
                        <td className="px-6 py-4"><StatusBadge status={quote.status} /></td>
                        <td className="px-6 py-4"><span className="text-sm text-text-muted">{formatDate(quote.created_at)}</span></td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button onClick={() => { setSelectedQuote(quote); setShowDetail(true); }} className="p-1.5 rounded-lg hover:bg-dark-3 text-text-muted hover:text-text-primary transition-all">
                              <Eye size={16} />
                            </button>
                            <button onClick={() => { setSelectedQuote(quote); setShowDelete(true); }} className="p-1.5 rounded-lg hover:bg-dark-3 text-text-muted hover:text-red-400 transition-all">
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={8} className="px-6 py-16 text-center">
                        <div className="flex flex-col items-center gap-3">
                          <div className="w-12 h-12 rounded-2xl bg-dark border border-border-dark flex items-center justify-center">
                            <FileText size={24} className="text-text-muted" />
                          </div>
                          <div>
                            <p className="text-text-muted font-medium">Aucune demande de devis</p>
                            <p className="text-text-muted text-sm mt-1">Les nouvelles demandes de devis apparaîtront ici</p>
                          </div>
                          <button onClick={() => { setForm(emptyForm); setShowCreate(true); }} className="mt-2 inline-flex items-center gap-2 px-4 py-2 bg-accent-dim text-accent border border-accent/20 rounded-full hover:bg-accent/20 transition-all text-sm font-medium">
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
          )}
        </div>
      </AnimatedSection>

      {/* Create Modal */}
      <Modal
        isOpen={showCreate}
        onClose={() => setShowCreate(false)}
        title="Nouveau devis"
        description="La référence sera générée automatiquement"
        size="lg"
        footer={
          <>
            <button onClick={() => setShowCreate(false)} className="px-4 py-2 text-sm text-text-secondary hover:text-text-primary border border-border-dark rounded-full hover:bg-dark-3 transition-all">
              Annuler
            </button>
            <button onClick={handleCreate} disabled={saving} className="px-4 py-2 text-sm font-semibold text-dark bg-accent rounded-full hover:bg-accent-hover transition-all disabled:opacity-50">
              {saving ? "Création..." : "Créer le devis"}
            </button>
          </>
        }
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField label="Nom" name="name" value={form.name} onChange={(v) => setForm({ ...form, name: v })} required placeholder="Jean Dupont" />
          <FormField label="Email" name="email" type="email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} required placeholder="jean@example.com" />
          <FormField label="Téléphone" name="phone" value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} placeholder="+33 6 12 34 56 78" />
          <FormField label="Entreprise" name="company" value={form.company} onChange={(v) => setForm({ ...form, company: v })} placeholder="Nom de l'entreprise" />
          <FormField label="Budget estimé" name="budget_range" value={form.budget_range} onChange={(v) => setForm({ ...form, budget_range: v })} placeholder="1 000 - 5 000 €" />
          <div />
          <div className="sm:col-span-2">
            <FormField label="Description du besoin" name="description" type="textarea" value={form.description} onChange={(v) => setForm({ ...form, description: v })} required placeholder="Décrivez le projet et les besoins..." rows={5} />
          </div>
        </div>
      </Modal>

      {/* Detail Modal */}
      <Modal
        isOpen={showDetail}
        onClose={() => setShowDetail(false)}
        title={`Devis ${selectedQuote?.reference || ""}`}
        size="lg"
        footer={
          <button onClick={() => setShowDetail(false)} className="px-4 py-2 text-sm text-text-secondary hover:text-text-primary border border-border-dark rounded-full hover:bg-dark-3 transition-all">
            Fermer
          </button>
        }
      >
        {selectedQuote && (
          <div className="space-y-5">
            <div className="flex items-start justify-between pb-4 border-b border-border-dark">
              <div>
                <p className="text-xs text-text-muted mb-1">Référence</p>
                <p className="text-lg font-mono font-bold text-accent">{selectedQuote.reference}</p>
              </div>
              <StatusBadge status={selectedQuote.status} />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-text-muted mb-1">Client</p>
                <p className="text-sm text-text-primary font-medium">{selectedQuote.name}</p>
              </div>
              <div>
                <p className="text-xs text-text-muted mb-1">Email</p>
                <p className="text-sm text-text-primary">{selectedQuote.email}</p>
              </div>
              <div>
                <p className="text-xs text-text-muted mb-1">Téléphone</p>
                <p className="text-sm text-text-primary">{selectedQuote.phone || "-"}</p>
              </div>
              <div>
                <p className="text-xs text-text-muted mb-1">Entreprise</p>
                <p className="text-sm text-text-primary">{selectedQuote.company || "-"}</p>
              </div>
              <div>
                <p className="text-xs text-text-muted mb-1">Budget estimé</p>
                <p className="text-sm text-text-primary">{selectedQuote.budget_range || "-"}</p>
              </div>
              <div>
                <p className="text-xs text-text-muted mb-1">Montant devisé</p>
                <p className="text-sm text-text-primary font-medium">{formatPrice(selectedQuote.quoted_amount)}</p>
              </div>
            </div>

            <div>
              <p className="text-xs text-text-muted mb-1">Description</p>
              <div className="p-4 bg-dark rounded-xl border border-border-dark">
                <p className="text-sm text-text-secondary whitespace-pre-wrap leading-relaxed">{selectedQuote.description}</p>
              </div>
            </div>

            {selectedQuote.notes && (
              <div>
                <p className="text-xs text-text-muted mb-1">Notes internes</p>
                <div className="p-3 bg-yellow-500/5 rounded-xl border border-yellow-500/10">
                  <p className="text-sm text-text-secondary">{selectedQuote.notes}</p>
                </div>
              </div>
            )}

            <div className="pt-4 border-t border-border-dark">
              <p className="text-xs text-text-muted mb-3">Changer le statut</p>
              <div className="flex flex-wrap gap-2">
                {statusOptions.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => updateStatus(selectedQuote, opt.value)}
                    disabled={selectedQuote.status === opt.value}
                    className={`px-3 py-1.5 text-xs font-medium rounded-full border transition-all ${
                      selectedQuote.status === opt.value
                        ? "bg-accent/10 text-accent border-accent/20 cursor-default"
                        : "text-text-muted border-border-dark hover:bg-dark-3 hover:text-text-primary"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-4 text-xs text-text-muted pt-2">
              <span>Créé le {formatDate(selectedQuote.created_at)}</span>
              <span>Mis à jour le {formatDate(selectedQuote.updated_at)}</span>
            </div>
          </div>
        )}
      </Modal>

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={showDelete}
        onClose={() => setShowDelete(false)}
        onConfirm={handleDelete}
        message={`Êtes-vous sûr de vouloir supprimer le devis "${selectedQuote?.reference}" ? Cette action est irréversible.`}
        loading={deleting}
      />
    </PageTransition>
  );
}
