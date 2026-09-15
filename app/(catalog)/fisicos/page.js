import Link from "next/link";
import ProductGrid from "@/components/ProductGrid";
import { filterProducts, getProducts } from "@/lib/notion";

export const metadata = { title: "Productos Físicos | eParadise" };

export default async function PhysicalProductsPage() {
  const products = filterProducts(await getProducts(), "amazon");
  return (
    <CatalogPage
      title='Lo más nuevo en eParadise'
      subtitle='Selección exclusiva de productos físicos.'
      products={products}
    />
  );
}

function CatalogPage({ title, subtitle, products }) {
  return (
    <>
      <section className='hero-simple'>
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </section>
      <main>
        <section className='product-shelf'>
          <div className='product-grid'>
            <ProductGrid products={products} />
          </div>
          <div style={{ textAlign: "center", margin: "40px 0" }}>
            <Link href='/' className='btn btn-secondary'>
              ← Volver al inicio
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
