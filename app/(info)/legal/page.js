import { ShieldCheck, FileText, Lock } from "lucide-react";

export const metadata = {
  title: "Avisos Legales | eParadise",
  description: "Transparencia, políticas de privacidad y términos de afiliación de eParadise.",
};

export default function LegalPage() {
  return (
    <main className='apple-subpage-wrapper'>
      {/* 1. Título grande arriba con fondo blanco, texto flotante y la imagen llega cerca de la separación gris */}
      <header className='apple-subpage-hero'>
        <div className='apple-subpage-hero-content'>
          <h1 className='apple-subpage-title'>Avisos Legales</h1>
          <p className='apple-subpage-subhead'>
            Información clara sobre la operativa comercial, privacidad y términos de los productos ofertados en eParadise.
          </p>
        </div>

        {/* Imagen grande libre de contenedor, al fondo cerca de la separación gris */}
        <div className='apple-subpage-hero-stage'>
          <div className='apple-subpage-hero-figure'>
            <img
              src='/img/logotipo-gris.webp'
              alt='Avisos Legales eParadise'
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
          <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
            {/* Section 1 */}
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                <Lock size={20} color='#0071e3' />
                <h2 style={{ fontSize: "1.25rem", fontWeight: 700, color: "#111113", margin: 0 }}>
                  Política de Privacidad
                </h2>
              </div>
              <p style={{ fontSize: "0.95rem", color: "#55555d", lineHeight: 1.7, textAlign: "justify", textJustify: "inter-word" }}>
                En <strong>eParadise</strong> protegemos rigurosamente tus datos personales. No comercializamos, alquilamos ni transferimos información identificable a terceros. Los datos recopilados a través de formularios de contacto se utilizan exclusivamente para responder tus dudas y prestar servicio de asistencia.
              </p>
            </div>

            {/* Section 2 */}
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                <FileText size={20} color='#0071e3' />
                <h2 style={{ fontSize: "1.25rem", fontWeight: 700, color: "#111113", margin: 0 }}>
                  Términos y Gestión de Compras
                </h2>
              </div>
              <p style={{ fontSize: "0.95rem", color: "#55555d", lineHeight: 1.7, marginBottom: 14, textAlign: "justify", textJustify: "inter-word" }}>
                <strong>Activos Digitales (Payhip):</strong> La adquisición de plantillas, software, scripts y guías se canaliza mediante Payhip con entrega digital inmediata y encriptación SSL de grado bancario.
              </p>
              <p style={{ fontSize: "0.95rem", color: "#55555d", lineHeight: 1.7, textAlign: "justify", textJustify: "inter-word" }}>
                <strong>Equipos de Hardware (Amazon Afiliados):</strong> eParadise participa en el Programa de Afiliados de la Unión Europea y América de Amazon. Los enlaces dirigidos a Amazon generan una pequeña comisión para mantener la plataforma sin costo adicional para el comprador. Cualquier trámite logístico, garantía o devolución se rige por las políticas del distribuidor oficial en Amazon.
              </p>
            </div>

            {/* Section 3 */}
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                <ShieldCheck size={20} color='#0071e3' />
                <h2 style={{ fontSize: "1.25rem", fontWeight: 700, color: "#111113", margin: 0 }}>
                  Política de Cookies
                </h2>
              </div>
              <p style={{ fontSize: "0.95rem", color: "#55555d", lineHeight: 1.7, textAlign: "justify", textJustify: "inter-word" }}>
                Utilizamos únicamente cookies técnicas imprescindibles para garantizar la fluidez de navegación, la memoria de sesión del carrito de compras y la seguridad de la infraestructura. Puedes configurar tu navegador para bloquear las cookies si así lo prefieres.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
