"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { content } from "@/lib/content";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

const { philosophy } = content;
const ease = [0.16, 1, 0.3, 1] as const;

/**
 * Storytelling sticky sobre fondo negro.
 * Desktop: el bloque queda fijo y las 3 afirmaciones cambian con el scroll.
 * Mobile: las afirmaciones se apilan con su imagen.
 */
export function Philosophy() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const count = philosophy.items.length;
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setActive(Math.min(count - 1, Math.max(0, Math.floor(v * count))));
  });

  return (
    <section id="filosofia" aria-labelledby="filosofia-title" className="bg-night text-night-fg">
      <h2 id="filosofia-title" className="sr-only">
        {philosophy.eyebrow}
      </h2>

      {/* Desktop: sticky */}
      <div ref={ref} className="relative hidden lg:block" style={{ height: `${count * 100}vh` }}>
        <div className="sticky top-0 flex h-screen items-center overflow-hidden">
          <div className="container-content grid grid-cols-12 items-center gap-16">
            <div className="col-span-5">
              <p className="eyebrow mb-8 text-stone">{philosophy.eyebrow}</p>

              <ul className="sr-only">
                {philosophy.items.map((item) => (
                  <li key={item.title}>
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </li>
                ))}
              </ul>
              <div aria-hidden className="relative min-h-[360px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active}
                    initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: -16, filter: "blur(6px)" }}
                    transition={{ duration: 0.6, ease }}
                  >
                    <p className="text-[clamp(2.25rem,3.8vw,3.5rem)] font-semibold leading-[1.08] tracking-[-0.025em]">
                      {philosophy.items[active].title}
                    </p>
                    <p className="mt-6 max-w-md text-lead text-night-muted text-pretty">
                      {philosophy.items[active].text}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>

              <div aria-hidden className="mt-10 flex gap-3">
                {philosophy.items.map((item, i) => (
                  <span key={item.title} className="h-[2px] w-12 overflow-hidden rounded-full bg-night-fg/15">
                    <span
                      className={cn(
                        "block h-full origin-left bg-night-fg transition-transform duration-700 ease-out",
                        i <= active ? "scale-x-100" : "scale-x-0"
                      )}
                    />
                  </span>
                ))}
              </div>
            </div>

            <div className="relative col-span-7 aspect-[4/5] max-h-[78vh] w-full overflow-hidden rounded-card bg-night-soft">
              {philosophy.items.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={false}
                  animate={{ opacity: i === active ? 1 : 0, scale: i === active ? 1 : 1.04 }}
                  transition={{ duration: 0.9, ease }}
                  className="absolute inset-0"
                >
                  <Image
                    src={item.image.src}
                    alt={item.image.alt}
                    fill
                    sizes="(min-width: 1200px) 700px, 58vw"
                    placeholder="blur"
                    blurDataURL={item.image.blurDataURL}
                    className="object-cover"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile / tablet: apilado */}
      <div className="section-y container-content space-y-20 lg:hidden">
        <p className="eyebrow text-stone">{philosophy.eyebrow}</p>
        {philosophy.items.map((item) => (
          <Reveal key={item.title}>
            <div className="relative aspect-[4/5] overflow-hidden rounded-card bg-night-soft sm:aspect-[4/3]">
              <Image
                src={item.image.src}
                alt={item.image.alt}
                fill
                sizes="100vw"
                placeholder="blur"
                blurDataURL={item.image.blurDataURL}
                className="object-cover"
              />
            </div>
            <h3 className="mt-8 text-[clamp(2rem,7vw,2.75rem)] leading-[1.08] tracking-[-0.025em]">{item.title}</h3>
            <p className="mt-4 text-lead text-night-muted text-pretty">{item.text}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
