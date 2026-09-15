import Link from "next/link";
import ProductGrid from "@/components/ProductGrid";
import { filterProducts, getProducts } from "@/lib/notion";

export default async function HomePage() {
  const products = await getProducts();
  const fisicos = filterProducts(products, "amazon").slice(0, 4);
  const digitales = filterProducts(products, "payhip").slice(0, 4);

  return (
    <>
      <section className='hero'>
        <div className='hero-content'>
          <h1>Diseña tu futuro con tecnología avanzada creada para escalar</h1>
          <p className='hero-description'>
            Accede a nuestra selección de activos digitales y equipos de última
            generación. Todo lo que necesitas para potenciar tus proyectos y
            mantenerte a la vanguardia.
          </p>
          <a href='#fisicos' className='btn btn-hero'>
            Empezar ahora
          </a>
        </div>
      </section>
      <h1 className='visually-hidden'>Productos Destacados de eParadise</h1>
      <main>
        <ProductShelf
          id='fisicos'
          title='Productos Físicos'
          href='/fisicos'
          accent='#ff9900'
          products={fisicos}
        />
        <ProductShelf
          id='digitales'
          title='Productos Digitales'
          href='/digitales'
          accent='#007bff'
          products={digitales}
        />
      </main>
    </>
  );
}

function ProductShelf({ id, title, href, accent, products }) {
  return (
    <section className='product-shelf' id={id}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          paddingTop: 50,
          marginBottom: 20,
        }}
      >
        <h2 className='shelf-title' style={{ margin: "0 8px 0 0" }}>
          {title}
        </h2>
        <Link
          href={href}
          style={{
            backgroundColor: accent,
            color: "white",
            textDecoration: "none",
            padding: "6px 15px",
            borderRadius: 50,
            fontSize: 13,
            fontWeight: "bold",
          }}
        >
          Ver todos
        </Link>
      </div>
      <div className='card-container'>
        <ProductGrid products={products} />
      </div>
    </section>
  );
}
