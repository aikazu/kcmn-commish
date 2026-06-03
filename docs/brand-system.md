---
name: Obsidian Gold
description: Canonical design-token source of truth (colors, type, spacing, motion) for Iqbal Attila's "Obsidian Gold" personal brand system. Mirror file for SKILL.md quick reference. Edit only when the brand evolves.
---

# Obsidian Gold

> **Metadata** — owner: Iqbal Attila · scope: Personal brand · landing page · presentation deck · PDF report · intent: Single source of truth for visual identity across digital deliverables · version: 1.0.0 · status: stable · lastUpdated: 2026-06-02
>
> **Tagline (dual, context-dependent)** — `Secure by design. Shipped with intent.` (technical default) or `Secure by design. Delivered with intent.` (presales/client default). See [§11](#11-tagline-selection) for the selection rule.
>
> **Canonical role** — This file is the SOURCE OF TRUTH for all design tokens (color, type, spacing, motion). When values appear in other files (SKILL.md Quick Reference, references/*.md, build_deck.py skeleton, brand-preview.html), they MIRROR this file. If a mismatch is found, this file wins and the mirror should be patched to match.
>
> Edit this file ONLY when the brand evolves. After editing tokens here, audit mirrors and update them. Mirrors are documented at the top of each section in SKILL.md.

Personal brand system for **Iqbal Attila** — Cybersecurity Engineer, Software Engineer, Presales Engineer. Three deliverable surfaces: landing page, presentation deck (16:9), PDF report (A4).

## 1. Brand

|                     |                                                                                                  |
| ------------------- | ------------------------------------------------------------------------------------------------ |
| Tagline (dual, context-dependent) | See [Tagline Selection](#11-tagline-selection) below. Canonical strings: `Secure by design. Shipped with intent.` OR `Secure by design. Delivered with intent.` |
| Positioning         | Triple-hat engineer at the seam of cybersecurity, software, and presales.                        |
| Voice               | Technical, considered, confident, restrained. Specific tools and exact numbers over buzzwords.   |
| Tagline italic rule | In display headlines, italicize `by design` in `gold`. Compact contexts use full string in mono. |

## 11. Tagline Selection

Two canonical tagline strings exist. Choice is **context-driven**, not aesthetic. When unsure, default to the technical-deliverable variant; ask via `clarify` only if the deliverable type is genuinely ambiguous.

| Tagline | When to use | Deliverable types |
|---|---|---|
| `Secure by design. Shipped with intent.` | Technical artifact that has been released/produced. Engineering-first framing. | Portfolio pieces, GitHub profile README, CV/resume, internal tech decks, blog posts, technical blog, code documentation, engineering case studies, technical interview decks |
| `Secure by design. Delivered with intent.` | Value/outcome that has reached a client or stakeholder. Presales/services framing. | Presales decks, client proposals, service descriptions, client-facing reports, sales one-pagers, vendor pitch material, client onboarding decks, project handover docs |

**Quick heuristic**: if the artifact is about **code/output released**, use Shipped. If the artifact is about **value delivered to a third party**, use Delivered.

**Italics & gold rule** applies identically to both: italicize `by design` in `gold` in display contexts; full string in mono in compact contexts (footer, attribution line).

## 2. Logo

Single mark: **IA Sigil** — geometric monogram in containment frame with corner cut-marks (engineering spec-sheet reference, cybersec containment metaphor).

### 2.1 Construction (viewBox 0 0 200 200)

| Element      | Spec                                                             |
| ------------ | ---------------------------------------------------------------- |
| Outer frame  | `rect 30,30 → 170,170`, stroke 1.5 `gold`                        |
| Corner ticks | 10px ticks at each frame corner, stroke 1 `gold`                 |
| Letter I     | `rect 63,68 w6 h64` + serif bars `54-78` top/bottom, fill `gold` |
| Letter A     | `path M 100 132 L 117 68 L 134 132`, stroke 3 miter, square caps |
| A crossbar   | `line 107,108 → 127,108`, stroke 3                               |

### 2.2 Variants

| Context       | Frame             | Mark            | Use                                  |
| ------------- | ----------------- | --------------- | ------------------------------------ |
| Dark canvas   | `gold`            | `gold`          | Default — landing, deck, PDF on dark |
| Light paper   | `gold-deep`       | `canvas`        | Print — AAA contrast on white        |
| 48px app icon | thicken to 4–5px  | thicken to 5px  | iOS/Android icon, taskbar            |
| 24px favicon  | thicken to 8–10px | thicken to 10px | Browser tab — silhouette must read   |
| Below 24px    | —                 | —               | Do not use                           |

### 2.3 Lockup (horizontal)

Mark + wordmark + tagline, used in landing header, footer, business card, email signature.

| Element             | Spec                                                            |
| ------------------- | --------------------------------------------------------------- |
| Mark height         | Min 80px, scales with wordmark cap-height                       |
| Mark ↔ wordmark gap | 20px (1× cap-height)                                            |
| Wordmark            | Fraunces 500, tracking -0.5px, color `text`                     |
| Divider             | 0.8px `gold`, full wordmark width                               |
| Tagline             | JetBrains Mono 8px, tracking 1.5, color `text-muted`, uppercase |
| Min lockup width    | 200px (below this: mark only)                                   |

### 2.4 Clear space & misuse

- **Clear space:** 1× corner-tick length (10px in 200px sigil) on all sides.
- **Do not:** stretch, skew, rotate, recolor outside system, add shadow/glow/gradient, place on raw photography (use `image-overlay` first).

## 3. Color

### 3.1 Foundation

| Token       | Value     | Use                            |
| ----------- | --------- | ------------------------------ |
| `canvas`    | `#0A0A0A` | Page, deck, PDF background     |
| `surface-1` | `#121212` | Card, slide content            |
| `surface-2` | `#181818` | Raised card, hover, input fill |
| `surface-3` | `#1F1F1F` | Strong divider, pressed        |
| `surface-4` | `#282828` | Code block, table header       |

### 3.2 Gold

| Token         | Value     | Use                                            |
| ------------- | --------- | ---------------------------------------------- |
| `gold`        | `#C9A352` | Primary accent, CTA, mark on dark, header line |
| `gold-bright` | `#E0BF6B` | Hover, focus ring                              |
| `gold-deep`   | `#8A6F2D` | Mark on light paper, pressed, large gold areas |

Gold is shifted warmer than the standard `#D4AF37` to escape "luxury template" defaults.

### 3.3 Text

| Token        | Value     | Use                               |
| ------------ | --------- | --------------------------------- |
| `text`       | `#F0EDE7` | Body, primary                     |
| `text-muted` | `#A39F97` | Secondary, captions               |
| `text-dim`   | `#868179` | Tertiary, footnotes, page numbers (AA-compliant on canvas) |

### 3.4 Border

| Token           | Value     | Use                      |
| --------------- | --------- | ------------------------ |
| `border`        | `#2A2A2A` | Default divider          |
| `border-strong` | `#3A3A3A` | Emphasized, input bottom |
| `border-gold`   | `#C9A352` | Active, focused          |

### 3.5 Semantic

| Token     | Value     | Use                                            |
| --------- | --------- | ---------------------------------------------- |
| `signal`  | `#6CC3A6` | Success, OK, resolved                          |
| `alert`   | `#D27A6E` | Critical, error, severity high                 |
| `caution` | `#D4A24A` | Warning — use sparingly to avoid gold conflict |

### 3.6 Overlays

| Token           | Value                                                                            | Use                                             |
| --------------- | -------------------------------------------------------------------------------- | ----------------------------------------------- |
| `image-overlay` | `rgba(10,10,10,0.55)`                                                            | Dark wash on photography (mandatory under text) |
| `gold-glow`     | `radial-gradient(ellipse at 30% 40%, rgba(201,163,82,0.08) 0%, transparent 60%)` | Hero ambient glow                               |

### 3.7 Verified contrast (WCAG)

| Pair                     | Ratio  | Grade               |
| ------------------------ | ------ | ------------------- |
| `text` on `canvas`       | 17.4:1 | AAA                 |
| `text-muted` on `canvas` | 9.2:1  | AAA                 |
| `gold` on `canvas`       | 8.1:1  | AAA large, AA small |
| `gold` on `surface-1`    | 7.3:1  | AAA large, AA small |
| `canvas` on `gold`       | 8.1:1  | AAA                 |
| `signal` on `canvas`     | 7.4:1  | AAA                 |
| `alert` on `canvas`      | 5.8:1  | AAA large, AA small |

## 4. Typography

```css
--font-display: "Fraunces", "Source Serif Pro", Georgia, serif;
--font-sans: "Inter", system-ui, -apple-system, "Helvetica Neue", sans-serif;
--font-mono: "JetBrains Mono", ui-monospace, "SF Mono", Consolas, monospace;
```

| Family         | Role                                         |
| -------------- | -------------------------------------------- |
| Fraunces       | Display, headlines (italic accent in `gold`) |
| Inter          | Body, UI                                     |
| JetBrains Mono | Labels, metadata, code, classification       |

### 4.1 Scale

| Token         | Family   | Size | Line | Tracking | Weight | Use                                                            |
| ------------- | -------- | ---- | ---- | -------- | ------ | -------------------------------------------------------------- |
| `display-xl`  | Fraunces | 96   | 0.95 | -0.03em  | 400    | Landing hero, deck cover                                       |
| `display-lg`  | Fraunces | 64   | 1.0  | -0.025em | 400    | Deck section, PDF title                                        |
| `headline-lg` | Fraunces | 56   | 1.05 | -0.02em  | 400    | Section opener                                                 |
| `headline-md` | Fraunces | 32   | 1.15 | -0.015em | 500    | Subsection                                                     |
| `headline-sm` | Inter    | 22   | 1.3  | -0.01em  | 600    | Card title (Inter, not Fraunces, to avoid decorative overload) |
| `body-lg`     | Inter    | 18   | 1.6  | 0        | 400    | Hero subtitle                                                  |
| `body-md`     | Inter    | 15   | 1.55 | 0        | 400    | Default paragraph                                              |
| `body-sm`     | Inter    | 13   | 1.5  | 0        | 400    | Caption                                                        |
| `label`       | Mono     | 11   | 1.4  | 0.15em   | 500    | Eyebrow, badge                                                 |
| `label-sm`    | Mono     | 10   | 1.4  | 0.15em   | 500    | Footer micro                                                   |
| `mono`        | Mono     | 13   | 1.55 | 0        | 400    | Code, metadata                                                 |

### 4.2 Italic accent

One italicized word per display headline, color `gold`, weight `300`. Max one accent per slide / section.

### 4.3 Numerics

Tabular figures for any data context: `font-feature-settings: "tnum"`. Big-number stats use Fraunces 64 weight 500 with `tnum`.

### 4.4 Loading

Web: preload via Google Fonts with `display=swap`. PDF/deck export: **embed all fonts**, never rely on viewer's installed fonts.

## 5. Spacing

8px base. All values are multiples of 4 (half) or 8 (full).

| Token  | px  | Use                                       |
| ------ | --- | ----------------------------------------- |
| `r-1`  | 4   | Inline icon-text gap                      |
| `r-2`  | 8   | Tight stack, badge padding                |
| `r-3`  | 12  | Form field gap, button vertical           |
| `r-4`  | 16  | Card padding (mobile), button horizontal  |
| `r-5`  | 24  | Card padding (desktop), label-content     |
| `r-6`  | 32  | Component-internal generous, deck content |
| `r-7`  | 48  | Component gap, landing nav                |
| `r-8`  | 64  | Section internal                          |
| `r-9`  | 96  | Section gap (mobile), deck slide margin   |
| `r-10` | 128 | Section gap (desktop landing)             |

### Component padding canon

| Component                 | Padding                     |
| ------------------------- | --------------------------- |
| Button (default / large)  | `12px 22px` / `14px 28px`   |
| Input                     | `12px 14px`                 |
| Card                      | `r-6` desktop, `r-4` mobile |
| Slide content (1920×1080) | `r-9` from edge             |
| PDF page (A4)             | `32mm × 24mm`               |

Touch targets on mobile landing: minimum **44×44px**.

## 6. Layout

### 6.1 Landing grid

| Breakpoint | Width     | Cols | Gutter | Margin                       |
| ---------- | --------- | ---- | ------ | ---------------------------- |
| Mobile     | < 640px   | 4    | 16     | 16                           |
| Tablet     | 640–1024  | 8    | 20     | 32                           |
| Desktop    | 1024–1440 | 12   | 24     | 48                           |
| Wide       | ≥ 1440    | 12   | 24     | container max 1280, centered |

### 6.2 Deck (16:9)

| Format    | Resolution     | Use                          |
| --------- | -------------- | ---------------------------- |
| Default   | 1920×1080      | PPTX standard                |
| Alternate | 1280×720       | Lighter export               |
| Avoid     | 1024×768 (4:3) | Only if explicitly requested |

Safe area: 5% from each edge (96px at 1920×1080).

### 6.3 PDF (A4)

| Spec      | Value                                     |
| --------- | ----------------------------------------- |
| Page      | 210 × 297 mm portrait                     |
| Margins   | 32mm top/bottom, 24mm sides               |
| Bleed     | 3mm (if printed)                          |
| Color     | sRGB digital, CMYK only if physical print |
| Image DPI | 300 print, 144 screen-only                |
| Fonts     | Embedded for all three families           |

## 7. Motion

| Token           | Duration | Easing                       | Use                          |
| --------------- | -------- | ---------------------------- | ---------------------------- |
| `motion-fast`   | 150ms    | `cubic-bezier(0.4,0,0.2,1)`  | Hover, focus, button press   |
| `motion-medium` | 250ms    | `cubic-bezier(0.4,0,0.2,1)`  | Modal, drawer                |
| `motion-slow`   | 400ms    | `cubic-bezier(0.16,1,0.3,1)` | Section fade-up, hero reveal |

Honor `prefers-reduced-motion: reduce` — replace transitions with instant state, fade-up with fade only.

## 8. Signature Details

Ownable visual moments — repeat across all surfaces.

| Detail                 | Spec                                                                                                                      |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| **Header gold-line**   | 2px `gold` line on top edge of every major container (landing card, deck slide, PDF page). Never bottom, never recolored. |
| **Section label**      | 32px gold rule + space + mono uppercase eyebrow. Used at start of every section.                                          |
| **Italic gold accent** | One italic word in `gold` weight 300 per display headline. See `4.2`.                                                     |
| **Spec-sheet sidebar** | Mono rows separated by 1px borders — landing hero metadata, PDF cover metadata.                                           |
| **Image dark overlay** | `image-overlay` on every photography that sits behind text. Mandatory.                                                    |

## 9. Components

### 9.1 Buttons

| Variant   | Background  | Border            | Text         | Use                        |
| --------- | ----------- | ----------------- | ------------ | -------------------------- |
| Primary   | `gold`      | none              | `canvas`     | The single action per view |
| Secondary | transparent | 1px `gold`        | `gold`       | Secondary path, Read more  |
| Tertiary  | transparent | bottom 1px `gold` | `text-muted` | Inline / footer link       |

```css
.btn {
  font-family: var(--font-mono);
  font-size: 11px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  padding: 12px 22px;
  border-radius: 4px;
  transition: all var(--motion-fast);
}
.btn-primary {
  background: var(--gold);
  color: var(--canvas);
}
.btn-primary:hover {
  background: var(--gold-bright);
}
.btn-secondary {
  border: 1px solid var(--gold);
  color: var(--gold);
  background: transparent;
}
.btn-secondary:hover {
  background: rgba(201, 163, 82, 0.08);
}
.btn:focus-visible {
  outline: 2px solid var(--gold-bright);
  outline-offset: 2px;
}
```

### 9.2 Input

```css
.input {
  background: var(--surface-2);
  border: none;
  border-bottom: 1px solid var(--border-strong);
  padding: 12px 14px;
  color: var(--text);
  font-family: var(--font-sans);
  font-size: 14px;
  transition: border-color var(--motion-fast);
}
.input:focus {
  border-bottom-color: var(--gold);
  outline: none;
}
.input::placeholder {
  color: var(--text-dim);
}
.input[disabled] {
  opacity: 0.5;
}
.input[aria-invalid="true"] {
  border-bottom-color: var(--alert);
}
```

### 9.3 Badge

```css
.badge {
  font-family: var(--font-mono);
  font-size: 10px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  padding: 4px 10px;
  border-radius: 2px;
  border: 1px solid var(--border-strong);
  color: var(--text-muted);
}
.badge-gold {
  border-color: var(--gold);
  color: var(--gold);
}
.badge-signal {
  border-color: var(--signal);
  color: var(--signal);
}
.badge-alert {
  border-color: var(--alert);
  color: var(--alert);
}
```

### 9.4 Big-number stat

```css
.stat {
  border-left: 1px solid var(--gold);
  padding-left: var(--r-3);
}
.stat-num {
  font-family: var(--font-display);
  font-size: 64px;
  font-weight: 500;
  font-feature-settings: "tnum";
  letter-spacing: -0.02em;
  line-height: 1;
}
.stat-label {
  font-family: var(--font-mono);
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: var(--text-muted);
  margin-top: 6px;
}
```

### 9.5 Terminal

```css
.terminal {
  background: var(--canvas);
  border: 1px solid var(--border);
  border-radius: 4px;
  padding: var(--r-4);
  font-family: var(--font-mono);
  font-size: 12px;
  line-height: 1.7;
  color: var(--text-muted);
}
.terminal .prompt {
  color: var(--gold);
}
.terminal .ok {
  color: var(--signal);
}
.terminal .err {
  color: var(--alert);
}
```

### 9.6 Card

```css
.card {
  background: var(--surface-1);
  border: 1px solid var(--border);
  border-radius: 4px;
  padding: var(--r-6);
  position: relative;
}
.card::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: var(--gold);
}
```

## 10. Deliverable Patterns

### 10.1 Landing page

| Element          | Spec                                                                 |
| ---------------- | -------------------------------------------------------------------- |
| Top fold         | 100vh hero — nav + headline + sidebar metadata + ambient `gold-glow` |
| Nav              | Brand lockup left, mono uppercase links center, primary CTA right    |
| Hero h1          | `display-xl` with italic gold accent on key word                     |
| Sub              | `body-lg` muted, max 48ch                                            |
| Sidebar metadata | Spec-sheet block (see signature 8)                                   |
| Sections         | `r-10` gap, opener with section label                                |
| Footer           | Lockup + tagline + mono social links                                 |

### 10.2 Deck (16:9)

| Slide type      | Pattern                                                                                                         |
| --------------- | --------------------------------------------------------------------------------------------------------------- |
| Cover           | Header gold-line, eyebrow, display headline w/ italic accent, sub max 50ch, footer brand + tagline + page count |
| Section divider | Centered eyebrow + `display-lg` + gold rule                                                                     |
| Content (1-col) | `headline-md` + body 18px, max 60% slide width                                                                  |
| Content (2-col) | `r-8` gutter, content L, supporting R                                                                           |
| Stat slide      | 1–3 big-numbers with gold left rule                                                                             |
| Quote           | `display-lg` quote with italic accent, mono attribution right                                                   |
| Closing         | Mirror cover, replace headline with CTA + contact mono                                                          |

### 10.3 PDF report (A4)

| Page                | Pattern                                                                                                                                                  |
| ------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Cover               | Top gold-line, classification badge, gold rule, `display-lg` title with italic accent, mono metadata block (Client, Engagement, Period, Author, Version) |
| TOC                 | Section number mono, title Fraunces 22, page mono right, gold dividers                                                                                   |
| Section opener      | Number + label, `headline-lg` title, intro paragraph                                                                                                     |
| Body                | Inter 11/1.55                                                                                                                                            |
| Code block          | `surface-4` bg, mono 10, border-left 2px `gold`                                                                                                          |
| Footer (every page) | Classification badge L, page number mono R, 1px `border` top                                                                                             |

## 11. Discipline Rules

The system stays distinctive only if these hold.

1. **One gold accent per moment** — one italic word per headline, one CTA per view, one gold rule per section.
2. **Header gold-line is sacred** — top edge only, never recolored, never moved.
3. **Image overlay is mandatory** — photography never appears under text without `image-overlay`.
4. **Mono labels stay short** — 2–6 words, never paragraphs.
5. **Italic is for display only** — body italic creates noise.
6. **No fourth font** — if a need feels new, it's a misuse of the existing three.
7. **No glow / shadow / gradient on the mark** — frame + cut-marks + monogram is the entire identity.
8. **Below 24px the mark does not exist** — use type alone.
