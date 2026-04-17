"use client";

import { useSyncExternalStore } from "react";

/**
 * Subscribes to a CSS media query and returns whether it currently matches.
 * SSR-safe: server snapshot is always `false`, which is the safe default for
 * progressive enhancement (e.g. "load heavy WebGL only if the media query
 * matches on the client").
 */
export function useMediaQuery(query: string): boolean {
  return useSyncExternalStore(
    (callback) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", callback);
      return () => mql.removeEventListener("change", callback);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
}
