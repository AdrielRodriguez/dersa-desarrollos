export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function formatNumber(value: number, locale = "es-AR") {
  return new Intl.NumberFormat(locale).format(value);
}

export function formatDate(iso: string, locale = "es-AR") {
  return new Intl.DateTimeFormat(locale, { day: "numeric", month: "long", year: "numeric" }).format(
    new Date(`${iso}T12:00:00`)
  );
}
