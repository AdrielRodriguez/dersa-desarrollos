"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Clock, Instagram, Loader2, Mail, MessageCircle, Phone } from "lucide-react";
import { content, SITE } from "@/lib/content";
import { validateContact, type ContactErrors, type ContactPayload } from "@/lib/contact";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

const { contact } = content;
const f = contact.form;

type Status = "idle" | "loading" | "success" | "error";

const initial: ContactPayload = {
  name: "",
  email: "",
  phone: "",
  projectType: "",
  budget: "",
  location: "",
  message: "",
  consent: false,
  company: "",
};

function Field({
  id,
  label,
  error,
  optional,
  children,
  className,
}: {
  id: string;
  label: string;
  error?: string;
  optional?: boolean;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-2 block text-[14px] font-medium text-ink">
        {label}
        {optional && <span className="font-normal text-ink-muted"> ({f.optional})</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-2 text-[13px] text-red-600 dark:text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}

function ContactForm() {
  const [data, setData] = useState<ContactPayload>(initial);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [touched, setTouched] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const formRef = useRef<HTMLFormElement>(null);

  const update = <K extends keyof ContactPayload>(key: K, value: ContactPayload[K]) => {
    const next = { ...data, [key]: value };
    setData(next);
    if (touched) setErrors(validateContact(next));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    const found = validateContact(data);
    setErrors(found);
    if (Object.keys(found).length) {
      const first = Object.keys(found)[0];
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("success");
      setData(initial);
      setTouched(false);
    } catch {
      setStatus("error");
    }
  };

  const err = (key: keyof ContactErrors) => (errors[key] ? f.errors[key] : undefined);
  const aria = (key: keyof ContactErrors) => ({
    "aria-invalid": errors[key] ? true : undefined,
    "aria-describedby": errors[key] ? `${key}-error` : undefined,
  });

  return (
    <AnimatePresence mode="wait">
      {status === "success" ? (
        <motion.div
          key="success"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          role="status"
          className="flex min-h-[480px] flex-col items-center justify-center rounded-card bg-canvas-alt p-10 text-center"
        >
          <CheckCircle2 aria-hidden className="h-12 w-12 text-ink" strokeWidth={1.25} />
          <h3 className="mt-6 text-[28px] tracking-[-0.02em] text-ink">{f.successTitle}</h3>
          <p className="mt-3 text-[17px] text-ink-muted">{f.successText}</p>
          <button
            type="button"
            onClick={() => setStatus("idle")}
            className="mt-8 text-[17px] text-link hover:underline underline-offset-4"
          >
            {f.sendAnother}
          </button>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          ref={formRef}
          noValidate
          onSubmit={onSubmit}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="grid gap-5 rounded-card bg-canvas-alt p-6 sm:grid-cols-2 md:p-10"
        >
          {/* Honeypot anti-spam: invisible para personas */}
          <div aria-hidden className="absolute left-[-9999px] h-px w-px overflow-hidden">
            <label htmlFor="company">Empresa</label>
            <input
              id="company"
              name="company"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={data.company}
              onChange={(e) => update("company", e.target.value)}
            />
          </div>

          <Field id="name" label={f.name} error={err("name")} className="sm:col-span-2">
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              required
              value={data.name}
              onChange={(e) => update("name", e.target.value)}
              className="field"
              {...aria("name")}
            />
          </Field>

          <Field id="email" label={f.email} error={err("email")}>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              inputMode="email"
              required
              value={data.email}
              onChange={(e) => update("email", e.target.value)}
              className="field"
              {...aria("email")}
            />
          </Field>

          <Field id="phone" label={f.phone} error={err("phone")} optional>
            <input
              id="phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              inputMode="tel"
              value={data.phone}
              onChange={(e) => update("phone", e.target.value)}
              className="field"
              {...aria("phone")}
            />
          </Field>

          <Field id="projectType" label={f.projectType} error={err("projectType")}>
            <select
              id="projectType"
              name="projectType"
              required
              value={data.projectType}
              onChange={(e) => update("projectType", e.target.value)}
              className={cn("field appearance-none bg-[length:16px] bg-[right_1rem_center] bg-no-repeat pr-10", !data.projectType && "text-ink-muted")}
              style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%236E6E73' stroke-width='1.5'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")" }}
              {...aria("projectType")}
            >
              <option value="" disabled>
                {f.select}
              </option>
              {f.projectTypes.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </Field>

          <Field id="budget" label={f.budget} optional>
            <select
              id="budget"
              name="budget"
              value={data.budget}
              onChange={(e) => update("budget", e.target.value)}
              className={cn("field appearance-none bg-[length:16px] bg-[right_1rem_center] bg-no-repeat pr-10", !data.budget && "text-ink-muted")}
              style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%236E6E73' stroke-width='1.5'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")" }}
            >
              <option value="">{f.select}</option>
              {f.budgets.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
          </Field>

          <Field id="location" label={f.location} optional className="sm:col-span-2">
            <input
              id="location"
              name="location"
              type="text"
              autoComplete="address-level2"
              value={data.location}
              onChange={(e) => update("location", e.target.value)}
              className="field"
            />
          </Field>

          <Field id="message" label={f.message} error={err("message")} className="sm:col-span-2">
            <textarea
              id="message"
              name="message"
              rows={5}
              required
              value={data.message}
              onChange={(e) => update("message", e.target.value)}
              className="field resize-y"
              {...aria("message")}
            />
          </Field>

          <div className="sm:col-span-2">
            <label className="flex cursor-pointer items-start gap-3 text-[14px] text-ink-muted">
              <input
                type="checkbox"
                name="consent"
                checked={data.consent}
                onChange={(e) => update("consent", e.target.checked)}
                className="mt-0.5 h-5 w-5 shrink-0 cursor-pointer rounded-md accent-[rgb(var(--ink))]"
                {...aria("consent")}
              />
              <span>
                {f.consent.split("Política de Privacidad")[0]}
                <a href="/privacidad" className="text-link hover:underline">
                  Política de Privacidad
                </a>
                {f.consent.split("Política de Privacidad")[1]}
              </span>
            </label>
            {errors.consent && (
              <p id="consent-error" className="mt-2 text-[13px] text-red-600 dark:text-red-400">
                {f.errors.consent}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-4 sm:col-span-2 sm:flex-row sm:items-center">
            <button
              type="submit"
              disabled={status === "loading"}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-ink px-8 text-[17px] font-medium text-canvas transition-colors duration-300 hover:bg-ink/85 disabled:opacity-60"
            >
              {status === "loading" && <Loader2 aria-hidden className="h-4 w-4 animate-spin" />}
              {status === "loading" ? f.sending : f.submit}
            </button>
            <p aria-live="polite" className="text-[14px] text-red-600 dark:text-red-400">
              {status === "error" && (
                <>
                  {f.error}{" "}
                  <a href={`mailto:${SITE.contact.email}`} className="underline">
                    {SITE.contact.email}
                  </a>
                  .
                </>
              )}
            </p>
          </div>
        </motion.form>
      )}
    </AnimatePresence>
  );
}

export function Contact() {
  const c = SITE.contact;
  const rows = [
    { icon: Phone, label: contact.labels.phone, value: c.phone, href: c.phoneHref },
    { icon: MessageCircle, label: contact.labels.whatsapp, value: c.whatsapp, href: c.whatsappHref },
    { icon: Mail, label: contact.labels.email, value: c.email, href: `mailto:${c.email}` },
    { icon: Clock, label: contact.labels.hours, value: c.hours, href: undefined },
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
            <p className="mt-5 text-lead text-ink-muted">{contact.intro}</p>
          </Reveal>

          <Reveal delay={0.08}>
            <dl className="mt-10 space-y-5">
              {rows.map(({ icon: Icon, label, value, href }) => (
                <div key={label} className="flex items-start gap-4">
                  <Icon aria-hidden className="mt-1 h-5 w-5 shrink-0 text-ink-muted" strokeWidth={1.5} />
                  <div>
                    <dt className="text-[13px] text-ink-muted">{label}</dt>
                    <dd className="text-[17px] text-ink">
                      {href ? (
                        <a
                          href={href}
                          className="hover:text-link"
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

            <div className="mt-8 flex gap-3">
              <a
                href={c.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Instagram ${c.instagramHandle}`}
                className="flex h-11 w-11 items-center justify-center rounded-full bg-canvas-alt text-ink transition-colors hover:bg-line/60"
              >
                <Instagram aria-hidden className="h-5 w-5" strokeWidth={1.5} />
              </a>
            </div>
          </Reveal>

        </div>

        <Reveal delay={0.1} className="relative lg:col-span-7">
          <ContactForm />
        </Reveal>
      </div>
    </section>
  );
}
