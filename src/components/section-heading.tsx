import { Reveal, RiseSection, SlideIn } from "@/components/motion/reveal";

/** "/TITLE" heading with an oversized faded watermark behind it, as in the reference design. */
export function SectionHeading({
  id,
  title,
  aside,
  inverted = false,
}: {
  id: string;
  title: string;
  aside?: React.ReactNode;
  inverted?: boolean;
}) {
  return (
    <div className="relative mb-10 flex items-end justify-between gap-6 md:mb-14">
      <SlideIn
        className={`pointer-events-none absolute -top-6 left-0 select-none text-[clamp(3.5rem,12vw,9rem)] leading-none font-black tracking-tight uppercase md:-top-12 ${
          inverted ? "text-white/[0.05]" : "text-foreground/[0.04]"
        }`}
      >
        {title}
      </SlideIn>
      <Reveal>
        <h2 id={id} className="relative text-3xl font-semibold tracking-tight uppercase md:text-5xl">
          <span className={inverted ? "text-white/40" : "text-muted-foreground"}>/</span>
          {title}
        </h2>
      </Reveal>
      {aside ? <Reveal delay={0.1} className="relative">{aside}</Reveal> : null}
    </div>
  );
}

/** Rounded white panel every section sits on. */
export function Panel({
  id,
  labelledBy,
  className = "",
  children,
}: {
  id: string;
  labelledBy: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <RiseSection
      id={id}
      aria-labelledby={labelledBy}
      className={`mx-2 mt-2 overflow-hidden rounded-[1.75rem] bg-card px-5 py-16 md:mx-4 md:rounded-[2.5rem] md:px-12 md:py-24 ${className}`}
    >
      <div className="mx-auto max-w-6xl">{children}</div>
    </RiseSection>
  );
}
