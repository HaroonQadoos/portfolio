import { ArrowUpRight } from "lucide-react";
import { navLinks, profile } from "@/content/site";
import { ThemeToggle } from "./theme-toggle";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 px-2 pt-2 md:px-4">
      <nav
        aria-label="Primary"
        className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-4 rounded-full border bg-card/80 px-3 pl-4 backdrop-blur-xl supports-[backdrop-filter]:bg-card/60"
      >
        <a href="#top" className="flex items-center gap-3 rounded-full focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none">
          <span className="sr-only">{profile.name} — back to top</span>
          <span className="text-lg font-bold tracking-tight" aria-hidden>
            HQ.
          </span>
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {navLinks.map((link, i) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="group inline-flex items-baseline gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
                <span className="font-mono text-[10px] text-muted-foreground/60 group-hover:text-foreground/60">
                  ({String(i + 1).padStart(2, "0")})
                </span>
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <a
            href="#contact"
            className="inline-flex h-9 items-center gap-1.5 rounded-full bg-foreground px-4 whitespace-nowrap text-sm font-medium text-background border border-foreground transition-colors duration-300 hover:bg-transparent hover:text-foreground [&_svg]:transition-transform [&_svg]:duration-300 hover:[&_svg]:rotate-45 focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
          >
            Let&apos;s Talk <ArrowUpRight className="size-4" aria-hidden />
          </a>
        </div>
      </nav>
    </header>
  );
}
