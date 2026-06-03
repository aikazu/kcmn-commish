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
