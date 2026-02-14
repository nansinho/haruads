"use client";

import { useState } from "react";
import {
  ScrollText,
  Search,
  Filter,
  Info,
  AlertTriangle,
  AlertOctagon,
  XOctagon,
  Clock,
  User,
  Globe,
  ChevronDown,
  RefreshCw,
  Download,
} from "lucide-react";

type Severity = "info" | "warning" | "error" | "critical";

interface LogEntry {
  id: string;
  dateTime: string;
  user: string;
  action: string;
  ip: string;
  severity: Severity;
}

const mockLogs: LogEntry[] = [
  {
    id: "1",
    dateTime: "2025-02-14 10:32:15",
    user: "admin@haruads.com",
    action: "Connexion reussie",
    ip: "192.168.1.1",
    severity: "info",
  },
  {
    id: "2",
    dateTime: "2025-02-14 09:45:02",
    user: "admin@haruads.com",
    action: "Modification des parametres du site",
    ip: "192.168.1.1",
    severity: "info",
  },
  {
    id: "3",
    dateTime: "2025-02-14 08:12:33",
    user: "inconnu",
    action: "Tentative de connexion echouee (3 essais)",
    ip: "45.33.12.87",
    severity: "warning",
  },
  {
    id: "4",
    dateTime: "2025-02-13 22:15:41",
    user: "admin@haruads.com",
    action: "Export de la base de donnees",
    ip: "192.168.1.1",
    severity: "info",
  },
  {
    id: "5",
    dateTime: "2025-02-13 18:30:09",
    user: "inconnu",
    action: "Tentative d'injection SQL detectee",
    ip: "103.45.67.89",
    severity: "critical",
  },
  {
    id: "6",
    dateTime: "2025-02-13 15:22:55",
    user: "admin@haruads.com",
    action: "Mise a jour du mot de passe",
    ip: "192.168.1.1",
    severity: "info",
  },
  {
    id: "7",
    dateTime: "2025-02-13 12:05:18",
    user: "systeme",
    action: "Erreur serveur - API timeout",
    ip: "127.0.0.1",
    severity: "error",
  },
  {
    id: "8",
    dateTime: "2025-02-12 23:45:30",
    user: "inconnu",
    action: "Brute force detecte - IP bloquee",
    ip: "91.234.56.78",
    severity: "critical",
  },
  {
    id: "9",
    dateTime: "2025-02-12 20:10:44",
    user: "admin@haruads.com",
    action: "Suppression d'un article de blog",
    ip: "192.168.1.1",
    severity: "warning",
  },
  {
    id: "10",
    dateTime: "2025-02-12 16:33:12",
    user: "systeme",
    action: "Certificat SSL renouvele",
    ip: "127.0.0.1",
    severity: "info",
  },
  {
    id: "11",
    dateTime: "2025-02-12 14:20:08",
    user: "systeme",
    action: "Erreur de connexion a la base de donnees",
    ip: "127.0.0.1",
    severity: "error",
  },
  {
    id: "12",
    dateTime: "2025-02-12 10:05:55",
    user: "admin@haruads.com",
    action: "Activation du mode maintenance",
    ip: "192.168.1.1",
    severity: "warning",
  },
];

