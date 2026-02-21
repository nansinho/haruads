"use client";

import { useEffect, useState } from "react";
import { useMotionValue, useSpring } from "framer-motion";
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
  const springValue = useSpring(motionValue, { stiffness: 80, damping: 25 });
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    motionValue.set(value);
  }, [value, motionValue]);

  useEffect(() => {
    const unsubscribe = springValue.on("change", (latest) => {
      setDisplay(
        latest >= 1000
          ? Math.round(latest).toLocaleString("fr-FR")
          : Math.round(latest).toString()
      );
    });
    return unsubscribe;
  }, [springValue]);

  return (
    <span className="font-mono text-2xl font-semibold text-text-primary tracking-tight">
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
}: AdminGlowCardProps) {
  const trendColor = !trend
    ? ""
    : trend.value > 0
    ? "text-emerald-400"
    : trend.value < 0
    ? "text-red-400"
    : "text-text-muted";

  const TrendIcon = !trend
    ? null
    : trend.value > 0
    ? TrendingUp
    : trend.value < 0
    ? TrendingDown
    : Minus;

  return (
    <div className="rounded-xl bg-dark-2 border border-border-dark hover:border-white/15 transition-colors duration-200 p-5">
      <div className="flex items-center justify-between mb-3">
        <div className="w-9 h-9 rounded-lg bg-accent/8 flex items-center justify-center text-accent">
          {icon}
        </div>
        {trend && TrendIcon && (
          <div className={`flex items-center gap-1 text-xs ${trendColor}`}>
            <TrendIcon size={13} />
            <span className="font-mono">
              {trend.value > 0 ? "+" : ""}
              {trend.value}%
            </span>
          </div>
        )}
      </div>

      <AnimatedCounter value={value} prefix={prefix} suffix={suffix} />

      <div className="mt-1 flex items-center justify-between">
        <span className="text-[0.8rem] text-text-secondary">{label}</span>
        {trend && (
          <span className="text-[0.65rem] text-text-muted">{trend.label}</span>
        )}
      </div>
    </div>
  );
}
