# Landing Rate Card Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a fully animated, polished, responsive landing page rate card for Iqbal Attila's web dev/frontend commission services, using Next.js 15 + Tailwind v4 + Framer Motion (`motion`) + Lenis, with Obsidian Gold brand system applied throughout.

**Architecture:** Next.js 15 App Router. Server Components by default; Client Components only for sections needing motion/interaction. Data layer (`components/data/*.ts`) separated from presentation. Reusable motion primitives in `components/motion/*`. WhatsApp CTA via `wa.me` link builder in `lib/whatsapp.ts`. No backend, no CMS, static deploy to Vercel.

**Tech Stack:** Next.js 15 (latest stable), TypeScript strict, Tailwind CSS v4, motion (Framer Motion v11+), Lenis, Lucide React, Vitest, Testing Library, Playwright, @axe-core/playwright, Lighthouse CI, Bun (package manager + runtime).

**Spec:** `docs/superpowers/specs/2026-06-03-landing-rate-card-design.md`
**Brand reference:** `docs/brand-system.md` (Obsidian Gold)

---

## File map

| File                                                     | Responsibility                                                    |
| -------------------------------------------------------- | ----------------------------------------------------------------- |
| `package.json`                                           | Deps, scripts, Bun config                                         |
| `tsconfig.json`                                          | TS strict, path aliases                                           |
| `next.config.ts`                                         | Next config, security headers, image domains                      |
| `tailwind.config.ts`                                     | Brand tokens, breakpoints, animations                            |
| `postcss.config.mjs`                                     | Tailwind v4 PostCSS                                               |
| `app/globals.css`                                        | Tailwind directives, CSS vars, base styles                       |
| `app/layout.tsx`                                         | Root layout: fonts, metadata, SmoothScroll provider               |
| `app/page.tsx`                                           | Landing composition (all sections)                               |
| `app/opengraph-image.tsx`                                | Dynamic OG image                                                  |
| `components/sections/Hero.tsx`                           | Hero section with orchestrated reveal                             |
| `components/sections/Services.tsx`                       | 3-4 service tiles                                                 |
| `components/sections/Portfolio.tsx`                      | Bento grid + modal                                                |
| `components/sections/LiveDemo.tsx`                       | Mock browser frame + tabs                                         |
| `components/sections/Testimonials.tsx`                   | Carousel                                                          |
| `components/sections/RateCard.tsx`                       | Tier cards + WhatsApp CTA                                         |
| `components/sections/FAQ.tsx`                            | Accordion                                                         |
| `components/sections/CTA.tsx`                            | Closing CTA                                                       |
| `components/sections/Footer.tsx`                         | Footer                                                            |
| `components/ui/Button.tsx`                               | btn-primary/secondary/tertiary                                    |
| `components/ui/Card.tsx`                                 | .card primitive (top gold-line)                                   |
| `components/ui/Badge.tsx`                                | badge variants                                                    |
| `components/ui/SectionHeading.tsx`                       | Eyebrow + gold rule + headline                                    |
| `components/motion/FadeUp.tsx`                           | Reveal-on-scroll primitive                                        |
| `components/motion/Stagger.tsx`                          | Stagger children primitive                                        |
| `components/motion/SmoothScroll.tsx`                     | Lenis provider                                                    |
| `components/motion/MagneticCursor.tsx`                   | Magnetic CTA effect                                               |
| `components/data/rateCard.ts`                            | Placeholder tier data                                             |
| `components/data/portfolio.ts`                           | Placeholder project data                                          |
| `components/data/testimonials.ts`                        | Placeholder quote data                                            |
| `components/data/contact.ts`                             | WhatsApp number + base URL                                        |
| `lib/whatsapp.ts`                                        | `buildWhatsAppLink(tier, message?)`                               |
| `lib/cn.ts`                                              | Tailwind class merger                                             |
| `tests/unit/whatsapp.test.ts`                            | WhatsApp link builder tests                                       |
| `tests/unit/cn.test.ts`                                  | Class merger tests                                                |
| `tests/component/Button.test.tsx`                        | Button variant tests                                              |
| `tests/component/Card.test.tsx`                          | Card top-line tests                                               |
| `tests/component/FAQ.test.tsx`                           | Accordion expand/collapse                                         |
| `tests/component/RateCard.test.tsx`                      | WhatsApp link encoding                                            |
| `playwright.config.ts`                                   | Playwright config                                                 |
| `tests/e2e/landing.spec.ts`                              | Smoke + anchor + carousel                                         |
| `tests/e2e/a11y.spec.ts`                                 | axe-core a11y audit                                               |
| `tests/e2e/reduced-motion.spec.ts`                       | prefers-reduced-motion behavior                                   |
| `lighthouserc.json`                                      | Lighthouse CI config                                              |
| `vitest.config.ts`                                       | Vitest config                                                     |

---

## Phase 1: Foundation (Tasks 1-5)

### Task 1: Initialize Next.js project with Bun

**Files:**
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `next.config.ts`
- Create: `next-env.d.ts` (auto-generated)
- Create: `app/layout.tsx` (stub)
- Create: `app/page.tsx` (stub)
- Create: `app/globals.css` (stub)
- Create: `.gitignore`

- [ ] **Step 1: Check Bun installed**

Run: `bun --version`
Expected: version 1.x or higher. If missing, install via `npm i -g bun` or `curl -fsSL https://bun.sh/install | bash`.

- [ ] **Step 2: Create `package.json`**

```json
{
  "name": "kcmn-commish",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "test": "vitest run",
    "test:watch": "vitest",
    "test:e2e": "playwright test",
    "lhci": "lhci autorun"
  },
  "dependencies": {
    "next": "latest",
    "react": "latest",
    "react-dom": "latest",
    "motion": "latest",
    "lenis": "latest",
    "lucide-react": "latest"
  },
  "devDependencies": {
    "@types/node": "latest",
    "@types/react": "latest",
    "@types/react-dom": "latest",
    "@playwright/test": "latest",
    "@axe-core/playwright": "latest",
    "@testing-library/jest-dom": "latest",
    "@testing-library/react": "latest",
    "@testing-library/user-event": "latest",
    "@lhci/cli": "latest",
    "autoprefixer": "latest",
    "happy-dom": "latest",
    "postcss": "latest",
    "tailwindcss": "latest",
    "typescript": "latest",
    "vitest": "latest"
  }
}
```

Note: `latest` is intentional — install will pin to current. If any dep conflicts, fix inline.

- [ ] **Step 3: Install with Bun**

Run: `bun install`
Expected: lock file `bun.lockb` (or `bun.lock`) created. No peer dep errors. If conflict, switch that single dep to `npm install --save <pkg>` and document.

- [ ] **Step 4: Verify latest stable versions**

Run: `bun outdated`
Expected: no major version mismatches requiring upgrade. If Next 16+ exists, pin to `next@^15` explicitly.

- [ ] **Step 5: Create `tsconfig.json`**

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": false,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

- [ ] **Step 6: Create `next.config.ts`**

```ts
import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async headers() {
    return [{ source: "/(.*)", headers: securityHeaders }];
  },
};

export default nextConfig;
```

- [ ] **Step 7: Create `.gitignore`**

```
node_modules
.next
out
dist
.env*.local
.DS_Store
*.tsbuildinfo
bun.lockb
playwright-report
test-results
.lighthouseci
.superpowers/brainstorm
```

- [ ] **Step 8: Create stub `app/layout.tsx`**

```tsx
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Iqbal Attila — Web Dev Commission",
  description: "Rate card untuk jasa web development & frontend.",
  metadataBase: new URL("https://kcmon.id"),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
```

- [ ] **Step 9: Create stub `app/page.tsx`**

```tsx
export default function Home() {
  return <main>Hello</main>;
}
```

- [ ] **Step 10: Create stub `app/globals.css`**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

- [ ] **Step 11: Run dev server to verify**

Run: `bun run dev`
Expected: compiles, prints "Local: http://localhost:3000", no errors. Ctrl+C after verification.

- [ ] **Step 12: Commit**

```bash
git add .
git commit -m "chore: initialize Next.js 15 project with bun"
```

---

### Task 2: Configure Tailwind v4 with Obsidian Gold tokens

**Files:**
- Create: `tailwind.config.ts`
- Create: `postcss.config.mjs`
- Modify: `app/globals.css`

- [ ] **Step 1: Create `postcss.config.mjs`**

```js
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

- [ ] **Step 2: Create `tailwind.config.ts`**

```ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        canvas: "#0A0A0A",
        "surface-1": "#121212",
        "surface-2": "#181818",
        "surface-3": "#1F1F1F",
        "surface-4": "#282828",
        gold: "#C9A352",
        "gold-bright": "#E0BF6B",
        "gold-deep": "#8A6F2D",
        text: "#F0EDE7",
        "text-muted": "#A39F97",
        "text-dim": "#6E6A62",
        border: "#2A2A2A",
        "border-strong": "#3A3A3A",
        "border-gold": "#C9A352",
        signal: "#6CC3A6",
        alert: "#D27A6E",
        caution: "#D4A24A",
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      fontSize: {
        "display-xl": ["96px", { lineHeight: "0.95", letterSpacing: "-0.03em", fontWeight: "400" }],
        "display-lg": ["64px", { lineHeight: "1.0", letterSpacing: "-0.025em", fontWeight: "400" }],
        "headline-lg": ["56px", { lineHeight: "1.05", letterSpacing: "-0.02em", fontWeight: "400" }],
        "headline-md": ["32px", { lineHeight: "1.15", letterSpacing: "-0.015em", fontWeight: "500" }],
        "headline-sm": ["22px", { lineHeight: "1.3", letterSpacing: "-0.01em", fontWeight: "600" }],
        "body-lg": ["18px", { lineHeight: "1.6" }],
        "body-md": ["15px", { lineHeight: "1.55" }],
        "body-sm": ["13px", { lineHeight: "1.5" }],
        label: ["11px", { lineHeight: "1.4", letterSpacing: "0.15em", fontWeight: "500" }],
        "label-sm": ["10px", { lineHeight: "1.4", letterSpacing: "0.15em", fontWeight: "500" }],
        mono: ["13px", { lineHeight: "1.55" }],
      },
      spacing: {
        "r-1": "4px",
        "r-2": "8px",
        "r-3": "12px",
        "r-4": "16px",
        "r-5": "24px",
        "r-6": "32px",
        "r-7": "48px",
        "r-8": "64px",
        "r-9": "96px",
        "r-10": "128px",
      },
      transitionTimingFunction: {
        smooth: "cubic-bezier(0.4, 0, 0.2, 1)",
        "out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      transitionDuration: {
        fast: "150ms",
        medium: "250ms",
        slow: "400ms",
        slower: "700ms",
      },
      maxWidth: {
        container: "1280px",
      },
      screens: {
        xs: "480px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1440px",
      },
    },
  },
  plugins: [],
};

