"use client";

import { useState } from "react";
import { Search, ChevronLeft, ChevronRight, Filter } from "lucide-react";

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
  variant = "default",
}: {
  status: string;
  variant?: string;
}) {
  const colorMap: Record<string, string> = {
    // Status colors
    new: "bg-blue-500/15 text-blue-400 border-blue-500/20",
    open: "bg-blue-500/15 text-blue-400 border-blue-500/20",
    active: "bg-emerald-500/15 text-emerald-400 border-emerald-500/20",
    published: "bg-emerald-500/15 text-emerald-400 border-emerald-500/20",
    paid: "bg-emerald-500/15 text-emerald-400 border-emerald-500/20",
    resolved: "bg-emerald-500/15 text-emerald-400 border-emerald-500/20",
    completed: "bg-emerald-500/15 text-emerald-400 border-emerald-500/20",
    in_progress: "bg-violet-500/15 text-violet-400 border-violet-500/20",
    draft: "bg-gray-500/15 text-gray-400 border-gray-500/20",
    closed: "bg-gray-500/15 text-gray-400 border-gray-500/20",
    archived: "bg-gray-500/15 text-gray-400 border-gray-500/20",
    unread: "bg-orange-500/15 text-orange-400 border-orange-500/20",
    waiting_client: "bg-yellow-500/15 text-yellow-400 border-yellow-500/20",
    overdue: "bg-red-500/15 text-red-400 border-red-500/20",
    rejected: "bg-red-500/15 text-red-400 border-red-500/20",
    urgent: "bg-red-500/15 text-red-400 border-red-500/20",
    high: "bg-orange-500/15 text-orange-400 border-orange-500/20",
    medium: "bg-yellow-500/15 text-yellow-400 border-yellow-500/20",
    low: "bg-gray-500/15 text-gray-400 border-gray-500/20",
    // Roles
    admin: "bg-violet-500/15 text-violet-400 border-violet-500/20",
    client: "bg-blue-500/15 text-blue-400 border-blue-500/20",
    editor: "bg-cyan-500/15 text-cyan-400 border-cyan-500/20",
    // Default
    default: "bg-gray-500/15 text-gray-400 border-gray-500/20",
  };

  const color = colorMap[status] || colorMap.default;
  const label = status.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

  return (
    <span className={`inline-flex px-2.5 py-1 rounded-lg text-xs font-medium border ${color}`}>
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
    <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
      {/* Header */}
      {(title || headerActions || onSearch) && (
        <div className="p-5 border-b border-white/5 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex items-center gap-4">
            {title && (
              <h2 className="text-lg font-semibold text-white">{title}</h2>
            )}
            <span className="text-sm text-gray-500">
              {filteredData.length} résultat{filteredData.length !== 1 ? "s" : ""}
            </span>
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-64">
              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
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
                className="w-full pl-9 pr-4 py-2 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-500/50"
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
            <tr className="border-b border-white/5">
              {columns.map((col) => (
                <th
                  key={col.key}
                  className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider"
                >
                  {col.label}
                </th>
              ))}
              {actions && (
                <th className="px-5 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {paginatedData.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length + (actions ? 1 : 0)}
                  className="px-5 py-12 text-center text-gray-500"
                >
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              paginatedData.map((item, idx) => (
                <tr
                  key={(item.id as string) || idx}
                  className="hover:bg-white/5 transition-colors"
                >
                  {columns.map((col) => (
                    <td key={col.key} className="px-5 py-4 text-sm text-gray-300">
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
        <div className="p-4 border-t border-white/5 flex items-center justify-between">
          <p className="text-sm text-gray-500">
            Page {currentPage} sur {totalPages}
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-lg bg-white/5 text-gray-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg bg-white/5 text-gray-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
