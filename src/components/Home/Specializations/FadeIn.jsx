"use client";

import { motion } from "framer-motion";

/**
 * FadeIn — thin client wrapper around Framer Motion.
 * Wraps server-rendered children; only this file ships motion JS.
 */
export default function FadeIn({
  children,
  direction = "up",
  delay = 0,
  duration = 0.5,
  once = true,
  viewport = true,
  className = "",
}) {
  const offset = 16;
  const initialOffset = {
    up: { y: offset },
    down: { y: -offset },
    left: { x: offset },
    right: { x: -offset },
    none: {},
  }[direction];

  const initial = { opacity: 0, ...initialOffset };
  const animateTarget = { opacity: 1, x: 0, y: 0 };

  const motionProps = viewport
    ? { initial, whileInView: animateTarget, viewport: { once, margin: "-60px" } }
    : { initial, animate: animateTarget };

  return (
    <motion.div
      {...motionProps}
      transition={{ duration, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
