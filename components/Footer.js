"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronRight, ArrowUpRight } from "lucide-react";
import InstagramIcon from "./InstagramIcon";

export default function Footer() {
  const [products, setProducts] = useState([
    {
      slug: "jbl-go-altavoz",
      titulo: "Altavoz Portátil JBL Go 4 Ultra",
      tipo: "amazon",
    },
    {
      slug: "excel-pro-cleaner",
      titulo: "Excel Pro Cleaner & Optimizer",
      tipo: "payhip",
    },
  ]);

  useEffect(() => {
    let active = true;
    fetch("/api/products")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (active && Array.isArray(data) && data.length > 0) {
          setProducts(data);
        }
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, []);

  // Muestra únicamente el nombre del modelo cortando antes de ":" si existe
  const getModelTitle = (titulo) => {
    if (!titulo || typeof titulo !== "string") return "";
    return titulo.includes(":") ? titulo.split(":")[0].trim() : titulo.trim();
  };

  const getProductCategory = (p) =>
    p.tipo_de_producto || (p.tipo === "payhip" ? "software" : "hardware");

  const sortedProducts = [...products].sort(
    (a, b) => new Date(b.created_at || 0) - new Date(a.created_at || 0)
  );

  const hardwareLinks = sortedProducts
    .filter((p) => getProductCategory(p) === "hardware")
    .slice(0, 3);
  const digitalLinks = sortedProducts
    .filter((p) => getProductCategory(p) === "software")
    .slice(0, 3);
  const ebookLinks = sortedProducts
    .filter((p) => getProductCategory(p) === "ebook")
    .slice(0, 3);

  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      if (window.lenis) {
        window.lenis.scrollTo(0, { duration: 1.4 });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  };

  return (
    <footer className='apple-footer-global'>
      <div className='apple-footer-inner'>
        {/* Apple Breadcrumb Trail */}
        <div className='apple-footer-breadcrumbs'>
          <Link href='/' onClick={scrollToTop}>
            <img
              src='/img/icono.png'
              alt='eParadise'
              style={{ width: 14, height: 14, borderRadius: 3, verticalAlign: "middle" }}
            />
          </Link>
          <ChevronRight size={12} color='#6e6e73' />
          <span>Catálogo de Lanzamientos</span>
        </div>

        {/* Apple 4-Column Directory */}
        <div className='apple-footer-directory'>
          {/* Col 1: Hardware dinámico desde WordPress */}
          <div>
            <h3 className='directory-col-title'>Hardware</h3>
            <ul className='directory-col-links'>
              {hardwareLinks.map((item) => (
                <li key={item.slug}>
                  <Link href={`/articulo/${item.slug}`}>
                    {getModelTitle(item.titulo)}
                  </Link>
                </li>
              ))}
              <li>
                <Link href='/fisicos'>Ver catálogo completo de hardware →</Link>
              </li>
            </ul>
          </div>

          {/* Col 2: Software dinámico desde WordPress */}
          <div>
            <h3 className='directory-col-title'>Software</h3>
            <ul className='directory-col-links'>
              {digitalLinks.map((item) => (
                <li key={item.slug}>
                  <Link href={`/articulo/${item.slug}`}>
                    {getModelTitle(item.titulo)}
                  </Link>
                </li>
              ))}
              <li>
                <Link href='/digitales'>Ver catálogo completo de Software →</Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Ebooks dinámico desde WordPress */}
          <div>
            <h3 className='directory-col-title'>Ebooks</h3>
            <ul className='directory-col-links'>
              {ebookLinks.map((item) => (
                <li key={item.slug}>
                  <Link href={`/articulo/${item.slug}`}>
                    {getModelTitle(item.titulo)}
                  </Link>
                </li>
              ))}
              <li>
                <Link href='/ebooks'>Ver catálogo completo de ebooks →</Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Comunidad & Redes */}
          <div>
            <h3 className='directory-col-title'>Comunidad & Redes</h3>
            <ul className='directory-col-links'>
              <li>
                <a
                  href='https://www.instagram.com/eparadiseve/'
                  target='_blank'
                  rel='noopener noreferrer'
                  style={{ display: "inline-flex", alignItems: "center", gap: 6, color: "#424245" }}
                >
                  <InstagramIcon size={12} color='#424245' />
                  <span>@eparadiseve</span>
                  <ArrowUpRight size={11} opacity={0.7} />
                </a>
              </li>
              <li>
                <Link href='/contacto'>Contacto</Link>
              </li>
              <li>
                <Link href='/acerca'>Acerca de</Link>
              </li>
              <li>
                <Link href='/legal'>Avisos Legales</Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Legal Bottom Bar */}
        <div className='apple-footer-legal-bar'>
          <p>Copyright &copy; 2026 eParadise. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
