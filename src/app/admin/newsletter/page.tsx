"use client";

import { useState } from "react";
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
  MoreHorizontal,
  Trash2,
} from "lucide-react";
import PageHeader from "@/components/admin/PageHeader";
import PageTransition, { AnimatedSection } from "@/components/admin/PageTransition";

interface Subscriber {
  id: string;
  email: string;
  name: string;
  source: string;
  status: "actif" | "desabonne" | "en_attente";
  date: string;
}

interface Campaign {
  id: string;
  subject: string;
  status: "brouillon" | "envoyee" | "planifiee";
  sent: number;
  opened: number;
  clicks: number;
  date: string;
}

const mockSubscribers: Subscriber[] = [
  {
    id: "1",
    email: "jean.dupont@email.com",
    name: "Jean Dupont",
    source: "Site web",
    status: "actif",
    date: "2025-01-15",
  },
  {
    id: "2",
    email: "marie.martin@email.com",
    name: "Marie Martin",
    source: "Formulaire devis",
    status: "actif",
    date: "2025-01-20",
  },
  {
    id: "3",
    email: "paul.bernard@email.com",
    name: "Paul Bernard",
    source: "Blog",
    status: "desabonne",
    date: "2025-02-01",
  },
  {
    id: "4",
    email: "lucie.moreau@email.com",
    name: "Lucie Moreau",
    source: "Site web",
    status: "en_attente",
    date: "2025-02-10",
  },
];

const mockCampaigns: Campaign[] = [
  {
    id: "1",
    subject: "Nos nouveaux services 2025",
    status: "envoyee",
    sent: 1250,
    opened: 487,
    clicks: 89,
    date: "2025-02-01",
  },
  {
    id: "2",
    subject: "Offre speciale - Refonte site web",
    status: "envoyee",
    sent: 1180,
    opened: 342,
    clicks: 56,
    date: "2025-01-15",
  },
  {
    id: "3",
    subject: "Newsletter Mars 2025",
    status: "brouillon",
    sent: 0,
    opened: 0,
    clicks: 0,
    date: "2025-02-25",
  },
  {
    id: "4",
    subject: "Retour sur nos projets recents",
    status: "planifiee",
    sent: 0,
    opened: 0,
    clicks: 0,
    date: "2025-03-01",
  },
];

function SubscriberStatusBadge({ status }: { status: Subscriber["status"] }) {
  const config = {
    actif: {
      label: "Actif",
      className: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
      icon: <CheckCircle size={12} />,
    },
    desabonne: {
      label: "Desabonne",
      className: "bg-red-500/10 text-red-400 border-red-500/20",
      icon: <XCircle size={12} />,
    },
    en_attente: {
      label: "En attente",
      className: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
      icon: <Clock size={12} />,
    },
  };

  const { label, className, icon } = config[status];

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${className}`}
    >
      {icon}
      {label}
    </span>
  );
}

function CampaignStatusBadge({ status }: { status: Campaign["status"] }) {
  const config = {
    brouillon: {
      label: "Brouillon",
      className: "bg-gray-500/10 text-gray-400 border-gray-500/20",
    },
    envoyee: {
      label: "Envoyee",
      className: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    },
    planifiee: {
      label: "Planifiee",
      className: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    },
  };

  const { label, className } = config[status];

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${className}`}
    >
      {label}
    </span>
  );
}

