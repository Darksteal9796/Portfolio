import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

// Stub HeroBackground so tests don't pull three.js / R3F into jsdom.
vi.mock("@/components/tiles/HeroBackground", () => ({
  HeroBackground: () => <div data-testid="hero-bg" />,
}));

import { HeroTile } from "@/components/tiles/HeroTile";

describe("HeroTile", () => {
  it("renders the spec headline and sub copy", () => {
    render(<HeroTile />);
    expect(
      screen.getByRole("heading", { level: 1 }).textContent,
    ).toMatch(/Senior AI Full-Stack Engineer\./);
    expect(
      screen.getByText(/RAG pipelines, fine-tuned models, voice agents/),
    ).toBeInTheDocument();
  });

  it("primary CTA links to the projects anchor", () => {
    render(<HeroTile />);
    const cta = screen.getByRole("link", { name: /Read the case studies/i });
    expect(cta).toHaveAttribute("href", "#projects");
  });

  it("secondary CTA downloads /resume.pdf", () => {
    render(<HeroTile />);
    const cta = screen.getByRole("link", { name: /Download resume/i });
    expect(cta).toHaveAttribute("href", "/resume.pdf");
    expect(cta).toHaveAttribute("download");
  });

  it("mounts the (mocked) HeroBackground layer", () => {
    render(<HeroTile />);
    expect(screen.getByTestId("hero-bg")).toBeInTheDocument();
  });
});
