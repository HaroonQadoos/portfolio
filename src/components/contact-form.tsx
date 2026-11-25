"use client";

import { ArrowUpRight, Loader2 } from "lucide-react";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import { sendContact, type ContactState } from "@/actions/contact";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const initial: ContactState = { status: "idle" };

function FieldError({ id, errors }: { id: string; errors?: string[] }) {
  if (!errors?.length) return null;
  return (
    <p id={id} className="text-xs text-destructive">
      {errors[0]}
    </p>
  );
}

export function ContactForm() {
  const [state, action, pending] = useActionState(sendContact, initial);
  const errors = state.fieldErrors ?? {};

  useEffect(() => {
    if (state.status === "success") toast.success(state.message);
    else if (state.status === "error" && state.message) toast.error(state.message);
  }, [state]);

  const field = "h-12 rounded-xl bg-card px-4 text-base md:text-sm";

  return (
    <form action={action} noValidate className="grid gap-5 text-left" aria-describedby="form-status">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="grid gap-2">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            name="name"
            autoComplete="name"
            required
            defaultValue={state.values?.name}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "name-error" : undefined}
            className={field}
          />
          <FieldError id="name-error" errors={errors.name} />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            defaultValue={state.values?.email}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
            className={field}
          />
          <FieldError id="email-error" errors={errors.email} />
        </div>
      </div>

      <div className="grid gap-2">
        <Label htmlFor="message">Project details</Label>
        <Textarea
          id="message"
          name="message"
          required
          rows={5}
          defaultValue={state.values?.message}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "message-error" : undefined}
          className="min-h-36 rounded-xl bg-card px-4 py-3 text-base md:text-sm"
        />
        <FieldError id="message-error" errors={errors.message} />
      </div>

      {/* Honeypot: hidden from people and assistive tech, bots fill it. */}
      <div aria-hidden className="absolute -left-[9999px]">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4">
        <p id="form-status" role="status" className="text-sm text-muted-foreground">
          {state.status === "success" ? state.message : "I usually reply within 24 hours."}
        </p>
        <button
          type="submit"
          disabled={pending}
          className="inline-flex h-12 items-center gap-2 rounded-full bg-foreground px-6 text-sm font-medium text-background border border-foreground transition-colors duration-300 hover:bg-transparent hover:text-foreground [&_svg]:transition-transform [&_svg]:duration-300 hover:[&_svg]:rotate-45 focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none disabled:opacity-60"
        >
          {pending ? <Loader2 className="size-4 animate-spin" aria-hidden /> : null}
          {pending ? "Sending…" : "Send message"}
          {!pending ? <ArrowUpRight className="size-4" aria-hidden /> : null}
        </button>
      </div>
    </form>
  );
}
