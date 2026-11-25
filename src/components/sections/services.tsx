"use client";

import { ArrowUpRight } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useRef, useState } from "react";
import { Panel, SectionHeading } from "@/components/section-heading";
import { easeOut } from "@/components/motion/reveal";
import { services } from "@/content/site";

export function Services() {
  const [open, setOpen] = useState(0);
  // Short delay so sweeping the mouse across rows doesn't flicker them open and shut.
  const hoverTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  return (
    <Panel id="services" labelledBy="services-title">
      <SectionHeading id="services-title" title="Services" />
      <ul className="border-t">
        {services.map((service, i) => {
          const isOpen = open === i;
          const panelId = `service-panel-${i}`;
          return (
            <li
              key={service.title}
              className="border-b"
              onPointerEnter={(e) => {
                if (e.pointerType !== "mouse") return;
                clearTimeout(hoverTimer.current);
                hoverTimer.current = setTimeout(() => setOpen(i), 120);
              }}
              onPointerLeave={() => clearTimeout(hoverTimer.current)}
            >
              <motion.div
                animate={{
                  backgroundColor: isOpen ? "var(--foreground)" : "rgba(0,0,0,0)",
                  color: isOpen ? "var(--background)" : "var(--foreground)",
                }}
                transition={{ duration: 0.4, ease: easeOut }}
                className="relative my-2 rounded-2xl"
              >
                <h3>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    className="flex w-full items-center justify-between gap-6 px-4 py-6 text-left focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none md:px-6 md:py-8"
                  >
                    <span className="text-2xl font-medium tracking-tight uppercase md:text-5xl">{service.title}</span>
                    <motion.span animate={{ rotate: isOpen ? 135 : 0 }} transition={{ duration: 0.4, ease: easeOut }}>
                      <ArrowUpRight className="size-6 md:size-8" aria-hidden />
                    </motion.span>
                  </button>
                </h3>
                <AnimatePresence>
                  {isOpen && service.image && (
                    <motion.div
                      aria-hidden
                      initial={{ opacity: 0, y: 30, rotate: 0, scale: 0.85 }}
                      animate={{ opacity: 1, y: 0, rotate: -6, scale: 1 }}
                      exit={{ opacity: 0, y: 20, rotate: 0, scale: 0.9 }}
                      transition={{ duration: 0.5, ease: easeOut }}
                      className="pointer-events-none absolute -top-8 right-[18%] z-10 hidden w-56 overflow-hidden rounded-xl border-4 border-white shadow-2xl lg:block xl:w-72"
                    >
                      <Image src={service.image} alt="" width={1440} height={900} sizes="288px" className="aspect-[16/10] object-cover" />
                    </motion.div>
                  )}
                </AnimatePresence>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={panelId}
                      role="region"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.45, ease: easeOut }}
                      className="overflow-hidden"
                    >
                      <div className="flex flex-col gap-5 px-4 pb-7 md:px-6 md:pb-9 lg:max-w-[55%]">
                        <p className="max-w-md text-sm opacity-70 md:text-base">{service.description}</p>
                        <ul className="flex flex-wrap gap-2">
                          {service.tags.map((tag) => (
                            <li key={tag} className="rounded-full border border-current/20 px-3 py-1 font-mono text-xs opacity-80">
                              {tag}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </li>
          );
        })}
      </ul>
    </Panel>
  );
}
