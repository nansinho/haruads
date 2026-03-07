"use client";

import { useState, useRef, useCallback } from "react";
import { Upload, X, Image as ImageIcon, Loader2 } from "lucide-react";

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
  required?: boolean;
}

export default function ImageUpload({ value, onChange, label = "Image", required }: ImageUploadProps) {
  const [dragging, setDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = useCallback(async (file: File) => {
    setError(null);
    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Erreur lors de l'upload");
      }

      onChange(data.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur lors de l'upload");
    } finally {
      setUploading(false);
    }
  }, [onChange]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);

    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      handleUpload(file);
    } else {
      setError("Veuillez déposer une image (JPG, PNG, WebP, GIF, SVG)");
    }
  }, [handleUpload]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);
  }, []);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleUpload(file);
    }
    // Reset input so the same file can be selected again
    e.target.value = "";
  }, [handleUpload]);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemove = () => {
    onChange("");
    setError(null);
  };

  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-medium text-text-secondary">
        {label}
        {required && <span className="text-red-400 ml-0.5">*</span>}
      </label>

      {value ? (
        <div className="relative group rounded-xl overflow-hidden border border-white/[0.10] bg-dark">
          <img
            src={value}
            alt="Aperçu"
            className="w-full h-40 object-cover"
          />
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={handleClick}
              className="px-3 py-1.5 bg-white/20 backdrop-blur-sm text-white text-sm rounded-lg hover:bg-white/30 transition-colors"
            >
              Changer
            </button>
            <button
              type="button"
              onClick={handleRemove}
              className="p-1.5 bg-red-500/80 text-white rounded-lg hover:bg-red-500 transition-colors"
            >
              <X size={16} />
            </button>
          </div>
          <div className="px-3 py-2 bg-dark-2 text-xs text-text-muted truncate">
            {value}
          </div>
        </div>
      ) : (
        <div
          onClick={handleClick}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={`relative flex flex-col items-center justify-center gap-3 p-8 rounded-xl border-2 border-dashed cursor-pointer transition-all ${
            dragging
              ? "border-accent bg-accent/10"
              : "border-white/[0.12] hover:border-accent/40 hover:bg-white/[0.02]"
          } ${uploading ? "pointer-events-none opacity-60" : ""}`}
        >
          {uploading ? (
            <>
              <Loader2 size={28} className="text-accent animate-spin" />
              <p className="text-sm text-text-secondary">Upload en cours...</p>
            </>
          ) : (
            <>
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                {dragging ? (
                  <ImageIcon size={24} className="text-accent" />
                ) : (
                  <Upload size={24} className="text-accent" />
                )}
              </div>
              <div className="text-center">
                <p className="text-sm text-text-primary font-medium">
                  {dragging ? "Relâchez pour uploader" : "Cliquez ou glissez-déposez"}
                </p>
                <p className="text-xs text-text-muted mt-1">
                  JPG, PNG, WebP, GIF, SVG - 5 Mo max
                </p>
              </div>
            </>
          )}
        </div>
      )}

      {/* URL manual input fallback */}
      {!value && !uploading && (
        <div className="flex items-center gap-2 mt-2">
          <span className="text-xs text-text-muted">ou</span>
          <input
            type="url"
            placeholder="Coller une URL d'image..."
            onBlur={(e) => {
              if (e.target.value) {
                onChange(e.target.value);
              }
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                const input = e.target as HTMLInputElement;
                if (input.value) {
                  onChange(input.value);
                }
              }
            }}
            className="flex-1 px-3 py-1.5 bg-dark border border-white/[0.10] rounded-lg text-xs text-text-primary placeholder-text-muted focus:outline-none focus:ring-1 focus:ring-accent/50 transition-all"
          />
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif,image/svg+xml"
        onChange={handleFileSelect}
        className="hidden"
      />

      {error && (
        <p className="text-xs text-red-400 mt-1">{error}</p>
      )}
    </div>
  );
}
