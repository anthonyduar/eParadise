import Link from "next/link";

export const metadata = { title: "Avisos Legales | eParadise" };

export default function LegalPage() {
  return (
    <>
      <section className='hero-simple'>
        <h1>Avisos Legales</h1>
        <p>Transparencia y seguridad en cada una de tus compras.</p>
      </section>
      <main className='legal-main'>
        <section className='legal-section'>
          <h2>Política de Privacidad</h2>
          <p>
            En <strong>eParadise</strong>, protegemos tus datos personales. No
            compartimos tus datos con terceros, salvo para fines logísticos y
            pagos seguros.
          </p>
        </section>
        <section className='legal-section'>
          <h2>Política de Cookies</h2>
          <p>
            Este sitio utiliza cookies técnicas y de análisis para mejorar la
            experiencia del usuario. Puedes desactivarlas desde la configuración
            de tu navegador.
          </p>
        </section>
        <section className='legal-section'>
          <h2>Términos y Condiciones</h2>
          <p>
            <strong>Gestión de Compras:</strong> eParadise facilita enlaces a
            plataformas externas. Toda transacción se realiza bajo las políticas
            de Payhip o Amazon.
          </p>
          <p>
            <strong>Productos Físicos:</strong> eParadise participa en el
            Programa de Afiliados de Amazon. Cualquier reclamación debe
            tramitarse directamente a través de Amazon.
          </p>
        </section>
        <div style={{ textAlign: "center", marginTop: 40 }}>
          <Link href='/' className='btn btn-secondary'>
            ← Volver al inicio
          </Link>
        </div>
      </main>
    </>
  );
}
