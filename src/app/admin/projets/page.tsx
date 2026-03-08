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
  Camera,
  Brain,
  CircleDot,
} from "lucide-react";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
  DragStartEvent,
  DragEndEvent,
  DragOverlay,
} from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import { restrictToVerticalAxis, restrictToParentElement } from "@dnd-kit/modifiers";
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

function SortableRow({
  project,
  openEdit,
  toggleField,
  setSelectedProject,
  setShowDelete,
}: {
  project: Project;
  openEdit: (p: Project) => void;
  toggleField: (p: Project, field: "featured" | "hero_visible") => void;
  setSelectedProject: (p: Project) => void;
  setShowDelete: (v: boolean) => void;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: project.id });

  const style: React.CSSProperties = {
    transform: transform ? `translate3d(0, ${Math.round(transform.y)}px, 0)` : undefined,
    transition,
    opacity: isDragging ? 0.4 : 1,
    position: "relative" as const,
    zIndex: isDragging ? 1 : 0,
  };

  return (
    <tr ref={setNodeRef} style={style} className="hover:bg-admin-hover transition-colors">
      <td className="px-3 py-4">
        <div
          ref={setActivatorNodeRef}
          {...attributes}
          {...listeners}
          className="cursor-grab active:cursor-grabbing text-admin-text-muted hover:text-admin-text-secondary"
        >
          <GripVertical size={16} />
        </div>
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          {project.image_url && (
            <img src={project.image_url} alt="" className="w-10 h-10 rounded-lg object-cover border border-admin-card-border" />
          )}
          <div>
            <span className="text-sm font-medium text-admin-text">{project.title}</span>
            <p className="text-xs text-admin-text-muted font-mono mt-0.5">/{project.slug}</p>
          </div>
        </div>
      </td>
      <td className="px-6 py-4">
        <span className="text-sm text-admin-text-secondary">{project.client || "-"}</span>
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
            <span className="text-sm text-admin-text-muted">-</span>
          )}
          {project.tags && project.tags.length > 3 && (
            <span className="text-xs text-admin-text-muted">+{project.tags.length - 3}</span>
          )}
        </div>
      </td>
      <td className="px-6 py-4">
        <button onClick={() => toggleField(project, "featured")} className="p-1 rounded-lg hover:bg-admin-hover transition-all">
          {project.featured ? (
            <CheckCircle size={18} className="text-emerald-400" />
          ) : (
            <X size={18} className="text-admin-text-muted" />
          )}
        </button>
      </td>
      <td className="px-6 py-4">
        <button onClick={() => toggleField(project, "hero_visible")} className="p-1 rounded-lg hover:bg-admin-hover transition-all">
          {project.hero_visible ? (
            <CheckCircle size={18} className="text-emerald-400" />
          ) : (
            <X size={18} className="text-admin-text-muted" />
          )}
        </button>
      </td>
      <td className="px-6 py-4 text-right">
        <div className="flex items-center justify-end gap-1">
          <a href={`/projets/${project.slug}`} target="_blank" className="p-2 rounded-lg hover:bg-admin-hover text-admin-text-secondary hover:text-accent transition-all" title="Voir">
            <Globe size={16} />
          </a>
          <button onClick={() => openEdit(project)} className="p-2 rounded-lg hover:bg-admin-hover text-admin-text-secondary hover:text-accent transition-all" title="Modifier">
            <Pencil size={16} />
          </button>
          <button onClick={() => { setSelectedProject(project); setShowDelete(true); }} className="p-2 rounded-lg hover:bg-red-500/10 text-admin-text-secondary hover:text-red-400 transition-all" title="Supprimer">
            <Trash2 size={16} />
          </button>
        </div>
      </td>
    </tr>
  );
}

