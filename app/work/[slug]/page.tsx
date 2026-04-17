import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";
import { notFound } from "next/navigation";

import {
  getAllCaseStudies,
  getCaseStudyBySlug,
  getCaseStudySlugs,
} from "@/lib/case-studies";

type Params = { slug: string };

export async function generateStaticParams(): Promise<Params[]> {
  const slugs = await getCaseStudySlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const study = await getCaseStudyBySlug(slug);
  if (!study) return {};
  return {
    title: `${study.frontmatter.title} — Gautam Joshi`,
    description: study.frontmatter.summary,
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const study = await getCaseStudyBySlug(slug);
  if (!study) notFound();

  const all = await getAllCaseStudies();
  const index = all.findIndex((s) => s.frontmatter.slug === slug);
  const prev = index > 0 ? all[index - 1] : null;
  const next = index < all.length - 1 ? all[index + 1] : null;

  const titleName = `case-study-title-${slug}`;
  const frameName = `case-study-frame-${slug}`;

  return (
    <main className="min-h-screen px-6 py-8 lg:px-8 lg:py-12">
      <article className="mx-auto max-w-3xl">
        <Link
          href="/#projects"
          className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground transition hover:text-foreground"
        >
          <ArrowLeft className="size-3.5" />
          Back
        </Link>

        <header
          className="mt-8 border-b border-border pb-8"
          style={{ viewTransitionName: frameName }}
        >
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
            {study.frontmatter.role} · {study.frontmatter.period}
          </p>
          <h1
            className="mt-4 text-4xl font-semibold leading-tight tracking-tight sm:text-5xl"
            style={{ viewTransitionName: titleName }}
          >
            {study.frontmatter.title}
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            {study.frontmatter.summary}
          </p>

          {study.frontmatter.metrics && study.frontmatter.metrics.length > 0 && (
            <dl className="mt-8 grid grid-cols-3 gap-6 border-t border-border pt-6">
              {study.frontmatter.metrics.map((metric) => (
                <div key={metric.label}>
                  <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                    {metric.label}
                  </dt>
                  <dd className="mt-1 text-base font-medium">{metric.value}</dd>
                </div>
              ))}
            </dl>
          )}

          <ul className="mt-6 flex flex-wrap gap-1.5">
            {study.frontmatter.stack.map((tag) => (
              <li
                key={tag}
                className="rounded-full border border-border/60 bg-background/40 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-muted-foreground"
              >
                {tag}
              </li>
            ))}
          </ul>
        </header>

        <div className="prose-custom mt-10 space-y-5 text-base leading-relaxed [&_h2]:mt-10 [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:tracking-tight [&_h3]:mt-8 [&_h3]:text-lg [&_h3]:font-semibold [&_li]:my-1 [&_strong]:text-foreground [&_ul]:my-4 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1">
          <MDXRemote source={study.body} />
        </div>

        <nav className="mt-16 flex items-center justify-between gap-4 border-t border-border pt-6">
          {prev ? (
            <Link
              href={`/work/${prev.frontmatter.slug}`}
              className="group flex flex-col text-left"
            >
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                ← Prev
              </span>
              <span className="mt-1 text-sm font-medium transition group-hover:text-primary">
                {prev.frontmatter.title}
              </span>
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link
              href={`/work/${next.frontmatter.slug}`}
              className="group flex flex-col text-right"
            >
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                Next →
              </span>
              <span className="mt-1 text-sm font-medium transition group-hover:text-primary">
                {next.frontmatter.title}
              </span>
            </Link>
          ) : (
            <span />
          )}
        </nav>
      </article>
    </main>
  );
}
