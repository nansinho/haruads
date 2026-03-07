"use client";

import { useState, useRef, useEffect } from "react";
import { X, Plus } from "lucide-react";

interface TagInputProps {
  label: string;
  tags: string[];
  onChange: (tags: string[]) => void;
  placeholder?: string;
  suggestions?: string[];
}

export default function TagInput({ label, tags, onChange, placeholder = "Ajouter...", suggestions = [] }: TagInputProps) {
  const [input, setInput] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const filteredSuggestions = suggestions.filter(
    (s) => s.toLowerCase().includes(input.toLowerCase()) && !tags.includes(s)
  );

  const addTag = (tag?: string) => {
    const value = (tag || input).trim();
    if (value && !tags.includes(value)) {
      onChange([...tags, value]);
    }
    setInput("");
    setShowSuggestions(false);
  };

  const removeTag = (index: number) => {
    onChange(tags.filter((_, i) => i !== index));
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="space-y-1.5" ref={wrapperRef}>
      <label className="block text-sm font-medium text-text-secondary">{label}</label>
      <div className="relative">
        <div className="flex flex-wrap gap-2 p-3 bg-dark border border-white/[0.08] rounded-xl min-h-[42px]">
          {tags.map((tag, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-1 px-2.5 py-1 bg-accent/10 text-accent text-xs font-medium rounded-lg border border-accent/20"
            >
              {tag}
              <button onClick={() => removeTag(i)} className="hover:text-red-400 transition-colors">
                <X size={12} />
              </button>
            </span>
          ))}
          <div className="flex items-center gap-1 flex-1 min-w-[120px]">
            <input
              type="text"
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                setShowSuggestions(true);
              }}
              onFocus={() => setShowSuggestions(true)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addTag();
                }
              }}
              placeholder={placeholder}
              className="flex-1 bg-transparent text-sm text-text-primary placeholder-text-muted outline-none"
            />
            {input.trim() && (
              <button onClick={() => addTag()} className="text-accent hover:text-accent-hover transition-colors">
                <Plus size={16} />
              </button>
            )}
          </div>
        </div>

        {/* Suggestions dropdown */}
        {showSuggestions && filteredSuggestions.length > 0 && (
          <div className="absolute z-10 w-full mt-1 bg-dark-2 border border-white/[0.10] rounded-xl shadow-lg max-h-40 overflow-y-auto">
            {filteredSuggestions.slice(0, 10).map((suggestion) => (
              <button
                key={suggestion}
                type="button"
                onClick={() => addTag(suggestion)}
                className="w-full text-left px-3 py-2 text-sm text-text-secondary hover:text-accent hover:bg-white/[0.04] transition-colors first:rounded-t-xl last:rounded-b-xl"
              >
                {suggestion}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
