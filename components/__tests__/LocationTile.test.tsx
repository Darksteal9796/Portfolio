import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { LocationTile } from "@/components/tiles/LocationTile";

describe("LocationTile", () => {
  it("renders the location label", () => {
    render(<LocationTile />);
    expect(screen.getByText(/Pune, India · IST/)).toBeInTheDocument();
  });

  it("renders a time in HH:mm format", () => {
    render(<LocationTile />);
    // useSyncExternalStore runs getSnapshot on client mount — in jsdom,
    // window is defined so we get a real time string, not the --:-- SSR stub.
    const timeNode = screen.getByText(/^\d{2}:\d{2}$/);
    expect(timeNode).toBeInTheDocument();
  });
});
