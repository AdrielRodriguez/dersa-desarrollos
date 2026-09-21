"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { content } from "@/lib/content";
import { pillClass } from "@/components/ui/Button";

const { hero } = content;
const ease = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.04, 1.12]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section
      ref={ref}
      aria-labelledby="hero-title"
      className="relative flex h-[100svh] min-h-[640px] items-center justify-center overflow-hidden bg-night text-night-fg"
    >
      <motion.div
        style={reduce ? undefined : { y: imageY, scale: imageScale }}
        className="absolute inset-0"
      >
        <Image
          src={hero.image.src}
          alt={hero.image.alt}
          fill
          priority
          sizes="100vw"
          placeholder="blur"
          blurDataURL={hero.image.blurDataURL}
          className="object-cover"
        />
      </motion.div>

      {/* Overlay suave para legibilidad */}
      <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/30 to-black/60" />

      <motion.div
        style={reduce ? undefined : { y: contentY, opacity: contentOpacity }}
        className="container-content relative z-10 text-center"
      >
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1, ease }}
          className="eyebrow mb-6 text-night-fg/75"
        >
          {hero.eyebrow}
        </motion.p>
        <motion.h1
          id="hero-title"
          initial={{ opacity: 0, y: 24, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.2, delay: 0.2, ease }}
          className="mx-auto max-w-5xl text-hero font-semibold"
        >
          {hero.title}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.45, ease }}
          className="mx-auto mt-6 max-w-2xl text-lead text-night-fg/85 text-pretty"
        >
          {hero.subtitle}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6, ease }}
          className="mt-10 flex flex-col items-center justify-center gap-5 sm:flex-row sm:gap-8"
        >
          <Link href={hero.primaryCta.href} className={pillClass("inverse", "md")}>
            {hero.primaryCta.label}
          </Link>
          <Link
            href={hero.secondaryCta.href}
            className="group -my-2.5 inline-flex items-center gap-0.5 py-2.5 text-[17px] text-night-fg hover:underline underline-offset-4"
          >
            {hero.secondaryCta.label}
            <ChevronRight
              aria-hidden
              strokeWidth={1.75}
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
            />
          </Link>
        </motion.div>
      </motion.div>

      {/* Indicador de scroll */}
      <motion.a
        href="#manifiesto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1 }}
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-3 text-[12px] tracking-[0.12em] text-night-fg/70 uppercase"
      >
        <span>{hero.scrollHint}</span>
        <span aria-hidden className="relative block h-10 w-px overflow-hidden bg-night-fg/25">
          <span className="absolute inset-x-0 top-0 h-1/2 animate-[scrollhint_2.2s_ease-in-out_infinite] bg-night-fg" />
        </span>
      </motion.a>
    </section>
  );
}
