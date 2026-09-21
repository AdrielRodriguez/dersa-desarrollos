import Image from "next/image";
import { content } from "@/lib/content";
import { Reveal } from "@/components/ui/Reveal";
import { ParallaxImage } from "@/components/ui/ParallaxImage";
import { Icon } from "@/components/ui/Icon";

const { studio } = content;

export function Studio() {
  return (
    <section id="estudio" aria-labelledby="estudio-title" className="section-y bg-canvas">
      <div className="container-content">
        <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:sticky lg:top-24 lg:col-span-6">
            <ParallaxImage
              image={studio.image}
              sizes="(min-width: 1024px) 600px, 100vw"
              className="aspect-[4/5]"
            />
          </Reveal>

          <div className="lg:col-span-6 lg:pt-8">
            <Reveal>
              <p className="eyebrow mb-4">{studio.eyebrow}</p>
              <h2 id="estudio-title" className="text-section text-ink">
                {studio.title}
              </h2>
            </Reveal>

            <div className="mt-8 space-y-5">
              {studio.paragraphs.map((p, i) => (
                <Reveal key={i} delay={i * 0.05}>
                  <p className="text-lead text-ink-muted text-pretty">{p}</p>
                </Reveal>
              ))}
            </div>

            <Reveal className="mt-12 flex items-start gap-5 rounded-card bg-canvas-alt p-6 md:p-8">
              <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-full md:h-24 md:w-24">
                <Image
                  src={studio.founder.image.src}
                  alt={studio.founder.image.alt}
                  fill
                  sizes="96px"
                  placeholder="blur"
                  blurDataURL={studio.founder.image.blurDataURL}
                  className="object-cover"
                />
              </div>
              <div>
                <p className="text-[19px] font-semibold tracking-[-0.01em] text-ink">{studio.founder.name}</p>
                <p className="text-[15px] text-ink-muted">{studio.founder.role}</p>
                <p className="mt-3 text-[15px] leading-relaxed text-ink-muted">{studio.founder.bio}</p>
              </div>
            </Reveal>
          </div>
        </div>

        <ul className="mt-20 grid gap-10 border-t border-line pt-14 md:mt-28 md:grid-cols-3 md:gap-12">
          {studio.values.map((value, i) => (
            <li key={value.title}>
              <Reveal delay={i * 0.08}>
                <Icon name={value.icon} className="h-7 w-7 text-ink" />
                <h3 className="mt-5 text-[21px] tracking-[-0.01em] text-ink">{value.title}</h3>
                <p className="mt-2 text-[17px] text-ink-muted text-pretty">{value.text}</p>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
