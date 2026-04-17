import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { ThemeProvider } from "@/components/ThemeProvider";
import { ThemeToggle } from "@/components/ThemeToggle";

function renderToggle() {
  return render(
    <ThemeProvider>
      <ThemeToggle />
    </ThemeProvider>,
  );
}

describe("ThemeToggle", () => {
  it("labels the action 'Switch to light mode' when theme is dark", () => {
    document.documentElement.classList.add("dark");
    renderToggle();
    expect(
      screen.getByRole("button", { name: "Switch to light mode" }),
    ).toBeInTheDocument();
  });

  it("labels the action 'Switch to dark mode' when theme is light", () => {
    renderToggle();
    expect(
      screen.getByRole("button", { name: "Switch to dark mode" }),
    ).toBeInTheDocument();
  });

  it("click flips the theme and updates the label", async () => {
    const user = userEvent.setup();
    renderToggle();

    await user.click(
      screen.getByRole("button", { name: "Switch to dark mode" }),
    );

    expect(document.documentElement.classList.contains("dark")).toBe(true);
    expect(
      screen.getByRole("button", { name: "Switch to light mode" }),
    ).toBeInTheDocument();
  });
});
