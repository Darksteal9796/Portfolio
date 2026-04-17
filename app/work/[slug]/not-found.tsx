import Link from "next/link";

export default function CaseStudyNotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 px-6 text-center">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
        404 · Case study
      </p>
      <h1 className="text-3xl font-semibold tracking-tight">
        Nothing here yet.
      </h1>
      <p className="max-w-md text-muted-foreground">
        That case study either moved or hasn&apos;t been written. The published
        ones are on the home page.
      </p>
      <Link
        href="/#projects"
        className="font-mono text-xs uppercase tracking-[0.2em] text-primary transition hover:text-primary/80"
      >
        ← Back to work
      </Link>
    </main>
  );
}
