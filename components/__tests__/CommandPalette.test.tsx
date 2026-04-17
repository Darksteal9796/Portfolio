import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn() }),
}));

vi.mock("@/lib/track", () => ({ track: vi.fn() }));

import { CommandPalette } from "@/components/CommandPalette";
import { ThemeProvider } from "@/components/ThemeProvider";

const CASE_STUDIES = [
  { slug: "autonomous-revenue-engine", title: "Autonomous Revenue Engine" },
  { slug: "ai-best-buddy", title: "AI Best Buddy" },
];

function renderPalette() {
  return render(
    <ThemeProvider>
      <CommandPalette caseStudies={CASE_STUDIES} />
    </ThemeProvider>,
  );
}

describe("CommandPalette", () => {
  it("renders nothing visible while closed", () => {
    renderPalette();
    expect(screen.queryByPlaceholderText(/Jump to a section/i)).toBeNull();
  });

  it("opens on Ctrl+K and lists sections, case studies, and actions", async () => {
    const user = userEvent.setup();
    renderPalette();

    await user.keyboard("{Control>}k{/Control}");

    expect(
      await screen.findByPlaceholderText(/Jump to a section/i),
    ).toBeInTheDocument();

    for (const label of [
      "Hero",
      "Projects",
      "Stack",
      "Contact",
      "Autonomous Revenue Engine",
      "AI Best Buddy",
    ]) {
      expect(screen.getByText(label)).toBeInTheDocument();
    }

    expect(screen.getByText(/Download resume/i)).toBeInTheDocument();
  });
});
