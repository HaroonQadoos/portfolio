"use client";

import { Heart } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { toggleLike } from "@/actions/likes";
import type { LikeState } from "@/lib/likes";

export function LikeButton({ slug, title, initial }: { slug: string; title: string; initial?: LikeState }) {
  const [state, setState] = useState<LikeState>(initial ?? { count: 0, liked: false });
  const [pending, startTransition] = useTransition();
  const loading = !initial;

  function onClick() {
    const previous = state;
    setState({ liked: !previous.liked, count: previous.count + (previous.liked ? -1 : 1) });
    startTransition(async () => {
      const result = await toggleLike(slug);
      if ("error" in result) {
        setState(previous);
        toast.error(result.error);
      } else {
        setState(result);
      }
    });
  }

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={loading || pending}
      aria-pressed={state.liked}
      aria-label={`${state.liked ? "Unlike" : "Like"} ${title} (${state.count} likes)`}
      className="inline-flex h-9 items-center gap-1.5 rounded-full border bg-card px-3 text-sm transition-colors hover:bg-muted focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none disabled:cursor-default"
    >
      <motion.span whileTap={{ scale: 0.75 }} animate={state.liked ? { scale: [1, 1.3, 1] } : { scale: 1 }}>
        <Heart
          className={`size-4 transition-colors ${state.liked ? "fill-rose-500 text-rose-500" : "text-muted-foreground"}`}
          aria-hidden
        />
      </motion.span>
      <span className="relative min-w-[1ch] overflow-hidden font-mono text-xs tabular-nums" aria-hidden>
        {loading ? (
          <span className="inline-block h-3 w-3 animate-pulse rounded bg-muted" />
        ) : (
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.span
              key={state.count}
              className="inline-block"
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
            >
              {state.count}
            </motion.span>
          </AnimatePresence>
        )}
      </span>
    </button>
  );
}
