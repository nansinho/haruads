"use client";

import { useState, useCallback } from "react";
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
  Loader2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import PageHeader from "@/components/admin/PageHeader";
import PageTransition, { AnimatedSection } from "@/components/admin/PageTransition";
import { useAdminData } from "@/hooks/useAdminData";
import { formatDateTime } from "@/lib/utils";
import type { SecurityLog } from "@/types/database";

type Severity = "info" | "warning" | "error" | "critical";

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

  const { label, className, icon } = config[severity] || config.info;

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
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [filterSeverity, setFilterSeverity] = useState<Severity | "all">("all");
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [page, setPage] = useState(1);
  const pageSize = 20;

  const { data: logs, loading, total, refetch } = useAdminData<SecurityLog>("/api/admin/logs", {
    search: debouncedSearch,
    status: filterSeverity,
    page,
    pageSize,
  });

  const handleSearch = useCallback((value: string) => {
    setSearchQuery(value);
    setPage(1);
    const timeout = setTimeout(() => setDebouncedSearch(value), 300);
    return () => clearTimeout(timeout);
  }, []);

  const severityOptions: { value: Severity | "all"; label: string }[] = [
    { value: "all", label: "Toutes les severites" },
    { value: "info", label: "Info" },
    { value: "warning", label: "Warning" },
    { value: "error", label: "Error" },
    { value: "critical", label: "Critical" },
  ];

  const totalPages = Math.ceil(total / pageSize);

  // Severity counts from loaded data (approximate - from current page data)
  const severityCounts = {
    info: logs.filter((l) => l.severity === "info").length,
    warning: logs.filter((l) => l.severity === "warning").length,
    error: logs.filter((l) => l.severity === "error").length,
    critical: logs.filter((l) => l.severity === "critical").length,
  };

  const exportCSV = () => {
    const headers = ["Date", "Utilisateur", "Action", "IP", "Severite"];
    const rows = logs.map((l) => [
      l.created_at,
      l.user_email || l.user_name || l.user_id || "systeme",
      l.action,
      l.ip_address || "-",
      l.severity,
    ]);
    const csv = [headers, ...rows]
      .map((r) => r.map((c) => `"${String(c || "").replace(/"/g, '""')}"`).join(","))
      .join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `logs-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <PageTransition className="space-y-6">
      <AnimatedSection>
        <PageHeader
          title="Logs Securite"
          subtitle="Journal d'activite et evenements de securite"
          icon={<ScrollText size={24} />}
          actions={
            <div className="flex items-center gap-3">
              <button
                onClick={exportCSV}
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-dark-2 border border-white/[0.06] text-text-secondary rounded-full text-sm hover:bg-white/[0.04] hover:text-text-primary transition-colors"
              >
                <Download size={16} />
                Exporter
              </button>
              <button
                onClick={refetch}
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-dark-2 border border-white/[0.06] text-text-secondary rounded-full text-sm hover:bg-white/[0.04] hover:text-text-primary transition-colors"
              >
                <RefreshCw size={16} />
                Actualiser
              </button>
            </div>
          }
        />
      </AnimatedSection>

      {/* Stats */}
      <AnimatedSection>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-blue-500/5 border border-blue-500/20 rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-1">
              <Info size={16} className="text-blue-400" />
              <span className="text-xs font-medium text-blue-400 uppercase">Info</span>
            </div>
            <p className="text-2xl font-bold text-text-primary">{severityCounts.info}</p>
          </div>
          <div className="bg-yellow-500/5 border border-yellow-500/20 rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-1">
              <AlertTriangle size={16} className="text-yellow-400" />
              <span className="text-xs font-medium text-yellow-400 uppercase">Warning</span>
            </div>
            <p className="text-2xl font-bold text-text-primary">{severityCounts.warning}</p>
          </div>
          <div className="bg-orange-500/5 border border-orange-500/20 rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-1">
              <AlertOctagon size={16} className="text-orange-400" />
              <span className="text-xs font-medium text-orange-400 uppercase">Error</span>
            </div>
            <p className="text-2xl font-bold text-text-primary">{severityCounts.error}</p>
          </div>
          <div className="bg-red-500/5 border border-red-500/20 rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-1">
              <XOctagon size={16} className="text-red-400" />
              <span className="text-xs font-medium text-red-400 uppercase">Critical</span>
            </div>
            <p className="text-2xl font-bold text-text-primary">{severityCounts.critical}</p>
          </div>
        </div>
      </AnimatedSection>

      {/* Table */}
      <AnimatedSection>
        <div className="bg-dark-2 border border-white/[0.06] rounded-2xl p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <h2 className="font-serif text-lg text-text-primary">
              Journal d&apos;activite
            </h2>
            <div className="flex items-center gap-3">
              {/* Search */}
              <div className="relative">
                <Search
                  size={15}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted"
                />
                <input
                  type="text"
                  placeholder="Rechercher..."
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="w-full sm:w-64 pl-9 pr-4 py-2.5 bg-dark border border-white/[0.06] rounded-full text-sm text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent/50"
                />
              </div>

              {/* Severity Filter */}
              <div className="relative">
                <button
                  onClick={() => setShowFilterDropdown(!showFilterDropdown)}
                  className="inline-flex items-center gap-2 px-4 py-2.5 bg-dark border border-white/[0.06] rounded-full text-sm text-text-secondary hover:bg-white/[0.04] hover:text-text-primary transition-colors"
                >
                  <Filter size={14} />
                  {filterSeverity === "all"
                    ? "Severite"
                    : severityOptions.find((s) => s.value === filterSeverity)?.label}
                  <ChevronDown size={14} />
                </button>

                {showFilterDropdown && (
                  <div className="absolute right-0 mt-2 w-52 bg-dark-2 border border-white/[0.06] rounded-xl shadow-xl z-10 py-1">
                    {severityOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => {
                          setFilterSeverity(option.value);
                          setShowFilterDropdown(false);
                          setPage(1);
                        }}
                        className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                          filterSeverity === option.value
                            ? "bg-accent/10 text-accent"
                            : "text-text-secondary hover:bg-white/[0.04]"
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

          {loading ? (
            <div className="flex justify-center py-16">
              <Loader2 size={24} className="text-accent animate-spin" />
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/[0.06]">
                      <th className="text-left py-3 px-4 text-[0.65rem] font-mono font-semibold text-text-muted uppercase tracking-wider">
                        <span className="flex items-center gap-1.5">
                          <Clock size={12} />
                          Date / Heure
                        </span>
                      </th>
                      <th className="text-left py-3 px-4 text-[0.65rem] font-mono font-semibold text-text-muted uppercase tracking-wider">
                        <span className="flex items-center gap-1.5">
                          <User size={12} />
                          Utilisateur
                        </span>
                      </th>
                      <th className="text-left py-3 px-4 text-[0.65rem] font-mono font-semibold text-text-muted uppercase tracking-wider">
                        Action
                      </th>
                      <th className="text-left py-3 px-4 text-[0.65rem] font-mono font-semibold text-text-muted uppercase tracking-wider">
                        <span className="flex items-center gap-1.5">
                          <Globe size={12} />
                          IP
                        </span>
                      </th>
                      <th className="text-left py-3 px-4 text-[0.65rem] font-mono font-semibold text-text-muted uppercase tracking-wider">
                        Severite
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/[0.06]">
                    {logs.length > 0 ? (
                      logs.map((log) => (
                        <tr
                          key={log.id}
                          className={`hover:bg-white/[0.04] transition-colors ${
                            log.severity === "critical" ? "bg-red-500/[0.03]" : ""
                          }`}
                        >
                          <td className="py-3.5 px-4">
                            <span className="text-sm text-text-muted font-mono">
                              {formatDateTime(log.created_at)}
                            </span>
                          </td>
                          <td className="py-3.5 px-4">
                            <span className="text-sm text-text-secondary">
                              {log.user_email || log.user_name || log.user_id || "systeme"}
                            </span>
                          </td>
                          <td className="py-3.5 px-4">
                            <span className="text-sm text-text-primary">{log.action}</span>
                          </td>
                          <td className="py-3.5 px-4">
                            <span className="text-sm text-text-muted font-mono">
                              {log.ip_address || "-"}
                            </span>
                          </td>
                          <td className="py-3.5 px-4">
                            <SeverityBadge severity={log.severity} />
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={5} className="text-center py-12">
                          <ScrollText size={40} className="mx-auto text-text-muted mb-3" />
                          <p className="text-text-muted">Aucun log trouve</p>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="flex items-center justify-between mt-6 pt-4 border-t border-white/[0.06]">
                <p className="text-sm text-text-muted">
                  {total} evenement{total !== 1 ? "s" : ""} au total
                  {totalPages > 1 && ` - Page ${page} / ${totalPages}`}
                </p>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page <= 1}
                    className="inline-flex items-center gap-1 px-3 py-1.5 bg-dark border border-white/[0.06] rounded-lg text-sm text-text-muted hover:bg-white/[0.04] transition-colors disabled:opacity-50"
                  >
                    <ChevronLeft size={14} />
                    Precedent
                  </button>
                  <span className="px-3 py-1.5 bg-accent/10 border border-accent/20 rounded-lg text-sm text-accent">
                    {page}
                  </span>
                  <button
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    disabled={page >= totalPages}
                    className="inline-flex items-center gap-1 px-3 py-1.5 bg-dark border border-white/[0.06] rounded-lg text-sm text-text-muted hover:bg-white/[0.04] transition-colors disabled:opacity-50"
                  >
                    Suivant
                    <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </AnimatedSection>
    </PageTransition>
  );
}
