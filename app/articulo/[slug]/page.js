import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getProductBySlug, getProducts } from "@/lib/wordpress";
import ReactMarkdown from "react-markdown";
import {
  ArrowLeft,
  ExternalLink,
  ShieldCheck,
  Zap,
  Share2,
} from "lucide-react";

// GENERACIÓN AUTOMÁTICA DE METADATOS (SEO ESTILO YOAST)
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return { title: "Artículo no encontrado | eParadise" };
  }

  const rawDesc =
    product.resumen ||
    (product.cuerpo ? product.cuerpo.replace(/<[^>]*>?/gm, " ").trim() : "");
  const metaDescripcion = rawDesc
    ? rawDesc.split(/\s+/).slice(0, 30).join(" ") + "..."
    : "Lee más sobre este producto en eParadise.";

  const schemaImagen = product.imagen_url || "";

  return {
    title: `${product.titulo} | eParadise`,
    description: metaDescripcion,
    openGraph: {
      title: product.titulo,
      description: metaDescripcion,
      type: "article",
      images: [
        {
          url: schemaImagen,
          alt: product.titulo,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: product.titulo,
      description: metaDescripcion,
      images: [schemaImagen],
    },
  };
}

export default async function ArticlePage({ params }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const allProducts = await getProducts();
  const productCategory =
    product.tipo_de_producto ||
    (product.tipo === "payhip" ? "software" : "hardware");

  const related = allProducts
    .filter((p) => {
      const pCat =
        p.tipo_de_producto || (p.tipo === "payhip" ? "software" : "hardware");
      return p.slug !== slug && pCat === productCategory;
    })
    .slice(0, 3);

  const isAmazon = product.tipo === "amazon";
  const categoryHref =
    productCategory === "ebook"
      ? "/ebooks"
      : productCategory === "software"
        ? "/digitales"
        : "/fisicos";
  const categoryLabel =
    productCategory === "ebook"
      ? "Ebook"
      : productCategory === "software"
        ? "Software"
        : "Hardware";
  const shortTitle =
    product.titulo && product.titulo.includes(":")
      ? product.titulo.split(":")[0].trim()
      : product.titulo;
  const badgeCategoryLabel =
    productCategory === "ebook"
      ? "Ebook"
      : productCategory === "software"
        ? "Software"
        : "Hardware de Alta Gama";
  const actionBarTitle =
    productCategory === "ebook"
      ? "Edición Digital Inmediata"
      : productCategory === "software"
        ? "Licencia Digital Inmediata"
        : "Disponibilidad Verificada";
  const actionBarDesc =
    productCategory === "ebook"
      ? isAmazon
        ? "Acceso digital instantáneo a tu Ebook con el respaldo y compra segura de Amazon."
        : "Descarga instantánea de tu Ebook tras completar el pago seguro en Payhip."
      : productCategory === "software"
        ? isAmazon
          ? "Acceso digital inmediato y licencia gestionada con la protección de compra de Amazon."
          : "Descarga instantánea y soporte técnico tras completar el pago seguro en Payhip."
        : isAmazon
          ? "Compra gestionada con la protección al comprador y envíos de Amazon."
          : "Compra verificada y gestionada de forma segura a través de Payhip.";

  return (
    <main className='apple-subpage-wrapper'>
      {/* 1. Título arriba e imagen grande abajo en fondo blanco, estilo Sección 1 del Home, sin etiquetas ni resumen */}
      <header className='apple-article-hero'>
        <div className='apple-article-hero-title-box'>
          <h1 className='apple-hero-headline' style={{ marginBottom: 12 }}>
            {shortTitle}
          </h1>
          <div className='apple-article-hero-floating-wrap'>
            <a
              href={product.link_compra}
              target='_blank'
              rel='noopener noreferrer'
              className='btn-apple-pill apple-article-floating-buy-btn'
              aria-label={`Comprar ${shortTitle}`}
            >
              <span>Comprar</span>
            </a>
          </div>
        </div>
        <div className='apple-article-hero-stage'>
          <img
            src={product.imagen_url || "/img/logo.png"}
            alt={shortTitle}
            className='apple-article-hero-img'
          />
        </div>
      </header>

      {/* 2. Franja gris clara divisoria como en el Home */}
      <div className='apple-divider-strip' />

      {/* 3. El artículo comenzando con el título completo más allá de los dos puntos ":", sin resumen y con el cuerpo completo */}
      <section className='apple-canvas-page-section'>
        <div className='apple-canvas-container article-canvas-compact'>
          {/* Título completo del artículo */}
          <h2 className='article-full-title'>{product.titulo}</h2>

          {/* Article Markdown Body */}
          <article id='art-cuerpo' className='article-body-content'>
            {/<\/?[a-z][\s\S]*>/i.test(product.cuerpo || "") ? (
              <div
                dangerouslySetInnerHTML={{
                  __html:
                    product.cuerpo ||
                    "<p>Contenido detallado en preparación.</p>",
                }}
              />
            ) : (
              <ReactMarkdown>
                {product.cuerpo || "Contenido no disponible."}
              </ReactMarkdown>
            )}
          </article>

          {/* Direct Buy Action Card */}
          <section className='article-action-bar'>
            <div style={{ textAlign: "left", flex: 1 }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  marginBottom: 4,
                }}
              >
                <ShieldCheck size={18} color='#0071e3' />
                <span
                  style={{
                    fontWeight: 700,
                    fontSize: "0.95rem",
                    color: "#111113",
                  }}
                >
                  {actionBarTitle}
                </span>
              </div>
              <p style={{ fontSize: "0.82rem", color: "#6e6e73", margin: 0 }}>
                {actionBarDesc}
              </p>
            </div>

            <a
              href={product.link_compra}
              target='_blank'
              rel='noopener noreferrer'
              className={`btn-buy-external ${product.tipo}`}
            >
              <span>{isAmazon ? "Comprar en Amazon" : "Comprar en Payhip"}</span>
              <ExternalLink size={16} />
            </a>
          </section>

          {/* Guarantee and Support Notice */}
          <div className='article-support-box'>
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                background: "rgba(0,113,227,0.1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#0071e3",
                flexShrink: 0,
              }}
            >
              <Zap size={20} />
            </div>
            <div>
              <h4
                style={{
                  fontSize: "0.95rem",
                  fontWeight: 700,
                  color: "#111113",
                  marginBottom: 2,
                }}
              >
                Soporte eParadise Garantizado
              </h4>
              <p style={{ fontSize: "0.82rem", color: "#6e6e73", margin: 0 }}>
                ¿Tienes dudas sobre especificaciones o compatibilidad? Contáctanos
                a través de nuestra{" "}
                <Link
                  href='/contacto'
                  style={{ color: "#0071e3", textDecoration: "underline" }}
                >
                  página de contacto
                </Link>{" "}
                o en nuestro canal oficial de{" "}
                <a
                  href='https://www.instagram.com/eparadiseve/'
                  target='_blank'
                  rel='noopener noreferrer'
                  style={{ color: "#0071e3", textDecoration: "underline" }}
                >
                  Instagram @eparadiseve
                </a>
                .
              </p>
            </div>
          </div>
        </div>

        {/* Related Products Grid */}
        {related.length > 0 && (
          <div style={{ maxWidth: 1024, margin: "20px auto 0", width: "100%" }}>
            <h3
              style={{
                fontSize: "1.35rem",
                fontWeight: 700,
                letterSpacing: "-0.015em",
                color: "#111113",
                marginBottom: 18,
                textAlign: "center",
              }}
            >
              Otros artículos relacionados
            </h3>
            <div className='apple-catalog-grid apple-related-cards-scroll'>
              {related.map((rel) => {
                const relRaw = rel.titulo || "";
                const relClean = relRaw.includes(":")
                  ? relRaw.split(":")[0].trim()
                  : relRaw.trim();
                return (
                  <article key={rel.slug} className='apple-product-card-unit'>
                    <Link
                      href={`/articulo/${rel.slug}`}
                      className='apple-product-media-card'
                      aria-label={relClean}
                    >
                      <img
                        src={rel.imagen_url || "/img/icono.png"}
                        alt={relClean}
                        className='apple-product-img'
                      />
                    </Link>
                    <div className='apple-product-info-outside'>
                      <span className='apple-card-kicker'>Destacado</span>
                      <h4 className='apple-card-title'>{relClean}</h4>
                      <p className='apple-card-desc'>{rel.resumen}</p>
                      <div className='apple-card-actions'>
                        <Link
                          href={`/articulo/${rel.slug}`}
                          className='apple-card-btn-primary'
                        >
                          <span>Más información</span>
                        </Link>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        )}
      </section>
    </main>
  );
}

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const dynamicParams = true;

