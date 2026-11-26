"use client";

import { ArrowUpRight } from "lucide-react";
import { AnimatePresence, motion, useMotionValue, useSpring } from "motion/react";
import { useState } from "react";

/** Round "open" badge that trails the mouse over a project image, as in the reference. */
export function CursorBadge({ children, className }: { children: React.ReactNode; className?: string }) {
  const [on, setOn] = useState(false);
  const x = useSpring(useMotionValue(0), { stiffness: 400, damping: 35 });
  const y = useSpring(useMotionValue(0), { stiffness: 400, damping: 35 });

  return (
    <div
      className={className}
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse") return;
        const r = e.currentTarget.getBoundingClientRect();
        x.set(e.clientX - r.left);
        y.set(e.clientY - r.top);
        setOn(true);
      }}
      onPointerLeave={() => setOn(false)}
    >
      {children}
      <AnimatePresence>
        {on && (
          <motion.span
            aria-hidden
            style={{ x, y }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="pointer-events-none absolute top-0 left-0 z-10 -mt-8 -ml-8 grid size-16 place-items-center rounded-full bg-white text-neutral-950 shadow-lg"
          >
            <ArrowUpRight className="size-5" />
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
}
