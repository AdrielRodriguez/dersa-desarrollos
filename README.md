# DERSA Arquitectura — Landing

Next.js 14 (App Router) · TypeScript · Tailwind CSS · Framer Motion · Lucide.

## Instalación y ejecución

```bash
npm install
cp .env.example .env.local   # completar variables
npm run dev                  # http://localhost:3000
npm run build && npm start   # producción en :3000
```

## Estructura

```
app/
  layout.tsx              Fuente Inter, metadata SEO, Navbar, Footer, cookies
  page.tsx                Landing (orden de secciones)
  globals.css             Tokens de color (claro/oscuro), tipografía, utilidades
  privacidad/ terminos/   Páginas legales
  sitemap.ts robots.ts opengraph-image.tsx icon.png apple-icon.png not-found.tsx
components/
  sections/               Navbar, Hero, Statement, Stats, Studio, Philosophy,
                          Services, Process, Capabilities, Testimonials, Awards, Journal,
                          FAQ, FinalCTA, Contact, Footer
  ui/                     Reveal, Button, SectionHeading, ParallaxImage, Counter, Icon,
                          Logo, CookieConsent, JsonLd, Providers, LegalPage
lib/
  content.ts              TODO el contenido editable (i18n-ready) + IMAGES + SITE
  image-loader.ts         Loader de next/image para Unsplash
  utils.ts
```

## Contacto

La sección de contacto no usa formulario: ofrece WhatsApp (con mensaje precargado) y email.
Textos en `content.contact`, datos en `SITE.contact` (`lib/content.ts`).

## Analytics

Desactivado por defecto. Se carga solo si el visitante acepta cookies y existe
`NEXT_PUBLIC_GA_ID` (GA4) o `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` (Plausible).

## Placeholders a reemplazar (todos en `lib/content.ts`)

Buscá `[[` en el archivo:

| Placeholder | Dónde |
|---|---|
| `[[dominio]]` | `SITE.url` (o `NEXT_PUBLIC_SITE_URL`) |
| `[[año de fundación]]` | `SITE.foundingYear` |
| `[[horarios]]` | `SITE.contact.hours` (y `openingHoursSpecification` en `components/ui/JsonLd.tsx`) |
| `[[nombre del fundador]]` / `[[bio del fundador]]` | `studio.founder` |
| `[[años de experiencia]]` `[[proyectos]]` `[[m2]]` `[[premios]]` | `stats.items` |
| `[[logos de clientes]]` | `testimonials.logos` |
| Imágenes | constante `IMAGES` (src + alt) |
| Premios, testimonios, artículos | `awards`, `testimonials`, `journal` |
| Textos legales | `legal.privacy` / `legal.terms` |

## Logo

El isotipo original está en `public/ChatGPT Image 21 sept 2026, 10_25_52 a.m..png` (blanco sobre transparente).
A partir de él se generaron `public/logo-dark.png`, `public/logo-light.png`, `app/icon.png` y `app/apple-icon.png`.
