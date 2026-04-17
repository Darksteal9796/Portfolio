"use client";

import { Moon, Sun } from "lucide-react";

import { useTheme } from "@/components/ThemeProvider";
import { Button } from "@/components/ui/button";
import { track } from "@/lib/track";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const Icon = theme === "dark" ? Sun : Moon;
  const label =
    theme === "dark" ? "Switch to light mode" : "Switch to dark mode";

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => {
        toggleTheme();
        track("theme_toggle", { to: theme === "dark" ? "light" : "dark" });
      }}
      aria-label={label}
    >
      <Icon className="size-4" />
    </Button>
  );
}
