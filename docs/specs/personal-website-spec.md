# Personal Website — Build Spec

### Claude-Code-ready specification for gautamjoshi.dev
*Owner: Gautam Joshi  ·  Version 1.0  ·  April 2026  ·  Status: Ready to build*

## 1. Executive Summary
This document is the full build spec for Gautam Joshi's personal website. It is written to be pasted into Claude Code in sections, so each section is actionable on its own. The goal is a site that looks like a senior AI engineer built it — not a template.
> One-line pitch:  A senior AI full-stack engineer's portfolio that uses a bento-grid layout with a WebGL hero and scroll-driven micro-interactions — fast, recruiter-focused, and built on a stack that itself signals technical depth.

**What you get when this is built**
- A production-ready site deployed to a custom domain, loading in under 1.5s on 4G.
- Two flagship case studies — Autonomous Revenue Engine and AI Best Buddy — with deep-dive pages.
- A bento hero that shows live GitHub activity, current stack, location, and a primary CTA.
- Resume download (one-click) and contact (form + direct email).
- SEO-clean, indexed, with structured data so recruiter searches surface the site.
- Analytics set up so you can see which case studies convert.
**Primary audience and CTA**
Audience is **recruiters and hiring managers** evaluating you for senior AI/full-stack roles. Every layout decision ladders up to two actions: read the case studies, and grab the resume or contact you. Nothing else competes for attention.

## 2. Positioning & Voice
**Positioning line (for the hero)**
> Hero headline:  Senior AI Full-Stack Engineer. I ship LLM systems that run in production — RAG pipelines, fine-tuned models, voice agents.

Alternative hero lines to A/B test:
- "I build AI systems that leave the demo stage." Punchier, more opinionated.
- "Four years of production Python and React. Two years of LLMs in the loop."
- "I take AI prototypes to 5,000+ users."
**Voice rules (from brand-voice.md)**
Every piece of on-site copy follows these rules:
- One idea per sentence — no compound, overloaded lines.
- Lead with the point. No filler openers ("It's worth noting", "In today's world").
- Active voice: "I built X" not "X was built".
- No AI hype vocabulary: no "leverage", "seamless", "unlock", "holistic", "revolutionize".
- Specific over general. Numbers and names, not abstractions.
- End each section with what the reader should do or click next.
**What the site should NOT sound like**
- "Passionate developer crafting seamless user experiences."
- "Innovative solutions that drive business outcomes."
- "Let's connect to explore synergies."
If Claude Code outputs anything like the above, cut it and rewrite in plain English.

## 3. Information Architecture
Single-page site with deep-dive routes for case studies. No traditional multi-page navigation — the bento-grid homepage is the whole story, with expand-to-full-page transitions for projects.
**Route map**
| Route | Purpose | Primary content |
| --- | --- | --- |
| / | Home — bento grid of everything | Hero, about, projects, stack, now, contact |
| /work/autonomous-revenue-engine | Flagship case study | Problem, architecture, results, stack |
| /work/ai-best-buddy | Flagship case study | Problem, architecture, demo, stack |
| /work/avyann | Short case study | WhatsApp chatbot overview |
| /work/turing-llm-platform | Experience case study | Scale story (5,000+ users) |
| /writing (optional) | Blog / notes | MDX posts, indexed |
| /resume.pdf | One-click download | Latest resume |
| /404 | Custom 404 | Fun, on-brand, with back link |

**Bento homepage — tile layout**
**Twelve-tile asymmetric grid** on desktop, collapses to a single column on mobile. Each tile has a specific job. The first tile above the fold is the hero; everything else earns its place.
| Tile | Size | Content | Interaction |
| --- | --- | --- | --- |
| 01 Hero | Large (2x2) | Name, positioning line, primary CTA | WebGL particle field behind text, mouse parallax |
| 02 Now | Small | "Currently shipping at Turing. Fine-tuning LLMs for a 5k-user platform." | Auto-updates from a Markdown file |
| 03 Featured Project | Medium (2x1) | Autonomous Revenue Engine card | Hover → expand to full case study |
| 04 Stack | Medium (2x1) | Stack icons — Python, LLMs, RAG, AWS | Hover any icon → short blurb |
| 05 GitHub | Small | Live contribution graph + latest commit | Pulls from GitHub API nightly |
| 06 Location | Small | Pune, India · UTC+5:30 + local time | Time ticks live |
| 07 Experience | Large (2x2) | Timeline: Turing → Newspace → TCS | Scroll-driven timeline inside the tile |
| 08 AI Best Buddy | Medium | Card with live demo GIF | Hover → play a 3s demo loop |
| 09 Reading | Small | "Currently reading: [book]" | Manual, updated via Markdown |
| 10 Writing | Medium | Latest blog post | Linked if /writing is enabled |
| 11 Contact | Medium | Email + socials + short form | Form posts to Resend/SendGrid |
| 12 Resume | Small | Download button | Serves /resume.pdf |

