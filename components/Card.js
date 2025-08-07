"use client";

import { motion, useReducedMotion } from "framer-motion";

export default function Card({ children, className = "" }) {
  const prefersReduced = useReducedMotion();
  return (
    <motion.div
      initial={prefersReduced ? false : { opacity: 0, y: 12 }}
      whileInView={prefersReduced ? {} : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.4 }}
      whileHover={prefersReduced ? {} : { scale: 1.02 }}
      className={`rounded-lg border border-[var(--border)] bg-[var(--surface)] ${className}`}
    >
      {children}
    </motion.div>
  );
}
