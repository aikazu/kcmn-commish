# Landing Page — Rate Card Web Dev (kcmn-commish)

> **Status:** design — awaiting user approval
> **Date:** 2026-06-03
> **Owner:** Iqbal Attila
> **Scope:** Single landing page. Rate card for web dev/frontend services. Fully animated, polished, smooth, responsive. One-screen scroll narrative.

## 1. Purpose

Landing page serves as public rate card for Iqbal Attila's web dev/frontend commission services. Visitor lands → sees portfolio, live demo, testimonials → reads pricing → clicks WhatsApp CTA to start conversation. Single page, no auth, no backend.

## 2. Brand foundation

Reuse **Obsidian Gold** design system from `DESIGN.md` (project root) as-is for: color tokens, typography (Fraunces / Inter / JetBrains Mono), spacing scale, motion tokens (fast 150ms / medium 250ms / slow 400ms), component primitives (btn, input, badge, stat, terminal, card with 2px gold top-line), signature details (section eyebrow + 32px gold rule, italic gold accent per display headline, spec-sheet sidebar, image-overlay mandatory), discipline rules (1 gold accent per moment, 1 CTA per view, no fourth font, no glow on mark).

**Tweaks for this project** (landing demands more than deck/PDF):
- Add `motion-slower` token (700ms, `cubic-bezier(0.16,1,0.3,1)`) for orchestrated reveals
- Add `motion-spring` for card hover, magnetic cursor, layout shifts
- Add `motion-typing` (30ms/char linear) for terminal/code demos
- Section composition 9 sections (deck has 5–7 slides, PDF has 5–10 pages)
- Testimonial carousel + LiveDemo interactive — features deck/PDF don't need
- WhatsApp CTA replaces deck's contact slide

**Tagline:** `Secure by design. Delivered with intent.` (services/presales context per Obsidian Gold §11).

## 3. Tech stack

| Tool                       | Version target    | Role                              |
| -------------------------- | ----------------- | --------------------------------- |
| Next.js                    | 15.x latest stable| App Router, SSR, Image, Metadata  |
| TypeScript                 | 5.x latest strict| Type safety                       |
| Tailwind CSS               | 4.x latest        | Styling                           |
| Framer Motion (npm: `motion`) | 11.x+ latest   | Animation, layout, gestures. Import via `motion/react`. |
| Lenis                      | latest            | Smooth scroll                     |
| Lucide React               | latest            | Icons                             |
| Vitest                     | latest            | Unit + component tests            |
| Testing Library            | latest            | Component interaction tests       |
| Playwright                 | latest            | E2E + visual + a11y               |
| `@axe-core/playwright`     | latest            | Accessibility audit               |
| Lighthouse CI              | latest            | Performance budget enforcement    |

All deps verified as latest stable on `bun install`. Lock file (`bun.lockb` or `bun.lock`) committed. Use `motion` package (Framer Motion rebrand) — import path `motion/react` for client components. Bun as primary package manager + script runner; npm fallback only if a specific dep has no Bun support.

## 4. File structure

```
kcmn-commish/
├── app/
│   ├── layout.tsx              # Root: font, metadata, providers
│   ├── page.tsx                # Landing composition
│   ├── globals.css             # Tailwind + CSS vars
│   └── opengraph-image.tsx     # Dynamic OG
├── components/
│   ├── sections/
│   │   ├── Hero.tsx
│   │   ├── Services.tsx
│   │   ├── Portfolio.tsx
│   │   ├── LiveDemo.tsx
│   │   ├── Testimonials.tsx
│   │   ├── RateCard.tsx
│   │   ├── FAQ.tsx
│   │   ├── CTA.tsx
│   │   └── Footer.tsx
│   ├── ui/
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Badge.tsx
│   │   └── SectionHeading.tsx
│   ├── motion/
│   │   ├── FadeUp.tsx
│   │   ├── Stagger.tsx
│   │   ├── SmoothScroll.tsx
│   │   └── MagneticCursor.tsx
│   └── data/
│       ├── rateCard.ts
│       ├── portfolio.ts
│       └── testimonials.ts
├── lib/
│   ├── whatsapp.ts             # wa.me link builder
│   └── cn.ts                   # class merger
├── public/
│   ├── images/                 # Portfolio placeholders
│   └── fonts/                  # Self-hosted display fonts
├── tests/
│   ├── unit/
│   ├── component/
│   └── e2e/
├── tailwind.config.ts
├── next.config.ts
├── tsconfig.json
├── playwright.config.ts
├── lighthouse.config.js
└── package.json
```

