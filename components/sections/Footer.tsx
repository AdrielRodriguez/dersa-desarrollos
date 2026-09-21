import Link from "next/link";
import { ArrowUp, Instagram } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { content, SITE } from "@/lib/content";
import { CookiePreferencesButton } from "@/components/ui/CookieConsent";

const { footer } = content;

export function Footer() {
  return (
    <footer className="bg-canvas-alt text-[12px] text-ink-muted">
      <div className="container-content py-14 md:py-16">
        <div className="flex flex-col gap-10 border-b border-line pb-10 md:flex-row md:justify-between">
          <div className="max-w-xs">
            <Link href="/" aria-label="DERSA, ir al inicio">
              <Logo />
            </Link>
            <p className="mt-3 text-[13px]">{footer.tagline}</p>
            <div className="mt-6 flex gap-2">
              <a
                href={SITE.contact.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-9 w-9 items-center justify-center rounded-full text-ink transition-colors hover:bg-line/60"
              >
                <Instagram aria-hidden className="h-4 w-4" strokeWidth={1.5} />
              </a>
            </div>
          </div>

          <nav aria-label="Pie de página" className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-5 lg:gap-12">
            {footer.columns.map((col) => (
              <div key={col.title}>
                <h2 className="text-[12px] font-semibold text-ink">{col.title}</h2>
                <ul className="mt-3 space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link href={link.href} className="transition-colors hover:text-ink hover:underline">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="flex flex-col gap-4 pt-6 md:flex-row md:items-center md:justify-between">
          <p>{footer.copyright}</p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {footer.legal.map((l) => (
              <Link key={l.href} href={l.href} className="hover:text-ink hover:underline">
                {l.label}
              </Link>
            ))}
            <CookiePreferencesButton label={footer.cookies} />
            <a href="#top" className="inline-flex items-center gap-1 text-ink hover:underline">
              {footer.backToTop}
              <ArrowUp aria-hidden className="h-3.5 w-3.5" strokeWidth={1.5} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
