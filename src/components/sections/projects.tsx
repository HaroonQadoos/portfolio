import { Suspense } from "react";
import { Reveal } from "@/components/motion/reveal";
import { ProjectCard } from "@/components/project-card";
import { Panel, SectionHeading } from "@/components/section-heading";
import { projects } from "@/content/site";
import { getLikes, type LikeState } from "@/lib/likes";
import { readVisitorId } from "@/lib/visitor";

function Grid({ likes }: { likes?: Record<string, LikeState> }) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {projects.map((project, i) => {
        const featured = i === 0 && projects.length % 2 === 1;
        return (
          <Reveal key={project.slug} delay={(i % 2) * 0.1} className={featured ? "md:col-span-2" : ""}>
            <ProjectCard
              project={project}
              featured={featured}
              likes={likes ? (likes[project.slug] ?? { count: 0, liked: false }) : undefined}
            />
          </Reveal>
        );
      })}
    </div>
  );
}

/** Per-request part: reads the visitor cookie and live like counts. */
async function GridWithLikes() {
  return <Grid likes={await getLikes(await readVisitorId())} />;
}

export function Projects() {
  return (
    <Panel id="work" labelledBy="work-title">
      <SectionHeading
        id="work-title"
        title="Work"
        aside={<span className="font-mono text-xs text-muted-foreground">({String(projects.length).padStart(2, "0")}) projects</span>}
      />
      <Suspense fallback={<Grid />}>
        <GridWithLikes />
      </Suspense>
    </Panel>
  );
}
