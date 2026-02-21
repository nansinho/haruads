"use client";

import { useState, useCallback } from "react";
import {
  Plus,
  Search,
  Download,
  Eye,
  Users,
  RefreshCw,
  Pencil,
  Trash2,
  Loader2,
  X,
} from "lucide-react";
import PageHeader from "@/components/admin/PageHeader";
import PageTransition, { AnimatedSection } from "@/components/admin/PageTransition";
import Modal from "@/components/admin/Modal";
import ConfirmDialog from "@/components/admin/ConfirmDialog";
import FormField from "@/components/admin/FormField";
import { useToast } from "@/components/admin/Toast";
import { useAdminData } from "@/hooks/useAdminData";
import { formatDate } from "@/lib/utils";
import type { User } from "@/types/database";

const filters = [
  { key: "all", label: "Tous" },
  { key: "admin", label: "Admin" },
  { key: "client", label: "Client" },
  { key: "editor", label: "Éditeur" },
];

function StatusBadge({ isActive }: { isActive: boolean }) {
  return isActive ? (
    <span className="inline-flex px-2.5 py-1 rounded-lg text-xs font-medium border bg-emerald-500/15 text-emerald-400 border-emerald-500/20">
      Actif
    </span>
  ) : (
    <span className="inline-flex px-2.5 py-1 rounded-lg text-xs font-medium border bg-gray-500/15 text-gray-400 border-gray-500/20">
      Inactif
    </span>
  );
}

function RoleBadge({ role }: { role: string }) {
  const colors: Record<string, string> = {
    admin: "bg-accent/15 text-accent border-accent/20",
    client: "bg-blue-500/15 text-blue-400 border-blue-500/20",
    editor: "bg-emerald-500/15 text-emerald-400 border-emerald-500/20",
  };
  const labels: Record<string, string> = {
    admin: "Admin",
    client: "Client",
    editor: "Éditeur",
  };
  const color = colors[role] || "bg-gray-500/15 text-gray-400 border-gray-500/20";
  return (
    <span className={`inline-flex px-2.5 py-1 rounded-lg text-xs font-medium border ${color}`}>
      {labels[role] || role}
    </span>
  );
}

const emptyForm = { name: "", email: "", password: "", role: "client", company: "", phone: "" };

