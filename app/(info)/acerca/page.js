export const metadata = {
  title: "Acerca de eParadise | Innovación & Tecnología",
  description: "Conoce más sobre eParadise, nuestra visión y el estándar de excelencia en hardware, software y ebooks.",
};

export default function AboutPage() {
  return (
    <main className='apple-subpage-wrapper'>
      {/* 1. Título grande arriba con fondo blanco estilo Sección 1 del Home, sin botón de volver atrás */}
      <header className='apple-subpage-hero'>
        <h1 className='apple-subpage-title'>Acerca de eParadise</h1>
        <p className='apple-subpage-subhead'>
          Tu puente hacia la innovación tecnológica para conectar con herramientas confiables, soluciones de software y el ecosistema digital que necesitas.
        </p>
      </header>

      {/* 2. Franja gris clara divisoria como en el Home */}
      <div className='apple-divider-strip' />

      {/* 3. Lienzo predominantemente blanco con franja gris alrededor */}
      <section className='apple-canvas-page-section'>
        <div className='apple-canvas-container'>
          <div
            style={{
              color: "#333336",
              fontSize: "1.05rem",
              lineHeight: 1.8,
              textAlign: "justify",
              textJustify: "inter-word",
              display: "flex",
              flexDirection: "column",
              gap: 20,
            }}
          >
            <p style={{ margin: 0, textAlign: "justify" }}>
              <strong>eParadise</strong> nace con el propósito de acercar lo mejor de la innovación tecnológica, el desarrollo de software especializado y el conocimiento digital a profesionales, creadores y entusiastas que buscan herramientas confiables de alto rendimiento.
            </p>
            <p style={{ margin: 0, textAlign: "justify" }}>
              Nuestro catálogo reúne una selección rigurosa en tres áreas clave: <strong>Hardware</strong> de vanguardia evaluado por su calidad constructiva, ergonomía y desempeño; soluciones de <strong>Software</strong> diseñadas para automatizar procesos y multiplicar la productividad; y una biblioteca de <strong>Ebooks</strong> orientada al aprendizaje práctico y la actualización continua.
            </p>
            <p style={{ margin: 0, textAlign: "justify" }}>
              En eParadise priorizamos la transparencia, la claridad técnica y la seguridad en cada recomendación. Por ello, todas las adquisiciones se gestionan a través de plataformas globales líderes y certificadas como <strong>Amazon</strong> y <strong>Payhip</strong>, garantizando respaldo al comprador, entregas verificadas y acceso digital inmediato.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
