import { ArrowUpRight, Check } from "lucide-react";
import Image from "next/image";
import { CursorBadge } from "@/components/cursor-badge";
import { LikeButton } from "@/components/like-button";
import type { Project } from "@/content/site";
import type { LikeState } from "@/lib/likes";

function GitHubIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 .5a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 0-.8.4-1.3.7-1.6-2.7-.3-5.5-1.3-5.5-6 0-1.2.5-2.3 1.3-3.1-.2-.4-.6-1.6 0-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0C17.3 4.6 18.3 5 18.3 5c.6 1.6.2 2.8.1 3.2.8.8 1.3 1.9 1.3 3.1 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .5Z" />
    </svg>
  );
}

/** Shown when a project has no screenshot yet: a typographic preview in the site's style. */
function GeneratedPreview({ project }: { project: Project }) {
  return (
    <div className="relative flex size-full flex-col justify-between bg-foreground p-6 text-background">
      <div aria-hidden className="bg-grid absolute inset-0 opacity-40 invert" />
      <div
        aria-hidden
        className="absolute -top-1/3 -right-1/4 size-[70%] rounded-full bg-[radial-gradient(circle,color-mix(in_oklch,var(--background)_22%,transparent),transparent_70%)] blur-2xl"
      />
      <span className="relative font-mono text-[10px] tracking-widest uppercase opacity-60">{project.category}</span>
      <span className="relative text-3xl leading-none font-black tracking-tight uppercase md:text-4xl">{project.title}</span>
    </div>
  );
}

export function ProjectCard({ project, likes, featured = false }: { project: Project; likes?: LikeState; featured?: boolean }) {
  return (
    <article className="group flex h-full flex-col rounded-3xl border bg-background/60 p-2 transition-shadow hover:shadow-xl hover:shadow-foreground/5">
      <CursorBadge className={`relative overflow-hidden rounded-2xl ${featured ? "aspect-[16/10] md:aspect-[21/8]" : "aspect-[16/10]"}`}>
        <div className="relative size-full transition-transform duration-700 ease-out group-hover:scale-[1.03]">
          {project.image ? (
            <Image
              src={project.image}
              alt={`${project.title} preview`}
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
          ) : (
            <GeneratedPreview project={project} />
          )}
        </div>
        <span className="absolute top-3 left-3 rounded-full bg-card px-2.5 py-1 font-mono text-[10px] tracking-wider uppercase shadow-sm">
          {project.category}
        </span>
        {project.liveUrl && (
          // Makes the whole image clickable like the reference; the labelled "Live demo" button below stays the accessible link.
          <a href={project.liveUrl} target="_blank" rel="noreferrer" tabIndex={-1} aria-hidden className="absolute inset-0" />
        )}
      </CursorBadge>

      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-lg font-semibold tracking-tight">{project.title}</h3>
          <LikeButton slug={project.slug} title={project.title} initial={likes} />
        </div>
        <p className="mt-2 text-sm text-muted-foreground">{project.description}</p>

        <ul className="mt-4 space-y-1.5" aria-label="Architecture highlights">
          {project.highlights.map((h) => (
            <li key={h} className="flex items-start gap-2 text-sm">
              <Check className="mt-0.5 size-3.5 shrink-0 text-emerald-500" aria-hidden />
              {h}
            </li>
          ))}
        </ul>

        <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Tech used">
          {project.tags.map((tag) => (
            <li key={tag} className="rounded-full border bg-card px-2.5 py-0.5 font-mono text-[11px] text-muted-foreground">
              {tag}
            </li>
          ))}
        </ul>

        <div className="mt-auto flex gap-2 pt-6">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-9 items-center gap-1.5 rounded-full bg-foreground px-4 text-sm font-medium text-background border border-foreground transition-colors duration-300 hover:bg-transparent hover:text-foreground [&_svg]:transition-transform [&_svg]:duration-300 hover:[&_svg]:rotate-45"
            >
              Live demo <ArrowUpRight className="size-4" aria-hidden />
              <span className="sr-only">for {project.title} (opens in new tab)</span>
            </a>
          )}
          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-9 items-center gap-1.5 rounded-full border bg-card px-4 text-sm font-medium transition-colors hover:bg-muted"
            >
              <GitHubIcon className="size-4" aria-hidden /> Code
              <span className="sr-only">for {project.title} on GitHub (opens in new tab)</span>
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

export { GitHubIcon };
