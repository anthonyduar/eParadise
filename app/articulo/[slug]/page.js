import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductBySlug } from "@/lib/notion";

export default async function ArticlePage({ params }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();
  return (
    <main
      style={{
        backgroundColor: "white",
        padding: "80px 20px 40px",
        minHeight: "60vh",
      }}
    >
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <h1 style={{ textAlign: "center" }}>{product.titulo}</h1>
        <div style={{ textAlign: "center", marginBottom: 30 }}>
          <img
            src={product.imagen_url}
            alt={product.titulo}
            style={{ maxWidth: 350, width: "100%", borderRadius: 10 }}
          />
        </div>
        <article id='art-cuerpo' style={{ whiteSpace: "pre-wrap" }}>
          {product.cuerpo || "Este artículo no tiene contenido disponible."}
        </article>
        <div style={{ textAlign: "center", marginBottom: 25 }}>
          <a
            href={product.link_compra}
            target='_blank'
            rel='noopener noreferrer'
            className={`btn btn-primary ${product.tipo}`}
          >
            Comprar
          </a>
        </div>
        <div style={{ textAlign: "center" }}>
          <Link href='/' className='btn btn-secondary'>
            ← Volver al inicio
          </Link>
        </div>
      </div>
    </main>
  );
}
