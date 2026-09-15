import Link from "next/link";

export default function Footer() {
  return (
    <footer className='site-footer'>
      <div className='footer-logo'>
        <img src='/img/logo.png' alt='eParadise Logo' />
      </div>
      <div className='footer-socials'>
        <a
          href='https://www.instagram.com/eparadiseve/'
          target='_blank'
          rel='noopener noreferrer'
          aria-label='Instagram'
        >
          Instagram
        </a>
      </div>
      <Link href='/contacto' className='btn-footer-contacto'>
        Contacto
      </Link>
      <p className='footer-copyright'>
        &copy; 2026 eParadise. Todos los derechos reservados. |{" "}
        <Link href='/legal'>Avisos Legales</Link>
      </p>
    </footer>
  );
}
