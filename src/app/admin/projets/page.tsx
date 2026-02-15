"use client";

import { useState, useCallback } from "react";
import {
  Plus,
  Search,
  FolderKanban,
  RefreshCw,
  Pencil,
  Trash2,
  Loader2,
  CheckCircle,
  X,
} from "lucide-react";
import PageHeader from "@/components/admin/PageHeader";
import PageTransition, { AnimatedSection } from "@/components/admin/PageTransition";
import Modal from "@/components/admin/Modal";
import ConfirmDialog from "@/components/admin/ConfirmDialog";
import FormField from "@/components/admin/FormField";
import TagInput from "@/components/admin/TagInput";
import { useToast } from "@/components/admin/Toast";
import { useAdminData } from "@/hooks/useAdminData";
import { slugify } from "@/lib/utils";
import type { Project } from "@/types/database";

const filterTabs = [
  { key: "all", label: "Tous" },
  { key: "featured", label: "Featured" },
  { key: "hero", label: "Hero" },
];

const emptyForm = {
  title: "",
  slug: "",
  description: "",
  image_url: "",
  tags: [] as string[],
  client: "",
  year: new Date().getFullYear(),
  featured: false,
  hero_visible: false,
  sort_order: 0,
};

export default function ProjetsAdminPage() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const { toast } = useToast();

  const { data: projects, loading, refetch } = useAdminData<Project>("/api/admin/projects", {
    status: activeFilter,
    search: debouncedSearch,
  });

  const handleSearch = useCallback((value: string) => {
    setSearchQuery(value);
    const timeout = setTimeout(() => setDebouncedSearch(value), 300);
    return () => clearTimeout(timeout);
  }, []);

  const openCreate = () => {
    setEditingProject(null);
    setForm(emptyForm);
    setShowModal(true);
  };

  const openEdit = (project: Project) => {
    setEditingProject(project);
    setForm({
      title: project.title,
      slug: project.slug,
      description: project.description,
      image_url: project.image_url,
      tags: project.tags || [],
      client: project.client || "",
      year: project.year || new Date().getFullYear(),
      featured: project.featured,
      hero_visible: project.hero_visible,
      sort_order: project.sort_order,
    });
    setShowModal(true);
  };

  const handleTitleChange = (value: string) => {
    setForm((prev) => ({
      ...prev,
      title: value,
      ...(!editingProject ? { slug: slugify(value) } : {}),
    }));
  };

  const handleSave = async () => {
    if (!form.title || !form.description || !form.image_url) {
      toast({ type: "error", message: "Titre, description et image requis" });
      return;
    }
    setSaving(true);
    try {
      const url = editingProject ? `/api/admin/projects/${editingProject.id}` : "/api/admin/projects";
      const method = editingProject ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || "Erreur");
      }
      toast({ type: "success", message: editingProject ? "Projet mis à jour" : "Projet créé" });
      setShowModal(false);
      setForm(emptyForm);
      setEditingProject(null);
      refetch();
    } catch (err) {
      toast({ type: "error", message: err instanceof Error ? err.message : "Erreur" });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedProject) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/admin/projects/${selectedProject.id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Erreur");
      toast({ type: "success", message: "Projet supprimé" });
      setShowDelete(false);
      setSelectedProject(null);
      refetch();
    } catch {
      toast({ type: "error", message: "Erreur lors de la suppression" });
    } finally {
      setDeleting(false);
    }
  };

  const toggleField = async (project: Project, field: "featured" | "hero_visible") => {
    try {
      const res = await fetch(`/api/admin/projects/${project.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ [field]: !project[field] }),
      });
      if (!res.ok) throw new Error("Erreur");
      toast({ type: "success", message: "Projet mis à jour" });
      refetch();
    } catch {
      toast({ type: "error", message: "Erreur lors de la mise à jour" });
    }
  };

  return (
    <PageTransition className="space-y-6">
      <PageHeader
        icon={<FolderKanban size={24} />}
        title="Projets"
        subtitle="Gérez votre portfolio de projets et réalisations clients."
        actions={
          <>
            <button onClick={refetch} className="flex items-center gap-2 px-4 py-2.5 bg-dark-2 border border-white/[0.06] rounded-full text-text-secondary hover:bg-white/[0.04] hover:text-text-primary transition-all text-sm">
              <RefreshCw size={16} />
              Actualiser
            </button>
            <button onClick={openCreate} className="flex items-center gap-2 px-4 py-2.5 bg-accent text-dark font-semibold rounded-full hover:bg-accent-hover shadow-lg shadow-accent/20 transition-all text-sm">
              <Plus size={16} />
              Nouveau projet
            </button>
          </>
        }
      />

      {/* Filters & Search */}
      <AnimatedSection>
        <div className="bg-dark-2 border border-white/[0.06] rounded-2xl p-4 space-y-4">
          <div className="relative">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
            <input
              type="text"
              placeholder="Rechercher un projet..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-dark border border-white/[0.06] rounded-full text-sm text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all"
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
          {loading ? (
            <div className="flex justify-center py-16">
              <Loader2 size={24} className="text-accent animate-spin" />
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/[0.06]">
                    <th className="text-left px-6 py-4 text-[0.65rem] font-mono font-semibold text-text-muted uppercase tracking-wider">Titre</th>
                    <th className="text-left px-6 py-4 text-[0.65rem] font-mono font-semibold text-text-muted uppercase tracking-wider">Client</th>
                    <th className="text-left px-6 py-4 text-[0.65rem] font-mono font-semibold text-text-muted uppercase tracking-wider">Tags</th>
                    <th className="text-left px-6 py-4 text-[0.65rem] font-mono font-semibold text-text-muted uppercase tracking-wider">Featured</th>
                    <th className="text-left px-6 py-4 text-[0.65rem] font-mono font-semibold text-text-muted uppercase tracking-wider">Hero</th>
                    <th className="text-right px-6 py-4 text-[0.65rem] font-mono font-semibold text-text-muted uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.06]">
                  {projects.length > 0 ? (
                    projects.map((project) => (
                      <tr key={project.id} className="hover:bg-white/[0.02] transition-colors">
                        <td className="px-6 py-4">
                          <div>
                            <span className="text-sm font-medium text-text-primary">{project.title}</span>
                            <p className="text-xs text-text-muted font-mono mt-0.5">/{project.slug}</p>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm text-text-secondary">{project.client || "-"}</span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-wrap gap-1">
                            {project.tags && project.tags.length > 0 ? (
                              project.tags.map((tag, i) => (
                                <span
                                  key={i}
                                  className="inline-flex px-2 py-0.5 bg-accent/10 text-accent text-xs font-medium rounded-md border border-accent/20"
                                >
                                  {tag}
                                </span>
                              ))
                            ) : (
                              <span className="text-sm text-text-muted">-</span>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <button onClick={() => toggleField(project, "featured")} className="p-1 rounded-lg hover:bg-white/[0.04] transition-all">
                            {project.featured ? (
                              <CheckCircle size={18} className="text-emerald-400" />
                            ) : (
                              <X size={18} className="text-gray-500" />
                            )}
                          </button>
                        </td>
                        <td className="px-6 py-4">
                          <button onClick={() => toggleField(project, "hero_visible")} className="p-1 rounded-lg hover:bg-white/[0.04] transition-all">
                            {project.hero_visible ? (
                              <CheckCircle size={18} className="text-emerald-400" />
                            ) : (
                              <X size={18} className="text-gray-500" />
                            )}
                          </button>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button onClick={() => openEdit(project)} className="p-1.5 rounded-lg hover:bg-white/[0.04] text-text-muted hover:text-text-primary transition-all">
                              <Pencil size={16} />
                            </button>
                            <button onClick={() => { setSelectedProject(project); setShowDelete(true); }} className="p-1.5 rounded-lg hover:bg-white/[0.04] text-text-muted hover:text-red-400 transition-all">
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
                          <div className="w-12 h-12 rounded-2xl bg-dark border border-white/[0.06] flex items-center justify-center">
                            <FolderKanban size={24} className="text-text-muted" />
                          </div>
                          <div>
                            <p className="text-text-muted font-medium">Aucun projet trouvé</p>
                            <p className="text-text-muted text-sm mt-1">Ajoutez votre premier projet au portfolio</p>
                          </div>
                          <button onClick={openCreate} className="mt-2 inline-flex items-center gap-2 px-4 py-2 bg-accent-dim text-accent border border-accent/20 rounded-full hover:bg-accent/20 transition-all text-sm font-medium">
                            <Plus size={16} />
                            Ajouter votre premier projet
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
        title={editingProject ? "Modifier le projet" : "Nouveau projet"}
        description={editingProject ? undefined : "Ajouter un nouveau projet au portfolio"}
        size="lg"
        footer={
          <>
            <button onClick={() => setShowModal(false)} className="px-4 py-2 text-sm text-text-secondary hover:text-text-primary border border-white/[0.06] rounded-full hover:bg-white/[0.04] transition-all">
              Annuler
            </button>
            <button onClick={handleSave} disabled={saving} className="px-4 py-2 text-sm font-semibold text-dark bg-accent rounded-full hover:bg-accent-hover transition-all disabled:opacity-50">
              {saving ? "Enregistrement..." : editingProject ? "Mettre à jour" : "Créer le projet"}
            </button>
          </>
        }
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField label="Titre" name="title" value={form.title} onChange={handleTitleChange} required placeholder="Nom du projet" />
          <div>
            <FormField label="Slug" name="slug" value={form.slug} onChange={(v) => setForm({ ...form, slug: v })} placeholder="nom-du-projet" />
            <p className="text-xs text-text-muted mt-1">Auto-généré depuis le titre</p>
          </div>
          <div className="sm:col-span-2">
            <FormField label="Description" name="description" type="textarea" value={form.description} onChange={(v) => setForm({ ...form, description: v })} required placeholder="Description du projet..." rows={4} />
          </div>
          <FormField label="URL de l'image" name="image_url" type="url" value={form.image_url} onChange={(v) => setForm({ ...form, image_url: v })} required placeholder="https://..." />
          <FormField label="Client" name="client" value={form.client} onChange={(v) => setForm({ ...form, client: v })} placeholder="Nom du client" />
          <div className="sm:col-span-2">
            <TagInput label="Tags" tags={form.tags} onChange={(tags) => setForm({ ...form, tags })} placeholder="Ajouter un tag..." />
          </div>
          <FormField label="Année" name="year" type="number" value={form.year} onChange={(v) => setForm({ ...form, year: parseInt(v) || 0 })} placeholder="2025" />
          <FormField label="Ordre de tri" name="sort_order" type="number" value={form.sort_order} onChange={(v) => setForm({ ...form, sort_order: parseInt(v) || 0 })} placeholder="0" />

          {/* Toggle: Featured */}
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-text-secondary">Featured</label>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={form.featured}
                onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-dark border border-white/[0.08] rounded-full peer peer-checked:bg-accent/20 peer-checked:border-accent/30 after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-gray-400 after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full peer-checked:after:bg-accent" />
              <span className="ml-3 text-sm text-text-secondary">{form.featured ? "Oui" : "Non"}</span>
            </label>
          </div>

          {/* Toggle: Hero visible */}
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-text-secondary">Hero visible</label>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={form.hero_visible}
                onChange={(e) => setForm({ ...form, hero_visible: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-dark border border-white/[0.08] rounded-full peer peer-checked:bg-accent/20 peer-checked:border-accent/30 after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-gray-400 after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full peer-checked:after:bg-accent" />
              <span className="ml-3 text-sm text-text-secondary">{form.hero_visible ? "Oui" : "Non"}</span>
            </label>
          </div>
        </div>
      </Modal>

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={showDelete}
        onClose={() => setShowDelete(false)}
        onConfirm={handleDelete}
        message={`Êtes-vous sûr de vouloir supprimer le projet "${selectedProject?.title}" ? Cette action est irréversible.`}
        loading={deleting}
      />
    </PageTransition>
  );
}
