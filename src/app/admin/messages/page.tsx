"use client";

import { useState, useCallback } from "react";
import {
  Search,
  Download,
  Eye,
  Mail,
  Archive,
  RefreshCw,
  Trash2,
  Loader2,
} from "lucide-react";
import PageHeader from "@/components/admin/PageHeader";
import PageTransition, { AnimatedSection } from "@/components/admin/PageTransition";
import Modal from "@/components/admin/Modal";
import ConfirmDialog from "@/components/admin/ConfirmDialog";
import { useToast } from "@/components/admin/Toast";
import { useAdminData } from "@/hooks/useAdminData";
import { formatDateTime } from "@/lib/utils";
import type { ContactMessage } from "@/types/database";

const filterTabs = [
  { key: "all", label: "Tous" },
  { key: "unread", label: "Non lu" },
  { key: "read", label: "Lu" },
  { key: "replied", label: "Répondu" },
  { key: "archived", label: "Archivé" },
];

function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, string> = {
    unread: "bg-orange-500/15 text-orange-400 border-orange-500/20",
    read: "bg-gray-500/15 text-gray-400 border-gray-500/20",
    replied: "bg-emerald-500/15 text-emerald-400 border-emerald-500/20",
    archived: "bg-gray-500/15 text-gray-400 border-gray-500/20",
  };
  const labels: Record<string, string> = {
    unread: "Non lu",
    read: "Lu",
    replied: "Répondu",
    archived: "Archivé",
  };
  const color = colors[status] || "bg-gray-500/15 text-gray-400 border-gray-500/20";
  return (
    <span className={`inline-flex px-2.5 py-1 rounded-lg text-xs font-medium border ${color}`}>
      {labels[status] || status}
    </span>
  );
}

