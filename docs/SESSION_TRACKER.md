# Session Tracker

> Lives for the life of the project. Updated by /build, /change, /save-state.

## Active sprint

**Personal website v1 — build from spec Prompt Pack (P0–P15)**
Kickoff: 2026-04-18 · Target: 4 weeks · Spec: [docs/specs/personal-website-spec.md](specs/personal-website-spec.md)

## Chunks

| # | Chunk | Status | Files | Risk | Notes |
|---|-------|--------|-------|------|-------|
| P0 | Project init | completed | ~20 | low | Next 16 (not 15), scaffolded via /tmp; commit pending |
| P1 | Design system tokens | completed | 4 | low | Tailwind v4 → tokens in globals.css; useSyncExternalStore for theme |
| P2 | Bento grid primitives | completed | 4 | low | BentoGrid, BentoTile, /design preview + test; demo uses 5 tiles (sm ×2) to fill rows cleanly |
| P3 | Hero + WebGL particle field | completed | 7 | med | R3F dynamic + desktop + reduced-motion gate; needed @types/three; particle positions at module scope (purity lint) |
| P4 | Static tiles (Now, Stack, Location, Resume) | completed | 8 | low | marked + @icons-pack/react-simple-icons added; AWS/Twilio use lucide fallbacks; 531B placeholder resume.pdf generated; TooltipProvider wired at layout |
| P5 | GitHub tile (server, cached) | completed | 2 | med | REST events + GraphQL contribs, dual fetch w/ revalidate 3600. Graceful fallback when GITHUB_TOKEN missing. Lucide dropped Github icon → SiGithub fallback |
| P6 | Experience timeline (GSAP) | completed | 3 | med | GSAP ScrollTrigger pin on desktop, vertical stack fallback on mobile + reduced-motion. Full-width section (not BentoTile child) to avoid pin-in-grid layout bugs |
| P7 | Project cards + case study pages | completed | 10 | med | next-mdx-remote (contentlayer2 abandoned). gray-matter frontmatter. 4 MDX seeds. /work/[slug] statically pre-rendered (SSG). CSS view-transition-name for shared-element morph (modern, no Framer Motion layoutId complexity) |
| P8 | Contact form | pending | ~3 | med | Resend + in-memory rate-limit |
| P9 | Command palette (⌘K) | pending | ~2 | low | cmdk already installed |
| P10 | SEO, sitemap, OG images | pending | ~5 | low | next-sitemap + ImageResponse |
| P11 | Analytics | pending | ~3 | low | Vercel Analytics SDK + Plausible script |
| P12 | Performance pass | pending | ~2 | med | Lighthouse CI in GH Actions |
| P13 | Accessibility pass | pending | ~3 | low | axe + NVDA walkthrough |
| P14 | Deploy to production | pending | N/A | high | DNS cutover; confirm domain |
| P15 | Migrate to Cloudflare Pages (optional) | pending | ~2 | med | Only if bandwidth matters |

## Legend

- pending — not started
- in-progress — being worked on now
- blocked — waiting on something
- completed — merged and verified

## Completed (archive)

<move completed chunks here periodically to keep the active list short>
