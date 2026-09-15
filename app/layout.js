import "../style.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "eParadise | Tienda Oficial",
  description: "Activos digitales y tecnología para potenciar tus proyectos.",
  icons: { icon: "/img/icono.png" },
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" suppressHydrationWarning data-scroll-behavior="smooth">
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
