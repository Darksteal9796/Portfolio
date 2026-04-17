"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Check } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { contactSchema, type ContactPayload } from "@/lib/contact-schema";
import { track } from "@/lib/track";

type Status =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "success" }
  | { kind: "error"; message: string };

export function ContactTile() {
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContactPayload>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", message: "", website: "" },
  });

  async function onSubmit(data: ContactPayload) {
    setStatus({ kind: "submitting" });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || !json.ok) {
        const message =
          typeof json.error === "string"
            ? json.error
            : "Couldn't send. Try again or email me directly.";
        setStatus({ kind: "error", message });
        return;
      }
      track("contact_submit");
      setStatus({ kind: "success" });
    } catch {
      setStatus({
        kind: "error",
        message: "Network error. Try again in a moment.",
      });
    }
  }

  if (status.kind === "success") {
    return (
      <div className="flex h-full flex-col justify-between gap-4">
        <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
          Contact
        </h2>
        <div className="flex flex-1 flex-col items-start justify-center gap-3 text-sm">
          <span className="inline-flex size-8 items-center justify-center rounded-full bg-[var(--success)]/15 text-[var(--success)]">
            <Check className="size-4" />
          </span>
          <p className="text-base font-medium text-foreground">
            Thanks — I&apos;ll reply within 24h.
          </p>
          <p className="text-xs text-muted-foreground">
            Or ping{" "}
            <a
              className="underline underline-offset-2 hover:text-foreground"
              href="mailto:gautamjoshi.dev@gmail.com"
            >
              gautamjoshi.dev@gmail.com
            </a>{" "}
            directly.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col">
      <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
        Contact
      </h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="mt-4 flex flex-1 flex-col gap-3"
      >
        <Field label="Name" error={errors.name?.message}>
          <input
            type="text"
            autoComplete="name"
            {...register("name")}
            className={inputClasses}
          />
        </Field>

        <Field label="Email" error={errors.email?.message}>
          <input
            type="email"
            autoComplete="email"
            {...register("email")}
            className={inputClasses}
          />
        </Field>

        <Field label="What's up?" error={errors.message?.message}>
          <textarea
            rows={4}
            {...register("message")}
            className={`${inputClasses} min-h-[96px] resize-y`}
          />
        </Field>

        {/* Honeypot — hidden from humans, tempting for bots. */}
        <div aria-hidden className="hidden">
          <label>
            Website (leave this empty)
            <input
              type="text"
              tabIndex={-1}
              autoComplete="off"
              {...register("website")}
            />
          </label>
        </div>

        {status.kind === "error" && (
          <p
            role="alert"
            className="text-xs text-[var(--destructive)]"
          >
            {status.message}
          </p>
        )}

        <button
          type="submit"
          disabled={isSubmitting || status.kind === "submitting"}
          className="mt-auto inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition hover:bg-primary/90 disabled:opacity-60 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          {status.kind === "submitting" ? "Sending…" : "Send"}
          <ArrowRight className="size-4" />
        </button>
      </form>
    </div>
  );
}

const inputClasses =
  "w-full rounded-md border border-border bg-background/40 px-3 py-2 text-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
        {label}
      </span>
      {children}
      {error && (
        <span className="text-[11px] text-[var(--destructive)]">{error}</span>
      )}
    </label>
  );
}
