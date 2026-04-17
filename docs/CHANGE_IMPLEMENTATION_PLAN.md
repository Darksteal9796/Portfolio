# Change Implementation Plan

> Generated and appended by /build. Executed by /change.
> One sprint per top-level section.

## Sprint: Personal website v1  (2026-04-18)

### Goal

Ship gautamjoshi.dev — a dark-first bento portfolio with a WebGL hero, two flagship case studies, and recruiter-focused conversion paths. Four weeks from kickoff. Full spec: [docs/specs/personal-website-spec.md](specs/personal-website-spec.md). The Prompt Pack in §17 *is* the chunk plan — one prompt = one chunk.

### Chunks (execute in order)

#### P0 — Project init

```
Initialise a new Next.js 15 project with TypeScript, App Router, Tailwind CSS v4, and ESLint. Use pnpm. Install: framer-motion, gsap, three, @react-three/fiber, @react-three/drei, lucide-react, react-hook-form, zod, @hookform/resolvers, cmdk, clsx, tailwind-merge, resend. Initialise shadcn/ui and add: button, card, dialog, input, textarea, sheet, tooltip, command. Set up the following folder structure: app/, components/ui/, components/tiles/, components/sections/, content/case-studies/, content/now.md, lib/, public/og/, public/projects/. Create a .env.example with RESEND_API_KEY, GITHUB_TOKEN, NEXT_PUBLIC_SITE_URL. Commit as "chore: scaffold".
```

**Status:** completed 2026-04-18. Deviations — Next 16.2.4 installed (not 15.x — `next@latest` resolves to 16); scaffolded via /tmp workaround (npm naming); commit pending. Rollback: `rm -rf` scaffolded files, restore from empty state.

#### P1 — Design system tokens

```
Create the dark-first design system in app/globals.css and tailwind.config.ts. Use these tokens:
— Background: #0A0A0A (dark) / #FAFAFA (light)
— Surface: #141414 / #FFFFFF
— Border: #2A2A2A / #EAEAEA
— Text: #F5F5F5 / #0A0A0A
— Muted: #9A9A9A / #5A5A5A
— Accent: #7C3AED (violet)
— Success: #22C55E
Install Geist Sans and Geist Mono via next/font. Set Geist Sans as the default for body, Geist Mono for code/meta. Build a ThemeProvider + ThemeToggle component that persists to localStorage and respects prefers-color-scheme on first visit.
```

