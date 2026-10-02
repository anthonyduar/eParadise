import "../style.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import CookieBanner from "@/components/CookieBanner";

export const metadata = {
  title: "eParadise",
  description: "Tienda oficial de activos digitales y equipos tecnológicos.",
  openGraph: {
    title: "eParadise",
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
          <CookieBanner />
        </SmoothScroll>
      </body>
    </html>
  );
}
