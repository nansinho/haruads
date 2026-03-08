"use client";

import { useRef, useCallback } from "react";

interface RichTextareaProps {
  id: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
  className?: string;
}

export default function RichTextarea({
  id,
  name,
  value,
  onChange,
  placeholder,
  rows = 4,
  className = "",
}: RichTextareaProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const wrapSelection = useCallback(
    (before: string, after: string) => {
      const textarea = textareaRef.current;
      if (!textarea) return;

      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const selected = value.substring(start, end);
      const newValue =
        value.substring(0, start) + before + selected + after + value.substring(end);
      onChange(newValue);

      requestAnimationFrame(() => {
        textarea.focus();
        if (selected) {
          textarea.setSelectionRange(start + before.length, end + before.length);
        } else {
          textarea.setSelectionRange(start + before.length, start + before.length);
        }
      });
    },
    [value, onChange]
  );

  const insertLink = useCallback(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selected = value.substring(start, end);
    const url = prompt("URL du lien :");
    if (!url) return;

    const text = selected || prompt("Texte du lien :") || url;
    const link = `[${text}](${url})`;
    const newValue = value.substring(0, start) + link + value.substring(end);
    onChange(newValue);

    requestAnimationFrame(() => {
      textarea.focus();
      const newPos = start + link.length;
      textarea.setSelectionRange(newPos, newPos);
    });
  }, [value, onChange]);

  const btnClass =
    "px-2.5 py-1.5 rounded-lg text-xs font-medium text-text-muted hover:text-text-primary hover:bg-white/[0.06] transition-all border border-transparent hover:border-white/[0.08]";

  return (
    <div>
      <div className="flex items-center gap-1 mb-1.5 px-1">
        <button
          type="button"
          onClick={() => wrapSelection("**", "**")}
          className={btnClass}
          title="Gras"
        >
          <strong>G</strong>
        </button>
        <button
          type="button"
          onClick={() => wrapSelection("*", "*")}
          className={btnClass}
          title="Italique"
        >
          <em>I</em>
        </button>
        <button
          type="button"
          onClick={insertLink}
          className={btnClass}
          title="Insérer un lien"
        >
          🔗 Lien
        </button>
      </div>
      <textarea
        ref={textareaRef}
        id={id}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        className={className}
      />
    </div>
  );
}
