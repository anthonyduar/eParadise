import ProductGrid from "@/components/ProductGrid";
import { filterProducts, getProducts } from "@/lib/wordpress";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata = {
  title: "Hardware | eParadise",
  description:
    "Explora nuestra selección completa de hardware de alta gama, audio profesional y accesorios de ingeniería.",
};

export default async function PhysicalProductsPage() {
  const products = filterProducts(await getProducts(), "amazon");

  return (
    <main className='apple-subpage-wrapper'>
      {/* 1. Título grande arriba con fondo blanco estilo Sección 1 del Home, sin botón de volver atrás */}
      <header className='apple-subpage-hero'>
        <h1 className='apple-subpage-title'>Hardware</h1>
        <p className='apple-subpage-subhead'>
          Dispositivos de alta gama, rendimiento óptimo y máxima durabilidad.
        </p>
      </header>

      {/* 2. Franja gris clara divisoria como en el Home */}
      <div className='apple-divider-strip' />

      {/* 3. Cards blancas con separación gris como en el Home */}
      <section className='apple-catalog-container'>
        <div className='apple-catalog-grid'>
          <ProductGrid
            products={products}
            emptyMessage='No se encontraron equipos disponibles en este momento.'
          />
        </div>
      </section>
    </main>
  );
}
