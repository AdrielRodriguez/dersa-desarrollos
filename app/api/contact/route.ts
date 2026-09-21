import { NextResponse } from "next/server";
import { validateContact, type ContactPayload } from "@/lib/contact";

/* --------------------------------------------------------------------------
   POST /api/contact
   Recibe el formulario, valida, filtra spam y lo reenvía a:
     A) Resend (email)          → RESEND_API_KEY + CONTACT_TO_EMAIL (+ CONTACT_FROM_EMAIL)
     B) Webhook (n8n, Make…)    → CONTACT_WEBHOOK_URL
   Si no hay ninguna configurada, en desarrollo solo se loguea en consola.
   -------------------------------------------------------------------------- */

export const runtime = "nodejs";

// Rate limit muy simple en memoria (por instancia). Para producción con
// múltiples instancias, reemplazar por Upstash/Redis.
const hits = new Map<string, { count: number; ts: number }>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_HITS = 5;

function rateLimited(ip: string) {
  const now = Date.now();
  const entry = hits.get(ip);
  if (!entry || now - entry.ts > WINDOW_MS) {
    hits.set(ip, { count: 1, ts: now });
    return false;
  }
  entry.count += 1;
  return entry.count > MAX_HITS;
}

const clean = (v: unknown, max = 2000) => (typeof v === "string" ? v.trim().slice(0, max) : "");

const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  const data: ContactPayload = {
    name: clean(body.name, 120),
    email: clean(body.email, 200),
    phone: clean(body.phone, 40),
    projectType: clean(body.projectType, 80),
    budget: clean(body.budget, 80),
    location: clean(body.location, 160),
    message: clean(body.message, 5000),
    consent: body.consent === true,
    company: clean(body.company, 200),
  };

  // Honeypot: si viene completo, respondemos OK sin hacer nada.
  if (data.company) return NextResponse.json({ ok: true });

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "local";
  if (rateLimited(ip)) {
    return NextResponse.json({ ok: false, error: "rate_limited" }, { status: 429 });
  }

  const errors = validateContact(data);
  if (Object.keys(errors).length) {
    return NextResponse.json({ ok: false, errors }, { status: 422 });
  }

  const { company: _honeypot, ...lead } = data;
  const payload = { ...lead, source: "web-dersa", receivedAt: new Date().toISOString() };

  try {
    const tasks: Promise<unknown>[] = [];

    // --- Opción A: email vía Resend -----------------------------------------
    // TODO: crear cuenta en https://resend.com, verificar el dominio y completar
    //       RESEND_API_KEY, CONTACT_TO_EMAIL y CONTACT_FROM_EMAIL en .env.local
    //       (Alternativa: Nodemailer con SMTP propio.)
    if (process.env.RESEND_API_KEY && process.env.CONTACT_TO_EMAIL) {
      const rows = Object.entries(lead)
        .map(([k, v]) => `<tr><td style="padding:4px 12px 4px 0;color:#6E6E73">${k}</td><td>${escapeHtml(String(v))}</td></tr>`)
        .join("");
      tasks.push(
        fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: process.env.CONTACT_FROM_EMAIL ?? "DERSA Web <onboarding@resend.dev>",
            to: [process.env.CONTACT_TO_EMAIL],
            reply_to: lead.email,
            subject: `Nueva consulta web — ${lead.name} (${lead.projectType})`,
            html: `<h2 style="font-family:sans-serif">Nueva consulta desde la web</h2><table style="font-family:sans-serif;font-size:14px">${rows}</table>`,
          }),
        }).then((r) => {
          if (!r.ok) throw new Error(`Resend ${r.status}`);
        })
      );
    }

    // --- Opción B: webhook (n8n / Make / Zapier) -----------------------------
    // TODO: completar CONTACT_WEBHOOK_URL con la URL del webhook de n8n.
    if (process.env.CONTACT_WEBHOOK_URL) {
      tasks.push(
        fetch(process.env.CONTACT_WEBHOOK_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }).then((r) => {
          if (!r.ok) throw new Error(`Webhook ${r.status}`);
        })
      );
    }

    if (tasks.length === 0) {
      // TODO: sin integración configurada. En producción esto debería fallar.
      if (process.env.NODE_ENV === "production") {
        console.error("[contact] No hay integración configurada (RESEND_API_KEY o CONTACT_WEBHOOK_URL).");
        return NextResponse.json({ ok: false, error: "not_configured" }, { status: 500 });
      }
      console.info("[contact] Nueva consulta (dev, sin integración):", payload);
    }

    await Promise.all(tasks);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[contact] Error al enviar:", error);
    return NextResponse.json({ ok: false, error: "delivery_failed" }, { status: 502 });
  }
}
