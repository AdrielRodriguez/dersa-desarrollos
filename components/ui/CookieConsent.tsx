"use client";

import Link from "next/link";
import Script from "next/script";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { content } from "@/lib/content";

/* --------------------------------------------------------------------------
   Consentimiento de cookies + analytics
   - Analytics DESACTIVADO por defecto. Solo carga si el usuario acepta y si
     hay una variable de entorno configurada:
       NEXT_PUBLIC_GA_ID              → Google Analytics 4
       NEXT_PUBLIC_PLAUSIBLE_DOMAIN   → Plausible
   -------------------------------------------------------------------------- */

const KEY = "dersa-consent";
const EVENT = "dersa:open-cookies";
type Consent = "granted" | "denied" | null;

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
const PLAUSIBLE = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;

export function CookieConsent() {
  const [consent, setConsent] = useState<Consent>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let stored: Consent = null;
    try {
      stored = localStorage.getItem(KEY) as Consent;
    } catch {}
    setConsent(stored);
    setVisible(!stored);
    const open = () => setVisible(true);
    window.addEventListener(EVENT, open);
    return () => window.removeEventListener(EVENT, open);
  }, []);

  const choose = (value: Exclude<Consent, null>) => {
    try {
      localStorage.setItem(KEY, value);
    } catch {}
    setConsent(value);
    setVisible(false);
  };

  const enabled = consent === "granted";

  return (
    <>
      {enabled && GA_ID && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
          <Script id="ga4" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}',{anonymize_ip:true});`}
          </Script>
        </>
      )}
      {enabled && PLAUSIBLE && (
        <Script defer data-domain={PLAUSIBLE} src="https://plausible.io/js/script.js" strategy="afterInteractive" />
      )}

      <AnimatePresence>
        {visible && (
          <motion.div
            role="dialog"
            aria-live="polite"
            aria-label="Aviso de cookies"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-x-4 bottom-4 z-50 mx-auto max-w-xl rounded-3xl border border-line/60 bg-canvas/85 p-5 shadow-soft backdrop-blur-xl sm:inset-x-6 sm:bottom-6 md:p-6"
          >
            <p className="text-[14px] leading-relaxed text-ink">
              {content.cookies.text}{" "}
              <Link href="/privacidad" className="text-link hover:underline">
                {content.cookies.policy}
              </Link>
            </p>
            <div className="mt-4 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => choose("denied")}
                className="h-9 rounded-full px-4 text-[14px] font-medium text-ink transition-colors hover:bg-canvas-alt"
              >
                {content.cookies.reject}
              </button>
              <button
                type="button"
                onClick={() => choose("granted")}
                className="h-9 rounded-full bg-ink px-5 text-[14px] font-medium text-canvas transition-colors hover:bg-ink/85"
              >
                {content.cookies.accept}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/** Botón para reabrir el aviso de cookies (footer). */
export function CookiePreferencesButton({ label }: { label: string }) {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event(EVENT))}
      className="hover:text-ink hover:underline"
    >
      {label}
    </button>
  );
}
