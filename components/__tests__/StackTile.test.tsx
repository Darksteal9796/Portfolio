import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { StackTile } from "@/components/tiles/StackTile";
import { TooltipProvider } from "@/components/ui/tooltip";

function renderStackTile() {
  return render(
    <TooltipProvider>
      <StackTile />
    </TooltipProvider>,
  );
}

describe("StackTile", () => {
  it("renders eight stack icon buttons with aria-labels", () => {
    renderStackTile();
    const expected = [
      "Python",
      "React",
      "AWS",
      "LangChain",
      "Postgres",
      "Twilio",
      "n8n",
      "GSAP",
    ];
    for (const name of expected) {
      expect(screen.getByLabelText(name)).toBeInTheDocument();
    }
  });

  it("renders the 'Stack' heading", () => {
    renderStackTile();
    expect(
      screen.getByRole("heading", { level: 2, name: /stack/i }),
    ).toBeInTheDocument();
  });
});
