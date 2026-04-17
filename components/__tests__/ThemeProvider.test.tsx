import { act, renderHook, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { ThemeProvider, useTheme } from "@/components/ThemeProvider";

describe("useTheme", () => {
  it("throws when used outside ThemeProvider", () => {
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});
    try {
      expect(() => renderHook(() => useTheme())).toThrow(
        /must be used within ThemeProvider/,
      );
    } finally {
      spy.mockRestore();
    }
  });

  it("reads 'light' when html has no dark class", () => {
    const { result } = renderHook(() => useTheme(), {
      wrapper: ThemeProvider,
    });
    expect(result.current.theme).toBe("light");
  });

  it("reads 'dark' when html already has dark class", () => {
    document.documentElement.classList.add("dark");
    const { result } = renderHook(() => useTheme(), {
      wrapper: ThemeProvider,
    });
    expect(result.current.theme).toBe("dark");
  });

  it("setTheme('dark') adds dark class and persists to localStorage", () => {
    const { result } = renderHook(() => useTheme(), {
      wrapper: ThemeProvider,
    });
    act(() => result.current.setTheme("dark"));
    expect(document.documentElement.classList.contains("dark")).toBe(true);
    expect(window.localStorage.getItem("theme")).toBe("dark");
  });

  it("setTheme('light') removes dark class and persists to localStorage", () => {
    document.documentElement.classList.add("dark");
    const { result } = renderHook(() => useTheme(), {
      wrapper: ThemeProvider,
    });
    act(() => result.current.setTheme("light"));
    expect(document.documentElement.classList.contains("dark")).toBe(false);
    expect(window.localStorage.getItem("theme")).toBe("light");
  });

  it("toggleTheme flips dark → light", async () => {
    document.documentElement.classList.add("dark");
    const { result } = renderHook(() => useTheme(), {
      wrapper: ThemeProvider,
    });
    expect(result.current.theme).toBe("dark");
    act(() => result.current.toggleTheme());
    await waitFor(() => expect(result.current.theme).toBe("light"));
    expect(document.documentElement.classList.contains("dark")).toBe(false);
  });

  it("toggleTheme flips light → dark", async () => {
    const { result } = renderHook(() => useTheme(), {
      wrapper: ThemeProvider,
    });
    expect(result.current.theme).toBe("light");
    act(() => result.current.toggleTheme());
    await waitFor(() => expect(result.current.theme).toBe("dark"));
    expect(document.documentElement.classList.contains("dark")).toBe(true);
  });

  it("reflects external DOM class changes via MutationObserver", async () => {
    const { result } = renderHook(() => useTheme(), {
      wrapper: ThemeProvider,
    });
    expect(result.current.theme).toBe("light");
    act(() => {
      document.documentElement.classList.add("dark");
    });
    await waitFor(() => expect(result.current.theme).toBe("dark"));
  });

  describe("with a broken localStorage", () => {
    const originalSetItem = Storage.prototype.setItem;

    afterEach(() => {
      Storage.prototype.setItem = originalSetItem;
    });

    it("swallows setItem errors so the theme still updates visually", () => {
      Storage.prototype.setItem = () => {
        throw new Error("QuotaExceeded");
      };
      const { result } = renderHook(() => useTheme(), {
        wrapper: ThemeProvider,
      });
      expect(() => act(() => result.current.setTheme("dark"))).not.toThrow();
      expect(document.documentElement.classList.contains("dark")).toBe(true);
    });
  });
});
