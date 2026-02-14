"use client";

import { useState } from "react";
import {
  Receipt,
  Download,
  CreditCard,
  Search,
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";

type InvoiceStatus = "all" | "pending" | "paid" | "overdue";

interface Invoice {
  id: string;
  reference: string;
  amount: number;
  status: "pending" | "paid" | "overdue";
  dueDate: string;
  issueDate: string;
  projectName: string;
}

const statusConfig: Record<string, { label: string; color: string }> = {
  pending: { label: "En attente", color: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30" },
  paid: { label: "Payée", color: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30" },
  overdue: { label: "En retard", color: "bg-red-500/20 text-red-300 border-red-500/30" },
};

function SummaryCard({
  label,
  value,
  icon,
  color,
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
  color: string;
}) {
  const colorMap: Record<string, string> = {
    blue: "from-blue-600/20 to-blue-600/5 border-blue-500/20",
    green: "from-emerald-600/20 to-emerald-600/5 border-emerald-500/20",
    yellow: "from-yellow-600/20 to-yellow-600/5 border-yellow-500/20",
    red: "from-red-600/20 to-red-600/5 border-red-500/20",
  };
  const iconColorMap: Record<string, string> = {
    blue: "text-blue-400",
    green: "text-emerald-400",
    yellow: "text-yellow-400",
    red: "text-red-400",
  };

  return (
    <div className={`bg-gradient-to-br ${colorMap[color]} border rounded-2xl p-5`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-400">{label}</p>
          <p className="text-2xl font-bold text-white mt-1">{value}</p>
        </div>
        <span className={`${iconColorMap[color]} opacity-60`}>{icon}</span>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const config = statusConfig[status];
  if (!config) return null;
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium border ${config.color}`}>
      {config.label}
    </span>
  );
}

export default function ClientFacturesPage() {
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState<InvoiceStatus>("all");

  // Placeholder data - will be replaced with API call
  const invoices: Invoice[] = [];

  const filteredInvoices = invoices.filter((inv) => {
    const matchSearch =
      inv.reference.toLowerCase().includes(search.toLowerCase()) ||
      inv.projectName.toLowerCase().includes(search.toLowerCase());
    const matchFilter = activeFilter === "all" || inv.status === activeFilter;
    return matchSearch && matchFilter;
  });

  // Calculate summary
  const totalInvoiced = invoices.reduce((sum, inv) => sum + inv.amount, 0);
  const totalPaid = invoices
    .filter((inv) => inv.status === "paid")
    .reduce((sum, inv) => sum + inv.amount, 0);
  const totalPending = invoices
    .filter((inv) => inv.status === "pending")
    .reduce((sum, inv) => sum + inv.amount, 0);
  const totalOverdue = invoices
    .filter((inv) => inv.status === "overdue")
    .reduce((sum, inv) => sum + inv.amount, 0);

  const formatAmount = (amount: number) =>
    amount.toLocaleString("fr-FR", { minimumFractionDigits: 2 }) + " DH";

  const filterTabs: { key: InvoiceStatus; label: string }[] = [
    { key: "all", label: "Toutes" },
    { key: "pending", label: "En attente" },
    { key: "paid", label: "Payées" },
    { key: "overdue", label: "En retard" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Mes Factures</h1>
        <p className="text-gray-400 mt-1">Consultez et gerez vos factures</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <SummaryCard
          label="Total facturé"
          value={formatAmount(totalInvoiced)}
          icon={<TrendingUp size={24} />}
          color="blue"
        />
        <SummaryCard
          label="Total payé"
          value={formatAmount(totalPaid)}
          icon={<CheckCircle2 size={24} />}
          color="green"
        />
        <SummaryCard
          label="En attente"
          value={formatAmount(totalPending)}
          icon={<Clock size={24} />}
          color="yellow"
        />
        <SummaryCard
          label="En retard"
          value={formatAmount(totalOverdue)}
          icon={<AlertTriangle size={24} />}
          color="red"
        />
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Search */}
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            placeholder="Rechercher par référence ou projet..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 transition-all"
          />
        </div>

        {/* Filter tabs */}
        <div className="flex items-center gap-1 bg-white/5 border border-white/10 rounded-xl p-1 overflow-x-auto">
          {filterTabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveFilter(tab.key)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                activeFilter === tab.key
                  ? "bg-blue-600/20 text-blue-300 border border-blue-500/30"
                  : "text-gray-400 hover:text-white hover:bg-white/5 border border-transparent"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Invoices Table */}
      {filteredInvoices.length > 0 ? (
        <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
          {/* Table header */}
          <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-3 border-b border-white/5 text-xs font-medium text-gray-500 uppercase tracking-wider">
            <div className="col-span-3">Référence</div>
            <div className="col-span-2">Projet</div>
            <div className="col-span-2 text-right">Montant</div>
            <div className="col-span-2 text-center">Statut</div>
            <div className="col-span-2">Date d&apos;échéance</div>
            <div className="col-span-1 text-right">Actions</div>
          </div>

          {/* Table rows */}
          <div className="divide-y divide-white/5">
            {filteredInvoices.map((invoice) => (
              <div
                key={invoice.id}
                className="grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-4 px-6 py-4 hover:bg-white/5 transition-colors items-center"
              >
                <div className="col-span-3">
                  <span className="text-sm font-medium text-white">{invoice.reference}</span>
                  <p className="text-xs text-gray-500 md:hidden mt-0.5">{invoice.projectName}</p>
                </div>
                <div className="col-span-2 hidden md:block">
                  <span className="text-sm text-gray-400">{invoice.projectName}</span>
                </div>
                <div className="col-span-2 text-right">
                  <span className="text-sm font-semibold text-white">
                    {formatAmount(invoice.amount)}
                  </span>
                </div>
                <div className="col-span-2 text-center">
                  <StatusBadge status={invoice.status} />
                </div>
                <div className="col-span-2">
                  <span className="text-sm text-gray-400">{invoice.dueDate}</span>
                </div>
                <div className="col-span-1 flex items-center justify-end gap-2">
                  <button
                    className="p-2 rounded-lg text-gray-500 hover:text-blue-400 hover:bg-blue-500/10 transition-all"
                    title="Télécharger PDF"
                  >
                    <Download size={15} />
                  </button>
                  {invoice.status !== "paid" && (
                    <button
                      className="p-2 rounded-lg text-gray-500 hover:text-emerald-400 hover:bg-emerald-500/10 transition-all"
                      title="Payer"
                    >
                      <CreditCard size={15} />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="bg-white/5 border border-white/10 rounded-2xl p-12">
          <div className="text-center">
            <div className="w-16 h-16 rounded-2xl bg-blue-600/10 flex items-center justify-center mx-auto mb-4">
              <Receipt size={28} className="text-blue-400/60" />
            </div>
            <h3 className="text-white font-medium text-lg mb-2">Aucune facture</h3>
            <p className="text-gray-500 text-sm max-w-md mx-auto">
              Vous n&apos;avez pas encore de factures. Vos factures apparaitront ici une fois emises.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
