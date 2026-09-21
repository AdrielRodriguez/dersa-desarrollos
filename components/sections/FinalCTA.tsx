import { Mail, MessageCircle } from "lucide-react";
import { content, SITE } from "@/lib/content";
import { Reveal } from "@/components/ui/Reveal";
import { PillLink } from "@/components/ui/Button";

const { finalCta } = content;

export function FinalCTA() {
  return (
    <section aria-labelledby="cta-title" className="relative overflow-hidden bg-night text-night-fg">
      {/* Halo muy sutil del color de acento */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-full h-[600px] w-[1100px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-stone/20 blur-[120px]"
      />
      <div className="container-content relative py-[120px] text-center md:py-[180px]">
        <Reveal>
          <h2 id="cta-title" className="mx-auto max-w-4xl text-hero font-semibold">
            {finalCta.title}
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lead text-night-muted">{finalCta.text}</p>
        </Reveal>
        <Reveal delay={0.1} className="mt-12 flex flex-col items-center gap-8">
          <PillLink href="#contacto" variant="inverse" size="lg">
            {finalCta.button}
          </PillLink>
          <div className="flex flex-col items-center gap-4 text-[17px] sm:flex-row sm:gap-8">
            <a
              href={SITE.contact.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-night-fg/80 transition-colors hover:text-night-fg"
            >
              <MessageCircle aria-hidden className="h-4 w-4" strokeWidth={1.5} />
              {finalCta.whatsapp}
            </a>
            <a
              href={`mailto:${SITE.contact.email}`}
              className="inline-flex items-center gap-2 text-night-fg/80 transition-colors hover:text-night-fg"
            >
              <Mail aria-hidden className="h-4 w-4" strokeWidth={1.5} />
              {finalCta.email}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
