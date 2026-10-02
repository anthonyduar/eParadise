import Link from "next/link";
import { ExternalLink } from "lucide-react";

export default function ProductCard({ product }) {
  const isAmazon = product.tipo === "amazon";
  const tipoProducto =
    product.tipo_de_producto || (isAmazon ? "hardware" : "software");

  // Corta el título antes de los 2 puntos ":" si existen
  const rawTitle = product.titulo || "";
  const cleanTitle = rawTitle.includes(":")
    ? rawTitle.split(":")[0].trim()
    : rawTitle.trim();

  const kickerLabel = "Nuevo";

  return (
    <article className='apple-product-card-unit'>
      {/* 1. Card Blanca Alargada Superior (Foto adentro grande y completa) */}
      <Link
        href={`/articulo/${product.slug}`}
        className='apple-product-media-card'
        aria-label={cleanTitle}
      >
        <img
          src={product.imagen_url || "/img/logo.png"}
          alt={cleanTitle}
          className='apple-product-img'
        />
      </Link>

      {/* 2. Puntos de variación como en la imagen de referencia */}
      <div className='apple-card-dots' aria-hidden='true'>
        <span className='apple-card-dot' />
        <span className='apple-card-dot active' />
      </div>

      {/* 3. Textos y botones AFUERA de la card abajo */}
      <div className='apple-product-info-outside'>
        <span className='apple-card-kicker'>{kickerLabel}</span>
        <h3 className='apple-card-title'>{cleanTitle}</h3>
        <p className='apple-card-desc'>{product.resumen}</p>

        <div className='apple-card-actions'>
          <Link
            href={`/articulo/${product.slug}`}
            className='apple-card-btn-primary'
          >
            <span>Más información</span>
          </Link>

          <a
            href={product.link_compra}
            target='_blank'
            rel='noopener noreferrer'
            className='apple-card-btn-secondary'
          >
            <span>{isAmazon ? "Comprar en Amazon" : "Comprar en Payhip"}</span>
            <ExternalLink size={12} />
          </a>
        </div>
      </div>
    </article>
  );
}
