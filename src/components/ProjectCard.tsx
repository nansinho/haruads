"use client";

import Link from "next/link";
import { formatCompletedAt } from "@/lib/utils";
import type { Project } from "@/types/database";

interface ProjectCardProps {
  project: Project;
  className?: string;
}

/** Strip markdown syntax for plain-text card preview */
function stripMarkdown(text: string): string {
  if (!text) return "";
  return text
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/\*([^*]+)\*/g, "$1")
    .replace(/__([^_]+)__/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");
}

export default function ProjectCard({ project, className = "" }: ProjectCardProps) {
  const dateLabel = formatCompletedAt(project.completed_at);

  return (
    <Link
      href={`/projets/${project.slug}`}
      title={`Voir le projet ${project.title}`}
      className={`flex flex-col h-full group rounded-xl overflow-hidden bg-white/[0.03] border border-white/[0.06] hover:border-accent/30 hover:bg-white/[0.06] transition-all duration-500 ${className}`}
    >
      {/* Image */}
      <div className="aspect-[16/10] relative overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={project.image_url}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col gap-3">
        {/* Badges row */}
        <div className="flex items-center gap-2">
          {project.category && (
            <span className="px-2 py-[3px] text-[0.65rem] font-semibold uppercase tracking-wider text-accent border border-accent/30 rounded-md bg-accent/[0.08]">
              {project.category}
            </span>
          )}
          {dateLabel && (
            <span className="px-2 py-[3px] text-[0.65rem] font-medium text-white/50 border border-white/[0.08] rounded-md">
              {dateLabel}
            </span>
          )}
        </div>

        {/* Title & client */}
        <div>
          <h3 className="text-[0.95rem] font-semibold text-white leading-snug group-hover:text-accent transition-colors duration-300">
            {project.title}
          </h3>
          {project.client && (
            <p className="text-[0.7rem] text-white/40 mt-1">
              {project.client}
            </p>
          )}
        </div>

        {/* Description */}
        <p className="text-[0.78rem] text-white/55 leading-[1.7] line-clamp-2">
          {stripMarkdown(project.description)}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mt-auto pt-1">
          {project.tags?.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 rounded text-[0.62rem] font-medium text-white/40 bg-white/[0.05]"
            >
              {tag}
            </span>
          ))}
          {project.tags && project.tags.length > 4 && (
            <span className="px-2 py-0.5 rounded text-[0.62rem] font-medium text-white/30">
              +{project.tags.length - 4}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
