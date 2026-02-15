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
import PageTransition, { AnimatedSection } from "@/components/admin/PageTransition";

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
    blue: "bg-cyan-500/[0.06] border-cyan-500/20",
    green: "bg-emerald-500/[0.06] border-emerald-500/20",
    yellow: "bg-yellow-500/[0.06] border-yellow-500/20",
    red: "bg-red-500/[0.06] border-red-500/20",
  };
  const iconColorMap: Record<string, string> = {
    blue: "text-cyan-400",
    green: "text-emerald-400",
    yellow: "text-yellow-400",
    red: "text-red-400",
  };

  return (
    <div className={`${colorMap[color]} border rounded-2xl p-5`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-text-secondary">{label}</p>
          <p className="font-serif text-2xl text-text-primary mt-1">{value}</p>
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
    <PageTransition className="space-y-6">
      {/* Header */}
      <AnimatedSection>
        <div>
          <h1 className="font-serif text-2xl text-text-primary">Mes Factures</h1>
          <p className="text-text-secondary mt-1">Consultez et gerez vos factures</p>
        </div>
      </AnimatedSection>

      {/* Summary Cards */}
      <AnimatedSection>
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
      </AnimatedSection>

      {/* Filters */}
      <AnimatedSection>
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
            <input
              type="text"
              placeholder="Rechercher par référence ou projet..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-dark border border-white/[0.06] rounded-full text-sm text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all"
            />
          </div>

          {/* Filter tabs */}
          <div className="flex items-center gap-1 bg-dark-2 border border-white/[0.06] rounded-full p-1 overflow-x-auto">
            {filterTabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveFilter(tab.key)}
                className={`px-3 py-1.5 text-xs font-medium whitespace-nowrap transition-all ${
                  activeFilter === tab.key
                    ? "bg-cyan-500/[0.06] text-cyan-400 border border-cyan-500/20 rounded-full"
                    : "bg-dark-2 text-text-secondary border border-white/[0.06] hover:bg-white/[0.04] hover:text-text-primary rounded-full"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Invoices Table */}
      <AnimatedSection>
        {filteredInvoices.length > 0 ? (
          <div className="bg-dark-2 border border-white/[0.06] rounded-2xl overflow-hidden">
            {/* Table header */}
            <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-3 border-b border-white/[0.06] text-[0.65rem] font-mono font-semibold text-text-muted uppercase tracking-wider">
              <div className="col-span-3">Référence</div>
              <div className="col-span-2">Projet</div>
              <div className="col-span-2 text-right">Montant</div>
              <div className="col-span-2 text-center">Statut</div>
              <div className="col-span-2">Date d&apos;échéance</div>
              <div className="col-span-1 text-right">Actions</div>
            </div>

            {/* Table rows */}
            <div className="divide-y divide-white/[0.06]">
              {filteredInvoices.map((invoice) => (
                <div
                  key={invoice.id}
                  className="grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-4 px-6 py-4 hover:bg-white/[0.04] transition-colors items-center"
                >
                  <div className="col-span-3">
                    <span className="text-sm font-medium text-text-primary">{invoice.reference}</span>
                    <p className="text-xs text-text-muted md:hidden mt-0.5">{invoice.projectName}</p>
                  </div>
                  <div className="col-span-2 hidden md:block">
                    <span className="text-sm text-text-secondary">{invoice.projectName}</span>
                  </div>
                  <div className="col-span-2 text-right">
                    <span className="text-sm font-semibold text-text-primary">
                      {formatAmount(invoice.amount)}
                    </span>
                  </div>
                  <div className="col-span-2 text-center">
                    <StatusBadge status={invoice.status} />
                  </div>
                  <div className="col-span-2">
                    <span className="text-sm text-text-secondary">{invoice.dueDate}</span>
                  </div>
                  <div className="col-span-1 flex items-center justify-end gap-2">
                    <button
                      className="p-2 rounded-lg text-text-muted hover:text-cyan-400 hover:bg-cyan-500/[0.06] transition-all"
                      title="Télécharger PDF"
                    >
                      <Download size={15} />
                    </button>
                    {invoice.status !== "paid" && (
                      <button
                        className="p-2 rounded-lg text-text-muted hover:text-emerald-400 hover:bg-emerald-500/10 transition-all"
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
          <div className="bg-dark-2 border border-white/[0.06] rounded-2xl p-12">
            <div className="text-center">
              <div className="w-16 h-16 rounded-2xl bg-cyan-500/[0.06] flex items-center justify-center mx-auto mb-4">
                <Receipt size={28} className="text-text-muted" />
              </div>
              <h3 className="text-text-primary font-medium text-lg mb-2">Aucune facture</h3>
              <p className="text-text-muted text-sm max-w-md mx-auto">
                Vous n&apos;avez pas encore de factures. Vos factures apparaitront ici une fois emises.
              </p>
            </div>
          </div>
        )}
      </AnimatedSection>
    </PageTransition>
  );
}
