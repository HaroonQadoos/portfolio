import { cookies } from "next/headers";

const COOKIE = "vid";
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

/** Read-only: safe during Server Component render. */
export async function readVisitorId() {
  const id = (await cookies()).get(COOKIE)?.value;
  return id && UUID.test(id) ? id : null;
}

/** Creates the cookie when missing. Server Actions only (cookies can't be set during render). */
export async function ensureVisitorId() {
  const existing = await readVisitorId();
  if (existing) return existing;
  const id = crypto.randomUUID();
  (await cookies()).set(COOKIE, id, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 365,
    path: "/",
  });
  return id;
}
