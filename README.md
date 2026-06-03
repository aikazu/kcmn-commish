<div align="center">

# `kcmn-commish`

**A commission landing page for [Iqbal Attila](https://kcmon.id) — built in the open, fork-friendly, brand-forward.**

> _Secure by design. Shipped with intent._

![Next.js](https://img.shields.io/badge/Next.js-15.5-000?style=for-the-badge&logo=next.js&logoColor=C9A352)
![React](https://img.shields.io/badge/React-19.2-000?style=for-the-badge&logo=react&logoColor=C9A352)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-000?style=for-the-badge&logo=typescript&logoColor=C9A352)
![Tailwind](https://img.shields.io/badge/Tailwind-4.3-000?style=for-the-badge&logo=tailwindcss&logoColor=C9A352)
![Motion](https://img.shields.io/badge/Motion-12.40-000?style=for-the-badge&logo=framer&logoColor=C9A352)
![Bun](https://img.shields.io/badge/Bun-latest-000?style=for-the-badge&logo=bun&logoColor=C9A352)

</div>

---

## What is this?

A production-grade landing page that markets Iqbal's web development commission services. It's the public face of the freelance work — hero, services, portfolio, rate card, testimonials, FAQ, CTA — designed as a single scrollable experience on the **Obsidian Gold** brand system.

**This repo is intentionally free to fork and edit.** Want to use it as a template for your own commission page? Go for it. The brand tokens, sections, and animations are all here — swap the copy, change the colors, ship it.

> The Obsidian Gold aesthetic is opinionated but documented. See [`docs/brand-system.md`](docs/brand-system.md) for the full token spec, signature details, and discipline rules.

---

## How the flow works

The page is a **top-to-bottom scroll** composed of section blocks. Each section is self-contained, reads static data from `components/data/`, and renders through motion primitives that respect `prefers-reduced-motion`.

```
┌──────────────────────────────────────────────────────────────┐
│  Nav (sticky, scroll-progress bar)                           │
├──────────────────────────────────────────────────────────────┤
│  Hero               → headline + spec-sheet sidebar          │
│  Services           → 4 service cards                        │
│  Stats              → animated count-up (40+ / 99% / <24h)   │
│  Portfolio          → bento grid + detail modal              │
│  LiveDemo           → interactive product demo               │
│  Process            → 4-phase timeline                       │
│  Testimonials       → Embla carousel                         │
│  RateCard           → 4 pricing tiers (Basic → Custom)       │
│  FAQ                → accordion                               │
│  CTA                → closing pitch + WhatsApp button        │
├──────────────────────────────────────────────────────────────┤
│  Footer (3-col: brand / nav / social)                        │
└──────────────────────────────────────────────────────────────┘
```

### Request flow

1. **User lands** → Lenis smooth scroll initializes, Atmosphere particle layer mounts
2. **Hero animates in** → headline words stagger with `rotateX` perspective, spec-sheet sidebar slides from right
3. **User scrolls** → `useScroll` tracks progress, Nav's gold hairline fill tracks the scroll position
4. **Each section enters viewport** → `whileInView` triggers fade-up with 0.1s stagger per child
5. **User clicks CTA** → `buildWhatsAppLink()` constructs a `wa.me` deep link with a pre-filled message
6. **All animations gated** by `useReducedMotion()` — falls back to static rendering on accessibility preference

### Data flow

```
components/data/*.ts        ← static content (rateCard, portfolio, testimonials, contact)
        ↓
components/sections/*.tsx   ← imports data + composes UI + applies motion
        ↓
app/page.tsx                ← assembles sections in order
        ↓
app/layout.tsx              ← fonts, Atmosphere, SmoothScroll, JSON-LD
```

No API routes, no server actions, no database. **Everything is static and content-driven.** Change a price, edit a project, add a testimonial — all in `components/data/`.

---

## Stack

| Layer        | Tool                                         | Why                                                  |
| ------------ | -------------------------------------------- | ---------------------------------------------------- |
| Framework    | **Next.js 15.5** (App Router, RSC)           | Static-first, edge-ready, image optimization         |
| UI runtime   | **React 19.2**                               | Server Components by default, action APIs available  |
| Language     | **TypeScript 5.9** (strict)                  | No `any`, no escape hatches                          |
| Styling      | **Tailwind 4.3** (PostCSS)                   | CSS-driven config (`@theme` in `globals.css`)        |
| Animations   | **Motion 12.40**                             | Choreographed reveals, magnetic buttons, scroll-tied |
| Smooth scroll| **Lenis 1.3**                                | Buttery inertia for the section-by-section feel      |
| Carousel     | **Embla Carousel**                           | Lightweight, accessible testimonial slider           |
| Icons        | **lucide-react**                             | Tree-shakable, consistent stroke weight              |
| Validation   | **Zod 4.4**                                  | Schema for any user-facing forms (future)            |
| Package mgr  | **Bun**                                      | Fast install, `bun.lock` (text v1.2+) is committed   |

---

## Quick start

```bash
# 1. Install dependencies
bun install

# 2. Run dev server (http://localhost:3000)
bun run dev

# 3. Build for production
bun run build
bun run start
```

### Available scripts

| Command            | What it does                                              |
| ------------------ | --------------------------------------------------------- |
| `bun run dev`      | Start Next.js dev server with HMR                         |
| `bun run build`    | Production build                                          |
| `bun run start`    | Run the production build                                  |
| `bun run lint`     | Next.js + ESLint                                          |
| `bun run test`     | Vitest unit + component tests                             |
| `bun run test:watch` | Vitest in watch mode                                    |
| `bun run test:e2e` | Playwright (chromium, auto-starts `bun run dev`)          |
| `bun run lhci`     | Lighthouse CI — perf≥0.9, a11y≥0.95, bp/seo≥0.9          |

---

## Architecture

```
app/                     Next.js App Router
  layout.tsx             Fonts (Fraunces / Inter / JetBrains Mono), Atmosphere, JSON-LD
  page.tsx               Section assembly + Service schema.org JSON-LD
  globals.css            @theme tokens, brand utilities, reduced-motion fallback
  icons.tsx              Custom icon exports

components/
  data/                  Static content — single source of truth
    rateCard.ts          4 pricing tiers
    portfolio.ts         Project showcase entries
    testimonials.ts      Client quotes
    contact.ts           Social URLs + email

  motion/                Motion primitives (all respect prefers-reduced-motion)
    Atmosphere.tsx       Particle/glow background layer
    SmoothScroll.tsx     Lenis wrapper
    CountUp.tsx          Number ticker
    Stagger.tsx          Stagger container + item
    Magnetic.tsx         Mouse-magnet effect for buttons
    FadeUp.tsx           Single-element reveal

  sections/              Page sections (one per scroll-block)
    Nav.tsx              Sticky nav + scroll progress
    Hero.tsx             Headline + spec sidebar
    Services.tsx         4-card grid
    Stats.tsx            Count-up metrics
    Portfolio.tsx        Bento grid + modal
    LiveDemo.tsx         Interactive demo
    Process.tsx          4-phase timeline
    Testimonials.tsx     Embla carousel
    RateCard.tsx         4 pricing tiers with WhatsApp CTAs
    FAQ.tsx              Accordion
    CTA.tsx              Closing pitch
    Footer.tsx           3-col footer

  ui/                    Headless primitives
    Button.tsx           Primary/secondary/tertiary variants
    Card.tsx             Surface-1 card with top gold-line
    Badge.tsx            Pill label
    SectionHeading.tsx   Eyebrow + headline + italic accent
    Sigil.tsx            IA monogram SVG

lib/
  cn.ts                  clsx + tailwind-merge
  whatsapp.ts            wa.me link builder (phone + pre-filled message)

tests/
  unit/  component/  e2e/  setup.ts

docs/
  brand-system.md        ⭐ Obsidian Gold source of truth
  superpowers/           Specs + plans (gitignored brainstorms not here)
```

---

## The brand (Obsidian Gold)

Every section carries the same signature:

- **2px gold top-line** on every major container (`.gold-line` / `.card::before`)
- **Eyebrow label** — JetBrains Mono, 11px, uppercase, 0.15em tracking, gold
- **Italic gold accent** — one `<em>` word per headline, weight 300, max one per line
- **Spec-sheet metadata** — mono rows of label+value with 1px borders, used in Hero sidebar + section footers

### Tokens (quick reference)

| Token        | Hex       | Role                          |
| ------------ | --------- | ----------------------------- |
| `canvas`     | `#0A0A0A` | Page background               |
| `surface-1`  | `#121212` | Card / section content        |
| `gold`       | `#C9A352` | Primary accent                |
| `gold-bright`| `#E0BF6B` | Hover / focus                 |
| `gold-deep`  | `#8A6F2D` | Muted gold, light paper mark  |
| `text`       | `#F0EDE7` | Primary text                  |
| `text-muted` | `#A39F97` | Secondary text                |
| `text-dim`   | `#868179` | Tertiary, page numbers        |

Type: **Fraunces** (display, italic accent in gold) · **Inter** (body) · **JetBrains Mono** (labels, metadata, code).

Full spec: [`docs/brand-system.md`](docs/brand-system.md).

---

## Editing the content

Most edits touch **one of two places**:

### 1. Static data (`components/data/`)

```ts
// components/data/rateCard.ts
export const RATE_TIERS: RateTier[] = [
  {
    id: "basic",
    name: "Basic",
    price: "Rp 3.5jt",
    // ...
  },
  // ...
];
```

Change a price, swap a testimonial, add a portfolio project — no JSX touched.

### 2. Section copy (`components/sections/<Name>.tsx`)

Headlines, subheads, and section-specific body copy live inline in each section. Each follows the same pattern:

```tsx
<SectionHeading
  eyebrow="Rate Card"           // mono uppercase gold
  title="Pilih paket yang sesuai" // Fraunces display
  italicWord="sesuai"            // the one gold-accented word
  subtitle="..."                 // Inter muted
  id="rate-card-heading"
/>
```

---

## Forking this for your own use

This repo is **free to fork, edit, and ship as your own**. A few things to know if you do:

1. **Replace the brand identity** — edit `docs/brand-system.md` first, then sync the tokens in `app/globals.css` to match. The Obsidian Gold palette is opinionated, but the system isn't tied to it.
2. **Swap the WhatsApp number** — `lib/whatsapp.ts` has a placeholder `PHONE` constant. Set your own, or remove the WhatsApp CTAs entirely and point to your own contact.
3. **Edit `components/data/`** — replace the rate card tiers, portfolio projects, testimonials, and contact info with yours.
4. **Tweak the section order** in `app/page.tsx` — the sections are independent, you can drop, reorder, or duplicate freely.
5. **Keep the discipline rules** if you want the system to feel coherent: one gold accent per moment, top gold-line only (never bottom), mono labels stay short, no fourth font.

---

## Gotchas

- **`bun.lock` is text format (v1.2+)** and committed. `bun.lockb` is gitignored.
- **Next.js 15 + React 19**: `params` / `searchParams` are **Promises** — `await` in server components.
- **Security headers** are hardcoded in `next.config.ts` (X-Frame-Options DENY, no sniff, Referrer-Policy strict, Permissions-Policy locked down).
- **Tailwind 4** config is CSS-driven via `@theme` in `app/globals.css`; `tailwind.config.ts` only declares content paths.
- **Playwright** auto-starts `bun run dev` on `:3000` with 120s timeout.
- **Vitest** uses `happy-dom` + `@testing-library/jest-dom`; setup at `tests/setup.ts`.
- **Lighthouse CI** runs against `bun run start` (prod build, not dev).
- **Reduced motion** is non-negotiable — every motion component checks `useReducedMotion()` and falls back to static.

---

## Contact

This is an open-source project representing the work of **[Iqbal Attila](https://kcmon.id)**.

- Web: [kcmon.id](https://kcmon.id)
- Email: `me@kcmon.id`
- GitHub: [@iqbalattila](https://github.com/iqbalattila)
- LinkedIn: [iqbalattila](https://linkedin.com/in/iqbalattila)
- Instagram: [@iqbal.attila](https://instagram.com/iqbal.attila)

> This README is the public surface of the brand. For commissioned work inquiries, use the contact links on the live site at [kcmon.id](https://kcmon.id).

---

<div align="center">

**License**: MIT — fork, edit, ship, no attribution required.

Made with care by [Iqbal Attila](https://kcmon.id).

</div>
