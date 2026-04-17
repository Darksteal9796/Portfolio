/**
 * Emits an analytics event.
 *
 * v1 is a no-op that logs in dev. P11 wires this to Vercel Analytics + Plausible.
 * Call sites should not need to change when the real implementation lands.
 */
export function track(event: string, props?: Record<string, unknown>): void {
  if (process.env.NODE_ENV !== "production") {
    console.log("[track]", event, props ?? {});
  }
}
