"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface AdminGlowCardProps {
  label: string;
  value: number;
  icon: React.ReactNode;
  trend?: { value: number; label: string };
  prefix?: string;
  suffix?: string;
  delay?: number;
}

function AnimatedCounter({
  value,
  prefix = "",
  suffix = "",
}: {
  value: number;
  prefix?: string;
  suffix?: string;
}) {
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    stiffness: 60,
    damping: 20,
    mass: 1,
  });
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    motionValue.set(value);
  }, [value, motionValue]);

  useEffect(() => {
    const unsubscribe = springValue.on("change", (latest) => {
      if (latest >= 1000) {
        setDisplay(
          Math.round(latest).toLocaleString("fr-FR")
        );
      } else {
        setDisplay(Math.round(latest).toString());
      }
    });
    return unsubscribe;
  }, [springValue]);

  return (
    <span className="font-mono text-3xl font-bold text-text-primary tracking-tight">
      {prefix}
      {display}
      {suffix}
    </span>
  );
}

export default function AdminGlowCard({
  label,
  value,
  icon,
  trend,
  prefix = "",
  suffix = "",
  delay = 0,
}: AdminGlowCardProps) {
  const divRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const trendColor =
    !trend
      ? ""
      : trend.value > 0
      ? "text-emerald-400"
      : trend.value < 0
      ? "text-red-400"
      : "text-text-muted";

  const TrendIcon =
    !trend
      ? null
      : trend.value > 0
      ? TrendingUp
      : trend.value < 0
      ? TrendingDown
      : Minus;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: delay * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <div
        ref={divRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsFocused(true)}
        onMouseLeave={() => setIsFocused(false)}
        className="relative rounded-2xl overflow-hidden bg-dark-2 border border-white/[0.06] hover:border-white/[0.12] transition-all duration-500"
      >
        {/* Glow effect */}
        <div
          className="pointer-events-none absolute inset-0 transition-opacity duration-500"
          style={{
            opacity: isFocused ? 1 : 0,
            background: `radial-gradient(350px circle at ${position.x}px ${position.y}px, rgba(249,115,22,0.07), transparent 40%)`,
          }}
        />

        <div className="relative z-[2] p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="w-11 h-11 rounded-xl bg-accent/10 flex items-center justify-center text-accent">
              {icon}
            </div>
            {trend && TrendIcon && (
              <div className={`flex items-center gap-1 text-xs ${trendColor}`}>
                <TrendIcon size={14} />
                <span className="font-mono">
                  {trend.value > 0 ? "+" : ""}
                  {trend.value}%
                </span>
              </div>
            )}
          </div>

          <AnimatedCounter value={value} prefix={prefix} suffix={suffix} />

          <div className="mt-1.5 flex items-center justify-between">
            <span className="text-sm text-text-secondary">{label}</span>
            {trend && (
              <span className="text-[0.65rem] text-text-muted">{trend.label}</span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
