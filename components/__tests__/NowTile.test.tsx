import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { NowTile } from "@/components/tiles/NowTile";

describe("NowTile", () => {
  it("renders the 'Now' heading", () => {
    render(<NowTile />);
    expect(
      screen.getByRole("heading", { level: 2, name: /now/i }),
    ).toBeInTheDocument();
  });

  it("renders the content from content/now.md", () => {
    render(<NowTile />);
    // "Currently:" is the first bold lead in content/now.md.
    expect(screen.getByText("Currently:")).toBeInTheDocument();
    // A stable snippet from the body.
    expect(screen.getByText(/Turing/)).toBeInTheDocument();
  });
});
