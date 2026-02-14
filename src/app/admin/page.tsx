"use client";

import { useEffect, useState } from "react";
import {
  Users,
  FileText,
  MessageSquare,
  Ticket,
  Mail,
  Eye,
  TrendingUp,
  DollarSign,
  AlertCircle,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import Link from "next/link";

interface DashboardStats {
  total_clients: number;
  new_quotes: number;
  active_tickets: number;
  published_articles: number;
  newsletter_subs: number;
  unread_messages: number;
  total_projects: number;
  total_revenue: number;
  overdue_invoices: number;
  views_30d: number;
}

const defaultStats: DashboardStats = {
  total_clients: 0,
  new_quotes: 0,
  active_tickets: 0,
  published_articles: 0,
  newsletter_subs: 0,
  unread_messages: 0,
  total_projects: 0,
  total_revenue: 0,
  overdue_invoices: 0,
  views_30d: 0,
};

function StatCard({
  label,
  value,
  icon,
  href,
  trend,
  color = "violet",
}: {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  href: string;
  trend?: { value: number; label: string };
  color?: string;
}) {
  const colorMap: Record<string, string> = {
    violet: "from-violet-600/20 to-violet-600/5 border-violet-500/20",
    blue: "from-blue-600/20 to-blue-600/5 border-blue-500/20",
    green: "from-emerald-600/20 to-emerald-600/5 border-emerald-500/20",
    orange: "from-orange-600/20 to-orange-600/5 border-orange-500/20",
    red: "from-red-600/20 to-red-600/5 border-red-500/20",
    cyan: "from-cyan-600/20 to-cyan-600/5 border-cyan-500/20",
  };

  const iconColorMap: Record<string, string> = {
    violet: "text-violet-400",
    blue: "text-blue-400",
    green: "text-emerald-400",
    orange: "text-orange-400",
    red: "text-red-400",
    cyan: "text-cyan-400",
  };

  return (
    <Link
      href={href}
      className={`relative bg-gradient-to-br ${colorMap[color]} border rounded-2xl p-5 hover:scale-[1.02] transition-all duration-300 group`}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-gray-400">{label}</p>
          <p className="text-3xl font-bold text-white mt-1">{value}</p>
          {trend && (
            <div className="flex items-center gap-1 mt-2">
              {trend.value >= 0 ? (
                <ArrowUpRight size={14} className="text-emerald-400" />
              ) : (
                <ArrowDownRight size={14} className="text-red-400" />
              )}
              <span
                className={`text-xs ${
                  trend.value >= 0 ? "text-emerald-400" : "text-red-400"
                }`}
              >
                {Math.abs(trend.value)}%
              </span>
              <span className="text-xs text-gray-500">{trend.label}</span>
            </div>
          )}
        </div>
        <div
          className={`${iconColorMap[color]} opacity-60 group-hover:opacity-100 transition-opacity`}
        >
          {icon}
        </div>
      </div>
    </Link>
  );
}

function QuickAction({
  label,
  href,
  icon,
}: {
  label: string;
  href: string;
  icon: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-violet-500/20 transition-all duration-200"
    >
      <span className="text-violet-400">{icon}</span>
      <span className="text-sm text-gray-300">{label}</span>
    </Link>
  );
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>(defaultStats);

  useEffect(() => {
    // TODO: Fetch from Supabase dashboard_stats view
    setStats(defaultStats);
  }, []);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Tableau de bord</h1>
        <p className="text-gray-400 mt-1">
          Vue d&apos;ensemble de votre activite
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        <StatCard
          label="Revenu Total"
          value={`${stats.total_revenue.toLocaleString("fr-FR")} €`}
          icon={<DollarSign size={24} />}
          href="/admin/statistiques"
          color="green"
        />
        <StatCard
          label="Nouveaux Devis"
          value={stats.new_quotes}
          icon={<MessageSquare size={24} />}
          href="/admin/devis"
          color="violet"
        />
        <StatCard
          label="Tickets Actifs"
          value={stats.active_tickets}
          icon={<Ticket size={24} />}
          href="/admin/tickets"
          color="orange"
        />
        <StatCard
          label="Articles Blog"
          value={stats.published_articles}
          icon={<FileText size={24} />}
          href="/admin/blog"
          color="blue"
        />
        <StatCard
          label="Visites (30j)"
          value={stats.views_30d}
          icon={<Eye size={24} />}
          href="/admin/statistiques"
          color="cyan"
        />
      </div>

      {/* Second row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Clients"
          value={stats.total_clients}
          icon={<Users size={24} />}
          href="/admin/utilisateurs"
          color="violet"
        />
        <StatCard
          label="Messages Non Lus"
          value={stats.unread_messages}
          icon={<Mail size={24} />}
          href="/admin/messages"
          color="blue"
        />
        <StatCard
          label="Abonnés Newsletter"
          value={stats.newsletter_subs}
          icon={<TrendingUp size={24} />}
          href="/admin/newsletter"
          color="green"
        />
        <StatCard
          label="Factures en Retard"
          value={stats.overdue_invoices}
          icon={<AlertCircle size={24} />}
          href="/admin/statistiques"
          color="red"
        />
      </div>

      {/* Quick Actions + Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quick Actions */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
          <h2 className="text-lg font-semibold text-white mb-4">
            Actions rapides
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <QuickAction
              label="Nouvel article"
              href="/admin/blog?action=new"
              icon={<FileText size={18} />}
            />
            <QuickAction
              label="Nouveau projet"
              href="/admin/projets?action=new"
              icon={<FileText size={18} />}
            />
            <QuickAction
              label="Voir les devis"
              href="/admin/devis"
              icon={<MessageSquare size={18} />}
            />
            <QuickAction
              label="Gérer les tickets"
              href="/admin/tickets"
              icon={<Ticket size={18} />}
            />
            <QuickAction
              label="Ajouter une ville"
              href="/admin/villes?action=new"
              icon={<MessageSquare size={18} />}
            />
            <QuickAction
              label="Paramètres SEO"
              href="/admin/seo"
              icon={<TrendingUp size={18} />}
            />
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
          <h2 className="text-lg font-semibold text-white mb-4">
            Activite recente
          </h2>
          <div className="space-y-3">
            <p className="text-gray-500 text-sm text-center py-8">
              Connectez votre base de donnees Supabase pour voir l&apos;activite
              recente.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
