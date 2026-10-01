import Link from "next/link";
import ProductGrid from "@/components/ProductGrid";
import { filterProducts, getProducts } from "@/lib/wordpress";
import { ArrowLeft, Layers } from "lucide-react";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata = {
  title: "Ecosistema & Activos Digitales | eParadise",
  description:
    "Herramientas de software, scripts automatizados, plantillas y assets para desarrolladores y creadores.",
};

export default async function DigitalProductsPage() {
  const products = filterProducts(await getProducts(), "payhip");

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
            color: "#833ab4",
            background: "rgba(131,58,180,0.06)",
            padding: "4px 12px",
            borderRadius: 9999,
            marginBottom: 10,
          }}
        >
          <Layers size={14} />
          <span>Librería de Software & Activos</span>
        </div>
        <h1 className='secondary-hero-title'>Ecosistema & Activos Digitales</h1>
        <p className='secondary-hero-sub'>
          Automatizaciones, kits para SaaS, optimizadores como Excel Pro Cleaner
          y recursos gráficos para acelerar tu desarrollo.
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
          emptyMessage='No se encontraron activos digitales disponibles en este momento.'
        />
      </div>
    </main>
  );
}
