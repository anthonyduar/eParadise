// Cliente y adaptador Headless CMS para WordPress / Pantheon
// Lee el Custom Post Type "tienda" (y sus campos: título, resumen, cuerpo, imagen, link, tipo)

const WORDPRESS_BASE_URL =
  process.env.WORDPRESS_URL || process.env.WORDPRESS_API_URL;

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

// Transforma un post devuelto por la REST API de WordPress en el formato uniforme del e-commerce
export function formatWordPressProduct(post) {
  const acf = post.acf && typeof post.acf === "object" ? post.acf : {};
  const titulo = decodeHtmlEntities(post.title?.rendered || "");
  const cuerpo = post.content?.rendered || "";
  const resumen = typeof acf.resumen === "string" ? acf.resumen : "";
  const linkCompra = typeof acf.link === "string" ? acf.link : "";
  const imagenUrl = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || "";
  const tipo = normalizeTipo(acf.tipo_tienda);
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
  if (!WORDPRESS_BASE_URL) {
    console.error("Falta configurar la variable WORDPRESS_URL.");
    return [];
  }

  const cacheBuster = Date.now();
  const wpEndpoint = `${WORDPRESS_BASE_URL.replace(/\/+$/, "")}/wp-json/wp/v2/tienda?_embed&per_page=100&_cache=${cacheBuster}`;

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
        return data.map(formatWordPressProduct);
      }
    } else {
      console.warn(
        `WordPress API returned HTTP ${res.status} para ${wpEndpoint}`,
      );
    }
  } catch (err) {
    console.error("Error conectando a WordPress Pantheon:", err.message || err);
  }

  return [];
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
