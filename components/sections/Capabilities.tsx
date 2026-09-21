import { Check } from "lucide-react";
import { content } from "@/lib/content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { ParallaxImage } from "@/components/ui/ParallaxImage";
import { cn } from "@/lib/utils";

const { capabilities } = content;

export function Capabilities() {
  return (
    <section id="capacidades" aria-labelledby="capacidades-title" className="section-y bg-canvas">
      <div className="container-content">
        <SectionHeading
          id="capacidades-title"
          eyebrow={capabilities.eyebrow}
          title={capabilities.title}
          align="center"
        />

        <div className="mt-16 space-y-24 md:mt-24 md:space-y-36">
          {capabilities.items.map((item, i) => {
            const reversed = i % 2 === 1;
            return (
              <article key={item.eyebrow} className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
                <Reveal className={cn("lg:col-span-7", reversed && "lg:order-2")}>
                  <ParallaxImage
                    image={item.image}
                    sizes="(min-width: 1024px) 700px, 100vw"
                    className="aspect-[4/3]"
                    hoverZoom
                  />
                </Reveal>
                <Reveal delay={0.1} className={cn("lg:col-span-5", reversed && "lg:order-1")}>
                  <p className="eyebrow mb-4">{item.eyebrow}</p>
                  <h3 className="text-[clamp(1.75rem,3.4vw,2.75rem)] leading-[1.08] tracking-[-0.025em] text-ink">
                    {item.title}
                  </h3>
                  <p className="mt-5 text-lead text-ink-muted text-pretty">{item.text}</p>
                  <ul className="mt-8 space-y-3 border-t border-line pt-6">
                    {item.points.map((point) => (
                      <li key={point} className="flex items-center gap-3 text-[17px] text-ink">
                        <Check aria-hidden className="h-4 w-4 shrink-0 text-ink-muted" strokeWidth={1.5} />
                        {point}
                      </li>
                    ))}
                  </ul>
                </Reveal>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
