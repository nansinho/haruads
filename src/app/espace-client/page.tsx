"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import {
  FolderKanban,
  FileText,
  Receipt,
  Ticket,
  Clock,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
} from "lucide-react";

function StatCard({
  label,
  value,
  icon,
  href,
  color,
}: {
  label: string;
  value: number;
  icon: React.ReactNode;
  href: string;
  color: string;
}) {
  const colorMap: Record<string, string> = {
    blue: "from-blue-600/20 to-blue-600/5 border-blue-500/20",
    green: "from-emerald-600/20 to-emerald-600/5 border-emerald-500/20",
    violet: "from-violet-600/20 to-violet-600/5 border-violet-500/20",
    orange: "from-orange-600/20 to-orange-600/5 border-orange-500/20",
  };
  const iconColorMap: Record<string, string> = {
    blue: "text-blue-400",
    green: "text-emerald-400",
    violet: "text-violet-400",
    orange: "text-orange-400",
  };

  return (
    <Link
      href={href}
      className={`bg-gradient-to-br ${colorMap[color]} border rounded-2xl p-5 hover:scale-[1.02] transition-all duration-300 group`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-400">{label}</p>
          <p className="text-3xl font-bold text-white mt-1">{value}</p>
        </div>
        <span className={`${iconColorMap[color]} opacity-60 group-hover:opacity-100`}>
          {icon}
        </span>
      </div>
    </Link>
  );
}

export default function EspaceClientDashboard() {
  const { data: session } = useSession();

  return (
    <div className="space-y-8">
      {/* Welcome */}
      <div>
        <h1 className="text-2xl font-bold text-white">
          Bonjour, {session?.user?.name?.split(" ")[0] || "Client"} !
        </h1>
        <p className="text-gray-400 mt-1">
          Bienvenue dans votre espace client
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Projets en cours"
          value={0}
          icon={<FolderKanban size={24} />}
          href="/espace-client/projets"
          color="blue"
        />
        <StatCard
          label="Documents"
          value={0}
          icon={<FileText size={24} />}
          href="/espace-client/documents"
          color="violet"
        />
        <StatCard
          label="Factures"
          value={0}
          icon={<Receipt size={24} />}
          href="/espace-client/factures"
          color="green"
        />
        <StatCard
          label="Tickets ouverts"
          value={0}
          icon={<Ticket size={24} />}
          href="/espace-client/tickets"
          color="orange"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Active Projects */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-white">
              Projets en cours
            </h2>
            <Link
              href="/espace-client/projets"
              className="text-sm text-blue-400 hover:text-blue-300 flex items-center gap-1"
            >
              Voir tout <ArrowRight size={14} />
            </Link>
          </div>

          <div className="space-y-3">
            <div className="text-center py-8">
              <FolderKanban size={32} className="text-gray-600 mx-auto mb-2" />
              <p className="text-gray-500 text-sm">
                Aucun projet en cours
              </p>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
          <h2 className="text-lg font-semibold text-white mb-4">
            Activite recente
          </h2>
          <div className="space-y-3">
            <div className="text-center py-8">
              <Clock size={32} className="text-gray-600 mx-auto mb-2" />
              <p className="text-gray-500 text-sm">
                Aucune activite recente
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
        <h2 className="text-lg font-semibold text-white mb-4">
          Actions rapides
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <Link
            href="/espace-client/tickets?action=new"
            className="flex items-center gap-3 p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-blue-500/20 transition-all"
          >
            <Ticket size={20} className="text-blue-400" />
            <div>
              <p className="text-sm font-medium text-white">
                Ouvrir un ticket
              </p>
              <p className="text-xs text-gray-500">
                Besoin d&apos;aide ? Contactez-nous
              </p>
            </div>
          </Link>
          <Link
            href="/espace-client/documents"
            className="flex items-center gap-3 p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-blue-500/20 transition-all"
          >
            <FileText size={20} className="text-violet-400" />
            <div>
              <p className="text-sm font-medium text-white">Mes documents</p>
              <p className="text-xs text-gray-500">
                Contrats, briefs, livrables
              </p>
            </div>
          </Link>
          <Link
            href="/espace-client/factures"
            className="flex items-center gap-3 p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-blue-500/20 transition-all"
          >
            <Receipt size={20} className="text-emerald-400" />
            <div>
              <p className="text-sm font-medium text-white">Mes factures</p>
              <p className="text-xs text-gray-500">
                Historique et paiements
              </p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
