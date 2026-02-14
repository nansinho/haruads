"use client";

import { useState } from "react";
import {
  Search,
  Filter,
  Download,
  Eye,
  MoreHorizontal,
  Mail,
  Archive,
  Reply,
  RefreshCw,
} from "lucide-react";

const filters = [
  { key: "all", label: "Tous" },
  { key: "unread", label: "Non lu" },
  { key: "read", label: "Lu" },
  { key: "replied", label: "Répondu" },
  { key: "archived", label: "Archivé" },
];

function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, string> = {
    unread: "bg-orange-500/15 text-orange-400 border-orange-500/20",
    read: "bg-gray-500/15 text-gray-400 border-gray-500/20",
    replied: "bg-emerald-500/15 text-emerald-400 border-emerald-500/20",
    archived: "bg-gray-500/15 text-gray-400 border-gray-500/20",
  };
  const labels: Record<string, string> = {
    unread: "Non lu",
    read: "Lu",
    replied: "Répondu",
    archived: "Archivé",
  };
  const color =
    colors[status] || "bg-gray-500/15 text-gray-400 border-gray-500/20";
  return (
    <span
      className={`inline-flex px-2.5 py-1 rounded-lg text-xs font-medium border ${color}`}
    >
      {labels[status] || status.replace(/_/g, " ")}
    </span>
  );
}

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: string;
  date: string;
}

export default function MessagesPage() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [messages] = useState<ContactMessage[]>([]);

  const filteredMessages = messages.filter((m) => {
    if (activeFilter !== "all" && m.status !== activeFilter) return false;
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        m.name.toLowerCase().includes(query) ||
        m.email.toLowerCase().includes(query) ||
        m.subject.toLowerCase().includes(query) ||
        m.message.toLowerCase().includes(query)
      );
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Messages Contact</h1>
          <p className="text-gray-400 mt-1">
            Messages reçus via le formulaire de contact
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-gray-400 hover:text-white hover:bg-white/10 transition-all text-sm">
            <Download size={16} />
            Exporter
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-gray-400 hover:text-white hover:bg-white/10 transition-all text-sm">
            <RefreshCw size={16} />
            Actualiser
          </button>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-4 space-y-4">
        {/* Search */}
        <div className="relative">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
          />
          <input
            type="text"
            placeholder="Rechercher par nom, email, sujet, message..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 text-sm focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/20 transition-all"
          />
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-2">
          {filters.map((filter) => (
            <button
              key={filter.key}
              onClick={() => setActiveFilter(filter.key)}
              className={`px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all ${
                activeFilter === filter.key
                  ? "bg-violet-600/15 text-violet-300 border border-violet-500/20"
                  : "bg-white/5 text-gray-400 border border-transparent hover:bg-white/10 hover:text-gray-300"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Nom
                </th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Email
                </th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Sujet
                </th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Message
                </th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Statut
                </th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Date
                </th>
                <th className="text-right px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredMessages.length > 0 ? (
                filteredMessages.map((msg) => (
                  <tr
                    key={msg.id}
                    className="hover:bg-white/5 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <span className="text-sm font-medium text-white">
                        {msg.name}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-400">{msg.email}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-300">
                        {msg.subject}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-400 max-w-xs truncate block">
                        {msg.message.length > 80
                          ? `${msg.message.substring(0, 80)}...`
                          : msg.message}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge status={msg.status} />
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-400">{msg.date}</span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button className="p-1.5 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-all">
                          <Eye size={16} />
                        </button>
                        <button className="p-1.5 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-all">
                          <Reply size={16} />
                        </button>
                        <button className="p-1.5 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-all">
                          <Archive size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="px-6 py-16 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                        <Mail size={24} className="text-gray-600" />
                      </div>
                      <div>
                        <p className="text-gray-400 font-medium">
                          Aucun message
                        </p>
                        <p className="text-gray-600 text-sm mt-1">
                          Les messages de contact apparaîtront ici
                        </p>
                      </div>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
