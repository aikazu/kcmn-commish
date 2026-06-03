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
