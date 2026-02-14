"use client";

import {
  BarChart3,
  TrendingUp,
  Eye,
  Users,
  FileText,
  ArrowUpRight,
  Calendar,
} from "lucide-react";

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
    <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
      <div className="flex items-center justify-between mb-3">
        <span className="text-gray-500">{icon}</span>
        {change && (
          <span className="flex items-center gap-1 text-xs text-emerald-400">
            <ArrowUpRight size={12} />
            {change}
          </span>
        )}
      </div>
      <p className="text-2xl font-bold text-white">{value}</p>
      <p className="text-sm text-gray-400 mt-1">{label}</p>
    </div>
  );
}

function ChartPlaceholder({ title, height = "h-64" }: { title: string; height?: string }) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
      <h3 className="text-lg font-semibold text-white mb-4">{title}</h3>
      <div
        className={`${height} flex items-center justify-center border border-dashed border-white/10 rounded-xl`}
      >
        <div className="text-center">
          <BarChart3 size={40} className="text-gray-600 mx-auto mb-2" />
          <p className="text-gray-500 text-sm">
            Connectez Supabase pour afficher les graphiques
          </p>
        </div>
      </div>
    </div>
  );
}

export default function StatistiquesPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Statistiques</h1>
          <p className="text-gray-400 mt-1">
            Analyses detaillees de votre activite
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-violet-600/15 text-violet-300 border border-violet-500/20 rounded-xl text-sm">
            <Calendar size={16} />
            30 derniers jours
          </button>
        </div>
      </div>

      {/* Metrics */}
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

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartPlaceholder title="Visites par jour" />
        <ChartPlaceholder title="Sources de trafic" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartPlaceholder title="Pages les plus visitées" />
        <ChartPlaceholder title="Parcours chatbot" />
      </div>

      {/* Top pages */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
        <h3 className="text-lg font-semibold text-white mb-4">
          Pages les plus visitees
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/5">
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                  Page
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                  Vues
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                  Visiteurs uniques
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                  Temps moyen
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td
                  colSpan={4}
                  className="px-4 py-12 text-center text-gray-500"
                >
                  Connectez Supabase pour voir les statistiques
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
