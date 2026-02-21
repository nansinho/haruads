"use client";

import { useState, useEffect } from "react";
import {
  BarChart3,
  TrendingUp,
  Eye,
  Users,
  FileText,
  ArrowUpRight,
  Calendar,
  Loader2,
  RefreshCw,
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
    <div className="bg-dark-2 border border-border-dark rounded-2xl p-5">
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

interface StatsData {
  totalViews: number;
  uniqueVisitors: number;
  totalPages: number;
  conversionRate: number;
  topPages: { path: string; views: number; uniqueVisitors: number; avgTime: string }[];
  dailyViews: { date: string; views: number }[];
}

const defaultStats: StatsData = {
  totalViews: 0,
  uniqueVisitors: 0,
  totalPages: 0,
  conversionRate: 0,
  topPages: [],
  dailyViews: [],
};

export default function StatistiquesPage() {
  const [period, setPeriod] = useState("30");
  const [stats, setStats] = useState<StatsData>(defaultStats);
  const [loading, setLoading] = useState(true);

  const fetchStats = async (periodDays: string) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/stats?period=${periodDays}`);
      if (!res.ok) throw new Error("Erreur");
      const json = await res.json();
      setStats({
        totalViews: json.totalViews || 0,
        uniqueVisitors: json.uniqueVisitors || 0,
        totalPages: json.totalPages || 0,
        conversionRate: json.conversionRate || 0,
        topPages: json.topPages || [],
        dailyViews: json.dailyViews || [],
      });
    } catch {
      // Keep defaults on error
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats(period);
  }, [period]);

  const periods = [
    { value: "7", label: "7j" },
    { value: "30", label: "30j" },
    { value: "90", label: "90j" },
  ];

  return (
    <PageTransition className="space-y-6">
      <AnimatedSection>
        <PageHeader
          title="Statistiques"
          subtitle="Analyses detaillees de votre activite"
          icon={<BarChart3 size={24} />}
          actions={
            <div className="flex items-center gap-2">
              {periods.map((p) => (
                <button
                  key={p.value}
                  onClick={() => setPeriod(p.value)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium transition-all ${
                    period === p.value
                      ? "bg-accent-dim text-accent border border-accent/20"
                      : "bg-dark-2 text-text-secondary border border-border-dark hover:bg-dark-3 hover:text-text-primary"
                  }`}
                >
                  {p.value === period && <Calendar size={16} />}
                  {p.label}
                </button>
              ))}
              <button
                onClick={() => fetchStats(period)}
                className="p-2.5 bg-dark-2 border border-border-dark rounded-full text-text-muted hover:text-text-primary hover:bg-dark-3 transition-colors"
                title="Actualiser"
              >
                <RefreshCw size={16} />
              </button>
            </div>
          }
        />
      </AnimatedSection>

      {loading ? (
        <div className="flex justify-center py-32">
          <Loader2 size={32} className="text-accent animate-spin" />
        </div>
      ) : (
        <>
          {/* Metrics */}
          <AnimatedSection>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <MetricCard
                label="Visites totales"
                value={stats.totalViews.toLocaleString("fr-FR")}
                icon={<Eye size={20} />}
              />
              <MetricCard
                label="Visiteurs uniques"
                value={stats.uniqueVisitors.toLocaleString("fr-FR")}
                icon={<Users size={20} />}
              />
              <MetricCard
                label="Pages indexees"
                value={stats.totalPages.toLocaleString("fr-FR")}
                icon={<FileText size={20} />}
              />
              <MetricCard
                label="Taux de conversion"
                value={`${stats.conversionRate.toFixed(1)}%`}
                icon={<TrendingUp size={20} />}
              />
            </div>
          </AnimatedSection>

          {/* Daily Views Table */}
          <AnimatedSection>
            <div className="bg-dark-2 border border-border-dark rounded-2xl p-6">
              <h3 className="text-base font-semibold text-text-primary mb-4">Visites par jour</h3>
              {stats.dailyViews.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border-dark">
                        <th className="text-left px-5 py-3 text-[0.65rem] font-mono font-semibold text-text-muted uppercase tracking-wider">
                          Date
                        </th>
                        <th className="text-right px-5 py-3 text-[0.65rem] font-mono font-semibold text-text-muted uppercase tracking-wider">
                          Vues
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/[0.06]">
                      {stats.dailyViews.map((day, i) => (
                        <tr key={i} className="hover:bg-dark-3 transition-colors">
                          <td className="px-5 py-3">
                            <span className="text-sm text-text-secondary">
                              {new Date(day.date).toLocaleDateString("fr-FR", {
                                weekday: "short",
                                day: "2-digit",
                                month: "short",
                              })}
                            </span>
                          </td>
                          <td className="px-5 py-3 text-right">
                            <div className="flex items-center justify-end gap-3">
                              <div className="w-32 h-2 bg-dark rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-accent/60 rounded-full"
                                  style={{
                                    width: `${
                                      stats.dailyViews.length > 0
                                        ? (day.views / Math.max(...stats.dailyViews.map((d) => d.views), 1)) * 100
                                        : 0
                                    }%`,
                                  }}
                                />
                              </div>
                              <span className="text-sm font-medium text-text-primary min-w-[3rem] text-right">
                                {day.views.toLocaleString("fr-FR")}
                              </span>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="flex items-center justify-center h-48 border border-dashed border-border-dark rounded-xl">
                  <div className="text-center">
                    <BarChart3 size={32} className="text-text-muted mx-auto mb-2" />
                    <p className="text-text-muted text-sm">
                      Aucune donnee de visite pour cette periode
                    </p>
                  </div>
                </div>
              )}
            </div>
          </AnimatedSection>

          {/* Top Pages Table */}
          <AnimatedSection>
            <div className="bg-dark-2 border border-border-dark rounded-2xl p-6">
              <h3 className="text-base font-semibold text-text-primary mb-4">
                Pages les plus visitees
              </h3>
              {stats.topPages.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border-dark">
                        <th className="px-5 py-3 text-left text-[0.65rem] font-mono font-semibold text-text-muted uppercase tracking-wider">
                          Page
                        </th>
                        <th className="px-5 py-3 text-right text-[0.65rem] font-mono font-semibold text-text-muted uppercase tracking-wider">
                          Vues
                        </th>
                        <th className="px-5 py-3 text-right text-[0.65rem] font-mono font-semibold text-text-muted uppercase tracking-wider">
                          Visiteurs uniques
                        </th>
                        <th className="px-5 py-3 text-right text-[0.65rem] font-mono font-semibold text-text-muted uppercase tracking-wider">
                          Temps moyen
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/[0.06]">
                      {stats.topPages.map((page, i) => (
                        <tr key={i} className="hover:bg-dark-3 transition-colors">
                          <td className="px-5 py-3">
                            <span className="text-sm text-text-primary font-medium">
                              {page.path}
                            </span>
                          </td>
                          <td className="px-5 py-3 text-right">
                            <span className="text-sm text-text-secondary">
                              {page.views.toLocaleString("fr-FR")}
                            </span>
                          </td>
                          <td className="px-5 py-3 text-right">
                            <span className="text-sm text-text-secondary">
                              {page.uniqueVisitors.toLocaleString("fr-FR")}
                            </span>
                          </td>
                          <td className="px-5 py-3 text-right">
                            <span className="text-sm text-text-muted">
                              {page.avgTime || "-"}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="flex items-center justify-center h-48 border border-dashed border-border-dark rounded-xl">
                  <div className="text-center">
                    <FileText size={32} className="text-text-muted mx-auto mb-2" />
                    <p className="text-text-muted text-sm">
                      Aucune donnee de pages pour cette periode
                    </p>
                  </div>
                </div>
              )}
            </div>
          </AnimatedSection>
        </>
      )}
    </PageTransition>
  );
}
