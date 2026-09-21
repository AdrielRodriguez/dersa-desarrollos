"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import type { SiteImage } from "@/lib/content";
import { cn } from "@/lib/utils";

type Props = {
  image: SiteImage;
  className?: string;
  sizes?: string;
  range?: number; // desplazamiento en %
  priority?: boolean;
  hoverZoom?: boolean;
};

/** Imagen con parallax de rango pequeño, dentro de un marco con bordes redondeados. */
export function ParallaxImage({ image, className, sizes = "100vw", range = 6, priority, hoverZoom }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [`-${range}%`, `${range}%`]);

  return (
    <div ref={ref} className={cn("group relative overflow-hidden rounded-card bg-canvas-alt", className)}>
      <motion.div style={{ y: reduce ? 0 : y }} className="absolute inset-x-0 -inset-y-[8%]">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes={sizes}
          priority={priority}
          placeholder="blur"
          blurDataURL={image.blurDataURL}
          className={cn(
            "object-cover",
            hoverZoom && "transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          )}
        />
      </motion.div>
    </div>
  );
}
