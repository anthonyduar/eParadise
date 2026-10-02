"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function CategoryHeroCarousel({ products = [] }) {
  const [index, setIndex] = useState(0);
  const [transition, setTransition] = useState(true);

  const carouselList = products;
  const slides =
    carouselList.length > 1
      ? [...carouselList, carouselList[0]]
      : carouselList;

  // Rotación automática continua cada 5 segundos
  useEffect(() => {
    if (carouselList.length <= 1) return;
    const interval = setInterval(() => {
      setTransition(true);
      setIndex((prev) => prev + 1);
    }, 5000);
    return () => clearInterval(interval);
  }, [carouselList.length]);

  // Reinicio silencioso al llegar al clon para mantener ciclo infinito
  useEffect(() => {
    if (carouselList.length <= 1) return;
    if (index === carouselList.length) {
      const timer = setTimeout(() => {
        setTransition(false);
        setIndex(0);
      }, 820);
      return () => clearTimeout(timer);
    }
    if (index > carouselList.length) {
      setTransition(false);
      setIndex(0);
    }
  }, [index, carouselList.length]);

  if (!products || products.length === 0) return null;

  return (
    <div className='apple-category-slider-viewport'>
      <div
        className='apple-category-slider-track'
        style={{
          transform: `translate3d(-${index * 100}%, 0, 0)`,
          transition: transition
            ? "transform 0.8s cubic-bezier(0.28, 0.11, 0.32, 1)"
            : "none",
        }}
      >
        {slides.map((item, idx) => (
          <div
            key={`${item.slug || item.id || idx}-${idx}`}
            className='apple-category-slider-slide'
          >
            <div className='apple-category-hero-figure'>
              <Link
                href={`/articulo/${item.slug}`}
                className='apple-category-hero-img-link'
                tabIndex={-1}
                aria-label={item.titulo}
              >
                <img
                  src={item.imagen_url || "/img/logo.png"}
                  alt={item.titulo}
                  className='apple-category-hero-img'
                />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
