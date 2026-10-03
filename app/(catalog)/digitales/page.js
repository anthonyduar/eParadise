import ProductGrid from "@/components/ProductGrid";
import CategoryHeroCarousel from "@/components/CategoryHeroCarousel";
import { filterProducts, getProducts } from "@/lib/wordpress";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata = {
  title: "Software | eParadise",
  description:
    "Herramientas de software, scripts automatizados, plantillas y soluciones digitales para desarrolladores y creadores.",
};

export default async function DigitalProductsPage() {
  const products = filterProducts(await getProducts(), "software");

  return (
    <main className='apple-subpage-wrapper'>
      {/* 1. Título grande arriba con fondo blanco, texto resumen flotante y carrusel de imágenes sin contenedor */}
      <header className='apple-subpage-hero'>
        <div className='apple-subpage-hero-content'>
          <h1 className='apple-subpage-title'>Software</h1>
          <p className='apple-subpage-subhead'>
            Automatizaciones, herramientas SaaS 
            y soluciones digitales.
          </p>
        </div>

        {/* Carrusel horizontal solo con las imágenes grandes sin títulos como en la sección 2 del Home */}
        <CategoryHeroCarousel products={products} />
      </header>

      {/* 2. Franja gris clara divisoria como en el Home */}
      <div className='apple-divider-strip' />

      {/* 3. Cards blancas con separación gris como en el Home */}
      <section className='apple-catalog-container'>
        <div className='apple-catalog-grid'>
          <ProductGrid
            products={products}
            emptyMessage='No se encontraron activos digitales disponibles en este momento.'
          />
        </div>
      </section>
    </main>
  );
}
