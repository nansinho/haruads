"use client";

import { useRef, useCallback, useEffect, useState } from "react";
import {
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  Link,
  Unlink,
} from "lucide-react";

interface RichTextareaProps {
  id: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
  className?: string;
}

// Convert markdown to HTML for the editor
function markdownToHtml(md: string): string {
  if (!md) return "";

  let html = md
    // Escape HTML entities first
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  // Links: [text](url) → <a>
  html = html.replace(
    /\[([^\]]+)\]\(([^)]+)\)/g,
    '<a href="$2" target="_blank" rel="noopener noreferrer" style="text-decoration:underline;color:#e8954a;">$1</a>'
  );

  // Bold: **text** → <strong>
  html = html.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");

  // Italic: *text* → <em>
  html = html.replace(/\*([^*]+)\*/g, "<em>$1</em>");

  // Underline: __text__ → <u>
  html = html.replace(/__([^_]+)__/g, "<u>$1</u>");

  // Unordered lists: lines starting with "- "
  html = html.replace(/((?:^|\n)- .+(?:\n- .+)*)/g, (match) => {
    const items = match.trim().split("\n").map((line) =>
      `<li>${line.replace(/^- /, "")}</li>`
    ).join("");
    return `<ul>${items}</ul>`;
  });

  // Ordered lists: lines starting with "1. ", "2. ", etc.
  html = html.replace(/((?:^|\n)\d+\. .+(?:\n\d+\. .+)*)/g, (match) => {
    const items = match.trim().split("\n").map((line) =>
      `<li>${line.replace(/^\d+\. /, "")}</li>`
    ).join("");
    return `<ol>${items}</ol>`;
  });

  // Line breaks
  html = html.replace(/\n/g, "<br>");

  return html;
}

// Convert HTML from contentEditable to markdown for storage
function htmlToMarkdown(html: string): string {
  if (!html) return "";

  // Create a temp element to parse
  const div = document.createElement("div");
  div.innerHTML = html;

  function processNode(node: Node): string {
    if (node.nodeType === Node.TEXT_NODE) {
      return node.textContent || "";
    }

    if (node.nodeType !== Node.ELEMENT_NODE) return "";

    const el = node as HTMLElement;
    const tag = el.tagName.toLowerCase();
    const childContent = Array.from(el.childNodes).map(processNode).join("");

    switch (tag) {
      case "strong":
      case "b":
        return `**${childContent}**`;
      case "em":
      case "i":
        return `*${childContent}*`;
      case "u":
        return `__${childContent}__`;
      case "a": {
        const href = el.getAttribute("href") || "";
        return `[${childContent}](${href})`;
      }
      case "ul":
        return Array.from(el.children)
          .map((li) => `- ${processNode(li)}`)
          .join("\n");
      case "ol":
        return Array.from(el.children)
          .map((li, i) => `${i + 1}. ${processNode(li)}`)
          .join("\n");
      case "li":
        return childContent;
      case "br":
        return "\n";
      case "div":
      case "p":
        return childContent + "\n";
      default:
        return childContent;
    }
  }

  let result = Array.from(div.childNodes).map(processNode).join("");
  // Clean up: trim trailing newlines, collapse multiple newlines
  result = result.replace(/\n{3,}/g, "\n\n").trim();
  return result;
}

