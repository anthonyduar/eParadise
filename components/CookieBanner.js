"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { X } from "lucide-react";

const STORAGE_KEY = "eparadise_cookie_consent";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const consent = localStorage.getItem(STORAGE_KEY);
      if (!consent) {
        setVisible(true);
      }
    } catch {
      setVisible(true);
    }
  }, []);

  const handleAccept = () => {
    try {
      localStorage.setItem(STORAGE_KEY, "accepted");
    } catch {
      // Ignorar si localStorage está restringido
    }
    setVisible(false);
  };

  const handleClose = () => {
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <aside
      className='eparadise-cookie-banner'
      role='dialog'
      aria-live='polite'
      aria-label='Aviso de privacidad y cookies'
    >
      <div className='cookie-banner-top'>
        <span className='cookie-banner-tag'>PRIVACIDAD</span>
        <button
          type='button'
          className='cookie-banner-close'
          onClick={handleClose}
          aria-label='Cerrar aviso de cookies'
        >
          <X size={16} />
        </button>
      </div>

      <p className='cookie-banner-text'>
        Utilizamos cookies para mejorar tu experiencia y analizar el tráfico.
      </p>

      <div className='cookie-banner-actions'>
        <Link
          href='/legal'
          className='cookie-banner-policy'
          onClick={handleClose}
        >
          VER POLÍTICA
        </Link>

        <button
          type='button'
          className='cookie-banner-accept'
          onClick={handleAccept}
        >
          ACEPTAR
        </button>
      </div>
    </aside>
  );
}
