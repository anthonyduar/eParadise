import ProductGrid from "@/components/ProductGrid";
import CategoryHeroCarousel from "@/components/CategoryHeroCarousel";
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
      {/* 1. Título grande arriba con fondo blanco, texto resumen y carrusel de imágenes grandes de la categoría */}
      <header className='apple-subpage-hero'>
        <h1 className='apple-subpage-title'>Hardware</h1>
        <p className='apple-subpage-subhead'>
          Dispositivos de alta gama, rendimiento óptimo y máxima durabilidad.
        </p>

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
            emptyMessage='No se encontraron equipos disponibles en este momento.'
          />
        </div>
      </section>
    </main>
  );
}
