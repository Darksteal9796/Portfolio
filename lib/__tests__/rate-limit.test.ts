import { afterEach, describe, expect, it } from "vitest";

import { __resetRateLimit, consume } from "@/lib/rate-limit";

describe("rate-limit", () => {
  afterEach(() => __resetRateLimit());

  it("allows requests up to the limit", () => {
    for (let i = 0; i < 5; i++) {
      const r = consume("ip-a", 5, 60_000, 1000 + i);
      expect(r.ok).toBe(true);
    }
  });

  it("blocks the request that exceeds the limit", () => {
    for (let i = 0; i < 5; i++) consume("ip-b", 5, 60_000, 1000);
    const blocked = consume("ip-b", 5, 60_000, 1000);
    expect(blocked.ok).toBe(false);
    expect(blocked.remaining).toBe(0);
  });

  it("resets after the window slides past old timestamps", () => {
    for (let i = 0; i < 5; i++) consume("ip-c", 5, 60_000, 1000);
    const blocked = consume("ip-c", 5, 60_000, 1000);
    expect(blocked.ok).toBe(false);

    // 61 seconds later — all prior hits are outside the window.
    const fresh = consume("ip-c", 5, 60_000, 62_000);
    expect(fresh.ok).toBe(true);
  });

  it("tracks keys independently", () => {
    for (let i = 0; i < 5; i++) consume("ip-d", 5, 60_000, 1000);
    const blocked = consume("ip-d", 5, 60_000, 1000);
    const otherIp = consume("ip-e", 5, 60_000, 1000);
    expect(blocked.ok).toBe(false);
    expect(otherIp.ok).toBe(true);
  });
});
