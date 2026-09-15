"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function SearchModal({ onClose }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [mounted, setMounted] = useState(false); // 1. Creamos este estado

  // 2. Este useEffect se activa solo cuando el componente llega al navegador
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!onClose) return;
    const loadResults = async () => {
      if (query.trim().length < 2) return setResults([]);
      const response = await fetch(
        `/api/products?query=${encodeURIComponent(query)}`,
      );
      setResults(response.ok ? await response.json() : []);
    };
    loadResults();
  }, [query, onClose]);

  useEffect(() => {
    const closeOnEscape = (event) => event.key === "Escape" && onClose?.();
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [onClose]);

  // 3. Si aún no está montado en el navegador, no renderizamos nada para evitar el error de hidratación
  if (!mounted) return null;

  return (
    <div
      className='search-modal active'
      role='dialog'
      aria-modal='true'
      aria-label='Buscar productos'
    >
      <div className='search-modal-content'>
        <div className='search-header'>
          <input
            autoFocus
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder='Buscar productos...'
            autoComplete='off'
          />
          <button
            type='button'
            className='close-search'
            onClick={onClose}
            aria-label='Cerrar búsqueda'
          >
            &times;
          </button>
        </div>
        <div className='search-results'>
          {query.length > 1 && results.length === 0 && (
            <p>No se encontraron productos.</p>
          )}
          {results.map((product) => (
            <Link
              href={`/articulo/${product.slug}`}
              className='search-item'
              key={product.slug}
              onClick={onClose}
            >
              <img src={product.imagen_url} alt={product.titulo} />
              <div className='search-item-info'>
                <h4>{product.titulo}</h4>
                <p>{product.resumen}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
