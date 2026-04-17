import { render, screen } from "@testing-library/react";
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

// The palette renders its content inside a portal-backed dialog that is only
// mounted when open. Testing the cmdk tree behind the dialog is fiddly in
// jsdom (cmdk's internal store uses browser APIs that aren't polyfilled), so
// these tests verify the component mounts cleanly while closed — the richer
// keyboard + navigation flow is verified manually in the browser.

describe("CommandPalette", () => {
  it("mounts without throwing and renders nothing while closed", () => {
    render(
      <ThemeProvider>
        <CommandPalette caseStudies={CASE_STUDIES} />
      </ThemeProvider>,
    );
    expect(screen.queryByPlaceholderText(/Jump to a section/i)).toBeNull();
  });
});
