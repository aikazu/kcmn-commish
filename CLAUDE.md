# CLAUDE.md

Project-specific context for kcmn-commish (Iqbal Attila commission services landing).

## Stack

- **Next.js 15.5** (App Router, RSC) + **React 19** + **TypeScript 5.9** strict
- **Tailwind 4.3** (PostCSS plugin, no `tailwind.config.ts` content beyond paths)
- **Motion 12.40** (animations) + **Lenis 1.3** (smooth scroll)
- **Embla Carousel** + **lucide-react** (icons)
- **Zod 4.4** (validation)
- Package manager: **bun** (`bun.lock` text v1.2+ IS committed — see `.gitignore`)
- Path alias: `@/*` → repo root

## Commands

```bash
bun run dev         # next dev
bun run build       # next build
bun run start       # next start (prod)
bun run lint        # next lint
bun run test        # vitest run (unit + component)
bun run test:watch  # vitest watch
bun run test:e2e    # playwright test (chromium, auto-starts dev)
bun run lhci        # lighthouse CI (perf≥0.9, a11y≥0.95, bp/seo≥0.9)
```

## Architecture

```
app/                  # Next.js App Router — layout, page, icons, og-image
components/
  data/               # static data + content
  motion/             # motion primitives (choreographed reveals)
  sections/           # page sections (hero, rate-card, etc.)
  ui/                 # primitives (button, badge, card, etc.)
lib/
  cn.ts               # clsx + tailwind-merge
  whatsapp.ts         # WA link builder
tests/
  unit/  component/  e2e/  setup.ts
docs/
  brand-system.md     # ⭐ Obsidian Gold source of truth
  superpowers/        # plans + specs (gitignored brainstorms not here)
lighthouserc.json     # LHCI thresholds
playwright.config.ts  # auto-starts `bun run dev`
```

## Brand (Obsidian Gold)

`docs/brand-system.md` = **source of truth** (colors, type, spacing, motion, sigil).
- Canvas `#0A0A0A`, gold `#C9A352` / bright `#E0BF6B` / deep `#8A6F2D`, text `#F0EDE7`
- Type: Fraunces (display), Inter (body), JetBrains Mono (label/code)
- Signature: 2px gold top-line per container, 32px gold rule + mono uppercase eyebrow per section
- Tagline: **`Secure by design. Delivered with intent.`** (presales/client context)
- Honor `prefers-reduced-motion` always

## Gotchas

- `bun.lock` is text format (v1.2+) — committed. `bun.lockb` is gitignored.
- `.claude/`, `.playwright*`, `.superpowers/brainstorm`, `playwright-report`, `test-results`, `*.png`, `dev.log` are gitignored.
- Next 15 + React 19: `params`/`searchParams` are **Promises** — `await` in server components.
- Security headers hardcoded in `next.config.ts` (X-Frame-Options DENY, no sniff, etc.).
- Tailwind 4: config is mostly CSS-driven (`app/globals.css`); `tailwind.config.ts` only declares content paths.
- Playwright auto-starts `bun run dev` on `:3000` with 120s timeout.
- Vitest uses `happy-dom` + `@testing-library/jest-dom`; setup at `tests/setup.ts`.
- LHCI runs against `bun run start` (prod build, not dev).

## Workflow

- Brand token changes → edit `docs/brand-system.md` first, then sync mirrors.
- New section → `components/sections/<name>.tsx` + data in `components/data/`.
- New motion primitive → `components/motion/`; respect reduced-motion.
- Commit format: `conventional commits` (`feat:`, `fix:`, `docs:`, `chore:`).
- **Never push/PR without confirmation.** Always commit after meaningful change.
- TDD when implementing/refactoring (Red-Green).
- For UI/UX work → use `frontend-design` skill (Opus). For copy → `copywriting` skill.
- For brand application → `ia-branding` skill.

## Reference

- `docs/brand-system.md` — Obsidian Gold v1.0.0 (stable, 2026-06-02)
- `docs/superpowers/specs/2026-06-03-landing-rate-card-design.md` — current landing spec
- `docs/superpowers/plans/2026-06-03-landing-rate-card.md` — current implementation plan
