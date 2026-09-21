import { PillLink } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <main id="contenido" className="flex min-h-[80svh] items-center bg-canvas pt-nav">
      <div className="container-content text-center">
        <p className="eyebrow">Error 404</p>
        <h1 className="mt-4 text-section text-ink">Este espacio todavía no existe.</h1>
        <p className="mt-4 text-lead text-ink-muted">La página que buscás se movió o nunca fue construida.</p>
        <div className="mt-10">
          <PillLink href="/">Volver al inicio</PillLink>
        </div>
      </div>
    </main>
  );
}
