"use client";

import { motion } from "motion/react";

export const easeOut = [0.22, 1, 0.36, 1] as const;

/** Fades and lifts its children into view once, on scroll. */
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: easeOut, delay }}
    >
      {children}
    </motion.div>
  );
}

/** Section card that rises and settles into place as it scrolls in, like stacked sheets. */
export function RiseSection({ className, children, ...props }: React.ComponentProps<"section">) {
  return (
    <motion.section
      {...(props as object)}
      className={className}
      initial={{ y: 80, scale: 0.96 }}
      whileInView={{ y: 0, scale: 1 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.9, ease: easeOut }}
    >
      {children}
    </motion.section>
  );
}

/** Oversized watermark word that slides in sideways on scroll. */
export function SlideIn({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.span
      aria-hidden
      className={className}
      initial={{ opacity: 0, x: -80 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 1.1, ease: easeOut }}
    >
      {children}
    </motion.span>
  );
}
