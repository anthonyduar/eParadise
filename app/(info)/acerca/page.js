import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Acerca de eParadise | Innovación & Tecnología",
  description: "Conoce más sobre eParadise, nuestra visión y el estándar de excelencia en hardware, software y ebooks.",
};

export default function AboutPage() {
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

      <header className='secondary-hero-header'>
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
          Nuestra Filosofía
        </span>
        <h1 className='secondary-hero-title'>Acerca de eParadise</h1>
        <p className='secondary-hero-sub'>
Tu puente hacia la innovación tecnológica para conectar con herramientas confiables, soluciones de software y el ecosistema digital que necesitas.</p>
      </header>

      <div
        style={{
          background: "#ffffff",
          padding: "40px 44px",
          borderRadius: 28,
          border: "1px solid rgba(0,0,0,0.06)",
          boxShadow: "0 10px 30px rgba(0,0,0,0.03)",
          marginBottom: 48,
          color: "#55555d",
          fontSize: "1rem",
          lineHeight: 1.8,
          textAlign: "justify",
          textJustify: "inter-word",
          display: "flex",
          flexDirection: "column",
          gap: 18,
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
    </main>
  );
}
