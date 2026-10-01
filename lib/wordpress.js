// Cliente y adaptador Headless CMS para WordPress / Pantheon
// Lee el Custom Post Type "tienda" (y sus campos: título, resumen, cuerpo, imagen, link, tipo)

const WORDPRESS_BASE_URL =
  process.env.WORDPRESS_URL ||
  process.env.WORDPRESS_API_URL ||
  process.env.NEXT_PUBLIC_WORDPRESS_API_URL ||
  process.env.NEXT_PUBLIC_WORDPRESS_URL;

function getWordPressApiBaseUrl() {
  let rawUrl = WORDPRESS_BASE_URL?.trim() || "";
  const httpIndex = rawUrl.indexOf("http");
  if (httpIndex > 0) rawUrl = rawUrl.slice(httpIndex);
  if (!rawUrl) return "";

  try {
    const url = new URL(rawUrl);
    const basePath = url.pathname
      .replace(/\/+$/, "")
      .replace(/\/wp-json\/wp\/v2(?:\/(?:tienda|posts))?$/i, "")
      .replace(/\/(?:tienda|posts)$/i, "");
    url.pathname = `${basePath}/wp-json/wp/v2`;
    url.search = "";
    url.hash = "";
    return url.toString().replace(/\/+$/, "");
  } catch {
    return "";
  }
}

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

// Extrae la URL de imagen desde featuredmedia o desde campos ACF (string u objeto)
function extractImageUrl(post, acf) {
  const featured = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url;
  if (featured && typeof featured === "string") return featured;

  const acfImg = acf.imagen ?? acf.imagen_url ?? acf.image;
  if (typeof acfImg === "string" && acfImg.trim()) return acfImg.trim();
  if (acfImg && typeof acfImg === "object" && typeof acfImg.url === "string") {
    return acfImg.url;
  }

  if (
    typeof post.jetpack_featured_media_url === "string" &&
    post.jetpack_featured_media_url
  ) {
    return post.jetpack_featured_media_url;
  }

  return "/img/logo.png";
}

// Transforma un post devuelto por la REST API de WordPress en el formato uniforme del e-commerce
export function formatWordPressProduct(post) {
  const acf = post.acf && typeof post.acf === "object" ? post.acf : {};
  const titulo = decodeHtmlEntities(
    post.title?.rendered || acf.titulo || acf.nombre || "",
  );
  const rawResumen =
    typeof acf.resumen === "string" && acf.resumen.trim()
      ? acf.resumen
      : typeof acf.descripcion === "string" && acf.descripcion.trim()
        ? acf.descripcion
        : stripHtml(post.excerpt?.rendered || "");
  const renderedContent =
    typeof post.content?.rendered === "string"
      ? post.content.rendered.trim()
      : "";
  const acfContent =
    typeof acf.cuerpo === "string" && acf.cuerpo.trim()
      ? acf.cuerpo.trim()
      : typeof acf.contenido === "string" && acf.contenido.trim()
        ? acf.contenido.trim()
        : "";
  const cuerpo = renderedContent || acfContent || rawResumen || "";
  const rawLink = acf.link ?? acf.link_compra ?? acf.enlace ?? acf.url ?? "";
  const linkCompra = typeof rawLink === "string" ? rawLink.trim() : "";
  const imagenUrl = extractImageUrl(post, acf);
  const tipo = normalizeTipo(acf.tipo ?? acf.tipo_tienda ?? acf.categoria);
  const rawPostSlug =
    typeof post.slug === "string" && post.slug.trim()
      ? post.slug.trim()
      : convertToSlug(titulo);
  let slug = rawPostSlug;
  try {
    slug = decodeURIComponent(rawPostSlug);
  } catch {
    slug = rawPostSlug;
  }

  return {
    id: String(post.id),
    titulo,
    resumen: decodeHtmlEntities(rawResumen),
    cuerpo,
    imagen_url: imagenUrl,
    tipo,
    link_compra:
      linkCompra ||
      (tipo === "payhip" ? "https://payhip.com" : "https://amazon.com"),
    slug,
    created_at: post.date || post.date_gmt || new Date().toISOString(),
    origen: "wordpress",
  };
}

function hasStoreProductFields(post) {
  const acf = post.acf && typeof post.acf === "object" ? post.acf : {};
  const type =
    typeof acf.tipo === "string" ? acf.tipo.trim().toLowerCase() : "";
  return (
    (type === "amazon" || type === "payhip") &&
    typeof acf.link === "string" &&
    acf.link.trim() !== "" &&
    typeof acf.resumen === "string" &&
    acf.resumen.trim() !== ""
  );
}

