"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

import { useMediaQuery } from "@/lib/hooks";

type Entry = {
  period: string;
  role: string;
  company: string;
  impact: string;
};

const ENTRIES: Entry[] = [
  {
    period: "11/2024 — Present",
    role: "Senior Software Engineer",
    company: "Turing",
    impact:
      "Shipped the Python backend for the internal LLM training + evaluation platform. 5,000+ users. Built RAG eval pipelines. Fine-tuned with SFT and RLHF across Python, Java, Ruby, Rust.",
  },
  {
    period: "01/2024 — 11/2024",
    role: "Backend Developer",
    company: "Newspace Research and Technologies",
    impact:
      "Drone swarm coordination algorithms and fleet management APIs. Systems deployed on live hardware.",
  },
  {
    period: "09/2021 — 01/2024",
    role: "SME / Full-Stack — Finance & Investment",
    company: "Vanguard (TCS), Credit Suisse (TCS)",
    impact:
      "Java microservices at 75K+ daily transactions. Python + Java tech lead at Vanguard.",
  },
];

export function ExperienceTile() {
  const reduceMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const pinEligible = isDesktop && !reduceMotion;

  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!pinEligible) return;
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // section.clientWidth includes horizontal padding; the track only has
      // (clientWidth - paddingL - paddingR) of visible room.
      const visibleTrackWidth = () => {
        const style = window.getComputedStyle(section);
        const padL = parseFloat(style.paddingLeft) || 0;
        const padR = parseFloat(style.paddingRight) || 0;
        return section.clientWidth - padL - padR;
      };
      const distance = () =>
        Math.max(0, track.scrollWidth - visibleTrackWidth());

      // No pin. Track translates horizontally as the section scrolls through
      // the viewport. Start: section top reaches 75% viewport height (cards
      // just entering view). End: section bottom reaches 25% viewport height
      // (cards about to leave). Scrub ties progress to scroll linearly.
      gsap.to(track, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top 75%",
          end: "bottom 25%",
          scrub: true,
          invalidateOnRefresh: true,
        },
      });
    }, section);

    // Layout can settle after fonts/images resolve; recompute trigger positions
    // on the next frame to avoid a stuck pin at first paint.
    const raf = requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => {
      cancelAnimationFrame(raf);
      ctx.revert();
    };
  }, [pinEligible]);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="experience-heading"
      className="relative overflow-hidden rounded-2xl border bg-card p-8 lg:p-12"
    >
      <div className="flex items-center justify-between gap-4">
        <h2
          id="experience-heading"
          className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground"
        >
          Experience
        </h2>
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground/60">
          {pinEligible ? "Scroll →" : "Most recent first"}
        </p>
      </div>

      {pinEligible ? (
        <div
          ref={trackRef}
          className="mt-8 flex gap-6 will-change-transform"
          style={{ width: "max-content" }}
        >
          {ENTRIES.map((entry, i) => (
            <article
              key={entry.company}
              className="group relative flex w-[min(28rem,calc(100vw-4rem))] shrink-0 flex-col rounded-xl border bg-background/40 p-8 transition hover:border-primary/40 hover:bg-background/60 hover:ring-2 hover:ring-accent/30"
            >
              <span
                aria-hidden
                className="absolute left-8 top-8 font-mono text-[10px] text-muted-foreground/50 transition group-hover:text-primary/70"
              >
                0{ENTRIES.length - i}
              </span>
              <p className="mt-6 font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground">
                {entry.period}
              </p>
              <h3 className="mt-3 text-2xl font-semibold leading-tight tracking-tight transition group-hover:text-primary">
                {entry.role}
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {entry.company}
              </p>
              <p className="mt-5 text-sm leading-relaxed text-foreground/85">
                {entry.impact}
              </p>
            </article>
          ))}
        </div>
      ) : (
        <ol className="mt-6 space-y-6">
          {ENTRIES.map((entry) => (
            <li
              key={entry.company}
              className="border-l-2 border-border pl-4"
            >
              <p className="font-mono text-xs text-muted-foreground">
                {entry.period}
              </p>
              <h3 className="mt-1 text-base font-semibold">{entry.role}</h3>
              <p className="text-sm text-muted-foreground">{entry.company}</p>
              <p className="mt-2 text-sm leading-relaxed">{entry.impact}</p>
            </li>
          ))}
        </ol>
      )}
    </section>
  );
}
