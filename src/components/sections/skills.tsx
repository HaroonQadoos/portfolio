import { Database, Monitor, Server } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { Panel, SectionHeading } from "@/components/section-heading";
import { Badge } from "@/components/ui/badge";
import { skillGroups } from "@/content/site";

const icons = [Monitor, Server, Database];

export function Skills() {
  return (
    <Panel id="skills" labelledBy="skills-title">
      <SectionHeading id="skills-title" title="Stack" />
      <div className="grid gap-4 md:grid-cols-3">
        {skillGroups.map((group, i) => {
          const Icon = icons[i % icons.length];
          return (
            <Reveal key={group.title} delay={i * 0.08}>
              <div className="h-full rounded-2xl border bg-background/60 p-6 transition-colors hover:border-foreground/20">
                <div className="flex items-center gap-3">
                  <span className="grid size-9 place-items-center rounded-full bg-foreground text-background">
                    <Icon className="size-4" aria-hidden />
                  </span>
                  <h3 className="font-mono text-sm tracking-widest uppercase">{group.title}</h3>
                </div>
                <ul className="mt-6 flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <li key={skill}>
                      <Badge variant="outline" className="h-7 rounded-full bg-card px-3 text-xs font-normal">
                        {skill}
                      </Badge>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          );
        })}
      </div>
    </Panel>
  );
}