**Prinsip:** Server Components default. Client Components only for sections needing motion/interaction. Data layer terpisah dari presentation. Motion primitives reusable.

## 5. Sections

### 5.1 Hero (100vh)

- Background: `canvas` + ambient `gold-glow` radial drift
- Headline `display-xl` Fraunces, italic gold accent on 1 kata
- Sub `body-lg` Inter muted, max 48ch
- Spec-sheet sidebar (mono rows): `Available · Q3 2026`, `Response < 24h`, `Jakarta / Remote`, `Timezone GMT+7`
- Two CTA: primary `gold` "Lihat Rate Card" → scroll anchor, secondary outline "Konsultasi Gratis" → WhatsApp
- Scroll indicator pulse
- Nav: brand lockup left, mono uppercase links center, primary CTA right

### 5.2 Services

- Section eyebrow (mono uppercase + 32px gold rule) + `headline-lg` Fraunces
- 3-4 tiles: Landing Page, Web App, UI/UX Design, Maintenance
- Each tile: `.card` base (top gold-line), icon, title, short desc
- Hover: card lift + icon rotate 4° + top gold-line scale-x 0.6→1
- Stagger reveal on scroll

### 5.3 Portfolio (preview #1)

- Bento grid: 1 large + 2 medium + 3 small (desktop)
- 6-9 placeholder projects, image + title + category
- Filter chips by category
- Hover: image scale 1.05 + overlay info slide up
- Click → modal full-screen (mobile) / centered (desktop) dengan `.card` look + `.terminal` for tech stack
- Modal: focus trap, Esc close, click outside close

### 5.4 LiveDemo (preview #2)

- Mock browser frame (window chrome dengan traffic lights) landscape
- Tab bar above frame: 3 placeholder demos
- Tab switch: old screenshot slide out left + fade, new slide in right
- Optional: code snippet with `motion-typing` animation below frame
- Device frame parallax on scroll: rotate 0→-2°, return on scroll up
- On mobile: portrait frame, swipe between demos

### 5.5 Testimonials (preview #3)

- Horizontal carousel, 3 cards visible desktop, 2 tablet, 1 mobile
- Card: avatar placeholder (initials in gold circle), quote Inter, name + project mono
- Drag/swipe dengan spring snap, throw-on-release
- Auto-advance 5s, pause on hover/focus
- Keyboard: arrow left/right nav
- `aria-roledescription="carousel"`, slides `aria-roledescription="slide"`
- Infinite loop dengan cloned items

### 5.6 Rate Card (main attraction)

- 3-4 tiers: Basic / Standard / Pro / Custom
- Pro tier: "Popular" badge (`.badge-gold`), highlighted card, subtle gold border pulse
- Each card: tier name `headline-sm`, price `display-lg` Fraunces dengan `tnum`, fitur list dengan checkmark icon, CTA
- Hover: card lift + glow, top gold-line animate
- CTA WhatsApp: `wa.me/<number>?text=<encoded message with tier name>`
- Mobile: 1-col stack, Pro card on top dengan `ring-2 ring-gold`, scroll snap

### 5.7 FAQ

- Accordion 5-7 Q&A
- Single column, max 768px centered
- Question: `.card` look, mono "+" icon right, click expand
- Layout animation: height auto, content fade (motion-medium), plus rotate 45° + color shift to gold
- `aria-expanded`, `aria-controls` on button

### 5.8 CTA

