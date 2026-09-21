"use client";

import { MotionConfig } from "framer-motion";

/** Respeta prefers-reduced-motion en todas las animaciones de Framer Motion. */
export function Providers({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