**Mobile architecture**
Mobile is not a shrunken desktop. Bento collapses to a single vertical stream in this exact order: Hero → Now → Featured Project → Stack → Experience → AI Best Buddy → Writing → Contact → Resume → Footer. GitHub, Location, and Reading tiles are demoted into a collapsible "More" section so mobile users aren't forced through the low-signal tiles.

## 4. Page-by-page Content
Real copy, not placeholders. Every block below ships as-is unless Gautam wants to rewrite it. Copy follows brand-voice.md.
**4.1 Hero tile**
```
Hero copy
HEADLINE:
Senior AI Full-Stack Engineer.
I ship LLM systems that run in production.

SUB:
RAG pipelines, fine-tuned models, voice agents. Four years of production code.
Currently building the AI training platform at Turing.

CTA PRIMARY:  Read the case studies  →
CTA SECONDARY: Download resume  ↓
```

**4.2 Now tile**
```
Now copy
Currently:
Shipping an internal LLM training platform at Turing — 5,000+ users, Python backend, RAG eval pipelines.

On the side:
Building Avyann (WhatsApp chatbot). Fine-tuning across Python, Java, Ruby, Rust.
```

**4.3 Autonomous Revenue Engine — deep case study**
**Problem**
B2B sales reps spend hours on outreach that half the time misses the mark. Generic sequences. No context on what the prospect actually did. Revenue suffers, reps burn out.
**What I built**
An AI voice sales agent that runs the full pipeline — pitch, objection handling, qualification, post-call follow-up — and hands reps warm, qualified leads. Twilio for voice infrastructure, a conversation intelligence layer for personalised pitching, N8N for orchestration, and a RAG layer so the agent speaks with context on each prospect.
**Architecture**
- Voice layer — Twilio Programmable Voice for inbound/outbound call routing.
- Conversation intelligence — Retell AI for real-time transcription, interruption handling, pitch control.
- Context layer — RAG pipeline over prospect CRM data, company news, prior touches.
- Orchestration — N8N workflows connecting voice output to CRM write-backs and follow-up email generation.
- Stack — Python backend, Node/N8N for flows, Postgres for call logs, AWS for everything.
**Results and what I'd do differently**
Shipped to production. Biggest lesson: latency is the product. Any pause over 600ms and the prospect notices it's an agent. Next iteration will use local streaming TTS to cut 300ms off every turn.
**4.4 AI Best Buddy — second case study**
**Problem**
Most conversational AI apps feel flat because they don't adapt tone. Same response whether the user is upbeat or venting.
**What I built**
A conversational AI app — Python, Django, LangChain — that reads sentiment in real time and adjusts response tone accordingly. A frustrated user gets a calmer, shorter reply. An excited user gets more energy back.
**Stack**
- LangChain for LLM orchestration — swappable model backend.
- Sentiment analysis running per-turn, feeding a tone-control layer before generation.
- Prompt engineering to enforce consistency — the model can't drift off-character mid-conversation.
**State**
Active development since February 2025. Currently iterating on the tone-control layer — the hard part is distinguishing "excited" from "frustrated-but-trying-to-sound-polite".
**4.5 Avyann — one-paragraph case**
WhatsApp chatbot, AI-driven. Full product details come later — this tile exists to show the breadth of surfaces I build on: voice (ARE), web (AI Best Buddy), messaging (Avyann).
**4.6 Turing — the experience story**
Senior Software Engineer at Turing since November 2024. Designed and shipped the Python backend for the internal LLM training and evaluation platform — 5,000+ users. Built RAG pipelines for eval. Fine-tuned models using SFT and RLHF across Python, Java, Ruby, and Rust. Deployed and monitored everything on AWS.
**4.7 Experience timeline tile**
| Period | Role | Company | Headline impact |
| --- | --- | --- | --- |
| 11/2024 — Present | Senior Software Engineer | Turing | Internal LLM platform, 5K+ users, RAG + fine-tuning |
| 01/2024 — 11/2024 | Backend Developer | Newspace Research and Technologies | Drone swarm algorithms + fleet management APIs |
| 09/2021 — 01/2024 | SME / Full-Stack — Finance & Investment | Vanguard (TCS), Credit Suisse (TCS) | Java microservices at 75K+ daily transactions; Python & Java Tech Lead at Vanguard |

**4.8 Stack tile — real skills, grouped**
| Area | Tools |
| --- | --- |
| AI / LLM | LangChain, RAG, SFT, RLHF, Prompt Engineering, Sentiment Analysis |
| Languages | Python (primary), Java, JavaScript, Ruby, Rust (fine-tuning exposure) |
| Frameworks | FastAPI, Django, Spring Boot, Rails, React |
| Cloud | AWS (Lambda, Kinesis, CloudWatch), GCP fundamentals |
| Data | PostgreSQL, PL/SQL, Attunity, Kinesis |
| Comms / Infra | Twilio, N8N, Linux, Git |

**4.9 Contact tile**
```
Contact block
Email: gautamjoshi.dev@gmail.com
Phone: +91 7020987773 (text first)
LinkedIn: linkedin.com/in/[handle]
GitHub: github.com/darksteal9796

Form: Name, Email, What's up — single textarea. No dropdown, no "How did you hear about me".
```

