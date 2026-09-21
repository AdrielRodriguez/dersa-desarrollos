import { content } from "@/lib/content";
import { Counter } from "@/components/ui/Counter";
import { Reveal } from "@/components/ui/Reveal";

const { stats } = content;

export function Stats() {
  return (
    <section aria-labelledby="stats-title" className="section-y bg-canvas-alt">
      <div className="container-content">
        <h2 id="stats-title" className="sr-only">
          {stats.title}
        </h2>
        <dl className="grid grid-cols-2 gap-x-6 gap-y-14 lg:grid-cols-4">
          {stats.items.map((item, i) => (
            <Reveal key={item.label} delay={i * 0.08} className="flex flex-col-reverse gap-3 text-center lg:text-left">
              <dt className="text-[15px] text-ink-muted md:text-[17px]">{item.label}</dt>
              <dd className="text-[clamp(2.5rem,6vw,4.5rem)] font-semibold leading-none tracking-[-0.035em] text-ink">
                <Counter value={item.value} prefix={item.prefix} suffix={item.suffix} />
              </dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
