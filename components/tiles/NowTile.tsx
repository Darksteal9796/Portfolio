import { readFileSync } from "node:fs";
import { join } from "node:path";

import { marked } from "marked";

// Read + parse at build time. content/now.md is tiny and stable; no need for
// runtime fs access on the server per request.
const RAW = readFileSync(join(process.cwd(), "content/now.md"), "utf-8");
const BODY = RAW.replace(/^---[\s\S]*?---\n/, "");
const HTML = marked.parse(BODY, { async: false }) as string;

export function NowTile() {
  return (
    <div>
      <div className="flex items-center gap-2">
        <span
          aria-hidden
          className="relative inline-flex size-2 items-center justify-center"
        >
          <span className="absolute inline-flex size-full animate-ping rounded-full bg-[var(--success)] opacity-75" />
          <span className="relative inline-flex size-2 rounded-full bg-[var(--success)]" />
        </span>
        <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
          Now
        </h2>
      </div>
      <div
        className="mt-4 space-y-3 text-sm leading-relaxed text-muted-foreground [&_p]:whitespace-pre-line [&_strong]:font-semibold [&_strong]:text-foreground"
        dangerouslySetInnerHTML={{ __html: HTML }}
      />
    </div>
  );
}
