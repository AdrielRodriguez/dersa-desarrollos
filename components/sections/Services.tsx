import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { content } from "@/lib/content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/Icon";

const { services } = content;

export function Services() {
  return (
    <section id="servicios" aria-labelledby="servicios-title" className="section-y bg-canvas">
      <div className="container-content">
        <SectionHeading id="servicios-title" eyebrow={services.eyebrow} title={services.title} intro={services.intro} />

        <ul className="mt-14 grid gap-4 sm:grid-cols-2 md:mt-20 lg:grid-cols-3">
          {services.items.map((service, i) => (
            <li key={service.title}>
              <Reveal delay={(i % 3) * 0.06} className="h-full">
                <Link
                  href="#contacto"
                  className="group flex h-full flex-col rounded-card border border-line/70 bg-canvas p-8 transition-all duration-500 ease-out hover:-translate-y-1 hover:border-transparent hover:bg-canvas-alt hover:shadow-soft md:p-10"
                >
                  <Icon name={service.icon} className="h-8 w-8 text-ink" />
                  <h3 className="mt-10 text-[21px] leading-snug tracking-[-0.015em] text-ink md:text-[24px]">
                    {service.title}
                  </h3>
                  <p className="mt-3 text-[17px] text-ink-muted text-pretty">{service.text}</p>
                  <span className="mt-auto inline-flex items-center gap-0.5 pt-8 text-[17px] text-link">
                    {services.more}
                    <span className="sr-only"> sobre {service.title}</span>
                    <ChevronRight
                      aria-hidden
                      strokeWidth={1.75}
                      className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
                    />
                  </span>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
