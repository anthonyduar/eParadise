import Link from "next/link";
import ProductGrid from "@/components/ProductGrid";
import { filterProducts, getProducts } from "@/lib/wordpress";
import { ArrowLeft, Cpu } from "lucide-react";

export const metadata = {
  title: "Equipos & Hardware de Vanguardia | eParadise",
  description:
    "Explora nuestra selección completa de hardware de alta gama, audio profesional y accesorios de ingeniería.",
};

export default async function PhysicalProductsPage() {
  const products = filterProducts(await getProducts(), "amazon");

  return (
    <main className='secondary-page-container' style={{ maxWidth: 1200 }}>
      <div style={{ marginBottom: 20 }}>
        <Link
          href='/'
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            fontSize: "0.85rem",
            color: "#0071e3",
            textDecoration: "none",
            fontWeight: 600,
          }}
        >
          <ArrowLeft size={16} />
          <span>Volver al inicio</span>
        </Link>
      </div>

      <header className='secondary-hero-header'>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            fontSize: "0.75rem",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.14em",
            color: "#0071e3",
            background: "rgba(0,113,227,0.06)",
            padding: "4px 12px",
            borderRadius: 9999,
            marginBottom: 10,
          }}
        >
          <Cpu size={14} />
          <span>Catálogo de Hardware</span>
        </div>
        <h1 className='secondary-hero-title'>
          Equipos & Hardware de Vanguardia
        </h1>
        <p className='secondary-hero-sub'>
          Dispositivos de alto rendimiento, sonido pro, ergonomía y componentes
          seleccionados con precisión.
        </p>
      </header>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: 24,
        }}
      >
        <ProductGrid
          products={products}
          emptyMessage='No se encontraron equipos disponibles en este momento.'
        />
      </div>
    </main>
  );
}
