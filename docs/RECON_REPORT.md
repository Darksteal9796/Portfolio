# Recon — Portfolio  (date: 2026-04-18)

## Snapshot
- Language: **not yet chosen** — no source files present
- Framework: **not yet chosen** — no manifest (no package.json, pyproject.toml, Cargo.toml, go.mod)
- Package manager: **not yet chosen**
- Test runner: **not yet chosen**
- Deployment: **not yet chosen**
- Git: not initialized (no `.git/` in repo root)

## Architecture
There is no architecture yet. The repository is a fresh scaffold: one project [CLAUDE.md](CLAUDE.md) (still the unfilled template with `<project-name>` placeholders) and a [docs/](docs/) directory holding empty workflow scaffolding for the `/build` → `/change` → `/save-state` loop. No `src/`, `app/`, `public/`, `tests/`, or config files exist. Every architectural decision is still open.

## Folder map
```
Portfolio/
├── CLAUDE.md                         # Project instructions — still the unfilled template
└── docs/
    ├── BUILD_STATE.md                # /save-state snapshots (empty header only)
    ├── CHANGE_IMPLEMENTATION_PLAN.md # /build output / /change input (template only)
    ├── SESSION_TRACKER.md            # Active sprint + chunk ledger (template only)
    ├── audits/                       # /audit output (.gitkeep only)
    ├── progress/
    │   └── claude-progress.txt       # Append-only action log (header only)
    └── sprints/                      # Per-sprint artifacts (.gitkeep only)
```

## Conventions
- **Naming:** not established — no code to sample
- **Folder layout:** not established — only the `docs/` workflow folders exist
- **Tests:** not established
- **Errors:** not established
- **Logging:** [docs/progress/claude-progress.txt](docs/progress/claude-progress.txt) is the one convention in force — timestamped `YYYY-MM-DD HH:MM | <action>` lines, append-only
- **Workflow:** `/build` writes chunks into [CHANGE_IMPLEMENTATION_PLAN.md](docs/CHANGE_IMPLEMENTATION_PLAN.md), `/change` executes them, `/save-state` snapshots into [BUILD_STATE.md](docs/BUILD_STATE.md), `/resume` reads from it. [SESSION_TRACKER.md](docs/SESSION_TRACKER.md) is the live ledger.

## Risk zones
- **[CLAUDE.md](CLAUDE.md) is the unfilled template** — `<project-name>`, `<1–2 sentences>`, stack, build commands, and critical rules are all placeholders. Every downstream command (`/build`, `/change`, `/secure`, `/ai-review`) will operate on false assumptions until this is filled in.
- **No `.gitignore`, no git init.** First commit will either capture unwanted files or need `git init` + ignore rules prepared up front.
- **No spec / brief.** [CLAUDE.md](CLAUDE.md) points at `docs/spec.docx` and `docs/brief.md`, neither of which exist.
- **Empty `audits/` and `sprints/` dirs held open by `.gitkeep`** — harmless, but worth collapsing if the workflow doesn't need them.

## Hot path
No hot path yet — no runtime code. Once the stack is chosen, the hot path for a portfolio site is almost always the home-page render (SSR/SSG) plus whatever dynamic data (blog index, project list) gets fetched at build or request time. Flag this again after the first real commit.

## Questions for Gautam
1. **Stack?** The name `Portfolio` and your global defaults suggest **Next.js 15 + React 19 + TS + Tailwind v4 + shadcn/ui** on **Vercel or Cloudflare Pages**. Confirm, or pick differently (Astro for a content-heavy portfolio is a sensible alternative).
2. **Audience & status?** Personal portfolio → public, recruiter-facing? Or a consulting landing page? Determines copy, SEO, analytics, and whether we need forms/CMS.
3. **Content source?** Markdown files in-repo, MDX, a headless CMS (Sanity, Contentful), or Notion? Drives the whole data layer.
4. **Dynamic pieces?** Blog? Project case studies with images? Contact form (needs backend + anti-spam)? Analytics (Plausible, PostHog, GA4)?
5. **Domain & deploy target?** Already have a domain? Deploying to Vercel, Cloudflare Pages, or the Azure VM you already run things on?
6. **Git state.** Want me to `git init` and set up a `.gitignore` as the first chunk, or is this repo going to be cloned from GitHub?
7. **Should I fill in [CLAUDE.md](CLAUDE.md) now** based on your answers, or wait until after `/build` produces the first sprint plan?
