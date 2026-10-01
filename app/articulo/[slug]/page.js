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
  const related = allProducts
    .filter((p) => p.slug !== slug && p.tipo === product.tipo)
    .slice(0, 3);

  const isAmazon = product.tipo === "amazon";

  return (
    <main className='article-container'>
      {/* Breadcrumb Navigation */}
      <nav
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          fontSize: "0.82rem",
          color: "#86868b",
          marginBottom: 24,
        }}
        aria-label='Migas de pan'
      >
        <Link href='/' style={{ color: "#6e6e73", textDecoration: "none" }}>
          Inicio
        </Link>
        <span>/</span>
        <Link
          href={isAmazon ? "/fisicos" : "/digitales"}
          style={{ color: "#6e6e73", textDecoration: "none" }}
        >
          {isAmazon ? "Equipos de Vanguardia" : "Ecosistema Digital"}
        </Link>
        <span>/</span>
        <span style={{ color: "#111113", fontWeight: 600 }}>
          {product.titulo}
        </span>
      </nav>

      {/* Back Button */}
      <div style={{ marginBottom: 24 }}>
        <Link
          href='/'
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            fontSize: "0.85rem",
            color: "#0071e3",
            textDecoration: "none",
            fontWeight: 600,
          }}
        >
          <ArrowLeft size={16} />
          <span>Volver al inicio</span>
        </Link>
      </div>

      {/* White Canvas for the Article */}
      <div className='article-white-canvas'>
        {/* Article Header */}
        <header className='article-header'>
          <span className='article-badge'>
            {isAmazon
              ? "Hardware de Alta Gama • Amazon"
              : "Activo Digital • Payhip"}
          </span>
          <h1 className='article-title'>{product.titulo}</h1>
          {product.resumen && (
            <p
              style={{
                fontSize: "1.15rem",
                lineHeight: 1.6,
                color: "#55555d",
                maxWidth: 720,
                margin: "0 auto",
              }}
            >
              {product.resumen}
            </p>
          )}
        </header>

        {/* Hero Image Showcase */}
        <div className='article-image-box'>
          <div style={{ maxWidth: 520, width: "100%", position: "relative" }}>
            <Image
              src={product.imagen_url || "/img/logo.png"}
              alt={product.titulo}
              width={600}
              height={450}
              style={{
                width: "100%",
                height: "auto",
                maxHeight: 420,
                objectFit: "contain",
                borderRadius: 16,
              }}
              priority
            />
          </div>
        </div>

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
                {isAmazon
                  ? "Disponibilidad Verificada"
                  : "Licencia Digital Inmediata"}
              </span>
            </div>
            <p style={{ fontSize: "0.82rem", color: "#6e6e73", margin: 0 }}>
              {isAmazon
                ? "Compra gestionada con la protección al comprador y envíos de Amazon."
                : "Descarga instantánea y soporte técnico tras completar el pago seguro en Payhip."}
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
        <div
          style={{
            background: "#f5f5f7",
            border: "1px solid rgba(0,0,0,0.06)",
            borderRadius: 16,
            padding: "20px 24px",
            display: "flex",
            alignItems: "center",
            gap: 16,
          }}
        >
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
        <section style={{ paddingTop: 28 }}>
          <h3
            style={{
              fontSize: "1.4rem",
              fontWeight: 800,
              letterSpacing: "-0.02em",
              color: "#111113",
              marginBottom: 20,
            }}
          >
            Otros artículos relacionados
          </h3>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: 16,
            }}
          >
            {related.map((rel) => (
              <Link
                key={rel.slug}
                href={`/articulo/${rel.slug}`}
                style={{
                  background: "#fff",
                  border: "1px solid rgba(0,0,0,0.08)",
                  borderRadius: 16,
                  padding: 16,
                  textDecoration: "none",
                  color: "inherit",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  transition: "transform 0.2s ease, box-shadow 0.2s ease",
                  boxShadow: "0 4px 15px rgba(0,0,0,0.03)",
                }}
              >
                <img
                  src={rel.imagen_url || "/img/icono.png"}
                  alt={rel.titulo}
                  style={{
                    width: "100%",
                    height: 140,
                    objectFit: "cover",
                    borderRadius: 10,
                    marginBottom: 12,
                  }}
                />
                <h4
                  style={{
                    fontSize: "0.95rem",
                    fontWeight: 700,
                    color: "#111113",
                    marginBottom: 6,
                    lineHeight: 1.3,
                  }}
                >
                  {rel.titulo}
                </h4>
                <span
                  style={{
                    fontSize: "0.82rem",
                    color: "#0071e3",
                    fontWeight: 600,
                    marginTop: "auto",
                  }}
                >
                  Ver artículo →
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}

export const dynamicParams = true;

export async function generateStaticParams() {
  const products = await getProducts();

  return products.map((product) => ({
    slug: product.slug,
  }));
}
