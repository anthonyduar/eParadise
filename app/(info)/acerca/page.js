import Link from "next/link";

export const metadata = { title: "Acerca de | eParadise" };

export default function AboutPage() {
  return (
    <InfoPage
      title='Acerca de eParadise'
      subtitle='Innovación, tecnología y calidad al alcance de tus manos.'
    >
      <section className='legal-section'>
        <h2>¿Quiénes Somos?</h2>
        <p>
          En <strong>eParadise</strong> somos una tienda online enfocada en
          ofrecer lo mejor en tecnología avanzada. Nuestro objetivo es conectar
          a nuestros usuarios con soluciones digitales de alto rendimiento y
          equipos físicos de última generación diseñados para escalar al
          siguiente nivel.
        </p>
      </section>
      <section className='legal-section'>
        <h2>¿Qué Ofrecemos?</h2>
        <p>
          Trabajamos bajo dos grandes categorías para suplir todas tus
          necesidades tecnológicas:
        </p>
        <p>
          <strong>Productos Digitales:</strong> Scripts, software y activos
          digitales optimizados para creadores y desarrolladores.
          <br />
          <br />
          <strong>Productos Físicos:</strong> Equipos y hardware seleccionados
          bajo estándares de calidad y afiliados a plataformas confiables.
        </p>
      </section>
      <section className='legal-section'>
        <h2>Compromiso y Transparencia</h2>
        <p>
          Nos esforzamos por brindarte un entorno seguro, rápido y transparente.
          Consulta nuestros <Link href='/legal'>Avisos Legales</Link> para
          conocer más.
        </p>
      </section>
    </InfoPage>
  );
}

function InfoPage({ title, subtitle, children }) {
  return (
    <>
      <section className='hero-simple'>
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </section>
      <main className='legal-main'>
        {children}
        <div style={{ textAlign: "center", marginTop: 40 }}>
          <Link href='/' className='btn btn-secondary'>
            ← Volver al inicio
          </Link>
        </div>
      </main>
    </>
  );
}