function DragOverlayRow({ project }: { project: Project }) {
  return (
    <table className="w-full bg-admin-card shadow-2xl shadow-black/50 rounded-lg border border-accent/30">
      <tbody>
        <tr>
          <td className="px-3 py-4 w-10">
            <div className="cursor-grabbing text-accent">
              <GripVertical size={16} />
            </div>
          </td>
          <td className="px-6 py-4">
            <div className="flex items-center gap-3">
              {project.image_url && (
                <img src={project.image_url} alt="" className="w-10 h-10 rounded-lg object-cover border border-admin-card-border" />
              )}
              <div>
                <span className="text-sm font-medium text-admin-text">{project.title}</span>
                <p className="text-xs text-admin-text-muted font-mono mt-0.5">/{project.slug}</p>
              </div>
            </div>
          </td>
          <td className="px-6 py-4">
            <span className="text-sm text-admin-text-secondary">{project.client || "-"}</span>
          </td>
          <td className="px-6 py-4" colSpan={5}></td>
        </tr>
      </tbody>
    </table>
  );
}

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
  const [analysisStep, setAnalysisStep] = useState(0); // 0=idle, 1=analyzing, 2=screenshots, 3=done
  const [capturingScreenshot, setCapturingScreenshot] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [reordering, setReordering] = useState(false);
  const { toast } = useToast();

  const { data: projects, loading, refetch } = useAdminData<Project>("/api/admin/projects", {
    status: activeFilter,
    search: debouncedSearch,
    sortBy: "sort_order",
    sortOrder: "asc",
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
  const handleCaptureScreenshot = async () => {
    if (!form.external_url) return;
    setCapturingScreenshot(true);
    try {
      const res = await fetch("/api/admin/screenshot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: form.external_url }),
      });
      if (res.ok) {
        const data = await res.json();
        if (data.urls?.length) {
          data.urls.forEach((u: string) => addGalleryImage(u));
          toast({ type: "success", message: `${data.urls.length} screenshots capturés et ajoutés à la galerie !` });
        }
      } else {
        const err = await res.json().catch(() => ({}));
        toast({ type: "error", message: err.error || "Erreur lors de la capture du screenshot" });
      }
    } catch {
      toast({ type: "error", message: "Erreur lors de la capture du screenshot" });
    } finally {
      setCapturingScreenshot(false);
    }
  };

  // Drag-and-drop reordering with @dnd-kit
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 5 },
    }),
    useSensor(KeyboardSensor)
  );

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);

    if (!over || active.id === over.id) return;

    const oldIndex = projects.findIndex((p) => p.id === active.id);
    const newIndex = projects.findIndex((p) => p.id === over.id);
    if (oldIndex === -1 || newIndex === -1) return;

    const reordered = arrayMove(projects, oldIndex, newIndex);
    const items = reordered.map((p, i) => ({ id: p.id, sort_order: i }));

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

  const handleDragCancel = () => {
    setActiveId(null);
  };

  // AI auto-fill from URL
  const handleAIAnalyze = async () => {
    if (!promptUrl) {
      toast({ type: "error", message: "Collez l'URL du site à analyser" });
      return;
    }
    setAnalyzing(true);
    setAnalysisStep(1);
    try {
      // Step 1: AI Analysis
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

      // Step 2: Capture screenshots for gallery
      setAnalysisStep(2);
      let galleryUrls: string[] = [];
      try {
        const screenshotRes = await fetch("/api/admin/screenshot", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ url: promptUrl }),
        });
        if (screenshotRes.ok) {
          const screenshotData = await screenshotRes.json();
          if (screenshotData.urls?.length) {
            galleryUrls = screenshotData.urls;
          }
        } else {
          const errData = await screenshotRes.json().catch(() => ({}));
          console.error("[screenshot]", errData);
          toast({ type: "error", message: `Screenshot échoué: ${errData.error || screenshotRes.statusText}` });
        }
      } catch (screenshotErr) {
        console.error("[screenshot]", screenshotErr);
      }

      // Step 3: Done
      setAnalysisStep(3);
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
        gallery: galleryUrls,
      });

      await new Promise((resolve) => setTimeout(resolve, 800));

      setShowUrlPrompt(false);
      setShowModal(true);
      toast({ type: "success", message: galleryUrls.length > 0 ? `Fiche projet remplie par l'IA avec ${galleryUrls.length} screenshots !` : "Fiche projet remplie par l'IA ! Ajoutez une image et validez." });
    } catch (err) {
      toast({ type: "error", message: err instanceof Error ? err.message : "Erreur lors de l'analyse IA" });
    } finally {
      setAnalyzing(false);
      setAnalysisStep(0);
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
            <button onClick={refetch} className="flex items-center gap-2 px-4 py-2.5 bg-admin-card border border-admin-card-border rounded-full text-admin-text-secondary hover:bg-admin-hover hover:text-admin-text transition-all text-sm">
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
        <div className="bg-admin-card border border-admin-card-border rounded-2xl p-4 space-y-4">
          <div className="relative">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-admin-text-muted" />
            <input
              type="text"
              placeholder="Rechercher un projet..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-admin-input-bg border border-admin-card-border rounded-full text-sm text-admin-text placeholder-admin-text-muted focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all"
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
                    : "bg-admin-card text-admin-text-secondary border border-admin-card-border hover:bg-admin-hover hover:text-admin-text rounded-full"
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
        <div className="bg-admin-card border border-admin-card-border rounded-2xl overflow-hidden">
          {loading ? (
            <div className="flex justify-center py-16">
              <Loader2 size={24} className="text-accent animate-spin" />
            </div>
          ) : (
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              modifiers={[restrictToVerticalAxis, restrictToParentElement]}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
              onDragCancel={handleDragCancel}
            >
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-admin-card-border">
                      <th className="w-10 px-3 py-4"></th>
                      <th className="text-left px-6 py-4 text-xs font-mono font-semibold text-admin-text-muted uppercase tracking-wider">Titre {reordering && <Loader2 size={14} className="text-accent animate-spin inline ml-1" />}</th>
                      <th className="text-left px-6 py-4 text-xs font-mono font-semibold text-admin-text-muted uppercase tracking-wider">Client</th>
                      <th className="text-left px-6 py-4 text-xs font-mono font-semibold text-admin-text-muted uppercase tracking-wider">Statut</th>
                      <th className="text-left px-6 py-4 text-xs font-mono font-semibold text-admin-text-muted uppercase tracking-wider">Tags</th>
                      <th className="text-left px-6 py-4 text-xs font-mono font-semibold text-admin-text-muted uppercase tracking-wider">Featured</th>
                      <th className="text-left px-6 py-4 text-xs font-mono font-semibold text-admin-text-muted uppercase tracking-wider">Hero</th>
                      <th className="text-right px-6 py-4 text-xs font-mono font-semibold text-admin-text-muted uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <SortableContext items={projects.map((p) => p.id)} strategy={verticalListSortingStrategy}>
                    <tbody className="divide-y divide-admin-card-border">
                      {projects.length > 0 ? (
                        projects.map((project) => (
                          <SortableRow
                            key={project.id}
                            project={project}
                            openEdit={openEdit}
                            toggleField={toggleField}
                            setSelectedProject={setSelectedProject}
                            setShowDelete={setShowDelete}
                          />
                        ))
                      ) : (
                        <tr>
                          <td colSpan={8} className="px-6 py-16 text-center">
                            <div className="flex flex-col items-center gap-3">
                              <div className="w-12 h-12 rounded-2xl bg-admin-input-bg border border-admin-card-border flex items-center justify-center">
                                <FolderKanban size={24} className="text-admin-text-muted" />
                              </div>
                              <div>
                                <p className="text-admin-text-muted font-medium">Aucun projet trouvé</p>
                                <p className="text-admin-text-muted text-sm mt-1">Ajoutez votre premier projet au portfolio</p>
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
                  </SortableContext>
                </table>
              </div>
              <DragOverlay dropAnimation={{ duration: 200, easing: "cubic-bezier(0.18, 0.67, 0.6, 1.22)" }}>
                {activeId ? <DragOverlayRow project={projects.find((p) => p.id === activeId)!} /> : null}
              </DragOverlay>
            </DndContext>
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
            <button onClick={() => setShowModal(false)} className="px-4 py-2 text-sm text-admin-text-secondary hover:text-admin-text border border-admin-card-border rounded-full hover:bg-admin-hover transition-all">
              Annuler
            </button>
            <button onClick={handleSave} disabled={saving} className="px-4 py-2 text-sm font-semibold text-dark bg-accent rounded-full hover:bg-accent-hover transition-all disabled:opacity-50">
              {saving ? "Enregistrement..." : editingProject ? "Mettre à jour" : "Créer le projet"}
            </button>
          </>
        }
      >
        {/* Tabs navigation */}
        <div className="flex gap-1 mb-6 p-1 bg-admin-input-bg rounded-xl overflow-x-auto">
          {formTabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveFormTab(tab.key)}
                className={`flex items-center gap-2 px-3 py-2 text-xs font-medium rounded-lg whitespace-nowrap transition-all ${
                  activeFormTab === tab.key
                    ? "bg-accent/15 text-accent border border-accent/20"
                    : "text-admin-text-muted hover:text-admin-text-secondary hover:bg-admin-hover"
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
              <p className="text-xs text-admin-text-muted mt-1">Auto-généré depuis le titre</p>
            </div>
            <div className="sm:col-span-2">
              <FormField label="Description" name="description" type="richtext" value={form.description} onChange={(v) => setForm({ ...form, description: v })} required placeholder="Description courte du projet (visible dans les listings)..." rows={3} />
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
              <label className="block text-sm font-medium text-admin-text-secondary">Date de réalisation</label>
              <div className="flex gap-2">
                <select
                  value={form.completed_at.split("-")[1] || "01"}
                  onChange={(e) => setForm({ ...form, completed_at: `${form.completed_at.split("-")[0]}-${e.target.value}` })}
                  className="flex-1 px-3 py-2.5 bg-admin-input-bg border border-admin-card-border rounded-xl text-sm text-admin-text focus:outline-none focus:ring-2 focus:ring-accent/50"
                >
                  {FRENCH_MONTHS.map((m) => (
                    <option key={m.value} value={m.value}>{m.label}</option>
                  ))}
                </select>
                <select
                  value={form.completed_at.split("-")[0] || String(new Date().getFullYear())}
                  onChange={(e) => setForm({ ...form, completed_at: `${e.target.value}-${form.completed_at.split("-")[1]}` })}
                  className="w-24 px-3 py-2.5 bg-admin-input-bg border border-admin-card-border rounded-xl text-sm text-admin-text focus:outline-none focus:ring-2 focus:ring-accent/50"
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
              <label className="block text-sm font-medium text-admin-text-secondary">Statut</label>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setForm({ ...form, status: "published" })}
                  className={`px-3 py-2 text-xs font-medium rounded-lg border transition-all ${
                    form.status === "published"
                      ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                      : "bg-admin-input-bg text-admin-text-muted border-admin-card-border hover:bg-admin-hover"
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
                      : "bg-admin-input-bg text-admin-text-muted border-admin-card-border hover:bg-admin-hover"
                  }`}
                >
                  Brouillon
                </button>
              </div>
            </div>



            {/* Toggle: Featured */}
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-admin-text-secondary">Featured</label>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.featured}
                  onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-admin-input-bg border border-admin-card-border rounded-full peer peer-checked:bg-accent/20 peer-checked:border-accent/30 after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-gray-400 after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full peer-checked:after:bg-accent" />
                <span className="ml-3 text-sm text-admin-text-secondary">{form.featured ? "Oui" : "Non"}</span>
              </label>
            </div>

            {/* Toggle: Hero visible */}
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-admin-text-secondary">Hero visible</label>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.hero_visible}
                  onChange={(e) => setForm({ ...form, hero_visible: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-admin-input-bg border border-admin-card-border rounded-full peer peer-checked:bg-accent/20 peer-checked:border-accent/30 after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-gray-400 after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full peer-checked:after:bg-accent" />
                <span className="ml-3 text-sm text-admin-text-secondary">{form.hero_visible ? "Oui" : "Non"}</span>
              </label>
            </div>
          </div>
        )}

        {/* Tab: Défi & Solution */}
        {activeFormTab === "detail" && (
          <div className="space-y-5">
            <div className="p-4 rounded-xl bg-admin-input-bg border border-admin-card-border">
              <h4 className="text-sm font-medium text-accent mb-3 flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-accent/10 flex items-center justify-center text-xs">1</span>
                Le Défi
              </h4>
              <FormField
                label="Description du défi"
                name="challenge"
                type="richtext"
                value={form.challenge}
                onChange={(v) => setForm({ ...form, challenge: v })}
                placeholder="Quel était le problème ou besoin du client ?"
                rows={5}
              />
            </div>
            <div className="p-4 rounded-xl bg-admin-input-bg border border-admin-card-border">
              <h4 className="text-sm font-medium text-accent mb-3 flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-accent/10 flex items-center justify-center text-xs">2</span>
                La Solution
              </h4>
              <FormField
                label="Description de la solution"
                name="solution"
                type="richtext"
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
            <p className="text-xs text-admin-text-muted">Ajoutez les KPIs / résultats clés du projet (max 4 recommandé).</p>
            {form.results.map((result, index) => (
              <div key={index} className="flex items-start gap-3 p-3 rounded-xl bg-admin-input-bg border border-admin-card-border">
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
                    className="mt-6 p-1.5 rounded-lg hover:bg-red-500/10 text-admin-text-muted hover:text-red-400 transition-all"
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
                className="w-full py-2.5 border border-dashed border-admin-input-border rounded-xl text-sm text-admin-text-muted hover:text-accent hover:border-accent/30 transition-all"
              >
                + Ajouter un résultat
              </button>
            )}
          </div>
        )}

        {/* Tab: Gallery */}
        {activeFormTab === "gallery" && (
          <div className="space-y-4">
            <p className="text-xs text-admin-text-muted">Ajoutez des images supplémentaires pour la galerie du projet.</p>

            {/* Gallery grid */}
            {form.gallery.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {form.gallery.map((url, index) => (
                  <div key={index} className="relative group rounded-xl overflow-hidden border border-admin-card-border bg-admin-input-bg">
                    <img src={url} alt={`Galerie ${index + 1}`} className="w-full h-28 object-cover" />
                    <button
                      type="button"
                      onClick={() => removeGalleryImage(index)}
                      className="absolute top-2 right-2 p-1 bg-red-500/80 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X size={14} />
                    </button>
                    <div className="px-2 py-1 bg-admin-card text-[10px] text-admin-text-muted truncate">
                      {url.split("/").pop()}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Capture screenshot button */}
            {form.external_url && (
              <button
                type="button"
                onClick={handleCaptureScreenshot}
                disabled={capturingScreenshot}
                className="w-full flex items-center justify-center gap-2 py-2.5 border border-dashed border-accent/30 rounded-xl text-sm text-accent hover:bg-accent/5 transition-all disabled:opacity-50"
              >
                {capturingScreenshot ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Capture en cours...
                  </>
                ) : (
                  <>
                    <Globe size={16} />
                    Capturer 6 pages du site (1280×720)
                  </>
                )}
              </button>
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
            <div className="p-4 rounded-xl bg-admin-input-bg border border-admin-card-border">
              <h4 className="text-sm font-medium text-admin-text-secondary mb-3">Référencement (SEO)</h4>
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
            <div className="p-4 rounded-xl bg-admin-input-bg border border-admin-card-border">
              <h4 className="text-sm font-medium text-admin-text-secondary mb-3">Aperçu Google</h4>
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
        description={analyzing ? undefined : "Collez l'URL du site et l'IA remplit tout automatiquement"}
        size="md"
      >
        <div className="space-y-6">
          {analyzing ? (
            /* Interactive progress steps */
            <div className="py-2">
              <div className="flex items-center gap-3 mb-6 px-1">
                <div className="p-2.5 bg-accent/10 rounded-xl">
                  <Sparkles size={20} className="text-accent animate-pulse" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-admin-text">Import en cours</h3>
                  <p className="text-xs text-admin-text-muted truncate max-w-[300px]">{promptUrl}</p>
                </div>
              </div>

              {/* Progress bar */}
              <div className="mb-6 mx-1">
                <div className="h-1 bg-admin-input-bg rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-accent to-orange-400 rounded-full transition-all duration-700 ease-out"
                    style={{ width: `${analysisStep === 1 ? 33 : analysisStep === 2 ? 66 : analysisStep === 3 ? 100 : 0}%` }}
                  />
                </div>
              </div>

              {/* Steps */}
              <div className="space-y-1">
                {[
                  { step: 1, icon: Brain, label: "Analyse IA du site", activeLabel: "L'IA analyse le contenu du site..." },
                  { step: 2, icon: Camera, label: "Capture des screenshots", activeLabel: "Capture des pages du site..." },
                  { step: 3, icon: CheckCircle, label: "Terminé !", activeLabel: "Fiche projet prête !" },
                ].map(({ step, icon: Icon, label, activeLabel }) => {
                  const isActive = analysisStep === step;
                  const isDone = analysisStep > step;

                  return (
                    <div
                      key={step}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                        isActive
                          ? "bg-accent/8 border border-accent/15"
                          : isDone
                            ? "bg-emerald-500/5 border border-emerald-500/10"
                            : "border border-transparent opacity-40"
                      }`}
                    >
                      <div className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 ${
                        isActive
                          ? "bg-accent/15"
                          : isDone
                            ? "bg-emerald-500/15"
                            : "bg-white/5"
                      }`}>
                        {isDone ? (
                          <CheckCircle size={16} className="text-emerald-400" />
                        ) : isActive ? (
                          <Loader2 size={16} className="text-accent animate-spin" />
                        ) : (
                          <CircleDot size={16} className="text-admin-text-muted" />
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className={`text-sm font-medium transition-colors duration-300 ${
                          isActive ? "text-accent" : isDone ? "text-emerald-400" : "text-admin-text-muted"
                        }`}>
                          {isDone ? label : isActive ? activeLabel : label}
                        </p>
                      </div>
                      {isActive && step < 3 && (
                        <div className="flex gap-1">
                          <span className="w-1 h-1 bg-accent rounded-full animate-bounce [animation-delay:0ms]" />
                          <span className="w-1 h-1 bg-accent rounded-full animate-bounce [animation-delay:150ms]" />
                          <span className="w-1 h-1 bg-accent rounded-full animate-bounce [animation-delay:300ms]" />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            /* Normal input state */
            <>
              {/* AI mode */}
              <div className="p-5 rounded-2xl bg-gradient-to-br from-accent/5 via-purple-500/5 to-accent/5 border border-accent/15">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2.5 bg-accent/10 rounded-xl">
                    <Sparkles size={20} className="text-accent" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-admin-text">Analyse IA</h3>
                    <p className="text-xs text-admin-text-muted">L&apos;IA analyse le site et remplit tous les champs</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <input
                    type="url"
                    value={promptUrl}
                    onChange={(e) => setPromptUrl(e.target.value)}
                    placeholder="https://mon-site-client.com"
                    className="w-full px-4 py-3 bg-admin-input-bg border border-admin-card-border rounded-xl text-sm text-admin-text placeholder-admin-text-muted focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all"
                    onKeyDown={(e) => { if (e.key === "Enter" && promptUrl) handleAIAnalyze(); }}
                    autoFocus
                  />
                  <button
                    onClick={handleAIAnalyze}
                    disabled={!promptUrl}
                    className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 bg-accent text-dark font-semibold rounded-xl hover:bg-accent-hover transition-all shadow-lg shadow-accent/20 disabled:opacity-50"
                  >
                    <Sparkles size={18} />
                    Analyser et remplir
                  </button>
                </div>
              </div>

              {/* Divider */}
              <div className="flex items-center gap-4">
                <div className="flex-1 h-px bg-white/[0.08]" />
                <span className="text-xs text-admin-text-muted">ou</span>
                <div className="flex-1 h-px bg-white/[0.08]" />
              </div>

              {/* Manual mode */}
              <button
                onClick={openCreateManual}
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 bg-admin-input-bg border border-admin-card-border text-admin-text-secondary rounded-xl hover:bg-admin-hover hover:text-admin-text transition-all text-sm"
              >
                <FileText size={16} />
                Créer manuellement
              </button>
            </>
          )}
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
