"use client";

import RichTextarea from "./RichTextarea";

interface FormFieldProps {
  label: string;
  name: string;
  type?: "text" | "email" | "url" | "number" | "password" | "textarea" | "richtext" | "select";
  value: string | number;
  onChange: (value: string) => void;
  placeholder?: string;
  error?: string;
  required?: boolean;
  options?: { value: string; label: string }[];
  rows?: number;
}

export default function FormField({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  error,
  required,
  options,
  rows = 4,
}: FormFieldProps) {
  const baseClasses =
    "w-full px-4 py-2.5 bg-admin-input-bg border border-admin-input-border rounded-xl text-sm text-admin-text placeholder-admin-text-muted focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent/30 transition-all";
  const errorClasses = error ? "border-red-500/30 focus:ring-red-500/50" : "";

  return (
    <div className="space-y-1.5">
      <label htmlFor={name} className="block text-sm font-medium text-admin-text-secondary">
        {label}
        {required && <span className="text-red-400 ml-0.5">*</span>}
      </label>

      {type === "richtext" ? (
        <RichTextarea
          id={name}
          name={name}
          value={String(value)}
          onChange={onChange}
          placeholder={placeholder}
          rows={rows}
          className={`${baseClasses} ${errorClasses} resize-none`}
        />
      ) : type === "textarea" ? (
        <textarea
          id={name}
          name={name}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={rows}
          className={`${baseClasses} ${errorClasses} resize-none`}
        />
      ) : type === "select" ? (
        <select
          id={name}
          name={name}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`${baseClasses} ${errorClasses}`}
        >
          <option value="">Sélectionner...</option>
          {options?.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={`${baseClasses} ${errorClasses}`}
        />
      )}

      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  );
}
