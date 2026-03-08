"use client";

import { useState, useCallback, useEffect } from "react";
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
  Eye,
  GalleryHorizontalEnd,
  BarChart3,
  Settings2,
  FileText,
  Globe,
  Sparkles,
  GripVertical,
} from "lucide-react";
import PageHeader from "@/components/admin/PageHeader";
import PageTransition, { AnimatedSection } from "@/components/admin/PageTransition";
import Modal from "@/components/admin/Modal";
import ConfirmDialog from "@/components/admin/ConfirmDialog";
import FormField from "@/components/admin/FormField";
import ImageUpload from "@/components/admin/ImageUpload";
import TagInput from "@/components/admin/TagInput";
import { useToast } from "@/components/admin/Toast";
import { useAdminData } from "@/hooks/useAdminData";
import { slugify } from "@/lib/utils";
import type { Project, Tag } from "@/types/database";

const filterTabs = [
  { key: "all", label: "Tous" },
  { key: "featured", label: "Featured" },
  { key: "hero", label: "Hero" },
];

const formTabs = [
  { key: "general", label: "Général", icon: FileText },
  { key: "detail", label: "Défi & Solution", icon: Eye },
  { key: "results", label: "Résultats", icon: BarChart3 },
  { key: "gallery", label: "Galerie", icon: GalleryHorizontalEnd },
  { key: "seo", label: "SEO & Options", icon: Settings2 },
];

const FRENCH_MONTHS = [
  { value: "01", label: "Janvier" },
  { value: "02", label: "Février" },
  { value: "03", label: "Mars" },
  { value: "04", label: "Avril" },
  { value: "05", label: "Mai" },
  { value: "06", label: "Juin" },
  { value: "07", label: "Juillet" },
  { value: "08", label: "Août" },
  { value: "09", label: "Septembre" },
  { value: "10", label: "Octobre" },
  { value: "11", label: "Novembre" },
  { value: "12", label: "Décembre" },
];

const emptyResult = { label: "", value: "" };

const emptyForm = {
  title: "",
  slug: "",
  description: "",
  image_url: "",
  tags: [] as string[],
  client: "",
  completed_at: `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, "0")}`,
  category: "",
  challenge: "",
  solution: "",
  results: [{ ...emptyResult }] as { label: string; value: string }[],
  gallery: [] as string[],
  status: "published" as "draft" | "published",
  featured: false,
  hero_visible: false,
  sort_order: 0,
  seo_title: "",
  seo_description: "",
  external_url: "",
};

