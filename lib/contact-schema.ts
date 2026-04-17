import { z } from "zod";

// Shared schema: imported by the client form (for validation) AND by the API
// route (for re-validation on submit — never trust the client).
export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name is too short")
    .max(120, "Name is too long"),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email("That doesn't look like an email"),
  message: z
    .string()
    .trim()
    .min(10, "Give me a bit more to work with (10+ chars)")
    .max(4000, "Keep it under 4,000 characters"),
  // Honeypot — bots fill visible fields AND hidden ones. Humans leave it blank.
  // Required-but-empty keeps input/output types symmetric so zodResolver
  // infers cleanly.
  website: z.string().max(0, "no"),
});

export type ContactPayload = z.infer<typeof contactSchema>;
