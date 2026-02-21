"use client";

import { useState, useCallback } from "react";
import {
  Plus,
  Megaphone,
  Search,
  Mail,
  Users,
  Send,
  Eye,
  MousePointerClick,
  CheckCircle,
  XCircle,
  Clock,
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
import { formatDateTime } from "@/lib/utils";
import type { NewsletterSubscriber, NewsletterCampaign } from "@/types/database";

function SubscriberStatusBadge({ status }: { status: NewsletterSubscriber["status"] }) {
  const config = {
    active: {
      label: "Actif",
      className: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
      icon: <CheckCircle size={12} />,
    },
    unsubscribed: {
      label: "Desabonne",
      className: "bg-red-500/10 text-red-400 border-red-500/20",
      icon: <XCircle size={12} />,
    },
    bounced: {
      label: "Rebondi",
      className: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
      icon: <Clock size={12} />,
    },
  };

  const { label, className, icon } = config[status] || config.active;

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${className}`}
    >
      {icon}
      {label}
    </span>
  );
}

function CampaignStatusBadge({ status }: { status: NewsletterCampaign["status"] }) {
  const config = {
    draft: {
      label: "Brouillon",
      className: "bg-gray-500/10 text-gray-400 border-gray-500/20",
    },
    sent: {
      label: "Envoyee",
      className: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    },
    scheduled: {
      label: "Planifiee",
      className: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    },
    sending: {
      label: "En cours",
      className: "bg-orange-500/10 text-orange-400 border-orange-500/20",
    },
  };

  const { label, className } = config[status] || config.draft;

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${className}`}
    >
      {label}
    </span>
  );
}

interface SubscriberForm {
  email: string;
  name: string;
  source: string;
  status: string;
}

interface CampaignForm {
  subject: string;
  content: string;
  status: string;
}

const defaultSubscriberForm: SubscriberForm = {
  email: "",
  name: "",
  source: "Site web",
  status: "active",
};

const defaultCampaignForm: CampaignForm = {
  subject: "",
  content: "",
  status: "draft",
};

