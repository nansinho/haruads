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
  FolderKanban,
  MapPin,
  Search,
  Megaphone,
} from "lucide-react";
import Link from "next/link";
import AdminGlowCard from "@/components/admin/AdminGlowCard";
import PageTransition, { AnimatedSection } from "@/components/admin/PageTransition";

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

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>(defaultStats);
  const [time, setTime] = useState("");

  useEffect(() => {
    setStats(defaultStats);
  }, []);

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
          <div className="font-mono text-2xl text-text-muted tabular-nums">
            {time}
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
            <h2 className="font-serif text-lg text-text-primary mb-4">
              Activité récente
            </h2>
            <div className="space-y-3">
              <p className="text-text-muted text-sm text-center py-8">
                Connectez votre base de données Supabase pour voir l&apos;activité récente.
              </p>
            </div>
          </div>
        </div>
      </AnimatedSection>
    </PageTransition>
  );
}
