"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function HomeCanvas({ products = [] }) {
  const [hardwareIndex, setHardwareIndex] = useState(0);
  const [softwareIndex, setSoftwareIndex] = useState(0);
  const [softwareTransition, setSoftwareTransition] = useState(true);

  // Muestra únicamente el nombre del modelo cortando antes de ":" si existe
  const getModelTitle = (titulo) => {
    if (!titulo || typeof titulo !== "string") return "";
    return titulo.includes(":") ? titulo.split(":")[0].trim() : titulo.trim();
  };

  // Separa dinámicamente los productos publicados en WordPress por su categoría ('amazon' = Hardware, 'payhip' = Software)
  const hardwareProducts = products.filter((p) => p.tipo === "amazon");
  const digitalProducts = products.filter((p) => p.tipo === "payhip");

  // 1. SECCIÓN 1 - HARDWARE (Carrusel Principal - Productos Amazon desde WordPress)
  const hardwareCarouselList = hardwareProducts;

  // 2. SECCIÓN 2 - SOFTWARE (Carrusel Secundario - Soluciones Payhip desde WordPress)
  const softwareCarouselList = digitalProducts;
  const softwareSlides =
    softwareCarouselList.length > 1
      ? [...softwareCarouselList, softwareCarouselList[0]]
      : softwareCarouselList;

  const currentHardware =
    hardwareCarouselList.length > 0
      ? hardwareCarouselList[hardwareIndex % hardwareCarouselList.length]
      : null;

  const activeSoftwareDot =
    softwareCarouselList.length > 0
      ? softwareIndex % softwareCarouselList.length
      : 0;

  // Rotación automática lenta Carrusel 1 (Hardware - Amazon) cuando hay más de 1 producto
  useEffect(() => {
    if (hardwareCarouselList.length <= 1) return;
    const interval = setInterval(() => {
      setHardwareIndex((prev) => (prev + 1) % hardwareCarouselList.length);
    }, 5500);
    return () => clearInterval(interval);
  }, [hardwareCarouselList.length]);

  // Rotación horizontal continua Carrusel 2 (Software - Payhip) cuando hay más de 1 producto
  useEffect(() => {
    if (softwareCarouselList.length <= 1) return;
    const interval = setInterval(() => {
      setSoftwareTransition(true);
      setSoftwareIndex((prev) => prev + 1);
    }, 6000);
    return () => clearInterval(interval);
  }, [softwareCarouselList.length]);

  // Reinicio silencioso al llegar al clon final para mantener fila continua infinita
  useEffect(() => {
    if (softwareCarouselList.length <= 1) return;
    if (softwareIndex === softwareCarouselList.length) {
      const timer = setTimeout(() => {
        setSoftwareTransition(false);
        setSoftwareIndex(0);
      }, 820);
      return () => clearTimeout(timer);
    }
    if (softwareIndex > softwareCarouselList.length) {
      setSoftwareTransition(false);
      setSoftwareIndex(0);
    }
  }, [softwareIndex, softwareCarouselList.length]);

  // 3. SECCIÓN 3 - HARDWARE (Cards Grandes en Grilla 2 Columnas - Exclusivamente Hardware desde WordPress)
  const hardwareGridCards = hardwareProducts.map((item) => ({
    theme: "card-light",
    title: getModelTitle(item.titulo),
    desc: item.resumen,
    slug: item.slug,
    imagen_url: item.imagen_url || "/img/logo.png",
    link_compra: item.link_compra || "https://amazon.com",
    tipo: "amazon",
  }));

  // 4. SECCIÓN 4 - SOFTWARE (Cards Grandes en Grilla 2 Columnas - Exclusivamente Software desde WordPress)
  const softwareGridCards = digitalProducts.map((item) => ({
    theme: "card-light",
    title: getModelTitle(item.titulo),
    desc: item.resumen,
    slug: item.slug,
    imagen_url: item.imagen_url || "/img/logo.png",
    link_compra: item.link_compra || "https://payhip.com",
    tipo: "payhip",
  }));

  return (
    <div className='apple-home-wrapper'>
      {/* =================================================================
          SECCIÓN 1 - HARDWARE (Carrusel Principal - Productos Amazon)
          Hero Full-Width con fondo blanco (#FFFFFF)
         ================================================================= */}
      {currentHardware && (
        <section
          id='hero-section'
          className='apple-hero-light'
          aria-label='Lanzamientos de Hardware'
        >
          <div
            key={`hw-copy-${currentHardware.slug}`}
            className='apple-hero-content carousel-fade-item'
          >
            <h1 className='apple-hero-headline'>
              {getModelTitle(currentHardware.titulo)}
            </h1>

            <p className='apple-hero-subhead'>
              {currentHardware.resumen ||
                "Diseña tu futuro con tecnología avanzada creada para escalar."}
            </p>

            <div className='apple-cta-links'>
              <Link
                href={`/articulo/${currentHardware.slug}`}
                className='btn-apple-pill'
              >
                <span>Más información</span>
              </Link>

              <a
                href={currentHardware.link_compra}
                target='_blank'
                rel='noopener noreferrer'
                className='btn-apple-outline-pill outline-on-light'
              >
                <span>Comprar</span>
              </a>
            </div>
          </div>

          <div className='apple-hero-stage'>
            <div
              key={`hw-img-${currentHardware.slug}`}
              className='apple-hero-figure carousel-fade-item'
            >
              <img
                src={currentHardware.imagen_url || "/img/logo.png"}
                alt={currentHardware.titulo}
                className='apple-hero-img'
              />
            </div>

            {hardwareCarouselList.length > 1 && (
              <div
                className='apple-carousel-dots'
                role='tablist'
                aria-label='Diapositivas de Hardware'
              >
                {hardwareCarouselList.map((item, idx) => (
                  <button
                    key={item.slug || idx}
                    type='button'
                    role='tab'
                    aria-selected={idx === hardwareIndex}
                    aria-label={`Mostrar ${item.titulo}`}
                    className={`apple-carousel-dot ${idx === hardwareIndex ? "active" : ""}`}
                    onClick={() => setHardwareIndex(idx)}
                  />
                ))}
              </div>
            )}
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
              style={{
                transform: `translate3d(-${softwareIndex * 100}%, 0, 0)`,
                transition: softwareTransition
                  ? "transform 0.8s cubic-bezier(0.28, 0.11, 0.32, 1)"
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
                      <img
                        src={slideItem.imagen_url || "/img/logo.png"}
                        alt={slideItem.titulo}
                        className='apple-hero-img'
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {softwareCarouselList.length > 1 && (
            <div
              className='apple-carousel-dots'
              role='tablist'
              aria-label='Diapositivas de Software'
            >
              {softwareCarouselList.map((item, idx) => (
                <button
                  key={item.slug || idx}
                  type='button'
                  role='tab'
                  aria-selected={idx === activeSoftwareDot}
                  aria-label={`Mostrar ${item.titulo}`}
                  className={`apple-carousel-dot ${idx === activeSoftwareDot ? "active" : ""}`}
                  onClick={() => {
                    setSoftwareTransition(true);
                    setSoftwareIndex(idx);
                  }}
                />
              ))}
            </div>
          )}
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
            {hardwareGridCards.map((item) => (
              <div
                key={item.slug}
                className={`apple-promo-card ${item.theme}`}
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
                  <img
                    src={item.imagen_url}
                    alt={item.title}
                    className='promo-media-img'
                  />
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* =================================================================
          SECCIÓN 4 - SOFTWARE (Cards Grandes en Grilla 2 Columnas)
          Renderiza dinámicamente todos los artículos de Software de WordPress
         ================================================================= */}
      {softwareGridCards.length > 0 && (
        <section
          className='apple-promo-section'
          aria-label='Destacados de Software'
        >
          <div className='apple-promo-grid'>
            {softwareGridCards.map((item) => (
              <div
                key={item.slug}
                className={`apple-promo-card ${item.theme}`}
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
                  <img
                    src={item.imagen_url}
                    alt={item.title}
                    className='promo-media-img'
                  />
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
