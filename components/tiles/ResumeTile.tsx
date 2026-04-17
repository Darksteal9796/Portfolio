"use client";

import { ArrowDownToLine, FileText } from "lucide-react";

import { track } from "@/lib/track";

export function ResumeTile() {
  return (
    <div className="flex h-full flex-col">
      <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
        Resume
      </h2>
      <a
        href="/resume.pdf"
        download
        onClick={() => track("resume_download")}
        className="group mt-4 flex flex-1 flex-col justify-between gap-6 rounded-xl border border-border/60 bg-muted/30 p-5 transition hover:border-primary hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <div className="flex items-start justify-between gap-3">
          <span className="inline-flex size-10 items-center justify-center rounded-lg border border-border/60 bg-background/60 text-muted-foreground transition group-hover:border-primary group-hover:text-primary">
            <FileText className="size-5" />
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground/70">
            PDF · 1 page
          </span>
        </div>
        <div>
          <p className="text-base font-semibold leading-tight transition group-hover:text-primary">
            Download resume
          </p>
          <p className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
            One-click, latest version
            <ArrowDownToLine className="size-3 transition-transform group-hover:translate-y-0.5" />
          </p>
        </div>
      </a>
    </div>
  );
}
