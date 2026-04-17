import { HeroBackground } from "./HeroBackground";

export function HeroTile() {
  return (
    <section className="relative isolate flex min-h-[500px] flex-col justify-center overflow-hidden rounded-2xl border bg-card px-8 py-16 lg:min-h-[640px] lg:px-16 lg:py-24">
      <HeroBackground />
      <div className="relative z-10 max-w-3xl">
        <h1 className="text-balance text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
          Senior AI Full-Stack Engineer. I ship LLM systems that run in
          production.
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl">
          RAG pipelines, fine-tuned models, voice agents. Four years of
          production code. Currently building the AI training platform at
          Turing.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <a
            href="#projects"
            className="inline-flex h-12 items-center justify-center rounded-full bg-primary px-6 text-sm font-medium text-primary-foreground transition hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            Read the case studies →
          </a>
          <a
            href="/resume.pdf"
            download
            className="inline-flex h-12 items-center justify-center rounded-full border bg-background/80 px-6 text-sm font-medium transition hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            Download resume ↓
          </a>
        </div>
      </div>
    </section>
  );
}
