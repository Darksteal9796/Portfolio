import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { BentoTile } from "@/components/ui/BentoTile";

describe("BentoTile", () => {
  it("defaults to sm size (md:col-span-3) when no size prop is passed", () => {
    render(<BentoTile data-testid="tile">content</BentoTile>);
    expect(screen.getByTestId("tile")).toHaveClass("md:col-span-3");
  });

  it("applies md:col-span-6 for size='md'", () => {
    render(
      <BentoTile data-testid="tile" size="md">
        content
      </BentoTile>,
    );
    expect(screen.getByTestId("tile")).toHaveClass("md:col-span-6");
  });

  it("applies lg:col-span-8 on desktop for size='lg' and clamps to md:col-span-6 on tablet", () => {
    render(
      <BentoTile data-testid="tile" size="lg">
        content
      </BentoTile>,
    );
    const tile = screen.getByTestId("tile");
    expect(tile).toHaveClass("md:col-span-6");
    expect(tile).toHaveClass("lg:col-span-8");
  });

  it("applies lg:col-span-12 on desktop for size='xl'", () => {
    render(
      <BentoTile data-testid="tile" size="xl">
        content
      </BentoTile>,
    );
    const tile = screen.getByTestId("tile");
    expect(tile).toHaveClass("md:col-span-6");
    expect(tile).toHaveClass("lg:col-span-12");
  });

  it("merges a custom className without dropping base styles", () => {
    render(
      <BentoTile data-testid="tile" className="custom-thing">
        content
      </BentoTile>,
    );
    const tile = screen.getByTestId("tile");
    expect(tile).toHaveClass("custom-thing");
    expect(tile).toHaveClass("rounded-2xl");
    expect(tile).toHaveClass("bg-card");
  });

  it("renders its children", () => {
    render(
      <BentoTile>
        <span>child-node</span>
      </BentoTile>,
    );
    expect(screen.getByText("child-node")).toBeInTheDocument();
  });
});
