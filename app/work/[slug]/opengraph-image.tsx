import { ImageResponse } from "next/og";

import { getCaseStudyBySlug } from "@/lib/case-studies";

export const alt = "Case study — Gautam Joshi";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const study = await getCaseStudyBySlug(slug);

  const title = study?.frontmatter.title ?? "Case study";
  const summary = study?.frontmatter.summary ?? "";
  const meta = study
    ? `${study.frontmatter.role} · ${study.frontmatter.period}`
    : "gautamjoshi.dev";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background:
            "radial-gradient(circle at 80% 20%, rgba(124, 58, 237, 0.3), transparent 55%), #0A0A0A",
          color: "#F5F5F5",
          fontFamily:
            "ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 18,
            fontFamily: "ui-monospace, SFMono-Regular, monospace",
            color: "#9A9A9A",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
          }}
        >
          {meta}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              fontSize: 80,
              fontWeight: 600,
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
            }}
          >
            {title}
          </div>
          {summary && (
            <div
              style={{
                fontSize: 32,
                lineHeight: 1.3,
                color: "#F5F5F5",
                opacity: 0.7,
                maxWidth: 960,
              }}
            >
              {summary}
            </div>
          )}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 20,
            fontFamily: "ui-monospace, SFMono-Regular, monospace",
            color: "#9A9A9A",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
          }}
        >
          <span style={{ color: "#7C3AED" }}>gautamjoshi.dev</span>
          <span>Case study</span>
        </div>
      </div>
    ),
    size,
  );
}
