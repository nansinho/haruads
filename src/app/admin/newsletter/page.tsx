"use client";

import { useState } from "react";
import {
  Megaphone,
  Plus,
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
  RefreshCw,
} from "lucide-react";

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
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-3">
            <Megaphone className="text-violet-400" size={28} />
            Newsletter
          </h1>
          <p className="text-gray-400 mt-1">
            Gerez vos abonnes et campagnes newsletter
          </p>
        </div>
        <button className="inline-flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-violet-600 to-blue-600 text-white rounded-xl font-medium hover:opacity-90 transition-opacity">
          <Plus size={18} />
          Nouvelle campagne
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-violet-500/10 rounded-xl">
              <Users size={20} className="text-violet-400" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Total abonnes</p>
              <p className="text-2xl font-bold text-white">{subscribers.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-emerald-500/10 rounded-xl">
              <CheckCircle size={20} className="text-emerald-400" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Actifs</p>
              <p className="text-2xl font-bold text-white">{totalActive}</p>
            </div>
          </div>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-blue-500/10 rounded-xl">
              <Send size={20} className="text-blue-400" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Campagnes envoyees</p>
              <p className="text-2xl font-bold text-white">
                {campaigns.filter((c) => c.status === "envoyee").length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-orange-500/10 rounded-xl">
              <Eye size={20} className="text-orange-400" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Taux d&apos;ouverture moy.</p>
              <p className="text-2xl font-bold text-white">38.2%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-white/10 pb-0">
        <button
          onClick={() => setActiveTab("abonnes")}
          className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
            activeTab === "abonnes"
              ? "border-violet-500 text-violet-400"
              : "border-transparent text-gray-400 hover:text-white"
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
              ? "border-violet-500 text-violet-400"
              : "border-transparent text-gray-400 hover:text-white"
          }`}
        >
          <span className="flex items-center gap-2">
            <Mail size={16} />
            Campagnes
          </span>
        </button>
      </div>

      {/* Abonnes Section */}
      {activeTab === "abonnes" && (
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <h2 className="text-lg font-semibold text-white">Liste des abonnes</h2>
            <div className="relative">
              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
              />
              <input
                type="text"
                placeholder="Rechercher un abonne..."
                value={searchSubscribers}
                onChange={(e) => setSearchSubscribers(e.target.value)}
                className="w-full sm:w-72 pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-500/50"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Nom
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Source
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Statut
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Date inscription
                  </th>
                  <th className="text-right py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredSubscribers.map((sub) => (
                  <tr
                    key={sub.id}
                    className="hover:bg-white/5 transition-colors"
                  >
                    <td className="py-3.5 px-4">
                      <span className="text-sm text-white">{sub.email}</span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="text-sm text-gray-300">{sub.name}</span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="text-sm text-gray-400">{sub.source}</span>
                    </td>
                    <td className="py-3.5 px-4">
                      <SubscriberStatusBadge status={sub.status} />
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="text-sm text-gray-400">
                        {new Date(sub.date).toLocaleDateString("fr-FR")}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button className="p-1.5 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors">
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
              <Mail size={40} className="mx-auto text-gray-600 mb-3" />
              <p className="text-gray-500">Aucun abonne trouve</p>
            </div>
          )}
        </div>
      )}

      {/* Campagnes Section */}
      {activeTab === "campagnes" && (
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-white">Campagnes</h2>
            <button className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-violet-600 to-blue-600 text-white rounded-xl text-sm font-medium hover:opacity-90 transition-opacity">
              <Plus size={16} />
              Nouvelle campagne
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Sujet
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Statut
                  </th>
                  <th className="text-center py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    <span className="flex items-center justify-center gap-1">
                      <Send size={12} />
                      Envoyes
                    </span>
                  </th>
                  <th className="text-center py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    <span className="flex items-center justify-center gap-1">
                      <Eye size={12} />
                      Ouverts
                    </span>
                  </th>
                  <th className="text-center py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    <span className="flex items-center justify-center gap-1">
                      <MousePointerClick size={12} />
                      Clics
                    </span>
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="text-right py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {campaigns.map((campaign) => (
                  <tr
                    key={campaign.id}
                    className="hover:bg-white/5 transition-colors"
                  >
                    <td className="py-3.5 px-4">
                      <span className="text-sm text-white font-medium">
                        {campaign.subject}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <CampaignStatusBadge status={campaign.status} />
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <span className="text-sm text-gray-300">
                        {campaign.sent.toLocaleString("fr-FR")}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <span className="text-sm text-gray-300">
                        {campaign.opened.toLocaleString("fr-FR")}
                        {campaign.sent > 0 && (
                          <span className="text-xs text-gray-500 ml-1">
                            ({((campaign.opened / campaign.sent) * 100).toFixed(1)}%)
                          </span>
                        )}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <span className="text-sm text-gray-300">
                        {campaign.clicks.toLocaleString("fr-FR")}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="text-sm text-gray-400">
                        {new Date(campaign.date).toLocaleDateString("fr-FR")}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        {campaign.status === "brouillon" && (
                          <button className="p-1.5 rounded-lg hover:bg-white/10 text-gray-400 hover:text-violet-400 transition-colors" title="Envoyer">
                            <Send size={14} />
                          </button>
                        )}
                        <button className="p-1.5 rounded-lg hover:bg-white/10 text-gray-400 hover:text-red-400 transition-colors" title="Supprimer">
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
              <Send size={40} className="mx-auto text-gray-600 mb-3" />
              <p className="text-gray-500">Aucune campagne creee</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
