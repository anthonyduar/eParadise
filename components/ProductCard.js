import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ExternalLink } from "lucide-react";

export default function ProductCard({ product }) {
  const isAmazon = product.tipo === "amazon";

  return (
    <article
      style={{
        background: "#ffffff",
        borderRadius: 20,
        border: "1px solid rgba(0, 0, 0, 0.07)",
        boxShadow: "0 8px 30px rgba(0, 0, 0, 0.04)",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
      }}
    >
      <div style={{ position: "relative", width: "100%", height: 210, background: "#f5f5f7" }}>
        <Image
          src={product.imagen_url || "/img/logo.png"}
          alt={product.titulo}
          fill
          sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
          style={{ objectFit: "cover" }}
          priority={false}
        />
        <div
          style={{
            position: "absolute",
            top: 12,
            right: 12,
            background: "rgba(255, 255, 255, 0.92)",
            backdropFilter: "blur(8px)",
            border: "1px solid rgba(0, 0, 0, 0.08)",
            color: "#1d1d1f",
            fontSize: "0.7rem",
            fontWeight: 700,
            padding: "4px 10px",
            borderRadius: 9999,
          }}
        >
          {isAmazon ? "Hardware" : "Digital"}
        </div>
      </div>

      <div style={{ padding: 20, display: "flex", flexDirection: "column", flexGrow: 1 }}>
        <h3
          style={{
            fontSize: "1.1rem",
            fontWeight: 700,
            color: "#111113",
            marginBottom: 8,
            lineHeight: 1.3,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {product.titulo}
        </h3>

        <p
          style={{
            fontSize: "0.85rem",
            lineHeight: 1.5,
            color: "#6e6e73",
            marginBottom: 20,
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            flexGrow: 1,
          }}
        >
          {product.resumen}
        </p>

        <div style={{ display: "flex", gap: 10, marginTop: "auto" }}>
          <Link
            href={`/articulo/${product.slug}`}
            style={{
              flex: 1,
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 6,
              background: "#f0f0f4",
              color: "#1d1d1f",
              textDecoration: "none",
              fontSize: "0.85rem",
              fontWeight: 600,
              padding: "10px 14px",
              borderRadius: 9999,
              transition: "background 0.2s ease",
            }}
          >
            <span>Ver más</span>
            <ArrowRight size={14} />
          </Link>

          <a
            href={product.link_compra}
            target='_blank'
            rel='noopener noreferrer'
            style={{
              flex: 1,
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 6,
              background: isAmazon ? "#ff9900" : "#0071e3",
              color: isAmazon ? "#111" : "#fff",
              textDecoration: "none",
              fontSize: "0.85rem",
              fontWeight: 700,
              padding: "10px 14px",
              borderRadius: 9999,
              transition: "opacity 0.2s ease",
            }}
          >
            <span>Comprar</span>
            <ExternalLink size={13} />
          </a>
        </div>
      </div>
    </article>
  );
}
