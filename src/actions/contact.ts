"use server";

import { render } from "@react-email/components";
import nodemailer from "nodemailer";
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

  // Free SMTP (e.g. Gmail with an app password). Defaults target Gmail; override host/port for other providers.
  const { SMTP_USER, SMTP_PASS, CONTACT_TO_EMAIL, SMTP_HOST = "smtp.gmail.com", SMTP_PORT = "465" } = process.env;
  if (!SMTP_USER || !SMTP_PASS || !CONTACT_TO_EMAIL) {
    console.error("Contact form: SMTP_USER, SMTP_PASS or CONTACT_TO_EMAIL missing");
    return { status: "error", message: "Email is not configured yet. Please use the copy-email button.", values };
  }

  const { name, email, message } = parsed.data;
  const port = Number(SMTP_PORT);
  try {
    await nodemailer
      .createTransport({ host: SMTP_HOST, port, secure: port === 465, auth: { user: SMTP_USER, pass: SMTP_PASS } })
      .sendMail({
        // Gmail rejects or rewrites other senders, so send as yourself and reply to the visitor.
        from: `"Portfolio" <${SMTP_USER}>`,
        to: CONTACT_TO_EMAIL,
        replyTo: `"${name.replace(/"/g, "")}" <${email}>`,
        subject: `New portfolio message from ${name}`,
        html: await render(ContactEmail({ name, email, message })),
        text: `${name} <${email}>\n\n${message}`,
      });
  } catch (err) {
    console.error("SMTP error", err);
    return { status: "error", message: "Message could not be sent. Please try again.", values };
  }
  return { status: "success", message: "Thanks! I'll get back to you soon." };
}
