import "../style.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";

export const metadata = {
  title: "eParadise | Tienda Oficial de Tecnología y Activos Digitales",
  description: "Descubre los últimos lanzamientos de hardware de alta gama y herramientas digitales en eParadise.",
  openGraph: {
    title: "eParadise | Tienda Oficial",
    description: "Tienda oficial de activos digitales y equipos tecnológicos.",
  },
  icons: { icon: "/img/icono.png" },
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" suppressHydrationWarning className="lenis lenis-smooth">
      <body>
        <SmoothScroll>
          <Header />
          {children}
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
