"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { Clock } from "lucide-react";
import { content } from "@/lib/content";
import { Reveal } from "@/components/ui/Reveal";

const { process } = content;

export function Process() {
  const listRef = useRef<HTMLOListElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 0.7", "end 0.6"] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });

  return (
    <section id="proceso" aria-labelledby="proceso-title" className="section-y bg-canvas-alt">
      <div className="container-content grid gap-14 lg:grid-cols-12 lg:gap-16">
        {/* Titular fijo mientras avanzan los pasos */}
        <div className="lg:col-span-5">
          <Reveal className="lg:sticky lg:top-32">
            <p className="eyebrow mb-4">{process.eyebrow}</p>
            <h2 id="proceso-title" className="text-section text-ink">
              {process.title}
            </h2>
            <p className="mt-5 text-lead text-ink-muted text-pretty">{process.intro}</p>
          </Reveal>
        </div>

        <ol ref={listRef} className="relative lg:col-span-7">
          {/* Línea de progreso vinculada al scroll */}
          <span aria-hidden className="absolute bottom-3 left-[19px] top-3 w-px bg-line" />
          <motion.span
            aria-hidden
            style={{ scaleY: reduce ? 1 : progress }}
            className="absolute bottom-3 left-[19px] top-3 w-px origin-top bg-ink"
          />

          {process.steps.map((step) => (
            <li key={step.number} className="relative pb-14 pl-16 last:pb-0 md:pb-20">
              <span
                aria-hidden
                className="absolute left-0 top-0 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-line bg-canvas text-[13px] font-semibold tabular-nums text-ink"
              >
                {step.number}
              </span>
              <Reveal delay={0.05}>
                <h3 className="pt-1 text-[24px] leading-8 tracking-[-0.015em] text-ink md:text-[28px]">
                  {step.title}
                </h3>
                <p className="mt-3 max-w-xl text-[17px] text-ink-muted text-pretty md:text-[19px]">{step.text}</p>
                <p className="mt-4 inline-flex items-center gap-2 text-[14px] text-ink/80">
                  <Clock aria-hidden className="h-4 w-4" strokeWidth={1.5} />
                  <span className="sr-only">{process.durationLabel}: </span>
                  {step.duration}
                </p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
