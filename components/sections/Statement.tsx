"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { content } from "@/lib/content";

const { statement } = content;

function Word({ children, progress, range }: { children: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.16, 1]);
  return (
    <motion.span style={{ opacity }} className="inline-block">
      {children}
      &nbsp;
    </motion.span>
  );
}

/** Declaración grande que se revela palabra por palabra al scrollear. */
export function Statement() {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.45"] });
  const words = statement.text.split(" ");

  return (
    <section id="manifiesto" aria-label="Manifiesto" className="section-y bg-canvas">
      <div className="container-content">
        <p
          ref={ref}
          className="mx-auto max-w-5xl text-center text-statement font-semibold text-ink"
        >
          {reduce ? (
            statement.text
          ) : (
            <>
              <span className="sr-only">{statement.text}</span>
              <span aria-hidden>
                {words.map((word, i) => {
                  const start = i / words.length;
                  const end = start + 1 / words.length;
                  return (
                    <Word key={`${word}-${i}`} progress={scrollYProgress} range={[start, end]}>
                      {word}
                    </Word>
                  );
                })}
              </span>
            </>
          )}
        </p>
      </div>
    </section>
  );
}
