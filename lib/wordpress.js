// Cliente y adaptador Headless CMS para WordPress / Pantheon
// Lee el Custom Post Type "tienda" (y sus campos: título, resumen, cuerpo, imagen, link, tipo)

const WORDPRESS_BASE_URL =
  process.env.WORDPRESS_URL || "https://dev-actual-now-site.pantheonsite.io";

export const MOCK_PRODUCTS = [
  {
    id: "mock-1",
    titulo: "Teclado Mecánico Inalámbrico Pro RGB",
    resumen:
      "Switches intercambiables, conectividad Bluetooth 5.0 y batería de larga duración para programadores y diseñadores.",
    cuerpo:
      "## Teclado Mecánico de Alto Rendimiento\n\nDiseñado específicamente para largas jornadas de programación y productividad con respuesta táctil inigualable.\n\n### Características destacadas\n- Conectividad triple: Bluetooth 5.0, 2.4GHz y cable USB-C desmontable.\n- Switches mecánicos lubricados de fábrica para una pulsación suave y silenciosa.\n- Teclas PBT de doble inyección resistentes al desgaste y al brillo.\n- Iluminación RGB personalizable con perfiles integrados.",
    imagen_url:
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&auto=format&fit=crop&q=60",
    tipo: "amazon",
    link_compra: "https://amazon.com",
    slug: "teclado-mecanico-inalambrico",
    created_at: "2026-03-01T10:00:00.000Z",
  },
  {
    id: "mock-2",
    titulo: "Ratón Ergonómico Vertical Precisión",
    resumen:
      "Sensor óptico de 4000 DPI con ángulo natural de 57° que reduce la tensión muscular en muñeca y antebrazo.",
    cuerpo:
      "## Ergonomía y Precisión en tu Escritorio\n\nOptimizado para jornadas intensas de trabajo, proporcionando una postura natural de sujeción que previene la fatiga.\n\n### Especificaciones principales\n- Sensor óptico regulable de 1000 a 4000 DPI para alta precisión.\n- Rueda de desplazamiento magnética ultra rápida con cambio de modo.\n- Batería recargable de ion de litio con hasta 70 días de autonomía por carga.\n- Conexión multidispositivo para controlar hasta 3 ordenadores simultáneamente.",
    imagen_url:
      "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=800&auto=format&fit=crop&q=60",
    tipo: "amazon",
    link_compra: "https://amazon.com",
    slug: "raton-ergonomico-vertical",
    created_at: "2026-02-28T12:00:00.000Z",
  },
  {
    id: "mock-3",
    titulo: "Hub USB-C Multipuerto 8 en 1 Aluminio",
    resumen:
      "Salida HDMI 4K@60Hz, carga Power Delivery 100W, Gigabit Ethernet y lector de tarjetas de alta velocidad.",
    cuerpo:
      "## Máxima Conectividad en un Formato Compacto\n\nEl adaptador definitivo para convertir tu portátil en una estación de trabajo completa con un solo cable.\n\n### Puertos integrados\n- 1x HDMI con soporte 4K a 60Hz para monitores de alta resolución.\n- 1x Puerto USB-C con Power Delivery pass-through de hasta 100W.\n- 3x Puertos USB 3.0 de transferencia rápida de hasta 5 Gbps.\n- 1x Lector de tarjetas SD y 1x MicroSD (UHS-I).\n- 1x Puerto Ethernet Gigabit RJ45 de alta estabilidad.",
    imagen_url:
      "https://images.unsplash.com/photo-1622737133809-d95047b9e673?w=800&auto=format&fit=crop&q=60",
    tipo: "amazon",
    link_compra: "https://amazon.com",
    slug: "hub-usbc-multipuerto",
    created_at: "2026-02-25T14:30:00.000Z",
  },
  {
    id: "mock-4",
    titulo: "Auriculares Studio con Cancelación Activa de Ruido",
    resumen:
      "Drivers de 40mm calibrados, cancelación híbrida de ruido ambiental y almohadillas viscoelásticas ultra cómodas.",
    cuerpo:
      "## Sonido Inmersivo sin Distracciones\n\nAísla el entorno de trabajo y disfruta de claridad acústica superior para llamadas, música y producción de contenido.\n\n### Ventajas clave\n- Cancelación activa de ruido híbrida de 4 micrófonos con modo transparencia.\n- Drivers dinámicos de 40mm con certificación de audio Hi-Res.\n- Almohadillas de espuma viscoelástica recubiertas de cuero sintético transpirable.\n- Autonomía de 35 horas con carga rápida: 5 minutos otorgan 4 horas de uso.",
    imagen_url:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=60",
    tipo: "amazon",
    link_compra: "https://amazon.com",
    slug: "auriculares-studio-con",
    created_at: "2026-02-20T09:15:00.000Z",
  },
  {
    id: "mock-5",
    titulo: "Plantilla SaaS Starter Next.js & Tailwind",
    resumen:
      "Boilerplate listo para producción con autenticación, pagos recurrentes, panel administrativo y modo oscuro.",
    cuerpo:
      "## Lanza tu Proyecto SaaS en Días, No en Meses\n\nArquitectura modular y escalable construida sobre Next.js App Router, TypeScript y Tailwind CSS con buenas prácticas.\n\n### Qué incluye la plantilla\n- Integración completa con pasarelas de pago y suscripciones.\n- Sistema de autenticación seguro y gestión de perfiles de usuario.\n- Panel de control responsivo con métricas y gráficas preconfiguradas.\n- Documentación exhaustiva y soporte para despliegue en un clic.",
    imagen_url:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=60",
    tipo: "payhip",
    link_compra: "https://payhip.com",
    slug: "plantilla-saas-starter",
    created_at: "2026-03-05T16:00:00.000Z",
  },
  {
    id: "mock-6",
    titulo: "Sistema Notion Second Brain Pro",
    resumen:
      "Espacio de trabajo integral para gestionar proyectos, tareas, recursos y hábitos bajo la metodología PARA.",
    cuerpo:
      "## Organiza tu Información Digital de Forma Centralizada\n\nConvierte ideas dispersas en proyectos concretos mediante una estructura intuitiva y optimizada para Notion.\n\n### Módulos del sistema\n- Gestor de Proyectos y Tareas con vistas Kanban, calendario y prioridad.\n- Bóveda de Recursos y Notas clasificadas por áreas de interés.\n- Monitor de hábitos diarios y registro de metas trimestrales.\n- Tablero semanal de revisión y productividad enfocado en resultados.",
    imagen_url:
      "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&auto=format&fit=crop&q=60",
    tipo: "payhip",
    link_compra: "https://payhip.com",
    slug: "sistema-notion-second",
    created_at: "2026-03-03T11:45:00.000Z",
  },
  {
    id: "mock-7",
    titulo: "Kit de Diseño UI/UX Figma Design System",
    resumen:
      "Más de 500 componentes con auto-layout, variantes accesibles y paletas sincronizadas para prototipado veloz.",
    cuerpo:
      "## Acelera tu Flujo de Creación de Interfaces\n\nBiblioteca profesional de diseño construida meticulosamente para diseñar aplicaciones web y móviles modernas.\n\n### Componentes incluidos\n- Botones, campos de formulario, modales, tarjetas y navegación completa.\n- Tokens de tipografía y color alineados a estándares WCAG AA de contraste.\n- Diseños de pantallas prediseñadas para dashboards y tiendas electrónicas.\n- Variables nativas de Figma para cambio instantáneo entre tema claro y oscuro.",
    imagen_url:
      "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&auto=format&fit=crop&q=60",
    tipo: "payhip",
    link_compra: "https://payhip.com",
    slug: "kit-de-diseno",
    created_at: "2026-02-27T08:30:00.000Z",
  },
  {
    id: "mock-8",
    titulo: "Pack de Automatización Python para Creadores",
    resumen:
      "Scripts listos para automatizar publicación en redes, procesamiento por lotes de imágenes y generación de métricas.",
    cuerpo:
      "## Ahorra Tiempo en Tareas Repetitivas\n\nUna suite de scripts en Python con documentación clara y archivos de configuración listos para automatizar flujos de trabajo.\n\n### Scripts incluidos\n- Redimensionamiento y compresión por lotes de imágenes y banners.\n- Publicación y calendarización automática de contenidos en plataformas digitales.\n- Generación de reportes automáticos en PDF con analíticas semanales.\n- Asistente de respaldo de archivos esenciales en almacenamiento en la nube.",
    imagen_url:
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=60",
    tipo: "payhip",
    link_compra: "https://payhip.com",
    slug: "pack-de-automatizacion",
    created_at: "2026-02-22T13:10:00.000Z",
  },
];

