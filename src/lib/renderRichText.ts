/**
 * Converts simple markdown-like syntax to HTML.
 * Supports: **bold**, *italic*, [text](url)
 * Also preserves line breaks.
 */
export function renderRichText(text: string): string {
  if (!text) return "";

  let html = text
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
    .replace(/\*([^*]+)\*/g, "<em>$1</em>");

  return html;
}
