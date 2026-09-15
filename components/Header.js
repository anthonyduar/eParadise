"use client";

import Link from "next/link";
import { useState } from "react";
import SearchModal from "./SearchModal";

export default function Header() {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header>
      <Link href='/' className='logo'>
        <img src='/img/logosinfondo.png' alt='eParadise' />
      </Link>
      <nav className='navbar'>
        <Link href='/' className='nav-logo' aria-label='Inicio'>
          <img src='/img/icono.png' alt='' />
        </Link>
        <div className='nav-links'>
          <Link href='/acerca'>Acerca de</Link>
          <div className='dropdown'>
            <span className='dropdown-toggle'>Productos</span>
            <div className='dropdown-menu'>
              <Link href='/fisicos'>Físicos</Link>
              <Link href='/digitales'>Digitales</Link>
            </div>
          </div>
        </div>
        <button
          className='search-btn'
          type='button'
          onClick={() => setSearchOpen(true)}
          aria-label='Buscar productos'
        >
          &#128269;
        </button>
      </nav>
      {searchOpen && <SearchModal onClose={() => setSearchOpen(false)} />}
    </header>
  );
}
