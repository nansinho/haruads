"use client";

import { useState, useCallback } from "react";
import {
  Plus,
  Search,
  Tag,
  RefreshCw,
  Pencil,
  Trash2,
  Loader2,
  Star,
} from "lucide-react";
import PageHeader from "@/components/admin/PageHeader";
import PageTransition, { AnimatedSection } from "@/components/admin/PageTransition";
import Modal from "@/components/admin/Modal";
import ConfirmDialog from "@/components/admin/ConfirmDialog";
import FormField from "@/components/admin/FormField";
import TagInput from "@/components/admin/TagInput";
import { useToast } from "@/components/admin/Toast";
import { useAdminData } from "@/hooks/useAdminData";
import { slugify, formatPrice } from "@/lib/utils";
import type { Offer } from "@/types/database";

const filterTabs = [
  { key: "all", label: "Toutes" },
  { key: "popular", label: "Populaires" },
  { key: "active", label: "Actives" },
  { key: "inactive", label: "Inactives" },
];

const priceTypeLabels: Record<string, string> = {
  fixed: "Fixe",
  monthly: "/ mois",
  from: "À partir de",
  custom: "Sur mesure",
};

function formatPriceWithType(price: number, priceType: string): string {
  const formatted = formatPrice(price);
  switch (priceType) {
    case "monthly":
      return `${formatted} / mois`;
    case "from":
      return `À partir de ${formatted}`;
    case "custom":
      return "Sur mesure";
    default:
      return formatted;
  }
}

const emptyForm = {
  name: "",
  slug: "",
  description: "",
  price: 0,
  price_type: "fixed",
  features: [] as string[],
  is_popular: false,
  is_active: true,
  sort_order: 0,
};