**4.10 Footer**
Minimal. Left side: "Built with Next.js 15, R3F, and too much GSAP. © 2026." Right side: three icons — GitHub, LinkedIn, X/Twitter. No newsletter signup in v1 — add it only if writing ships.

## 5. Visual & UI Direction
**Design principles**
- Dark-first. The site defaults to dark mode. Light mode is a toggle, not the default.
- One dominant interaction per viewport — hero has the WebGL, mid-page has scroll-driven, footer is calm. Don't stack three wow moments in one viewport.
- Motion serves meaning. Every animation either confirms an action or reveals new content. No decoration.
- The bento grid breathes. Generous gaps (24–32px). Tiles don't touch.
**Colour system**
| Role | Dark theme | Light theme | Notes |
| --- | --- | --- | --- |
| Background | #0A0A0A | #FAFAFA | Near-black / near-white, never pure |
| Surface (tile bg) | #141414 | #FFFFFF | Slight elevation vs background |
| Border | #2A2A2A | #EAEAEA | 1px, subtle, defines tiles |
| Text primary | #F5F5F5 | #0A0A0A |   |
| Text muted | #9A9A9A | #5A5A5A | Meta lines, timestamps |
| Accent | #7C3AED (violet) | #5B21B6 | CTAs, highlights — ONE accent, not a palette |
| Success/live | #22C55E | #16A34A | For "shipping now" pings |

> Accent rule:  Exactly one accent colour in v1 (violet). Do not introduce a secondary accent until v2. Multi-colour accents on a dark site look like a landing-page template.

**Typography**
- **Display — **Geist Sans (variable). Fallback: Inter. Sizes: 64/48/32 for hero, sections, cards.
- **Body — **Geist Sans 16/1.6. Larger than usual for scannability.
- **Mono — **JetBrains Mono or Geist Mono. For code, timestamps, the "location" tile, GitHub commit lines.
- Rule: no more than two typefaces total. Geist Sans + Geist Mono ships together — use those.
**Motion vocabulary**
| Where | What | Library |
| --- | --- | --- |
| Hero background | WebGL particle field that reacts to cursor | React Three Fiber + @react-three/drei |
| Tile hover | Lift + subtle glow, 180ms ease-out | Framer Motion (whileHover) |
| Scroll reveals | Tiles fade + translate-y-8 on enter | Framer Motion useInView |
| Experience timeline | Horizontal scroll-driven pin inside the tile | GSAP ScrollTrigger |
| Case study transition | Shared-element morph from tile to full page | Framer Motion layoutId |
| Cursor | Custom blended-cursor on desktop (not mobile) | Plain CSS + JS, ~30 lines |
| Text entrance | Split-text word reveal on hero | GSAP SplitText (free plan) |

**Bento grid spec**
- Grid — CSS Grid, 12 columns on desktop, 6 on tablet, 1 on mobile.
- Gap — 24px mobile, 28px tablet, 32px desktop.
- Tile border radius — 16px. Consistent across all tiles.
- Tile shadows — none in dark mode (border does the work). Light mode uses a 4px/8% black shadow.
- Max width — 1280px, centred. Do not go full-bleed.
**Inspiration references**
- Vercel homepage (2026 redesign) — bento with restraint.
- Brittany Chiang's portfolio — classic, tight copy, recruiter-friendly.
- Rauno Freiberg's site — motion craft, no filler.
- Pieter Levels — just enough personality.
- Linear's /changelog — how to show recent work without a news feed.

## 6. Tech Stack — Decisions & Rationale
Chosen for three reasons: fits the UI ambition, itself signals technical depth to recruiters, and has the best-in-class AI codegen support so Claude Code ships clean code.
| Layer | Pick | Version (Apr 2026) | Why |
| --- | --- | --- | --- |
| Framework | Next.js 15 (App Router) | 15.x | React Server Components, best Claude Code support, clean image + font handling |
| UI library | React 19 | 19.x | Actions, use() for data, stable by now |
| Styling | Tailwind CSS v4 | 4.x | Oxide engine, zero-config, faster builds |
| Components | shadcn/ui + Aceternity UI + Magic UI | latest | Base + magical effects + 150+ animated components |
| Motion | Framer Motion + GSAP (ScrollTrigger) | FM 11 + GSAP 3 | Framer for UI, GSAP for scroll choreography |
| 3D / WebGL | React Three Fiber + drei + Spline (fallback) | R3F 9 + drei 10 | R3F for the hero; Spline if you want to author visually |
| Icons | Lucide React | latest | Clean, free, exhaustive |
| Forms | React Hook Form + Zod | latest | Client validation + schema-share with API route |
| Email sending | Resend | latest | Best DX, 3k free emails/month |
| Analytics | Vercel Analytics + Plausible | latest | Free web vitals + privacy-respecting visit data |
| CMS (writing) | MDX via Contentlayer 2 OR file-based | latest | Keep posts in Git, no external CMS |
| Search (optional) | cmdk (command palette) | latest | Keyboard-first project search — keeps the dev aesthetic |
| Deploy | Cloudflare Pages (primary) or Vercel | N/A | See §13 |
| DNS | Cloudflare | N/A | Free tier covers everything you need |

