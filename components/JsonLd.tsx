/**
 * Inline JSON-LD script. Accepts any JSON-serialisable object.
 *
 * Reads as server-rendered structured data (Google + Bing both parse).
 * Server component — don't make it client-side.
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
