import Hero from "@/components/home/Hero";
import Clients from "@/components/home/Clients";
import WhatWeDo from "@/components/home/WhatWeDo";
import CategoryShowcase from "@/components/home/CategoryShowcase";
import Catalog from "@/components/services/Catalog";
import Network from "@/components/home/Network";
import Brands from "@/components/home/Brands";
import Faq from "@/components/home/Faq";
import CtaBand from "@/components/ui/CtaBand";

// A first-time visitor should get it in one scroll:
// what we are → who trusts us → what we do → what we sell → browse the range
// → where we serve → other brands we look after → common questions → get in touch.
export default function HomePage() {
  return (
    <>
      <Hero />
      <Clients />
      <WhatWeDo />
      <CategoryShowcase />
      <Catalog initialCategory="forklifts" compact />
      <Network />
      <Brands />
      <Faq />
      <CtaBand />
    </>
  );
}