export default function UtilisateursPage() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const { toast } = useToast();

  const { data: users, loading, refetch } = useAdminData<User>("/api/admin/users", {
    role: activeFilter,
    search: debouncedSearch,
  });

  // Debounce search
  const handleSearch = useCallback((value: string) => {
    setSearchQuery(value);
    const timeout = setTimeout(() => setDebouncedSearch(value), 300);
    return () => clearTimeout(timeout);
  }, []);

  const openCreate = () => {
    setEditingUser(null);
    setForm(emptyForm);
    setShowModal(true);
  };

  const openEdit = (user: User) => {
    setEditingUser(user);
    setForm({
      name: user.name || "",
      email: user.email,
      password: "",
      role: user.role,
      company: user.company || "",
      phone: user.phone || "",
    });
    setShowModal(true);
  };

  const handleSave = async () => {
    if (!form.name || !form.email) {
      toast({ type: "error", message: "Nom et email requis" });
      return;
    }
    setSaving(true);
    try {
      const url = editingUser ? `/api/admin/users/${editingUser.id}` : "/api/admin/users";
      const method = editingUser ? "PUT" : "POST";
      const body: Record<string, string> = { name: form.name, email: form.email, role: form.role };
      if (form.company) body.company = form.company;
      if (form.phone) body.phone = form.phone;
      if (form.password) body.password = form.password;

      const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || "Erreur");
      }

      toast({ type: "success", message: editingUser ? "Utilisateur modifié" : "Utilisateur créé" });
      setShowModal(false);
      refetch();
    } catch (err) {
      toast({ type: "error", message: err instanceof Error ? err.message : "Erreur" });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedUser) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/admin/users/${selectedUser.id}`, { method: "DELETE" });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || "Erreur");
      }
      toast({ type: "success", message: "Utilisateur supprimé" });
      setShowDelete(false);
      setSelectedUser(null);
      refetch();
    } catch (err) {
      toast({ type: "error", message: err instanceof Error ? err.message : "Erreur" });
    } finally {
      setDeleting(false);
    }
  };

  const toggleActive = async (user: User) => {
    try {
      const res = await fetch(`/api/admin/users/${user.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ is_active: !user.is_active }),
      });
      if (!res.ok) throw new Error("Erreur");
      toast({ type: "success", message: user.is_active ? "Utilisateur désactivé" : "Utilisateur activé" });
      refetch();
    } catch {
      toast({ type: "error", message: "Erreur lors de la mise à jour" });
    }
  };

  const exportCSV = () => {
    const headers = ["Nom", "Email", "Rôle", "Entreprise", "Statut", "Dernière connexion"];
    const rows = users.map((u) => [u.name || "", u.email, u.role, u.company || "", u.is_active ? "Actif" : "Inactif", u.last_login || "Jamais"]);
    const csv = [headers, ...rows].map((r) => r.map((c) => `"${c}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `utilisateurs-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <PageTransition className="space-y-6">
      <PageHeader
        icon={<Users size={24} />}
        title="Utilisateurs"
        subtitle="Gérez les utilisateurs et leurs rôles"
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
            <button onClick={openCreate} className="flex items-center gap-2 px-4 py-2.5 bg-accent text-dark font-semibold rounded-full hover:bg-accent-hover shadow-lg shadow-accent/20 transition-all text-sm">
              <Plus size={16} />
              Nouvel utilisateur
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
              placeholder="Rechercher par nom, email, entreprise..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-dark border border-border-dark rounded-full text-sm text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {filters.map((filter) => (
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
                    <th className="text-left px-6 py-4 text-[0.65rem] font-mono font-semibold text-text-muted uppercase tracking-wider">Rôle</th>
                    <th className="text-left px-6 py-4 text-[0.65rem] font-mono font-semibold text-text-muted uppercase tracking-wider">Entreprise</th>
                    <th className="text-left px-6 py-4 text-[0.65rem] font-mono font-semibold text-text-muted uppercase tracking-wider">Dernière connexion</th>
                    <th className="text-left px-6 py-4 text-[0.65rem] font-mono font-semibold text-text-muted uppercase tracking-wider">Statut</th>
                    <th className="text-right px-6 py-4 text-[0.65rem] font-mono font-semibold text-text-muted uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.06]">
                  {users.length > 0 ? (
                    users.map((user) => (
                      <tr key={user.id} className="hover:bg-dark-3 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center text-xs font-bold text-accent">
                              {(user.name || user.email).charAt(0).toUpperCase()}
                            </div>
                            <span className="text-sm font-medium text-text-primary">{user.name || "-"}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4"><span className="text-sm text-text-secondary">{user.email}</span></td>
                        <td className="px-6 py-4"><RoleBadge role={user.role} /></td>
                        <td className="px-6 py-4"><span className="text-sm text-text-secondary">{user.company || "-"}</span></td>
                        <td className="px-6 py-4"><span className="text-sm text-text-muted">{formatDate(user.last_login) || "Jamais"}</span></td>
                        <td className="px-6 py-4">
                          <button onClick={() => toggleActive(user)}>
                            <StatusBadge isActive={user.is_active} />
                          </button>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button onClick={() => { setSelectedUser(user); setShowDetail(true); }} className="p-1.5 rounded-lg hover:bg-dark-3 text-text-muted hover:text-text-primary transition-all">
                              <Eye size={16} />
                            </button>
                            <button onClick={() => openEdit(user)} className="p-1.5 rounded-lg hover:bg-dark-3 text-text-muted hover:text-text-primary transition-all">
                              <Pencil size={16} />
                            </button>
                            <button onClick={() => { setSelectedUser(user); setShowDelete(true); }} className="p-1.5 rounded-lg hover:bg-dark-3 text-text-muted hover:text-red-400 transition-all">
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
                            <Users size={24} className="text-text-muted" />
                          </div>
                          <div>
                            <p className="text-text-muted font-medium">Aucun utilisateur</p>
                            <p className="text-text-muted text-sm mt-1">Les utilisateurs enregistrés apparaîtront ici</p>
                          </div>
                          <button onClick={openCreate} className="mt-2 inline-flex items-center gap-2 px-4 py-2 bg-accent-dim text-accent border border-accent/20 rounded-full hover:bg-accent/20 transition-all text-sm font-medium">
                            <Plus size={16} />
                            Ajouter un utilisateur
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
        title={editingUser ? "Modifier l'utilisateur" : "Nouvel utilisateur"}
        size="md"
        footer={
          <>
            <button onClick={() => setShowModal(false)} className="px-4 py-2 text-sm text-text-secondary hover:text-text-primary border border-border-dark rounded-full hover:bg-dark-3 transition-all">
              Annuler
            </button>
            <button onClick={handleSave} disabled={saving} className="px-4 py-2 text-sm font-semibold text-dark bg-accent rounded-full hover:bg-accent-hover transition-all disabled:opacity-50">
              {saving ? "Enregistrement..." : editingUser ? "Modifier" : "Créer"}
            </button>
          </>
        }
      >
        <div className="space-y-4">
          <FormField label="Nom" name="name" value={form.name} onChange={(v) => setForm({ ...form, name: v })} required placeholder="Jean Dupont" />
          <FormField label="Email" name="email" type="email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} required placeholder="jean@example.com" />
          <FormField label={editingUser ? "Nouveau mot de passe (laisser vide pour ne pas changer)" : "Mot de passe"} name="password" type="password" value={form.password} onChange={(v) => setForm({ ...form, password: v })} required={!editingUser} placeholder="••••••••" />
          <FormField label="Rôle" name="role" type="select" value={form.role} onChange={(v) => setForm({ ...form, role: v })} options={[{ value: "client", label: "Client" }, { value: "admin", label: "Admin" }, { value: "editor", label: "Éditeur" }]} />
          <FormField label="Entreprise" name="company" value={form.company} onChange={(v) => setForm({ ...form, company: v })} placeholder="Nom de l'entreprise" />
          <FormField label="Téléphone" name="phone" value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} placeholder="+33 6 12 34 56 78" />
        </div>
      </Modal>

      {/* Detail Modal */}
      <Modal
        isOpen={showDetail}
        onClose={() => setShowDetail(false)}
        title="Détails de l'utilisateur"
        size="md"
        footer={
          <button onClick={() => setShowDetail(false)} className="px-4 py-2 text-sm text-text-secondary hover:text-text-primary border border-border-dark rounded-full hover:bg-dark-3 transition-all">
            Fermer
          </button>
        }
      >
        {selectedUser && (
          <div className="space-y-4">
            <div className="flex items-center gap-4 pb-4 border-b border-border-dark">
              <div className="w-14 h-14 rounded-2xl bg-accent/20 flex items-center justify-center text-xl font-bold text-accent">
                {(selectedUser.name || selectedUser.email).charAt(0).toUpperCase()}
              </div>
              <div>
                <h3 className="text-base font-semibold text-text-primary">{selectedUser.name || "-"}</h3>
                <p className="text-sm text-text-muted">{selectedUser.email}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-text-muted mb-1">Rôle</p>
                <RoleBadge role={selectedUser.role} />
              </div>
              <div>
                <p className="text-xs text-text-muted mb-1">Statut</p>
                <StatusBadge isActive={selectedUser.is_active} />
              </div>
              <div>
                <p className="text-xs text-text-muted mb-1">Entreprise</p>
                <p className="text-sm text-text-primary">{selectedUser.company || "-"}</p>
              </div>
              <div>
                <p className="text-xs text-text-muted mb-1">Téléphone</p>
                <p className="text-sm text-text-primary">{selectedUser.phone || "-"}</p>
              </div>
              <div>
                <p className="text-xs text-text-muted mb-1">Dernière connexion</p>
                <p className="text-sm text-text-primary">{formatDate(selectedUser.last_login) || "Jamais"}</p>
              </div>
              <div>
                <p className="text-xs text-text-muted mb-1">Inscrit le</p>
                <p className="text-sm text-text-primary">{formatDate(selectedUser.created_at)}</p>
              </div>
            </div>
          </div>
        )}
      </Modal>

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={showDelete}
        onClose={() => setShowDelete(false)}
        onConfirm={handleDelete}
        message={`Êtes-vous sûr de vouloir supprimer l'utilisateur "${selectedUser?.name || selectedUser?.email}" ? Cette action est irréversible.`}
        loading={deleting}
      />
    </PageTransition>
  );
}