export default function NewsletterPage() {
  const [activeTab, setActiveTab] = useState<"abonnes" | "campagnes">("abonnes");
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  // Subscriber state
  const [showSubModal, setShowSubModal] = useState(false);
  const [showSubDelete, setShowSubDelete] = useState(false);
  const [editingSub, setEditingSub] = useState(false);
  const [selectedSub, setSelectedSub] = useState<NewsletterSubscriber | null>(null);
  const [subForm, setSubForm] = useState<SubscriberForm>(defaultSubscriberForm);
  const [savingSub, setSavingSub] = useState(false);
  const [deletingSub, setDeletingSub] = useState(false);

  // Campaign state
  const [showCampModal, setShowCampModal] = useState(false);
  const [showCampDelete, setShowCampDelete] = useState(false);
  const [editingCamp, setEditingCamp] = useState(false);
  const [selectedCamp, setSelectedCamp] = useState<NewsletterCampaign | null>(null);
  const [campForm, setCampForm] = useState<CampaignForm>(defaultCampaignForm);
  const [savingCamp, setSavingCamp] = useState(false);
  const [deletingCamp, setDeletingCamp] = useState(false);

  const { toast } = useToast();

  const { data: subscribers, loading: loadingSubs, refetch: refetchSubs } = useAdminData<NewsletterSubscriber>(
    "/api/admin/newsletter/subscribers",
    { search: debouncedSearch }
  );

  const { data: campaigns, loading: loadingCamps, refetch: refetchCamps } = useAdminData<NewsletterCampaign>(
    "/api/admin/newsletter/campaigns",
    { search: debouncedSearch }
  );

  const handleSearch = useCallback((value: string) => {
    setSearchQuery(value);
    const timeout = setTimeout(() => setDebouncedSearch(value), 300);
    return () => clearTimeout(timeout);
  }, []);

  // --- Subscriber CRUD ---
  const openCreateSub = () => {
    setEditingSub(false);
    setSelectedSub(null);
    setSubForm(defaultSubscriberForm);
    setShowSubModal(true);
  };

  const openEditSub = (sub: NewsletterSubscriber) => {
    setEditingSub(true);
    setSelectedSub(sub);
    setSubForm({
      email: sub.email,
      name: sub.name || "",
      source: sub.source,
      status: sub.status,
    });
    setShowSubModal(true);
  };

  const handleSaveSub = async () => {
    setSavingSub(true);
    try {
      const url = editingSub
        ? `/api/admin/newsletter/subscribers/${selectedSub!.id}`
        : "/api/admin/newsletter/subscribers";
      const res = await fetch(url, {
        method: editingSub ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(subForm),
      });
      if (!res.ok) throw new Error("Erreur");
      toast({ type: "success", message: editingSub ? "Abonne modifie" : "Abonne ajoute" });
      setShowSubModal(false);
      refetchSubs();
    } catch {
      toast({ type: "error", message: "Erreur lors de l'enregistrement" });
    } finally {
      setSavingSub(false);
    }
  };

  const handleDeleteSub = async () => {
    if (!selectedSub) return;
    setDeletingSub(true);
    try {
      const res = await fetch(`/api/admin/newsletter/subscribers/${selectedSub.id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Erreur");
      toast({ type: "success", message: "Abonne supprime" });
      setShowSubDelete(false);
      setSelectedSub(null);
      refetchSubs();
    } catch {
      toast({ type: "error", message: "Erreur lors de la suppression" });
    } finally {
      setDeletingSub(false);
    }
  };

  // --- Campaign CRUD ---
  const openCreateCamp = () => {
    setEditingCamp(false);
    setSelectedCamp(null);
    setCampForm(defaultCampaignForm);
    setShowCampModal(true);
  };

  const openEditCamp = (camp: NewsletterCampaign) => {
    setEditingCamp(true);
    setSelectedCamp(camp);
    setCampForm({
      subject: camp.subject,
      content: camp.content,
      status: camp.status,
    });
    setShowCampModal(true);
  };

  const handleSaveCamp = async () => {
    setSavingCamp(true);
    try {
      const url = editingCamp
        ? `/api/admin/newsletter/campaigns/${selectedCamp!.id}`
        : "/api/admin/newsletter/campaigns";
      const res = await fetch(url, {
        method: editingCamp ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(campForm),
      });
      if (!res.ok) throw new Error("Erreur");
      toast({ type: "success", message: editingCamp ? "Campagne modifiee" : "Campagne creee" });
      setShowCampModal(false);
      refetchCamps();
    } catch {
      toast({ type: "error", message: "Erreur lors de l'enregistrement" });
    } finally {
      setSavingCamp(false);
    }
  };

  const handleDeleteCamp = async () => {
    if (!selectedCamp) return;
    setDeletingCamp(true);
    try {
      const res = await fetch(`/api/admin/newsletter/campaigns/${selectedCamp.id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Erreur");
      toast({ type: "success", message: "Campagne supprimee" });
      setShowCampDelete(false);
      setSelectedCamp(null);
      refetchCamps();
    } catch {
      toast({ type: "error", message: "Erreur lors de la suppression" });
    } finally {
      setDeletingCamp(false);
    }
  };

  // --- Stats ---
  const totalActive = subscribers.filter((s) => s.status === "active").length;
  const sentCampaigns = campaigns.filter((c) => c.status === "sent");
  const totalSent = sentCampaigns.reduce((acc, c) => acc + c.sent_count, 0);
  const totalOpened = sentCampaigns.reduce((acc, c) => acc + c.open_count, 0);
  const avgOpenRate = totalSent > 0 ? ((totalOpened / totalSent) * 100).toFixed(1) : "0";

  return (
    <PageTransition className="space-y-8">
      <PageHeader
        icon={<Megaphone size={24} />}
        title="Newsletter"
        subtitle="Gerez vos abonnes et campagnes newsletter"
        actions={
          <button
            onClick={activeTab === "abonnes" ? openCreateSub : openCreateCamp}
            className="flex items-center gap-2 px-4 py-2.5 bg-accent text-dark font-semibold rounded-full hover:bg-accent-hover shadow-lg shadow-accent/20 transition-all text-sm"
          >
            <Plus size={16} />
            {activeTab === "abonnes" ? "Nouvel abonne" : "Nouvelle campagne"}
          </button>
        }
      />

      {/* Stats */}
      <AnimatedSection>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-dark-2 border border-border-dark rounded-2xl p-5">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-accent/10 rounded-xl">
                <Users size={20} className="text-accent" />
              </div>
              <div>
                <p className="text-sm text-text-muted">Total abonnes</p>
                <p className="text-2xl font-bold text-text-primary">{subscribers.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-dark-2 border border-border-dark rounded-2xl p-5">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-emerald-500/10 rounded-xl">
                <CheckCircle size={20} className="text-emerald-400" />
              </div>
              <div>
                <p className="text-sm text-text-muted">Actifs</p>
                <p className="text-2xl font-bold text-text-primary">{totalActive}</p>
              </div>
            </div>
          </div>
          <div className="bg-dark-2 border border-border-dark rounded-2xl p-5">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-blue-500/10 rounded-xl">
                <Send size={20} className="text-blue-400" />
              </div>
              <div>
                <p className="text-sm text-text-muted">Campagnes envoyees</p>
                <p className="text-2xl font-bold text-text-primary">{sentCampaigns.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-dark-2 border border-border-dark rounded-2xl p-5">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-orange-500/10 rounded-xl">
                <Eye size={20} className="text-orange-400" />
              </div>
              <div>
                <p className="text-sm text-text-muted">Taux d&apos;ouverture moy.</p>
                <p className="text-2xl font-bold text-text-primary">{avgOpenRate}%</p>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Tabs */}
      <AnimatedSection>
        <div className="flex gap-2 border-b border-border-dark pb-0">
          <button
            onClick={() => setActiveTab("abonnes")}
            className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === "abonnes"
                ? "border-accent text-accent"
                : "border-transparent text-text-secondary hover:text-text-primary"
            }`}
          >
            <span className="flex items-center gap-2">
              <Users size={16} />
              Abonnes
            </span>
          </button>
          <button
            onClick={() => setActiveTab("campagnes")}
            className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === "campagnes"
                ? "border-accent text-accent"
                : "border-transparent text-text-secondary hover:text-text-primary"
            }`}
          >
            <span className="flex items-center gap-2">
              <Mail size={16} />
              Campagnes
            </span>
          </button>
        </div>
      </AnimatedSection>

      {/* Abonnes Section */}
      {activeTab === "abonnes" && (
        <AnimatedSection>
          <div className="bg-dark-2 border border-border-dark rounded-2xl p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <h2 className="text-lg font-semibold text-text-primary">Liste des abonnes</h2>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search
                    size={16}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted"
                  />
                  <input
                    type="text"
                    placeholder="Rechercher un abonne..."
                    value={searchQuery}
                    onChange={(e) => handleSearch(e.target.value)}
                    className="w-full sm:w-72 pl-10 pr-4 py-2.5 bg-dark border border-border-dark rounded-full text-sm text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent/50"
                  />
                </div>
                <button
                  onClick={refetchSubs}
                  className="p-2.5 bg-dark border border-border-dark rounded-full text-text-muted hover:text-text-primary hover:bg-dark-3 transition-colors"
                  title="Actualiser"
                >
                  <RefreshCw size={16} />
                </button>
              </div>
            </div>

            {loadingSubs ? (
              <div className="flex justify-center py-16">
                <Loader2 size={24} className="text-accent animate-spin" />
              </div>
            ) : (
              <>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border-dark">
                        <th className="text-left py-3 px-4 text-[0.65rem] font-mono font-semibold text-text-muted uppercase tracking-wider">
                          Email
                        </th>
                        <th className="text-left py-3 px-4 text-[0.65rem] font-mono font-semibold text-text-muted uppercase tracking-wider">
                          Nom
                        </th>
                        <th className="text-left py-3 px-4 text-[0.65rem] font-mono font-semibold text-text-muted uppercase tracking-wider">
                          Source
                        </th>
                        <th className="text-left py-3 px-4 text-[0.65rem] font-mono font-semibold text-text-muted uppercase tracking-wider">
                          Statut
                        </th>
                        <th className="text-left py-3 px-4 text-[0.65rem] font-mono font-semibold text-text-muted uppercase tracking-wider">
                          Date inscription
                        </th>
                        <th className="text-right py-3 px-4 text-[0.65rem] font-mono font-semibold text-text-muted uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/[0.06]">
                      {subscribers.length > 0 ? (
                        subscribers.map((sub) => (
                          <tr
                            key={sub.id}
                            className="hover:bg-dark-3 transition-colors"
                          >
                            <td className="py-3.5 px-4">
                              <span className="text-sm text-text-primary">{sub.email}</span>
                            </td>
                            <td className="py-3.5 px-4">
                              <span className="text-sm text-text-secondary">{sub.name || "-"}</span>
                            </td>
                            <td className="py-3.5 px-4">
                              <span className="text-sm text-text-muted">{sub.source}</span>
                            </td>
                            <td className="py-3.5 px-4">
                              <SubscriberStatusBadge status={sub.status} />
                            </td>
                            <td className="py-3.5 px-4">
                              <span className="text-sm text-text-muted">
                                {formatDateTime(sub.subscribed_at)}
                              </span>
                            </td>
                            <td className="py-3.5 px-4 text-right">
                              <div className="flex items-center justify-end gap-1">
                                <button
                                  onClick={() => openEditSub(sub)}
                                  className="p-1.5 rounded-lg hover:bg-dark-3 text-text-muted hover:text-accent transition-colors"
                                  title="Modifier"
                                >
                                  <Pencil size={14} />
                                </button>
                                <button
                                  onClick={() => {
                                    setSelectedSub(sub);
                                    setShowSubDelete(true);
                                  }}
                                  className="p-1.5 rounded-lg hover:bg-dark-3 text-text-muted hover:text-red-400 transition-colors"
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
                          <td colSpan={6} className="text-center py-12">
                            <Mail size={40} className="mx-auto text-text-muted mb-3" />
                            <p className="text-text-muted">Aucun abonne trouve</p>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </>
            )}
          </div>
        </AnimatedSection>
      )}

      {/* Campagnes Section */}
      {activeTab === "campagnes" && (
        <AnimatedSection>
          <div className="bg-dark-2 border border-border-dark rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-text-primary">Campagnes</h2>
              <div className="flex items-center gap-3">
                <button
                  onClick={refetchCamps}
                  className="p-2.5 bg-dark border border-border-dark rounded-full text-text-muted hover:text-text-primary hover:bg-dark-3 transition-colors"
                  title="Actualiser"
                >
                  <RefreshCw size={16} />
                </button>
                <button
                  onClick={openCreateCamp}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-accent text-dark font-semibold rounded-full hover:bg-accent-hover shadow-lg shadow-accent/20 transition-all text-sm"
                >
                  <Plus size={16} />
                  Nouvelle campagne
                </button>
              </div>
            </div>

            {loadingCamps ? (
              <div className="flex justify-center py-16">
                <Loader2 size={24} className="text-accent animate-spin" />
              </div>
            ) : (
              <>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border-dark">
                        <th className="text-left py-3 px-4 text-[0.65rem] font-mono font-semibold text-text-muted uppercase tracking-wider">
                          Sujet
                        </th>
                        <th className="text-left py-3 px-4 text-[0.65rem] font-mono font-semibold text-text-muted uppercase tracking-wider">
                          Statut
                        </th>
                        <th className="text-center py-3 px-4 text-[0.65rem] font-mono font-semibold text-text-muted uppercase tracking-wider">
                          <span className="flex items-center justify-center gap-1">
                            <Send size={12} />
                            Envoyes
                          </span>
                        </th>
                        <th className="text-center py-3 px-4 text-[0.65rem] font-mono font-semibold text-text-muted uppercase tracking-wider">
                          <span className="flex items-center justify-center gap-1">
                            <Eye size={12} />
                            Ouverts
                          </span>
                        </th>
                        <th className="text-center py-3 px-4 text-[0.65rem] font-mono font-semibold text-text-muted uppercase tracking-wider">
                          <span className="flex items-center justify-center gap-1">
                            <MousePointerClick size={12} />
                            Clics
                          </span>
                        </th>
                        <th className="text-left py-3 px-4 text-[0.65rem] font-mono font-semibold text-text-muted uppercase tracking-wider">
                          Date
                        </th>
                        <th className="text-right py-3 px-4 text-[0.65rem] font-mono font-semibold text-text-muted uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/[0.06]">
                      {campaigns.length > 0 ? (
                        campaigns.map((campaign) => (
                          <tr
                            key={campaign.id}
                            className="hover:bg-dark-3 transition-colors"
                          >
                            <td className="py-3.5 px-4">
                              <span className="text-sm text-text-primary font-medium">
                                {campaign.subject}
                              </span>
                            </td>
                            <td className="py-3.5 px-4">
                              <CampaignStatusBadge status={campaign.status} />
                            </td>
                            <td className="py-3.5 px-4 text-center">
                              <span className="text-sm text-text-secondary">
                                {campaign.sent_count.toLocaleString("fr-FR")}
                              </span>
                            </td>
                            <td className="py-3.5 px-4 text-center">
                              <span className="text-sm text-text-secondary">
                                {campaign.open_count.toLocaleString("fr-FR")}
                                {campaign.sent_count > 0 && (
                                  <span className="text-xs text-text-muted ml-1">
                                    ({((campaign.open_count / campaign.sent_count) * 100).toFixed(1)}%)
                                  </span>
                                )}
                              </span>
                            </td>
                            <td className="py-3.5 px-4 text-center">
                              <span className="text-sm text-text-secondary">
                                {campaign.click_count.toLocaleString("fr-FR")}
                              </span>
                            </td>
                            <td className="py-3.5 px-4">
                              <span className="text-sm text-text-muted">
                                {formatDateTime(campaign.sent_at || campaign.scheduled_at || campaign.created_at)}
                              </span>
                            </td>
                            <td className="py-3.5 px-4 text-right">
                              <div className="flex items-center justify-end gap-1">
                                <button
                                  onClick={() => openEditCamp(campaign)}
                                  className="p-1.5 rounded-lg hover:bg-dark-3 text-text-muted hover:text-accent transition-colors"
                                  title="Modifier"
                                >
                                  <Pencil size={14} />
                                </button>
                                <button
                                  onClick={() => {
                                    setSelectedCamp(campaign);
                                    setShowCampDelete(true);
                                  }}
                                  className="p-1.5 rounded-lg hover:bg-dark-3 text-text-muted hover:text-red-400 transition-colors"
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
                          <td colSpan={7} className="text-center py-12">
                            <Send size={40} className="mx-auto text-text-muted mb-3" />
                            <p className="text-text-muted">Aucune campagne creee</p>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </>
            )}
          </div>
        </AnimatedSection>
      )}

      {/* Subscriber Modal */}
      <Modal
        isOpen={showSubModal}
        onClose={() => setShowSubModal(false)}
        title={editingSub ? "Modifier l'abonne" : "Nouvel abonne"}
        size="md"
        footer={
          <>
            <button
              onClick={() => setShowSubModal(false)}
              className="px-4 py-2 text-sm text-text-secondary hover:text-text-primary border border-border-dark rounded-full hover:bg-dark-3 transition-all"
            >
              Annuler
            </button>
            <button
              onClick={handleSaveSub}
              disabled={savingSub || !subForm.email}
              className="px-4 py-2 text-sm font-semibold text-dark bg-accent rounded-full hover:bg-accent-hover transition-all disabled:opacity-50"
            >
              {savingSub ? (
                <span className="flex items-center gap-2">
                  <Loader2 size={14} className="animate-spin" />
                  Enregistrement...
                </span>
              ) : editingSub ? (
                "Modifier"
              ) : (
                "Ajouter"
              )}
            </button>
          </>
        }
      >
        <div className="space-y-4">
          <FormField
            label="Email"
            name="email"
            type="email"
            value={subForm.email}
            onChange={(v) => setSubForm({ ...subForm, email: v })}
            required
            placeholder="email@exemple.com"
          />
          <FormField
            label="Nom"
            name="name"
            value={subForm.name}
            onChange={(v) => setSubForm({ ...subForm, name: v })}
            placeholder="Nom complet"
          />
          <FormField
            label="Source"
            name="source"
            value={subForm.source}
            onChange={(v) => setSubForm({ ...subForm, source: v })}
            placeholder="Site web, Blog, etc."
          />
          <FormField
            label="Statut"
            name="status"
            type="select"
            value={subForm.status}
            onChange={(v) => setSubForm({ ...subForm, status: v })}
            options={[
              { value: "active", label: "Actif" },
              { value: "unsubscribed", label: "Desabonne" },
              { value: "bounced", label: "Rebondi" },
            ]}
          />
        </div>
      </Modal>

      {/* Campaign Modal */}
      <Modal
        isOpen={showCampModal}
        onClose={() => setShowCampModal(false)}
        title={editingCamp ? "Modifier la campagne" : "Nouvelle campagne"}
        size="lg"
        footer={
          <>
            <button
              onClick={() => setShowCampModal(false)}
              className="px-4 py-2 text-sm text-text-secondary hover:text-text-primary border border-border-dark rounded-full hover:bg-dark-3 transition-all"
            >
              Annuler
            </button>
            <button
              onClick={handleSaveCamp}
              disabled={savingCamp || !campForm.subject}
              className="px-4 py-2 text-sm font-semibold text-dark bg-accent rounded-full hover:bg-accent-hover transition-all disabled:opacity-50"
            >
              {savingCamp ? (
                <span className="flex items-center gap-2">
                  <Loader2 size={14} className="animate-spin" />
                  Enregistrement...
                </span>
              ) : editingCamp ? (
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
            label="Sujet"
            name="subject"
            value={campForm.subject}
            onChange={(v) => setCampForm({ ...campForm, subject: v })}
            required
            placeholder="Sujet de la campagne"
          />
          <FormField
            label="Contenu"
            name="content"
            type="textarea"
            value={campForm.content}
            onChange={(v) => setCampForm({ ...campForm, content: v })}
            rows={8}
            placeholder="Contenu de la campagne..."
          />
          <FormField
            label="Statut"
            name="status"
            type="select"
            value={campForm.status}
            onChange={(v) => setCampForm({ ...campForm, status: v })}
            options={[
              { value: "draft", label: "Brouillon" },
              { value: "scheduled", label: "Planifiee" },
              { value: "sending", label: "En cours d'envoi" },
              { value: "sent", label: "Envoyee" },
            ]}
          />
        </div>
      </Modal>

      {/* Subscriber Delete Confirmation */}
      <ConfirmDialog
        isOpen={showSubDelete}
        onClose={() => setShowSubDelete(false)}
        onConfirm={handleDeleteSub}
        message={`Etes-vous sur de vouloir supprimer l'abonne "${selectedSub?.email}" ? Cette action est irreversible.`}
        loading={deletingSub}
      />

      {/* Campaign Delete Confirmation */}
      <ConfirmDialog
        isOpen={showCampDelete}
        onClose={() => setShowCampDelete(false)}
        onConfirm={handleDeleteCamp}
        message={`Etes-vous sur de vouloir supprimer la campagne "${selectedCamp?.subject}" ? Cette action est irreversible.`}
        loading={deletingCamp}
      />
    </PageTransition>
  );
}
