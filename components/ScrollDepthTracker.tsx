"use client";

import { useEffect } from "react";

import { track, type EventProps } from "@/lib/track";

/**
 * Fires a one-shot "scroll_depth_75" event the first time the user has
 * scrolled past 75% of the document. Useful as a proxy for "actually read
 * the case study" vs "bounced off the title".
 */
export function ScrollDepthTracker({
  event = "scroll_depth_75",
  threshold = 0.75,
  props,
}: {
  event?: string;
  threshold?: number;
  props?: EventProps;
}) {
  useEffect(() => {
    let fired = false;

    function onScroll() {
      if (fired) return;
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - window.innerHeight;
      if (scrollable <= 0) return;
      const progress = window.scrollY / scrollable;
      if (progress >= threshold) {
        fired = true;
        track(event, props);
        window.removeEventListener("scroll", onScroll);
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [event, threshold, props]);

  return null;
}
