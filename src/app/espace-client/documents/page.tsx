"use client";

import { useState } from "react";
import {
  FileText,
  Download,
  Search,
  File,
  FileImage,
  FileSpreadsheet,
  FileArchive,
} from "lucide-react";

type DocumentCategory = "all" | "contrat" | "facture" | "livrable" | "brief";

interface Document {
  id: string;
  name: string;
  category: DocumentCategory;
  projectName: string;
  fileType: string;
  size: string;
  date: string;
  url: string;
}

const categoryConfig: Record<string, { label: string; color: string }> = {
  contrat: { label: "Contrat", color: "bg-blue-500/20 text-blue-300 border-blue-500/30" },
  facture: { label: "Facture", color: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30" },
  livrable: { label: "Livrable", color: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30" },
  brief: { label: "Brief", color: "bg-orange-500/20 text-orange-300 border-orange-500/30" },
};

function getFileIcon(fileType: string) {
  switch (fileType.toLowerCase()) {
    case "pdf":
      return <FileText size={18} className="text-red-400" />;
    case "png":
    case "jpg":
    case "jpeg":
    case "svg":
      return <FileImage size={18} className="text-purple-400" />;
    case "xlsx":
    case "csv":
      return <FileSpreadsheet size={18} className="text-emerald-400" />;
    case "zip":
    case "rar":
      return <FileArchive size={18} className="text-yellow-400" />;
    default:
      return <File size={18} className="text-gray-400" />;
  }
}

function CategoryBadge({ category }: { category: string }) {
  const config = categoryConfig[category];
  if (!config) return null;
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium border ${config.color}`}>
      {config.label}
    </span>
  );
}

function DocumentRow({ doc }: { doc: Document }) {
  return (
    <div className="flex items-center gap-4 p-4 bg-white/5 border border-white/10 rounded-xl hover:border-blue-500/20 transition-all group">
      {/* File icon */}
      <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0">
        {getFileIcon(doc.fileType)}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <h3 className="text-sm font-medium text-white truncate group-hover:text-blue-300 transition-colors">
          {doc.name}
        </h3>
        <p className="text-xs text-gray-500 mt-0.5">{doc.projectName}</p>
      </div>

      {/* Category */}
      <div className="hidden sm:block">
        <CategoryBadge category={doc.category} />
      </div>

      {/* File type */}
      <div className="hidden md:block">
        <span className="text-xs text-gray-500 uppercase font-mono">{doc.fileType}</span>
      </div>

      {/* Size */}
      <div className="hidden md:block">
        <span className="text-xs text-gray-500">{doc.size}</span>
      </div>

      {/* Date */}
      <div className="hidden lg:block">
        <span className="text-xs text-gray-500">{doc.date}</span>
      </div>

      {/* Download */}
      <button className="p-2 rounded-lg text-gray-500 hover:text-blue-400 hover:bg-blue-500/10 transition-all flex-shrink-0">
        <Download size={16} />
      </button>
    </div>
  );
}

export default function ClientDocumentsPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<DocumentCategory>("all");

  // Placeholder data - will be replaced with API call
  const documents: Document[] = [];

  const filteredDocuments = documents.filter((d) => {
    const matchSearch = d.name.toLowerCase().includes(search.toLowerCase());
    const matchCategory = activeCategory === "all" || d.category === activeCategory;
    return matchSearch && matchCategory;
  });

  const categoryTabs: { key: DocumentCategory; label: string }[] = [
    { key: "all", label: "Tous" },
    { key: "contrat", label: "Contrats" },
    { key: "facture", label: "Factures" },
    { key: "livrable", label: "Livrables" },
    { key: "brief", label: "Briefs" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Mes Documents</h1>
        <p className="text-gray-400 mt-1">Retrouvez tous vos documents en un seul endroit</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Search */}
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            placeholder="Rechercher un document..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 transition-all"
          />
        </div>

        {/* Category tabs */}
        <div className="flex items-center gap-1 bg-white/5 border border-white/10 rounded-xl p-1 overflow-x-auto">
          {categoryTabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveCategory(tab.key)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                activeCategory === tab.key
                  ? "bg-blue-600/20 text-blue-300 border border-blue-500/30"
                  : "text-gray-400 hover:text-white hover:bg-white/5 border border-transparent"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Documents list */}
      {filteredDocuments.length > 0 ? (
        <div className="space-y-2">
          {filteredDocuments.map((doc) => (
            <DocumentRow key={doc.id} doc={doc} />
          ))}
        </div>
      ) : (
        <div className="bg-white/5 border border-white/10 rounded-2xl p-12">
          <div className="text-center">
            <div className="w-16 h-16 rounded-2xl bg-blue-600/10 flex items-center justify-center mx-auto mb-4">
              <FileText size={28} className="text-blue-400/60" />
            </div>
            <h3 className="text-white font-medium text-lg mb-2">Aucun document</h3>
            <p className="text-gray-500 text-sm max-w-md mx-auto">
              Vous n&apos;avez pas encore de documents. Vos contrats, factures et livrables apparaitront ici.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
