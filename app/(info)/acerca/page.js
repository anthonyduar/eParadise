export const metadata = {
  title: "Acerca de eParadise | Innovación & Tecnología",
  description: "Conoce más sobre eParadise, nuestra visión y el estándar de excelencia en hardware, software y ebooks.",
};

export default function AboutPage() {
  return (
    <main className='apple-subpage-wrapper'>
      {/* 1. Título grande arriba con fondo blanco, texto flotante y la imagen llega cerca de la separación gris */}
      <header className='apple-subpage-hero'>
        <div className='apple-subpage-hero-content'>
          <h1 className='apple-subpage-title'>Acerca de eParadise</h1>
          <p className='apple-subpage-subhead'>
            Tu puente hacia la innovación tecnológica para conectar con herramientas confiables.
          </p>
        </div>

        {/* Imagen grande libre de contenedor, al fondo cerca de la separación gris */}
        <div className='apple-subpage-hero-stage'>
          <div className='apple-subpage-hero-figure'>
            <img
              src='/img/logotipo-gris.webp'
              alt='Acerca de eParadise'
              className='apple-subpage-hero-static-img'
            />
          </div>
        </div>
      </header>

      {/* 2. Franja gris clara divisoria como en el Home */}
      <div className='apple-divider-strip' />

           {/* 3. Lienzo predominantemente blanco con franja gris alrededor */}
      <section className='apple-canvas-page-section'>
        <div className='apple-canvas-container' style={{ maxWidth: 880 }}>
          <div
            style={{
              color: "#333336",
              fontSize: "1.05rem",
              lineHeight: 1.8,
              textAlign: "justify",
              textJustify: "inter-word",
              display: "flex",
              flexDirection: "column",
              gap: 24, // Aumentado ligeramente para separar los bloques
            }}
          >
            {/* Bloque 1 */}
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <h2 style={{ fontSize: "1.3rem", fontWeight: 600, color: "#1d1d1f", display: "flex", alignItems: "center", gap: 10, margin: 0 }}>
                <ShieldCheck size={22} className="text-blue-500" style={{ color: "#0071e3" }} />
                Propósito y Origen
              </h2>
              <p style={{ margin: 0, textAlign: "justify" }}>
                <strong>eParadise</strong> nace con el propósito de acercar lo mejor de la innovación tecnológica, el desarrollo de software especializado y el conocimiento digital a profesionales, creadores y entusiastas que buscan herramientas confiables de alto rendimiento.
              </p>
            </div>

            {/* Bloque 2 */}
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <h2 style={{ fontSize: "1.3rem", fontWeight: 600, color: "#1d1d1f", display: "flex", alignItems: "center", gap: 10, margin: 0 }}>
                <Layers size={22} className="text-blue-500" style={{ color: "#0071e3" }} />
                Nuestro Catálogo
              </h2>
              <p style={{ margin: 0, textAlign: "justify" }}>
                Nuestro catálogo reúne una selección rigurosa en tres áreas clave: <strong>Hardware</strong> de vanguardia evaluado por su calidad constructiva, ergonomía y desempeño; soluciones de <strong>Software</strong> diseñadas para automatizar procesos y multiplicar la productividad; y una biblioteca de <strong>Ebooks</strong> orientada al aprendizaje práctico y la actualización continua.
              </p>
            </div>

            {/* Bloque 3 */}
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <h2 style={{ fontSize: "1.3rem", fontWeight: 600, color: "#1d1d1f", display: "flex", alignItems: "center", gap: 10, margin: 0 }}>
                <Activity size={22} className="text-blue-500" style={{ color: "#0071e3" }} />
                Transparencia y Seguridad
              </h2>
              <p style={{ margin: 0, textAlign: "justify" }}>
                En eParadise priorizamos la transparencia, la claridad técnica y la seguridad en cada recomendación. Por ello, todas las adquisiciones se gestionan a través de plataformas globales líderes y certificadas como <strong>Amazon</strong> y <strong>Payhip</strong>, garantizando respaldo al comprador, entregas verificadas y acceso digital inmediato.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

