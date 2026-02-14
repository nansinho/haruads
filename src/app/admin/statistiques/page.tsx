"use client";

import { useState } from "react";
import {
  BarChart3,
  TrendingUp,
  Eye,
  Users,
  FileText,
  ArrowUpRight,
  Calendar,
} from "lucide-react";
import PageHeader from "@/components/admin/PageHeader";
import PageTransition, { AnimatedSection } from "@/components/admin/PageTransition";

function MetricCard({
  label,
  value,
  change,
  icon,
}: {
  label: string;
  value: string;
  change?: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="bg-dark-2 border border-white/[0.06] rounded-2xl p-5">
      <div className="flex items-center justify-between mb-3">
        <span className="text-text-muted">{icon}</span>
        {change && (
          <span className="flex items-center gap-1 text-xs text-emerald-400">
            <ArrowUpRight size={12} />
            {change}
          </span>
        )}
      </div>
      <p className="text-2xl font-bold text-text-primary">{value}</p>
      <p className="text-sm text-text-muted mt-1">{label}</p>
    </div>
  );
}

function ChartPlaceholder({ title, height = "h-64" }: { title: string; height?: string }) {
  return (
    <div className="bg-dark-2 border border-white/[0.06] rounded-2xl p-6">
      <h3 className="font-serif text-lg text-text-primary mb-4">{title}</h3>
      <div
        className={`${height} flex items-center justify-center border border-dashed border-white/[0.06] rounded-xl`}
      >
        <div className="text-center">
          <BarChart3 size={40} className="text-text-muted mx-auto mb-2" />
          <p className="text-text-muted text-sm">
            Connectez Supabase pour afficher les graphiques
          </p>
        </div>
      </div>
    </div>
  );
}

export default function StatistiquesPage() {
  const [period] = useState("30j");

  return (
    <PageTransition className="space-y-6">
      <AnimatedSection>
        <PageHeader
          title="Statistiques"
          subtitle="Analyses detaillees de votre activite"
          icon={<BarChart3 size={24} />}
          actions={
            <button className="flex items-center gap-2 px-4 py-2.5 bg-accent-dim text-accent border border-accent/20 rounded-full text-sm font-medium hover:bg-accent/20 transition-all">
              <Calendar size={16} />
              30 derniers jours
            </button>
          }
        />
      </AnimatedSection>

      {/* Metrics */}
      <AnimatedSection>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard
            label="Visites ce mois"
            value="0"
            change="+0%"
            icon={<Eye size={20} />}
          />
          <MetricCard
            label="Visiteurs uniques"
            value="0"
            change="+0%"
            icon={<Users size={20} />}
          />
          <MetricCard
            label="Pages vues"
            value="0"
            change="+0%"
            icon={<FileText size={20} />}
          />
          <MetricCard
            label="Taux de conversion"
            value="0%"
            change="+0%"
            icon={<TrendingUp size={20} />}
          />
        </div>
      </AnimatedSection>

      {/* Charts */}
      <AnimatedSection>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ChartPlaceholder title="Visites par jour" />
          <ChartPlaceholder title="Sources de trafic" />
        </div>
      </AnimatedSection>

      <AnimatedSection>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ChartPlaceholder title="Pages les plus visitées" />
          <ChartPlaceholder title="Parcours chatbot" />
        </div>
      </AnimatedSection>

      {/* Top pages */}
      <AnimatedSection>
        <div className="bg-dark-2 border border-white/[0.06] rounded-2xl p-6">
          <h3 className="font-serif text-lg text-text-primary mb-4">
            Pages les plus visitees
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/[0.06]">
                  <th className="px-5 py-3 text-left text-[0.65rem] font-mono font-semibold text-text-muted uppercase tracking-wider">
                    Page
                  </th>
                  <th className="px-5 py-3 text-left text-[0.65rem] font-mono font-semibold text-text-muted uppercase tracking-wider">
                    Vues
                  </th>
                  <th className="px-5 py-3 text-left text-[0.65rem] font-mono font-semibold text-text-muted uppercase tracking-wider">
                    Visiteurs uniques
                  </th>
                  <th className="px-5 py-3 text-left text-[0.65rem] font-mono font-semibold text-text-muted uppercase tracking-wider">
                    Temps moyen
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td
                    colSpan={4}
                    className="px-5 py-12 text-center text-text-muted"
                  >
                    Connectez Supabase pour voir les statistiques
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </AnimatedSection>
    </PageTransition>
  );
}
