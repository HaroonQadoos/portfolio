"use client";

import { Eye } from "lucide-react";
import { useEffect, useState } from "react";
import { recordVisit } from "@/actions/views";

export function VisitorCount() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    recordVisit().then(setCount, () => setCount(null));
  }, []);

  if (count === null) return null;
  return (
    <p className="inline-flex items-center gap-2 font-mono text-xs">
      <Eye className="size-3.5" aria-hidden />
      {count.toLocaleString()} unique visitors
    </p>
  );
}
