import Image from "next/image";
import { content } from "@/lib/content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { formatDate } from "@/lib/utils";

const { journal } = content;

export function Journal() {
  return (
    <section id="journal" aria-labelledby="journal-title" className="section-y bg-canvas-alt">
      <div className="container-content">
        <SectionHeading id="journal-title" eyebrow={journal.eyebrow} title={journal.title} intro={journal.intro} />

        <ul className="mt-14 grid gap-6 md:mt-20 md:grid-cols-3">
          {journal.items.map((post, i) => (
            <li key={post.title}>
              <Reveal delay={i * 0.08} className="h-full">
                {/* TODO: enlazar a /journal/[slug] cuando existan los artículos */}
                <article className="group flex h-full flex-col overflow-hidden rounded-card bg-canvas transition-shadow duration-500 hover:shadow-soft">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={post.image.src}
                      alt={post.image.alt}
                      fill
                      sizes="(min-width: 768px) 400px, 100vw"
                      placeholder="blur"
                      blurDataURL={post.image.blurDataURL}
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-7 md:p-8">
                    <p className="eyebrow">{post.category}</p>
                    <h3 className="mt-3 text-[22px] leading-snug tracking-[-0.015em] text-ink">{post.title}</h3>
                    <p className="mt-3 text-[16px] text-ink-muted text-pretty">{post.excerpt}</p>
                    <p className="mt-auto pt-6 text-[14px] text-ink-muted">
                      <time dateTime={post.date}>{formatDate(post.date)}</time> · {post.minutes} {journal.readTime}
                    </p>
                  </div>
                </article>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
