import { ImageResponse } from "next/og";

export const alt = "Gautam Joshi — Senior AI Full-Stack Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
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
            "radial-gradient(circle at 20% 30%, rgba(124, 58, 237, 0.35), transparent 60%), #0A0A0A",
          color: "#F5F5F5",
          fontFamily:
            "ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 20,
            fontFamily: "ui-monospace, SFMono-Regular, monospace",
            color: "#9A9A9A",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
          }}
        >
          gautamjoshi.dev
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              fontSize: 84,
              fontWeight: 600,
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
            }}
          >
            Senior AI Full-Stack Engineer.
          </div>
          <div
            style={{
              fontSize: 44,
              fontWeight: 500,
              lineHeight: 1.15,
              color: "#F5F5F5",
              opacity: 0.75,
            }}
          >
            I ship LLM systems that run in production.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 20,
            fontFamily: "ui-monospace, SFMono-Regular, monospace",
            color: "#7C3AED",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
          }}
        >
          RAG · Fine-tuning · Voice agents
        </div>
      </div>
    ),
    size,
  );
}
