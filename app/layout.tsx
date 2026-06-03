import type { Metadata } from "next";
import { Fraunces, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/motion/SmoothScroll";

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-fraunces",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains",
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
      <body>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-gold focus:text-canvas focus:font-mono focus:text-[11px] focus:uppercase focus:tracking-[0.12em]"
        >
          Skip to main content
        </a>
        <SmoothScroll>{children}</SmoothScroll>
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
      </body>
    </html>
  );
}
