import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

import type { CaseStudyFrontmatter } from "@/lib/case-studies";

export function ProjectCard({ frontmatter }: { frontmatter: CaseStudyFrontmatter }) {
  const titleName = `case-study-title-${frontmatter.slug}`;
  const frameName = `case-study-frame-${frontmatter.slug}`;

  return (
    <Link
      href={`/work/${frontmatter.slug}`}
      className="group relative flex h-full flex-col justify-between gap-6 focus-visible:outline-none"
      style={{ viewTransitionName: frameName }}
    >
      <div>
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
          {frontmatter.role} · {frontmatter.period}
        </p>
        <h3
          className="mt-3 text-2xl font-semibold leading-tight tracking-tight transition group-hover:text-primary"
          style={{ viewTransitionName: titleName }}
        >
          {frontmatter.title}
        </h3>
        <p className="mt-3 text-sm text-muted-foreground">
          {frontmatter.summary}
        </p>
      </div>

      <div className="flex items-end justify-between gap-4">
        <ul className="flex flex-wrap gap-1.5">
          {frontmatter.stack.slice(0, 5).map((tag) => (
            <li
              key={tag}
              className="rounded-full border border-border/60 bg-background/40 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground"
            >
              {tag}
            </li>
          ))}
        </ul>
        <span
          aria-hidden
          className="inline-flex size-10 shrink-0 items-center justify-center rounded-full border border-border/60 transition group-hover:border-primary group-hover:text-primary"
        >
          <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </span>
      </div>

      <span className="sr-only">Read the {frontmatter.title} case study</span>
    </Link>
  );
}
