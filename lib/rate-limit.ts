/**
 * Tiny in-memory sliding-window rate limiter. Good enough for a portfolio
 * contact form behind a single serverless region. If this site grows beyond
 * one region, swap to Upstash Redis (the consume() contract stays the same).
 */

type Hits = { timestamps: number[] };

const BUCKETS = new Map<string, Hits>();

export type RateLimitResult = {
  ok: boolean;
  remaining: number;
  resetMs: number;
};

export function consume(
  key: string,
  limit: number,
  windowMs: number,
  now: number = Date.now(),
): RateLimitResult {
  const bucket = BUCKETS.get(key) ?? { timestamps: [] };
  const cutoff = now - windowMs;
  bucket.timestamps = bucket.timestamps.filter((t) => t > cutoff);

  if (bucket.timestamps.length >= limit) {
    BUCKETS.set(key, bucket);
    const oldest = bucket.timestamps[0] ?? now;
    return { ok: false, remaining: 0, resetMs: oldest + windowMs - now };
  }

  bucket.timestamps.push(now);
  BUCKETS.set(key, bucket);
  return {
    ok: true,
    remaining: Math.max(0, limit - bucket.timestamps.length),
    resetMs: windowMs,
  };
}

// Test helper — do not use from app code.
export function __resetRateLimit(): void {
  BUCKETS.clear();
}