// Únicamente los 2 artículos publicados en WordPress como respaldo si WORDPRESS_URL aún no está en entorno local
export const MOCK_PRODUCTS = [
  {
    id: "wp-jbl",
    titulo: "Altavoz Portátil JBL Go 4 Ultra",
    resumen:
      "Sonido JBL Pro ultra compacto con bajos enriquecidos, certificación IP67 resistente al agua y polvo, y 7 horas de reproducción ininterrumpida.",
    cuerpo:
      "## Gran Sonido en Tamaño de Bolsillo\n\nEl JBL Go 4 ofrece un sonido JBL Pro nítido y potente con graves contundentes. Su diseño ultraportátil cabe fácilmente en la palma de tu mano, convirtiéndolo en el compañero ideal para tus viajes y aventuras cotidianas.\n\n### Aspectos Destacados:\n* **Sonido Pro Original JBL:** Transductor rediseñado para una respuesta acústica equilibrada y frecuencias bajas impactantes.\n* **Hasta 7 horas de batería + Playtime Boost:** Con un toque obtendrás hasta 2 horas extra de música.\n* **Resistencia al agua y al polvo IP67:** Llévalo a la piscina, a la playa o al parque sin preocupaciones.\n* **Conexión multi-altavoz con Auracast:** Conecta múltiples altavoces compatibles para un escenario sonoro envolvente.",
    imagen_url:
      "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=800&q=80",
    tipo: "amazon",
    link_compra: "https://amazon.com",
    slug: "jbl-go-altavoz",
    created_at: "2026-03-01T09:00:00.000Z",
    origen: "wordpress",
  },
  {
    id: "wp-excel",
    titulo: "Excel Pro Cleaner & Optimizer",
    resumen:
      "Herramienta digital avanzada automatizada para depurar bases de datos masivas, optimizar fórmulas complejas y generar tableros ejecutivos.",
    cuerpo:
      "## Productividad Expresa para Hojas de Cálculo\n\nExcel Pro Cleaner es una solución integral diseñada para analistas de datos, directores financieros y equipos de operaciones que manejan volúmenes masivos de datos en Excel.\n\n### Capacidades Clave:\n* **Limpieza Ultrarrápida:** Detecta y corrige inconsistencias, celdas huérfanas y formatos corruptos con un clic.\n* **Auditoría de Fórmulas:** Reduce el peso del archivo eliminando dependencias circulares y referencias redundantes.\n* **Generador de Dashboards Automatizado:** Transforma datos crudos en gráficos ejecutivos listos para presentaciones.\n* **Licencia Perpetua y Actualizaciones:** Acceso de por vida sin cuotas mensuales recurrentes.",
    imagen_url:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
    tipo: "payhip",
    link_compra: "https://payhip.com",
    slug: "excel-pro-cleaner",
    created_at: "2026-03-01T09:30:00.000Z",
    origen: "wordpress",
  },
];

// Obtiene productos del Custom Post Type 'tienda'
export async function getProducts() {
  if (!WORDPRESS_BASE_URL) {
    return MOCK_PRODUCTS;
  }

  const baseUrl = getWordPressApiBaseUrl();
  if (!baseUrl) {
    console.warn("La URL de WordPress configurada no es válida.");
    return MOCK_PRODUCTS;
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 8000);

  try {
    const wpEndpoint = `${baseUrl}/tienda?_embed&per_page=100`;
    const res = await fetch(wpEndpoint, {
      signal: controller.signal,
      cache: "no-store",
    });

    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data)) {
        const formatted = data.filter(hasStoreProductFields).map(formatWordPressProduct);
        return formatted.length > 0 ? formatted : MOCK_PRODUCTS;
      }
    } else {
      console.warn(
        `WordPress API returned HTTP ${res.status} para ${wpEndpoint}`,
      );
    }
  } catch (err) {
    console.warn(
      "Error conectando a WordPress Pantheon, usando respaldo:",
      err.message || err,
    );
  } finally {
    clearTimeout(timeoutId);
  }

  return MOCK_PRODUCTS;
}

// Busca un producto por su slug
export async function getProductBySlug(slug) {
  if (!slug) return null;
  let cleanSlug = String(slug).trim().toLowerCase();
  try {
    cleanSlug = decodeURIComponent(cleanSlug).trim().toLowerCase();
  } catch {
    // Mantiene cleanSlug original si no requiere decodificación
  }

  const products = await getProducts();
  const found = products.find((product) => {
    const prodSlug = String(product.slug || "").trim().toLowerCase();
    return (
      prodSlug === cleanSlug ||
      convertToSlug(product.titulo) === cleanSlug ||
      String(product.id).toLowerCase() === cleanSlug
    );
  });
  if (found) return found;

  // Intento de consulta directa a WordPress por slug específico si no estaba en la lista inicial
  if (!WORDPRESS_BASE_URL) return null;
  try {
    const baseUrl = getWordPressApiBaseUrl();
    if (!baseUrl) return null;
    const singleEndpoint = `${baseUrl}/tienda?slug=${encodeURIComponent(cleanSlug)}&_embed`;
    const res = await fetch(singleEndpoint, {
      cache: "no-store",
    });
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        return formatWordPressProduct(data[0]);
      }
    }
  } catch (e) {
    console.warn("Error buscando slug en WordPress:", e.message || e);
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
