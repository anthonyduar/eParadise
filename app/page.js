import HomeCanvas from "@/components/HomeCanvas";
import { getProducts } from "@/lib/wordpress";

export const metadata = {
  title: "eParadise | Diseña tu futuro con tecnología avanzada",
  description:
    "Tienda oficial e-commerce de eParadise. Equipos de vanguardia, hardware de alta gama y activos digitales para potenciar tu productividad.",
};

export default async function HomePage() {
  const products = await getProducts();

  return (
    <main>
      <h1 className='visually-hidden'>
        eParadise - Experiencia Inmersiva de Hardware y Activos Digitales
      </h1>
      <HomeCanvas products={products} />
    </main>
  );
}