export default function RichTextarea({
  id,
  value,
  onChange,
  placeholder,
  rows = 4,
  className = "",
}: RichTextareaProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const [activeFormats, setActiveFormats] = useState<Set<string>>(new Set());
  const isInternalChange = useRef(false);

  // Initialize editor content from markdown value
  useEffect(() => {
    if (isInternalChange.current) {
      isInternalChange.current = false;
      return;
    }
    const editor = editorRef.current;
    if (!editor) return;
    const html = markdownToHtml(value);
    if (editor.innerHTML !== html) {
      editor.innerHTML = html;
    }
  }, [value]);

  // Check active formatting on selection change
  const updateActiveFormats = useCallback(() => {
    const formats = new Set<string>();
    try {
      if (document.queryCommandState("bold")) formats.add("bold");
      if (document.queryCommandState("italic")) formats.add("italic");
      if (document.queryCommandState("underline")) formats.add("underline");
      if (document.queryCommandState("insertUnorderedList")) formats.add("ul");
      if (document.queryCommandState("insertOrderedList")) formats.add("ol");
    } catch {
      // queryCommandState may throw in some browsers
    }
    setActiveFormats(formats);
  }, []);

  useEffect(() => {
    document.addEventListener("selectionchange", updateActiveFormats);
    return () => document.removeEventListener("selectionchange", updateActiveFormats);
  }, [updateActiveFormats]);

  const handleInput = useCallback(() => {
    const editor = editorRef.current;
    if (!editor) return;
    isInternalChange.current = true;
    const md = htmlToMarkdown(editor.innerHTML);
    onChange(md);
  }, [onChange]);

  const execCmd = useCallback((command: string, value?: string) => {
    editorRef.current?.focus();
    document.execCommand(command, false, value);
    handleInput();
    updateActiveFormats();
  }, [handleInput, updateActiveFormats]);

  const handleLink = useCallback(() => {
    const url = prompt("URL du lien :");
    if (!url) return;
    editorRef.current?.focus();
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0 || selection.isCollapsed) {
      const text = prompt("Texte du lien :") || url;
      document.execCommand("insertHTML", false, `<a href="${url}" target="_blank" rel="noopener noreferrer" style="text-decoration:underline;color:#e8954a;">${text}</a>`);
    } else {
      document.execCommand("createLink", false, url);
    }
    handleInput();
  }, [handleInput]);

  const handleUnlink = useCallback(() => {
    execCmd("unlink");
  }, [execCmd]);

  const btnBase =
    "p-1.5 rounded-lg transition-all border";
  const btnActive =
    "bg-accent/15 text-accent border-accent/20";
  const btnInactive =
    "text-admin-text-muted hover:text-admin-text hover:bg-admin-hover border-transparent hover:border-admin-input-border";

  const minHeight = rows * 24;

  const toolbarButtons = [
    { cmd: "bold", icon: Bold, key: "bold", title: "Gras (Ctrl+B)" },
    { cmd: "italic", icon: Italic, key: "italic", title: "Italique (Ctrl+I)" },
    { cmd: "underline", icon: Underline, key: "underline", title: "Souligné (Ctrl+U)" },
    "sep",
    { cmd: "insertUnorderedList", icon: List, key: "ul", title: "Liste à puces" },
    { cmd: "insertOrderedList", icon: ListOrdered, key: "ol", title: "Liste numérotée" },
    "sep",
    { cmd: "link", icon: Link, key: "link", title: "Insérer un lien" },
    { cmd: "unlink", icon: Unlink, key: "unlink", title: "Supprimer le lien" },
  ] as const;

  return (
    <div>
      {/* Toolbar */}
      <div className="flex items-center gap-0.5 mb-1.5 px-1">
        {toolbarButtons.map((btn, i) => {
          if (btn === "sep") {
            return <div key={`sep-${i}`} className="w-px h-5 bg-admin-input-border mx-1" />;
          }
          const Icon = btn.icon;
          const isActive = activeFormats.has(btn.key);
          return (
            <button
              key={btn.key}
              type="button"
              onClick={() => {
                if (btn.cmd === "link") handleLink();
                else if (btn.cmd === "unlink") handleUnlink();
                else execCmd(btn.cmd);
              }}
              className={`${btnBase} ${isActive ? btnActive : btnInactive}`}
              title={btn.title}
            >
              <Icon size={14} />
            </button>
          );
        })}
      </div>

      {/* WYSIWYG Editor */}
      <div className="relative">
        <div
          ref={editorRef}
          id={id}
          contentEditable
          suppressContentEditableWarning
          onInput={handleInput}
          onBlur={handleInput}
          data-placeholder={placeholder}
          style={{ minHeight: `${minHeight}px` }}
          className={`${className} [&:empty]:before:content-[attr(data-placeholder)] [&:empty]:before:text-admin-text-muted [&:empty]:before:pointer-events-none [&_a]:underline [&_a]:text-accent [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:my-1 [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:my-1 [&_li]:py-0.5`}
        />
      </div>
    </div>
  );
}
