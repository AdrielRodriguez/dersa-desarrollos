import { content, IMAGES, SITE } from "@/lib/content";

/** Datos estructurados del estudio (ArchitecturalService / LocalBusiness). */
export function StudioJsonLd() {
  const c = SITE.contact;
  const data = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "ProfessionalService"],
    additionalType: "https://schema.org/ArchitecturalService",
    "@id": `${SITE.url}/#studio`,
    name: SITE.legalName,
    description: content.meta.description,
    url: SITE.url,
    image: `${IMAGES.hero.src}?w=1200&q=80&auto=format&fit=crop`,
    logo: `${SITE.url}/logo-dark.png`,
    email: c.email,
    telephone: c.phone,
    foundingDate: String(SITE.foundingYear),
    founder: { "@type": "Person", name: content.studio.founder.name, jobTitle: content.studio.founder.role },
    address: { "@type": "PostalAddress", addressCountry: c.country },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "18:00",
      },
    ],
    areaServed: "Argentina",
    sameAs: [c.instagram],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Servicios",
      itemListElement: content.services.items.map((s) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: s.title, description: s.text },
      })),
    },
  };

  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: content.faq.items.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }} />
    </>
  );
}
