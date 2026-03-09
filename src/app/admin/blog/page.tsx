"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import {
  Plus,
  Search,
  FileText,
  RefreshCw,
  Pencil,
  Trash2,
  Loader2,
  Sparkles,
  Upload,
  X,
  Image as ImageIcon,
} from "lucide-react";
import PageHeader from "@/components/admin/PageHeader";
import PageTransition, { AnimatedSection } from "@/components/admin/PageTransition";
import Modal from "@/components/admin/Modal";
import ConfirmDialog from "@/components/admin/ConfirmDialog";
import FormField from "@/components/admin/FormField";
import TagInput from "@/components/admin/TagInput";
import { useToast } from "@/components/admin/Toast";
import { useAdminData } from "@/hooks/useAdminData";
import { formatDate, slugify } from "@/lib/utils";
import type { BlogPost } from "@/types/database";

const filterTabs = [
  { key: "all", label: "Tous" },
  { key: "draft", label: "Brouillons" },
  { key: "published", label: "Publiés" },
  { key: "archived", label: "Archivés" },
];

function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, string> = {
    draft: "bg-gray-500/15 text-admin-text-muted border-gray-500/20",
    published: "bg-emerald-500/15 text-emerald-400 border-emerald-500/20",
    archived: "bg-gray-500/15 text-admin-text-muted border-gray-500/20",
  };
  const labels: Record<string, string> = {
    draft: "Brouillon",
    published: "Publié",
    archived: "Archivé",
  };
  const color = colors[status] || "bg-gray-500/15 text-admin-text-muted border-gray-500/20";
  return (
    <span className={`inline-flex px-2.5 py-1 rounded-lg text-xs font-medium border ${color}`}>
      {labels[status] || status}
    </span>
  );
}

const emptyForm = {
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  cover_image: "",
  category: "",
  tags: [] as string[],
  status: "draft",
  seo_title: "",
  seo_description: "",
  seo_keywords: [] as string[],
  sea_keywords: [] as string[],
  aeo_answer: "",
  is_ai_generated: false,
};

