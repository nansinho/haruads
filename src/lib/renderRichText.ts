/**
 * Converts simple markdown-like syntax to HTML.
 * Supports: **bold**, *italic*, __underline__, [text](url), - list items, 1. ordered items
 * Also preserves line breaks.
 */
export function renderRichText(text: string): string {
  if (!text) return "";

  // Split into lines for list processing
  const lines = text.split("\n");
  const result: string[] = [];
  let inUl = false;
  let inOl = false;

  for (const line of lines) {
    const trimmed = line.trim();

    // Unordered list item
    if (trimmed.startsWith("- ")) {
      if (!inUl) {
        if (inOl) { result.push("</ol>"); inOl = false; }
        result.push("<ul>");
        inUl = true;
      }
      result.push(`<li>${processInline(trimmed.slice(2))}</li>`);
      continue;
    }

    // Ordered list item
    const olMatch = trimmed.match(/^\d+\.\s(.+)/);
    if (olMatch) {
      if (!inOl) {
        if (inUl) { result.push("</ul>"); inUl = false; }
        result.push("<ol>");
        inOl = true;
      }
      result.push(`<li>${processInline(olMatch[1])}</li>`);
      continue;
    }

    // Close any open lists
    if (inUl) { result.push("</ul>"); inUl = false; }
    if (inOl) { result.push("</ol>"); inOl = false; }

    // Regular line
    result.push(processInline(trimmed));
  }

  // Close any remaining open lists
  if (inUl) result.push("</ul>");
  if (inOl) result.push("</ol>");

  return result.join("<br>");
}

/** Strip markdown syntax for plain-text display (cards, previews, etc.) */
export function stripMarkdown(text: string): string {
  if (!text) return "";
  return text
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/\*([^*]+)\*/g, "$1")
    .replace(/__([^_]+)__/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");
}

/** Process inline formatting: bold, italic, underline, links */
function processInline(text: string): string {
  return text
    // Escape HTML entities
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    // Links: [text](url)
    .replace(
      /\[([^\]]+)\]\(([^)]+)\)/g,
      '<a href="$2" class="underline hover:text-accent transition-colors" target="_blank" rel="noopener noreferrer">$1</a>'
    )
    // Bold: **text**
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    // Italic: *text*
    .replace(/\*([^*]+)\*/g, "<em>$1</em>")
    // Underline: __text__
    .replace(/__([^_]+)__/g, "<u>$1</u>");
}
