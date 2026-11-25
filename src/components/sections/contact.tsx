import { AvailabilityPill } from "@/components/availability-pill";
import { ContactForm } from "@/components/contact-form";
import { CopyEmail } from "@/components/copy-email";
import { Reveal, RiseSection } from "@/components/motion/reveal";
import { profile } from "@/content/site";

export function Contact() {
  return (
    <RiseSection
      id="contact"
      aria-labelledby="contact-title"
      className="mx-2 mt-2 overflow-hidden rounded-[1.75rem] bg-card px-5 py-20 md:mx-4 md:rounded-[2.5rem] md:px-12 md:py-28"
    >
      <div className="mx-auto max-w-3xl text-center">
        <Reveal>
          <AvailabilityPill />
          <h2 id="contact-title" className="mt-6 text-4xl font-semibold tracking-tight uppercase md:text-6xl">
            Have a project in mind?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Shopify store, Webflow site or a full stack app — tell me what you&apos;re building and let&apos;s make it
            fast, clean and easy to grow.
          </p>
          <div className="mt-8">
            <CopyEmail email={profile.email} />
          </div>
        </Reveal>
        <Reveal delay={0.1} className="mt-14 rounded-3xl border bg-background/60 p-5 md:p-8">
          <ContactForm />
        </Reveal>
      </div>
    </RiseSection>
  );
}
