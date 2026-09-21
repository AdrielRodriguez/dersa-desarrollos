import { Hero } from "@/components/sections/Hero";
import { Statement } from "@/components/sections/Statement";
import { Stats } from "@/components/sections/Stats";
import { Studio } from "@/components/sections/Studio";
import { Philosophy } from "@/components/sections/Philosophy";
import { Services } from "@/components/sections/Services";
import { Process } from "@/components/sections/Process";
import { Capabilities } from "@/components/sections/Capabilities";
import { Testimonials } from "@/components/sections/Testimonials";
import { Journal } from "@/components/sections/Journal";
import { FAQ } from "@/components/sections/FAQ";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Contact } from "@/components/sections/Contact";
import { StudioJsonLd } from "@/components/ui/JsonLd";

export default function HomePage() {
  return (
    <main id="contenido">
      <StudioJsonLd />
      <Hero />
      <Statement />
      <Stats />
      <Studio />
      <Philosophy />
      <Services />
      <Process />
      <Capabilities />
      <Testimonials />
      <Journal />
      <FAQ />
      <FinalCTA />
      <Contact />
    </main>
  );
}