- Section eyebrow + `display-lg` headline + sub
- Single `btn-primary` "Mulai via WhatsApp" → wa.me with general inquiry message
- Subtle particle/gradient bg animation
- Stagger reveal on scroll

### 5.9 Footer

- 3-col desktop, 1-col mobile
- Left: IA Sigil mark + tagline `Secure by design. Delivered with intent.`
- Center: nav links
- Right: social icons (GitHub, LinkedIn, Instagram, Email) with hover bounce
- Bottom mono copyright + back-to-top smooth scroll

## 6. Animation choreography

### 6.1 Motion tokens (extends Obsidian Gold §7)

| Token            | Duration       | Easing                       | Use                            |
| ---------------- | -------------- | ---------------------------- | ------------------------------ |
| `motion-fast`    | 150ms          | `cubic-bezier(0.4,0,0.2,1)`  | Hover, focus, button press     |
| `motion-medium`  | 250ms          | `cubic-bezier(0.4,0,0.2,1)`  | Modal, drawer                  |
| `motion-slow`    | 400ms          | `cubic-bezier(0.16,1,0.3,1)` | Section fade-up, hero reveal   |
| `motion-slower`  | 700ms          | `cubic-bezier(0.16,1,0.3,1)` | Big section openers, orchestrated reveals |
| `motion-spring`  | spring(stiffness:100, damping:20) | — | Card hover, magnetic, layout shifts |
| `motion-typing`  | 30ms/char      | linear                       | Terminal/code typing           |

### 6.2 Hero orchestrated reveal (mount)

1. `t=0` Nav slide down (200ms ease-out)
2. `t=100ms` Spec-sheet rows stagger fade (50ms gap)
3. `t=300ms` Headline lines split reveal (motion-slower, stagger 80ms/line)
4. `t=700ms` Italic gold word: scale 0.8→1 + fade (spring)
5. `t=900ms` Sub fade-up
6. `t=1100ms` CTAs stagger (primary 0, secondary 100ms)
7. `t=1400ms` Scroll indicator fade + pulse loop start
8. Parallel: gold-glow radial drift slow loop (20s)

### 6.3 Scroll-linked sequences

- Hero parallax: bg shapes `translateY -30%` saat scroll 0→500px (`useScroll` + `useTransform`)
- Section labels: gold rule scale-x 0→1 + eyebrow mask reveal
- Section headlines: split per word, stagger reveal
- Stagger children: cards/tiles 60ms gap

### 6.4 Micro-interactions

- Magnetic CTA: cursor proximity adds `translateX/Y ±8px` (spring return)
- Card hover: scale 1.02 + top gold-line scale-x (motion-spring)
- Popular card pulse: gold border opacity 0.6↔1, 2s loop
- Button shimmer: gradient sweep on hover (motion-medium)
- Link underline: scale-x 0→1 from left (motion-fast)
- Icon rotate: 4° on hover (motion-fast)

### 6.5 LiveDemo specifics

- Device frame parallax rotate 0→-2° on scroll
- Tab switch: slide+fade (motion-medium, 100ms offset)
- Code typing: char-by-char 30ms/char, blinking cursor loop

### 6.6 Testimonials carousel

- Auto-advance 5s, 400ms slide, infinite loop
- Drag spring snap, throw-on-release physics
- Pause on hover/focus
- Keyboard arrow nav

### 6.7 FAQ accordion

- Layout animation: height auto + content fade (motion-medium)
- Plus icon: rotate 0→45° + gold color shift (motion-fast)

### 6.8 Page transitions + Lenis

- Anchor links: Lenis smooth scroll, target offset 80px (nav height)
- Lenis config: `lerp: 0.1, duration: 1.2, smoothWheel: true`

### 6.9 Reduced motion fallback

- Detect `prefers-reduced-motion: reduce`:
  - Replace orchestrated dengan simple fade 150ms
  - Disable parallax, magnetic, pulse loops
  - Lenis tetap tapi `smoothWheel: false`
  - Typing → instant text