export default function MessagesPage() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [showDetail, setShowDetail] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
  const [deleting, setDeleting] = useState(false);
  const { toast } = useToast();

  const { data: messages, loading, refetch } = useAdminData<ContactMessage>("/api/admin/messages", {
    status: activeFilter,
    search: debouncedSearch,
  });

  const handleSearch = useCallback((value: string) => {
    setSearchQuery(value);
    const timeout = setTimeout(() => setDebouncedSearch(value), 300);
    return () => clearTimeout(timeout);
  }, []);

  const openDetail = async (msg: ContactMessage) => {
    setSelectedMessage(msg);
    setShowDetail(true);

    // Mark as read if unread
    if (msg.status === "unread") {
      try {
        await fetch(`/api/admin/messages/${msg.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: "read" }),
        });
        refetch();
      } catch { /* silent */ }
    }
  };

  const archiveMessage = async (msg: ContactMessage) => {
    try {
      const res = await fetch(`/api/admin/messages/${msg.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "archived" }),
      });
      if (!res.ok) throw new Error("Erreur");
      toast({ type: "success", message: "Message archivé" });
      refetch();
    } catch {
      toast({ type: "error", message: "Erreur lors de l'archivage" });
    }
  };

  const handleDelete = async () => {
    if (!selectedMessage) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/admin/messages/${selectedMessage.id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Erreur");
      toast({ type: "success", message: "Message supprimé" });
      setShowDelete(false);
      setSelectedMessage(null);
      refetch();
    } catch {
      toast({ type: "error", message: "Erreur lors de la suppression" });
    } finally {
      setDeleting(false);
    }
  };

  const exportCSV = () => {
    const headers = ["Nom", "Email", "Sujet", "Message", "Statut", "Date"];
    const rows = messages.map((m) => [m.name, m.email, m.subject || "", m.message, m.status, m.created_at]);
    const csv = [headers, ...rows].map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `messages-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <PageTransition className="space-y-6">
      <PageHeader
        icon={<Mail size={24} />}
        title="Messages Contact"
        subtitle="Messages reçus via le formulaire de contact"
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
              placeholder="Rechercher par nom, email, sujet, message..."
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
                    <th className="text-left px-6 py-4 text-[0.65rem] font-mono font-semibold text-text-muted uppercase tracking-wider">Nom</th>
                    <th className="text-left px-6 py-4 text-[0.65rem] font-mono font-semibold text-text-muted uppercase tracking-wider">Email</th>
                    <th className="text-left px-6 py-4 text-[0.65rem] font-mono font-semibold text-text-muted uppercase tracking-wider">Sujet</th>
                    <th className="text-left px-6 py-4 text-[0.65rem] font-mono font-semibold text-text-muted uppercase tracking-wider">Message</th>
                    <th className="text-left px-6 py-4 text-[0.65rem] font-mono font-semibold text-text-muted uppercase tracking-wider">Statut</th>
                    <th className="text-left px-6 py-4 text-[0.65rem] font-mono font-semibold text-text-muted uppercase tracking-wider">Date</th>
                    <th className="text-right px-6 py-4 text-[0.65rem] font-mono font-semibold text-text-muted uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.06]">
                  {messages.length > 0 ? (
                    messages.map((msg) => (
                      <tr
                        key={msg.id}
                        className={`hover:bg-dark-3 transition-colors ${msg.status === "unread" ? "bg-accent/[0.02]" : ""}`}
                      >
                        <td className="px-6 py-4">
                          <span className={`text-sm ${msg.status === "unread" ? "font-semibold text-text-primary" : "text-text-secondary"}`}>
                            {msg.name}
                          </span>
                        </td>
                        <td className="px-6 py-4"><span className="text-sm text-text-secondary">{msg.email}</span></td>
                        <td className="px-6 py-4"><span className="text-sm text-text-secondary">{msg.subject || "-"}</span></td>
                        <td className="px-6 py-4">
                          <span className="text-sm text-text-muted max-w-xs truncate block">
                            {msg.message.length > 80 ? `${msg.message.substring(0, 80)}...` : msg.message}
                          </span>
                        </td>
                        <td className="px-6 py-4"><StatusBadge status={msg.status} /></td>
                        <td className="px-6 py-4"><span className="text-sm text-text-muted">{formatDateTime(msg.created_at)}</span></td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button onClick={() => openDetail(msg)} className="p-1.5 rounded-lg hover:bg-dark-3 text-text-muted hover:text-text-primary transition-all">
                              <Eye size={16} />
                            </button>
                            <button onClick={() => archiveMessage(msg)} className="p-1.5 rounded-lg hover:bg-dark-3 text-text-muted hover:text-text-primary transition-all" title="Archiver">
                              <Archive size={16} />
                            </button>
                            <button onClick={() => { setSelectedMessage(msg); setShowDelete(true); }} className="p-1.5 rounded-lg hover:bg-dark-3 text-text-muted hover:text-red-400 transition-all">
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
                            <Mail size={24} className="text-text-muted" />
                          </div>
                          <div>
                            <p className="text-text-muted font-medium">Aucun message</p>
                            <p className="text-text-muted text-sm mt-1">Les messages de contact apparaîtront ici</p>
                          </div>
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

      {/* Detail Modal */}
      <Modal
        isOpen={showDetail}
        onClose={() => setShowDetail(false)}
        title="Détail du message"
        size="lg"
        footer={
          <button onClick={() => setShowDetail(false)} className="px-4 py-2 text-sm text-text-secondary hover:text-text-primary border border-border-dark rounded-full hover:bg-dark-3 transition-all">
            Fermer
          </button>
        }
      >
        {selectedMessage && (
          <div className="space-y-5">
            <div className="flex items-start justify-between pb-4 border-b border-border-dark">
              <div>
                <h3 className="text-base font-semibold text-text-primary">{selectedMessage.name}</h3>
                <p className="text-sm text-text-muted">{selectedMessage.email}</p>
                {selectedMessage.phone && <p className="text-sm text-text-muted">{selectedMessage.phone}</p>}
              </div>
              <StatusBadge status={selectedMessage.status} />
            </div>
            {selectedMessage.subject && (
              <div>
                <p className="text-xs text-text-muted mb-1">Sujet</p>
                <p className="text-sm text-text-primary font-medium">{selectedMessage.subject}</p>
              </div>
            )}
            <div>
              <p className="text-xs text-text-muted mb-1">Message</p>
              <div className="p-4 bg-dark rounded-xl border border-border-dark">
                <p className="text-sm text-text-secondary whitespace-pre-wrap leading-relaxed">{selectedMessage.message}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 text-xs text-text-muted pt-2">
              <span>Source : {selectedMessage.source}</span>
              <span>Reçu le {formatDateTime(selectedMessage.created_at)}</span>
              {selectedMessage.replied_at && <span>Répondu le {formatDateTime(selectedMessage.replied_at)}</span>}
            </div>
          </div>
        )}
      </Modal>

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={showDelete}
        onClose={() => setShowDelete(false)}
        onConfirm={handleDelete}
        message={`Êtes-vous sûr de vouloir supprimer le message de "${selectedMessage?.name}" ? Cette action est irréversible.`}
        loading={deleting}
      />
    </PageTransition>
  );
}
