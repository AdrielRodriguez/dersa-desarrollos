"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { content } from "@/lib/content";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

const { testimonials } = content;
const INTERVAL = 7000;

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduce = useReducedMotion();
  const total = testimonials.items.length;

  const go = useCallback((dir: 1 | -1) => setIndex((i) => (i + dir + total) % total), [total]);

  useEffect(() => {
    if (paused || reduce) return;
    const id = window.setInterval(() => go(1), INTERVAL);
    return () => window.clearInterval(id);
  }, [paused, reduce, go]);

  const item = testimonials.items[index];

  return (
    <section aria-labelledby="testimonios-title" className="section-y bg-canvas-alt">
      <div className="container-content">
        <Reveal className="text-center">
          <p className="eyebrow">{testimonials.eyebrow}</p>
          <h2 id="testimonios-title" className="sr-only">
            {testimonials.title}
          </h2>
        </Reveal>

        <div
          role="region"
          aria-roledescription="carrusel"
          aria-label={testimonials.title}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={() => setPaused(false)}
          className="mx-auto mt-10 max-w-4xl text-center"
        >
          <div className="relative grid min-h-[320px] place-items-center md:min-h-[300px]" aria-live={paused ? "polite" : "off"}>
            <AnimatePresence mode="wait">
              <motion.figure
                key={index}
                initial={{ opacity: 0, filter: "blur(6px)" }}
                animate={{ opacity: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, filter: "blur(6px)" }}
                transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                aria-roledescription="testimonio"
                aria-label={`${index + 1} de ${total}`}
              >
                <blockquote className="text-[clamp(1.5rem,3.4vw,2.5rem)] font-semibold leading-[1.22] tracking-[-0.02em] text-ink text-balance">
                  “{item.quote}”
                </blockquote>
                <figcaption className="mt-10 flex items-center justify-center gap-4">
                  <span className="relative h-12 w-12 overflow-hidden rounded-full">
                    <Image
                      src={item.avatar.src}
                      alt=""
                      fill
                      sizes="48px"
                      placeholder="blur"
                      blurDataURL={item.avatar.blurDataURL}
                      className="object-cover grayscale"
                    />
                  </span>
                  <span className="text-left">
                    <span className="block text-[17px] font-semibold text-ink">{item.name}</span>
                    <span className="block text-[15px] text-ink-muted">{item.role}</span>
                  </span>
                </figcaption>
              </motion.figure>
            </AnimatePresence>
          </div>

          <div className="mt-10 flex items-center justify-center gap-6">
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label={testimonials.previous}
              className="flex h-11 w-11 items-center justify-center rounded-full bg-canvas text-ink transition-colors hover:bg-line/60 md:h-10 md:w-10"
            >
              <ChevronLeft aria-hidden className="h-5 w-5" strokeWidth={1.5} />
            </button>
            <div className="flex gap-2">
              {testimonials.items.map((t, i) => (
                <button
                  key={t.name}
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-label={`${testimonials.goTo} ${i + 1}`}
                  aria-current={i === index}
                  className="flex h-11 min-w-[24px] items-center justify-center md:h-6 md:min-w-0"
                >
                  <span
                    className={cn(
                      "block h-1.5 rounded-full transition-all duration-500",
                      i === index ? "w-6 bg-ink" : "w-1.5 bg-ink/25"
                    )}
                  />
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label={testimonials.next}
              className="flex h-11 w-11 items-center justify-center rounded-full bg-canvas text-ink transition-colors hover:bg-line/60 md:h-10 md:w-10"
            >
              <ChevronRight aria-hidden className="h-5 w-5" strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
