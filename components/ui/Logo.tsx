import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * Logo de DERSA (isotipo de /public + wordmark).
 * El original es blanco sobre transparente; se generaron dos variantes:
 *   /logo-dark.png  → para fondos claros
 *   /logo-light.png → para fondos oscuros
 * Con tone="auto" se elige según prefers-color-scheme.
 */
export function Logo({
  tone = "auto",
  showWordmark = true,
  label = "DERSA",
  wordmarkClassName = "text-[15px] tracking-[0.32em]",
  className,
}: {
  tone?: "auto" | "dark" | "light";
  showWordmark?: boolean;
  label?: string;
  wordmarkClassName?: string;
  className?: string;
}) {
  const mark = (src: string, extra?: string) => (
    <Image src={src} alt="" width={185} height={256} className={cn("h-7 w-auto", extra)} priority />
  );

  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      {tone === "auto" && (
        <>
          {mark("/logo-dark.png", "dark:hidden")}
          {mark("/logo-light.png", "hidden dark:block")}
        </>
      )}
      {tone === "dark" && mark("/logo-dark.png")}
      {tone === "light" && mark("/logo-light.png")}
      {showWordmark && (
        <span
          className={cn(
            "whitespace-nowrap font-semibold",
            wordmarkClassName,
            tone === "light" ? "text-night-fg" : tone === "dark" ? "text-[#1D1D1F]" : "text-ink"
          )}
        >
          {label}
        </span>
      )}
    </span>
  );
}
