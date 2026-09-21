import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

type Props = {
  eyebrow?: string;
  title: string;
  intro?: string;
  align?: "left" | "center";
  tone?: "default" | "dark";
  className?: string;
  id?: string;
};

export function SectionHeading({ eyebrow, title, intro, align = "left", tone = "default", className, id }: Props) {
  const dark = tone === "dark";
  return (
    <Reveal className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && <p className={cn("eyebrow mb-4", dark && "text-stone")}>{eyebrow}</p>}
      <h2 id={id} className={cn("text-section", dark ? "text-night-fg" : "text-ink")}>
        {title}
      </h2>
      {intro && (
        <p className={cn("mt-5 text-lead text-pretty", dark ? "text-night-muted" : "text-ink-muted")}>{intro}</p>
      )}
    </Reveal>
  );
}
