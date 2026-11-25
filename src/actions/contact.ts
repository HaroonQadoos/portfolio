"use server";

import { Resend } from "resend";
import { z } from "zod";
import ContactEmail from "@/emails/contact-email";

const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name.").max(80, "Name is too long."),
  email: z.email("Please enter a valid email.").max(200),
  message: z.string().trim().min(10, "Tell me a little more (10+ characters).").max(4000, "Message is too long."),
});

type Fields = z.infer<typeof contactSchema>;

export type ContactState = {
  status: "idle" | "success" | "error";
  message?: string;
  fieldErrors?: Partial<Record<keyof Fields, string[]>>;
  values?: Partial<Fields>;
};

export async function sendContact(_prev: ContactState, formData: FormData): Promise<ContactState> {
  // Honeypot: real users never see or fill this field.
  if (formData.get("company")) return { status: "success", message: "Thanks! I'll get back to you soon." };

  const values = {
    name: String(formData.get("name") ?? ""),
    email: String(formData.get("email") ?? ""),
    message: String(formData.get("message") ?? ""),
  };
  const parsed = contactSchema.safeParse(values);
  if (!parsed.success) {
    return {
      status: "error",
      message: "Please fix the highlighted fields.",
      fieldErrors: z.flattenError(parsed.error).fieldErrors,
      values,
    };
  }

  const { RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL } = process.env;
  if (!RESEND_API_KEY || !CONTACT_TO_EMAIL || !CONTACT_FROM_EMAIL) {
    console.error("Contact form: RESEND_API_KEY, CONTACT_TO_EMAIL or CONTACT_FROM_EMAIL missing");
    return { status: "error", message: "Email is not configured yet. Please use the copy-email button.", values };
  }

  const { name, email, message } = parsed.data;
  const { error } = await new Resend(RESEND_API_KEY).emails.send({
    from: CONTACT_FROM_EMAIL,
    to: CONTACT_TO_EMAIL,
    replyTo: email,
    subject: `New portfolio message from ${name}`,
    react: ContactEmail({ name, email, message }),
  });

  if (error) {
    console.error("Resend error", error);
    return { status: "error", message: "Message could not be sent. Please try again.", values };
  }
  return { status: "success", message: "Thanks! I'll get back to you soon." };
}
