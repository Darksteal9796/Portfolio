import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@/lib/track", () => ({ track: vi.fn() }));

import { track } from "@/lib/track";
import { ContactTile } from "@/components/tiles/ContactTile";

describe("ContactTile", () => {
  beforeEach(() => {
    globalThis.fetch = vi.fn();
  });
  afterEach(() => {
    vi.mocked(track).mockClear();
    vi.restoreAllMocks();
  });

  it("renders all three fields and a submit button", () => {
    render(<ContactTile />);
    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Email")).toBeInTheDocument();
    expect(screen.getByText("What's up?")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /send/i })).toBeInTheDocument();
  });

  it("shows inline validation errors on empty submit", async () => {
    const user = userEvent.setup();
    render(<ContactTile />);
    await user.click(screen.getByRole("button", { name: /send/i }));
    expect(await screen.findByText(/Name is too short/i)).toBeInTheDocument();
    expect(
      screen.getByText(/That doesn't look like an email/i),
    ).toBeInTheDocument();
  });

  it("posts to /api/contact, fires analytics, and shows the success state", async () => {
    vi.mocked(globalThis.fetch).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ ok: true }),
    } as Response);

    const user = userEvent.setup();
    render(<ContactTile />);

    await user.type(screen.getByText("Name").parentElement!.querySelector("input")!, "Gautam");
    await user.type(screen.getByText("Email").parentElement!.querySelector("input")!, "g@example.com");
    await user.type(
      screen.getByText("What's up?").parentElement!.querySelector("textarea")!,
      "Hello there, this is a long enough test message.",
    );
    await user.click(screen.getByRole("button", { name: /send/i }));

    await waitFor(() =>
      expect(screen.getByText(/Thanks — I'll reply within 24h/i)).toBeInTheDocument(),
    );
    expect(globalThis.fetch).toHaveBeenCalledWith(
      "/api/contact",
      expect.objectContaining({ method: "POST" }),
    );
    expect(track).toHaveBeenCalledWith("contact_submit");
  });

  it("shows the error state when the API returns !ok", async () => {
    vi.mocked(globalThis.fetch).mockResolvedValueOnce({
      ok: false,
      json: async () => ({ ok: false, error: "Rate limited." }),
    } as Response);

    const user = userEvent.setup();
    render(<ContactTile />);

    await user.type(screen.getByText("Name").parentElement!.querySelector("input")!, "Gautam");
    await user.type(screen.getByText("Email").parentElement!.querySelector("input")!, "g@example.com");
    await user.type(
      screen.getByText("What's up?").parentElement!.querySelector("textarea")!,
      "Hello there, this is a long enough test message.",
    );
    await user.click(screen.getByRole("button", { name: /send/i }));

    expect(await screen.findByRole("alert")).toHaveTextContent(/Rate limited/i);
    expect(track).not.toHaveBeenCalled();
  });
});
