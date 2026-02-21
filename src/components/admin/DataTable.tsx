"use client";

import { useState } from "react";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";

interface Column<T> {
  key: string;
  label: string;
  render?: (item: T) => React.ReactNode;
  sortable?: boolean;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  searchPlaceholder?: string;
  onSearch?: (query: string) => void;
  actions?: (item: T) => React.ReactNode;
  emptyMessage?: string;
  title?: string;
  headerActions?: React.ReactNode;
}

export function StatusBadge({
  status,
}: {
  status: string;
  variant?: string;
}) {
  const colorMap: Record<string, string> = {
    new: "bg-blue-500/15 text-blue-400 border-blue-500/20",
    open: "bg-blue-500/15 text-blue-400 border-blue-500/20",
    active: "bg-emerald-500/15 text-emerald-400 border-emerald-500/20",
    published: "bg-emerald-500/15 text-emerald-400 border-emerald-500/20",
    paid: "bg-emerald-500/15 text-emerald-400 border-emerald-500/20",
    resolved: "bg-emerald-500/15 text-emerald-400 border-emerald-500/20",
    completed: "bg-emerald-500/15 text-emerald-400 border-emerald-500/20",
    in_progress: "bg-accent/10 text-accent border-accent/20",
    draft: "bg-gray-500/15 text-gray-400 border-gray-500/20",
    closed: "bg-gray-500/15 text-gray-400 border-gray-500/20",
    archived: "bg-gray-500/15 text-gray-400 border-gray-500/20",
    unread: "bg-accent/10 text-accent border-accent/20",
    waiting_client: "bg-yellow-500/15 text-yellow-400 border-yellow-500/20",
    overdue: "bg-red-500/15 text-red-400 border-red-500/20",
    rejected: "bg-red-500/15 text-red-400 border-red-500/20",
    urgent: "bg-red-500/15 text-red-400 border-red-500/20",
    high: "bg-accent/10 text-accent border-accent/20",
    medium: "bg-yellow-500/15 text-yellow-400 border-yellow-500/20",
    low: "bg-gray-500/15 text-gray-400 border-gray-500/20",
    admin: "bg-accent/10 text-accent border-accent/20",
    client: "bg-blue-500/15 text-blue-400 border-blue-500/20",
    editor: "bg-cyan-500/15 text-cyan-400 border-cyan-500/20",
    default: "bg-gray-500/15 text-gray-400 border-gray-500/20",
  };

  const color = colorMap[status] || colorMap.default;
  const label = status.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

  return (
    <span className={`inline-flex px-2.5 py-1 rounded-full text-[0.65rem] font-mono font-medium border ${color}`}>
      {label}
    </span>
  );
}

export default function DataTable<T extends Record<string, unknown>>({
  columns,
  data,
  searchPlaceholder = "Rechercher...",
  onSearch,
  actions,
  emptyMessage = "Aucune donnée",
  title,
  headerActions,
}: DataTableProps<T>) {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredData = searchQuery
    ? data.filter((item) =>
        Object.values(item).some(
          (val) =>
            typeof val === "string" &&
            val.toLowerCase().includes(searchQuery.toLowerCase())
        )
      )
    : data;

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="bg-dark-2 border border-border-dark rounded-2xl overflow-hidden">
      {/* Header */}
      {(title || headerActions || onSearch) && (
        <div className="p-5 border-b border-border-dark flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex items-center gap-4">
            {title && (
              <h2 className="text-base font-semibold text-text-primary">{title}</h2>
            )}
            <span className="text-xs font-mono text-text-muted">
              {filteredData.length} résultat{filteredData.length !== 1 ? "s" : ""}
            </span>
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-64">
              <Search
                size={15}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted"
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                  onSearch?.(e.target.value);
                }}
                placeholder={searchPlaceholder}
                className="w-full pl-9 pr-4 py-2 bg-dark border border-border-dark rounded-full text-sm text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent/30 transition-all"
              />
            </div>
            {headerActions}
          </div>
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border-dark">
              {columns.map((col) => (
                <th
                  key={col.key}
                  className="px-5 py-3 text-left text-[0.65rem] font-mono font-semibold text-text-muted uppercase tracking-wider"
                >
                  {col.label}
                </th>
              ))}
              {actions && (
                <th className="px-5 py-3 text-right text-[0.65rem] font-mono font-semibold text-text-muted uppercase tracking-wider">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.04]">
            {paginatedData.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length + (actions ? 1 : 0)}
                  className="px-5 py-12 text-center text-text-muted text-sm"
                >
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              paginatedData.map((item, idx) => (
                <tr
                  key={(item.id as string) || idx}
                  className="hover:bg-accent-dim transition-colors duration-200"
                >
                  {columns.map((col) => (
                    <td key={col.key} className="px-5 py-4 text-sm text-text-secondary">
                      {col.render
                        ? col.render(item)
                        : (item[col.key] as React.ReactNode) ?? "-"}
                    </td>
                  ))}
                  {actions && (
                    <td className="px-5 py-4 text-right">{actions(item)}</td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="p-4 border-t border-border-dark flex items-center justify-between">
          <p className="text-xs font-mono text-text-muted">
            Page {currentPage} sur {totalPages}
          </p>
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-full bg-dark border border-border-dark text-text-muted hover:text-text-primary hover:border-white/[0.12] disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              <ChevronLeft size={14} />
            </button>
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let page: number;
              if (totalPages <= 5) {
                page = i + 1;
              } else if (currentPage <= 3) {
                page = i + 1;
              } else if (currentPage >= totalPages - 2) {
                page = totalPages - 4 + i;
              } else {
                page = currentPage - 2 + i;
              }
              return (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-8 h-8 rounded-full text-xs font-mono transition-all ${
                    currentPage === page
                      ? "bg-accent text-dark font-bold"
                      : "text-text-muted hover:text-text-primary hover:bg-dark-3"
                  }`}
                >
                  {page}
                </button>
              );
            })}
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-2 rounded-full bg-dark border border-border-dark text-text-muted hover:text-text-primary hover:border-white/[0.12] disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
