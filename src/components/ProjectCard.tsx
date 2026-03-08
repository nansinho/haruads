"use client";

import Link from "next/link";
import { formatCompletedAt } from "@/lib/utils";
import type { Project } from "@/types/database";

interface ProjectCardProps {
  project: Project;
  className?: string;
}

export default function ProjectCard({ project, className = "" }: ProjectCardProps) {
  return (
    <Link
      href={`/projets/${project.slug}`}
      title={`Voir le projet ${project.title}`}
      className={`flex flex-col h-full group rounded-2xl overflow-hidden bg-white border border-gray-100 hover:shadow-xl hover:shadow-accent/5 transition-all duration-500 ${className}`}
    >
      <div className="aspect-[16/10] relative overflow-hidden bg-gray-100">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={project.image_url}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {project.category && (
          <div className="absolute top-3 left-3">
            <span className="px-2.5 py-0.5 rounded-full bg-white/90 backdrop-blur-sm text-[0.68rem] font-medium text-text-dark">
              {project.category}
            </span>
          </div>
        )}
        {project.completed_at && (
          <div className="absolute top-3 right-3">
            <span className="px-2.5 py-0.5 rounded-full bg-dark/70 backdrop-blur-sm text-[0.68rem] font-medium text-white">
              {formatCompletedAt(project.completed_at)}
            </span>
          </div>
        )}
      </div>
      <div className="p-5 flex-1 flex flex-col">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-[0.95rem] font-semibold text-text-dark leading-snug">
              {project.title}
            </h3>
            {project.client && (
              <p className="text-[0.7rem] text-text-body/60 mt-0.5">
                Client : {project.client}
              </p>
            )}
          </div>
          <div className="shrink-0 w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 stroke-accent fill-none stroke-2">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </div>
        </div>
        <p className="text-[0.8rem] text-text-body leading-[1.7] mt-1.5 line-clamp-2">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-1.5 mt-auto pt-3">
          {project.tags?.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-0.5 rounded-full bg-accent/10 text-[0.65rem] font-medium text-accent"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
