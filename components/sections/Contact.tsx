import { ArrowUpRight, Clock, Instagram, Mail, MessageCircle, Phone } from "lucide-react";
import { content, SITE } from "@/lib/content";
import { Reveal } from "@/components/ui/Reveal";

const { contact } = content;

export function Contact() {
  const c = SITE.contact;
  const whatsappHref = `${c.whatsappHref}?text=${encodeURIComponent(contact.whatsappMessage)}`;

  const actions = [
    { icon: MessageCircle, ...contact.whatsappCta, detail: c.whatsapp, href: whatsappHref as string | undefined },
    // El email se muestra como dato, sin abrir el cliente de correo.
    { icon: Mail, ...contact.emailCta, action: undefined, detail: c.email, href: undefined },
  ];

  const rows = [
    { icon: Phone, label: contact.labels.phone, value: c.phone, href: c.phoneHref },
    { icon: Clock, label: contact.labels.hours, value: c.hours, href: undefined },
    { icon: Instagram, label: contact.labels.social, value: c.instagramHandle, href: c.instagram },
  ];

  return (
    <section id="contacto" aria-labelledby="contacto-title" className="section-y bg-canvas">
      <div className="container-content grid gap-14 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <Reveal>
            <p className="eyebrow mb-4">{contact.eyebrow}</p>
            <h2 id="contacto-title" className="text-section text-ink">
              {contact.title}
            </h2>
            <p className="mt-5 text-lead text-ink-muted text-pretty">{contact.intro}</p>
          </Reveal>

          <Reveal delay={0.08}>
            <dl className="mt-10 space-y-5 border-t border-line pt-8">
              {rows.map(({ icon: Icon, label, value, href }) => (
                <div key={label} className="flex items-start gap-4">
                  <Icon aria-hidden className="mt-1 h-5 w-5 shrink-0 text-ink-muted" strokeWidth={1.5} />
                  <div>
                    <dt className="text-[13px] text-ink-muted">{label}</dt>
                    <dd className="text-[17px] text-ink">
                      {href ? (
                        <a
                          href={href}
                          className="-my-3 inline-block py-3 hover:text-link"
                          {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                        >
                          {value}
                        </a>
                      ) : (
                        value
                      )}
                    </dd>
                  </div>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        <ul className="grid gap-4 lg:col-span-7">
          {actions.map(({ icon: Icon, title, text, action, detail, href }, i) => {
            const inner = (
              <>
                <div className="flex items-start justify-between gap-6">
                  <Icon aria-hidden className="h-8 w-8 text-ink" strokeWidth={1.25} />
                  {href && (
                    <span
                      aria-hidden
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-canvas text-ink transition-colors duration-300 group-hover:bg-ink group-hover:text-canvas"
                    >
                      <ArrowUpRight className="h-4 w-4" strokeWidth={1.5} />
                    </span>
                  )}
                </div>
                <h3 className="mt-10 text-[28px] tracking-[-0.02em] text-ink md:text-[32px]">{title}</h3>
                <p className="mt-2 text-[17px] text-ink-muted">{text}</p>
                <p className="mt-6 text-[17px] font-medium text-ink [overflow-wrap:anywhere]">{detail}</p>
                {action && (
                  <span className="mt-1 text-[15px] text-link group-hover:underline underline-offset-4">{action}</span>
                )}
              </>
            );
            return (
              <li key={title}>
                <Reveal delay={0.1 + i * 0.06} className="h-full">
                  {href ? (
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex h-full flex-col rounded-card bg-canvas-alt p-8 transition-all duration-500 ease-out hover:-translate-y-1 hover:shadow-soft md:p-10"
                    >
                      {inner}
                    </a>
                  ) : (
                    <div className="flex h-full flex-col rounded-card bg-canvas-alt p-8 md:p-10">{inner}</div>
                  )}
                </Reveal>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
