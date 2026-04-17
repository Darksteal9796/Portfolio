import { track as vercelTrack } from "@vercel/analytics";

// Matches Vercel Analytics' AllowedPropertyValues. Plausible accepts the
// same primitives, so this is the common ground between the two providers.
export type EventProps = Record<string, string | number | boolean | null>;

type PlausibleFn = (event: string, options?: { props?: EventProps }) => void;

declare global {
  interface Window {
    plausible?: PlausibleFn;
  }
}

/**
 * Fires an analytics event to every wired provider.
 *
 * v2 (this file): Vercel Analytics + Plausible (script-tag). Both providers
 * accept the same event name. Missing providers are tolerated silently —
 * local dev without either set up still calls track() safely.
 */
export function track(event: string, props?: EventProps): void {
  if (process.env.NODE_ENV !== "production") {
    console.log("[track]", event, props ?? {});
  }

  try {
    vercelTrack(event, props);
  } catch {
    // Vercel Analytics no-ops outside a Vercel-hosted + client context.
  }

  if (typeof window !== "undefined" && typeof window.plausible === "function") {
    try {
      window.plausible(event, props ? { props } : undefined);
    } catch {
      // Plausible errors are non-fatal.
    }
  }
}