**Why not Astro?**
Astro beats Next.js for pure content sites — faster builds, less JS shipped. But this site is **interactive-first**: WebGL hero, scroll choreography, shared-element page transitions. Next.js + React gives you the cleanest path. Keep Astro in reserve if the site drifts toward a blog-heavy direction in v2.
**Component library layering**
- **shadcn/ui — **the base. Dialogs, tooltips, dropdowns, buttons. Own the code (copy-paste, not a dependency).
- **Aceternity UI — **marketing-page magic. Spotlight, 3D card, typewriter, bento presets.
- **Magic UI — **150+ animated primitives. Shimmer buttons, marquees, meteor backgrounds.
- **Custom — **the WebGL hero. Do not pull this from a template. This is the one thing that should feel hand-built.
**Package install list**
```
Install
pnpm create next-app@latest gautam-site --typescript --tailwind --app --eslint
cd gautam-site

pnpm add framer-motion gsap
pnpm add three @react-three/fiber @react-three/drei
pnpm add lucide-react react-hook-form zod @hookform/resolvers
pnpm add cmdk clsx tailwind-merge
pnpm add resend
pnpm add -D @tailwindcss/typography

# shadcn/ui
pnpm dlx shadcn@latest init
pnpm dlx shadcn@latest add button card dialog input textarea sheet

# Optional
pnpm add @vercel/analytics
pnpm add contentlayer2 next-contentlayer2   # only if /writing ships
```

## 7. Component Inventory
Components Claude Code should generate. Grouped so you can paste one group at a time.
**Layout & primitives**
- **<BentoGrid> — **the 12-col responsive grid with gaps.
- <BentoTile variant="sm|md|lg|xl"> — tile wrapper with border, hover state, ring-on-focus.
- **<Section> — **max-w-7xl mx-auto wrapper with vertical rhythm.
- **<ThemeToggle> — **dark/light switch, persists to localStorage (OK in Next.js, not in Claude artifacts).
**Hero**
- **<HeroTile> — **headline + CTAs, WebGL background slot.
- **<ParticleField> — **R3F particle system, cursor-reactive. Cap at 60 FPS, degrade on prefers-reduced-motion.
- **<SplitTextHeadline> — **GSAP SplitText word-by-word reveal.
**Tiles**
- **<NowTile> — **reads /content/now.md and renders.
- **<GithubTile> — **fetches latest commit + contribution count from GitHub API (server-side, cached 1h).
- **<StackTile> — **grid of icons with hover tooltips.
- **<LocationTile> — **time ticker, timezone string.
- **<ProjectCard> — **thumbnail + title + role + tags. Click → navigate with shared-element transition.
- **<ExperienceTimeline> — **horizontal scroll inside a tile.
- **<ContactForm> — **form with inline validation, posts to /api/contact.
- **<ResumeTile> — **download button, tracks click in analytics.
**Case study page**
- **<CaseStudyHeader> — **title, role, period, tech tags, primary image.
- **<CaseStudyBody> — **long-form MDX with typography plugin.
- **<MetricStrip> — **3-column number + label ("5k+ users", "75K+ txns/day", etc.).
- **<ArchitectureDiagram> — **SVG or image with caption.
- **<CaseStudyNav> — **prev/next project.
**Utility**
- **<CommandPalette> — **⌘K opens, searches projects + pages. cmdk under the hood.
- **<PageTransition> — **wraps app with Framer Motion AnimatePresence.
- **<SEOHead> — **sets title, description, OG image per route.

## 8. Content Pipeline
Content lives in Git, not a CMS. Changes deploy via push.
**File layout**
```
content/ structure
content/
  now.md              # "Now" tile — single markdown file
  case-studies/
    autonomous-revenue-engine.mdx
    ai-best-buddy.mdx
    avyann.mdx
    turing-llm-platform.mdx
  writing/             # (optional, v2)
    *.mdx

public/
  resume.pdf           # one-click download
  og/                  # per-page OG images
  projects/            # case study hero images
```

**Case study MDX frontmatter**
```
Frontmatter schema
---
title: "Autonomous Revenue Engine"
slug: "autonomous-revenue-engine"
role: "Lead Engineer"
period: "2024 — 2025"
stack: ["Python", "Twilio", "N8N", "Retell AI", "AWS"]
summary: "AI voice sales agent. End-to-end pipeline, production deploy."
cover: "/projects/are-cover.png"
metrics:
  - label: "Calls/day"
    value: "Confidential"
  - label: "Avg turn latency"
    value: "<600ms"
  - label: "Languages"
    value: "4"
---
```

**Writing voice (on-site copy)**
All copy — hero, tile blurbs, case study bodies — must pass brand-voice.md's checklist before it ships. When Claude Code generates copy, run it past the "AI phrases to avoid" list. If it contains "leverage", "seamless", "unlock", "streamline" — rewrite.

