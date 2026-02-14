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
import PageTransition, { AnimatedSection } from "@/components/admin/PageTransition";

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
    blue: "bg-cyan-500/[0.06] border-cyan-500/20",
    green: "bg-emerald-500/[0.06] border-emerald-500/20",
    violet: "bg-cyan-500/[0.06] border-cyan-500/20",
    orange: "bg-orange-500/[0.06] border-orange-500/20",
  };
  const iconColorMap: Record<string, string> = {
    blue: "text-cyan-400",
    green: "text-emerald-400",
    violet: "text-cyan-400",
    orange: "text-orange-400",
  };

  return (
    <Link
      href={href}
      className={`${colorMap[color]} border rounded-2xl p-5 hover:scale-[1.02] transition-all duration-300 group`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-text-secondary">{label}</p>
          <p className="font-serif text-3xl text-text-primary mt-1">{value}</p>
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
    <PageTransition className="space-y-8">
      {/* Welcome */}
      <AnimatedSection>
        <div>
          <h1 className="font-serif text-2xl text-text-primary">
            Bonjour, {session?.user?.name?.split(" ")[0] || "Client"} !
          </h1>
          <p className="text-text-secondary mt-1">
            Bienvenue dans votre espace client
          </p>
        </div>
      </AnimatedSection>

      {/* Stats */}
      <AnimatedSection>
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
      </AnimatedSection>

      <AnimatedSection>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Active Projects */}
          <div className="bg-dark-2 border border-white/[0.06] rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-serif text-lg text-text-primary">
                Projets en cours
              </h2>
              <Link
                href="/espace-client/projets"
                className="text-sm text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
              >
                Voir tout <ArrowRight size={14} />
              </Link>
            </div>

            <div className="space-y-3">
              <div className="text-center py-8">
                <FolderKanban size={32} className="text-text-muted mx-auto mb-2" />
                <p className="text-text-muted text-sm">
                  Aucun projet en cours
                </p>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-dark-2 border border-white/[0.06] rounded-2xl p-6">
            <h2 className="font-serif text-lg text-text-primary mb-4">
              Activite recente
            </h2>
            <div className="space-y-3">
              <div className="text-center py-8">
                <Clock size={32} className="text-text-muted mx-auto mb-2" />
                <p className="text-text-muted text-sm">
                  Aucune activite recente
                </p>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Quick Actions */}
      <AnimatedSection>
        <div className="bg-dark-2 border border-white/[0.06] rounded-2xl p-6">
          <h2 className="font-serif text-lg text-text-primary mb-4">
            Actions rapides
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Link
              href="/espace-client/tickets?action=new"
              className="flex items-center gap-3 p-4 rounded-xl bg-dark-2 hover:bg-white/[0.04] border border-white/[0.06] hover:border-cyan-500/20 transition-all"
            >
              <Ticket size={20} className="text-cyan-400" />
              <div>
                <p className="text-sm font-medium text-text-primary">
                  Ouvrir un ticket
                </p>
                <p className="text-xs text-text-muted">
                  Besoin d&apos;aide ? Contactez-nous
                </p>
              </div>
            </Link>
            <Link
              href="/espace-client/documents"
              className="flex items-center gap-3 p-4 rounded-xl bg-dark-2 hover:bg-white/[0.04] border border-white/[0.06] hover:border-cyan-500/20 transition-all"
            >
              <FileText size={20} className="text-cyan-400" />
              <div>
                <p className="text-sm font-medium text-text-primary">Mes documents</p>
                <p className="text-xs text-text-muted">
                  Contrats, briefs, livrables
                </p>
              </div>
            </Link>
            <Link
              href="/espace-client/factures"
              className="flex items-center gap-3 p-4 rounded-xl bg-dark-2 hover:bg-white/[0.04] border border-white/[0.06] hover:border-cyan-500/20 transition-all"
            >
              <Receipt size={20} className="text-emerald-400" />
              <div>
                <p className="text-sm font-medium text-text-primary">Mes factures</p>
                <p className="text-xs text-text-muted">
                  Historique et paiements
                </p>
              </div>
            </Link>
          </div>
        </div>
      </AnimatedSection>
    </PageTransition>
  );
}
