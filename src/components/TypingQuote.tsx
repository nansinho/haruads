"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";

interface TypingQuoteProps {
  text: string;
  className?: string;
  charDelay?: number;
  onComplete?: () => void;
}

export default function TypingQuote({
  text,
  className = "",
  charDelay = 0.03,
  onComplete,
}: TypingQuoteProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [cursorVisible, setCursorVisible] = useState(true);

  const totalDuration = text.length * charDelay;

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
    visible: {
      transition: { staggerChildren: charDelay },
    },
  };

  const charVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.05 } },
  };

  const characters = text.split("");

  return (
    <motion.p
      ref={ref}
      className={className}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {characters.map((char, i) => (
        <motion.span key={i} variants={charVariants}>
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
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
