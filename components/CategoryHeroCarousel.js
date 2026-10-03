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

  // Rotación automática continua cada 3 segundos
  useEffect(() => {
    if (carouselList.length <= 1) return;
    const interval = setInterval(() => {
      setTransition(true);
      setIndex((prev) => prev + 1);
    }, 3000);
    return () => clearInterval(interval);
  }, [carouselList.length]);

  const handleTransitionEnd = () => {
    if (index >= carouselList.length) {
      setTransition(false);
      setIndex(0);
    }
  };

  useEffect(() => {
    if (!transition && index === 0) {
      const id = requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setTransition(true);
        });
      });
      return () => cancelAnimationFrame(id);
    }
  }, [transition, index]);

  if (!products || products.length === 0) return null;

  return (
    <div className='apple-category-slider-viewport'>
      <div
        className='apple-category-slider-track'
        onTransitionEnd={handleTransitionEnd}
        style={{
          transform: `translate3d(-${index * 100}%, 0, 0)`,
          transition: transition
            ? "transform 1.25s cubic-bezier(0.25, 1, 0.4, 1)"
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
