import Link from "next/link";
import Image from "next/image"; // 👈 1. Importamos el componente optimizador de Next.js
import { notFound } from "next/navigation";
import { getProductBySlug, getProducts } from "@/lib/notion";
import ReactMarkdown from "react-markdown"; // 👈 Importamos el procesador de formato

// GENERACIÓN AUTOMÁTICA DE METADATOS (SEO ESTILO YOAST)
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return { title: "Artículo no encontrado | eParadise" };
  }

  const metaDescripcion = product.cuerpo
    ? product.cuerpo.split(/\s+/).slice(0, 30).join(" ") + "..."
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

        {/* Contenedor de la imagen */}
        <div style={{ textAlign: "center", marginBottom: 30 }}>
          {/* 👈 2. Cambiamos <img> por <Image /> configurado correctamente */}
          <div
            style={{
              display: "inline-block",
              maxWidth: 350,
              width: "100%",
              position: "relative",
            }}
          >
            <Image
              src={product.imagen_url}
              alt={product.titulo}
              width={350} // Le decimos a Vercel el tamaño máximo que necesita procesar
              height={350} // Alto base (Next.js mantendrá la proporción gracias a la clase CSS)
              style={{ width: "100%", height: "auto", borderRadius: 10 }}
              priority // Fuerza a la imagen principal a cargar al instante sin retrasos
            />
          </div>
        </div>

        <article
          id='art-cuerpo'
          style={{
            textAlign: "justify", // Justifica los párrafos
            lineHeight: "1.8",
            fontSize: "1.1rem",
            color: "#2d3748",
            marginBottom: "40px",
            padding: "0 10px",
          }}
        >
          {/* 👈 Reemplazamos el texto plano por el componente que renderiza Markdown */}
          <ReactMarkdown
            components={{
              // Esto evita que los H2 y H3 se justifiquen y se vean feos, alineándolos a la izquierda
              h2: ({ node, ...props }) => (
                <h2
                  style={{
                    textAlign: "left",
                    marginTop: "30px",
                    marginBottom: "15px",
                  }}
                  {...props}
                />
              ),
              h3: ({ node, ...props }) => (
                <h3
                  style={{
                    textAlign: "left",
                    marginTop: "25px",
                    marginBottom: "10px",
                  }}
                  {...props}
                />
              ),
              // Estilo para los enlaces embebidos en el texto
              a: ({ node, ...props }) => (
                <a
                  style={{ color: "#0070f3", textDecoration: "underline" }}
                  target='_blank'
                  rel='noopener noreferrer'
                  {...props}
                />
              ),
            }}
          >
            {product.cuerpo || "Este artículo no tiene contenido disponible."}
          </ReactMarkdown>
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

export async function generateStaticParams() {
  const products = await getProducts();

  return products.map((product) => ({
    slug: product.slug,
  }));
}
