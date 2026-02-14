"use client";

import { useState } from "react";
import {
  FolderKanban,
  Calendar,
  Clock,
  Search,
  Filter,
} from "lucide-react";
import PageTransition, { AnimatedSection } from "@/components/admin/PageTransition";

type ProjectStatus = "pending" | "in_progress" | "review" | "completed" | "on_hold";

interface Project {
  id: string;
  name: string;
  description: string;
  status: ProjectStatus;
  progress: number;
  startDate: string;
  endDate: string;
  amount: number;
}

const statusConfig: Record<ProjectStatus, { label: string; color: string }> = {
  pending: { label: "En attente", color: "bg-gray-500/20 text-gray-300 border-gray-500/30" },
  in_progress: { label: "En cours", color: "bg-blue-500/20 text-blue-300 border-blue-500/30" },
  review: { label: "En revue", color: "bg-orange-500/20 text-orange-300 border-orange-500/30" },
  completed: { label: "Terminé", color: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30" },
  on_hold: { label: "En pause", color: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30" },
};

function ProgressBar({ value }: { value: number }) {
  return (
    <div className="w-full h-2 bg-white/[0.06] rounded-full overflow-hidden">
      <div
        className="h-full bg-cyan-500 rounded-full transition-all duration-500"
        style={{ width: `${value}%` }}
      />
    </div>
  );
}

function StatusBadge({ status }: { status: ProjectStatus }) {
  const config = statusConfig[status];
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium border ${config.color}`}>
      {config.label}
    </span>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="bg-dark-2 border border-white/[0.06] rounded-2xl p-6 hover:border-cyan-500/20 transition-all duration-300 group">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1 min-w-0">
          <h3 className="text-text-primary font-semibold text-lg truncate group-hover:text-cyan-400 transition-colors">
            {project.name}
          </h3>
          <p className="text-text-muted text-sm mt-1 line-clamp-2">{project.description}</p>
        </div>
        <StatusBadge status={project.status} />
      </div>

      <div className="space-y-4">
        {/* Progress */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-text-secondary">Progression</span>
            <span className="text-sm font-medium text-cyan-400">{project.progress}%</span>
          </div>
          <ProgressBar value={project.progress} />
        </div>

        {/* Info row */}
        <div className="flex items-center justify-between pt-2 border-t border-white/[0.06]">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 text-xs text-text-muted">
              <Calendar size={13} />
              <span>{project.startDate}</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-text-muted">
              <Clock size={13} />
              <span>{project.endDate}</span>
            </div>
          </div>
          <span className="text-sm font-semibold text-text-primary">
            {project.amount.toLocaleString("fr-FR")} DH
          </span>
        </div>
      </div>
    </div>
  );
}

export default function ClientProjetsPage() {
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<ProjectStatus | "all">("all");

  // Placeholder data - will be replaced with API call
  const projects: Project[] = [];

  const filteredProjects = projects.filter((p) => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === "all" || p.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const statusFilters: { key: ProjectStatus | "all"; label: string }[] = [
    { key: "all", label: "Tous" },
    { key: "pending", label: "En attente" },
    { key: "in_progress", label: "En cours" },
    { key: "review", label: "En revue" },
    { key: "completed", label: "Terminés" },
    { key: "on_hold", label: "En pause" },
  ];

  return (
    <PageTransition className="space-y-6">
      {/* Header */}
      <AnimatedSection>
        <div>
          <h1 className="font-serif text-2xl text-text-primary">Mes Projets</h1>
          <p className="text-text-secondary mt-1">Suivez l&apos;avancement de vos projets</p>
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
              placeholder="Rechercher un projet..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-dark border border-white/[0.06] rounded-full text-sm text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all"
            />
          </div>

          {/* Status filter */}
          <div className="flex items-center gap-1 bg-dark-2 border border-white/[0.06] rounded-full p-1 overflow-x-auto">
            {statusFilters.map((f) => (
              <button
                key={f.key}
                onClick={() => setFilterStatus(f.key)}
                className={`px-3 py-1.5 text-xs font-medium whitespace-nowrap transition-all ${
                  filterStatus === f.key
                    ? "bg-cyan-500/[0.06] text-cyan-400 border border-cyan-500/20 rounded-full"
                    : "bg-dark-2 text-text-secondary border border-white/[0.06] hover:bg-white/[0.04] hover:text-text-primary rounded-full"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Projects Grid */}
      <AnimatedSection>
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <div className="bg-dark-2 border border-white/[0.06] rounded-2xl p-12">
            <div className="text-center">
              <div className="w-16 h-16 rounded-2xl bg-cyan-500/[0.06] flex items-center justify-center mx-auto mb-4">
                <FolderKanban size={28} className="text-text-muted" />
              </div>
              <h3 className="text-text-primary font-medium text-lg mb-2">Aucun projet</h3>
              <p className="text-text-muted text-sm max-w-md mx-auto">
                Vous n&apos;avez pas encore de projets. Vos projets apparaitront ici une fois crees.
              </p>
            </div>
          </div>
        )}
      </AnimatedSection>
    </PageTransition>
  );
}
