"use client";

import { useEffect, useState, useCallback } from "react";
import {
  Users,
  FileText,
  MessageSquare,
  Ticket,
  Mail,
  Eye,
  DollarSign,
  AlertCircle,
  FolderKanban,
  MapPin,
  Search,
  Megaphone,
  Loader2,
  RefreshCw,
} from "lucide-react";
import Link from "next/link";
import AdminGlowCard from "@/components/admin/AdminGlowCard";
import PageTransition, { AnimatedSection } from "@/components/admin/PageTransition";
import { formatDateTime } from "@/lib/utils";
import type { DashboardStats } from "@/types/database";

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

interface ActivityItem {
  id: string;
  action: string;
  severity: string;
  details: Record<string, unknown>;
  created_at: string;
}

function QuickAction({ label, href, icon }: { label: string; href: string; icon: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 p-3 rounded-xl bg-dark border border-white/[0.06] hover:border-accent/20 hover:bg-accent-dim transition-all duration-200 group"
    >
      <span className="text-text-muted group-hover:text-accent transition-colors">{icon}</span>
      <span className="text-sm text-text-secondary group-hover:text-text-primary transition-colors">{label}</span>
    </Link>
  );
}

const severityColors: Record<string, string> = {
  info: "bg-blue-500/15 text-blue-400",
  warning: "bg-yellow-500/15 text-yellow-400",
  error: "bg-red-500/15 text-red-400",
  critical: "bg-red-500/15 text-red-300",
};

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>(defaultStats);
  const [activity, setActivity] = useState<ActivityItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [time, setTime] = useState("");

  const fetchDashboard = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/dashboard");
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || `Erreur ${res.status}`);
      }
      const json = await res.json();
      setStats(json.stats || defaultStats);
      setActivity(json.activity || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur de chargement");
      setStats(defaultStats);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboard();
  }, [fetchDashboard]);

  useEffect(() => {
    const update = () => {
      setTime(
        new Date().toLocaleTimeString("fr-FR", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  const today = new Date().toLocaleDateString("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <PageTransition className="space-y-8">
      {/* Header */}
      <AnimatedSection>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h1 className="font-serif text-2xl text-text-primary">
              Bienvenue sur votre <span className="text-gradient">Dashboard</span>
            </h1>
            <p className="text-sm text-text-secondary mt-1 capitalize">{today}</p>
          </div>
          <div className="flex items-center gap-4">
            {loading && <Loader2 size={16} className="text-accent animate-spin" />}
            {error && (
              <span className="text-xs text-yellow-400 bg-yellow-500/10 px-3 py-1 rounded-full border border-yellow-500/20">
                Mode hors-ligne
              </span>
            )}
            <div className="font-mono text-2xl text-text-muted tabular-nums">
              {time}
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Stats Grid - Top row */}
      <AnimatedSection>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          <AdminGlowCard
            label="Revenu Total"
            value={stats.total_revenue}
            icon={<DollarSign size={22} />}
            prefix=""
            suffix=" €"
            delay={0}
          />
          <AdminGlowCard
            label="Nouveaux Devis"
            value={stats.new_quotes}
            icon={<MessageSquare size={22} />}
            delay={1}
          />
          <AdminGlowCard
            label="Tickets Actifs"
            value={stats.active_tickets}
            icon={<Ticket size={22} />}
            delay={2}
          />
          <AdminGlowCard
            label="Articles Blog"
            value={stats.published_articles}
            icon={<FileText size={22} />}
            delay={3}
          />
          <AdminGlowCard
            label="Visites (30j)"
            value={stats.views_30d}
            icon={<Eye size={22} />}
            delay={4}
          />
        </div>
      </AnimatedSection>

      {/* Stats Grid - Second row */}
      <AnimatedSection>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <AdminGlowCard
            label="Clients"
            value={stats.total_clients}
            icon={<Users size={22} />}
            delay={5}
          />
          <AdminGlowCard
            label="Messages Non Lus"
            value={stats.unread_messages}
            icon={<Mail size={22} />}
            delay={6}
          />
          <AdminGlowCard
            label="Abonnés Newsletter"
            value={stats.newsletter_subs}
            icon={<Megaphone size={22} />}
            delay={7}
          />
          <AdminGlowCard
            label="Factures en Retard"
            value={stats.overdue_invoices}
            icon={<AlertCircle size={22} />}
            delay={8}
          />
        </div>
      </AnimatedSection>

      {/* Quick Actions + Recent Activity */}
      <AnimatedSection>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Quick Actions */}
          <div className="bg-dark-2 border border-white/[0.06] rounded-2xl p-6">
            <h2 className="font-serif text-lg text-text-primary mb-4">
              Actions rapides
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <QuickAction label="Nouvel article" href="/admin/blog?action=new" icon={<FileText size={18} />} />
              <QuickAction label="Nouveau projet" href="/admin/projets?action=new" icon={<FolderKanban size={18} />} />
              <QuickAction label="Voir les devis" href="/admin/devis" icon={<MessageSquare size={18} />} />
              <QuickAction label="Gérer les tickets" href="/admin/tickets" icon={<Ticket size={18} />} />
              <QuickAction label="Ajouter une ville" href="/admin/villes?action=new" icon={<MapPin size={18} />} />
              <QuickAction label="Paramètres SEO" href="/admin/seo" icon={<Search size={18} />} />
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-dark-2 border border-white/[0.06] rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-serif text-lg text-text-primary">
                Activité récente
              </h2>
              <button
                onClick={fetchDashboard}
                className="p-1.5 rounded-lg hover:bg-white/[0.04] text-text-muted hover:text-text-primary transition-all"
              >
                <RefreshCw size={14} />
              </button>
            </div>
            <div className="space-y-3">
              {loading && !activity.length ? (
                <div className="flex justify-center py-8">
                  <Loader2 size={20} className="text-accent animate-spin" />
                </div>
              ) : activity.length > 0 ? (
                activity.map((item) => (
                  <div key={item.id} className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-white/[0.02] transition-colors">
                    <div className={`flex-shrink-0 w-2 h-2 rounded-full mt-1.5 ${severityColors[item.severity] || "bg-gray-500"}`} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-text-secondary truncate">
                        {item.action.replace(/_/g, " ")}
                      </p>
                      <p className="text-xs text-text-muted">{formatDateTime(item.created_at)}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-text-muted text-sm text-center py-8">
                  {error
                    ? "Connectez votre base de données Supabase pour voir l'activité récente."
                    : "Aucune activité récente."}
                </p>
              )}
            </div>
          </div>
        </div>
      </AnimatedSection>
    </PageTransition>
  );
}
