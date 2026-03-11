"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";

export interface QuoteSegment {
  text: string;
  highlight?: boolean;
  italic?: boolean;
}

interface TypingQuoteProps {
  /** Plain string (legacy) */
  text?: string;
  /** Rich segments with optional highlight/italic */
  segments?: QuoteSegment[];
  className?: string;
  highlightClassName?: string;
  charDelay?: number;
  onComplete?: () => void;
}

export default function TypingQuote({
  text,
  segments,
  className = "",
  highlightClassName = "text-accent",
  charDelay = 0.03,
  onComplete,
}: TypingQuoteProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [cursorVisible, setCursorVisible] = useState(true);

  // Build flat character list with style info
  const chars = buildChars(text, segments);
  const totalDuration = chars.length * charDelay;

  useEffect(() => {
    if (!isInView) return;
    const timer = setTimeout(() => {
      setCursorVisible(false);
      onComplete?.();
    }, totalDuration * 1000 + 400);
    return () => clearTimeout(timer);
  }, [isInView, totalDuration, onComplete]);

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: charDelay } },
  };

  const charVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.05 } },
  };

  return (
    <motion.p
      ref={ref}
      className={className}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      style={{ wordBreak: "break-word", overflowWrap: "break-word" }}
    >
      {chars.map((c, i) => {
        const extraClass = [
          c.highlight ? highlightClassName : "",
          c.italic ? "italic" : "",
        ]
          .filter(Boolean)
          .join(" ");

        return (
          <motion.span
            key={i}
            variants={charVariants}
            className={extraClass || undefined}
          >
            {c.char}
          </motion.span>
        );
      })}
      {cursorVisible && (
        <motion.span
          className="text-accent"
          animate={{ opacity: [1, 0] }}
          transition={{ repeat: Infinity, duration: 0.6 }}
        >
          |
        </motion.span>
      )}
    </motion.p>
  );
}

function buildChars(
  text?: string,
  segments?: QuoteSegment[]
): { char: string; highlight: boolean; italic: boolean }[] {
  if (segments) {
    return segments.flatMap((seg) =>
      seg.text.split("").map((char) => ({
        char,
        highlight: !!seg.highlight,
        italic: !!seg.italic,
      }))
    );
  }
  return (text ?? "").split("").map((char) => ({
    char,
    highlight: false,
    italic: false,
  }));
}