// Decodificador de entidades HTML comunes que WordPress devuelve
export function decodeHtmlEntities(text) {
  if (!text || typeof text !== "string") return "";
  return text
    .replace(/&#(\d+);/g, (_, dec) => String.fromCharCode(dec))
    .replace(/&#x([0-9a-fA-F]+);/g, (_, hex) =>
      String.fromCharCode(parseInt(hex, 16)),
    )
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&#8217;/g, "'")
    .replace(/&#8216;/g, "'")
    .replace(/&#8220;/g, '"')
    .replace(/&#8221;/g, '"')
    .replace(/&#8211;/g, "–")
    .replace(/&#8212;/g, "—")
    .replace(/&nbsp;/g, " ");
}

// Limpia etiquetas HTML para obtener texto plano de resumen
export function stripHtml(html) {
  if (!html || typeof html !== "string") return "";
  return decodeHtmlEntities(html.replace(/<[^>]*>?/gm, "").trim());
}

// Convierte un texto a slug limpio si el post no tiene uno definido
export function convertToSlug(text) {
  if (!text) return "articulo";
  const primerasPalabras = text.split(/\s+/).slice(0, 4).join(" ");
  return primerasPalabras
    .toLowerCase()
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// Normaliza el tipo a las categorías reconocidas por la tienda: 'payhip' (digitales) o 'amazon' (físicos)
export function normalizeTipo(rawTipo) {
  if (!rawTipo) return "amazon";
  const t = String(rawTipo).toLowerCase().trim();
  if (
    t.includes("digital") ||
    t.includes("payhip") ||
    t.includes("descarga") ||
    t.includes("software") ||
    t.includes("virtual") ||
    t.includes("ebook")
  ) {
    return "payhip";
  }
  return "amazon";
}

// Extrae la primera imagen del contenido HTML si no se especificó imagen destacada
function extractFirstImage(html) {
  if (!html) return "";
  const match = html.match(/<img[^>]+src=["']([^"']+)["']/i);
  return match ? match[1] : "";
}

// Transforma un post devuelto por la REST API de WordPress en el formato uniforme del e-commerce
export function formatWordPressProduct(post) {
  const acf = post.acf && typeof post.acf === "object" && !Array.isArray(post.acf) ? post.acf : {};

  // 1. Título
  const tituloRaw =
    acf.titulo ||
    acf.title ||
    post.title?.rendered ||
    post.title ||
    "Artículo de Tienda";
  const titulo = decodeHtmlEntities(tituloRaw);

  // 2. Cuerpo del artículo
  const cuerpoRaw =
    acf.cuerpo ||
    acf.content ||
    post.content?.rendered ||
    post.content ||
    "";
  const cuerpo = typeof cuerpoRaw === "string" ? cuerpoRaw : "";

  // 3. Resumen
  let resumen =
    acf.resumen ||
    acf.summary ||
    acf.descripcion ||
    stripHtml(post.excerpt?.rendered || "");
  if (!resumen && cuerpo) {
    const plain = stripHtml(cuerpo);
    resumen = plain.length > 160 ? plain.slice(0, 160) + "..." : plain;
  }
  if (!resumen) {
    resumen = "Descubre todos los detalles sobre este producto en eParadise.";
  }

  // 4. Imagen
  let imagenUrl = "";
  if (acf.imagen) {
    if (typeof acf.imagen === "string") {
      imagenUrl = acf.imagen;
    } else if (acf.imagen.url) {
      imagenUrl = acf.imagen.url;
    }
  } else if (acf.imagen_url) {
    imagenUrl = acf.imagen_url;
  } else if (acf.image) {
    imagenUrl = typeof acf.image === "string" ? acf.image : acf.image.url || "";
  }

  // Si no está en ACF, buscar en imagen destacada de WordPress (_embedded)
  if (!imagenUrl && post._embedded?.["wp:featuredmedia"]?.[0]?.source_url) {
    imagenUrl = post._embedded["wp:featuredmedia"][0].source_url;
  }

  // Si no, buscar la primera imagen dentro del cuerpo HTML
  if (!imagenUrl) {
    imagenUrl = extractFirstImage(cuerpo);
  }

  // Fallback a logo predeterminado
  if (!imagenUrl) {
    imagenUrl = "/img/logo.png";
  }

  // 5. Link de compra
  const linkCompra =
    acf.link ||
    acf.link_compra ||
    acf.enlace ||
    acf.url ||
    post.link ||
    "#";

  // 6. Tipo (digitales -> 'payhip', físicos -> 'amazon')
  const rawTipo =
    acf.tipo ||
    acf.type ||
    acf.categoria ||
    (post.taxonomies_names?.[0]) ||
    "";
  const tipo = normalizeTipo(rawTipo);

  // 7. Slug
  const slug = post.slug || convertToSlug(titulo);

  return {
    id: String(post.id),
    titulo,
    resumen: decodeHtmlEntities(resumen),
    cuerpo,
    imagen_url: imagenUrl,
    tipo,
    link_compra: linkCompra,
    slug,
    created_at: post.date || post.date_gmt || new Date().toISOString(),
    origen: "wordpress",
  };
}

// Obtiene todos los productos de WordPress (Custom Post Type 'tienda')
export async function getProducts() {
  const wpEndpoint = `${WORDPRESS_BASE_URL.replace(/\/+$/, "")}/wp-json/wp/v2/tienda?_embed&per_page=100`;

  let wpProducts = [];

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);

    const res = await fetch(wpEndpoint, {
      signal: controller.signal,
      next: { revalidate: 60 },
      headers: {
        Accept: "application/json",
      },
    });

    clearTimeout(timeoutId);

    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data)) {
        wpProducts = data.map(formatWordPressProduct);
      }
    } else {
      console.warn(
        `WordPress API returned HTTP ${res.status} para ${wpEndpoint}`,
      );
    }
  } catch (err) {
    console.error("Error conectando a WordPress Pantheon:", err.message || err);
  }

  // Si WordPress devuelve productos reales, se colocan primero.
  // Se complementan con los mock para mantener las secciones pobladas mientras se migra el catálogo completo.
  if (wpProducts.length > 0) {
    const wpSlugs = new Set(wpProducts.map((p) => p.slug));
    const complementaryMocks = MOCK_PRODUCTS.filter((m) => !wpSlugs.has(m.slug));
    return [...wpProducts, ...complementaryMocks];
  }

  // Si WordPress no está accesible temporalmente, devolver los productos de respaldo
  return MOCK_PRODUCTS;
}

// Busca un producto por su slug
export async function getProductBySlug(slug) {
  const products = await getProducts();
  const found = products.find((product) => product.slug === slug);
  if (found) return found;

  // Intento de consulta directa a WordPress por slug específico si no estaba en la lista inicial
  try {
    const singleEndpoint = `${WORDPRESS_BASE_URL.replace(/\/+$/, "")}/wp-json/wp/v2/tienda?slug=${encodeURIComponent(slug)}&_embed`;
    const res = await fetch(singleEndpoint, { next: { revalidate: 60 } });
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        return formatWordPressProduct(data[0]);
      }
    }
  } catch (e) {
    console.error("Error buscando slug en WordPress:", e.message || e);
  }

  return null;
}

// Filtra productos por su tipo ('amazon' para físicos, 'payhip' para digitales)
export function filterProducts(products, type) {
  if (!Array.isArray(products)) return [];
  const target = normalizeTipo(type);
  return products
    .filter((product) => normalizeTipo(product.tipo) === target)
    .sort((a, b) => new Date(b.created_at || 0) - new Date(a.created_at || 0));
}
