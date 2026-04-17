import { describe, expect, it } from "vitest";

import { contactSchema } from "@/lib/contact-schema";

describe("contactSchema", () => {
  it("accepts a well-formed payload", () => {
    const res = contactSchema.safeParse({
      name: "Gautam",
      email: "someone@example.com",
      message: "Hello there, this is a long enough message.",
      website: "",
    });
    expect(res.success).toBe(true);
  });

  it("rejects a short name", () => {
    const res = contactSchema.safeParse({
      name: "A",
      email: "x@y.com",
      message: "Hello there, long enough message body",
      website: "",
    });
    expect(res.success).toBe(false);
  });

  it("rejects an invalid email", () => {
    const res = contactSchema.safeParse({
      name: "Gautam",
      email: "not-an-email",
      message: "Hello there, long enough message body",
      website: "",
    });
    expect(res.success).toBe(false);
  });

  it("rejects a short message", () => {
    const res = contactSchema.safeParse({
      name: "Gautam",
      email: "x@y.com",
      message: "hi",
      website: "",
    });
    expect(res.success).toBe(false);
  });

  it("rejects a filled honeypot (max-0 rule)", () => {
    const res = contactSchema.safeParse({
      name: "Gautam",
      email: "x@y.com",
      message: "Hello there, long enough message body",
      website: "https://spam.example.com",
    });
    expect(res.success).toBe(false);
  });

  it("requires the honeypot field to be present (empty string passes)", () => {
    const res = contactSchema.safeParse({
      name: "Gautam",
      email: "x@y.com",
      message: "Hello there, long enough message body",
      website: "",
    });
    expect(res.success).toBe(true);
  });

  it("normalizes whitespace and lowercases email", () => {
    const res = contactSchema.safeParse({
      name: "  Gautam  ",
      email: "  Someone@EXAMPLE.com  ",
      message: "  Hello there, long enough message body  ",
      website: "",
    });
    expect(res.success).toBe(true);
    if (res.success) {
      expect(res.data.name).toBe("Gautam");
      expect(res.data.email).toBe("someone@example.com");
      expect(res.data.message).toBe("Hello there, long enough message body");
    }
  });
});
