import ProductGrid from "@/components/ProductGrid";
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
      {/* 1. Título grande arriba con fondo blanco estilo Sección 1 del Home, sin botón de volver atrás */}
      <header className='apple-subpage-hero'>
        <h1 className='apple-subpage-title'>Software</h1>
        <p className='apple-subpage-subhead'>
          Software de nivel profesional. Automatizaciones, herramientas SaaS y soluciones digitales para acelerar tu desarrollo.
        </p>
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
