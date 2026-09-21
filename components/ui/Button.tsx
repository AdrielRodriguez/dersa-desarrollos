import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "inverse" | "outline-dark";
type Size = "sm" | "md" | "lg";

const variants: Record<Variant, string> = {
  primary: "bg-ink text-canvas hover:bg-ink/85",
  inverse: "bg-night-fg text-night hover:bg-white",
  "outline-dark": "border border-night-fg/25 text-night-fg hover:bg-night-fg/10",
};

const sizes: Record<Size, string> = {
  sm: "h-8 px-4 text-[13px]",
  md: "h-11 px-6 text-[15px]",
  lg: "h-14 px-8 text-[17px]",
};

type PillProps = {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  external?: boolean;
  onClick?: () => void;
};

export const pillClass = (variant: Variant = "primary", size: Size = "md", className?: string) =>
  cn(
    "inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-[-0.01em] transition-colors duration-300 ease-apple",
    variants[variant],
    sizes[size],
    className
  );

/** Botón tipo pastilla (link). */
export function PillLink({ href, children, variant = "primary", size = "md", className, external, onClick }: PillProps) {
  const cls = pillClass(variant, size, className);
  if (external) {
    return (
      <a href={href} className={cls} target="_blank" rel="noopener noreferrer" onClick={onClick}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls} onClick={onClick}>
      {children}
    </Link>
  );
}

/** Link de texto con chevron estilo Apple: "Ver más ›" */
export function ArrowLink({
  href,
  children,
  className,
  external,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  external?: boolean;
}) {
  const cls = cn("group inline-flex items-center gap-0.5 text-link hover:underline underline-offset-4", className);
  const inner = (
    <>
      {children}
      <ChevronRight
        aria-hidden
        className="h-[1em] w-[1em] transition-transform duration-300 group-hover:translate-x-0.5"
        strokeWidth={1.75}
      />
    </>
  );
  return external ? (
    <a href={href} className={cls} target="_blank" rel="noopener noreferrer">
      {inner}
    </a>
  ) : (
    <Link href={href} className={cls}>
      {inner}
    </Link>
  );
}
