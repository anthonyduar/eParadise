"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Search, Menu, X, ChevronRight } from "lucide-react";
import InstagramIcon from "./InstagramIcon";
import SearchModal from "./SearchModal";

export default function Header() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    // Keyboard shortcut for Command+K / Ctrl+K
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (!mobileMenuOpen) return;

    const prevBodyOverflow = document.body.style.overflow;
    const prevHtmlOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    if (window.lenis) {
      window.lenis.stop();
    }

    return () => {
      document.body.style.overflow = prevBodyOverflow;
      document.documentElement.style.overflow = prevHtmlOverflow;
      if (window.lenis) {
        window.lenis.start();
      }
    };
  }, [mobileMenuOpen]);

  const handleNavClick = (sectionId) => {
    if (isHome) {
      const el = document.getElementById(sectionId);
      if (el) {
        if (window.lenis) {
          window.lenis.scrollTo(el, { offset: -60, duration: 1.2 });
        } else {
          el.scrollIntoView({ behavior: "smooth" });
        }
        setMobileMenuOpen(false);
        return;
      }
    }
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header className='apple-global-header'>
        <nav className='apple-global-nav' aria-label='Navegación Apple Global'>
          {/* Apple / eParadise Logo */}
          <Link
            href='/'
            className='apple-nav-brand'
            onClick={() => {
              if (isHome && window.lenis) {
                window.lenis.scrollTo(0, { duration: 1.2 });
              }
            }}
          >
            <img src='/img/icono.png' alt='eParadise Logo' />
            <span>eParadise</span>
          </Link>

          {/* Center Apple Links */}
          <ul className='apple-nav-links'>
            <li>
              <Link
                href='/'
                className={`apple-nav-link ${isHome ? "active" : ""}`}
                onClick={() => {
                  if (isHome && window.lenis) {
                    window.lenis.scrollTo(0, { duration: 1.2 });
                  }
                }}
              >
                Tienda
              </Link>
            </li>
            <li>
              <Link
                href='/fisicos'
                className={`apple-nav-link ${pathname === "/fisicos" ? "active" : ""}`}
              >
                Hardware
              </Link>
            </li>
            <li>
              <Link
                href='/digitales'
                className={`apple-nav-link ${pathname === "/digitales" ? "active" : ""}`}
              >
                Software
              </Link>
            </li>
            <li>
              <Link
                href='/ebooks'
                className={`apple-nav-link ${pathname === "/ebooks" ? "active" : ""}`}
              >
                Ebook
              </Link>
            </li>
            <li>
              <Link
                href='/acerca'
                className={`apple-nav-link ${pathname === "/acerca" ? "active" : ""}`}
              >
                Acerca de
              </Link>
            </li>
            <li>
              <Link
                href='/contacto'
                className={`apple-nav-link ${pathname === "/contacto" ? "active" : ""}`}
              >
                Contacto
              </Link>
            </li>
          </ul>

          {/* Right Action Tools */}
          <div className='apple-nav-actions'>
            <button
              className='btn-apple-search'
              type='button'
              onClick={() => setSearchOpen(true)}
              aria-label='Buscar en eParadise'
              title='Buscar'
            >
              <Search size={15} />
            </button>

            {/* Mobile Hamburger Button */}
            <button
              className='apple-menu-toggle'
              type='button'
              onClick={() => setMobileMenuOpen(true)}
              aria-label='Abrir menú'
            >
              <Menu size={20} />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Drawer (Apple Style) */}
      {mobileMenuOpen && (
        <div
          className='mobile-nav-drawer'
          data-lenis-prevent
          style={{ zIndex: 20000 }}
        >
          <div className='mobile-nav-header'>
            <Link href='/' className='navbar-brand' onClick={() => setMobileMenuOpen(false)}>
              <img src='/img/icono.png' alt='eParadise' className='brand-icon' />
              <span>eParadise</span>
            </Link>
            <button
              className='close-search'
              onClick={() => setMobileMenuOpen(false)}
              aria-label='Cerrar menú'
              style={{ color: "#f5f5f7", background: "rgba(255,255,255,0.12)" }}
            >
              <X size={20} />
            </button>
          </div>

          <div className='mobile-nav-links'>
            <Link href='/fisicos' onClick={() => setMobileMenuOpen(false)}>
              Hardware <span>→</span>
            </Link>
            <Link href='/digitales' onClick={() => setMobileMenuOpen(false)}>
              Software <span>→</span>
            </Link>
            <Link href='/ebooks' onClick={() => setMobileMenuOpen(false)}>
              Ebook <span>→</span>
            </Link>
            <Link href='/acerca' onClick={() => setMobileMenuOpen(false)}>
              Acerca de <span>→</span>
            </Link>
            <Link href='/contacto' onClick={() => setMobileMenuOpen(false)}>
              Contacto <span>→</span>
            </Link>
            <Link href='/legal' onClick={() => setMobileMenuOpen(false)}>
              Avisos Legales <span>→</span>
            </Link>
          </div>

          <div style={{ marginTop: "auto", paddingTop: 20, flexShrink: 0, display: "flex", flexDirection: "column", gap: 12 }}>
            <button
              className='btn-apple-pill'
              onClick={() => {
                setMobileMenuOpen(false);
                setSearchOpen(true);
              }}
              style={{ width: "100%", justifyContent: "center" }}
            >
              <Search size={16} />
              <span>Buscar en eParadise</span>
            </button>
            <a
              href='https://www.instagram.com/eparadiseve/'
              target='_blank'
              rel='noopener noreferrer'
              className='btn-apple-insta'
              style={{ width: "100%", justifyContent: "center", padding: "10px", fontSize: "0.85rem" }}
            >
              <InstagramIcon size={16} />
              <span>Seguir en Instagram @eparadiseve</span>
            </a>
          </div>
        </div>
      )}

      {/* Quick Search Spotlight Modal */}
      {searchOpen && <SearchModal onClose={() => setSearchOpen(false)} />}
    </>
  );
}
