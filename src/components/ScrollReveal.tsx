"use client";

import { motion, type Variants } from "framer-motion";
import { type ReactNode } from "react";

type AnimationType = "fadeUp" | "fadeDown" | "fadeLeft" | "fadeRight" | "scaleUp" | "blur" | "slideRotate";

const animations: Record<AnimationType, Variants> = {
  fadeUp: {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  },
  fadeDown: {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0 },
  },
  fadeLeft: {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 },
  },
  fadeRight: {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 },
  },
  scaleUp: {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 },
  },
  blur: {
    hidden: { opacity: 0, filter: "blur(10px)" },
    visible: { opacity: 1, filter: "blur(0px)" },
  },
  slideRotate: {
    hidden: { opacity: 0, y: 30, rotate: 2 },
    visible: { opacity: 1, y: 0, rotate: 0 },
  },
};

export default function ScrollReveal({
  children,
  className = "",
  delay = 0,
  animation = "fadeUp",
  duration = 0.8,
  once = true,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  animation?: AnimationType;
  duration?: number;
  once?: boolean;
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.15 }}
      variants={animations[animation]}
      transition={{
        duration,
        delay: delay / 1000,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
