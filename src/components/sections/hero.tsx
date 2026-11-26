"use client";

import { ArrowDown, ArrowUpRight, FileDown } from "lucide-react";
import { motion, useMotionTemplate, useMotionValue } from "motion/react";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { easeOut } from "@/components/motion/reveal";
import { profile } from "@/content/site";

function Letters({ text, delay, className, outline = false }: { text: string; delay: number; className?: string; outline?: boolean }) {
  return (
    <span className={`inline-flex overflow-hidden pb-[0.06em] ${className ?? ""}`} aria-hidden>
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          className="relative inline-block"
          // Reference intro: each letter fades in from a soft blur, no slide.
          initial={{ opacity: 0, filter: "blur(14px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 1, ease: easeOut, delay: delay + i * 0.06 }}
        >
          {outline ? (
            <>
              <span className="text-outline">{char}</span>
              {/* Fill layer hides the font's overlapping inner contours, leaving only the outer stroke. */}
              <span className="absolute inset-0 text-card">{char}</span>
            </>
          ) : (
            char
          )}
        </motion.span>
      ))}
    </span>
  );
}

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: easeOut, delay },
});

// Grayscale portrait; a color copy is revealed in a soft circle under the cursor.
function Portrait() {
  const mx = useMotionValue(-999);
  const my = useMotionValue(-999);
  const reveal = useMotionTemplate`radial-gradient(130px circle at ${mx}px ${my}px, black 35%, transparent 100%)`;
  const ref = useRef<HTMLDivElement>(null);

  // Listen on window: the hero's text row overlaps the portrait and would swallow element-level events.
  useEffect(() => {
    const move = (e: PointerEvent) => {
      const r = ref.current?.getBoundingClientRect();
      if (!r) return;
      mx.set(e.clientX - r.left);
      my.set(e.clientY - r.top);
    };
    window.addEventListener("pointermove", move);
    return () => window.removeEventListener("pointermove", move);
  }, [mx, my]);

  return (
    <motion.div
      ref={ref}
      // Rises from below the hero's bottom edge while fading in; the fade runs a little faster so the climb stays visible.
      initial={{ y: "110%", opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ y: { duration: 1.4, ease: [0.76, 0, 0.24, 1], delay: 1 }, opacity: { duration: 0.9, ease: "easeOut", delay: 1.1 } }}
      className="pointer-events-none relative z-10 mx-auto mt-8 h-80 w-fit mask-[linear-gradient(to_top,transparent,black_18%)] lg:absolute lg:inset-x-0 lg:bottom-17 lg:mt-0 lg:h-[68%]"
    >
      <Image
        src="/portrait.png"
        alt={`Portrait of ${profile.name}`}
        width={512}
        height={512}
        priority
        className="h-full w-auto object-contain object-bottom grayscale"
      />
      <motion.div aria-hidden className="absolute inset-0" style={{ maskImage: reveal, WebkitMaskImage: reveal }}>
        <Image src="/portrait.png" alt="" width={512} height={512} priority className="h-full w-auto object-contain object-bottom" />
      </motion.div>
    </motion.div>
  );
}

export function Hero() {
  const x = useMotionValue(-999);
  const y = useMotionValue(-999);
  const spotlight = useMotionTemplate`radial-gradient(480px circle at ${x}px ${y}px, color-mix(in oklch, var(--foreground) 9%, transparent), transparent 70%)`;

  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        x.set(e.clientX - r.left);
        y.set(e.clientY - r.top);
      }}
      className="relative mx-2 -mt-16 overflow-hidden rounded-[1.75rem] bg-card px-5 pt-32 pb-10 md:mx-4 md:rounded-[2.5rem] md:px-12 md:pt-40 md:pb-14"
    >
      <div aria-hidden className="bg-grid pointer-events-none absolute inset-0" />
      <motion.div aria-hidden className="pointer-events-none absolute inset-0" style={{ background: spotlight }} />

      <div className="relative mx-auto flex min-h-[calc(100svh-12rem)] max-w-[92rem] flex-col @container">
        <h1
          id="hero-title"
          aria-label={`${profile.name}, ${profile.role}`}
          className="flex flex-wrap gap-x-[0.25em] text-[length:16.5vw] leading-[0.9] font-black tracking-tight uppercase md:flex-nowrap md:text-[length:min(9.6cqw,9rem)]"
        >
          <Letters text={profile.firstName} delay={0.1} outline />
          <Letters text={profile.lastName} delay={0.35} className="text-foreground/75" />
        </h1>

        <motion.p {...fadeUp(0.9)} className="mt-6 font-mono text-xs tracking-widest text-muted-foreground uppercase md:text-sm">
          {profile.role} · Shopify · Webflow · Next.js
        </motion.p>

        <Portrait />

        <div className="relative z-20 mt-auto grid gap-8 pt-14 md:grid-cols-[1.2fr_1fr] md:items-end">
          <motion.div {...fadeUp(1)}>
            <p className="max-w-xl text-2xl leading-tight font-semibold tracking-tight text-balance md:text-4xl">
              {profile.headline}
            </p>
            <p className="mt-4 max-w-lg text-base text-muted-foreground">{profile.summary}</p>
          </motion.div>

          <motion.div {...fadeUp(1.1)} className="flex flex-wrap gap-3 md:justify-end">
            <a
              href="#work"
              className="inline-flex h-12 items-center gap-2 rounded-full bg-foreground px-6 text-sm font-medium text-background border border-foreground transition-colors duration-300 hover:bg-transparent hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
            >
              View Projects <ArrowDown className="size-4" aria-hidden />
            </a>
            <a
              href={profile.resume}
              download
              className="inline-flex h-12 items-center gap-2 rounded-full border bg-card px-6 text-sm font-medium transition-colors hover:bg-muted focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
            >
              Download Resume <FileDown className="size-4" aria-hidden />
            </a>
          </motion.div>
        </div>

        <motion.div
          {...fadeUp(1.3)}
          className="relative z-20 mt-12 flex items-center justify-between border-t pt-5 font-mono text-xs text-muted-foreground"
        >
          <span>{profile.yearsOfExperience} year building for the web</span>
          <a href="#services" className="inline-flex items-center gap-1 hover:text-foreground">
            Scroll <ArrowUpRight className="size-3 rotate-90" aria-hidden />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
