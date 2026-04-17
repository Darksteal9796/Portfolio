import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";

vi.mock("@/lib/track", () => ({ track: vi.fn() }));

import { track } from "@/lib/track";
import { ResumeTile } from "@/components/tiles/ResumeTile";

describe("ResumeTile", () => {
  afterEach(() => {
    vi.mocked(track).mockClear();
  });

  it("renders a download link to /resume.pdf", () => {
    render(<ResumeTile />);
    const link = screen.getByRole("link", { name: /download resume/i });
    expect(link).toHaveAttribute("href", "/resume.pdf");
    expect(link).toHaveAttribute("download");
  });

  it("fires a 'resume_download' analytics event on click", async () => {
    const user = userEvent.setup();
    render(<ResumeTile />);
    await user.click(screen.getByRole("link", { name: /download resume/i }));
    expect(track).toHaveBeenCalledWith("resume_download");
  });
});