export default function BlogAdminPage() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showAiModal, setShowAiModal] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [aiTopic, setAiTopic] = useState("");
  const [aiTone, setAiTone] = useState("professionnel");
  const [aiLength, setAiLength] = useState("medium");
  const [existingCategories, setExistingCategories] = useState<string[]>([]);
  const [existingTags, setExistingTags] = useState<string[]>([]);
  const [showCategorySuggestions, setShowCategorySuggestions] = useState(false);
  const categoryRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const { data: posts, loading, refetch } = useAdminData<BlogPost>("/api/admin/blog", {
    status: activeFilter,
    search: debouncedSearch,
  });

  // Fetch existing categories and tags for suggestions
  useEffect(() => {
    fetch("/api/admin/blog/categories-tags")
      .then((res) => res.json())
      .then((data) => {
        setExistingCategories(data.categories || []);
        setExistingTags(data.tags || []);
      })
      .catch(() => {});
  }, []);

  // Close category suggestions on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (categoryRef.current && !categoryRef.current.contains(e.target as Node)) {
        setShowCategorySuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = useCallback((value: string) => {
    setSearchQuery(value);
    const timeout = setTimeout(() => setDebouncedSearch(value), 300);
    return () => clearTimeout(timeout);
  }, []);

  const openCreate = () => {
    setEditingPost(null);
    setForm(emptyForm);
    setShowModal(true);
  };

  const openEdit = (post: BlogPost) => {
    setEditingPost(post);
    setForm({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt || "",
      content: post.content,
      cover_image: post.cover_image || "",
      category: post.category || "",
      tags: post.tags || [],
      status: post.status,
      seo_title: post.seo_title || "",
      seo_description: post.seo_description || "",
      seo_keywords: post.seo_keywords || [],
      sea_keywords: post.sea_keywords || [],
      aeo_answer: post.aeo_answer || "",
      is_ai_generated: post.is_ai_generated || false,
    });
    setShowModal(true);
  };

  const handleTitleChange = (value: string) => {
    setForm((prev) => ({
      ...prev,
      title: value,
      ...(!editingPost ? { slug: slugify(value) } : {}),
    }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Erreur upload");

      const data = await res.json();
      setForm((prev) => ({ ...prev, cover_image: data.url }));
      toast({ type: "success", message: "Image uploadée" });
    } catch {
      toast({ type: "error", message: "Erreur lors de l'upload" });
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleAiGenerate = async () => {
    if (!aiTopic.trim()) {
      toast({ type: "error", message: "Entrez un thème pour l'article" });
      return;
    }

    setGenerating(true);
    try {
      const res = await fetch("/api/admin/ia/generate-article", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topic: aiTopic,
          tone: aiTone,
          length: aiLength,
        }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || "Erreur de génération");
      }

      const data = await res.json();

      // Fill the form with generated data
      setForm({
        title: data.title || "",
        slug: data.slug || slugify(data.title || ""),
        excerpt: data.excerpt || "",
        content: data.content || "",
        cover_image: data.cover_image || "",
        category: data.category || "",
        tags: data.tags || [],
        status: "draft",
        seo_title: data.seo_title || "",
        seo_description: data.seo_description || "",
        seo_keywords: data.seo_keywords || [],
        sea_keywords: data.sea_keywords || [],
        aeo_answer: data.aeo_answer || "",
        is_ai_generated: true,
      });

      setShowAiModal(false);
      setShowModal(true);
      setEditingPost(null);
      setAiTopic("");
      toast({ type: "success", message: "Article généré avec succès ! Vous pouvez le modifier avant de sauvegarder." });
    } catch (err) {
      toast({ type: "error", message: err instanceof Error ? err.message : "Erreur de génération" });
    } finally {
      setGenerating(false);
    }
  };

  const handleSave = async () => {
    if (!form.title || !form.content) {
      toast({ type: "error", message: "Titre et contenu requis" });
      return;
    }
    setSaving(true);
    try {
      const url = editingPost ? `/api/admin/blog/${editingPost.id}` : "/api/admin/blog";
      const method = editingPost ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || "Erreur");
      }
      toast({ type: "success", message: editingPost ? "Article mis à jour" : "Article créé" });
      setShowModal(false);
      setForm(emptyForm);
      setEditingPost(null);
      refetch();
      // Refresh categories/tags
      fetch("/api/admin/blog/categories-tags")
        .then((res) => res.json())
        .then((data) => {
          setExistingCategories(data.categories || []);
          setExistingTags(data.tags || []);
        })
        .catch(() => {});
    } catch (err) {
      toast({ type: "error", message: err instanceof Error ? err.message : "Erreur" });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedPost) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/admin/blog/${selectedPost.id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Erreur");
      toast({ type: "success", message: "Article supprimé" });
      setShowDelete(false);
      setSelectedPost(null);
      refetch();
    } catch {
      toast({ type: "error", message: "Erreur lors de la suppression" });
    } finally {
      setDeleting(false);
    }
  };

  const filteredCategories = existingCategories.filter(
    (c) => c.toLowerCase().includes(form.category.toLowerCase()) && c !== form.category
  );

  return (
    <PageTransition className="space-y-6">
      <PageHeader
        icon={<FileText size={24} />}
        title="Articles Blog"
        subtitle="Gérez vos articles de blog, brouillons et publications."
        actions={
          <>
            <button onClick={refetch} className="flex items-center gap-2 px-4 py-2.5 bg-admin-card border border-admin-card-border rounded-full text-admin-text-secondary hover:bg-admin-hover hover:text-admin-text transition-all text-sm">
              <RefreshCw size={16} />
              Actualiser
            </button>
            <button
              onClick={() => setShowAiModal(true)}
              className="flex items-center gap-2 px-4 py-2.5 bg-purple-500/10 text-purple-400 border border-purple-500/20 font-semibold rounded-full hover:bg-purple-500/20 transition-all text-sm"
            >
              <Sparkles size={16} />
              Générer avec IA
            </button>
            <button onClick={openCreate} className="flex items-center gap-2 px-4 py-2.5 bg-accent text-dark font-semibold rounded-full hover:bg-accent-hover shadow-lg shadow-accent/20 transition-all text-sm">
              <Plus size={16} />
              Nouvel article
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
              placeholder="Rechercher un article..."
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
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-admin-card-border">
                    <th className="text-left px-6 py-4 text-[0.65rem] font-mono font-semibold text-admin-text-muted uppercase tracking-wider">Titre</th>
                    <th className="text-left px-6 py-4 text-[0.65rem] font-mono font-semibold text-admin-text-muted uppercase tracking-wider">Catégorie</th>
                    <th className="text-left px-6 py-4 text-[0.65rem] font-mono font-semibold text-admin-text-muted uppercase tracking-wider">Statut</th>
                    <th className="text-left px-6 py-4 text-[0.65rem] font-mono font-semibold text-admin-text-muted uppercase tracking-wider">Date de publication</th>
                    <th className="text-left px-6 py-4 text-[0.65rem] font-mono font-semibold text-admin-text-muted uppercase tracking-wider">Vues</th>
                    <th className="text-right px-6 py-4 text-[0.65rem] font-mono font-semibold text-admin-text-muted uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-admin-card-border">
                  {posts.length > 0 ? (
                    posts.map((post) => (
                      <tr key={post.id} className="hover:bg-admin-hover transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            {post.is_ai_generated && (
                              <Sparkles size={14} className="text-purple-400 shrink-0" />
                            )}
                            <div>
                              <span className="text-sm font-medium text-admin-text">{post.title}</span>
                              <p className="text-xs text-admin-text-muted font-mono mt-0.5">/{post.slug}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm text-admin-text-secondary">{post.category || "-"}</span>
                        </td>
                        <td className="px-6 py-4">
                          <StatusBadge status={post.status} />
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm text-admin-text-muted">{formatDate(post.published_at)}</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm text-admin-text-secondary">{post.views_count}</span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button onClick={() => openEdit(post)} className="p-1.5 rounded-lg hover:bg-admin-hover text-admin-text-muted hover:text-admin-text transition-all">
                              <Pencil size={16} />
                            </button>
                            <button onClick={() => { setSelectedPost(post); setShowDelete(true); }} className="p-1.5 rounded-lg hover:bg-admin-hover text-admin-text-muted hover:text-red-400 transition-all">
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
                          <div className="w-12 h-12 rounded-2xl bg-admin-input-bg border border-admin-card-border flex items-center justify-center">
                            <FileText size={24} className="text-admin-text-muted" />
                          </div>
                          <div>
                            <p className="text-admin-text-muted font-medium">Aucun article trouvé</p>
                            <p className="text-admin-text-muted text-sm mt-1">Créez votre premier article de blog</p>
                          </div>
                          <div className="flex gap-2 mt-2">
                            <button onClick={() => setShowAiModal(true)} className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/10 text-purple-400 border border-purple-500/20 rounded-full hover:bg-purple-500/20 transition-all text-sm font-medium">
                              <Sparkles size={16} />
                              Générer avec IA
                            </button>
                            <button onClick={openCreate} className="inline-flex items-center gap-2 px-4 py-2 bg-accent-dim text-accent border border-accent/20 rounded-full hover:bg-accent/20 transition-all text-sm font-medium">
                              <Plus size={16} />
                              Écrire manuellement
                            </button>
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

      {/* AI Generation Modal */}
      <Modal
        isOpen={showAiModal}
        onClose={() => { if (!generating) setShowAiModal(false); }}
        title="Générer un article avec l'IA"
        description="Entrez un thème et l'IA créera un article complet avec SEO optimisé"
        size="md"
        footer={
          <>
            <button
              onClick={() => setShowAiModal(false)}
              disabled={generating}
              className="px-4 py-2 text-sm text-admin-text-secondary hover:text-admin-text border border-admin-card-border rounded-full hover:bg-admin-hover transition-all disabled:opacity-50"
            >
              Annuler
            </button>
            <button
              onClick={handleAiGenerate}
              disabled={generating || !aiTopic.trim()}
              className="px-5 py-2 text-sm font-semibold text-white bg-purple-500 rounded-full hover:bg-purple-600 transition-all disabled:opacity-50 flex items-center gap-2"
            >
              {generating ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Génération en cours...
                </>
              ) : (
                <>
                  <Sparkles size={16} />
                  Générer l&apos;article
                </>
              )}
            </button>
          </>
        }
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-admin-text-secondary mb-1.5">
              Thème de l&apos;article <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              value={aiTopic}
              onChange={(e) => setAiTopic(e.target.value)}
              placeholder="Ex: Les avantages du référencement local pour les PME"
              className="w-full px-4 py-3 bg-admin-input-bg border border-admin-input-border rounded-xl text-sm text-admin-text placeholder-admin-text-muted focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/30 transition-all"
              onKeyDown={(e) => {
                if (e.key === "Enter" && !generating && aiTopic.trim()) {
                  e.preventDefault();
                  handleAiGenerate();
                }
              }}
              autoFocus
            />
            <p className="text-xs text-admin-text-muted mt-1.5">
              Un mot-clé ou une phrase décrivant le sujet de l&apos;article
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <FormField
              label="Ton"
              name="ai_tone"
              type="select"
              value={aiTone}
              onChange={setAiTone}
              options={[
                { value: "professionnel", label: "Professionnel" },
                { value: "casual", label: "Décontracté" },
                { value: "expert", label: "Expert" },
                { value: "commercial", label: "Commercial" },
                { value: "educatif", label: "Éducatif" },
              ]}
            />
            <FormField
              label="Longueur"
              name="ai_length"
              type="select"
              value={aiLength}
              onChange={setAiLength}
              options={[
                { value: "short", label: "Court (300-500 mots)" },
                { value: "medium", label: "Moyen (800-1200 mots)" },
                { value: "long", label: "Long (1500-2000 mots)" },
              ]}
            />
          </div>

          {generating && (
            <div className="bg-purple-500/5 border border-purple-500/10 rounded-xl p-4">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Sparkles size={20} className="text-purple-400 animate-pulse" />
                </div>
                <div>
                  <p className="text-sm font-medium text-purple-400">Génération en cours...</p>
                  <p className="text-xs text-admin-text-muted mt-0.5">
                    L&apos;IA rédige votre article, recherche une image et optimise le SEO. Cela peut prendre quelques secondes.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </Modal>

      {/* Create / Edit Modal */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={editingPost ? "Modifier l'article" : "Nouvel article"}
        description={editingPost ? undefined : form.is_ai_generated ? "Article généré par IA — modifiez librement avant de sauvegarder" : "Créer un nouvel article de blog"}
        size="xl"
        footer={
          <>
            <button onClick={() => setShowModal(false)} className="px-4 py-2 text-sm text-admin-text-secondary hover:text-admin-text border border-admin-card-border rounded-full hover:bg-admin-hover transition-all">
              Annuler
            </button>
            <button onClick={handleSave} disabled={saving} className="px-4 py-2 text-sm font-semibold text-dark bg-accent rounded-full hover:bg-accent-hover transition-all disabled:opacity-50">
              {saving ? "Enregistrement..." : editingPost ? "Mettre à jour" : "Créer l'article"}
            </button>
          </>
        }
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Title & Slug */}
          <FormField label="Titre" name="title" value={form.title} onChange={handleTitleChange} required placeholder="Mon article" />
          <div>
            <FormField label="Slug" name="slug" value={form.slug} onChange={(v) => setForm({ ...form, slug: v })} placeholder="mon-article" />
            <p className="text-xs text-admin-text-muted mt-1">Auto-généré depuis le titre</p>
          </div>

          {/* Excerpt */}
          <div className="sm:col-span-2">
            <FormField label="Extrait" name="excerpt" type="richtext" value={form.excerpt} onChange={(v) => setForm({ ...form, excerpt: v })} placeholder="Résumé de l'article..." rows={3} />
          </div>

          {/* Content */}
          <div className="sm:col-span-2">
            <FormField label="Contenu" name="content" type="richtext" value={form.content} onChange={(v) => setForm({ ...form, content: v })} required placeholder="Contenu de l'article..." rows={10} />
          </div>

          {/* Cover Image */}
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-admin-text-secondary mb-1.5">
              Image de couverture
            </label>
            <div className="space-y-3">
              {form.cover_image && (
                <div className="relative rounded-xl overflow-hidden border border-admin-card-border">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={form.cover_image}
                    alt="Couverture"
                    className="w-full h-48 object-cover"
                  />
                  <button
                    onClick={() => setForm({ ...form, cover_image: "" })}
                    className="absolute top-2 right-2 p-1.5 rounded-lg bg-black/50 text-white hover:bg-black/70 transition-all"
                  >
                    <X size={14} />
                  </button>
                </div>
              )}
              <div className="flex gap-2">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploading}
                  className="flex items-center gap-2 px-4 py-2 text-sm bg-admin-input-bg border border-admin-input-border rounded-xl text-admin-text-secondary hover:text-admin-text hover:bg-admin-hover transition-all disabled:opacity-50"
                >
                  {uploading ? <Loader2 size={14} className="animate-spin" /> : <Upload size={14} />}
                  {uploading ? "Upload..." : "Uploader une image"}
                </button>
                <div className="flex-1">
                  <input
                    type="url"
                    value={form.cover_image}
                    onChange={(e) => setForm({ ...form, cover_image: e.target.value })}
                    placeholder="Ou collez une URL d'image..."
                    className="w-full px-4 py-2 bg-admin-input-bg border border-admin-input-border rounded-xl text-sm text-admin-text placeholder-admin-text-muted focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all"
                  />
                </div>
              </div>
              {!form.cover_image && (
                <p className="text-xs text-admin-text-muted flex items-center gap-1">
                  <ImageIcon size={12} />
                  L&apos;IA recherche automatiquement une image lors de la génération
                </p>
              )}
            </div>
          </div>

          {/* Category with suggestions */}
          <div ref={categoryRef} className="relative">
            <FormField
              label="Catégorie"
              name="category"
              value={form.category}
              onChange={(v) => {
                setForm({ ...form, category: v });
                setShowCategorySuggestions(true);
              }}
              placeholder="Ex: SEO, Marketing..."
            />
            {showCategorySuggestions && filteredCategories.length > 0 && (
              <div className="absolute z-10 w-full mt-1 bg-admin-card border border-admin-card-border rounded-xl shadow-lg max-h-40 overflow-y-auto">
                {filteredCategories.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => {
                      setForm({ ...form, category: cat });
                      setShowCategorySuggestions(false);
                    }}
                    className="w-full text-left px-3 py-2 text-sm text-admin-text-secondary hover:text-accent hover:bg-admin-hover transition-colors first:rounded-t-xl last:rounded-b-xl"
                  >
                    {cat}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Status */}
          <FormField
            label="Statut"
            name="status"
            type="select"
            value={form.status}
            onChange={(v) => setForm({ ...form, status: v })}
            options={[
              { value: "draft", label: "Brouillon" },
              { value: "published", label: "Publié" },
              { value: "archived", label: "Archivé" },
            ]}
          />

          {/* Tags with suggestions */}
          <div className="sm:col-span-2">
            <TagInput
              label="Tags"
              tags={form.tags}
              onChange={(tags) => setForm({ ...form, tags })}
              placeholder="Ajouter un tag..."
              suggestions={existingTags}
            />
          </div>

          {/* SEO Section */}
          <div className="sm:col-span-2 border-t border-admin-card-border pt-4 mt-2">
            <h3 className="text-sm font-semibold text-admin-text mb-3 flex items-center gap-2">
              <Search size={14} className="text-accent" />
              SEO — Référencement naturel
            </h3>
          </div>
          <FormField label="Titre SEO" name="seo_title" value={form.seo_title} onChange={(v) => setForm({ ...form, seo_title: v })} placeholder="Titre pour les moteurs de recherche (max 60 car.)" />
          <div className="sm:col-span-2">
            <FormField label="Description SEO" name="seo_description" type="textarea" value={form.seo_description} onChange={(v) => setForm({ ...form, seo_description: v })} placeholder="Description pour les moteurs de recherche (120-155 car.)" rows={2} />
            {form.seo_description && (
              <p className={`text-xs mt-1 ${form.seo_description.length >= 120 && form.seo_description.length <= 155 ? "text-emerald-400" : "text-amber-400"}`}>
                {form.seo_description.length}/155 caractères {form.seo_description.length >= 120 && form.seo_description.length <= 155 ? "(optimal)" : form.seo_description.length < 120 ? "(trop court)" : "(trop long)"}
              </p>
            )}
          </div>
          <div className="sm:col-span-2">
            <TagInput label="Mots-clés SEO" tags={form.seo_keywords} onChange={(tags) => setForm({ ...form, seo_keywords: tags })} placeholder="Ajouter un mot-clé SEO..." />
          </div>

          {/* SEA Section */}
          <div className="sm:col-span-2 border-t border-admin-card-border pt-4 mt-2">
            <h3 className="text-sm font-semibold text-admin-text mb-3 flex items-center gap-2">
              <Sparkles size={14} className="text-blue-400" />
              SEA — Publicité payante
            </h3>
          </div>
          <div className="sm:col-span-2">
            <TagInput
              label="Mots-clés publicitaires (SEA)"
              tags={form.sea_keywords}
              onChange={(tags) => setForm({ ...form, sea_keywords: tags })}
              placeholder="Ajouter un mot-clé publicitaire..."
            />
            <p className="text-xs text-admin-text-muted mt-1">
              Mots-clés ciblés pour vos campagnes Google Ads liées à cet article
            </p>
          </div>

          {/* AEO Section */}
          <div className="sm:col-span-2 border-t border-admin-card-border pt-4 mt-2">
            <h3 className="text-sm font-semibold text-admin-text mb-3 flex items-center gap-2">
              <Sparkles size={14} className="text-purple-400" />
              AEO — Optimisation pour moteurs de réponse IA
            </h3>
          </div>
          <div className="sm:col-span-2">
            <FormField
              label="Réponse AEO"
              name="aeo_answer"
              type="textarea"
              value={form.aeo_answer}
              onChange={(v) => setForm({ ...form, aeo_answer: v })}
              placeholder="Réponse concise (2-3 phrases) optimisée pour les assistants IA et featured snippets..."
              rows={3}
            />
            <p className="text-xs text-admin-text-muted mt-1">
              Cette réponse sera intégrée dans les données structurées (FAQ Schema) pour apparaître dans les résultats IA (ChatGPT, Perplexity, Google AI Overview)
            </p>
          </div>
        </div>
      </Modal>

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={showDelete}
        onClose={() => setShowDelete(false)}
        onConfirm={handleDelete}
        message={`Êtes-vous sûr de vouloir supprimer l'article "${selectedPost?.title}" ? Cette action est irréversible.`}
        loading={deleting}
      />
    </PageTransition>
  );
}
