"use client";

import { useState, useCallback, useEffect } from "react";
import {
  Plus,
  Search,
  Globe,
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
import { useToast } from "@/components/admin/Toast";
import { useAdminData } from "@/hooks/useAdminData";
import { formatDateTime } from "@/lib/utils";
import type { LocalizedService } from "@/types/database";

const filterTabs = [
  { key: "all", label: "Tous" },
  { key: "active", label: "Actifs" },
  { key: "inactive", label: "Inactifs" },
];

const emptyForm = {
  service_id: "",
  city_id: "",
  custom_title: "",
  custom_description: "",
  custom_content: "",
  seo_title: "",
  seo_description: "",
  is_active: true,
};

// Extended type to handle Supabase joined fields
interface LocalizedServiceWithJoins extends LocalizedService {
  services?: { title: string } | null;
  cities?: { name: string } | null;
}

export default function ServicesLocalisesAdminPage() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [editingItem, setEditingItem] = useState<LocalizedServiceWithJoins | null>(null);
  const [selectedItem, setSelectedItem] = useState<LocalizedServiceWithJoins | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const { toast } = useToast();

  // Dropdown data
  const [cities, setCities] = useState<{ id: string; name: string }[]>([]);
  const [services, setServices] = useState<{ id: string; name: string }[]>([]);

  useEffect(() => {
    fetch("/api/admin/cities").then((r) => r.json()).then((d) => setCities(d.data || []));
    fetch("/api/admin/offers").then((r) => r.json()).then((d) => setServices((d.data || []).map((o: any) => ({ id: o.id, name: o.name }))));
  }, []);

  const { data: items, loading, refetch } = useAdminData<LocalizedServiceWithJoins>("/api/admin/localized-services", {
    status: activeFilter,
    search: debouncedSearch,
  });

  const handleSearch = useCallback((value: string) => {
    setSearchQuery(value);
    const timeout = setTimeout(() => setDebouncedSearch(value), 300);
    return () => clearTimeout(timeout);
  }, []);

  const openCreate = () => {
    setEditingItem(null);
    setForm(emptyForm);
    setShowModal(true);
  };

  const openEdit = (item: LocalizedServiceWithJoins) => {
    setEditingItem(item);
    setForm({
      service_id: item.service_id,
      city_id: item.city_id,
      custom_title: item.custom_title || "",
      custom_description: item.custom_description || "",
      custom_content: item.custom_content || "",
      seo_title: item.seo_title || "",
      seo_description: item.seo_description || "",
      is_active: item.is_active,
    });
    setShowModal(true);
  };

  const handleSave = async () => {
    if (!form.service_id || !form.city_id) {
      toast({ type: "error", message: "Service et ville requis" });
      return;
    }
    setSaving(true);
    try {
      const url = editingItem ? `/api/admin/localized-services/${editingItem.id}` : "/api/admin/localized-services";
      const method = editingItem ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || "Erreur");
      }
      toast({ type: "success", message: editingItem ? "Service localisé mis à jour" : "Service localisé créé" });
      setShowModal(false);
      setForm(emptyForm);
      setEditingItem(null);
      refetch();
    } catch (err) {
      toast({ type: "error", message: err instanceof Error ? err.message : "Erreur" });
    } finally {
      setSaving(false);
    }
  };

  const toggleActive = async (item: LocalizedServiceWithJoins) => {
    try {
      const res = await fetch(`/api/admin/localized-services/${item.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ is_active: !item.is_active }),
      });
      if (!res.ok) throw new Error("Erreur");
      toast({ type: "success", message: item.is_active ? "Service localisé désactivé" : "Service localisé activé" });
      refetch();
    } catch {
      toast({ type: "error", message: "Erreur lors de la mise à jour" });
    }
  };

  const handleDelete = async () => {
    if (!selectedItem) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/admin/localized-services/${selectedItem.id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Erreur");
      toast({ type: "success", message: "Service localisé supprimé" });
      setShowDelete(false);
      setSelectedItem(null);
      refetch();
    } catch {
      toast({ type: "error", message: "Erreur lors de la suppression" });
    } finally {
      setDeleting(false);
    }
  };

  const getServiceName = (item: LocalizedServiceWithJoins): string => {
    return item.services?.title || item.service_name || "-";
  };

  const getCityName = (item: LocalizedServiceWithJoins): string => {
    return item.cities?.name || item.city_name || "-";
  };

  return (
    <PageTransition className="space-y-6">
      <PageHeader
        icon={<Globe size={24} />}
        title="Services Localisés"
        subtitle="Associez vos services aux villes pour le SEO local."
        actions={
          <>
            <button onClick={refetch} className="flex items-center gap-2 px-4 py-2.5 bg-dark-2 border border-border-dark rounded-full text-text-secondary hover:bg-dark-3 hover:text-text-primary transition-all text-sm">
              <RefreshCw size={16} />
              Actualiser
            </button>
            <button onClick={openCreate} className="flex items-center gap-2 px-4 py-2.5 bg-accent text-dark font-semibold rounded-full hover:bg-accent-hover shadow-lg shadow-accent/20 transition-all text-sm">
              <Plus size={16} />
              Associer un service
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
              placeholder="Rechercher un service localisé..."
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
                    <th className="text-left px-6 py-4 text-[0.65rem] font-mono font-semibold text-text-muted uppercase tracking-wider">Service</th>
                    <th className="text-left px-6 py-4 text-[0.65rem] font-mono font-semibold text-text-muted uppercase tracking-wider">Ville</th>
                    <th className="text-left px-6 py-4 text-[0.65rem] font-mono font-semibold text-text-muted uppercase tracking-wider">Titre Custom</th>
                    <th className="text-left px-6 py-4 text-[0.65rem] font-mono font-semibold text-text-muted uppercase tracking-wider">SEO Titre</th>
                    <th className="text-left px-6 py-4 text-[0.65rem] font-mono font-semibold text-text-muted uppercase tracking-wider">Actif</th>
                    <th className="text-right px-6 py-4 text-[0.65rem] font-mono font-semibold text-text-muted uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.06]">
                  {items.length > 0 ? (
                    items.map((item) => (
                      <tr key={item.id} className="hover:bg-dark-3 transition-colors">
                        <td className="px-6 py-4">
                          <span className="text-sm font-medium text-text-primary">{getServiceName(item)}</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm text-text-secondary">{getCityName(item)}</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm text-text-secondary">{item.custom_title || "-"}</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm text-text-muted max-w-xs truncate block">
                            {item.seo_title || "-"}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <button onClick={() => toggleActive(item)}>
                            {item.is_active ? (
                              <span className="inline-flex px-2.5 py-1 bg-emerald-500/15 text-emerald-400 border border-emerald-500/20 rounded-lg text-xs font-medium cursor-pointer hover:bg-emerald-500/25 transition-all">
                                Actif
                              </span>
                            ) : (
                              <span className="inline-flex px-2.5 py-1 bg-gray-500/15 text-gray-400 border border-gray-500/20 rounded-lg text-xs font-medium cursor-pointer hover:bg-gray-500/25 transition-all">
                                Inactif
                              </span>
                            )}
                          </button>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button onClick={() => openEdit(item)} className="p-1.5 rounded-lg hover:bg-dark-3 text-text-muted hover:text-text-primary transition-all">
                              <Pencil size={16} />
                            </button>
                            <button onClick={() => { setSelectedItem(item); setShowDelete(true); }} className="p-1.5 rounded-lg hover:bg-dark-3 text-text-muted hover:text-red-400 transition-all">
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
                            <Globe size={24} className="text-text-muted" />
                          </div>
                          <div>
                            <p className="text-text-muted font-medium">Aucun service localisé trouvé</p>
                            <p className="text-text-muted text-sm mt-1">Associez un service à une ville pour le SEO local</p>
                          </div>
                          <button onClick={openCreate} className="mt-2 inline-flex items-center gap-2 px-4 py-2 bg-accent-dim text-accent border border-accent/20 rounded-full hover:bg-accent/20 transition-all text-sm font-medium">
                            <Plus size={16} />
                            Associer votre premier service
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
        title={editingItem ? "Modifier le service localisé" : "Nouveau service localisé"}
        description={editingItem ? undefined : "Associer un service à une ville"}
        size="lg"
        footer={
          <>
            <button onClick={() => setShowModal(false)} className="px-4 py-2 text-sm text-text-secondary hover:text-text-primary border border-border-dark rounded-full hover:bg-dark-3 transition-all">
              Annuler
            </button>
            <button onClick={handleSave} disabled={saving} className="px-4 py-2 text-sm font-semibold text-dark bg-accent rounded-full hover:bg-accent-hover transition-all disabled:opacity-50">
              {saving ? "Enregistrement..." : editingItem ? "Mettre à jour" : "Créer l'association"}
            </button>
          </>
        }
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField
            label="Service"
            name="service_id"
            type="select"
            value={form.service_id}
            onChange={(v) => setForm({ ...form, service_id: v })}
            options={services.map((s) => ({ value: s.id, label: s.name }))}
            required
          />
          <FormField
            label="Ville"
            name="city_id"
            type="select"
            value={form.city_id}
            onChange={(v) => setForm({ ...form, city_id: v })}
            options={cities.map((c) => ({ value: c.id, label: c.name }))}
            required
          />
          <div className="sm:col-span-2">
            <FormField label="Titre personnalisé" name="custom_title" value={form.custom_title} onChange={(v) => setForm({ ...form, custom_title: v })} placeholder="Titre personnalisé pour cette combinaison" />
          </div>
          <div className="sm:col-span-2">
            <FormField label="Description personnalisée" name="custom_description" type="textarea" value={form.custom_description} onChange={(v) => setForm({ ...form, custom_description: v })} placeholder="Description personnalisée..." rows={3} />
          </div>
          <div className="sm:col-span-2">
            <FormField label="Contenu personnalisé" name="custom_content" type="textarea" value={form.custom_content} onChange={(v) => setForm({ ...form, custom_content: v })} placeholder="Contenu additionnel..." rows={4} />
          </div>
          <FormField label="Titre SEO" name="seo_title" value={form.seo_title} onChange={(v) => setForm({ ...form, seo_title: v })} placeholder="Titre pour les moteurs de recherche" />
          <FormField label="Description SEO" name="seo_description" value={form.seo_description} onChange={(v) => setForm({ ...form, seo_description: v })} placeholder="Description meta" />

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
        message={`Êtes-vous sûr de vouloir supprimer le service localisé "${selectedItem ? getServiceName(selectedItem) : ""} - ${selectedItem ? getCityName(selectedItem) : ""}" ? Cette action est irréversible.`}
        loading={deleting}
      />
    </PageTransition>
  );
}
