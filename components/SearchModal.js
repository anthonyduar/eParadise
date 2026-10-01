"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Search, X, ArrowRight, Package, Cpu } from "lucide-react";

export default function SearchModal({ onClose }) {
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState("all"); // all, amazon (hardware), payhip (digital)
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `/api/products?query=${encodeURIComponent(query.trim())}`
        );
        if (res.ok) {
          const data = await res.json();
          setProducts(data);
        }
      } catch (err) {
        console.error("Error al buscar productos:", err);
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(fetchProducts, 200);
    return () => clearTimeout(timer);
  }, [query]);

  const filtered = products.filter((p) => {
    if (categoryFilter === "hardware") return p.tipo === "amazon";
    if (categoryFilter === "digital") return p.tipo === "payhip";
    return true;
  });

  return (
    <div
      className='search-modal'
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className='search-modal-content' role='dialog' aria-modal='true'>
        <div className='search-header'>
          <Search size={22} color='#8e8e93' />
          <input
            id='search-input'
            ref={inputRef}
            placeholder='Buscar equipos, hardware o herramientas digitales...'
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            className='close-search'
            type='button'
            onClick={onClose}
            aria-label='Cerrar búsqueda'
          >
            <X size={18} />
          </button>
        </div>

        {/* Category Filter Pills */}
        <div
          style={{
            display: "flex",
            gap: 8,
            padding: "10px 20px",
            borderBottom: "1px solid rgba(0,0,0,0.06)",
            background: "#f9f9fb",
          }}
        >
          <button
            type='button'
            onClick={() => setCategoryFilter("all")}
            style={{
              border: "none",
              background: categoryFilter === "all" ? "#0071e3" : "transparent",
              color: categoryFilter === "all" ? "#fff" : "#666",
              padding: "4px 12px",
              borderRadius: 9999,
              fontSize: "0.78rem",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Todos ({products.length})
          </button>
          <button
            type='button'
            onClick={() => setCategoryFilter("hardware")}
            style={{
              border: "none",
              background: categoryFilter === "hardware" ? "#0071e3" : "transparent",
              color: categoryFilter === "hardware" ? "#fff" : "#666",
              padding: "4px 12px",
              borderRadius: 9999,
              fontSize: "0.78rem",
              fontWeight: 600,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 4,
            }}
          >
            <Cpu size={12} />
            Hardware
          </button>
          <button
            type='button'
            onClick={() => setCategoryFilter("digital")}
            style={{
              border: "none",
              background: categoryFilter === "digital" ? "#0071e3" : "transparent",
              color: categoryFilter === "digital" ? "#fff" : "#666",
              padding: "4px 12px",
              borderRadius: 9999,
              fontSize: "0.78rem",
              fontWeight: 600,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 4,
            }}
          >
            <Package size={12} />
            Activos Digitales
          </button>
        </div>

        {/* Results List */}
        <div className='search-results'>
          {loading && (
            <p style={{ textAlign: "center", color: "#8e8e93", padding: "20px 0", fontSize: "0.9rem" }}>
              Buscando en eParadise...
            </p>
          )}

          {!loading && filtered.length === 0 && (
            <div style={{ textAlign: "center", padding: "30px 20px", color: "#6e6e73" }}>
              <p style={{ fontWeight: 600, marginBottom: 4 }}>No se encontraron resultados</p>
              <p style={{ fontSize: "0.82rem" }}>
                Intenta con términos como &quot;JBL&quot;, &quot;Excel&quot;, &quot;Teclado&quot; o &quot;SaaS&quot;
              </p>
            </div>
          )}

          {!loading &&
            filtered.map((product) => (
              <Link
                key={product.id || product.slug}
                href={`/articulo/${product.slug}`}
                className='search-item'
                onClick={onClose}
              >
                <img
                  src={product.imagen_url || "/img/icono.png"}
                  alt={product.titulo}
                />
                <div className='search-item-info' style={{ flex: 1 }}>
                  <h4>{product.titulo}</h4>
                  <p>{product.resumen}</p>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    color: "#0071e3",
                  }}
                >
                  <span>{product.tipo === "amazon" ? "Hardware" : "Digital"}</span>
                  <ArrowRight size={14} />
                </div>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
}