export default function ProjetsAdminPage() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showUrlPrompt, setShowUrlPrompt] = useState(false);
  const [promptUrl, setPromptUrl] = useState("");
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [activeFormTab, setActiveFormTab] = useState("general");
  const [savedTags, setSavedTags] = useState<Tag[]>([]);
  const [analyzing, setAnalyzing] = useState(false);
  const [draggedId, setDraggedId] = useState<string | null>(null);
  const [dragOverId, setDragOverId] = useState<string | null>(null);
  const [reordering, setReordering] = useState(false);
  const { toast } = useToast();

  const { data: projects, loading, refetch } = useAdminData<Project>("/api/admin/projects", {
    status: activeFilter,
    search: debouncedSearch,
  });

  // Fetch saved tags
  useEffect(() => {
    fetch("/api/admin/tags")
      .then((r) => r.json())
      .then((d) => setSavedTags(d.data || []))
      .catch(() => {});
  }, []);

  const handleSearch = useCallback((value: string) => {
    setSearchQuery(value);
    const timeout = setTimeout(() => setDebouncedSearch(value), 300);
    return () => clearTimeout(timeout);
  }, []);

  const openCreate = () => {
    setEditingProject(null);
    setForm(emptyForm);
    setActiveFormTab("general");
    setPromptUrl("");
    setShowUrlPrompt(true);
  };

  const openCreateManual = () => {
    setShowUrlPrompt(false);
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
      completed_at: project.completed_at || `${new Date().getFullYear()}-01`,
      category: project.category || "",
      challenge: project.challenge || "",
      solution: project.solution || "",
      results: project.results?.length ? project.results : [{ ...emptyResult }],
      gallery: project.gallery || [],
      status: project.status || "published",
      featured: project.featured,
      hero_visible: project.hero_visible,
      sort_order: project.sort_order,
      seo_title: project.seo_title || "",
      seo_description: project.seo_description || "",
      external_url: project.external_url || "",
    });
    setActiveFormTab("general");
    setShowModal(true);
  };

  const handleTitleChange = (value: string) => {
    setForm((prev) => ({
      ...prev,
      title: value,
      ...(!editingProject ? { slug: slugify(value) } : {}),
    }));
  };

  // Save tags to DB when adding to form
  const handleTagsChange = async (tags: string[]) => {
    setForm((prev) => ({ ...prev, tags }));
    // Save new tags to the tags table
    const newTags = tags.filter((t) => !savedTags.some((st) => st.name === t));
    for (const tagName of newTags) {
      try {
        const res = await fetch("/api/admin/tags", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: tagName }),
        });
        if (res.ok) {
          const data = await res.json();
          setSavedTags((prev) => [...prev, data]);
        }
      } catch {
        // Silently fail - tag just won't be saved for reuse
      }
    }
  };

  const handleSave = async () => {
    if (!form.title || !form.description) {
      toast({ type: "error", message: "Titre et description requis" });
      return;
    }
    if (!editingProject && !form.image_url) {
      toast({ type: "error", message: "Titre, description et image requis" });
      return;
    }
    setSaving(true);
    try {
      // Clean up results: remove empty entries
      const cleanResults = form.results.filter((r) => r.label.trim() && r.value.trim());
      const payload = {
        ...form,
        results: cleanResults,
        // Clean empty strings to null
        category: form.category || null,
        challenge: form.challenge || null,
        solution: form.solution || null,
        client: form.client || null,
        seo_title: form.seo_title || null,
        seo_description: form.seo_description || null,
        external_url: form.external_url || null,
      };

      const url = editingProject ? `/api/admin/projects/${editingProject.id}` : "/api/admin/projects";
      const method = editingProject ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
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
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || `Erreur ${res.status}`);
      }
      toast({ type: "success", message: "Projet supprimé" });
      setShowDelete(false);
      setSelectedProject(null);
      refetch();
    } catch (err) {
      toast({ type: "error", message: err instanceof Error ? err.message : "Erreur lors de la suppression" });
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

  // Results management
  const addResult = () => {
    setForm((prev) => ({ ...prev, results: [...prev.results, { ...emptyResult }] }));
  };
  const removeResult = (index: number) => {
    setForm((prev) => ({ ...prev, results: prev.results.filter((_, i) => i !== index) }));
  };
  const updateResult = (index: number, field: "label" | "value", val: string) => {
    setForm((prev) => ({
      ...prev,
      results: prev.results.map((r, i) => (i === index ? { ...r, [field]: val } : r)),
    }));
  };

  // Gallery management
  const addGalleryImage = (url: string) => {
    if (url && !form.gallery.includes(url)) {
      setForm((prev) => ({ ...prev, gallery: [...prev.gallery, url] }));
    }
  };
  const removeGalleryImage = (index: number) => {
    setForm((prev) => ({ ...prev, gallery: prev.gallery.filter((_, i) => i !== index) }));
  };

  // Drag-and-drop reordering
  const handleDragStart = (e: React.DragEvent, projectId: string) => {
    setDraggedId(projectId);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: React.DragEvent, projectId: string) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    if (projectId !== draggedId) {
      setDragOverId(projectId);
    }
  };

  const handleDragEnd = () => {
    setDraggedId(null);
    setDragOverId(null);
  };

  const handleDrop = async (e: React.DragEvent, targetId: string) => {
    e.preventDefault();
    if (!draggedId || draggedId === targetId) {
      handleDragEnd();
      return;
    }

    const oldIndex = projects.findIndex((p) => p.id === draggedId);
    const newIndex = projects.findIndex((p) => p.id === targetId);
    if (oldIndex === -1 || newIndex === -1) {
      handleDragEnd();
      return;
    }

    const reordered = [...projects];
    const [moved] = reordered.splice(oldIndex, 1);
    reordered.splice(newIndex, 0, moved);

    const items = reordered.map((p, i) => ({ id: p.id, sort_order: i }));

    handleDragEnd();
    setReordering(true);

    try {
      const res = await fetch("/api/admin/projects/reorder", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items }),
      });
      if (!res.ok) throw new Error("Erreur");
      toast({ type: "success", message: "Ordre mis à jour" });
      refetch();
    } catch {
      toast({ type: "error", message: "Erreur lors du réordonnancement" });
      refetch();
    } finally {
      setReordering(false);
    }
  };

  // AI auto-fill from URL
  const handleAIAnalyze = async () => {
    if (!promptUrl) {
      toast({ type: "error", message: "Collez l'URL du site à analyser" });
      return;
    }
    setAnalyzing(true);
    try {
      const res = await fetch("/api/admin/ia/analyze-project", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ external_url: promptUrl }),
      });

      if (res.status === 503) {
        toast({ type: "error", message: "Clé API Anthropic non configurée. Ajoutez-la dans Paramètres > Clés API." });
        return;
      }

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || "Erreur lors de l'analyse");
      }

      const data = await res.json();
      setForm({
        ...emptyForm,
        title: data.title || "",
        slug: slugify(data.title || ""),
        description: data.description || "",
        challenge: data.challenge || "",
        solution: data.solution || "",
        results: data.results?.length ? data.results : [{ ...emptyResult }],
        tags: data.tags || [],
        category: data.category || "",
        client: data.client || "",
        completed_at: data.completed_at || `${new Date().getFullYear()}-01`,
        seo_title: data.seo_title || "",
        seo_description: data.seo_description || "",
        external_url: promptUrl,
      });
      setShowUrlPrompt(false);
      setShowModal(true);
      toast({ type: "success", message: "Fiche projet remplie par l'IA ! Ajoutez une image et validez." });
    } catch (err) {
      toast({ type: "error", message: err instanceof Error ? err.message : "Erreur lors de l'analyse IA" });
    } finally {
      setAnalyzing(false);
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
            <button onClick={refetch} className="flex items-center gap-2 px-4 py-2.5 bg-dark-2 border border-white/[0.10] rounded-full text-text-secondary hover:bg-white/[0.04] hover:text-text-primary transition-all text-sm">
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
        <div className="bg-dark-2 border border-white/[0.10] rounded-2xl p-4 space-y-4">
          <div className="relative">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
            <input
              type="text"
              placeholder="Rechercher un projet..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-dark border border-white/[0.10] rounded-full text-sm text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all"
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
                    : "bg-dark-2 text-text-secondary border border-white/[0.10] hover:bg-white/[0.04] hover:text-text-primary rounded-full"
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
        <div className="bg-dark-2 border border-white/[0.10] rounded-2xl overflow-hidden">
          {loading ? (
            <div className="flex justify-center py-16">
              <Loader2 size={24} className="text-accent animate-spin" />
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/[0.10]">
                    <th className="w-10 px-3 py-4"></th>
                    <th className="text-left px-6 py-4 text-xs font-mono font-semibold text-text-muted uppercase tracking-wider">Titre {reordering && <Loader2 size={14} className="text-accent animate-spin inline ml-1" />}</th>
                    <th className="text-left px-6 py-4 text-xs font-mono font-semibold text-text-muted uppercase tracking-wider">Client</th>
                    <th className="text-left px-6 py-4 text-xs font-mono font-semibold text-text-muted uppercase tracking-wider">Statut</th>
                    <th className="text-left px-6 py-4 text-xs font-mono font-semibold text-text-muted uppercase tracking-wider">Tags</th>
                    <th className="text-left px-6 py-4 text-xs font-mono font-semibold text-text-muted uppercase tracking-wider">Featured</th>
                    <th className="text-left px-6 py-4 text-xs font-mono font-semibold text-text-muted uppercase tracking-wider">Hero</th>
                    <th className="text-right px-6 py-4 text-xs font-mono font-semibold text-text-muted uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.06]">
                  {projects.length > 0 ? (
                    projects.map((project) => (
                      <tr
                        key={project.id}
                        draggable
                        onDragStart={(e) => handleDragStart(e, project.id)}
                        onDragOver={(e) => handleDragOver(e, project.id)}
                        onDragEnd={handleDragEnd}
                        onDrop={(e) => handleDrop(e, project.id)}
                        className={`hover:bg-white/[0.02] transition-colors ${
                          draggedId === project.id ? "opacity-40" : ""
                        } ${dragOverId === project.id ? "border-t-2 border-accent" : ""}`}
                      >
                        <td className="px-3 py-4">
                          <div className="cursor-grab active:cursor-grabbing text-text-muted hover:text-text-secondary">
                            <GripVertical size={16} />
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            {project.image_url && (
                              <img src={project.image_url} alt="" className="w-10 h-10 rounded-lg object-cover border border-white/[0.10]" />
                            )}
                            <div>
                              <span className="text-sm font-medium text-text-primary">{project.title}</span>
                              <p className="text-xs text-text-muted font-mono mt-0.5">/{project.slug}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm text-text-secondary">{project.client || "-"}</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex px-2 py-0.5 text-xs font-medium rounded-md border ${
                            project.status === "published"
                              ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                              : "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"
                          }`}>
                            {project.status === "published" ? "Publié" : "Brouillon"}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-wrap gap-1">
                            {project.tags && project.tags.length > 0 ? (
                              project.tags.slice(0, 3).map((tag, i) => (
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
                            {project.tags && project.tags.length > 3 && (
                              <span className="text-xs text-text-muted">+{project.tags.length - 3}</span>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <button onClick={() => toggleField(project, "featured")} className="p-1 rounded-lg hover:bg-white/[0.04] transition-all">
                            {project.featured ? (
                              <CheckCircle size={18} className="text-emerald-400" />
                            ) : (
                              <X size={18} className="text-text-muted" />
                            )}
                          </button>
                        </td>
                        <td className="px-6 py-4">
                          <button onClick={() => toggleField(project, "hero_visible")} className="p-1 rounded-lg hover:bg-white/[0.04] transition-all">
                            {project.hero_visible ? (
                              <CheckCircle size={18} className="text-emerald-400" />
                            ) : (
                              <X size={18} className="text-text-muted" />
                            )}
                          </button>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-1">
                            <a href={`/projets/${project.slug}`} target="_blank" className="p-2 rounded-lg hover:bg-white/[0.06] text-text-secondary hover:text-accent transition-all" title="Voir">
                              <Globe size={16} />
                            </a>
                            <button onClick={() => openEdit(project)} className="p-2 rounded-lg hover:bg-white/[0.06] text-text-secondary hover:text-accent transition-all" title="Modifier">
                              <Pencil size={16} />
                            </button>
                            <button onClick={() => { setSelectedProject(project); setShowDelete(true); }} className="p-2 rounded-lg hover:bg-red-500/10 text-text-secondary hover:text-red-400 transition-all" title="Supprimer">
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
                          <div className="w-12 h-12 rounded-2xl bg-dark border border-white/[0.10] flex items-center justify-center">
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
        description={editingProject ? undefined : "Remplissez les différents onglets pour créer un projet complet"}
        size="xl"
        footer={
          <>
            <button onClick={() => setShowModal(false)} className="px-4 py-2 text-sm text-text-secondary hover:text-text-primary border border-white/[0.10] rounded-full hover:bg-white/[0.04] transition-all">
              Annuler
            </button>
            <button onClick={handleSave} disabled={saving} className="px-4 py-2 text-sm font-semibold text-dark bg-accent rounded-full hover:bg-accent-hover transition-all disabled:opacity-50">
              {saving ? "Enregistrement..." : editingProject ? "Mettre à jour" : "Créer le projet"}
            </button>
          </>
        }
      >
        {/* Tabs navigation */}
        <div className="flex gap-1 mb-6 p-1 bg-dark rounded-xl overflow-x-auto">
          {formTabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveFormTab(tab.key)}
                className={`flex items-center gap-2 px-3 py-2 text-xs font-medium rounded-lg whitespace-nowrap transition-all ${
                  activeFormTab === tab.key
                    ? "bg-accent/15 text-accent border border-accent/20"
                    : "text-text-muted hover:text-text-secondary hover:bg-white/[0.04]"
                }`}
              >
                <Icon size={14} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Tab: General */}
        {activeFormTab === "general" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField label="Titre" name="title" value={form.title} onChange={handleTitleChange} required placeholder="Nom du projet" />
            <div>
              <FormField label="Slug" name="slug" value={form.slug} onChange={(v) => setForm({ ...form, slug: v })} placeholder="nom-du-projet" />
              <p className="text-xs text-text-muted mt-1">Auto-généré depuis le titre</p>
            </div>
            <div className="sm:col-span-2">
              <FormField label="Description" name="description" type="textarea" value={form.description} onChange={(v) => setForm({ ...form, description: v })} required placeholder="Description courte du projet (visible dans les listings)..." rows={3} />
            </div>
            <div className="sm:col-span-2">
              <ImageUpload
                value={form.image_url}
                onChange={(url) => setForm({ ...form, image_url: url })}
                label="Image principale"
                required
              />
            </div>
            <FormField label="Client" name="client" value={form.client} onChange={(v) => setForm({ ...form, client: v })} placeholder="Nom du client" />
            <FormField
              label="Catégorie"
              name="category"
              type="select"
              value={form.category}
              onChange={(v) => setForm({ ...form, category: v })}
              options={[
                { value: "E-Commerce", label: "E-Commerce" },
                { value: "Application Web", label: "Application Web" },
                { value: "Site Vitrine", label: "Site Vitrine" },
                { value: "Design UI/UX", label: "Design UI/UX" },
                { value: "SaaS", label: "SaaS" },
                { value: "Landing Page", label: "Landing Page" },
                { value: "Mobile", label: "Mobile" },
                { value: "Autre", label: "Autre" },
              ]}
            />
            <div className="sm:col-span-2">
              <TagInput
                label="Tags / Technologies"
                tags={form.tags}
                onChange={handleTagsChange}
                placeholder="Ajouter un tag..."
                suggestions={savedTags.map((t) => t.name)}
              />
            </div>
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-text-secondary">Date de réalisation</label>
              <div className="flex gap-2">
                <select
                  value={form.completed_at.split("-")[1] || "01"}
                  onChange={(e) => setForm({ ...form, completed_at: `${form.completed_at.split("-")[0]}-${e.target.value}` })}
                  className="flex-1 px-3 py-2.5 bg-dark border border-white/[0.10] rounded-xl text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-accent/50"
                >
                  {FRENCH_MONTHS.map((m) => (
                    <option key={m.value} value={m.value}>{m.label}</option>
                  ))}
                </select>
                <select
                  value={form.completed_at.split("-")[0] || String(new Date().getFullYear())}
                  onChange={(e) => setForm({ ...form, completed_at: `${e.target.value}-${form.completed_at.split("-")[1]}` })}
                  className="w-24 px-3 py-2.5 bg-dark border border-white/[0.10] rounded-xl text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-accent/50"
                >
                  {Array.from({ length: 11 }, (_, i) => 2020 + i).map((y) => (
                    <option key={y} value={String(y)}>{y}</option>
                  ))}
                </select>
              </div>
            </div>
            <FormField label="URL externe" name="external_url" type="url" value={form.external_url} onChange={(v) => setForm({ ...form, external_url: v })} placeholder="https://..." />

            {/* Status */}
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-text-secondary">Statut</label>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setForm({ ...form, status: "published" })}
                  className={`px-3 py-2 text-xs font-medium rounded-lg border transition-all ${
                    form.status === "published"
                      ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                      : "bg-dark text-text-muted border-white/[0.08] hover:bg-white/[0.04]"
                  }`}
                >
                  Publié
                </button>
                <button
                  type="button"
                  onClick={() => setForm({ ...form, status: "draft" })}
                  className={`px-3 py-2 text-xs font-medium rounded-lg border transition-all ${
                    form.status === "draft"
                      ? "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"
                      : "bg-dark text-text-muted border-white/[0.08] hover:bg-white/[0.04]"
                  }`}
                >
                  Brouillon
                </button>
              </div>
            </div>



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
        )}

        {/* Tab: Défi & Solution */}
        {activeFormTab === "detail" && (
          <div className="space-y-5">
            <div className="p-4 rounded-xl bg-dark border border-white/[0.06]">
              <h4 className="text-sm font-medium text-accent mb-3 flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-accent/10 flex items-center justify-center text-xs">1</span>
                Le Défi
              </h4>
              <FormField
                label="Description du défi"
                name="challenge"
                type="textarea"
                value={form.challenge}
                onChange={(v) => setForm({ ...form, challenge: v })}
                placeholder="Quel était le problème ou besoin du client ?"
                rows={5}
              />
            </div>
            <div className="p-4 rounded-xl bg-dark border border-white/[0.06]">
              <h4 className="text-sm font-medium text-accent mb-3 flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-accent/10 flex items-center justify-center text-xs">2</span>
                La Solution
              </h4>
              <FormField
                label="Description de la solution"
                name="solution"
                type="textarea"
                value={form.solution}
                onChange={(v) => setForm({ ...form, solution: v })}
                placeholder="Comment avez-vous résolu le problème ?"
                rows={5}
              />
            </div>
          </div>
        )}

        {/* Tab: Results */}
        {activeFormTab === "results" && (
          <div className="space-y-4">
            <p className="text-xs text-text-muted">Ajoutez les KPIs / résultats clés du projet (max 4 recommandé).</p>
            {form.results.map((result, index) => (
              <div key={index} className="flex items-start gap-3 p-3 rounded-xl bg-dark border border-white/[0.06]">
                <span className="w-6 h-6 rounded-lg bg-accent/10 flex items-center justify-center text-xs text-accent mt-6 shrink-0">
                  {index + 1}
                </span>
                <div className="flex-1 grid grid-cols-2 gap-3">
                  <FormField
                    label="Label"
                    name={`result-label-${index}`}
                    value={result.label}
                    onChange={(v) => updateResult(index, "label", v)}
                    placeholder="ex: Conversions"
                  />
                  <FormField
                    label="Valeur"
                    name={`result-value-${index}`}
                    value={result.value}
                    onChange={(v) => updateResult(index, "value", v)}
                    placeholder="ex: +45%"
                  />
                </div>
                {form.results.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeResult(index)}
                    className="mt-6 p-1.5 rounded-lg hover:bg-red-500/10 text-text-muted hover:text-red-400 transition-all"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>
            ))}
            {form.results.length < 6 && (
              <button
                type="button"
                onClick={addResult}
                className="w-full py-2.5 border border-dashed border-white/[0.12] rounded-xl text-sm text-text-muted hover:text-accent hover:border-accent/30 transition-all"
              >
                + Ajouter un résultat
              </button>
            )}
          </div>
        )}

        {/* Tab: Gallery */}
        {activeFormTab === "gallery" && (
          <div className="space-y-4">
            <p className="text-xs text-text-muted">Ajoutez des images supplémentaires pour la galerie du projet.</p>

            {/* Gallery grid */}
            {form.gallery.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {form.gallery.map((url, index) => (
                  <div key={index} className="relative group rounded-xl overflow-hidden border border-white/[0.10] bg-dark">
                    <img src={url} alt={`Galerie ${index + 1}`} className="w-full h-28 object-cover" />
                    <button
                      type="button"
                      onClick={() => removeGalleryImage(index)}
                      className="absolute top-2 right-2 p-1 bg-red-500/80 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X size={14} />
                    </button>
                    <div className="px-2 py-1 bg-dark-2 text-[10px] text-text-muted truncate">
                      {url.split("/").pop()}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Upload new gallery image */}
            <ImageUpload
              value=""
              onChange={addGalleryImage}
              label="Ajouter une image à la galerie"
            />
          </div>
        )}

        {/* Tab: SEO & Options */}
        {activeFormTab === "seo" && (
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-dark border border-white/[0.06]">
              <h4 className="text-sm font-medium text-text-secondary mb-3">Référencement (SEO)</h4>
              <div className="space-y-4">
                <FormField
                  label="Meta Title"
                  name="seo_title"
                  value={form.seo_title}
                  onChange={(v) => setForm({ ...form, seo_title: v })}
                  placeholder="Titre pour les moteurs de recherche (laissez vide pour utiliser le titre du projet)"
                />
                <FormField
                  label="Meta Description"
                  name="seo_description"
                  type="textarea"
                  value={form.seo_description}
                  onChange={(v) => setForm({ ...form, seo_description: v })}
                  placeholder="Description pour les moteurs de recherche (laissez vide pour utiliser la description du projet)"
                  rows={3}
                />
              </div>
            </div>

            {/* Preview */}
            <div className="p-4 rounded-xl bg-dark border border-white/[0.06]">
              <h4 className="text-sm font-medium text-text-secondary mb-3">Aperçu Google</h4>
              <div className="p-3 rounded-lg bg-white text-black">
                <p className="text-[#1a0dab] text-sm font-medium truncate">
                  {form.seo_title || form.title || "Titre du projet"} — HDS Agence Web
                </p>
                <p className="text-[#006621] text-xs mt-0.5">
                  haruads.com/projets/{form.slug || "slug"}
                </p>
                <p className="text-[#545454] text-xs mt-1 line-clamp-2">
                  {form.seo_description || form.description || "Description du projet..."}
                </p>
              </div>
            </div>
          </div>
        )}
      </Modal>

      {/* URL Prompt for AI Analysis */}
      <Modal
        isOpen={showUrlPrompt}
        onClose={() => { if (!analyzing) setShowUrlPrompt(false); }}
        title="Nouveau projet"
        description="Collez l'URL du site et l'IA remplit tout automatiquement"
        size="md"
      >
        <div className="space-y-6">
          {/* AI mode */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-accent/5 via-purple-500/5 to-accent/5 border border-accent/15">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 bg-accent/10 rounded-xl">
                <Sparkles size={20} className="text-accent" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-text-primary">Analyse IA</h3>
                <p className="text-xs text-text-muted">L&apos;IA analyse le site et remplit tous les champs</p>
              </div>
            </div>
            <div className="space-y-3">
              <input
                type="url"
                value={promptUrl}
                onChange={(e) => setPromptUrl(e.target.value)}
                placeholder="https://mon-site-client.com"
                disabled={analyzing}
                className="w-full px-4 py-3 bg-dark border border-white/[0.10] rounded-xl text-sm text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all disabled:opacity-50"
                onKeyDown={(e) => { if (e.key === "Enter" && promptUrl) handleAIAnalyze(); }}
                autoFocus
              />
              <button
                onClick={handleAIAnalyze}
                disabled={analyzing || !promptUrl}
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 bg-accent text-dark font-semibold rounded-xl hover:bg-accent-hover transition-all shadow-lg shadow-accent/20 disabled:opacity-50"
              >
                {analyzing ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Analyse en cours...
                  </>
                ) : (
                  <>
                    <Sparkles size={18} />
                    Analyser et remplir
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-4">
            <div className="flex-1 h-px bg-white/[0.08]" />
            <span className="text-xs text-text-muted">ou</span>
            <div className="flex-1 h-px bg-white/[0.08]" />
          </div>

          {/* Manual mode */}
          <button
            onClick={openCreateManual}
            disabled={analyzing}
            className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 bg-dark border border-white/[0.10] text-text-secondary rounded-xl hover:bg-white/[0.04] hover:text-text-primary transition-all text-sm disabled:opacity-50"
          >
            <FileText size={16} />
            Créer manuellement
          </button>
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
