"use client";

import { motion } from "framer-motion";

/**
 * FadeIn — thin client wrapper around Framer Motion.
 *
 * Server Components render their JSX as `children` and pass it in here.
 * Only this wrapper ships motion's JS to the browser — the section content
 * itself (markup, text, icons) is still server-rendered and sent as static HTML.
 *
 * @param {React.ReactNode} children
 * @param {"up"|"down"|"left"|"right"|"none"} direction - entrance direction
 * @param {number} delay - seconds
 * @param {number} duration - seconds
 * @param {boolean} once - animate only the first time it enters viewport
 * @param {boolean} viewport - if true, trigger on scroll-into-view (whileInView).
 *                             If false, trigger immediately on mount (for hero).
 * @param {string} className
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
    ? {
        initial,
        whileInView: animateTarget,
        viewport: { once, margin: "-60px" },
      }
    : {
        initial,
        animate: animateTarget,
      };

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