## 9. SEO, Meta, Schema
**Head requirements per page**
- <title> — unique, ≤60 chars, pattern: "Gautam Joshi — [page role]".
- <meta name="description"> — unique, 140–160 chars.
- OG image — 1200×630, per route. Auto-generated via Next.js ImageResponse for case studies.
- Canonical URL.
- robots — index, follow.
**JSON-LD schema**
Ship Person schema on the home page. Ship CreativeWork schema on each case study.
```
Person JSON-LD (sample)
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Gautam Joshi",
  "jobTitle": "Senior AI Full-Stack Engineer",
  "url": "https://gautamjoshi.dev",
  "sameAs": [
    "https://github.com/darksteal9796",
    "https://linkedin.com/in/gautam-joshi-..."
  ],
  "knowsAbout": ["LLMs", "RAG", "Python", "React", "AWS"]
}
```

**Sitemap and robots**
- next-sitemap generates /sitemap.xml on build.
- /robots.txt allows all, points to sitemap.
- Submit to Google Search Console + Bing Webmaster on day one.
**Keywords to target (soft — don't over-optimise)**
- "AI Full-Stack Engineer Pune"
- "LLM fine-tuning engineer India"
- "RAG developer"
- "Gautam Joshi" (branded)

## 10. Analytics & Measurement
**What to track**
| Event | When | Why |
| --- | --- | --- |
| page_view | Every route change | Funnel baseline |
| case_study_open | Click from bento → case study | Which projects convert |
| resume_download | Click download button | Primary conversion event |
| contact_submit | Form submit success | Primary conversion event |
| scroll_depth_75 | 75% of case study scrolled | Actual engagement, not bounce |
| theme_toggle | Dark/light switched | Is the toggle useful |
| command_palette_open | ⌘K pressed | Do power users find it |

**Tools**
- **Vercel Analytics — **free, Web Vitals, built-in. Even if hosting on Cloudflare, ship Vercel Analytics SDK (it's host-agnostic).
- Plausible or Umami (self-hosted) — privacy-respecting visit counts. Pick one.
- PostHog (optional v2) — if funnels get complicated.

## 11. Performance Budget
> Targets (mobile 4G):  LCP ≤ 1.5s · INP ≤ 150ms · CLS ≤ 0.05 · Total JS ≤ 180KB gzipped on homepage (excluding R3F chunk, lazy-loaded).

**How to hit them**
- R3F + three.js loaded dynamically, only on desktop, only after idle. Mobile gets a static hero background.
- Images via next/image with AVIF + WebP. No raw PNG in public/.
- Fonts self-hosted, preload only the weights used on first paint. Geist Sans 400 + 600 are enough for above-the-fold.
- No third-party tracking scripts synchronously. All analytics deferred.
- Case study MDX — statically rendered at build time. Zero runtime cost.
**Measurement**
- Lighthouse CI in GitHub Actions — fails PR if score drops below 95 on Performance.
- Vercel Analytics Web Vitals — weekly check.
- PageSpeed Insights before any merge to main.

## 12. Accessibility
- **Target — **WCAG 2.2 AA.
- **Contrast — **all text passes AA. Primary accent violet on dark is above 7:1. Muted text passes 4.5:1.
- **Motion — **all scroll/hover animations respect prefers-reduced-motion. The WebGL hero degrades to a static gradient on reduced-motion.
- **Keyboard — **every interactive element reachable via Tab. Focus ring visible (2px violet outline). Command palette ⌘K works without a pointer.
- **Screen readers — **all images have meaningful alt text. The bento grid announces section headings in reading order. WebGL canvas has aria-hidden.
- **Forms — **visible labels, inline errors, form-level summary on submit fail.
- Tested with — axe DevTools on every page before launch. NVDA walkthrough of home + one case study.

## 13. Deployment, Domain, DNS, CI/CD
**Host — Cloudflare Pages (recommended) vs Vercel**
| Factor | Cloudflare Pages | Vercel (Hobby) |
| --- | --- | --- |
| Bandwidth | Unlimited | 100 GB/month |
| Build minutes | 500/month | 6,000/month |
| Edge locations | 300+ | ~100 |
| Cold start | Near zero (Workers) | 50ms — 2s |
| Next.js support | Good (via @cloudflare/next-on-pages) | Best in class |
| DX | Good | Excellent |
| Cost at scale | Cheapest | Scales fast |

> Recommendation:  Start on Vercel Hobby for week 1 — fastest path to a live URL, best Next.js DX. Migrate to Cloudflare Pages once the site is stable and you want unlimited bandwidth. Both paths are documented below.

**Domain**
- **Primary — **gautamjoshi.dev (available, .dev forces HTTPS, signals technical).
- Backup options — gautamjoshi.com, gautam.build, joshi.ai.
- **Registrar — **Cloudflare Registrar. At-cost pricing, no renewal spikes, free DNS.
**DNS config**
```
DNS records
# On Cloudflare (DNS)
A     @     → Vercel IP (or CF Pages)
CNAME www   → gautamjoshi.dev
CNAME _vercel → cname.vercel-dns.com   # if on Vercel
MX    @     → (optional: Cloudflare Email Routing for gautam@gautamjoshi.dev)
TXT   @     → SPF, DMARC if using email

# SSL: Full (strict)
# Always Use HTTPS: ON
# Auto Minify: OFF (Next.js handles this)
```

**CI/CD**
- GitHub repo: github.com/darksteal9796/gautamjoshi-site (private or public — public is a signal).
- Branch strategy: main = production, preview on every PR.
- GitHub Actions: Lint + typecheck + build + Lighthouse CI on every PR.
- Preview deployments on every push.
- Production deploy on merge to main, automatic.
**Secrets management**
- RESEND_API_KEY — for contact form.
- GITHUB_TOKEN — for the GithubTile (read-only, public_repo scope).
- PLAUSIBLE_DOMAIN — if Plausible-hosted.
- All set via Vercel/Cloudflare dashboard, never committed.

## 14. Security & Hardening
- **CSP — **strict Content-Security-Policy. Script-src self + analytics domain. No inline scripts.
- **HSTS — **1-year max-age, includeSubDomains, preload.
- **Contact form — **rate limit 5/hour per IP. Verify email format server-side. Honeypot field to kill bots.
- **Dependabot — **on, weekly. Auto-PR for patch updates.
- **Secrets — **never in repo. Scanning via GitHub secret scanning.

## 15. MCPs, Plugins & External Integrations
MCPs aren't a hard requirement for the site to run — they're useful during the build and for post-launch content flow.
**MCPs worth wiring to Claude Code during build**
| MCP / Connector | Use | Needed? |
| --- | --- | --- |
| GitHub (native gh CLI in Claude Code) | Repo scaffolding, PR creation, commits | Yes |
| Vercel / Cloudflare deploy | Via CLI, not MCP — no setup needed | N/A |
| Google Calendar MCP | If you add a "book a call" tile later | Optional |
| Klaviyo MCP | Only if newsletter ships in v2 | Skip v1 |
| AirOps MCP | AI search / AEO content generation for /writing | Optional v2 |

**Claude Code plugins to enable before starting**
- shadcn/ui CLI — not a plugin, but run shadcn init before Claude Code touches the repo so primitives are in place.
- Any Next.js-specific plugin in the marketplace — check for one that scaffolds App Router conventions.
- cowork-plugin-management: create-cowork-plugin — if Gautam wants to package this spec into a reusable plugin after build.
**Third-party services to sign up for**
| Service | Purpose | Free tier? |
| --- | --- | --- |
| Vercel or Cloudflare | Hosting | Yes |
| Cloudflare Registrar | Domain | At-cost (~$10/yr for .dev) |
| Resend | Contact form email | Yes — 3,000 emails/mo |
| Plausible or Umami | Analytics | Plausible paid, Umami self-host free |
| GitHub | Code + Actions | Yes |
| Google Search Console | Indexing | Yes |

## 16. Build Roadmap
**Week 1 — Foundations**
- Init repo, Next.js 15, Tailwind 4, shadcn init, deploy "hello world" to Vercel on the real domain.
- Ship the bento grid skeleton with static content. No animations yet.
- Wire up content/ directory structure + MDX rendering for case studies.
**Week 2 — Content + core tiles**
- Write and ship all case study MDX files.
- Implement Hero, Now, Stack, Experience, Contact tiles.
- Resume download working.
**Week 3 — Motion + polish**
- WebGL hero (R3F particle field).
- GSAP scroll choreography for experience timeline.
- Framer Motion page transitions for case studies.
- Command palette (⌘K).
**Week 4 — SEO, analytics, launch**
- Meta tags, OG images, JSON-LD, sitemap.
- Analytics wired in.
- Lighthouse ≥ 95 across all categories.
- Accessibility audit, keyboard run-through.
- Launch post on LinkedIn + Hacker News "Show HN".
**v2 ideas (post-launch)**
- /writing blog with MDX.
- A "ship log" feed — auto-generated from GitHub activity.
- Per-recruiter personalised landing (?company=X → tailored hero).
- A small interactive piece — e.g. a RAG demo that answers "what has Gautam worked on?" using his own content as corpus. On-brand and a talking point.

## 17. Prompt Pack for Claude Code
These are the prompts to paste into Claude Code, in order. Each one builds on the last. Keep the spec doc open alongside — when Claude Code asks for a reference, point it here.
**P0 — Project init**
```
P0
Initialise a new Next.js 15 project with TypeScript, App Router, Tailwind CSS v4, and ESLint. Use pnpm. Install: framer-motion, gsap, three, @react-three/fiber, @react-three/drei, lucide-react, react-hook-form, zod, @hookform/resolvers, cmdk, clsx, tailwind-merge, resend. Initialise shadcn/ui and add: button, card, dialog, input, textarea, sheet, tooltip, command. Set up the following folder structure: app/, components/ui/, components/tiles/, components/sections/, content/case-studies/, content/now.md, lib/, public/og/, public/projects/. Create a .env.example with RESEND_API_KEY, GITHUB_TOKEN, NEXT_PUBLIC_SITE_URL. Commit as "chore: scaffold".
```

**P1 — Design system tokens**
```
P1
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

**P2 — Bento grid primitives**
```
P2
Create components/ui/BentoGrid.tsx and BentoTile.tsx.
BentoGrid: CSS grid, 12 cols desktop, 6 cols tablet, 1 col mobile. Gap 32/28/24. Max-width 1280, mx-auto, px-6.
BentoTile: props = { size: "sm" | "md" | "lg" | "xl", className?, children }. Size maps to col-span (sm=3, md=6, lg=8, xl=12). Tile has rounded-2xl, border, bg-surface, p-6, hover:ring-2 hover:ring-accent/30 transition.
Include a demo page at /app/design/page.tsx showing all four sizes in a 2-row grid.
```

**P3 — Hero + WebGL particle field**
```
P3
Build components/tiles/HeroTile.tsx.
Headline: "Senior AI Full-Stack Engineer. I ship LLM systems that run in production."
Sub: "RAG pipelines, fine-tuned models, voice agents. Four years of production code. Currently building the AI training platform at Turing."
CTA Primary: "Read the case studies →" (scrolls to projects section)
CTA Secondary: "Download resume ↓" (links to /resume.pdf)

Behind the text, render a WebGL particle field via React Three Fiber (components/three/ParticleField.tsx). 2,000 particles, violet accent, subtle parallax to cursor. Dynamically import R3F on client only, wrap in Suspense, fall back to a CSS radial gradient. On prefers-reduced-motion, do not load R3F — render only the gradient.
```

**P4 — Static tiles (Now, Stack, Location, Resume)**
```
P4
Build these tiles as simple server components where possible:
- NowTile: reads content/now.md, renders as prose. Show a pulsing green dot next to the heading.
- StackTile: grid of lucide icons for: Python, React, AWS, LangChain, Postgres, Twilio, N8N, GSAP. Each icon has a tooltip with one-line description.
- LocationTile: "Pune, India · IST". Client component that ticks the current time every second in HH:mm.
- ResumeTile: big download button that links to /resume.pdf and fires a "resume_download" analytics event on click.

Place the resume PDF at public/resume.pdf (placeholder for now — Gautam will drop it in).
```

**P5 — GitHub tile (server, cached)**
```
P5
Build components/tiles/GithubTile.tsx as a React Server Component. Fetch from the GitHub REST API:
- Latest public commit from the user darksteal9796 (iterate across repos, pick most recent).
- Contribution count over the last 52 weeks (via GraphQL).
Cache with Next.js fetch + revalidate: 3600.
Render a 7x7 contribution grid (like GitHub's), the number of contributions, the latest commit message + repo + timestamp. Use GITHUB_TOKEN from env for higher rate limits.
```

**P6 — Experience timeline (GSAP ScrollTrigger)**
```
P6
Build components/tiles/ExperienceTile.tsx. Inside the tile, render a horizontal timeline with three entries: Turing (11/2024 — present), Newspace (01/2024 — 11/2024), TCS / Vanguard + Credit Suisse (09/2021 — 01/2024). Each entry has: period, role, company, 1-sentence headline.

Use GSAP ScrollTrigger to pin the tile while scrolling and advance the timeline horizontally as the user scrolls. On mobile, fall back to a vertical stack (no pinning).
Install the GSAP no-auth package (gsap 3.x). Register ScrollTrigger in a useEffect.
```

**P7 — Project cards + case study pages**
```
P7
Set up MDX parsing with contentlayer2 (or next-mdx-remote if contentlayer2 has issues with Next 15 — check the current compatibility).

Build:
- ProjectCard component — renders a case study's frontmatter as a tile (cover image, title, role, period, tags).
- app/work/[slug]/page.tsx — reads the MDX, renders CaseStudyHeader + CaseStudyBody + CaseStudyNav.
- Shared-element transition: clicking a ProjectCard should morph into the case study hero. Use Framer Motion layoutId on the image + title.

Seed content/case-studies/ with four files: autonomous-revenue-engine.mdx, ai-best-buddy.mdx, avyann.mdx, turing-llm-platform.mdx. I will fill the bodies — use the frontmatter schema from the spec and a placeholder paragraph for each body.
```

**P8 — Contact form**
```
P8
Build components/tiles/ContactTile.tsx with a react-hook-form + zod form: name, email, message (single textarea). Validate client-side. On submit, POST to /api/contact.

Build /app/api/contact/route.ts — validates with the same zod schema, rate-limits to 5 req/hour per IP (use a simple in-memory map for v1, Upstash Redis if migrating to Vercel), sends via Resend to gautamjoshi.dev@gmail.com. Return 200 + { ok: true } on success, 4xx on validation / rate-limit.

Show success state inline: form collapses into a "Thanks — I'll reply within 24h." message.
```

**P9 — Command palette (⌘K)**
```
P9
Build components/CommandPalette.tsx using cmdk. Open on ⌘K / Ctrl+K. Items: each case study, each section of the home page (scroll to Hero, Projects, Stack, Contact), theme toggle, download resume.

Style it to match the dark-first theme. Keyboard arrows navigate, Enter activates. Focus-trap while open.
```

**P10 — SEO, sitemap, OG images**
```
P10
Set up:
- Per-route metadata via Next.js Metadata API (title, description, OG, Twitter card).
- Dynamic OG image generation for each case study using Next.js ImageResponse at app/work/[slug]/opengraph-image.tsx.
- next-sitemap config → /sitemap.xml at build.
- /robots.txt allowing all, pointing to sitemap.
- Person JSON-LD on /, CreativeWork JSON-LD on each case study.
- Canonical URLs everywhere.
```

**P11 — Analytics**
```
P11
Install @vercel/analytics and Plausible (script tag, not the SDK).
Add Analytics component to app/layout.tsx.
Create lib/track.ts exposing: track(event: string, props?) — fires to both Vercel and Plausible.
Fire these events: case_study_open, resume_download, contact_submit, scroll_depth_75, theme_toggle, command_palette_open.
Test in production — events must appear in both dashboards.
```

**P12 — Performance pass**
```
P12
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

**P13 — Accessibility pass**
```
P13
Run axe DevTools on / and all case study pages. Fix every error.

Manual checks:
- Keyboard: Tab through the whole home page. Every interactive tile is focusable, focus ring visible.
- Screen reader: NVDA/VoiceOver walkthrough of / and one case study. Section headings announced, images have alt, canvas has aria-hidden.
- Reduced motion: toggle OS setting, reload. WebGL hero is replaced with a static gradient, scroll animations are disabled.
- Colour contrast: run the palette through a contrast checker. All text passes AA.

Add a simple "Skip to content" link as the first focusable element.
```

**P14 — Deploy to production**
```
P14
Deploy to Vercel Hobby first for fastest path to a live URL:
1. `vercel` from the project root.
2. Point gautamjoshi.dev at Vercel via DNS (Cloudflare Registrar → Vercel CNAME).
3. Configure env vars in Vercel dashboard.
4. Confirm Lighthouse on the live URL is still ≥ 95.

Submit to Google Search Console + Bing Webmaster Tools.
Post the link on LinkedIn.
```

**P15 — Optional: migrate to Cloudflare Pages**
```
P15
Only if you need unlimited bandwidth or want the extra edge locations.
1. `pnpm add -D @cloudflare/next-on-pages vercel`
2. Configure wrangler.toml.
3. Push to Cloudflare Pages via `npx @cloudflare/next-on-pages`.
4. Test all dynamic routes on the Cloudflare Pages URL.
5. Move DNS CNAME from Vercel to Cloudflare Pages.
6. Keep Vercel as a fallback preview env for 2 weeks.
```

## 18. Post-Launch Checklist
- Live on custom domain with HTTPS.
- All Lighthouse scores ≥ 95.
- Google Search Console + Bing Webmaster verified.
- Sitemap submitted.
- Resume PDF is the current one. Download works.
- Contact form tested end-to-end (real email delivered).
- All case studies have real copy (no Lorem Ipsum).
- All social links work and go to the right profiles.
- OG images preview correctly on Twitter, LinkedIn, Slack.
- 404 page is custom.
- Dark + light mode both look right.
- Tested on: latest Chrome, Safari, Firefox, mobile Safari, Android Chrome.
- Accessibility: axe clean, keyboard run clean.
- Analytics events firing in production.
- LinkedIn post scheduled.

## 19. Appendix — Stack Versions & Reference Links
| Package | Version | Docs |
| --- | --- | --- |
| next | 15.x | nextjs.org/docs |
| react | 19.x | react.dev |
| tailwindcss | 4.x | tailwindcss.com/docs |
| shadcn/ui | latest | ui.shadcn.com |
| aceternity-ui | N/A (copy-paste) | ui.aceternity.com |
| magicui | N/A (copy-paste) | magicui.design |
| framer-motion | 11.x | motion.dev (now "Motion") |
| gsap | 3.x | gsap.com (all plugins free since 2024) |
| three | 0.16x | threejs.org |
| @react-three/fiber | 9.x | r3f.docs.pmnd.rs |
| @react-three/drei | 10.x | drei.docs.pmnd.rs |
| cmdk | latest | cmdk.paco.me |
| resend | latest | resend.com |
| contentlayer2 | latest | contentlayer.dev |

**Key decisions — recap**
- Framework: Next.js 15 (not Astro) — site is interactive-first.
- Host: Vercel first for speed, Cloudflare Pages later for bandwidth.
- Domain: gautamjoshi.dev via Cloudflare Registrar.
- Visual: dark-first bento with one WebGL hero and one pinned-scroll timeline.
- Copy: follows brand-voice.md — every section.
- Launch target: 4 weeks from kickoff.
**What to change if the audience shifts**
If down the line you re-target this site to clients (not recruiters), the biggest changes are: swap the hero headline to a services pitch, surface Calendly / book-a-call in the hero, add a "Services" section with packages, and de-emphasise the experience timeline. The bento and visual system stay the same.
Spec v1.0 — 17 April 2026 — generated by Claude from Gautam's context files + research. Update log: see projects/personal-website-spec/log.md.