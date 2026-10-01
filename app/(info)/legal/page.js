import Link from "next/link";
import { ShieldCheck, FileText, Lock, ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Avisos Legales | eParadise",
  description: "Transparencia, políticas de privacidad y términos de afiliación de eParadise.",
};

export default function LegalPage() {
  return (
    <main className='secondary-page-container' style={{ maxWidth: 840 }}>
      <div style={{ marginBottom: 20 }}>
        <Link
          href='/'
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            fontSize: "0.85rem",
            color: "#0071e3",
            textDecoration: "none",
            fontWeight: 600,
          }}
        >
          <ArrowLeft size={16} />
          <span>Volver al inicio</span>
        </Link>
      </div>

      <header className='secondary-hero-header' style={{ marginBottom: 40 }}>
        <span
          style={{
            fontSize: "0.75rem",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.14em",
            color: "#0071e3",
            marginBottom: 8,
            display: "inline-block",
          }}
        >
          Transparencia & Confianza
        </span>
        <h1 className='secondary-hero-title'>Avisos Legales</h1>
        <p className='secondary-hero-sub'>
          Información clara sobre la operativa comercial, privacidad y términos de los productos ofertados en eParadise.
        </p>
      </header>

      <div style={{ display: "flex", flexDirection: "column", gap: 24, marginBottom: 48 }}>
        {/* Section 1 */}
        <div
          style={{
            background: "#ffffff",
            padding: "28px 32px",
            borderRadius: 24,
            border: "1px solid rgba(0,0,0,0.06)",
            boxShadow: "0 8px 30px rgba(0,0,0,0.03)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
            <Lock size={20} color='#0071e3' />
            <h2 style={{ fontSize: "1.25rem", fontWeight: 700, color: "#111113", margin: 0 }}>
              Política de Privacidad
            </h2>
          </div>
          <p style={{ fontSize: "0.95rem", color: "#55555d", lineHeight: 1.7 }}>
            En <strong>eParadise</strong> protegemos rigurosamente tus datos personales. No comercializamos, alquilamos ni transferimos información identificable a terceros. Los datos recopilados a través de formularios de contacto se utilizan exclusivamente para responder tus dudas y prestar servicio de asistencia.
          </p>
        </div>

        {/* Section 2 */}
        <div
          style={{
            background: "#ffffff",
            padding: "28px 32px",
            borderRadius: 24,
            border: "1px solid rgba(0,0,0,0.06)",
            boxShadow: "0 8px 30px rgba(0,0,0,0.03)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
            <FileText size={20} color='#0071e3' />
            <h2 style={{ fontSize: "1.25rem", fontWeight: 700, color: "#111113", margin: 0 }}>
              Términos y Gestión de Compras
            </h2>
          </div>
          <p style={{ fontSize: "0.95rem", color: "#55555d", lineHeight: 1.7, marginBottom: 14 }}>
            <strong>Activos Digitales (Payhip):</strong> La adquisición de plantillas, software, scripts y guías se canaliza mediante Payhip con entrega digital inmediata y encriptación SSL de grado bancario.
          </p>
          <p style={{ fontSize: "0.95rem", color: "#55555d", lineHeight: 1.7 }}>
            <strong>Equipos de Hardware (Amazon Afiliados):</strong> eParadise participa en el Programa de Afiliados de la Unión Europea y América de Amazon. Los enlaces dirigidos a Amazon generan una pequeña comisión para mantener la plataforma sin costo adicional para el comprador. Cualquier trámite logístico, garantía o devolución se rige por las políticas del distribuidor oficial en Amazon.
          </p>
        </div>

        {/* Section 3 */}
        <div
          style={{
            background: "#ffffff",
            padding: "28px 32px",
            borderRadius: 24,
            border: "1px solid rgba(0,0,0,0.06)",
            boxShadow: "0 8px 30px rgba(0,0,0,0.03)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
            <ShieldCheck size={20} color='#0071e3' />
            <h2 style={{ fontSize: "1.25rem", fontWeight: 700, color: "#111113", margin: 0 }}>
              Política de Cookies
            </h2>
          </div>
          <p style={{ fontSize: "0.95rem", color: "#55555d", lineHeight: 1.7 }}>
            Utilizamos únicamente cookies técnicas imprescindibles para garantizar la fluidez de navegación, la memoria de sesión del carrito de compras y la seguridad de la infraestructura. Puedes configurar tu navegador para bloquear las cookies si así lo prefieres.
          </p>
        </div>
      </div>
    </main>
  );
}
