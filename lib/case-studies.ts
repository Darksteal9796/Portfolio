import { readdir, readFile } from "node:fs/promises";
import { join } from "node:path";

import matter from "gray-matter";

export type CaseStudyFrontmatter = {
  title: string;
  slug: string;
  role: string;
  period: string;
  stack: string[];
  summary: string;
  cover?: string;
  metrics?: Array<{ label: string; value: string }>;
};

export type CaseStudy = {
  frontmatter: CaseStudyFrontmatter;
  body: string;
};

const CONTENT_DIR = join(process.cwd(), "content/case-studies");

function toFrontmatter(data: Record<string, unknown>): CaseStudyFrontmatter {
  return {
    title: String(data.title ?? ""),
    slug: String(data.slug ?? ""),
    role: String(data.role ?? ""),
    period: String(data.period ?? ""),
    stack: Array.isArray(data.stack) ? data.stack.map(String) : [],
    summary: String(data.summary ?? ""),
    cover: typeof data.cover === "string" ? data.cover : undefined,
    metrics: Array.isArray(data.metrics)
      ? (data.metrics as Array<{ label: string; value: string }>)
      : undefined,
  };
}

export async function getAllCaseStudies(): Promise<CaseStudy[]> {
  const files = await readdir(CONTENT_DIR);
  const mdxFiles = files.filter((f) => f.endsWith(".mdx"));
  const studies = await Promise.all(
    mdxFiles.map(async (file) => {
      const raw = await readFile(join(CONTENT_DIR, file), "utf-8");
      const { data, content } = matter(raw);
      return {
        frontmatter: toFrontmatter(data),
        body: content,
      };
    }),
  );
  // Stable ordering by slug so the home page doesn't reshuffle between builds.
  return studies.sort((a, b) =>
    a.frontmatter.slug.localeCompare(b.frontmatter.slug),
  );
}

export async function getCaseStudyBySlug(
  slug: string,
): Promise<CaseStudy | null> {
  try {
    const raw = await readFile(join(CONTENT_DIR, `${slug}.mdx`), "utf-8");
    const { data, content } = matter(raw);
    return { frontmatter: toFrontmatter(data), body: content };
  } catch {
    return null;
  }
}

export async function getCaseStudySlugs(): Promise<string[]> {
  const files = await readdir(CONTENT_DIR);
  return files
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}