**Files touched:** app/globals.css, app/layout.tsx, components/ThemeProvider.tsx (new), components/ThemeToggle.tsx (new).
**No changes to:** app/page.tsx, components/ui/*, components/tiles/*, components/sections/*, lib/utils.ts.
**Deviation from spec:** no tailwind.config.ts — Tailwind v4 is CSS-first; all tokens in globals.css via `@theme`.
**Rollback:** revert the four files; delete the two new components.

#### P2 — Bento grid primitives

```
Create components/ui/BentoGrid.tsx and BentoTile.tsx.
BentoGrid: CSS grid, 12 cols desktop, 6 cols tablet, 1 col mobile. Gap 32/28/24. Max-width 1280, mx-auto, px-6.
BentoTile: props = { size: "sm" | "md" | "lg" | "xl", className?, children }. Size maps to col-span (sm=3, md=6, lg=8, xl=12). Tile has rounded-2xl, border, bg-surface, p-6, hover:ring-2 hover:ring-accent/30 transition.
Include a demo page at /app/design/page.tsx showing all four sizes in a 2-row grid.
```

#### P3 — Hero + WebGL particle field

```
Build components/tiles/HeroTile.tsx.
Headline: "Senior AI Full-Stack Engineer. I ship LLM systems that run in production."
Sub: "RAG pipelines, fine-tuned models, voice agents. Four years of production code. Currently building the AI training platform at Turing."
CTA Primary: "Read the case studies →" (scrolls to projects section)
CTA Secondary: "Download resume ↓" (links to /resume.pdf)

Behind the text, render a WebGL particle field via React Three Fiber (components/three/ParticleField.tsx). 2,000 particles, violet accent, subtle parallax to cursor. Dynamically import R3F on client only, wrap in Suspense, fall back to a CSS radial gradient. On prefers-reduced-motion, do not load R3F — render only the gradient.
```

#### P4 — Static tiles (Now, Stack, Location, Resume)

```
Build these tiles as simple server components where possible:
- NowTile: reads content/now.md, renders as prose. Show a pulsing green dot next to the heading.
- StackTile: grid of lucide icons for: Python, React, AWS, LangChain, Postgres, Twilio, N8N, GSAP. Each icon has a tooltip with one-line description.
- LocationTile: "Pune, India · IST". Client component that ticks the current time every second in HH:mm.
- ResumeTile: big download button that links to /resume.pdf and fires a "resume_download" analytics event on click.

Place the resume PDF at public/resume.pdf (placeholder for now — Gautam will drop it in).
```

#### P5 — GitHub tile (server, cached)

```
Build components/tiles/GithubTile.tsx as a React Server Component. Fetch from the GitHub REST API:
- Latest public commit from the user darksteal9796 (iterate across repos, pick most recent).
- Contribution count over the last 52 weeks (via GraphQL).
Cache with Next.js fetch + revalidate: 3600.
Render a 7x7 contribution grid (like GitHub's), the number of contributions, the latest commit message + repo + timestamp. Use GITHUB_TOKEN from env for higher rate limits.
```

#### P6 — Experience timeline (GSAP ScrollTrigger)

```
Build components/tiles/ExperienceTile.tsx. Inside the tile, render a horizontal timeline with three entries: Turing (11/2024 — present), Newspace (01/2024 — 11/2024), TCS / Vanguard + Credit Suisse (09/2021 — 01/2024). Each entry has: period, role, company, 1-sentence headline.

Use GSAP ScrollTrigger to pin the tile while scrolling and advance the timeline horizontally as the user scrolls. On mobile, fall back to a vertical stack (no pinning).
Install the GSAP no-auth package (gsap 3.x). Register ScrollTrigger in a useEffect.
```

#### P7 — Project cards + case study pages

```
Set up MDX parsing with contentlayer2 (or next-mdx-remote if contentlayer2 has issues with Next 15 — check the current compatibility).

Build:
- ProjectCard component — renders a case study's frontmatter as a tile (cover image, title, role, period, tags).
- app/work/[slug]/page.tsx — reads the MDX, renders CaseStudyHeader + CaseStudyBody + CaseStudyNav.
- Shared-element transition: clicking a ProjectCard should morph into the case study hero. Use Framer Motion layoutId on the image + title.

Seed content/case-studies/ with four files: autonomous-revenue-engine.mdx, ai-best-buddy.mdx, avyann.mdx, turing-llm-platform.mdx. I will fill the bodies — use the frontmatter schema from the spec and a placeholder paragraph for each body.
```

#### P8 — Contact form

```
Build components/tiles/ContactTile.tsx with a react-hook-form + zod form: name, email, message (single textarea). Validate client-side. On submit, POST to /api/contact.

Build /app/api/contact/route.ts — validates with the same zod schema, rate-limits to 5 req/hour per IP (use a simple in-memory map for v1, Upstash Redis if migrating to Vercel), sends via Resend to gautamjoshi.dev@gmail.com. Return 200 + { ok: true } on success, 4xx on validation / rate-limit.

Show success state inline: form collapses into a "Thanks — I'll reply within 24h." message.
```

#### P9 — Command palette (⌘K)

```
Build components/CommandPalette.tsx using cmdk. Open on ⌘K / Ctrl+K. Items: each case study, each section of the home page (scroll to Hero, Projects, Stack, Contact), theme toggle, download resume.

Style it to match the dark-first theme. Keyboard arrows navigate, Enter activates. Focus-trap while open.
```

#### P10 — SEO, sitemap, OG images

```
Set up:
- Per-route metadata via Next.js Metadata API (title, description, OG, Twitter card).
- Dynamic OG image generation for each case study using Next.js ImageResponse at app/work/[slug]/opengraph-image.tsx.
- next-sitemap config → /sitemap.xml at build.
- /robots.txt allowing all, pointing to sitemap.
- Person JSON-LD on /, CreativeWork JSON-LD on each case study.
- Canonical URLs everywhere.
```

#### P11 — Analytics

```
Install @vercel/analytics and Plausible (script tag, not the SDK).
Add Analytics component to app/layout.tsx.
Create lib/track.ts exposing: track(event: string, props?) — fires to both Vercel and Plausible.
Fire these events: case_study_open, resume_download, contact_submit, scroll_depth_75, theme_toggle, command_palette_open.
Test in production — events must appear in both dashboards.
```

#### P12 — Performance pass

```
Run Lighthouse on / and one case study. Fix anything below 95.

Checklist:
- next/image everywhere. AVIF + WebP. No raw PNGs served.
- Fonts: preload Geist Sans 400 + 600 only.
- R3F chunk: dynamic import with ssr:false, only on desktop (window.matchMedia("(min-width: 1024px)")).
- Tailwind: purge working (it is, by default in v4).
- Third-party scripts: strategy="afterInteractive" or "lazyOnload".
- Cache: set s-maxage and stale-while-revalidate on static routes.

Add Lighthouse CI to GitHub Actions, failing PRs below 95 on Performance.
```

#### P13 — Accessibility pass

```
Run axe DevTools on / and all case study pages. Fix every error.

Manual checks:
- Keyboard: Tab through the whole home page. Every interactive tile is focusable, focus ring visible.
- Screen reader: NVDA/VoiceOver walkthrough of / and one case study. Section headings announced, images have alt, canvas has aria-hidden.
- Reduced motion: toggle OS setting, reload. WebGL hero is replaced with a static gradient, scroll animations are disabled.
- Colour contrast: run the palette through a contrast checker. All text passes AA.

Add a simple "Skip to content" link as the first focusable element.
```

#### P14 — Deploy to production

```
Deploy to Vercel Hobby first for fastest path to a live URL:
1. `vercel` from the project root.
2. Point gautamjoshi.dev at Vercel via DNS (Cloudflare Registrar → Vercel CNAME).
3. Configure env vars in Vercel dashboard.
4. Confirm Lighthouse on the live URL is still ≥ 95.

Submit to Google Search Console + Bing Webmaster Tools.
Post the link on LinkedIn.
```

#### P15 — Optional: migrate to Cloudflare Pages

```
Only if you need unlimited bandwidth or want the extra edge locations.
1. `pnpm add -D @cloudflare/next-on-pages vercel`
2. Configure wrangler.toml.
3. Push to Cloudflare Pages via `npx @cloudflare/next-on-pages`.
4. Test all dynamic routes on the Cloudflare Pages URL.
5. Move DNS CNAME from Vercel to Cloudflare Pages.
6. Keep Vercel as a fallback preview env for 2 weeks.
```