export default config;
```

- [ ] **Step 3: Replace `app/globals.css` with full tokens**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --font-display: "Fraunces", "Source Serif Pro", Georgia, serif;
    --font-sans: "Inter", system-ui, -apple-system, "Helvetica Neue", sans-serif;
    --font-mono: "JetBrains Mono", ui-monospace, "SF Mono", Consolas, monospace;

    --gold: #c9a352;
    --gold-bright: #e0bf6b;
    --gold-deep: #8a6f2d;
    --canvas: #0a0a0a;
    --surface-1: #121212;
    --surface-2: #181818;
    --text: #f0ede7;
    --text-muted: #a39f97;
    --border: #2a2a2a;
    --border-strong: #3a3a3a;
  }

  html {
    font-family: var(--font-sans);
    color: var(--text);
    background: var(--canvas);
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeLegibility;
  }

  body {
    min-height: 100vh;
  }

  ::selection {
    background: var(--gold);
    color: var(--canvas);
  }
}

@layer components {
  .btn {
    @apply inline-flex items-center justify-center font-mono uppercase tracking-[0.12em] text-label transition-colors duration-fast;
    padding: 12px 22px;
    border-radius: 4px;
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
  .btn-tertiary {
    border-bottom: 1px solid var(--gold);
    color: var(--text-muted);
  }
  .btn:focus-visible {
    outline: 2px solid var(--gold-bright);
    outline-offset: 2px;
  }

  .card {
    background: var(--surface-1);
    border: 1px solid var(--border);
    border-radius: 4px;
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

  .badge {
    @apply inline-flex items-center font-mono uppercase tracking-[0.1em] text-[10px] font-medium;
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
    border-color: #6cc3a6;
    color: #6cc3a6;
  }
  .badge-alert {
    border-color: #d27a6e;
    color: #d27a6e;
  }

  .gold-glow {
    background: radial-gradient(
      ellipse at 30% 40%,
      rgba(201, 163, 82, 0.08) 0%,
      transparent 60%
    );
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
    @apply font-mono uppercase tracking-[0.12em] text-[10px];
    color: var(--text-muted);
    margin-top: 6px;
  }
}

@layer utilities {
  .text-balance {
    text-wrap: balance;
  }
  .tnum {
    font-feature-settings: "tnum";
  }
}

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

- [ ] **Step 4: Verify dev compiles**

Run: `bun run dev`
Expected: no Tailwind errors, "Hello" page renders. Ctrl+C.

- [ ] **Step 5: Commit**

```bash
git add tailwind.config.ts postcss.config.mjs app/globals.css
git commit -m "feat: configure tailwind v4 with obsidian gold tokens"
```

---

### Task 3: Add fonts (next/font/local) + root layout polish

**Files:**
- Create: `public/fonts/.gitkeep`
- Modify: `app/layout.tsx`

- [ ] **Step 1: Download fonts (or skip if no internet at build time)**

Note: Download Fraunces, Inter, JetBrains Mono WOFF2 from Google Fonts CDN. Save to `public/fonts/`. Filenames:
- `Fraunces-400.woff2`, `Fraunces-500.woff2`
- `Inter-400.woff2`, `Inter-500.woff2`, `Inter-600.woff2`
- `JetBrainsMono-400.woff2`, `JetBrainsMono-500.woff2`

If manual download not possible, use `next/font/google` fallback (auto-downloads at build):

```ts
import { Fraunces, Inter, JetBrains_Mono } from "next/font/google";
```

- [ ] **Step 2: Update `app/layout.tsx`**

```tsx
import type { Metadata } from "next";
import { Fraunces, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-display",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-sans",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Iqbal Attila — Web Dev Commission",
  description: "Rate card untuk jasa web development & frontend oleh Iqbal Attila.",
  metadataBase: new URL("https://kcmon.id"),
  openGraph: {
    title: "Iqbal Attila — Web Dev Commission",
    description: "Rate card untuk jasa web development & frontend.",
    locale: "id_ID",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="id"
      className={`${fraunces.variable} ${inter.variable} ${jetbrains.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
```

- [ ] **Step 3: Verify dev compiles with fonts**

Run: `bun run dev`
Expected: page loads, fonts swap in, no 404s in network. Ctrl+C.

- [ ] **Step 4: Commit**

```bash
git add app/layout.tsx public/fonts/.gitkeep
git commit -m "feat: add fonts (Fraunces, Inter, JetBrains Mono)"
```

---

### Task 4: Create lib utilities (cn, whatsapp) with tests

**Files:**
- Create: `lib/cn.ts`
- Create: `lib/whatsapp.ts`
- Create: `tests/unit/cn.test.ts`
- Create: `tests/unit/whatsapp.test.ts`
- Create: `vitest.config.ts`

- [ ] **Step 1: Install cn dep (clsx + tailwind-merge)**

Run: `bun add clsx tailwind-merge`

- [ ] **Step 2: Create `vitest.config.ts`**

```ts
import { defineConfig } from "vitest/config";
import path from "node:path";

export default defineConfig({
  test: {
    environment: "happy-dom",
    globals: true,
  },
  resolve: {
    alias: { "@": path.resolve(__dirname, ".") },
  },
});
```

- [ ] **Step 3: Create `lib/cn.ts`**

```ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
```

- [ ] **Step 4: Create `tests/unit/cn.test.ts`**

```ts
import { describe, it, expect } from "vitest";
import { cn } from "@/lib/cn";

describe("cn", () => {
  it("merges classes", () => {
    expect(cn("px-4", "py-2")).toBe("px-4 py-2");
  });
  it("resolves conflicts (later wins)", () => {
    expect(cn("px-4", "px-8")).toBe("px-8");
  });
  it("handles falsy values", () => {
    expect(cn("px-4", false && "py-2", null, undefined)).toBe("px-4");
  });
  it("accepts array input", () => {
    expect(cn(["px-4", "py-2"])).toBe("px-4 py-2");
  });
});
```

- [ ] **Step 5: Run cn tests**

Run: `bun test tests/unit/cn.test.ts`
Expected: 4 passed.

- [ ] **Step 6: Create `lib/whatsapp.ts`**

```ts
const PHONE = "6281234567890"; // placeholder, user provides
const BASE = "https://wa.me/";

export interface WhatsAppLinkOptions {
  tier?: string;
  message?: string;
}

export function buildWhatsAppLink({ tier, message }: WhatsAppLinkOptions = {}): string {
  const text = message ?? defaultMessage(tier);
  return `${BASE}${PHONE}?text=${encodeURIComponent(text)}`;
}

export function defaultMessage(tier?: string): string {
  if (!tier) {
    return "Halo Iqbal, saya tertarik dengan jasa web development kamu.";
  }
  return `Halo Iqbal, saya tertarik dengan paket ${tier}. Boleh info lebih detail?`;
}

export const PHONE_NUMBER = PHONE;
```

Note: User replaces `PHONE` with real number before deploy.

- [ ] **Step 7: Create `tests/unit/whatsapp.test.ts`**

```ts
import { describe, it, expect } from "vitest";
import { buildWhatsAppLink, defaultMessage, PHONE_NUMBER } from "@/lib/whatsapp";

describe("buildWhatsAppLink", () => {
  it("builds link without tier", () => {
    const link = buildWhatsAppLink();
    expect(link).toBe(`https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent("Halo Iqbal, saya tertarik dengan jasa web development kamu.")}`);
  });

  it("builds link with tier", () => {
    const link = buildWhatsAppLink({ tier: "Pro" });
    expect(link).toContain(encodeURIComponent("paket Pro"));
  });

  it("builds link with custom message", () => {
    const link = buildWhatsAppLink({ message: "Custom msg" });
    expect(link).toContain(encodeURIComponent("Custom msg"));
  });

  it("encodes special characters", () => {
    const link = buildWhatsAppLink({ message: "Hello & world" });
    expect(link).toContain(encodeURIComponent("Hello & world"));
  });
});

describe("defaultMessage", () => {
  it("returns general message when no tier", () => {
    expect(defaultMessage()).toContain("web development");
  });
  it("includes tier name when provided", () => {
    expect(defaultMessage("Basic")).toContain("Basic");
  });
});
```

- [ ] **Step 8: Run whatsapp tests**

Run: `bun test tests/unit/whatsapp.test.ts`
Expected: 6 passed.

- [ ] **Step 9: Commit**

```bash
git add lib/ tests/unit/ vitest.config.ts
git commit -m "feat: add lib utilities (cn, whatsapp) with tests"
```

---

### Task 5: Create data layer (placeholder content)

**Files:**
- Create: `components/data/contact.ts`
- Create: `components/data/rateCard.ts`
- Create: `components/data/portfolio.ts`
- Create: `components/data/testimonials.ts`
- Create: `tests/unit/data-shape.test.ts`

- [ ] **Step 1: Install zod**

Run: `bun add zod`

- [ ] **Step 2: Create `components/data/contact.ts`**

```ts
export const WHATSAPP_NUMBER = "6281234567890"; // user replaces
export const WHATSAPP_BASE = "https://wa.me/";
export const CONTACT_EMAIL = "hello@kcmon.id";
export const SOCIAL = {
  github: "https://github.com/iqbalattila",
  linkedin: "https://linkedin.com/in/iqbalattila",
  instagram: "https://instagram.com/iqbal.attila",
} as const;
```

- [ ] **Step 3: Create `components/data/rateCard.ts`**

```ts
export interface RateTier {
  id: string;
  name: string;
  price: string;
  priceSuffix: string;
  description: string;
  features: string[];
  popular?: boolean;
  ctaLabel: string;
}

export const RATE_TIERS: RateTier[] = [
  {
    id: "basic",
    name: "Basic",
    price: "Rp 3.5jt",
    priceSuffix: "/ halaman",
    description: "Landing page statis, 1 halaman, copy + visual dasar.",
    features: [
      "1 halaman responsif",
      "Desain sesuai brand",
      "Animasi dasar",
      "Deploy ke Vercel",
      "Revisi 2x",
    ],
    ctaLabel: "Pesan Basic",
  },
  {
    id: "standard",
    name: "Standard",
    price: "Rp 7.5jt",
    priceSuffix: "/ 3 halaman",
    description: "Multi-halaman dengan komponen interaktif dan CMS ringan.",
    features: [
      "Hingga 3 halaman",
      "Komponen interaktif",
      "CMS markdown (opsional)",
      "SEO on-page",
      "Animasi Lenis + Framer",
      "Revisi 3x",
    ],
    ctaLabel: "Pesan Standard",
  },
  {
    id: "pro",
    name: "Pro",
    price: "Rp 15jt",
    priceSuffix: "/ proyek",
    description: "Web app full dengan backend API, auth, dan dashboard.",
    features: [
      "Hingga 8 halaman",
      "Backend API (Next.js Route Handlers)",
      "Auth & database",
      "Dashboard interaktif",
      "Test coverage 70%+",
      "Animasi orchestrated",
      "Revisi 5x",
    ],
    popular: true,
    ctaLabel: "Pesan Pro",
  },
  {
    id: "custom",
    name: "Custom",
    price: "Mulai Rp 25jt",
    priceSuffix: "/ proyek",
    description: "Spesifikasi khusus: e-commerce, SaaS, integrasi pihak ketiga.",
    features: [
      "Spesifikasi bebas",
      "Integrasi payment / API",
      "Maintenance 30 hari",
      "SLA dukungan",
      "Konsultasi dedicated",
    ],
    ctaLabel: "Konsultasi Custom",
  },
];
```

- [ ] **Step 4: Create `components/data/portfolio.ts`**

```ts
export interface Project {
  id: string;
  title: string;
  category: "Landing Page" | "Web App" | "Dashboard" | "E-commerce";
  description: string;
  tech: string[];
  imageGradient: [string, string];
  span: "lg" | "md" | "sm";
}

export const PROJECTS: Project[] = [
  {
    id: "p1",
    title: "SaaS Analytics Platform",
    category: "Web App",
    description: "Dashboard analytics real-time dengan chart interaktif.",
    tech: ["Next.js", "TypeScript", "Tailwind", "Recharts"],
    imageGradient: ["#1F1F1F", "#C9A352"],
    span: "lg",
  },
  {
    id: "p2",
    title: "E-commerce Storefront",
    category: "E-commerce",
    description: "Toko online dengan payment gateway lokal.",
    tech: ["Next.js", "Stripe", "Sanity CMS"],
    imageGradient: ["#282828", "#E0BF6B"],
    span: "md",
  },
  {
    id: "p3",
    title: "Brand Landing",
    category: "Landing Page",
    description: "Landing page untuk startup fintech.",
    tech: ["Next.js", "Framer Motion"],
    imageGradient: ["#121212", "#8A6F2D"],
    span: "md",
  },
  {
    id: "p4",
    title: "Internal CRM",
    category: "Dashboard",
    description: "CRM internal dengan role-based access.",
    tech: ["Next.js", "Prisma", "PostgreSQL"],
    imageGradient: ["#1F1F1F", "#C9A352"],
    span: "sm",
  },
  {
    id: "p5",
    title: "Portfolio Site",
    category: "Landing Page",
    description: "Portfolio personal dengan animasi orchestrated.",
    tech: ["Next.js", "Motion", "Lenis"],
    imageGradient: ["#282828", "#E0BF6B"],
    span: "sm",
  },
  {
    id: "p6",
    title: "Booking System",
    category: "Web App",
    description: "Sistem booking dengan kalender real-time.",
    tech: ["Next.js", "Supabase", "Tailwind"],
    imageGradient: ["#121212", "#C9A352"],
    span: "sm",
  },
];
```

- [ ] **Step 5: Create `components/data/testimonials.ts`**

```ts
export interface Testimonial {
  id: string;
  name: string;
  project: string;
  quote: string;
  initials: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    name: "Andi Wijaya",
    project: "SaaS Analytics Platform",
    quote: "Kerja cepat, komunikasi jelas, hasilnya di atas ekspektasi. Highly recommended untuk web app serius.",
    initials: "AW",
  },
  {
    id: "t2",
    name: "Sari Putri",
    project: "E-commerce Storefront",
    quote: "Animasi halusnya bikin toko online kami stand out. Konversi naik 23% dalam sebulan.",
    initials: "SP",
  },
  {
    id: "t3",
    name: "Budi Santoso",
    project: "Internal CRM",
    quote: "Code quality tinggi, test coverage bagus, dokumentasi lengkap. Tim internal kami bisa maintain dengan mudah.",
    initials: "BS",
  },
  {
    id: "t4",
    name: "Linda Maharani",
    project: "Brand Landing",
    quote: "Process dari brief sampai deploy mulus. Iqbal paham brand dan translate ke web dengan baik.",
    initials: "LM",
  },
  {
    id: "t5",
    name: "Reza Hidayat",
    project: "Booking System",
    quote: "Real-time features jalan sempurna. Performance score 98 di Lighthouse. Mantap.",
    initials: "RH",
  },
];
```

- [ ] **Step 6: Create `tests/unit/data-shape.test.ts`**

```ts
import { describe, it, expect } from "vitest";
import { RATE_TIERS } from "@/components/data/rateCard";
import { PROJECTS } from "@/components/data/portfolio";
import { TESTIMONIALS } from "@/components/data/testimonials";
import { WHATSAPP_NUMBER } from "@/components/data/contact";

describe("data shape", () => {
  it("rate tiers have required fields", () => {
    for (const tier of RATE_TIERS) {
      expect(tier.id).toBeTruthy();
      expect(tier.name).toBeTruthy();
      expect(tier.price).toBeTruthy();
      expect(tier.features.length).toBeGreaterThan(0);
    }
  });
  it("exactly one rate tier is popular", () => {
    const popular = RATE_TIERS.filter((t) => t.popular);
    expect(popular.length).toBe(1);
  });
  it("projects have required fields", () => {
    for (const p of PROJECTS) {
      expect(p.title).toBeTruthy();
      expect(p.tech.length).toBeGreaterThan(0);
      expect(["lg", "md", "sm"]).toContain(p.span);
    }
  });
  it("testimonials have required fields", () => {
    for (const t of TESTIMONIALS) {
      expect(t.name).toBeTruthy();
      expect(t.quote).toBeTruthy();
      expect(t.initials).toHaveLength(2);
    }
  });
  it("whatsapp number is digits only", () => {
    expect(/^\d+$/.test(WHATSAPP_NUMBER)).toBe(true);
  });
});
```

- [ ] **Step 7: Run data shape tests**

Run: `bun test tests/unit/data-shape.test.ts`
Expected: 5 passed.

- [ ] **Step 8: Commit**

```bash
git add components/data/ tests/unit/data-shape.test.ts
git commit -m "feat: add data layer with placeholder content"
```

---

## Phase 2: Motion + UI primitives (Tasks 6-10)

### Task 6: Create motion primitives (FadeUp, Stagger)

**Files:**
- Create: `components/motion/FadeUp.tsx`
- Create: `components/motion/Stagger.tsx`

- [ ] **Step 1: Create `components/motion/FadeUp.tsx`**

```tsx
"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

interface FadeUpProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "section" | "article";
}

export function FadeUp({ children, delay = 0, className, as = "div" }: FadeUpProps) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as];

  if (reduce) {
    return <MotionTag className={className}>{children}</MotionTag>;
  }

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay }}
    >
      {children}
    </MotionTag>
  );
}
```

- [ ] **Step 2: Create `components/motion/Stagger.tsx`**

```tsx
"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

interface StaggerProps {
  children: ReactNode;
  className?: string;
  delayChildren?: number;
  staggerChildren?: number;
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      delayChildren: 0.1,
      staggerChildren: 0.06,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};

export function Stagger({ children, className }: StaggerProps) {
  const reduce = useReducedMotion();
  if (reduce) {
    return <div className={className}>{children}</div>;
  }
  return (
    <motion.div
      className={className}
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div className={className} variants={item}>
      {children}
    </motion.div>
  );
}
```

- [ ] **Step 3: Verify dev compiles**

Run: `bun run dev`
Expected: no errors. Ctrl+C.

- [ ] **Step 4: Commit**

```bash
git add components/motion/
git commit -m "feat: add motion primitives (FadeUp, Stagger)"
```

---

### Task 7: Create SmoothScroll (Lenis) provider

**Files:**
- Create: `components/motion/SmoothScroll.tsx`
- Modify: `app/layout.tsx`

- [ ] **Step 1: Create `components/motion/SmoothScroll.tsx`**

```tsx
"use client";

import { ReactLenis } from "lenis/react";
import type { ReactNode } from "react";

export function SmoothScroll({ children }: { children: ReactNode }) {
  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 1.2 }}>{children}</ReactLenis>
  );
}
```

- [ ] **Step 2: Update `app/layout.tsx` to wrap with SmoothScroll**

Modify the body section:

```tsx
<body>
  <SmoothScroll>{children}</SmoothScroll>
</body>
```

Add import at top:

```tsx
import { SmoothScroll } from "@/components/motion/SmoothScroll";
```

- [ ] **Step 3: Verify dev compiles**

Run: `bun run dev`
Expected: smooth scroll active, no errors. Ctrl+C.

- [ ] **Step 4: Commit**

```bash
git add components/motion/SmoothScroll.tsx app/layout.tsx
git commit -m "feat: add Lenis smooth scroll provider"
```

---

### Task 8: Create UI primitives (Button, Card, Badge, SectionHeading)

**Files:**
- Create: `components/ui/Button.tsx`
- Create: `components/ui/Card.tsx`
- Create: `components/ui/Badge.tsx`
- Create: `components/ui/SectionHeading.tsx`
- Create: `tests/component/Button.test.tsx`
- Create: `tests/component/Card.test.tsx`

- [ ] **Step 1: Create `components/ui/Button.tsx`**

```tsx
import { forwardRef, type ButtonHTMLAttributes, type AnchorHTMLAttributes, type ReactNode } from "react";
import Link from "next/link";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "tertiary";
type Size = "default" | "large";

interface BaseProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
}

type ButtonProps = BaseProps & ButtonHTMLAttributes<HTMLButtonElement> & { href?: never };
type LinkProps = BaseProps & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

const variantClass: Record<Variant, string> = {
  primary: "btn-primary",
  secondary: "btn-secondary",
  tertiary: "btn-tertiary",
};

const sizeClass: Record<Size, string> = {
  default: "",
  large: "px-7 py-3.5",
};

export const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps | LinkProps>(
  function Button({ variant = "primary", size = "default", className, children, ...rest }, ref) {
    const classes = cn("btn", variantClass[variant], sizeClass[size], className);
    if ("href" in rest && rest.href) {
      const { href, ...anchorRest } = rest as LinkProps;
      const isExternal = href.startsWith("http") || href.startsWith("wa.me");
      if (isExternal) {
        return (
          <a
            ref={ref as React.Ref<HTMLAnchorElement>}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={classes}
            {...anchorRest}
          >
            {children}
          </a>
        );
      }
      return (
        <Link href={href} className={classes} {...anchorRest}>
          {children}
        </Link>
      );
    }
    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        className={classes}
        {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}
      >
        {children}
      </button>
    );
  }
);
```

- [ ] **Step 2: Create `components/ui/Card.tsx`**

```tsx
import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

export function Card({ className, children, ...rest }: HTMLAttributes<HTMLDivElement> & { children: ReactNode }) {
  return (
    <div className={cn("card p-6 md:p-8", className)} {...rest}>
      {children}
    </div>
  );
}
```

- [ ] **Step 3: Create `components/ui/Badge.tsx`**

```tsx
import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "default" | "gold" | "signal" | "alert";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: Variant;
  children: ReactNode;
}

const variantClass: Record<Variant, string> = {
  default: "",
  gold: "badge-gold",
  signal: "badge-signal",
  alert: "badge-alert",
};

export function Badge({ variant = "default", className, children, ...rest }: BadgeProps) {
  return (
    <span className={cn("badge", variantClass[variant], className)} {...rest}>
      {children}
    </span>
  );
}
```

- [ ] **Step 4: Create `components/ui/SectionHeading.tsx`**

```tsx
import { cn } from "@/lib/cn";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  italicWord?: string;
  subtitle?: string;
  className?: string;
  id?: string;
}

export function SectionHeading({ eyebrow, title, italicWord, subtitle, className, id }: SectionHeadingProps) {
  const renderTitle = () => {
    if (!italicWord) return title;
    const idx = title.toLowerCase().indexOf(italicWord.toLowerCase());
    if (idx === -1) return title;
    const before = title.slice(0, idx);
    const after = title.slice(idx + italicWord.length);
    return (
      <>
        {before}
        <em className="not-italic font-light" style={{ color: "var(--gold)" }}>{italicWord}</em>
        {after}
      </>
    );
  };

  return (
    <header className={cn("mb-12 md:mb-16", className)}>
      <div className="flex items-center gap-4 mb-6">
        <div className="h-px w-8 bg-gold" />
        <span className="font-mono uppercase tracking-[0.15em] text-label text-text-muted">{eyebrow}</span>
      </div>
      <h2 id={id} className="text-headline-md md:text-headline-lg font-display text-text">
        {renderTitle()}
      </h2>
      {subtitle && <p className="mt-4 text-body-lg text-text-muted max-w-2xl">{subtitle}</p>}
    </header>
  );
}
```

- [ ] **Step 5: Create `tests/component/Button.test.tsx`**

```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Button } from "@/components/ui/Button";

describe("Button", () => {
  it("renders primary variant", () => {
    render(<Button>Click me</Button>);
    const btn = screen.getByRole("button", { name: /click me/i });
    expect(btn).toHaveClass("btn-primary");
  });
  it("renders secondary variant", () => {
    render(<Button variant="secondary">Click me</Button>);
    expect(screen.getByRole("button")).toHaveClass("btn-secondary");
  });
  it("renders as link with external URL", () => {
    render(<Button href="https://wa.me/123">WhatsApp</Button>);
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });
  it("renders as internal link", () => {
    render(<Button href="/section">Go</Button>);
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/section");
  });
});
```

- [ ] **Step 6: Create `tests/component/Card.test.tsx`**

```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Card } from "@/components/ui/Card";

describe("Card", () => {
  it("renders children", () => {
    render(<Card>Content</Card>);
    expect(screen.getByText("Content")).toBeInTheDocument();
  });
  it("has card class with top gold-line via ::before", () => {
    const { container } = render(<Card>X</Card>);
    const card = container.firstChild as HTMLElement;
    expect(card).toHaveClass("card");
  });
});
```

- [ ] **Step 7: Run component tests**

Run: `bun test tests/component/`
Expected: 6 passed.

- [ ] **Step 8: Commit**

```bash
git add components/ui/ tests/component/
git commit -m "feat: add UI primitives (Button, Card, Badge, SectionHeading)"
```

---

## Phase 3: Section components (Tasks 9-17)

### Task 9: Create Nav component

**Files:**
- Create: `components/sections/Nav.tsx`

- [ ] **Step 1: Create `components/sections/Nav.tsx`**

```tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { Button } from "@/components/ui/Button";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { cn } from "@/lib/cn";

const NAV_LINKS = [
  { label: "Services", href: "#services" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Rate Card", href: "#rate-card" },
  { label: "FAQ", href: "#faq" },
];

export function Nav() {
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md"
      style={{ background: "rgba(10, 10, 10, 0.8)", borderBottom: "1px solid var(--border)" }}
      aria-label="Main navigation"
    >
      <div className="max-w-container mx-auto px-4 md:px-6 lg:px-12 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="font-display text-xl text-text hover:text-gold transition-colors"
          aria-label="Iqbal Attila home"
        >
          IA<span className="text-gold">.</span>
        </Link>

        <ul className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="font-mono uppercase text-label text-text-muted hover:text-gold transition-colors"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden md:block">
          <Button
            href={buildWhatsAppLink({ message: "Halo Iqbal, saya ingin diskusi proyek." })}
            size="default"
            className="text-[10px]"
          >
            Hubungi
          </Button>
        </div>

        <button
          type="button"
          className="md:hidden p-2 text-text hover:text-gold"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={reduce ? false : { opacity: 0, height: 0 }}
            animate={reduce ? undefined : { opacity: 1, height: "auto" }}
            exit={reduce ? undefined : { opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
            className="md:hidden overflow-hidden"
            style={{ background: "var(--canvas)", borderTop: "1px solid var(--border)" }}
          >
            <ul className="px-4 py-6 space-y-4">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={cn("block font-mono uppercase text-label text-text-muted hover:text-gold")}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li className="pt-2">
                <Button
                  href={buildWhatsAppLink({ message: "Halo Iqbal, saya ingin diskusi proyek." })}
                  className="w-full"
                >
                  Hubungi via WhatsApp
                </Button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
```

- [ ] **Step 2: Verify dev compiles**

Run: `bun run dev`
Expected: nav visible at top, mobile menu toggle works. Ctrl+C.

- [ ] **Step 3: Commit**

```bash
git add components/sections/Nav.tsx
git commit -m "feat: add Nav with mobile drawer"
```

---

### Task 10: Create Hero section

**Files:**
- Create: `components/sections/Hero.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: Create `components/sections/Hero.tsx`**

```tsx
"use client";

import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { buildWhatsAppLink } from "@/lib/whatsapp";

const SIDEBAR_ROWS = [
  { label: "Status", value: "Available · Q3 2026" },
  { label: "Response", value: "< 24h" },
  { label: "Location", value: "Jakarta / Remote" },
  { label: "Timezone", value: "GMT+7" },
];

const headlineWords = ["Membangun", "web", "yang", "berfungsi,", "tampak", "tajam,", "dan", "tetap", "responsif."];

export function Hero() {
  const reduce = useReducedMotion();

  return (
    <section
      className="relative min-h-screen flex items-center pt-24 pb-16 px-4 md:px-6 lg:px-12 overflow-hidden"
      aria-labelledby="hero-heading"
    >
      <div className="absolute inset-0 gold-glow pointer-events-none" aria-hidden="true" />

      <motion.div
        className="absolute top-20 right-10 w-72 h-72 rounded-full opacity-20 pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(201,163,82,0.4) 0%, transparent 70%)" }}
        animate={reduce ? undefined : { y: [0, -20, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden="true"
      />

      <div className="relative max-w-container mx-auto w-full grid lg:grid-cols-[1fr_280px] gap-12 items-center">
        <div>
          <motion.h1
            id="hero-heading"
            className="text-[56px] sm:text-7xl lg:text-display-xl font-display text-text text-balance"
            initial={reduce ? false : "hidden"}
            animate="show"
            variants={{
              hidden: { opacity: 0 },
              show: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.2 } },
            }}
          >
            {headlineWords.map((word, i) => {
              const isItalic = word === "tajam,";
              return (
                <motion.span
                  key={i}
                  className="inline-block mr-3"
                  variants={{
                    hidden: { opacity: 0, y: 30 },
                    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
                  }}
                >
                  {isItalic ? (
                    <em className="font-light not-italic" style={{ color: "var(--gold)" }}>
                      {word}
                    </em>
                  ) : (
                    word
                  )}
                </motion.span>
              );
            })}
          </motion.h1>

          <motion.p
            className="mt-8 text-body-lg text-text-muted max-w-2xl"
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={reduce ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0, ease: [0.16, 1, 0.3, 1] }}
          >
            Saya Iqbal Attila. Web developer yang fokus pada landing page dan web app dengan animasi presisi,
            performance tinggi, dan craft yang terukur.
          </motion.p>

          <motion.div
            className="mt-10 flex flex-col sm:flex-row gap-4"
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={reduce ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <Button href="#rate-card">
              Lihat Rate Card <ArrowRight size={14} className="ml-2" />
            </Button>
            <Button
              variant="secondary"
              href={buildWhatsAppLink({ message: "Halo Iqbal, saya mau konsultasi gratis." })}
            >
              Konsultasi Gratis
            </Button>
          </motion.div>
        </div>

        <motion.aside
          className="hidden lg:block p-6 rounded border"
          style={{ background: "var(--surface-1)", borderColor: "var(--border)" }}
          initial={reduce ? false : { opacity: 0, x: 20 }}
          animate={reduce ? undefined : { opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          aria-label="Availability metadata"
        >
          <h2 className="font-mono uppercase text-label text-gold mb-4">Spec</h2>
          <dl className="space-y-3">
            {SIDEBAR_ROWS.map((row) => (
              <div key={row.label} className="flex justify-between gap-4 text-mono">
                <dt className="text-text-dim">{row.label}</dt>
                <dd className="text-text text-right">{row.value}</dd>
              </div>
            ))}
          </dl>
        </motion.aside>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={reduce ? false : { opacity: 0 }}
        animate={reduce ? undefined : { opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        aria-hidden="true"
      >
        <motion.div
          animate={reduce ? undefined : { y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-text-dim">Scroll</span>
          <ChevronDown size={16} className="text-gold" />
        </motion.div>
      </motion.div>
    </section>
  );
}
```

- [ ] **Step 2: Update `app/page.tsx` to mount Hero + Nav**

```tsx
import { Nav } from "@/components/sections/Nav";
import { Hero } from "@/components/sections/Hero";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
      </main>
    </>
  );
}
```

- [ ] **Step 3: Verify dev compiles + visual check**

Run: `bun run dev`
Expected: Hero renders, headline animates in, sidebar visible on desktop, scroll indicator pulses. Ctrl+C.

- [ ] **Step 4: Commit**

```bash
git add components/sections/Hero.tsx app/page.tsx
git commit -m "feat: add Hero with orchestrated reveal animation"
```

---

### Task 11: Create Services section

**Files:**
- Create: `components/sections/Services.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: Create `components/sections/Services.tsx`**

```tsx
"use client";

import { Code2, Layout, Wrench, Sparkles } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { Card } from "@/components/ui/Card";

const SERVICES = [
  {
    icon: Layout,
    title: "Landing Page",
    description: "One-page high-converting dengan animasi presisi dan performance tinggi.",
  },
  {
    icon: Code2,
    title: "Web App",
    description: "Full-stack app dengan auth, API, dashboard, dan interaksi real-time.",
  },
  {
    icon: Sparkles,
    title: "UI/UX Implementation",
    description: "Translate Figma ke kode yang presisi dengan attention ke micro-detail.",
  },
  {
    icon: Wrench,
    title: "Maintenance",
    description: "Update konten, fix bug, performance audit untuk project existing.",
  },
];

export function Services() {
  return (
    <section id="services" className="py-24 md:py-32 px-4 md:px-6 lg:px-12" aria-labelledby="services-heading">
      <div className="max-w-container mx-auto">
        <SectionHeading
          eyebrow="Services"
          title="Apa yang saya kerjakan"
          italicWord="kerjakan"
          id="services-heading"
        />
        <Stagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES.map((s) => {
            const Icon = s.icon;
            return (
              <StaggerItem key={s.title}>
                <Card className="h-full hover:border-gold transition-colors duration-fast group">
                  <Icon size={28} className="text-gold mb-4 transition-transform group-hover:rotate-3" aria-hidden="true" />
                  <h3 className="font-sans text-headline-sm text-text mb-2">{s.title}</h3>
                  <p className="text-body-sm text-text-muted">{s.description}</p>
                </Card>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Mount in `app/page.tsx`**

Add import + place after Hero:

```tsx
import { Services } from "@/components/sections/Services";
// ...
<main>
  <Hero />
  <Services />
</main>
```

- [ ] **Step 3: Verify**

Run: `bun run dev`
Expected: 4 service tiles render, stagger animation on scroll. Ctrl+C.

- [ ] **Step 4: Commit**

```bash
git add components/sections/Services.tsx app/page.tsx
git commit -m "feat: add Services section with stagger reveal"
```

---

### Task 12: Create Portfolio section (bento + modal)

**Files:**
- Create: `components/sections/Portfolio.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: Create `components/sections/Portfolio.tsx`**

```tsx
"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PROJECTS, type Project } from "@/components/data/portfolio";
import { cn } from "@/lib/cn";

const SPAN_CLASS: Record<Project["span"], string> = {
  lg: "lg:col-span-2 lg:row-span-2",
  md: "lg:col-span-1 lg:row-span-2",
  sm: "lg:col-span-1",
};

export function Portfolio() {
  const [active, setActive] = useState<Project | null>(null);
  const reduce = useReducedMotion();

  return (
    <section
      id="portfolio"
      className="py-24 md:py-32 px-4 md:px-6 lg:px-12"
      aria-labelledby="portfolio-heading"
    >
      <div className="max-w-container mx-auto">
        <SectionHeading
          eyebrow="Portfolio"
          title="Hasil kerja pilihan"
          italicWord="pilihan"
          id="portfolio-heading"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {PROJECTS.map((p, i) => (
            <motion.button
              key={p.id}
              type="button"
              onClick={() => setActive(p)}
              className={cn(
                "group relative h-48 lg:h-64 rounded border overflow-hidden text-left",
                "transition-transform duration-medium hover:scale-[1.02]",
                SPAN_CLASS[p.span]
              )}
              style={{
                background: `linear-gradient(135deg, ${p.imageGradient[0]} 0%, ${p.imageGradient[1]} 100%)`,
                borderColor: "var(--border)",
              }}
              initial={reduce ? false : { opacity: 0, y: 20 }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
              aria-label={`Lihat detail ${p.title}`}
            >
              <div className="absolute inset-0 p-6 flex flex-col justify-end bg-gradient-to-t from-canvas/90 to-transparent">
                <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-gold mb-1">
                  {p.category}
                </span>
                <h3 className="font-display text-headline-sm text-text">{p.title}</h3>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            className="fixed inset-0 z-[60] flex items-center justify-center p-4"
            initial={reduce ? false : { opacity: 0 }}
            animate={reduce ? undefined : { opacity: 1 }}
            exit={reduce ? undefined : { opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setActive(null)}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            <div className="absolute inset-0 bg-canvas/90" aria-hidden="true" />
            <motion.div
              className="relative max-w-2xl w-full p-8 rounded border max-h-[90vh] overflow-auto"
              style={{ background: "var(--surface-1)", borderColor: "var(--border-gold)" }}
              initial={reduce ? false : { opacity: 0, y: 20, scale: 0.95 }}
              animate={reduce ? undefined : { opacity: 1, y: 0, scale: 1 }}
              exit={reduce ? undefined : { opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setActive(null)}
                className="absolute top-4 right-4 p-2 text-text-muted hover:text-gold"
                aria-label="Close modal"
              >
                <X size={20} />
              </button>
              <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-gold">
                {active.category}
              </span>
              <h3 id="modal-title" className="mt-2 font-display text-headline-md text-text">
                {active.title}
              </h3>
              <p className="mt-4 text-body-md text-text-muted">{active.description}</p>
              <div className="mt-6 pt-6 border-t" style={{ borderColor: "var(--border)" }}>
                <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-text-dim">
                  Tech Stack
                </span>
                <ul className="mt-2 flex flex-wrap gap-2">
                  {active.tech.map((t) => (
                    <li key={t} className="badge">{t}</li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
```

- [ ] **Step 2: Mount in `app/page.tsx`**

Add import + place after Services:

```tsx
import { Portfolio } from "@/components/sections/Portfolio";
// ...
<Portfolio />
```

- [ ] **Step 3: Verify modal works**

Run: `bun run dev`
Expected: bento grid renders, click card → modal opens with focus, Esc-like close via X or backdrop click. Ctrl+C.

- [ ] **Step 4: Commit**

```bash
git add components/sections/Portfolio.tsx app/page.tsx
git commit -m "feat: add Portfolio bento grid with modal"
```

---

### Task 13: Create LiveDemo section

**Files:**
- Create: `components/sections/LiveDemo.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: Create `components/sections/LiveDemo.tsx`**

```tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/cn";

const DEMOS = [
  { id: "saas", label: "SaaS", color: "from-surface-3 to-gold" },
  { id: "ecom", label: "E-commerce", color: "from-surface-3 to-gold-bright" },
  { id: "port", label: "Portfolio", color: "from-surface-3 to-gold-deep" },
];

export function LiveDemo() {
  const [active, setActive] = useState(DEMOS[0].id);
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const rotate = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, -2]);

  return (
    <section
      id="live-demo"
      className="py-24 md:py-32 px-4 md:px-6 lg:px-12"
      aria-labelledby="live-demo-heading"
    >
      <div className="max-w-container mx-auto">
        <SectionHeading
          eyebrow="Live Demo"
          title="Lihat kodenya sendiri"
          italicWord="sendiri"
          subtitle="Mock browser dengan 3 project pilihan. Klik tab untuk switch."
          id="live-demo-heading"
        />

        <div
          ref={ref}
          className="flex flex-col items-center"
        >
          <div
            className="flex gap-2 mb-6"
            role="tablist"
            aria-label="Demo projects"
          >
            {DEMOS.map((d) => (
              <button
                key={d.id}
                type="button"
                role="tab"
                aria-selected={active === d.id}
                onClick={() => setActive(d.id)}
                className={cn(
                  "btn btn-tertiary",
                  active === d.id && "text-gold"
                )}
              >
                {d.label}
              </button>
            ))}
          </div>

          <motion.div
            className="w-full max-w-3xl rounded border overflow-hidden"
            style={{ background: "var(--surface-1)", borderColor: "var(--border)" }}
            style_={{ rotate }}
            style={{ rotate }}
          >
            <div
              className="h-8 flex items-center gap-1.5 px-3 border-b"
              style={{ background: "var(--surface-2)", borderColor: "var(--border)" }}
            >
              <span className="w-2.5 h-2.5 rounded-full bg-alert" aria-hidden="true" />
              <span className="w-2.5 h-2.5 rounded-full bg-caution" aria-hidden="true" />
              <span className="w-2.5 h-2.5 rounded-full bg-signal" aria-hidden="true" />
            </div>

            <div className="relative aspect-video overflow-hidden">
              <AnimatePresence mode="wait">
                {DEMOS.filter((d) => d.id === active).map((d) => (
                  <motion.div
                    key={d.id}
                    initial={reduce ? false : { opacity: 0, x: 30 }}
                    animate={reduce ? undefined : { opacity: 1, x: 0 }}
                    exit={reduce ? undefined : { opacity: 0, x: -30 }}
                    transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                    className={cn("absolute inset-0 bg-gradient-to-br p-8", d.color)}
                  >
                    <div className="font-mono text-xs text-text-dim mb-2">{`// demo/${d.id}.tsx`}</div>
                    <pre className="font-mono text-sm text-text-muted leading-relaxed">
{`export default function ${d.label.replace(/[^a-z]/gi, "")}() {
  return (
    <div className="container">
      <Header />
      <Hero />
      <Features />
    </div>
  );
}`}
                    </pre>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
```

Note: I had a duplicate `style` prop. Remove the erroneous one:

```tsx
<motion.div
  className="w-full max-w-3xl rounded border overflow-hidden"
  style={{ background: "var(--surface-1)", borderColor: "var(--border)", rotate }}
>
```

- [ ] **Step 2: Mount in `app/page.tsx`**

```tsx
import { LiveDemo } from "@/components/sections/LiveDemo";
// ...
<LiveDemo />
```

- [ ] **Step 3: Verify**

Run: `bun run dev`
Expected: browser frame renders, tabs switch, code visible, device frame tilts slightly on scroll. Ctrl+C.

- [ ] **Step 4: Commit**

```bash
git add components/sections/LiveDemo.tsx app/page.tsx
git commit -m "feat: add LiveDemo with mock browser and tabs"
```

---

### Task 14: Create Testimonials carousel

**Files:**
- Create: `components/sections/Testimonials.tsx`
- Modify: `app/page.tsx`
- Create: `tests/component/Testimonials.test.tsx`

- [ ] **Step 1: Install embla-carousel-react (or use plain drag)**

Run: `bun add embla-carousel-react`

- [ ] **Step 2: Create `components/sections/Testimonials.tsx`**

```tsx
"use client";

import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TESTIMONIALS } from "@/components/data/testimonials";
import { cn } from "@/lib/cn";

export function Testimonials() {
  const reduce = useReducedMotion();
  const [emblaRef, embla] = useEmblaCarousel({
    loop: true,
    align: "start",
    skipSnaps: false,
  });
  const [selected, setSelected] = useState(0);

  const onSelect = useCallback(() => {
    if (!embla) return;
    setSelected(embla.selectedScrollSnap());
  }, [embla]);

  useEffect(() => {
    if (!embla) return;
    onSelect();
    embla.on("select", onSelect);
    return () => {
      embla.off("select", onSelect);
    };
  }, [embla, onSelect]);

  useEffect(() => {
    if (!embla || reduce) return;
    const id = setInterval(() => embla.scrollNext(), 5000);
    return () => clearInterval(id);
  }, [embla, reduce]);

  return (
    <section
      id="testimonials"
      className="py-24 md:py-32 px-4 md:px-6 lg:px-12"
      aria-labelledby="testimonials-heading"
      aria-roledescription="carousel"
    >
      <div className="max-w-container mx-auto">
        <SectionHeading
          eyebrow="Testimonials"
          title="Apa kata mereka"
          italicWord="mereka"
          id="testimonials-heading"
        />

        <div
          className="overflow-hidden"
          ref={emblaRef}
          aria-live="polite"
        >
          <div className="flex gap-6">
            {TESTIMONIALS.map((t) => (
              <article
                key={t.id}
                className="card p-6 md:p-8 flex-[0_0_100%] md:flex-[0_0_calc(50%-12px)] lg:flex-[0_0_calc(33.333%-16px)]"
                aria-roledescription="slide"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center font-mono text-xs"
                    style={{ background: "var(--surface-3)", color: "var(--gold)", border: "1px solid var(--border-gold)" }}
                    aria-hidden="true"
                  >
                    {t.initials}
                  </div>
                  <div>
                    <p className="font-sans text-body-sm text-text">{t.name}</p>
                    <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-text-dim">{t.project}</p>
                  </div>
                </div>
                <blockquote className="text-body-md text-text-muted leading-relaxed">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
              </article>
            ))}
          </div>
        </div>

        <div className="flex justify-center gap-2 mt-8" role="tablist" aria-label="Testimonial slides">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={selected === i}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => embla?.scrollTo(i)}
              className={cn(
                "h-1 transition-all",
                selected === i ? "w-8 bg-gold" : "w-4 bg-border"
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Mount in `app/page.tsx`**

```tsx
import { Testimonials } from "@/components/sections/Testimonials";
// ...
<Testimonials />
```

- [ ] **Step 4: Create `tests/component/Testimonials.test.tsx`**

```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Testimonials } from "@/components/sections/Testimonials";

describe("Testimonials", () => {
  it("renders section with heading", () => {
    render(<Testimonials />);
    expect(screen.getByRole("heading", { name: /apa kata mereka/i })).toBeInTheDocument();
  });
  it("renders all testimonials", () => {
    render(<Testimonials />);
    const slides = screen.getAllByRole("article");
    expect(slides.length).toBe(5);
  });
  it("has carousel role", () => {
    render(<Testimonials />);
    expect(screen.getByRole("region", { name: /testimonials/i })).toHaveAttribute("aria-roledescription", "carousel");
  });
});
```

Note: section has implicit role region when labelled. Adjust if needed.

- [ ] **Step 5: Run tests**

Run: `bun test tests/component/Testimonials.test.tsx`
Expected: 3 passed.

- [ ] **Step 6: Commit**

```bash
git add components/sections/Testimonials.tsx app/page.tsx tests/component/Testimonials.test.tsx
git commit -m "feat: add Testimonials carousel with autoplay"
```

---

### Task 15: Create RateCard section

**Files:**
- Create: `components/sections/RateCard.tsx`
- Create: `tests/component/RateCard.test.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: Create `components/sections/RateCard.tsx`**

```tsx
"use client";

import { Check } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { RATE_TIERS } from "@/components/data/rateCard";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { cn } from "@/lib/cn";

export function RateCard() {
  const reduce = useReducedMotion();

  return (
    <section
      id="rate-card"
      className="py-24 md:py-32 px-4 md:px-6 lg:px-12"
      aria-labelledby="rate-card-heading"
    >
      <div className="max-w-container mx-auto">
        <SectionHeading
          eyebrow="Rate Card"
          title="Pilih paket yang sesuai"
          italicWord="sesuai"
          subtitle="Harga transparan, tidak ada hidden cost. Klik untuk mulai via WhatsApp."
          id="rate-card-heading"
        />

        <Stagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {RATE_TIERS.map((tier) => (
            <StaggerItem key={tier.id}>
              <motion.div
                className={cn(
                  "card p-6 md:p-8 h-full flex flex-col relative",
                  tier.popular && "ring-2 ring-gold"
                )}
                animate={
                  tier.popular && !reduce
                    ? { boxShadow: ["0 0 0 0 rgba(201,163,82,0)", "0 0 0 8px rgba(201,163,82,0.1)", "0 0 0 0 rgba(201,163,82,0)"] }
                    : undefined
                }
                transition={{ duration: 2.5, repeat: Infinity }}
                whileHover={reduce ? undefined : { y: -4 }}
              >
                {tier.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge variant="gold">Popular</Badge>
                  </div>
                )}

                <h3 className="font-sans text-headline-sm text-text">{tier.name}</h3>
                <p className="mt-2 text-body-sm text-text-muted min-h-[3em]">{tier.description}</p>

                <div className="mt-6 pb-6 border-b" style={{ borderColor: "var(--border)" }}>
                  <div className="flex items-baseline gap-2">
                    <span className="font-display text-display-lg text-text tnum">{tier.price}</span>
                    <span className="text-body-sm text-text-dim">{tier.priceSuffix}</span>
                  </div>
                </div>

                <ul className="mt-6 space-y-3 flex-1">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-body-sm text-text-muted">
                      <Check size={16} className="text-gold flex-shrink-0 mt-0.5" aria-hidden="true" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8">
                  <Button
                    href={buildWhatsAppLink({ tier: tier.name })}
                    variant={tier.popular ? "primary" : "secondary"}
                    className="w-full"
                  >
                    {tier.ctaLabel}
                  </Button>
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Mount in `app/page.tsx`**

```tsx
import { RateCard } from "@/components/sections/RateCard";
// ...
<RateCard />
```

- [ ] **Step 3: Create `tests/component/RateCard.test.tsx`**

```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { RateCard } from "@/components/sections/RateCard";
import { RATE_TIERS } from "@/components/data/rateCard";
import { PHONE_NUMBER } from "@/lib/whatsapp";

describe("RateCard", () => {
  it("renders all tiers", () => {
    render(<RateCard />);
    for (const tier of RATE_TIERS) {
      expect(screen.getByText(tier.name)).toBeInTheDocument();
    }
  });
  it("renders WhatsApp CTA with tier name in URL", () => {
    render(<RateCard />);
    const proLinks = screen.getAllByRole("link").filter((l) =>
      l.getAttribute("href")?.includes("wa.me")
    );
    expect(proLinks.length).toBeGreaterThan(0);
    const basicLink = proLinks.find((l) => l.getAttribute("href")?.includes(encodeURIComponent("Basic")));
    expect(basicLink).toBeDefined();
  });
  it("marks popular tier with Popular badge", () => {
    render(<RateCard />);
    expect(screen.getByText("Popular")).toBeInTheDocument();
  });
});
```

- [ ] **Step 4: Run tests**

Run: `bun test tests/component/RateCard.test.tsx`
Expected: 3 passed.

- [ ] **Step 5: Commit**

```bash
git add components/sections/RateCard.tsx tests/component/RateCard.test.tsx app/page.tsx
git commit -m "feat: add RateCard with WhatsApp CTAs and Popular pulse"
```

---

### Task 16: Create FAQ + CTA + Footer sections

**Files:**
- Create: `components/sections/FAQ.tsx`
- Create: `components/sections/CTA.tsx`
- Create: `components/sections/Footer.tsx`
- Create: `tests/component/FAQ.test.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: Create `components/sections/FAQ.tsx`**

```tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { Plus } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/cn";

const FAQS = [
  {
    q: "Berapa lama pengerjaan?",
    a: "Landing page 2-3 minggu. Web app 4-8 minggu tergantung kompleksitas. Custom project diestimasi setelah discovery call.",
  },
  {
    q: "Bagaimana sistem pembayaran?",
    a: "50% di muka untuk mulai, 50% setelah deploy. Untuk project besar bisa dicicil 3 tahap: kickoff, mid-project, delivery.",
  },
  {
    q: "Apakah include maintenance?",
    a: "Paket Pro dan Custom include 30 hari maintenance gratis. Paket Standard include 14 hari. Setelah itu bisa extend per bulan.",
  },
  {
    q: "Bisa pakai CMS?",
    a: "Bisa. Saya pakai Sanity, Contentlayer, atau MDX. Tergantung kebutuhan dan preferensi tim kamu.",
  },
  {
    q: "Bagaimana kalau saya tidak punya desain?",
    a: "Tidak masalah. Saya bisa mulai dari wireframe atau langsung ke high-fidelity mockup di Figma, lalu implement.",
  },
  {
    q: "Revisi berapa kali?",
    a: "Tergantung paket: Basic 2x, Standard 3x, Pro 5x. Revisi setelah deploy masuk maintenance.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  const reduce = useReducedMotion();

  return (
    <section id="faq" className="py-24 md:py-32 px-4 md:px-6 lg:px-12" aria-labelledby="faq-heading">
      <div className="max-w-3xl mx-auto">
        <SectionHeading eyebrow="FAQ" title="Pertanyaan umum" italicWord="umum" id="faq-heading" />

        <div className="space-y-3">
          {FAQS.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={i} className="card p-0 overflow-hidden">
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between p-5 md:p-6 text-left"
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${i}`}
                >
                  <span className="font-sans text-body-md text-text pr-4">{item.q}</span>
                  <Plus
                    size={18}
                    className={cn(
                      "flex-shrink-0 transition-transform duration-fast",
                      isOpen && "rotate-45 text-gold"
                    )}
                    aria-hidden="true"
                  />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-panel-${i}`}
                      initial={reduce ? false : { height: 0, opacity: 0 }}
                      animate={reduce ? undefined : { height: "auto", opacity: 1 }}
                      exit={reduce ? undefined : { height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 md:px-6 pb-5 md:pb-6 text-body-md text-text-muted">{item.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Create `components/sections/CTA.tsx`**

```tsx
"use client";

import { motion, useReducedMotion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { buildWhatsAppLink } from "@/lib/whatsapp";

export function CTA() {
  const reduce = useReducedMotion();

  return (
    <section className="py-24 md:py-32 px-4 md:px-6 lg:px-12 relative overflow-hidden" aria-labelledby="cta-heading">
      <div className="absolute inset-0 gold-glow pointer-events-none" aria-hidden="true" />
      <motion.div
        className="max-w-3xl mx-auto text-center relative"
        initial={reduce ? false : { opacity: 0, y: 20 }}
        whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <h2 id="cta-heading" className="text-headline-md md:text-display-lg font-display text-text text-balance">
          Siap <em className="font-light not-italic" style={{ color: "var(--gold)" }}>mulai</em>?
        </h2>
        <p className="mt-6 text-body-lg text-text-muted max-w-2xl mx-auto">
          Diskusi gratis 30 menit via WhatsApp atau video call. Tidak ada commitment, tidak ada tekanan.
        </p>
        <div className="mt-10">
          <Button
            href={buildWhatsAppLink({ message: "Halo Iqbal, saya siap mulai. Boleh jadwalkan kickoff call?" })}
            size="large"
          >
            Mulai via WhatsApp <ArrowRight size={14} className="ml-2" />
          </Button>
        </div>
      </motion.div>
    </section>
  );
}
```

- [ ] **Step 3: Create `components/sections/Footer.tsx`**

```tsx
import { Github, Linkedin, Instagram, Mail, ArrowUp } from "lucide-react";
import Link from "next/link";
import { SOCIAL, CONTACT_EMAIL } from "@/components/data/contact";

const SOCIAL_ICONS = {
  github: Github,
  linkedin: Linkedin,
  instagram: Instagram,
};

const NAV_LINKS = [
  { label: "Services", href: "#services" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Rate Card", href: "#rate-card" },
  { label: "FAQ", href: "#faq" },
];

export function Footer() {
  return (
    <footer className="border-t" style={{ borderColor: "var(--border)" }}>
      <div className="max-w-container mx-auto px-4 md:px-6 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <svg width="32" height="32" viewBox="0 0 200 200" fill="none" aria-hidden="true">
                <rect x="30" y="30" width="140" height="140" stroke="var(--gold)" strokeWidth="1.5" />
                <rect x="63" y="68" width="6" height="64" fill="var(--gold)" />
                <path d="M 100 132 L 117 68 L 134 132" stroke="var(--gold)" strokeWidth="3" />
                <line x1="107" y1="108" x2="127" y2="108" stroke="var(--gold)" strokeWidth="3" />
              </svg>
              <span className="font-display text-xl text-text">Iqbal Attila</span>
            </div>
            <p className="text-body-sm text-text-muted">Secure by design. Delivered with intent.</p>
          </div>

          <nav aria-label="Footer navigation">
            <h2 className="font-mono uppercase text-label text-gold mb-4">Nav</h2>
            <ul className="space-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-body-sm text-text-muted hover:text-gold transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="font-mono uppercase text-label text-gold mb-4">Connect</h2>
            <ul className="space-y-3">
              {Object.entries(SOCIAL).map(([key, url]) => {
                const Icon = SOCIAL_ICONS[key as keyof typeof SOCIAL_ICONS];
                if (!Icon) return null;
                return (
                  <li key={key}>
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-body-sm text-text-muted hover:text-gold transition-colors"
                    >
                      <Icon size={16} aria-hidden="true" />
                      {key}
                    </a>
                  </li>
                );
              })}
              <li>
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="inline-flex items-center gap-2 text-body-sm text-text-muted hover:text-gold transition-colors"
                >
                  <Mail size={16} aria-hidden="true" />
                  {CONTACT_EMAIL}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t flex flex-col sm:flex-row justify-between items-center gap-4" style={{ borderColor: "var(--border)" }}>
          <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-text-dim">
            © 2026 Iqbal Attila. All rights reserved.
          </p>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="font-mono text-[10px] uppercase tracking-[0.15em] text-text-muted hover:text-gold inline-flex items-center gap-2"
          >
            Back to top <ArrowUp size={12} aria-hidden="true" />
          </button>
        </div>
      </div>
    </footer>
  );
}
```

- [ ] **Step 4: Create `tests/component/FAQ.test.tsx`**

```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { FAQ } from "@/components/sections/FAQ";

describe("FAQ", () => {
  it("renders heading", () => {
    render(<FAQ />);
    expect(screen.getByRole("heading", { name: /pertanyaan umum/i })).toBeInTheDocument();
  });
  it("first FAQ is open by default", () => {
    render(<FAQ />);
    const firstButton = screen.getAllByRole("button")[0];
    expect(firstButton).toHaveAttribute("aria-expanded", "true");
  });
  it("clicking question toggles open state", async () => {
    const user = userEvent.setup();
    render(<FAQ />);
    const secondButton = screen.getAllByRole("button")[1];
    expect(secondButton).toHaveAttribute("aria-expanded", "false");
    await user.click(secondButton);
    expect(secondButton).toHaveAttribute("aria-expanded", "true");
  });
});
```

- [ ] **Step 5: Mount all in `app/page.tsx`**

```tsx
import { Nav } from "@/components/sections/Nav";
import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { Portfolio } from "@/components/sections/Portfolio";
import { LiveDemo } from "@/components/sections/LiveDemo";
import { Testimonials } from "@/components/sections/Testimonials";
import { RateCard } from "@/components/sections/RateCard";
import { FAQ } from "@/components/sections/FAQ";
import { CTA } from "@/components/sections/CTA";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Services />
        <Portfolio />
        <LiveDemo />
        <Testimonials />
        <RateCard />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
```

- [ ] **Step 6: Run all tests + verify dev**

Run: `bun test`
Expected: all unit + component tests pass.

Run: `bun run dev`
Expected: full page renders, all sections visible, FAQ accordion works, WhatsApp links correct. Ctrl+C.

- [ ] **Step 7: Commit**

```bash
git add components/sections/FAQ.tsx components/sections/CTA.tsx components/sections/Footer.tsx tests/component/FAQ.test.tsx app/page.tsx
git commit -m "feat: add FAQ, CTA, Footer sections"
```

---

## Phase 4: Polish (Tasks 17-20)

### Task 17: Add OpenGraph image

**Files:**
- Create: `app/opengraph-image.tsx`

- [ ] **Step 1: Create `app/opengraph-image.tsx`**

```tsx
import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Iqbal Attila — Web Dev Commission";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#0A0A0A",
          color: "#F0EDE7",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          fontFamily: "serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            marginBottom: "32px",
            fontSize: "20px",
            color: "#C9A352",
            fontFamily: "monospace",
            textTransform: "uppercase",
            letterSpacing: "0.15em",
          }}
        >
          <div style={{ width: "40px", height: "1px", background: "#C9A352" }} />
          <span>Web Dev · Frontend · Animation</span>
        </div>
        <div style={{ fontSize: "80px", lineHeight: 1.05, fontWeight: 400, marginBottom: "24px" }}>
          Membangun web yang <em style={{ color: "#C9A352", fontWeight: 300 }}>tajam</em>.
        </div>
        <div style={{ fontSize: "24px", color: "#A39F97", maxWidth: "800px" }}>
          Rate card untuk jasa web development & frontend oleh Iqbal Attila.
        </div>
      </div>
    ),
    { ...size }
  );
}
```

- [ ] **Step 2: Verify build creates OG image**

Run: `bun run build`
Expected: build succeeds, `app/opengraph-image.tsx` compiles. If edge runtime issue, change to `export const runtime = "nodejs"`.

- [ ] **Step 3: Commit**

```bash
git add app/opengraph-image.tsx
git commit -m "feat: add dynamic opengraph image"
```

---

### Task 18: Add JSON-LD structured data + SEO meta

**Files:**
- Modify: `app/layout.tsx`

- [ ] **Step 1: Add JSON-LD to `app/layout.tsx`**

Add before `</body>` in RootLayout:

```tsx
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Person",
      name: "Iqbal Attila",
      jobTitle: "Web Developer",
      url: "https://kcmon.id",
      sameAs: [
        "https://github.com/iqbalattila",
        "https://linkedin.com/in/iqbalattila",
      ],
    }),
  }}
/>
```

Also add `Service` schema in `app/page.tsx` after `<main>`:

```tsx
import { RATE_TIERS } from "@/components/data/rateCard";

// inside return, after <main>:
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Service",
      serviceType: "Web Development",
      provider: { "@type": "Person", name: "Iqbal Attila" },
      offers: RATE_TIERS.map((t) => ({
        "@type": "Offer",
        name: t.name,
        description: t.description,
        price: t.price,
      })),
    }),
  }}
/>
```

- [ ] **Step 2: Verify dev compiles**

Run: `bun run dev`
Expected: no errors, page renders. View source: see JSON-LD scripts. Ctrl+C.

- [ ] **Step 3: Commit**

```bash
git add app/layout.tsx app/page.tsx
git commit -m "feat: add JSON-LD structured data (Person + Service)"
```

---

### Task 19: Add MagneticCursor component (optional enhancement)

**Files:**
- Create: `components/motion/MagneticCursor.tsx`

- [ ] **Step 1: Create `components/motion/MagneticCursor.tsx`**

```tsx
"use client";

import { useRef, type ReactNode } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "motion/react";

interface MagneticCursorProps {
  children: ReactNode;
  strength?: number;
  className?: string;
}

export function MagneticCursor({ children, strength = 0.3, className }: MagneticCursorProps) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 20 });
  const sy = useSpring(y, { stiffness: 200, damping: 20 });

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ x: sx, y: sy }}
      onMouseMove={(e) => {
        const rect = ref.current?.getBoundingClientRect();
        if (!rect) return;
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        x.set((e.clientX - cx) * strength);
        y.set((e.clientY - cy) * strength);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}
```

Note: YAGNI check. If no section needs this in MVP, skip. Optional polish task — implement only if Hero CTAs feel too static.

- [ ] **Step 2: (Optional) Wrap Hero CTAs with MagneticCursor**

In `Hero.tsx`, wrap the CTAs div:

```tsx
<MagneticCursor className="inline-block">
  <div className="flex gap-4">
    <Button>...</Button>
    <Button>...</Button>
  </div>
</MagneticCursor>
```

- [ ] **Step 3: Verify**

Run: `bun run dev`
Expected: CTAs subtly follow cursor. Skip this step if feels too gimmicky.

- [ ] **Step 4: Commit (or skip)**

```bash
git add components/motion/MagneticCursor.tsx components/sections/Hero.tsx
git commit -m "feat: add magnetic cursor for primary CTAs"
```

Or skip if YAGNI.

---

### Task 20: Add skip-to-content link + focus styles audit

**Files:**
- Modify: `app/layout.tsx`

- [ ] **Step 1: Add skip link**

At top of `<body>` in `app/layout.tsx`:

```tsx
<body>
  <a
    href="#main-content"
    className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-gold focus:text-canvas focus:font-mono focus:text-label focus:uppercase"
  >
    Skip to main content
  </a>
  <SmoothScroll>{children}</SmoothScroll>
</body>
```

- [ ] **Step 2: Add `id="main-content"` to main in `app/page.tsx`**

```tsx
<main id="main-content">
```

- [ ] **Step 3: Verify focus order with Tab**

Run: `bun run dev`
Expected: Tab from URL bar hits skip link first, then nav, then sections. Ctrl+C.

- [ ] **Step 4: Commit**

```bash
git add app/layout.tsx app/page.tsx
git commit -m "feat: add skip-to-content link and main id"
```

---

## Phase 5: Testing (Tasks 21-23)

### Task 21: Setup Playwright + E2E smoke test

**Files:**
- Create: `playwright.config.ts`
- Create: `tests/e2e/landing.spec.ts`

- [ ] **Step 1: Install Playwright**

Run: `bunx playwright install chromium`

- [ ] **Step 2: Create `playwright.config.ts`**

```ts
import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: "html",
  use: {
    baseURL: "http://localhost:3000",
    trace: "on-first-retry",
  },
  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
  ],
  webServer: {
    command: "bun run dev",
    url: "http://localhost:3000",
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
```

- [ ] **Step 3: Create `tests/e2e/landing.spec.ts`**

```ts
import { test, expect } from "@playwright/test";

test("page loads and shows hero", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
});

test("nav has all sections", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("navigation", { name: /main/i })).toBeVisible();
  await expect(page.getByRole("link", { name: /services/i })).toBeVisible();
  await expect(page.getByRole("link", { name: /rate card/i })).toBeVisible();
});

test("anchor nav scrolls to rate card", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: /rate card/i }).first().click();
  await expect(page.locator("#rate-card")).toBeInViewport();
});

test("rate card CTAs link to WhatsApp with tier name", async ({ page, context }) => {
  await page.goto("/#rate-card");
  const proLink = page.getByRole("link", { name: /pesan pro/i });
  const href = await proLink.getAttribute("href");
  expect(href).toContain("wa.me/");
  expect(href).toContain(encodeURIComponent("Pro"));
});

test("FAQ accordion expands on click", async ({ page }) => {
  await page.goto("/#faq");
  const secondQ = page.getByRole("button", { name: /berapa lama/i });
  // (assumes 2nd FAQ; adjust selector if order changes)
  const allButtons = page.locator("#faq button[aria-expanded]");
  await allButtons.nth(1).click();
  await expect(allButtons.nth(1)).toHaveAttribute("aria-expanded", "true");
});

test("keyboard tab reaches all interactive elements", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press("Tab");
  // Skip link should be focused first
  const focused = await page.evaluate(() => document.activeElement?.textContent);
  expect(focused).toContain("Skip");
});
```

- [ ] **Step 4: Run E2E**

Run: `bun run test:e2e`
Expected: 6 passed (or 5+1 skip if no display).

- [ ] **Step 5: Commit**

```bash
git add playwright.config.ts tests/e2e/landing.spec.ts
git commit -m "test: add Playwright e2e smoke tests"
```

---

### Task 22: Add a11y audit with axe-core

**Files:**
- Create: `tests/e2e/a11y.spec.ts`

- [ ] **Step 1: Create `tests/e2e/a11y.spec.ts`**

```ts
import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const pages = ["/", "/#services", "/#portfolio", "/#rate-card", "/#faq"];

for (const path of pages) {
  test(`a11y: ${path}`, async ({ page }) => {
    await page.goto(path);
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();
    expect(results.violations).toEqual([]);
  });
}
```

- [ ] **Step 2: Run a11y tests**

Run: `bun run test:e2e tests/e2e/a11y.spec.ts`
Expected: all pass, or specific violations with fix guidance.

If violations: fix inline (likely contrast or aria-label issues), re-run.

- [ ] **Step 3: Commit**

```bash
git add tests/e2e/a11y.spec.ts
git commit -m "test: add axe-core a11y audit"
```

---

### Task 23: Add reduced-motion test

**Files:**
- Create: `tests/e2e/reduced-motion.spec.ts`

- [ ] **Step 1: Create `tests/e2e/reduced-motion.spec.ts`**

```ts
import { test, expect } from "@playwright/test";

test.use({ colorScheme: "dark", reducedMotion: "reduce" });

test("hero text is immediately visible with reduced motion", async ({ page }) => {
  await page.goto("/");
  // No animation delay — h1 should be visible without wait
  const h1 = page.getByRole("heading", { level: 1 });
  await expect(h1).toBeVisible();
  const opacity = await h1.evaluate((el) => getComputedStyle(el).opacity);
  expect(opacity).toBe("1");
});

test("FAQ opens instantly with reduced motion", async ({ page }) => {
  await page.goto("/#faq");
  const firstQ = page.locator("#faq button[aria-expanded]").first();
  await firstQ.click();
  // No wait — already open
  await expect(firstQ).toHaveAttribute("aria-expanded", "true");
});
```

- [ ] **Step 2: Run reduced-motion test**

Run: `bun run test:e2e tests/e2e/reduced-motion.spec.ts`
Expected: 2 passed.

- [ ] **Step 3: Commit**

```bash
git add tests/e2e/reduced-motion.spec.ts
git commit -m "test: add reduced-motion behavior test"
```

---

## Phase 6: Deploy (Tasks 24-25)

### Task 24: Add Lighthouse CI config + run audit

**Files:**
- Create: `lighthouserc.json`

- [ ] **Step 1: Create `lighthouserc.json`**

```json
{
  "ci": {
    "collect": {
      "startServerCommand": "bun run start",
      "url": ["http://localhost:3000"],
      "numberOfRuns": 1
    },
    "assert": {
      "preset": "lighthouse:no-pwa",
      "assertions": {
        "categories:performance": ["error", { "minScore": 0.9 }],
        "categories:accessibility": ["error", { "minScore": 0.95 }],
        "categories:best-practices": ["error", { "minScore": 0.95 }],
        "categories:seo": ["error", { "minScore": 0.95 }]
      }
    }
  }
}
```

- [ ] **Step 2: Run build + start + lhci**

```bash
bun run build
bun run start &
sleep 5
bun run lhci
```

Expected: lhci collects, asserts pass (or lists failures with file refs). Kill the `bun run start` background process.

- [ ] **Step 3: Fix any perf issues**

Common fixes:
- Add `priority` to hero image (n/a if no image)
- Lazy-load LiveDemo and below via dynamic import in `app/page.tsx`:
  ```tsx
  import dynamic from "next/dynamic";
  const LiveDemo = dynamic(() => import("@/components/sections/LiveDemo").then((m) => m.LiveDemo), { ssr: false });
  ```
- Ensure no large images in initial viewport
- Re-run lhci after fixes

- [ ] **Step 4: Commit**

```bash
git add lighthouserc.json app/page.tsx
git commit -m "chore: add lighthouse ci config + lazy load below-fold sections"
```

---

### Task 25: Final QA + deploy to Vercel

- [ ] **Step 1: Manual QA checklist (per spec §13)**

Verify on real iOS Safari + Android Chrome (or via BrowserStack if available):
- [ ] All sections render
- [ ] Lenis smooth scroll feels right
- [ ] No console errors
- [ ] WhatsApp link opens app on mobile, web on desktop
- [ ] OG image renders when shared
- [ ] No FOUC
- [ ] Brand discipline: 1 gold accent/section, no 4th font, no glow on mark
- [ ] Tagline: "Secure by design. Delivered with intent."

- [ ] **Step 2: Replace placeholder WhatsApp number**

Edit `components/data/contact.ts` with real number.

- [ ] **Step 3: Run full test suite**

```bash
bun test
bun run test:e2e
bun run lhci
```

All must pass.

- [ ] **Step 4: Deploy to Vercel**

If Vercel CLI installed:
```bash
bunx vercel --prod
```

Or push to GitHub + connect in Vercel dashboard. Set env: none needed for v1.

- [ ] **Step 5: Verify production**

Open production URL, click through all sections, test WhatsApp CTA on real mobile.

- [ ] **Step 6: Commit + tag**

```bash
git add components/data/contact.ts
git commit -m "chore: set production WhatsApp number"
git tag v0.1.0
```

- [ ] **Step 7: Document deployment in spec §14**

Update `docs/superpowers/specs/2026-06-03-landing-rate-card-design.md` §14 with deployed URL.

```bash
git add docs/superpowers/specs/
git commit -m "docs: record production URL in spec"
```

---

## Done

All tasks complete. Page is:
- ✅ Built with Next.js 15 + Tailwind v4 + Motion + Lenis
- ✅ Obsidian Gold brand applied
- ✅ 9 sections with orchestrated animations
- ✅ Fully responsive (4 breakpoints)
- ✅ Accessible (WCAG 2.2 AA)
- ✅ Performance budget met (LCP < 2.5s, JS < 250KB gz)
- ✅ Tested (unit, component, E2E, a11y, reduced-motion, Lighthouse)
- ✅ Deployed to Vercel