- Detection via `useReducedMotion` + matchMedia

## 7. Responsive

### 7.1 Breakpoints

| Breakpoint | Width      | Layout shift                                           |
| ---------- | ---------- | ------------------------------------------------------ |
| mobile     | < 640px    | 1-col stack, hamburger nav, hero h1 56px              |
| sm         | 640–767    | 2-col grids start                                      |
| tablet     | 768–1023   | 8-col, sidebars collapse, FAQ single col              |
| lg         | 1024–1439  | 12-col, bento, spec-sidebar visible                   |
| desktop    | ≥ 1440     | Container max 1280, margins 48px, full features       |

Tailwind: `xs: 480, sm: 640, md: 768, lg: 1024, xl: 1280, 2xl: 1440`.

### 7.2 Per-section

- **Nav:** desktop brand-links-CTA, mobile hamburger + drawer
- **Hero:** desktop 96px h1 + sidebar right, tablet 72px + sidebar stack, mobile 56px + sidebar hidden
- **Services:** desktop 4-col, tablet 2x2, mobile 1-col
- **Portfolio:** desktop bento asymmetric, tablet 2-col uniform, mobile 1-col stack + full-screen modal
- **LiveDemo:** desktop landscape 70% width + tab bar, mobile portrait full-width + swipe
- **Testimonials:** desktop 3 visible, tablet 2, mobile 1 + snap-scroll
- **RateCard:** desktop 4 inline, tablet 2x2, mobile 1-col + Pro on top with ring + scroll snap
- **FAQ:** all breakpoints 1-col max 768px
- **Footer:** desktop 3-col, mobile 1-col stack

### 7.3 Universal

- Touch targets ≥ 44x44px
- Tap highlight: `:active` bg `gold` 8% opacity, 100ms
- No hover-dependent info (mobile equivalent or enhancement-only)
- Typography scale down ~40% on mobile
- Line lengths: max 36ch mobile, 48ch+ desktop

### 7.4 Animation responsive

- Mobile: reduce parallax max ±5%, disable magnetic, simplify stagger (3 children max simultaneous)
- `useReducedMotion` + matchMedia for breakpoint-aware motion

## 8. Performance

### 8.1 Budget

| Metric                    | Target      | Hard cap |
| ------------------------- | ----------- | -------- |
| LCP (mobile 4G)           | < 1.8s      | < 2.5s   |
| INP                       | < 100ms     | < 200ms  |
| CLS                       | 0           | < 0.05   |
| JS bundle (initial)       | < 180KB gz  | < 250KB  |
| CSS bundle                | < 30KB gz   | < 50KB   |
| Total page weight (mobile)| < 500KB     | < 800KB  |
| Lighthouse Performance    | ≥ 95        | ≥ 90     |
| Lighthouse A11y/BP/SEO    | ≥ 95        | ≥ 90     |

### 8.2 Tactics

- Fonts: preload 3 families with `display=swap`, subset Latin Extended, self-host via `next/font/local`
- Images: Next/Image, `priority` only on hero LCP, AVIF + WebP
- Code split: each section dynamic import except Hero, LiveDemo lazy on approach
- Framer Motion (`motion` package): `LazyMotion` + `domAnimation` features only (~25KB)
- Lenis: client-only dynamic import
- Bun for dev server (`bun run dev`) + build (`bun run build`) + test (`bun test`) + install
- No third-party scripts (no analytics, no chat widget)
- Tailwind purge, critical CSS via Next default
- `transform` + `opacity` only for animations
- `will-change: transform` only on active, remove after
- Break heavy work to microtasks
- Blur placeholders for portfolio images

## 9. Accessibility (WCAG 2.2 AA, AAA where already met)

