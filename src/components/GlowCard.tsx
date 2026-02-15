"use client";

import { useRef, useState, useCallback, type ReactNode } from "react";

export default function GlowCard({
  children,
  className = "",
  variant = "dark",
}: {
  children: ReactNode;
  className?: string;
  variant?: "dark" | "light";
}) {
  const divRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current || !glowRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    glowRef.current.style.setProperty("--glow-x", `${x}px`);
    glowRef.current.style.setProperty("--glow-y", `${y}px`);
  }, []);

  const glowColor =
    variant === "light"
      ? "rgba(249,115,22,0.08)"
      : "rgba(249,115,22,0.07)";

  const baseClasses =
    variant === "light"
      ? "bg-white border border-gray-100 hover:shadow-lg hover:shadow-accent/5"
      : "bg-dark-2 border border-white/[0.06] hover:border-white/[0.12]";

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsFocused(true)}
      onMouseLeave={() => setIsFocused(false)}
      className={`relative rounded-2xl overflow-hidden transition-all duration-500 ${baseClasses} ${className}`}
    >
      <div
        ref={glowRef}
        className="pointer-events-none absolute inset-0 transition-opacity duration-500"
        style={{
          opacity: isFocused ? 1 : 0,
          background: `radial-gradient(400px circle at var(--glow-x, 0px) var(--glow-y, 0px), ${glowColor}, transparent 40%)`,
        }}
      />
      <div className="relative z-[2]">{children}</div>
    </div>
  );
}
