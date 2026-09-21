/** Validación compartida entre el formulario (cliente) y /api/contact (servidor). */

export type ContactPayload = {
  name: string;
  email: string;
  phone: string;
  projectType: string;
  budget: string;
  location: string;
  message: string;
  consent: boolean;
  company?: string; // honeypot: debe llegar vacío
};

export type ContactErrors = Partial<Record<"name" | "email" | "phone" | "projectType" | "message" | "consent", true>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^[+()\d\s-]{6,20}$/;

export function validateContact(data: ContactPayload): ContactErrors {
  const errors: ContactErrors = {};
  if (!data.name || data.name.trim().length < 2) errors.name = true;
  if (!EMAIL_RE.test(data.email?.trim() ?? "")) errors.email = true;
  if (data.phone && !PHONE_RE.test(data.phone.trim())) errors.phone = true;
  if (!data.projectType) errors.projectType = true;
  if (!data.message || data.message.trim().length < 20) errors.message = true;
  if (!data.consent) errors.consent = true;
  return errors;
}