export default function NewsletterPage() {
  const [subscribers] = useState<Subscriber[]>(mockSubscribers);
  const [campaigns] = useState<Campaign[]>(mockCampaigns);
  const [searchSubscribers, setSearchSubscribers] = useState("");
  const [activeTab, setActiveTab] = useState<"abonnes" | "campagnes">("abonnes");

  const filteredSubscribers = subscribers.filter(
    (sub) =>
      sub.email.toLowerCase().includes(searchSubscribers.toLowerCase()) ||
      sub.name.toLowerCase().includes(searchSubscribers.toLowerCase())
  );

  const totalActive = subscribers.filter((s) => s.status === "actif").length;

  return (
    <PageTransition className="space-y-8">
      <PageHeader
        icon={<Megaphone size={24} />}
        title="Newsletter"
        subtitle="Gerez vos abonnes et campagnes newsletter"
        actions={
          <button className="flex items-center gap-2 px-4 py-2.5 bg-accent text-dark font-semibold rounded-full hover:bg-accent-hover shadow-lg shadow-accent/20 transition-all text-sm">
            <Plus size={16} />
            Nouvelle campagne
          </button>
        }
      />

      {/* Stats */}
      <AnimatedSection>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-dark-2 border border-white/[0.06] rounded-2xl p-5">
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
          <div className="bg-dark-2 border border-white/[0.06] rounded-2xl p-5">
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
          <div className="bg-dark-2 border border-white/[0.06] rounded-2xl p-5">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-blue-500/10 rounded-xl">
                <Send size={20} className="text-blue-400" />
              </div>
              <div>
                <p className="text-sm text-text-muted">Campagnes envoyees</p>
                <p className="text-2xl font-bold text-text-primary">
                  {campaigns.filter((c) => c.status === "envoyee").length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-dark-2 border border-white/[0.06] rounded-2xl p-5">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-orange-500/10 rounded-xl">
                <Eye size={20} className="text-orange-400" />
              </div>
              <div>
                <p className="text-sm text-text-muted">Taux d&apos;ouverture moy.</p>
                <p className="text-2xl font-bold text-text-primary">38.2%</p>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Tabs */}
      <AnimatedSection>
        <div className="flex gap-2 border-b border-white/[0.06] pb-0">
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
          <div className="bg-dark-2 border border-white/[0.06] rounded-2xl p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <h2 className="text-lg font-semibold text-text-primary">Liste des abonnes</h2>
              <div className="relative">
                <Search
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted"
                />
                <input
                  type="text"
                  placeholder="Rechercher un abonne..."
                  value={searchSubscribers}
                  onChange={(e) => setSearchSubscribers(e.target.value)}
                  className="w-full sm:w-72 pl-10 pr-4 py-2.5 bg-dark border border-white/[0.06] rounded-full text-sm text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent/50"
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/[0.06]">
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
                  {filteredSubscribers.map((sub) => (
                    <tr
                      key={sub.id}
                      className="hover:bg-white/[0.02] transition-colors"
                    >
                      <td className="py-3.5 px-4">
                        <span className="text-sm text-text-primary">{sub.email}</span>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="text-sm text-text-secondary">{sub.name}</span>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="text-sm text-text-muted">{sub.source}</span>
                      </td>
                      <td className="py-3.5 px-4">
                        <SubscriberStatusBadge status={sub.status} />
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="text-sm text-text-muted">
                          {new Date(sub.date).toLocaleDateString("fr-FR")}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <button className="p-1.5 rounded-lg hover:bg-white/[0.04] text-text-muted hover:text-text-primary transition-colors">
                          <MoreHorizontal size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredSubscribers.length === 0 && (
              <div className="text-center py-12">
                <Mail size={40} className="mx-auto text-text-muted mb-3" />
                <p className="text-text-muted">Aucun abonne trouve</p>
              </div>
            )}
          </div>
        </AnimatedSection>
      )}

      {/* Campagnes Section */}
      {activeTab === "campagnes" && (
        <AnimatedSection>
          <div className="bg-dark-2 border border-white/[0.06] rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-text-primary">Campagnes</h2>
              <button className="inline-flex items-center gap-2 px-4 py-2 bg-accent text-dark font-semibold rounded-full hover:bg-accent-hover shadow-lg shadow-accent/20 transition-all text-sm">
                <Plus size={16} />
                Nouvelle campagne
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/[0.06]">
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
                  {campaigns.map((campaign) => (
                    <tr
                      key={campaign.id}
                      className="hover:bg-white/[0.02] transition-colors"
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
                          {campaign.sent.toLocaleString("fr-FR")}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        <span className="text-sm text-text-secondary">
                          {campaign.opened.toLocaleString("fr-FR")}
                          {campaign.sent > 0 && (
                            <span className="text-xs text-text-muted ml-1">
                              ({((campaign.opened / campaign.sent) * 100).toFixed(1)}%)
                            </span>
                          )}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        <span className="text-sm text-text-secondary">
                          {campaign.clicks.toLocaleString("fr-FR")}
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="text-sm text-text-muted">
                          {new Date(campaign.date).toLocaleDateString("fr-FR")}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1">
                          {campaign.status === "brouillon" && (
                            <button className="p-1.5 rounded-lg hover:bg-white/[0.04] text-text-muted hover:text-accent transition-colors" title="Envoyer">
                              <Send size={14} />
                            </button>
                          )}
                          <button className="p-1.5 rounded-lg hover:bg-white/[0.04] text-text-muted hover:text-red-400 transition-colors" title="Supprimer">
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {campaigns.length === 0 && (
              <div className="text-center py-12">
                <Send size={40} className="mx-auto text-text-muted mb-3" />
                <p className="text-text-muted">Aucune campagne creee</p>
              </div>
            )}
          </div>
        </AnimatedSection>
      )}
    </PageTransition>
  );
}
