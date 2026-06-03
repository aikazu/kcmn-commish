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
