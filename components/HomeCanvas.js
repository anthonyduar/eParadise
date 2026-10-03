"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function HomeCanvas({ products = [] }) {
  const [hardwareIndex, setHardwareIndex] = useState(0);
  const [hardwareTransition, setHardwareTransition] = useState(true);
  const [softwareIndex, setSoftwareIndex] = useState(0);
  const [softwareTransition, setSoftwareTransition] = useState(true);

  // Muestra únicamente el nombre del modelo cortando antes de ":" si existe
  const getModelTitle = (titulo) => {
    if (!titulo || typeof titulo !== "string") return "";
    return titulo.includes(":") ? titulo.split(":")[0].trim() : titulo.trim();
  };

  // Separa dinámicamente los productos publicados en WordPress por su tipo_de_producto ('hardware', 'software', 'ebook')
  const getProductCategory = (p) =>
    p.tipo_de_producto || (p.tipo === "payhip" ? "software" : "hardware");

  const hardwareProducts = products.filter(
    (p) => getProductCategory(p) === "hardware",
  );
  const digitalProducts = products.filter(
    (p) => getProductCategory(p) === "software",
  );
  const ebookProducts = products.filter(
    (p) => getProductCategory(p) === "ebook",
  );

  // 1. SECCIÓN 1 - HARDWARE (Carrusel Principal - Productos Amazon desde WordPress)
  const hardwareCarouselList = hardwareProducts;
  const hardwareSlides =
    hardwareCarouselList.length > 1
      ? [...hardwareCarouselList, hardwareCarouselList[0]]
      : hardwareCarouselList;

  // 2. SECCIÓN 2 - SOFTWARE (Carrusel Secundario - Soluciones Payhip desde WordPress)
  const softwareCarouselList = digitalProducts;
  const softwareSlides =
    softwareCarouselList.length > 1
      ? [...softwareCarouselList, softwareCarouselList[0]]
      : softwareCarouselList;

  // Rotación continua fluida Carrusel 1 (Hardware - Amazon) cada 3 segundos
  useEffect(() => {
    if (hardwareCarouselList.length <= 1) return;
    const interval = setInterval(() => {
      setHardwareTransition(true);
      setHardwareIndex((prev) => prev + 1);
    }, 3000);
    return () => clearInterval(interval);
  }, [hardwareCarouselList.length]);

  const handleHardwareTransitionEnd = () => {
    if (hardwareIndex >= hardwareCarouselList.length) {
      setHardwareTransition(false);
      setHardwareIndex(0);
    }
  };

  useEffect(() => {
    if (!hardwareTransition && hardwareIndex === 0) {
      const id = requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setHardwareTransition(true);
        });
      });
      return () => cancelAnimationFrame(id);
    }
  }, [hardwareTransition, hardwareIndex]);

  // Rotación continua fluida Carrusel 2 (Software - Payhip) cada 3 segundos
  useEffect(() => {
    if (softwareCarouselList.length <= 1) return;
    const interval = setInterval(() => {
      setSoftwareTransition(true);
      setSoftwareIndex((prev) => prev + 1);
    }, 3000);
    return () => clearInterval(interval);
  }, [softwareCarouselList.length]);

  const handleSoftwareTransitionEnd = () => {
    if (softwareIndex >= softwareCarouselList.length) {
      setSoftwareTransition(false);
      setSoftwareIndex(0);
    }
  };

  useEffect(() => {
    if (!softwareTransition && softwareIndex === 0) {
      const id = requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setSoftwareTransition(true);
        });
      });
      return () => cancelAnimationFrame(id);
    }
  }, [softwareTransition, softwareIndex]);

  // Efecto de aparición desde los laterales al hacer scroll y llegar a las secciones 3, 4 y 5
  useEffect(() => {
    const sections = document.querySelectorAll(".apple-promo-section");
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("section-in-view");
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" },
    );

    sections.forEach((sec) => observer.observe(sec));
    return () => observer.disconnect();
  }, [
    hardwareProducts.length,
    digitalProducts.length,
    ebookProducts.length,
  ]);

  // Función para seleccionar productos distintos (evitando los más nuevos) que rotan y cambian siempre
  const getDistinctRandomProducts = (items, count = 2) => {
    if (!items || items.length === 0) return [];
    if (items.length <= count) return [...items];
    // Excluimos el producto más nuevo (índice 0, ya en el Hero superior) si la categoría tiene suficientes productos
    const pool = items.length > count ? items.slice(1) : [...items];
    const shuffled = [...pool];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled.slice(0, count);
  };

  const [hardwareGridItems, setHardwareGridItems] = useState(() => {
    const pool = hardwareProducts.length > 2 ? hardwareProducts.slice(1) : hardwareProducts;
    return pool.slice(0, 2);
  });

  const [softwareGridItems, setSoftwareGridItems] = useState(() => {
    const pool = digitalProducts.length > 2 ? digitalProducts.slice(1) : digitalProducts;
    return pool.slice(0, 2);
  });

  const [ebookGridItems, setEbookGridItems] = useState(() => {
    const pool = ebookProducts.length > 2 ? ebookProducts.slice(1) : ebookProducts;
    return pool.slice(0, 2);
  });

  // Al montar en el cliente y en cada visita/revalidación, aleatoriza para mostrar siempre productos distintos
  useEffect(() => {
    setHardwareGridItems(getDistinctRandomProducts(hardwareProducts, 2));
    setSoftwareGridItems(getDistinctRandomProducts(digitalProducts, 2));
    setEbookGridItems(getDistinctRandomProducts(ebookProducts, 2));
  }, [products]);

  // 3. SECCIÓN 3 - HARDWARE (Cards Grandes en Grilla 2 Columnas - Productos rotativos distintos, no los más nuevos)
  const hardwareGridCards = hardwareGridItems.map((item) => ({
    theme: "card-light",
    title: getModelTitle(item.titulo),
    desc: item.resumen,
    slug: item.slug,
    imagen_url: item.imagen_url || "/img/logo.png",
    link_compra:
      item.link_compra ||
      (item.tipo === "payhip" ? "https://payhip.com" : "https://amazon.com"),
    tipo: item.tipo || "amazon",
  }));

  // 4. SECCIÓN 4 - SOFTWARE (Cards Grandes en Grilla 2 Columnas - Productos rotativos distintos, no los más nuevos)
  const softwareGridCards = softwareGridItems.map((item) => ({
    theme: "card-light",
    title: getModelTitle(item.titulo),
    desc: item.resumen,
    slug: item.slug,
    imagen_url: item.imagen_url || "/img/logo.png",
    link_compra:
      item.link_compra ||
      (item.tipo === "payhip" ? "https://payhip.com" : "https://amazon.com"),
    tipo: item.tipo || "payhip",
  }));

  // 5. SECCIÓN 5 - EBOOKS (Cards Grandes en Grilla 2 Columnas - Productos rotativos distintos, no los más nuevos)
  const ebookGridCards = ebookGridItems.map((item) => ({
    theme: "card-light",
    title: getModelTitle(item.titulo),
    desc: item.resumen,
    slug: item.slug,
    imagen_url: item.imagen_url || "/img/logo.png",
    link_compra:
      item.link_compra ||
      (item.tipo === "payhip" ? "https://payhip.com" : "https://amazon.com"),
    tipo: item.tipo || "payhip",
  }));

  return (
    <div className='apple-home-wrapper'>
      {/* =================================================================
          SECCIÓN 1 - HARDWARE (Carrusel Principal - Productos Amazon)
          Hero Full-Width con desplazamiento lateral continuo
         ================================================================= */}
      {hardwareCarouselList.length > 0 && (
        <section
          id='hero-section'
          className='apple-hero-light apple-hero-slider-section'
          aria-label='Lanzamientos de Hardware'
        >
          <div className='apple-slider-viewport'>
            <div
              className='apple-slider-track'
              onTransitionEnd={handleHardwareTransitionEnd}
              style={{
                transform: `translate3d(-${hardwareIndex * 100}%, 0, 0)`,
                transition: hardwareTransition
                  ? "transform 0.7s cubic-bezier(0.25, 1, 0.5, 1)"
                  : "none",
              }}
            >
              {hardwareSlides.map((slideItem, idx) => (
                <div
                  key={`${slideItem.slug || slideItem.id || idx}-hw-${idx}`}
                  className='apple-slider-slide'
                >
                  <div className='apple-hero-content'>
                    <h1 className='apple-hero-headline'>
                      {getModelTitle(slideItem.titulo)}
                    </h1>

                    <p className='apple-hero-subhead'>
                      {slideItem.resumen ||
                        "Diseña tu futuro con tecnología avanzada creada para escalar."}
                    </p>

                    <div className='apple-cta-links'>
                      <Link
                        href={`/articulo/${slideItem.slug}`}
                        className='btn-apple-pill'
                      >
                        <span>Más información</span>
                      </Link>

                      <a
                        href={slideItem.link_compra}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='btn-apple-outline-pill outline-on-light'
                      >
                        <span>Comprar</span>
                      </a>
                    </div>
                  </div>

                  <div className='apple-hero-stage'>
                    <div className='apple-hero-figure'>
                      <Link
                        href={`/articulo/${slideItem.slug}`}
                        className='apple-hero-img-link'
                        tabIndex={-1}
                        aria-label={slideItem.titulo}
                      >
                        <img
                          src={slideItem.imagen_url || "/img/logo.png"}
                          alt={slideItem.titulo}
                          className='apple-hero-img'
                        />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* =================================================================
          SECCIÓN 2 - SOFTWARE (Carrusel Secundario - Soluciones Payhip)
          Hero Full-Width con desplazamiento lateral continuo
         ================================================================= */}
      {softwareCarouselList.length > 0 && (
        <section
          id='software-section'
          className='apple-hero-light apple-hero-slider-section'
          aria-label='Soluciones de Software'
        >
          <div className='apple-slider-viewport'>
            <div
              className='apple-slider-track'
              onTransitionEnd={handleSoftwareTransitionEnd}
              style={{
                transform: `translate3d(-${softwareIndex * 100}%, 0, 0)`,
                transition: softwareTransition
                  ? "transform 0.7s cubic-bezier(0.25, 1, 0.5, 1)"
                  : "none",
              }}
            >
              {softwareSlides.map((slideItem, idx) => (
                <div
                  key={`${slideItem.slug || slideItem.id || idx}-${idx}`}
                  className='apple-slider-slide'
                >
                  <div className='apple-hero-content'>
                    <h2 className='apple-hero-headline'>
                      {getModelTitle(slideItem.titulo)}
                    </h2>

                    <p className='apple-hero-subhead'>
                      {slideItem.resumen ||
                        "Soluciones digitales de alto rendimiento con entrega inmediata."}
                    </p>

                    <div className='apple-cta-links'>
                      <Link
                        href={`/articulo/${slideItem.slug}`}
                        className='btn-apple-pill'
                      >
                        <span>Más información</span>
                      </Link>

                      <a
                        href={slideItem.link_compra}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='btn-apple-outline-pill outline-on-light'
                      >
                        <span>Comprar</span>
                      </a>
                    </div>
                  </div>

                  <div className='apple-hero-stage'>
                    <div className='apple-hero-figure'>
                      <Link
                        href={`/articulo/${slideItem.slug}`}
                        className='apple-hero-img-link'
                        tabIndex={-1}
                        aria-label={slideItem.titulo}
                      >
                        <img
                          src={slideItem.imagen_url || "/img/logo.png"}
                          alt={slideItem.titulo}
                          className='apple-hero-img'
                        />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* =================================================================
          SECCIÓN 3 - HARDWARE (Cards Grandes en Grilla 2 Columnas)
          Renderiza dinámicamente todos los artículos de Hardware de WordPress
         ================================================================= */}
      {hardwareGridCards.length > 0 && (
        <section
          id='hardware-section'
          className='apple-promo-section'
          aria-label='Destacados de Hardware'
        >
          <div className='apple-promo-grid'>
            {hardwareGridCards.map((item, idx) => (
              <div
                key={item.slug}
                className={`apple-promo-card ${item.theme} ${idx % 2 === 0 ? "promo-slide-left" : "promo-slide-right"}`}
              >
                <div className='promo-top-content'>
                  <h3 className='promo-title'>{item.title}</h3>
                  <p className='promo-desc'>{item.desc}</p>

                  <div className='promo-links'>
                    <Link
                      href={`/articulo/${item.slug}`}
                      className='btn-apple-pill btn-sm'
                    >
                      <span>Más información</span>
                    </Link>

                    <a
                      href={item.link_compra}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='btn-apple-outline-pill btn-sm outline-on-light'
                    >
                      <span>Comprar</span>
                    </a>
                  </div>
                </div>

                <div className='promo-media-box'>
                  <Link
                    href={`/articulo/${item.slug}`}
                    className='promo-media-link'
                    tabIndex={-1}
                    aria-label={item.title}
                  >
                    <img
                      src={item.imagen_url}
                      alt={item.title}
                      className='promo-media-img'
                    />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* =================================================================
          SECCIÓN 4 - SOFTWARE (Cards Grandes en Grilla 2 Columnas)
          Renderiza dinámicamente hasta 2 artículos de Software de WordPress
         ================================================================= */}
      {softwareGridCards.length > 0 && (
        <section
          className='apple-promo-section'
          aria-label='Destacados de Software'
        >
          <div className='apple-promo-grid'>
            {softwareGridCards.map((item, idx) => (
              <div
                key={item.slug}
                className={`apple-promo-card ${item.theme} ${idx % 2 === 0 ? "promo-slide-left" : "promo-slide-right"}`}
              >
                <div className='promo-top-content'>
                  <h3 className='promo-title'>{item.title}</h3>
                  <p className='promo-desc'>{item.desc}</p>

                  <div className='promo-links'>
                    <Link
                      href={`/articulo/${item.slug}`}
                      className='btn-apple-pill btn-sm'
                    >
                      <span>Más información</span>
                    </Link>

                    <a
                      href={item.link_compra}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='btn-apple-outline-pill btn-sm outline-on-light'
                    >
                      <span>Comprar</span>
                    </a>
                  </div>
                </div>

                <div className='promo-media-box'>
                  <Link
                    href={`/articulo/${item.slug}`}
                    className='promo-media-link'
                    tabIndex={-1}
                    aria-label={item.title}
                  >
                    <img
                      src={item.imagen_url}
                      alt={item.title}
                      className='promo-media-img'
                    />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* =================================================================
          SECCIÓN 5 - EBOOKS (Cards Grandes en Grilla 2 Columnas)
          Renderiza dinámicamente hasta 2 artículos de Ebook de WordPress
         ================================================================= */}
      {ebookGridCards.length > 0 && (
        <section
          id='ebook-section'
          className='apple-promo-section'
          aria-label='Destacados de Ebooks'
        >
          <div className='apple-promo-grid'>
            {ebookGridCards.map((item, idx) => (
              <div
                key={item.slug}
                className={`apple-promo-card ${item.theme} ${idx % 2 === 0 ? "promo-slide-left" : "promo-slide-right"}`}
              >
                <div className='promo-top-content'>
                  <h3 className='promo-title'>{item.title}</h3>
                  <p className='promo-desc'>{item.desc}</p>

                  <div className='promo-links'>
                    <Link
                      href={`/articulo/${item.slug}`}
                      className='btn-apple-pill btn-sm'
                    >
                      <span>Más información</span>
                    </Link>

                    <a
                      href={item.link_compra}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='btn-apple-outline-pill btn-sm outline-on-light'
                    >
                      <span>Comprar</span>
                    </a>
                  </div>
                </div>

                <div className='promo-media-box'>
                  <Link
                    href={`/articulo/${item.slug}`}
                    className='promo-media-link'
                    tabIndex={-1}
                    aria-label={item.title}
                  >
                    <img
                      src={item.imagen_url}
                      alt={item.title}
                      className='promo-media-img'
                    />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
