/* ==========================================================================
   DERSA · Contenido centralizado
   --------------------------------------------------------------------------
   TODO el texto y los datos editables del sitio viven en este archivo.
   Estructura preparada para i18n: `dictionary.es` hoy, `dictionary.en` mañana.
   Los valores marcados con  // [[...]]  son placeholders a reemplazar.
   ========================================================================== */

export type Locale = "es"; // Sumar "en" cuando esté la traducción.
export const defaultLocale: Locale = "es";

/* --------------------------------------------------------------------------
   Imágenes
   Única fuente de verdad para todas las fotos. Reemplazá `src` por tus
   imágenes reales (Unsplash, /public o un CDN) y ajustá `alt`.
   `tone` define el color del blur placeholder mientras carga la imagen.
   -------------------------------------------------------------------------- */
export type SiteImage = { src: string; alt: string; blurDataURL: string };

const u = (id: string) => `https://images.unsplash.com/${id}`;

/** Genera un blur placeholder mínimo (SVG) con un degradé del tono de la foto. */
export const blur = (from: string, to: string = from) =>
  `data:image/svg+xml;charset=utf-8,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="8" height="6"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${from}"/><stop offset="1" stop-color="${to}"/></linearGradient></defs><rect width="8" height="6" fill="url(#g)"/></svg>`
  )}`;

const img = (id: string, alt: string, from: string, to?: string): SiteImage => ({
  src: u(id),
  alt,
  blurDataURL: blur(from, to),
});

export const IMAGES = {
  hero: img("photo-1600585154340-be6161a56a0c", "Casa contemporánea de hormigón y vidrio iluminada al atardecer, con piscina en primer plano", "#3b3f45", "#9a8f84"),
  studio: img("photo-1503387762-592deb58ef4e", "Mesa de trabajo del estudio con planos, maquetas y herramientas de dibujo", "#c9c4bd", "#8e877e"),
  founder: { src: "/fundador.jpg", alt: "Retrato de Kevin Rodriguez, fundador de DERSA", blurDataURL: blur("#c2bab0", "#8a7b6f") },

  light: img("photo-1479839672679-a46483c0e7c8", "Luz natural entrando entre volúmenes de hormigón", "#6b6d70", "#c8c9cb"),
  space: img("photo-1449844908441-8829872d2607", "Casa de madera en el bosque integrada al paisaje", "#3f4a40", "#9aa08d"),
  detail: img("photo-1431576901776-e539bd916ba2", "Detalle de fachada con líneas verticales y sombras precisas", "#8d9095", "#d6d7d9"),

  sustainable: img("photo-1523217582562-09d0def993a6", "Vivienda con cubierta verde y aleros que controlan el sol", "#6f7d6c", "#cfd3c8"),
  technology: img("photo-1558036117-15d82a90b9b1", "Estructura arquitectónica paramétrica vista desde abajo", "#9aa4ad", "#e3e6e8"),
  craft: img("photo-1556912173-3bb406ef7e77", "Carpintería a medida en madera con encuentros precisos", "#b8a996", "#6f6252"),

  journal1: img("photo-1494526585095-c41746248156", "Casa con grandes ventanales iluminada por el sol de la tarde", "#8f9ba1", "#e0d9cc"),
  journal2: img("photo-1504307651254-35680f356dfd", "Obra en construcción con estructura de hormigón y andamios", "#8a8a86", "#c6c3bb"),
  journal3: img("photo-1541888946425-d81bb19240f5", "Arquitectos revisando planos en obra", "#7e7b76", "#cbc4b8"),

  avatar1: img("photo-1494790108377-be9c29b29330", "Retrato de Lucía Ferrer", "#b39c8c", "#5a4a40"),
  avatar2: img("photo-1500648767791-00dcc994a43e", "Retrato de Martín Olivera", "#8b7d72", "#3b3531"),
  avatar3: img("photo-1438761681033-6461ffad8d80", "Retrato de Carolina Méndez", "#a89a8f", "#4e4540"),
  avatar4: img("photo-1507003211169-0a1dd7228f2d", "Retrato de Andrés Pardo", "#8f8076", "#3e3632"),
} satisfies Record<string, SiteImage>;

/* --------------------------------------------------------------------------
   Datos del estudio (placeholders)
   -------------------------------------------------------------------------- */
export const SITE = {
  name: "DERSA",
  legalName: "DERSA Arquitectura",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.dersa.com.ar", // [[dominio]]
  foundingYear: 2024,
  contact: {
    country: "AR",
    phone: "+54 3442 621770",
    phoneHref: "tel:+543442621770",
    whatsapp: "+54 3442 621770",
    whatsappHref: "https://wa.me/5493442621770",
    email: "dersadesarrollos@gmail.com",
    hours: "Lunes a viernes · 9 a 18 h", // [[horarios]]
    instagram: "https://www.instagram.com/derudderdesarrollos/",
    instagramHandle: "@derudderdesarrollos",
  },
} as const;

/* --------------------------------------------------------------------------
   Tipos
   -------------------------------------------------------------------------- */
export type IconName =
  | "compass"
  | "sun"
  | "layers"
  | "pen"
  | "sofa"
  | "trees"
  | "hammer"
  | "hardhat"
  | "box"
  | "leaf"
  | "cpu"
  | "ruler";

/* --------------------------------------------------------------------------
   Diccionario (es)
   -------------------------------------------------------------------------- */
const es = {
  meta: {
    title: "DERSA Arquitectura — Arquitectura, destilada.",
    description:
      "Estudio de arquitectura. Diseñamos viviendas, espacios de trabajo y espacios públicos con claridad, luz y honestidad material.",
    keywords: [
      "estudio de arquitectura",
      "diseño de viviendas",
      "arquitectura de interiores",
      "dirección de obra",
      "refacciones",
    ],
  },

  nav: {
    links: [
      { label: "Estudio", href: "/#estudio" },
      { label: "Servicios", href: "/#servicios" },
      { label: "Proceso", href: "/#proceso" },
      { label: "Journal", href: "/#journal" },
      { label: "Contacto", href: "/#contacto" },
    ],
    cta: { label: "Agendá una consulta", href: "/#contacto" },
    openMenu: "Abrir menú",
    closeMenu: "Cerrar menú",
    skipToContent: "Saltar al contenido",
  },

  hero: {
    eyebrow: "Estudio de arquitectura",
    title: "Arquitectura, destilada.",
    // Alternativas: "Espacios que respiran." / "Diseñados para ser vividos."
    subtitle:
      "Diseñamos viviendas, espacios de trabajo y espacios públicos con claridad, luz y honestidad material.",
    primaryCta: { label: "Ver servicios", href: "#servicios" },
    secondaryCta: { label: "Agendá una consulta", href: "#contacto" },
    scrollHint: "Deslizá para descubrir",
    image: IMAGES.hero,
  },

  statement: {
    text: "Creemos que la gran arquitectura es silenciosa. Enmarca la luz, respeta el contexto y desaparece dentro de la vida que contiene.",
  },

  stats: {
    title: "DERSA en números",
    items: [
      { value: 18, prefix: "", suffix: "", label: "Años de trayectoria" }, // [[años de experiencia]]
      { value: 140, prefix: "+", suffix: "", label: "Proyectos entregados" }, // [[proyectos]]
      { value: 85000, prefix: "", suffix: "", label: "m² construidos" }, // [[m2]]
      { value: 24, prefix: "", suffix: "", label: "Premios y menciones" }, // [[premios]]
    ],
  },

  studio: {
    eyebrow: "El Estudio",
    title: "Un equipo pequeño. Una forma precisa de pensar.",
    paragraphs: [
      "DERSA nació con una idea simple: que cada proyecto responda a su lugar, a su luz y a las personas que lo van a habitar. No partimos de un estilo. Partimos de preguntas.",
      "En casi dos décadas diseñamos casas, oficinas, locales y espacios públicos en Argentina y Uruguay. Cada obra nos dejó el mismo aprendizaje: lo esencial se decide temprano y se sostiene con detalle.",
      "Trabajamos como un taller. Arquitectos, interioristas y técnicos comparten la misma mesa desde el primer boceto hasta la entrega de llaves, con un único interlocutor para cada cliente.",
    ],
    image: IMAGES.studio,
    founder: {
      name: "Kevin Rodriguez",
      role: "Maestro Mayor de Obras · Fundador y Director",
      bio: "Maestro Mayor de Obras, con experiencia en el desarrollo y dirección de proyectos arquitectónicos de pequeña y mediana escala. Desde la fundación de DERSA en 2024, ha trabajado en la creación de espacios funcionales, contemporáneos y adaptados a las necesidades de cada cliente, acompañando cada proyecto desde su concepción hasta su ejecución.",
      image: IMAGES.founder,
    },
    values: [
      { icon: "compass" as IconName, title: "Contexto", text: "Cada terreno tiene una orientación, un clima y una historia. El proyecto empieza por escucharlos." },
      { icon: "sun" as IconName, title: "Luz", text: "Diseñamos con el recorrido del sol. La luz natural ordena los espacios y define su carácter." },
      { icon: "layers" as IconName, title: "Honestidad material", text: "Materiales nobles, usados como son. Que envejezcan bien y cuenten cómo fueron construidos." },
    ],
  },

  philosophy: {
    eyebrow: "Filosofía",
    items: [
      {
        title: "La luz es el primer material.",
        text: "Antes de elegir un revestimiento estudiamos el sol. Aberturas, aleros y patios se dimensionan para que cada ambiente tenga la luz que necesita, a la hora que la necesita.",
        image: IMAGES.light,
      },
      {
        title: "El espacio es una sensación antes que una forma.",
        text: "Una altura generosa, un recorrido que se abre, un umbral en penumbra. Diseñamos cómo se siente estar en un lugar, no solo cómo se ve desde afuera.",
        image: IMAGES.space,
      },
      {
        title: "Cada detalle es una decisión.",
        text: "El encuentro entre dos materiales, la altura de un zócalo, el canto de una mesada. Dibujamos cada detalle porque ahí se juega la calidad de una obra.",
        image: IMAGES.detail,
      },
    ],
  },

  services: {
    eyebrow: "Servicios",
    title: "Del primer boceto a la entrega de llaves.",
    intro: "Podemos acompañarte en todo el proceso o en una etapa puntual.",
    more: "Ver más",
    items: [
      { icon: "pen" as IconName, title: "Diseño arquitectónico", text: "Viviendas, edificios y espacios comerciales pensados desde el terreno, el programa y el presupuesto." },
      { icon: "sofa" as IconName, title: "Arquitectura de interiores", text: "Espacios interiores completos: distribución, iluminación, materiales, mobiliario y carpinterías." },
      { icon: "trees" as IconName, title: "Diseño urbano y paisajismo", text: "Plazas, patios y espacios exteriores que conectan la arquitectura con su entorno." },
      { icon: "hammer" as IconName, title: "Refacción y restauración", text: "Intervenciones sobre edificios existentes que respetan su historia y los preparan para las próximas décadas." },
      { icon: "hardhat" as IconName, title: "Dirección de obra y gestión de proyectos", text: "Coordinamos gremios, plazos y costos para que lo construido sea fiel a lo diseñado." },
      { icon: "box" as IconName, title: "Visualización 3D y estudios de factibilidad", text: "Renders, recorridos virtuales y análisis normativo para decidir con información antes de invertir." },
    ],
  },

  process: {
    eyebrow: "Proceso",
    title: "Cinco etapas. Un solo criterio.",
    intro: "Un método claro para que sepas en cada momento qué estamos haciendo, qué decidimos y qué viene después.",
    durationLabel: "Duración estimada",
    steps: [
      { number: "01", title: "Descubrimiento", text: "Escuchamos cómo vivís o trabajás, visitamos el terreno y analizamos normativa, orientación y presupuesto. El resultado es un brief compartido.", duration: "2 a 3 semanas" },
      { number: "02", title: "Concepto", text: "Bocetos, maquetas de volumetría y una primera visión del proyecto. Exploramos alternativas y elegimos juntos un camino.", duration: "3 a 5 semanas" },
      { number: "03", title: "Desarrollo", text: "Planos generales, selección de materiales, instalaciones y detalles constructivos. El proyecto se vuelve preciso y presupuestable.", duration: "6 a 10 semanas" },
      { number: "04", title: "Permisos y documentación", text: "Preparamos la documentación municipal y técnica, gestionamos los permisos y armamos el pliego para cotizar con constructoras.", duration: "4 a 12 semanas" },
      { number: "05", title: "Obra y entrega", text: "Dirigimos la obra con visitas periódicas, controlamos calidad, plazos y certificaciones hasta la entrega de llaves.", duration: "Según el proyecto" },
    ],
  },

  capabilities: {
    eyebrow: "Capacidades",
    title: "Lo que no se ve, también se diseña.",
    items: [
      {
        eyebrow: "Diseño sustentable",
        title: "Menos energía. Más confort.",
        text: "Priorizamos estrategias pasivas: orientación, ventilación cruzada, masa térmica y protección solar. Después, eficiencia en instalaciones y materiales locales que reducen la huella de cada obra.",
        points: ["Estrategias bioclimáticas pasivas", "Eficiencia energética y aislación", "Materiales locales y de bajo impacto"],
        image: IMAGES.sustainable,
      },
      {
        eyebrow: "Tecnología",
        title: "Precisión antes de construir.",
        text: "Trabajamos en BIM para coordinar arquitectura, estructura e instalaciones en un único modelo. Usamos diseño paramétrico cuando la geometría lo pide y recorridos en realidad virtual para que recorras tu proyecto antes de que exista.",
        points: ["Modelado BIM coordinado", "Diseño paramétrico", "Recorridos en realidad virtual"],
        image: IMAGES.technology,
      },
      {
        eyebrow: "Oficio y artesanía",
        title: "El detalle, dibujado a mano.",
        text: "Diseñamos carpinterías a medida y resolvemos cada encuentro en planos de detalle. Trabajamos con talleres de confianza que comparten nuestra exigencia.",
        points: ["Carpintería y mobiliario a medida", "Planos de detalle 1:5 y 1:1", "Red de talleres y artesanos"],
        image: IMAGES.craft,
      },
    ],
  },

  testimonials: {
    eyebrow: "Testimonios",
    title: "Lo que dicen quienes ya viven nuestros proyectos",
    previous: "Testimonio anterior",
    next: "Testimonio siguiente",
    goTo: "Ir al testimonio",
    items: [
      { quote: "Entendieron cómo queríamos vivir antes de que nosotros mismos pudiéramos explicarlo. La casa es exactamente eso.", name: "Lucía Ferrer", role: "Propietaria · Vivienda unifamiliar", avatar: IMAGES.avatar1 },
      { quote: "Cumplieron plazos y presupuesto en una obra compleja, sin resignar diseño. Es raro encontrar las dos cosas en el mismo equipo.", name: "Martín Olivera", role: "Director de Desarrollo · Edificio de uso mixto", avatar: IMAGES.avatar2 },
      { quote: "Nuestra oficina cambió la forma en que trabajamos. Hay más luz, más silencio y mejores conversaciones.", name: "Carolina Méndez", role: "COO · Oficinas corporativas", avatar: IMAGES.avatar3 },
      { quote: "El proceso fue claro de principio a fin. Siempre supimos qué se estaba decidiendo y por qué.", name: "Andrés Pardo", role: "Propietario · Casa de fin de semana", avatar: IMAGES.avatar4 },
    ],
  },

  journal: {
    eyebrow: "Journal",
    title: "Notas sobre el oficio.",
    intro: "Ideas, procesos y respuestas a las preguntas que más nos hacen.",
    readTime: "min de lectura",
    items: [
      { category: "Diseño", title: "Diseñar con luz natural", excerpt: "Orientación, profundidad de los ambientes y control solar: cómo decidimos dónde va cada ventana.", date: "2026-08-12", minutes: 6, image: IMAGES.journal1 },
      { category: "Guías", title: "Refaccionar o construir de cero", excerpt: "Costos, plazos y potencial de cada opción. Una guía para decidir con criterio antes de comprar.", date: "2026-07-03", minutes: 8, image: IMAGES.journal2 },
      { category: "Proceso", title: "¿Cuánto tarda un proyecto residencial?", excerpt: "Del primer encuentro a la entrega de llaves: tiempos reales de cada etapa y qué los acelera.", date: "2026-05-21", minutes: 5, image: IMAGES.journal3 },
    ],
  },

  faq: {
    eyebrow: "Preguntas frecuentes",
    title: "Lo que conviene saber antes de empezar.",
    items: [
      { q: "¿Cómo empieza un proyecto?", a: "Con una primera reunión sin cargo, presencial o por videollamada. Conversamos sobre lo que necesitás, el terreno o inmueble y el presupuesto. Si hay acuerdo, enviamos una propuesta de honorarios con alcance, etapas y plazos." },
      { q: "¿Cuánto cobra un arquitecto?", a: "Depende del tipo de obra, la superficie y el alcance del servicio. En general los honorarios se calculan como un porcentaje del costo de obra o como un monto fijo por etapa. Después de la primera reunión te enviamos un presupuesto detallado y sin sorpresas." },
      { q: "¿Cuánto dura la etapa de diseño?", a: "Para una vivienda unifamiliar, entre 3 y 5 meses desde el concepto hasta la documentación completa. Proyectos de interiorismo pueden resolverse en 6 a 10 semanas. Te damos un cronograma concreto al comenzar." },
      { q: "¿Se encargan de los permisos?", a: "Sí. Preparamos toda la documentación municipal, firmamos como profesionales responsables y hacemos el seguimiento del expediente hasta obtener el permiso de obra y, al final, el final de obra." },
      { q: "¿Trabajan de forma remota / en otras ciudades?", a: "Sí. Desarrollamos proyectos en todo el país y en el exterior. Las etapas de diseño se trabajan en reuniones virtuales, y para la obra coordinamos visitas periódicas o trabajamos con un director de obra local." },
      { q: "¿Pueden dirigir la obra?", a: "Sí, y lo recomendamos. La dirección de obra asegura que lo construido respete el proyecto, controla la calidad y certifica los avances para que pagues solo lo ejecutado." },
      { q: "¿Qué información tengo que llevar a la primera reunión?", a: "Lo que tengas: escritura o datos del terreno, planos existentes si es una refacción, fotos, referencias que te gusten y un presupuesto estimado. Si no tenés nada de eso, no hay problema: lo armamos juntos." },
      { q: "¿Hacen también diseño de interiores?", a: "Sí. Tenemos un área dedicada a interiorismo: distribución, iluminación, materiales, carpinterías y selección de mobiliario. Podemos hacerlo como parte de una obra nueva o como proyecto independiente." },
    ],
  },

  finalCta: {
    title: "Diseñemos lo que viene.",
    text: "Contanos tu idea. La primera reunión es sin cargo y sin compromiso.",
    button: "Agendá una consulta",
    whatsapp: "Escribinos por WhatsApp",
    email: "Envianos un email",
  },

  contact: {
    eyebrow: "Contacto",
    title: "Empecemos a conversar.",
    intro: "Completá el formulario y te respondemos dentro de las 48 horas hábiles.",
    labels: {
      phone: "Teléfono",
      whatsapp: "WhatsApp",
      email: "Email",
      hours: "Horarios",
      social: "Redes",
    },
    form: {
      name: "Nombre y apellido",
      email: "Email",
      phone: "Teléfono",
      projectType: "Tipo de proyecto",
      budget: "Presupuesto aproximado",
      location: "Ubicación del proyecto",
      message: "Contanos sobre tu proyecto",
      consent: "Acepto que DERSA use estos datos para responder mi consulta, según la Política de Privacidad.",
      select: "Seleccioná una opción",
      projectTypes: ["Vivienda nueva", "Refacción o ampliación", "Interiorismo", "Oficinas o comercial", "Espacio público o institucional", "Otro"],
      budgets: ["Hasta USD 50.000", "USD 50.000 – 150.000", "USD 150.000 – 400.000", "Más de USD 400.000", "Todavía no lo sé"],
      submit: "Enviar consulta",
      sending: "Enviando…",
      successTitle: "¡Gracias! Recibimos tu consulta.",
      successText: "Te vamos a escribir dentro de las próximas 48 horas hábiles.",
      sendAnother: "Enviar otra consulta",
      error: "No pudimos enviar tu mensaje. Probá de nuevo o escribinos a",
      optional: "opcional",
      errors: {
        name: "Ingresá tu nombre.",
        email: "Ingresá un email válido.",
        phone: "Ingresá un teléfono válido.",
        projectType: "Elegí un tipo de proyecto.",
        message: "Contanos un poco más (mínimo 20 caracteres).",
        consent: "Necesitamos tu consentimiento para responderte.",
      },
    },
  },

  footer: {
    tagline: "Arquitectura, destilada.",
    columns: [
      { title: "Estudio", links: [{ label: "Sobre nosotros", href: "/#estudio" }, { label: "Filosofía", href: "/#filosofia" }, { label: "Proceso", href: "/#proceso" }] },
      { title: "Servicios", links: [{ label: "Diseño arquitectónico", href: "/#servicios" }, { label: "Interiores", href: "/#servicios" }, { label: "Dirección de obra", href: "/#servicios" }] },
      { title: "Journal", links: [{ label: "Artículos", href: "/#journal" }, { label: "Preguntas frecuentes", href: "/#faq" }] },
      { title: "Contacto", links: [{ label: "Agendá una consulta", href: "/#contacto" }, { label: "WhatsApp", href: SITE.contact.whatsappHref }, { label: "Email", href: `mailto:${SITE.contact.email}` }] },
    ],
    legal: [
      { label: "Privacidad", href: "/privacidad" },
      { label: "Términos", href: "/terminos" },
    ],
    cookies: "Preferencias de cookies",
    copyright: "© 2026 DERSA Arquitectura. Todos los derechos reservados.",
    backToTop: "Volver arriba",
  },

  cookies: {
    text: "Usamos cookies analíticas para entender cómo se usa el sitio. Solo se activan si las aceptás.",
    accept: "Aceptar",
    reject: "Rechazar",
    policy: "Más información",
  },

  legal: {
    privacy: {
      title: "Política de Privacidad",
      updated: "Última actualización: septiembre de 2026",
      body: [
        "DERSA Arquitectura recopila únicamente los datos que nos enviás a través del formulario de contacto (nombre, email, teléfono y detalles del proyecto) con el fin de responder tu consulta.",
        "No vendemos ni compartimos tus datos con terceros. Podés solicitar el acceso, la rectificación o la eliminación de tus datos escribiendo a nuestro email de contacto.",
        "Las cookies analíticas solo se activan si las aceptás en el aviso de cookies. Podés cambiar tu elección en cualquier momento desde el pie de página.",
      ],
    },
    terms: {
      title: "Términos y Condiciones",
      updated: "Última actualización: septiembre de 2026",
      body: [
        "El contenido de este sitio (textos, imágenes y proyectos) es propiedad de DERSA Arquitectura o de sus respectivos autores y no puede reproducirse sin autorización.",
        "La información publicada es de carácter general y no constituye una propuesta comercial. Los honorarios y alcances se definen en cada caso mediante una propuesta escrita.",
      ],
    },
  },
};

/* --------------------------------------------------------------------------
   Exportaciones
   -------------------------------------------------------------------------- */
export type Content = typeof es;

export const dictionary: Record<Locale, { content: Content }> = {
  es: { content: es },
};

export const getContent = (locale: Locale = defaultLocale) => dictionary[locale].content;

/** Atajo para el idioma por defecto. */
export const content = getContent();
