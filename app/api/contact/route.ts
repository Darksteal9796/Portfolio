import { NextResponse, type NextRequest } from "next/server";
import { Resend } from "resend";

import { contactSchema } from "@/lib/contact-schema";
import { consume } from "@/lib/rate-limit";

const RATE_LIMIT = 5;
const WINDOW_MS = 60 * 60 * 1000; // 1 hour
const TO_EMAIL = "gautamjoshi.dev@gmail.com";
const FROM_EMAIL = "onboarding@resend.dev"; // replace with a verified domain sender in prod

function getClientIp(req: NextRequest): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  const real = req.headers.get("x-real-ip");
  if (real) return real;
  return "anonymous";
}

export async function POST(req: NextRequest) {
  const ip = getClientIp(req);
  const limit = consume(`contact:${ip}`, RATE_LIMIT, WINDOW_MS);
  if (!limit.ok) {
    return NextResponse.json(
      {
        ok: false,
        error: "Too many requests. Try again in a bit.",
        resetMs: limit.resetMs,
      },
      { status: 429 },
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid JSON." },
      { status: 400 },
    );
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    // The honeypot rule (website.max(0)) fails here too — bots get a generic
    // 422 like any other validation error; they can't distinguish the cause.
    return NextResponse.json(
      {
        ok: false,
        error: "Validation failed.",
        issues: parsed.error.issues,
      },
      { status: 422 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    // No provider configured — don't 500 in dev. Log and acknowledge.
    console.warn(
      "[contact] RESEND_API_KEY not set — dropping message from",
      parsed.data.email,
    );
    return NextResponse.json({ ok: true, delivered: false });
  }

  const resend = new Resend(apiKey);
  const { name, email, message } = parsed.data;

  const result = await resend.emails.send({
    from: `Portfolio <${FROM_EMAIL}>`,
    to: TO_EMAIL,
    replyTo: email,
    subject: `New contact from ${name}`,
    text: `From: ${name} <${email}>\n\n${message}`,
  });

  if (result.error) {
    console.error("[contact] Resend error:", result.error);
    return NextResponse.json(
      { ok: false, error: "Couldn't send right now. Email me directly." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true, delivered: true });
}
