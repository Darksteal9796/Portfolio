import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

// jsdom matchMedia returns false, so useMediaQuery("(min-width: 768px)") = false
// → ExperienceTile renders the mobile vertical-stack fallback in tests, which
// is what we want (no GSAP, no ScrollTrigger, predictable output).

vi.mock("gsap/ScrollTrigger", () => ({ ScrollTrigger: {} }));
vi.mock("gsap", () => ({
  gsap: {
    registerPlugin: vi.fn(),
    context: vi.fn((fn: () => void) => {
      fn();
      return { revert: vi.fn() };
    }),
    to: vi.fn(),
  },
}));

import { ExperienceTile } from "@/components/tiles/ExperienceTile";

describe("ExperienceTile", () => {
  it("renders the 'Experience' heading", () => {
    render(<ExperienceTile />);
    expect(
      screen.getByRole("heading", { level: 2, name: /experience/i }),
    ).toBeInTheDocument();
  });

  it("lists three experience entries with role + company", () => {
    render(<ExperienceTile />);
    expect(screen.getByText("Senior Software Engineer")).toBeInTheDocument();
    expect(screen.getByText("Turing")).toBeInTheDocument();
    expect(screen.getByText("Backend Developer")).toBeInTheDocument();
    expect(
      screen.getByText("Newspace Research and Technologies"),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/SME \/ Full-Stack — Finance & Investment/),
    ).toBeInTheDocument();
  });

  it("renders periods in MM/YYYY format", () => {
    render(<ExperienceTile />);
    expect(screen.getByText(/11\/2024 — Present/)).toBeInTheDocument();
    expect(screen.getByText(/01\/2024 — 11\/2024/)).toBeInTheDocument();
    expect(screen.getByText(/09\/2021 — 01\/2024/)).toBeInTheDocument();
  });
});
