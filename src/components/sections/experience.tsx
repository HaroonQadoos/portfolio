"use client";

import { AnimatePresence, motion, useMotionValue, useSpring } from "motion/react";
import Image from "next/image";
import { useState } from "react";
import { easeOut, Reveal, RiseSection } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/section-heading";
import { experience, profile } from "@/content/site";

export function Experience() {
  // Hovered row's preview image trails the cursor on a spring.
  const [active, setActive] = useState<number | null>(null);
  const x = useSpring(useMotionValue(0), { stiffness: 300, damping: 30 });
  const y = useSpring(useMotionValue(0), { stiffness: 300, damping: 30 });
  const preview = active !== null ? experience[active].image : undefined;

  return (
    <RiseSection
      id="experience"
      aria-labelledby="experience-title"
      className="mx-2 mt-2 overflow-hidden rounded-[1.75rem] bg-neutral-950 px-5 py-16 text-white md:mx-4 md:rounded-[2.5rem] md:px-12 md:py-24 dark:border dark:border-white/10"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          id="experience-title"
          title="Experience"
          inverted
          aside={<span className="text-sm text-white/60">{profile.yearsOfExperience} year of experience</span>}
        />

        <ol
          className="relative border-l border-white/15 pl-6 md:pl-10"
          onPointerMove={(e) => {
            const r = e.currentTarget.getBoundingClientRect();
            x.set(e.clientX - r.left);
            y.set(e.clientY - r.top);
          }}
          onPointerLeave={() => setActive(null)}
        >
          <AnimatePresence>
            {preview && (
              <motion.div
                key={preview}
                aria-hidden
                style={{ x, y }}
                initial={{ opacity: 0, scale: 0.6, rotate: -8 }}
                animate={{ opacity: 1, scale: 1, rotate: -4 }}
                exit={{ opacity: 0, scale: 0.6, rotate: 0 }}
                transition={{ duration: 0.35, ease: easeOut }}
                className="pointer-events-none absolute top-0 left-0 z-20 -mt-28 ml-6 hidden w-64 overflow-hidden rounded-xl border-4 border-white/90 shadow-2xl lg:block"
              >
                <Image src={preview} alt="" width={1440} height={900} sizes="256px" className="aspect-[16/10] object-cover" />
              </motion.div>
            )}
          </AnimatePresence>
          {experience.map((job, i) => (
            <li
              key={`${job.company}-${job.role}`}
              onPointerEnter={() => setActive(i)}
              className="relative pb-12 last:pb-0"
            >
              <span
                aria-hidden
                className="absolute top-1.5 -left-[29px] size-2.5 rounded-full bg-white ring-4 ring-neutral-950 md:-left-[45px]"
              />
              <Reveal delay={i * 0.08}>
                <div className="flex flex-col gap-1 md:flex-row md:items-baseline md:justify-between">
                  <div>
                    <h3 className="text-xl font-medium md:text-2xl">{job.role}</h3>
                    <p className="text-white/50">{job.company}</p>
                  </div>
                  <p className="font-mono text-sm text-white/50">{job.period}</p>
                </div>
                <ul className="mt-5 space-y-2.5">
                  {job.achievements.map((a) => (
                    <li key={a} className="flex gap-3 text-sm text-white/75 md:text-base">
                      <span aria-hidden className="mt-2.5 h-px w-3 shrink-0 bg-white/40" />
                      {a}
                    </li>
                  ))}
                </ul>
                {job.links && (
                  <ul className="mt-5 flex flex-wrap gap-2" aria-label="Projects">
                    {job.links.map((l) => (
                      <li key={l.url}>
                        <a
                          href={l.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block rounded-full bg-white/10 px-3 py-1 text-sm text-white/85 transition-colors hover:bg-white hover:text-neutral-950"
                        >
                          {l.label} ↗
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
                <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Tools used">
                  {job.tags.map((t) => (
                    <li key={t} className="rounded-full border border-white/15 px-2.5 py-0.5 font-mono text-[11px] text-white/60">
                      {t}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </RiseSection>
  );
}
