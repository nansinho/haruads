"use client";

import { useState, useCallback, useEffect } from "react";
import {
  Plus,
  DollarSign,
  Search,
  Percent,
  Tag,
  Calendar,
  CheckCircle,
  XCircle,
  Pencil,
  Trash2,
  Loader2,
  RefreshCw,
} from "lucide-react";
import PageHeader from "@/components/admin/PageHeader";
import PageTransition, { AnimatedSection } from "@/components/admin/PageTransition";
import Modal from "@/components/admin/Modal";
import ConfirmDialog from "@/components/admin/ConfirmDialog";
import FormField from "@/components/admin/FormField";
import { useToast } from "@/components/admin/Toast";
import { useAdminData } from "@/hooks/useAdminData";
import { formatDate } from "@/lib/utils";
import type { DynamicPricing, Offer } from "@/types/database";

interface PricingForm {
  name: string;
  offer_id: string;
  base_price: string;
  current_price: string;
  discount_percent: string;
  valid_from: string;
  valid_until: string;
  is_active: boolean;
}

const defaultForm: PricingForm = {
  name: "",
  offer_id: "",
  base_price: "",
  current_price: "",
  discount_percent: "0",
  valid_from: "",
  valid_until: "",
  is_active: true,
};

export default function PrixPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [showModal, setShowModal] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [editing, setEditing] = useState(false);
  const [selectedItem, setSelectedItem] = useState<DynamicPricing | null>(null);
  const [form, setForm] = useState<PricingForm>(defaultForm);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [offers, setOffers] = useState<Offer[]>([]);

  const { toast } = useToast();

  const { data: prices, loading, refetch } = useAdminData<DynamicPricing>("/api/admin/pricing", {
    status: activeFilter,
    search: debouncedSearch,
  });

  // Fetch offers for the select dropdown
  useEffect(() => {
    fetch("/api/admin/offers")
      .then((res) => res.json())
      .then((json) => {
        const list = Array.isArray(json) ? json : json.data || [];
        setOffers(list);
      })
      .catch(() => {});
  }, []);

  const handleSearch = useCallback((value: string) => {
    setSearchQuery(value);
    const timeout = setTimeout(() => setDebouncedSearch(value), 300);
    return () => clearTimeout(timeout);
  }, []);

  const openCreate = () => {
    setEditing(false);
    setSelectedItem(null);
    setForm(defaultForm);
    setShowModal(true);
  };

  const openEdit = (item: DynamicPricing) => {
    setEditing(true);
    setSelectedItem(item);
    setForm({
      name: item.name,
      offer_id: item.offer_id || "",
      base_price: String(item.base_price),
      current_price: String(item.current_price),
      discount_percent: String(item.discount_percent),
      valid_from: item.valid_from ? item.valid_from.slice(0, 10) : "",
      valid_until: item.valid_until ? item.valid_until.slice(0, 10) : "",
      is_active: item.is_active,
    });
    setShowModal(true);
  };

  const updatePrice = (field: "base_price" | "current_price", value: string) => {
    const newForm = { ...form, [field]: value };
    const base = parseFloat(field === "base_price" ? value : newForm.base_price);
    const current = parseFloat(field === "current_price" ? value : newForm.current_price);
    if (base > 0 && current >= 0) {
      newForm.discount_percent = Math.max(0, ((base - current) / base) * 100).toFixed(0);
    }
    setForm(newForm);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const url = editing ? `/api/admin/pricing/${selectedItem!.id}` : "/api/admin/pricing";
      const payload = {
        name: form.name,
        offer_id: form.offer_id || null,
        base_price: parseFloat(form.base_price) || 0,
        current_price: parseFloat(form.current_price) || 0,
        discount_percent: parseFloat(form.discount_percent) || 0,
        valid_from: form.valid_from || null,
        valid_until: form.valid_until || null,
        is_active: form.is_active,
      };
      const res = await fetch(url, {
        method: editing ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Erreur");
      toast({ type: "success", message: editing ? "Prix modifie" : "Prix cree" });
      setShowModal(false);
      refetch();
    } catch {
      toast({ type: "error", message: "Erreur lors de l'enregistrement" });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedItem) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/admin/pricing/${selectedItem.id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Erreur");
      toast({ type: "success", message: "Prix supprime" });
      setShowDelete(false);
      setSelectedItem(null);
      refetch();
    } catch {
      toast({ type: "error", message: "Erreur lors de la suppression" });
    } finally {
      setDeleting(false);
    }
  };

  // Stats
  const activeCount = prices.filter((p) => p.is_active).length;
  const activeWithDiscount = prices.filter((p) => p.is_active && p.discount_percent > 0);
  const avgDiscount =
    activeWithDiscount.length > 0
      ? activeWithDiscount.reduce((acc, p) => acc + p.discount_percent, 0) / activeWithDiscount.length
      : 0;

  const filterTabs = [
    { key: "all", label: "Tous" },
    { key: "active", label: "Actifs" },
    { key: "inactive", label: "Inactifs" },
  ];

  return (
    <PageTransition className="space-y-8">
      <PageHeader
        icon={<DollarSign size={24} />}
        title="Prix Dynamiques"
        subtitle="Gerez les prix et promotions"
        actions={
          <>
            <button
              onClick={refetch}
              className="flex items-center gap-2 px-4 py-2.5 bg-dark-2 border border-white/[0.06] rounded-full text-text-secondary hover:bg-white/[0.04] hover:text-text-primary transition-all text-sm"
            >
              <RefreshCw size={16} />
              Actualiser
            </button>
            <button
              onClick={openCreate}
              className="flex items-center gap-2 px-4 py-2.5 bg-accent text-dark font-semibold rounded-full hover:bg-accent-hover shadow-lg shadow-accent/20 transition-all text-sm"
            >
              <Plus size={16} />
              Nouveau prix
            </button>
          </>
        }
      />

      {/* Stats */}
      <AnimatedSection>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-dark-2 border border-white/[0.06] rounded-2xl p-5">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-accent/10 rounded-xl">
                <Tag size={20} className="text-accent" />
              </div>
              <div>
                <p className="text-sm text-text-muted">Total prix configures</p>
                <p className="text-2xl font-bold text-text-primary">{prices.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-dark-2 border border-white/[0.06] rounded-2xl p-5">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-emerald-500/10 rounded-xl">
                <CheckCircle size={20} className="text-emerald-400" />
              </div>
              <div>
                <p className="text-sm text-text-muted">Promotions actives</p>
                <p className="text-2xl font-bold text-text-primary">{activeCount}</p>
              </div>
            </div>
          </div>
          <div className="bg-dark-2 border border-white/[0.06] rounded-2xl p-5">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-orange-500/10 rounded-xl">
                <Percent size={20} className="text-orange-400" />
              </div>
              <div>
                <p className="text-sm text-text-muted">Reduction moyenne</p>
                <p className="text-2xl font-bold text-text-primary">{avgDiscount.toFixed(0)}%</p>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Filters */}
      <AnimatedSection>
        <div className="bg-dark-2 border border-white/[0.06] rounded-2xl p-4 space-y-4">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
            <input
              type="text"
              placeholder="Rechercher un prix..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-dark border border-white/[0.06] rounded-full text-sm text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent/50"
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
        <div className="bg-dark-2 border border-white/[0.06] rounded-2xl p-6">
          <h2 className="text-lg font-semibold text-text-primary mb-6">Liste des prix</h2>

          {loading ? (
            <div className="flex justify-center py-16">
              <Loader2 size={24} className="text-accent animate-spin" />
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/[0.06]">
                    <th className="text-left py-3 px-4 text-[0.65rem] font-mono font-semibold text-text-muted uppercase tracking-wider">
                      Nom
                    </th>
                    <th className="text-left py-3 px-4 text-[0.65rem] font-mono font-semibold text-text-muted uppercase tracking-wider">
                      Offre
                    </th>
                    <th className="text-right py-3 px-4 text-[0.65rem] font-mono font-semibold text-text-muted uppercase tracking-wider">
                      Prix de base
                    </th>
                    <th className="text-right py-3 px-4 text-[0.65rem] font-mono font-semibold text-text-muted uppercase tracking-wider">
                      Prix actuel
                    </th>
                    <th className="text-center py-3 px-4 text-[0.65rem] font-mono font-semibold text-text-muted uppercase tracking-wider">
                      Reduction %
                    </th>
                    <th className="text-left py-3 px-4 text-[0.65rem] font-mono font-semibold text-text-muted uppercase tracking-wider">
                      Valide du
                    </th>
                    <th className="text-left py-3 px-4 text-[0.65rem] font-mono font-semibold text-text-muted uppercase tracking-wider">
                      Valide au
                    </th>
                    <th className="text-center py-3 px-4 text-[0.65rem] font-mono font-semibold text-text-muted uppercase tracking-wider">
                      Actif
                    </th>
                    <th className="text-right py-3 px-4 text-[0.65rem] font-mono font-semibold text-text-muted uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.06]">
                  {prices.length > 0 ? (
                    prices.map((price) => (
                      <tr
                        key={price.id}
                        className="hover:bg-white/[0.02] transition-colors"
                      >
                        <td className="py-3.5 px-4">
                          <span className="text-sm text-text-primary font-medium">
                            {price.name}
                          </span>
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="text-sm text-text-secondary">
                            {price.offer_name || "-"}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <span className="text-sm text-text-muted">
                            {price.base_price.toLocaleString("fr-FR")} &euro;
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <span className="text-sm text-text-primary font-medium">
                            {price.current_price.toLocaleString("fr-FR")} &euro;
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-center">
                          {price.discount_percent > 0 ? (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full text-xs font-medium">
                              <Percent size={10} />
                              -{price.discount_percent}%
                            </span>
                          ) : (
                            <span className="text-sm text-text-muted">-</span>
                          )}
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="text-sm text-text-muted flex items-center gap-1.5">
                            <Calendar size={12} className="text-text-muted" />
                            {formatDate(price.valid_from)}
                          </span>
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="text-sm text-text-muted flex items-center gap-1.5">
                            <Calendar size={12} className="text-text-muted" />
                            {formatDate(price.valid_until)}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-center">
                          {price.is_active ? (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full text-xs font-medium">
                              <CheckCircle size={12} />
                              Actif
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-red-500/10 text-red-400 border border-red-500/20 rounded-full text-xs font-medium">
                              <XCircle size={12} />
                              Inactif
                            </span>
                          )}
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <div className="flex items-center justify-end gap-1">
                            <button
                              onClick={() => openEdit(price)}
                              className="p-1.5 rounded-lg hover:bg-white/[0.04] text-text-muted hover:text-accent transition-colors"
                              title="Modifier"
                            >
                              <Pencil size={14} />
                            </button>
                            <button
                              onClick={() => {
                                setSelectedItem(price);
                                setShowDelete(true);
                              }}
                              className="p-1.5 rounded-lg hover:bg-white/[0.04] text-text-muted hover:text-red-400 transition-colors"
                              title="Supprimer"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={9} className="text-center py-12">
                        <DollarSign size={40} className="mx-auto text-text-muted mb-3" />
                        <p className="text-text-muted">Aucun prix trouve</p>
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
        title={editing ? "Modifier le prix" : "Nouveau prix"}
        size="lg"
        footer={
          <>
            <button
              onClick={() => setShowModal(false)}
              className="px-4 py-2 text-sm text-text-secondary hover:text-text-primary border border-white/[0.06] rounded-full hover:bg-white/[0.04] transition-all"
            >
              Annuler
            </button>
            <button
              onClick={handleSave}
              disabled={saving || !form.name}
              className="px-4 py-2 text-sm font-semibold text-dark bg-accent rounded-full hover:bg-accent-hover transition-all disabled:opacity-50"
            >
              {saving ? (
                <span className="flex items-center gap-2">
                  <Loader2 size={14} className="animate-spin" />
                  Enregistrement...
                </span>
              ) : editing ? (
                "Modifier"
              ) : (
                "Creer"
              )}
            </button>
          </>
        }
      >
        <div className="space-y-4">
          <FormField
            label="Nom"
            name="name"
            value={form.name}
            onChange={(v) => setForm({ ...form, name: v })}
            required
            placeholder="Ex: Promo Lancement Site Vitrine"
          />
          <FormField
            label="Offre"
            name="offer_id"
            type="select"
            value={form.offer_id}
            onChange={(v) => setForm({ ...form, offer_id: v })}
            options={offers.map((o) => ({ value: o.id, label: o.name }))}
          />
          <div className="grid grid-cols-2 gap-4">
            <FormField
              label="Prix de base (EUR)"
              name="base_price"
              type="number"
              value={form.base_price}
              onChange={(v) => updatePrice("base_price", v)}
              required
              placeholder="0"
            />
            <FormField
              label="Prix actuel (EUR)"
              name="current_price"
              type="number"
              value={form.current_price}
              onChange={(v) => updatePrice("current_price", v)}
              required
              placeholder="0"
            />
          </div>
          <FormField
            label="Reduction (%)"
            name="discount_percent"
            type="number"
            value={form.discount_percent}
            onChange={(v) => setForm({ ...form, discount_percent: v })}
            placeholder="0"
          />
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-text-secondary">
                Valide du
              </label>
              <input
                type="date"
                value={form.valid_from}
                onChange={(e) => setForm({ ...form, valid_from: e.target.value })}
                className="w-full px-4 py-2.5 bg-dark border border-white/[0.08] rounded-xl text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent/30 transition-all"
              />
            </div>
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-text-secondary">
                Valide au
              </label>
              <input
                type="date"
                value={form.valid_until}
                onChange={(e) => setForm({ ...form, valid_until: e.target.value })}
                className="w-full px-4 py-2.5 bg-dark border border-white/[0.08] rounded-xl text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent/30 transition-all"
              />
            </div>
          </div>
          <div className="flex items-center justify-between p-4 bg-dark rounded-xl border border-white/[0.06]">
            <div>
              <p className="text-sm font-medium text-text-primary">Actif</p>
              <p className="text-xs text-text-muted">Activer ou desactiver ce prix</p>
            </div>
            <button
              type="button"
              onClick={() => setForm({ ...form, is_active: !form.is_active })}
              className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-accent/50 ${
                form.is_active ? "bg-accent" : "bg-white/10"
              }`}
            >
              <span
                className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-md transition-transform duration-200 ${
                  form.is_active ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>
        </div>
      </Modal>

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={showDelete}
        onClose={() => setShowDelete(false)}
        onConfirm={handleDelete}
        message={`Etes-vous sur de vouloir supprimer le prix "${selectedItem?.name}" ? Cette action est irreversible.`}
        loading={deleting}
      />
    </PageTransition>
  );
}