export default function OffresAdminPage() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [editingOffer, setEditingOffer] = useState<Offer | null>(null);
  const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const { toast } = useToast();

  const { data: offers, loading, refetch } = useAdminData<Offer>("/api/admin/offers", {
    status: activeFilter,
    search: debouncedSearch,
  });

  const handleSearch = useCallback((value: string) => {
    setSearchQuery(value);
    const timeout = setTimeout(() => setDebouncedSearch(value), 300);
    return () => clearTimeout(timeout);
  }, []);

  const openCreate = () => {
    setEditingOffer(null);
    setForm(emptyForm);
    setShowModal(true);
  };

  const openEdit = (offer: Offer) => {
    setEditingOffer(offer);
    setForm({
      name: offer.name,
      slug: offer.slug,
      description: offer.description || "",
      price: offer.price,
      price_type: offer.price_type,
      features: offer.features || [],
      is_popular: offer.is_popular,
      is_active: offer.is_active,
      sort_order: offer.sort_order,
    });
    setShowModal(true);
  };

  const handleNameChange = (value: string) => {
    setForm((prev) => ({
      ...prev,
      name: value,
      ...(!editingOffer ? { slug: slugify(value) } : {}),
    }));
  };

  const handleSave = async () => {
    if (!form.name || form.price === undefined) {
      toast({ type: "error", message: "Nom et prix requis" });
      return;
    }
    setSaving(true);
    try {
      const url = editingOffer ? `/api/admin/offers/${editingOffer.id}` : "/api/admin/offers";
      const method = editingOffer ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || "Erreur");
      }
      toast({ type: "success", message: editingOffer ? "Offre mise à jour" : "Offre créée" });
      setShowModal(false);
      setForm(emptyForm);
      setEditingOffer(null);
      refetch();
    } catch (err) {
      toast({ type: "error", message: err instanceof Error ? err.message : "Erreur" });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedOffer) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/admin/offers/${selectedOffer.id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Erreur");
      toast({ type: "success", message: "Offre supprimée" });
      setShowDelete(false);
      setSelectedOffer(null);
      refetch();
    } catch {
      toast({ type: "error", message: "Erreur lors de la suppression" });
    } finally {
      setDeleting(false);
    }
  };

  return (
    <PageTransition className="space-y-6">
      <PageHeader
        icon={<Tag size={24} />}
        title="Offres & Tarifs"
        subtitle="Gérez vos offres commerciales, tarifs et formules."
        actions={
          <>
            <button onClick={refetch} className="flex items-center gap-2 px-4 py-2.5 bg-dark-2 border border-white/[0.06] rounded-full text-text-secondary hover:bg-white/[0.04] hover:text-text-primary transition-all text-sm">
              <RefreshCw size={16} />
              Actualiser
            </button>
            <button onClick={openCreate} className="flex items-center gap-2 px-4 py-2.5 bg-accent text-dark font-semibold rounded-full hover:bg-accent-hover shadow-lg shadow-accent/20 transition-all text-sm">
              <Plus size={16} />
              Nouvelle offre
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
              placeholder="Rechercher une offre..."
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
                    <th className="text-left px-6 py-4 text-[0.65rem] font-mono font-semibold text-text-muted uppercase tracking-wider">Nom</th>
                    <th className="text-left px-6 py-4 text-[0.65rem] font-mono font-semibold text-text-muted uppercase tracking-wider">Prix</th>
                    <th className="text-left px-6 py-4 text-[0.65rem] font-mono font-semibold text-text-muted uppercase tracking-wider">Type</th>
                    <th className="text-left px-6 py-4 text-[0.65rem] font-mono font-semibold text-text-muted uppercase tracking-wider">Features</th>
                    <th className="text-left px-6 py-4 text-[0.65rem] font-mono font-semibold text-text-muted uppercase tracking-wider">Populaire</th>
                    <th className="text-left px-6 py-4 text-[0.65rem] font-mono font-semibold text-text-muted uppercase tracking-wider">Actif</th>
                    <th className="text-right px-6 py-4 text-[0.65rem] font-mono font-semibold text-text-muted uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.06]">
                  {offers.length > 0 ? (
                    offers.map((offer) => (
                      <tr key={offer.id} className="hover:bg-white/[0.02] transition-colors">
                        <td className="px-6 py-4">
                          <div>
                            <span className="text-sm font-medium text-text-primary">{offer.name}</span>
                            <p className="text-xs text-text-muted font-mono mt-0.5">/{offer.slug}</p>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm font-medium text-text-primary">
                            {formatPriceWithType(offer.price, offer.price_type)}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm text-text-secondary">{priceTypeLabels[offer.price_type] || offer.price_type}</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="inline-flex px-2.5 py-1 bg-dark border border-white/[0.06] rounded-lg text-xs text-text-secondary">
                            {offer.features?.length || 0} feature{(offer.features?.length || 0) !== 1 ? "s" : ""}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          {offer.is_popular ? (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-yellow-500/15 text-yellow-400 border border-yellow-500/20 rounded-lg text-xs font-medium">
                              <Star size={12} />
                              Populaire
                            </span>
                          ) : (
                            <span className="inline-flex px-2.5 py-1 bg-gray-500/15 text-gray-400 border border-gray-500/20 rounded-lg text-xs font-medium">
                              -
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          {offer.is_active ? (
                            <span className="inline-flex px-2.5 py-1 bg-emerald-500/15 text-emerald-400 border border-emerald-500/20 rounded-lg text-xs font-medium">
                              Actif
                            </span>
                          ) : (
                            <span className="inline-flex px-2.5 py-1 bg-gray-500/15 text-gray-400 border border-gray-500/20 rounded-lg text-xs font-medium">
                              Inactif
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button onClick={() => openEdit(offer)} className="p-1.5 rounded-lg hover:bg-white/[0.04] text-text-muted hover:text-text-primary transition-all">
                              <Pencil size={16} />
                            </button>
                            <button onClick={() => { setSelectedOffer(offer); setShowDelete(true); }} className="p-1.5 rounded-lg hover:bg-white/[0.04] text-text-muted hover:text-red-400 transition-all">
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
                          <div className="w-12 h-12 rounded-2xl bg-dark border border-white/[0.06] flex items-center justify-center">
                            <Tag size={24} className="text-text-muted" />
                          </div>
                          <div>
                            <p className="text-text-muted font-medium">Aucune offre trouvée</p>
                            <p className="text-text-muted text-sm mt-1">Créez votre première offre commerciale</p>
                          </div>
                          <button onClick={openCreate} className="mt-2 inline-flex items-center gap-2 px-4 py-2 bg-accent-dim text-accent border border-accent/20 rounded-full hover:bg-accent/20 transition-all text-sm font-medium">
                            <Plus size={16} />
                            Créer votre première offre
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
        title={editingOffer ? "Modifier l'offre" : "Nouvelle offre"}
        description={editingOffer ? undefined : "Créer une nouvelle offre commerciale"}
        size="lg"
        footer={
          <>
            <button onClick={() => setShowModal(false)} className="px-4 py-2 text-sm text-text-secondary hover:text-text-primary border border-white/[0.06] rounded-full hover:bg-white/[0.04] transition-all">
              Annuler
            </button>
            <button onClick={handleSave} disabled={saving} className="px-4 py-2 text-sm font-semibold text-dark bg-accent rounded-full hover:bg-accent-hover transition-all disabled:opacity-50">
              {saving ? "Enregistrement..." : editingOffer ? "Mettre à jour" : "Créer l'offre"}
            </button>
          </>
        }
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField label="Nom" name="name" value={form.name} onChange={handleNameChange} required placeholder="Nom de l'offre" />
          <div>
            <FormField label="Slug" name="slug" value={form.slug} onChange={(v) => setForm({ ...form, slug: v })} placeholder="nom-de-loffre" />
            <p className="text-xs text-text-muted mt-1">Auto-généré depuis le nom</p>
          </div>
          <div className="sm:col-span-2">
            <FormField label="Description" name="description" type="textarea" value={form.description} onChange={(v) => setForm({ ...form, description: v })} placeholder="Description de l'offre..." rows={3} />
          </div>
          <FormField label="Prix" name="price" type="number" value={form.price} onChange={(v) => setForm({ ...form, price: parseFloat(v) || 0 })} required placeholder="0" />
          <FormField
            label="Type de prix"
            name="price_type"
            type="select"
            value={form.price_type}
            onChange={(v) => setForm({ ...form, price_type: v })}
            options={[
              { value: "fixed", label: "Fixe" },
              { value: "monthly", label: "Mensuel" },
              { value: "from", label: "À partir de" },
              { value: "custom", label: "Sur mesure" },
            ]}
          />
          <div className="sm:col-span-2">
            <TagInput label="Features" tags={form.features} onChange={(features) => setForm({ ...form, features })} placeholder="Ajouter une feature..." />
          </div>
          <FormField label="Ordre de tri" name="sort_order" type="number" value={form.sort_order} onChange={(v) => setForm({ ...form, sort_order: parseInt(v) || 0 })} placeholder="0" />
          <div />

          {/* Toggle: Populaire */}
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-text-secondary">Populaire</label>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={form.is_popular}
                onChange={(e) => setForm({ ...form, is_popular: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-dark border border-white/[0.08] rounded-full peer peer-checked:bg-accent/20 peer-checked:border-accent/30 after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-gray-400 after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full peer-checked:after:bg-accent" />
              <span className="ml-3 text-sm text-text-secondary">{form.is_popular ? "Oui" : "Non"}</span>
            </label>
          </div>

          {/* Toggle: Actif */}
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-text-secondary">Actif</label>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={form.is_active}
                onChange={(e) => setForm({ ...form, is_active: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-dark border border-white/[0.08] rounded-full peer peer-checked:bg-accent/20 peer-checked:border-accent/30 after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-gray-400 after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full peer-checked:after:bg-accent" />
              <span className="ml-3 text-sm text-text-secondary">{form.is_active ? "Oui" : "Non"}</span>
            </label>
          </div>
        </div>
      </Modal>

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={showDelete}
        onClose={() => setShowDelete(false)}
        onConfirm={handleDelete}
        message={`Êtes-vous sûr de vouloir supprimer l'offre "${selectedOffer?.name}" ? Cette action est irréversible.`}
        loading={deleting}
      />
    </PageTransition>
  );
}
