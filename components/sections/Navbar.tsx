"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { content } from "@/lib/content";
import { cn } from "@/lib/utils";
import { pillClass } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";

const { nav } = content;

export function Navbar() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  // Se oculta al scrollear hacia abajo y reaparece al scrollear hacia arriba.
  useMotionValueEvent(scrollY, "change", (current) => {
    const previous = scrollY.getPrevious() ?? 0;
    setScrolled(current > 8);
    if (open) return;
    if (current > previous && current > 160) setHidden(true);
    else if (current < previous - 4) setHidden(false);
  });

  // Bloquear el scroll y cerrar con Escape mientras el menú mobile está abierto.
  useEffect(() => {
    if (!open) return;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = overflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-canvas"
      >
        {nav.skipToContent}
      </a>

      <motion.header
        initial={false}
        animate={{ y: hidden ? "-100%" : "0%" }}
        transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
        className={cn(
          "fixed inset-x-0 top-0 z-50 h-nav transition-[background-color,border-color] duration-300",
          open
            ? "bg-canvas"
            : "bg-canvas/70 backdrop-blur-xl backdrop-saturate-150",
          scrolled && !open ? "border-b border-line/60" : "border-b border-transparent"
        )}
      >
        <nav aria-label="Principal" className="container-content flex h-full items-center justify-between gap-6">
          <Link href="/" aria-label="Derudder Desarrollos, ir al inicio" className="-my-2 flex items-center py-2" onClick={() => setOpen(false)}>
            <Logo label="Derudder Desarrollos" wordmarkClassName="text-[14px] tracking-[0.02em] sm:text-[15px]" />
          </Link>

          <ul className="hidden items-center gap-8 lg:flex">
            {nav.links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-[13px] text-ink/80 transition-colors duration-200 hover:text-ink"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <Link href={nav.cta.href} className={pillClass("primary", "sm", "hidden sm:inline-flex")}>
              {nav.cta.label}
            </Link>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? nav.closeMenu : nav.openMenu}
              className="relative -mr-2 flex h-11 w-11 items-center justify-center rounded-full lg:hidden"
            >
              <span
                aria-hidden
                className={cn(
                  "absolute h-px w-[18px] bg-ink transition-transform duration-300 ease-out",
                  open ? "rotate-45" : "-translate-y-[4px]"
                )}
              />
              <span
                aria-hidden
                className={cn(
                  "absolute h-px w-[18px] bg-ink transition-transform duration-300 ease-out",
                  open ? "-rotate-45" : "translate-y-[4px]"
                )}
              />
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menú"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 overflow-y-auto overscroll-contain bg-canvas pt-nav lg:hidden"
          >
            <nav aria-label="Menú mobile" className="container-content flex min-h-full flex-col pb-10 pt-8">
              <ul className="space-y-1">
                {nav.links.map((link, i) => (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, y: -12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 + i * 0.04, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="block py-2 text-[32px] font-semibold tracking-[-0.02em] text-ink"
                    >
                      {link.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.35 }}
                className="mt-auto"
              >
                <Link href={nav.cta.href} onClick={() => setOpen(false)} className={pillClass("primary", "lg", "w-full")}>
                  {nav.cta.label}
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
