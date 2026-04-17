import { describe, expect, it } from "vitest";

import {
  getAllCaseStudies,
  getCaseStudyBySlug,
  getCaseStudySlugs,
} from "@/lib/case-studies";

describe("case-studies loader", () => {
  it("reads all four seeded case study files", async () => {
    const studies = await getAllCaseStudies();
    expect(studies.length).toBe(4);
    const slugs = studies.map((s) => s.frontmatter.slug).sort();
    expect(slugs).toEqual([
      "ai-best-buddy",
      "autonomous-revenue-engine",
      "avyann",
      "turing-llm-platform",
    ]);
  });

  it("parses frontmatter into typed fields", async () => {
    const study = await getCaseStudyBySlug("autonomous-revenue-engine");
    expect(study).not.toBeNull();
    if (!study) return;
    expect(study.frontmatter.title).toBe("Autonomous Revenue Engine");
    expect(study.frontmatter.role).toBe("Lead Engineer");
    expect(Array.isArray(study.frontmatter.stack)).toBe(true);
    expect(study.frontmatter.stack).toContain("Python");
    expect(study.frontmatter.metrics).toBeDefined();
    expect(study.frontmatter.metrics?.[0].label).toBe("Calls / day");
  });

  it("returns null for an unknown slug", async () => {
    const study = await getCaseStudyBySlug("does-not-exist");
    expect(study).toBeNull();
  });

  it("lists slugs matching the mdx filenames", async () => {
    const slugs = await getCaseStudySlugs();
    expect(slugs.sort()).toEqual([
      "ai-best-buddy",
      "autonomous-revenue-engine",
      "avyann",
      "turing-llm-platform",
    ]);
  });
});
