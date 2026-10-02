import ProductGrid from "@/components/ProductGrid";
import { filterProducts, getProducts } from "@/lib/wordpress";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata = {
  title: "Ebooks | eParadise",
  description:
    "Explora nuestra biblioteca de ebooks técnicos, guías especializadas y recursos de aprendizaje digital.",
};

export default async function EbooksProductsPage() {
  const products = filterProducts(await getProducts(), "ebook");

  return (
    <main className='apple-subpage-wrapper'>
      {/* 1. Título grande arriba con fondo blanco estilo Sección 1 del Home, sin botón de volver atrás */}
      <header className='apple-subpage-hero'>
        <h1 className='apple-subpage-title'>Ebooks</h1>
        <p className='apple-subpage-subhead'>
          Guías prácticas, literatura técnica y manuales digitales diseñados para
          potenciar tus conocimientos.
        </p>
      </header>

      {/* 2. Franja gris clara divisoria como en el Home */}
      <div className='apple-divider-strip' />

      {/* 3. Cards blancas con separación gris como en el Home */}
      <section className='apple-catalog-container'>
        <div className='apple-catalog-grid'>
          <ProductGrid
            products={products}
            emptyMessage='No se encontraron ebooks disponibles en este momento.'
          />
        </div>
      </section>
    </main>
  );
}