function SeverityBadge({ severity }: { severity: Severity }) {
  const config = {
    info: {
      label: "Info",
      className: "bg-blue-500/10 text-blue-400 border-blue-500/20",
      icon: <Info size={12} />,
    },
    warning: {
      label: "Warning",
      className: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
      icon: <AlertTriangle size={12} />,
    },
    error: {
      label: "Error",
      className: "bg-orange-500/10 text-orange-400 border-orange-500/20",
      icon: <AlertOctagon size={12} />,
    },
    critical: {
      label: "Critical",
      className: "bg-red-500/10 text-red-400 border-red-500/20",
      icon: <XOctagon size={12} />,
    },
  };

  const { label, className, icon } = config[severity];

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${className}`}
    >
      {icon}
      {label}
    </span>
  );
}

export default function LogsPage() {
  const [logs] = useState<LogEntry[]>(mockLogs);
  const [search, setSearch] = useState("");
  const [filterSeverity, setFilterSeverity] = useState<Severity | "all">("all");
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);

  const filteredLogs = logs.filter((log) => {
    const matchesSearch =
      log.action.toLowerCase().includes(search.toLowerCase()) ||
      log.user.toLowerCase().includes(search.toLowerCase()) ||
      log.ip.includes(search);
    const matchesSeverity =
      filterSeverity === "all" || log.severity === filterSeverity;
    return matchesSearch && matchesSeverity;
  });

  const severityOptions: { value: Severity | "all"; label: string }[] = [
    { value: "all", label: "Toutes les severites" },
    { value: "info", label: "Info" },
    { value: "warning", label: "Warning" },
    { value: "error", label: "Error" },
    { value: "critical", label: "Critical" },
  ];

  const severityCounts = {
    info: logs.filter((l) => l.severity === "info").length,
    warning: logs.filter((l) => l.severity === "warning").length,
    error: logs.filter((l) => l.severity === "error").length,
    critical: logs.filter((l) => l.severity === "critical").length,
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-3">
            <ScrollText className="text-violet-400" size={28} />
            Logs de Securite
          </h1>
          <p className="text-gray-400 mt-1">
            Journal d&apos;activite et evenements de securite
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="inline-flex items-center gap-2 px-4 py-2.5 bg-white/5 border border-white/10 text-gray-300 rounded-xl text-sm hover:bg-white/10 transition-colors">
            <Download size={16} />
            Exporter
          </button>
          <button className="inline-flex items-center gap-2 px-4 py-2.5 bg-white/5 border border-white/10 text-gray-300 rounded-xl text-sm hover:bg-white/10 transition-colors">
            <RefreshCw size={16} />
            Actualiser
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-blue-500/5 border border-blue-500/20 rounded-2xl p-4">
          <div className="flex items-center gap-2 mb-1">
            <Info size={16} className="text-blue-400" />
            <span className="text-xs font-medium text-blue-400 uppercase">Info</span>
          </div>
          <p className="text-2xl font-bold text-white">{severityCounts.info}</p>
        </div>
        <div className="bg-yellow-500/5 border border-yellow-500/20 rounded-2xl p-4">
          <div className="flex items-center gap-2 mb-1">
            <AlertTriangle size={16} className="text-yellow-400" />
            <span className="text-xs font-medium text-yellow-400 uppercase">Warning</span>
          </div>
          <p className="text-2xl font-bold text-white">{severityCounts.warning}</p>
        </div>
        <div className="bg-orange-500/5 border border-orange-500/20 rounded-2xl p-4">
          <div className="flex items-center gap-2 mb-1">
            <AlertOctagon size={16} className="text-orange-400" />
            <span className="text-xs font-medium text-orange-400 uppercase">Error</span>
          </div>
          <p className="text-2xl font-bold text-white">{severityCounts.error}</p>
        </div>
        <div className="bg-red-500/5 border border-red-500/20 rounded-2xl p-4">
          <div className="flex items-center gap-2 mb-1">
            <XOctagon size={16} className="text-red-400" />
            <span className="text-xs font-medium text-red-400 uppercase">Critical</span>
          </div>
          <p className="text-2xl font-bold text-white">{severityCounts.critical}</p>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <h2 className="text-lg font-semibold text-white">
            Journal d&apos;activite
          </h2>
          <div className="flex items-center gap-3">
            {/* Search */}
            <div className="relative">
              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
              />
              <input
                type="text"
                placeholder="Rechercher..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full sm:w-64 pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-500/50"
              />
            </div>

            {/* Severity Filter */}
            <div className="relative">
              <button
                onClick={() => setShowFilterDropdown(!showFilterDropdown)}
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-gray-300 hover:bg-white/10 transition-colors"
              >
                <Filter size={14} />
                {filterSeverity === "all"
                  ? "Severite"
                  : severityOptions.find((s) => s.value === filterSeverity)?.label}
                <ChevronDown size={14} />
              </button>

              {showFilterDropdown && (
                <div className="absolute right-0 mt-2 w-52 bg-[#1a1a2e] border border-white/10 rounded-xl shadow-xl z-10 py-1">
                  {severityOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => {
                        setFilterSeverity(option.value);
                        setShowFilterDropdown(false);
                      }}
                      className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                        filterSeverity === option.value
                          ? "bg-violet-600/10 text-violet-400"
                          : "text-gray-300 hover:bg-white/5"
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  <span className="flex items-center gap-1.5">
                    <Clock size={12} />
                    Date / Heure
                  </span>
                </th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  <span className="flex items-center gap-1.5">
                    <User size={12} />
                    Utilisateur
                  </span>
                </th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Action
                </th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  <span className="flex items-center gap-1.5">
                    <Globe size={12} />
                    IP
                  </span>
                </th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Severite
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredLogs.map((log) => (
                <tr
                  key={log.id}
                  className={`hover:bg-white/5 transition-colors ${
                    log.severity === "critical" ? "bg-red-500/[0.03]" : ""
                  }`}
                >
                  <td className="py-3.5 px-4">
                    <span className="text-sm text-gray-400 font-mono">
                      {log.dateTime}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="text-sm text-gray-300">{log.user}</span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="text-sm text-white">{log.action}</span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="text-sm text-gray-400 font-mono">
                      {log.ip}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <SeverityBadge severity={log.severity} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredLogs.length === 0 && (
          <div className="text-center py-12">
            <ScrollText size={40} className="mx-auto text-gray-600 mb-3" />
            <p className="text-gray-500">Aucun log trouve</p>
          </div>
        )}

        {/* Pagination placeholder */}
        <div className="flex items-center justify-between mt-6 pt-4 border-t border-white/10">
          <p className="text-sm text-gray-500">
            {filteredLogs.length} evenement{filteredLogs.length !== 1 ? "s" : ""}{" "}
            affiche{filteredLogs.length !== 1 ? "s" : ""}
          </p>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-sm text-gray-400 hover:bg-white/10 transition-colors disabled:opacity-50" disabled>
              Precedent
            </button>
            <span className="px-3 py-1.5 bg-violet-600/10 border border-violet-500/20 rounded-lg text-sm text-violet-400">
              1
            </span>
            <button className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-sm text-gray-400 hover:bg-white/10 transition-colors disabled:opacity-50" disabled>
              Suivant
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
