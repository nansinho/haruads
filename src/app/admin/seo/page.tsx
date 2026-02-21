"use client";

import { useState, useCallback } from "react";
import {
  Plus,
  Search as SearchIcon,
  Download,
  RefreshCw,
  Pencil,
  Trash2,
  Loader2,
} from "lucide-react";
import PageHeader from "@/components/admin/PageHeader";
import PageTransition, { AnimatedSection } from "@/components/admin/PageTransition";
import Modal from "@/components/admin/Modal";
import ConfirmDialog from "@/components/admin/ConfirmDialog";
import FormField from "@/components/admin/FormField";
import TagInput from "@/components/admin/TagInput";
import { useToast } from "@/components/admin/Toast";
import { useAdminData } from "@/hooks/useAdminData";
import { formatDateTime } from "@/lib/utils";
import type { SeoPage } from "@/types/database";

const filterTabs = [
  { key: "all", label: "Toutes" },
  { key: "indexed", label: "Indexées" },
  { key: "noindex", label: "No Index" },
];

const emptyForm = {
  page_path: "",
  title: "",
  description: "",
  keywords: [] as string[],
  og_image: "",
  canonical_url: "",
  no_index: false,
};

export default function SeoAdminPage() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [editingPage, setEditingPage] = useState<SeoPage | null>(null);
  const [selectedPage, setSelectedPage] = useState<SeoPage | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const { toast } = useToast();

  const { data: pages, loading, refetch } = useAdminData<SeoPage>("/api/admin/seo", {
    status: activeFilter,
    search: debouncedSearch,
  });

  const handleSearch = useCallback((value: string) => {
    setSearchQuery(value);
    const timeout = setTimeout(() => setDebouncedSearch(value), 300);
    return () => clearTimeout(timeout);
  }, []);

  const openCreate = () => {
    setEditingPage(null);
    setForm(emptyForm);
    setShowModal(true);
  };

  const openEdit = (page: SeoPage) => {
    setEditingPage(page);
    setForm({
      page_path: page.page_path,
      title: page.title || "",
      description: page.description || "",
      keywords: page.keywords || [],
      og_image: page.og_image || "",
      canonical_url: page.canonical_url || "",
      no_index: page.no_index,
    });
    setShowModal(true);
  };

  const handleSave = async () => {
    if (!form.page_path) {
      toast({ type: "error", message: "Le chemin de page est requis" });
      return;
    }
    setSaving(true);
    try {
      const url = editingPage ? `/api/admin/seo/${editingPage.id}` : "/api/admin/seo";
      const method = editingPage ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || "Erreur");
      }
      toast({ type: "success", message: editingPage ? "Page SEO mise à jour" : "Page SEO créée" });
      setShowModal(false);
      setForm(emptyForm);
      setEditingPage(null);
      refetch();
    } catch (err) {
      toast({ type: "error", message: err instanceof Error ? err.message : "Erreur" });
    } finally {
      setSaving(false);
    }
  };

  const toggleNoIndex = async (page: SeoPage) => {
    try {
      const res = await fetch(`/api/admin/seo/${page.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ no_index: !page.no_index }),
      });
      if (!res.ok) throw new Error("Erreur");
      toast({ type: "success", message: page.no_index ? "Page indexée" : "Page mise en no-index" });
      refetch();
    } catch {
      toast({ type: "error", message: "Erreur lors de la mise à jour" });
    }
  };

  const handleDelete = async () => {
    if (!selectedPage) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/admin/seo/${selectedPage.id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Erreur");
      toast({ type: "success", message: "Page SEO supprimée" });
      setShowDelete(false);
      setSelectedPage(null);
      refetch();
    } catch {
      toast({ type: "error", message: "Erreur lors de la suppression" });
    } finally {
      setDeleting(false);
    }
  };

  const exportCSV = () => {
    const headers = ["Page Path", "Titre", "Description", "Keywords", "No Index", "Date création"];
    const rows = pages.map((p) => [
      p.page_path,
      p.title || "",
      p.description || "",
      (p.keywords || []).join("; "),
      p.no_index ? "Oui" : "Non",
      p.created_at,
    ]);
    const csv = [headers, ...rows].map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `seo-pages-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <PageTransition className="space-y-6">
      <PageHeader
        icon={<SearchIcon size={24} />}
        title="SEO & Métadonnées"
        subtitle="Gérez les métadonnées SEO de chaque page."
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
              Ajouter une page
            </button>
          </>
        }
      />

      {/* Filters & Search */}
      <AnimatedSection>
        <div className="bg-dark-2 border border-border-dark rounded-2xl p-4 space-y-4">
          <div className="relative">
            <SearchIcon size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
            <input
              type="text"
              placeholder="Rechercher par chemin de page, titre..."
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
                    <th className="text-left px-6 py-4 text-[0.65rem] font-mono font-semibold text-text-muted uppercase tracking-wider">Page Path</th>
                    <th className="text-left px-6 py-4 text-[0.65rem] font-mono font-semibold text-text-muted uppercase tracking-wider">Titre SEO</th>
                    <th className="text-left px-6 py-4 text-[0.65rem] font-mono font-semibold text-text-muted uppercase tracking-wider">Description</th>
                    <th className="text-left px-6 py-4 text-[0.65rem] font-mono font-semibold text-text-muted uppercase tracking-wider">Keywords</th>
                    <th className="text-left px-6 py-4 text-[0.65rem] font-mono font-semibold text-text-muted uppercase tracking-wider">No Index</th>
                    <th className="text-right px-6 py-4 text-[0.65rem] font-mono font-semibold text-text-muted uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.06]">
                  {pages.length > 0 ? (
                    pages.map((page) => (
                      <tr key={page.id} className="hover:bg-dark-3 transition-colors">
                        <td className="px-6 py-4">
                          <span className="text-sm font-medium text-text-primary font-mono">{page.page_path}</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm text-text-secondary">{page.title || "-"}</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm text-text-muted max-w-xs truncate block">
                            {page.description ? (page.description.length > 60 ? `${page.description.substring(0, 60)}...` : page.description) : "-"}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="inline-flex px-2.5 py-1 bg-dark border border-border-dark rounded-lg text-xs text-text-secondary">
                            {page.keywords?.length || 0} mot{(page.keywords?.length || 0) !== 1 ? "s" : ""}-clé{(page.keywords?.length || 0) !== 1 ? "s" : ""}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <button onClick={() => toggleNoIndex(page)}>
                            {page.no_index ? (
                              <span className="inline-flex px-2.5 py-1 bg-orange-500/15 text-orange-400 border border-orange-500/20 rounded-lg text-xs font-medium cursor-pointer hover:bg-orange-500/25 transition-all">
                                No Index
                              </span>
                            ) : (
                              <span className="inline-flex px-2.5 py-1 bg-emerald-500/15 text-emerald-400 border border-emerald-500/20 rounded-lg text-xs font-medium cursor-pointer hover:bg-emerald-500/25 transition-all">
                                Indexée
                              </span>
                            )}
                          </button>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button onClick={() => openEdit(page)} className="p-1.5 rounded-lg hover:bg-dark-3 text-text-muted hover:text-text-primary transition-all">
                              <Pencil size={16} />
                            </button>
                            <button onClick={() => { setSelectedPage(page); setShowDelete(true); }} className="p-1.5 rounded-lg hover:bg-dark-3 text-text-muted hover:text-red-400 transition-all">
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="px-6 py-16 text-center">
                        <div className="flex flex-col items-center gap-3">
                          <div className="w-12 h-12 rounded-2xl bg-dark border border-border-dark flex items-center justify-center">
                            <SearchIcon size={24} className="text-text-muted" />
                          </div>
                          <div>
                            <p className="text-text-muted font-medium">Aucune page SEO trouvée</p>
                            <p className="text-text-muted text-sm mt-1">Configurez les métadonnées de votre première page</p>
                          </div>
                          <button onClick={openCreate} className="mt-2 inline-flex items-center gap-2 px-4 py-2 bg-accent-dim text-accent border border-accent/20 rounded-full hover:bg-accent/20 transition-all text-sm font-medium">
                            <Plus size={16} />
                            Configurer votre première page
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

      {/* Create / Edit Modal */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={editingPage ? "Modifier la page SEO" : "Nouvelle page SEO"}
        description={editingPage ? undefined : "Configurer les métadonnées SEO d'une page"}
        size="lg"
        footer={
          <>
            <button onClick={() => setShowModal(false)} className="px-4 py-2 text-sm text-text-secondary hover:text-text-primary border border-border-dark rounded-full hover:bg-dark-3 transition-all">
              Annuler
            </button>
            <button onClick={handleSave} disabled={saving} className="px-4 py-2 text-sm font-semibold text-dark bg-accent rounded-full hover:bg-accent-hover transition-all disabled:opacity-50">
              {saving ? "Enregistrement..." : editingPage ? "Mettre à jour" : "Créer la page"}
            </button>
          </>
        }
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2">
            <FormField label="Chemin de page" name="page_path" value={form.page_path} onChange={(v) => setForm({ ...form, page_path: v })} required placeholder="/chemin/de/la/page" />
          </div>
          <div className="sm:col-span-2">
            <FormField label="Titre SEO" name="title" value={form.title} onChange={(v) => setForm({ ...form, title: v })} placeholder="Titre pour les moteurs de recherche" />
          </div>
          <div className="sm:col-span-2">
            <FormField label="Description" name="description" type="textarea" value={form.description} onChange={(v) => setForm({ ...form, description: v })} placeholder="Meta description de la page..." rows={3} />
          </div>
          <div className="sm:col-span-2">
            <TagInput label="Mots-clés" tags={form.keywords} onChange={(keywords) => setForm({ ...form, keywords })} placeholder="Ajouter un mot-clé..." />
          </div>
          <FormField label="Image OG" name="og_image" type="url" value={form.og_image} onChange={(v) => setForm({ ...form, og_image: v })} placeholder="https://example.com/image.jpg" />
          <FormField label="URL Canonique" name="canonical_url" type="url" value={form.canonical_url} onChange={(v) => setForm({ ...form, canonical_url: v })} placeholder="https://example.com/page" />

          {/* Toggle: No Index */}
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-text-secondary">No Index</label>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={form.no_index}
                onChange={(e) => setForm({ ...form, no_index: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-dark border border-white/[0.08] rounded-full peer peer-checked:bg-orange-500/20 peer-checked:border-orange-500/30 after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-gray-400 after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full peer-checked:after:bg-orange-400" />
              <span className="ml-3 text-sm text-text-secondary">{form.no_index ? "Oui (non indexée)" : "Non (indexée)"}</span>
            </label>
          </div>
        </div>
      </Modal>

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={showDelete}
        onClose={() => setShowDelete(false)}
        onConfirm={handleDelete}
        message={`Êtes-vous sûr de vouloir supprimer la page SEO "${selectedPage?.page_path}" ? Cette action est irréversible.`}
        loading={deleting}
      />
    </PageTransition>
  );
}
