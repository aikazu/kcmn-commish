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
import { RATE_TIERS } from "@/components/data/rateCard";

export default function Home() {
  return (
    <>
      <Nav />
      <main id="main-content">
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
    </>
  );
}
