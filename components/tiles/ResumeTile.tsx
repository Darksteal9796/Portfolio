"use client";

import { ArrowDownToLine } from "lucide-react";

import { track } from "@/lib/track";

export function ResumeTile() {
  return (
    <div className="flex h-full flex-col justify-between gap-6">
      <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
        Resume
      </h2>
      <a
        href="/resume.pdf"
        download
        onClick={() => track("resume_download")}
        className="group inline-flex items-center justify-between gap-4 rounded-xl border bg-muted/30 px-5 py-4 text-sm font-medium transition hover:border-primary hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <span>Download resume</span>
        <ArrowDownToLine className="size-4 transition-transform group-hover:translate-y-0.5" />
      </a>
    </div>
  );
}
