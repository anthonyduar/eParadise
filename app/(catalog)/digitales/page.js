import Link from "next/link";
import ProductGrid from "@/components/ProductGrid";
import { filterProducts, getProducts } from "@/lib/notion";

export const metadata = { title: "Productos Digitales | eParadise" };

export default async function DigitalProductsPage() {
  const products = filterProducts(await getProducts(), "payhip");
  return (
    <>
      <section className='hero-simple'>
        <h1>Lo más nuevo en eParadise</h1>
        <p>
          Selección exclusiva de productos <strong>digitales</strong>.
        </p>
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