- Contrast: reuse Obsidian Gold verified pairs, new accents ≥ 4.5:1
- Keyboard: full Tab navigation, visible focus `2px solid gold-bright offset 2px`, skip-to-content
- Focus order: nav → main sections in order → footer
- Modals: focus trap, Esc close, click-outside close, focus return
- Semantic HTML: `<header>`, `<main>`, `<section aria-labelledby>`, `<footer>`
- Headings: h1 (hero), h2 (sections), h3 (cards), no skipped levels
- Carousel: `aria-roledescription="carousel"` + slide roles + live region
- Accordion: `aria-expanded` + `aria-controls` on button
- `prefers-reduced-motion: reduce` honored
- Touch targets ≥ 44x44px
- Alt text: portfolio descriptive, decorative `aria-hidden`
- All interactive accessible name (text or `aria-label`)
- `<html lang="id">`
- 200% zoom no horizontal scroll
- State never color-only (icon + label too)
- Live region announces rate card click "Membuka WhatsApp untuk pesan [tier]"

## 10. SEO

- Metadata API: title, description, OG image (dynamic `opengraph-image.tsx`)
- JSON-LD: `Person` (Iqbal Attila) + `Service` (rate card tiers)
- `robots.txt` + `sitemap.xml` auto
- Semantic HTML, single h1
- Canonical URL
- Indonesian content

## 11. Security

- WhatsApp link: validate number format, encode message
- No user data, no cookies, no localStorage
- CSP: default-src 'self', no inline (Next nonce)
- Security headers: X-Frame-Options, X-Content-Type-Options, Referrer-Policy

## 12. Data placeholders (user to replace)

- `data/rateCard.ts`: 3-4 tiers (name, price, fitur, whatsappMessage template)
- `data/portfolio.ts`: 6-9 projects (title, category, image, techStack, description)
- `data/testimonials.ts`: 4-6 quotes (name, project, quote, avatar initials)
- WhatsApp number: `data/contact.ts` single source

User will provide real values when implementation starts. Placeholders use realistic Indonesian web dev market prices + Lorem-style project names so design looks credible.

## 13. Testing strategy

| Layer       | Tool                              | Scope                                                      |
| ----------- | --------------------------------- | ---------------------------------------------------------- |
| Unit        | Vitest                            | `lib/*`, data shape (Zod), motion primitive props         |
| Component   | Vitest + Testing Library          | Button/Card/Badge/FAQ/Testimonial/RateCard interactions    |
| Visual      | Playwright                        | 4 breakpoints, 2 states per section, 0.2% diff threshold   |
| E2E         | Playwright                        | Smoke flow, anchor nav, accordion, carousel, keyboard      |
| A11y        | `@axe-core/playwright`            | 0 violations wcag2a/2aa/21a/21aa, 4 breakpoints            |
| Performance | Lighthouse CI                     | Mobile + desktop, fail < 90                                |
| Reduced     | Playwright (emulated)             | No parallax/magnetic/loop, instant state changes          |
| Manual      | checklist                         | iOS Safari, Android Chrome, VoiceOver, keyboard, zoom      |

Manual checklist (before ship):
- [ ] Sections render on iOS Safari + Android Chrome
- [ ] Lenis smooth scroll feels right
- [ ] Magnetic cursor disabled on touch
- [ ] Stagger doesn't feel sluggish
- [ ] WhatsApp opens app on mobile, web on desktop
- [ ] OG image correct
- [ ] No FOUC
- [ ] Copy reviewed
- [ ] Brand discipline: 1 gold/section, no 4th font, no glow on mark
- [ ] Tagline: "Secure by design. Delivered with intent."

## 14. Build & deploy

- Vercel, preview per PR
- Build: `pnpm build` (or npm)
- Output: static (App Router default static rendering)
- Domain: TBD (`kcmon.id/rate` or `kcmn-commish.kcmon.id`)
- CI: Playwright on every PR, Lighthouse CI on main, bundle size PR comments

## 15. Out of scope (YAGNI)

- Light theme toggle
- i18n (Indonesian only for v1)
- Backend / API routes
- CMS / dynamic content
- User accounts
- Analytics
- Cookie banner
- Sitemap beyond default
- A/B testing
- Blog / additional pages

## 16. Open questions

None — all resolved in brainstorming session 2026-06-03.
