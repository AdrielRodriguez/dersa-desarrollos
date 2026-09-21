import { Reveal } from "./Reveal";

export function LegalPage({ title, updated, body }: { title: string; updated: string; body: string[] }) {
  return (
    <main id="contenido" className="bg-canvas pb-[72px] pt-[calc(56px+72px)] md:pb-[120px] md:pt-[calc(56px+120px)]">
      <div className="container-content max-w-3xl">
        <Reveal>
          <h1 className="text-section text-ink">{title}</h1>
          <p className="mt-4 text-[14px] text-ink-muted">{updated}</p>
          {/* TODO: reemplazar por el texto legal definitivo revisado por un profesional. */}
          <div className="mt-12 space-y-6">
            {body.map((p, i) => (
              <p key={i} className="text-lead text-ink-muted text-pretty">
                {p}
              </p>
            ))}
          </div>
        </Reveal>
      </div>
    </main>
  );
}
