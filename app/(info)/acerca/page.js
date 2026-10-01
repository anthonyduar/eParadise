import Link from "next/link";
import { Cpu, Layers, ShieldCheck, ArrowRight, ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Acerca de eParadise | Innovación & Tecnología",
  description: "Conoce más sobre eParadise, nuestra visión y el estándar de excelencia en hardware y activos digitales.",
};

export default function AboutPage() {
  return (
    <main className='secondary-page-container'>
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
          Diseñamos y curamos tecnología avanzada para profesionales, creadores y desarrolladores que buscan escalar sus proyectos sin límites.
        </p>
      </header>

      {/* 3 Core Pillars (Apple Grid) */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: 20,
          marginBottom: 60,
        }}
      >
        <div
          style={{
            background: "#ffffff",
            padding: 30,
            borderRadius: 24,
            border: "1px solid rgba(0,0,0,0.06)",
            boxShadow: "0 10px 30px rgba(0,0,0,0.03)",
          }}
        >
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 12,
              background: "rgba(0,113,227,0.08)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#0071e3",
              marginBottom: 16,
            }}
          >
            <Cpu size={22} />
          </div>
          <h3 style={{ fontSize: "1.2rem", fontWeight: 700, marginBottom: 8, color: "#111113" }}>
            Hardware de Alta Gama
          </h3>
          <p style={{ fontSize: "0.9rem", color: "#6e6e73", lineHeight: 1.6 }}>
            Seleccionamos únicamente equipos probados para máxima durabilidad, ergonomía y rendimiento acústico o visual superior.
          </p>
        </div>

        <div
          style={{
            background: "#ffffff",
            padding: 30,
            borderRadius: 24,
            border: "1px solid rgba(0,0,0,0.06)",
            boxShadow: "0 10px 30px rgba(0,0,0,0.03)",
          }}
        >
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 12,
              background: "rgba(131,58,180,0.08)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#833ab4",
              marginBottom: 16,
            }}
          >
            <Layers size={22} />
          </div>
          <h3 style={{ fontSize: "1.2rem", fontWeight: 700, marginBottom: 8, color: "#111113" }}>
            Ecosistema Digital
          </h3>
          <p style={{ fontSize: "0.9rem", color: "#6e6e73", lineHeight: 1.6 }}>
            Herramientas automatizadas como Excel Pro Cleaner, plantillas SaaS y librerías de shaders creadas para multiplicar la productividad.
          </p>
        </div>

        <div
          style={{
            background: "#ffffff",
            padding: 30,
            borderRadius: 24,
            border: "1px solid rgba(0,0,0,0.06)",
            boxShadow: "0 10px 30px rgba(0,0,0,0.03)",
          }}
        >
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 12,
              background: "rgba(39,201,63,0.08)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#27c93f",
              marginBottom: 16,
            }}
          >
            <ShieldCheck size={22} />
          </div>
          <h3 style={{ fontSize: "1.2rem", fontWeight: 700, marginBottom: 8, color: "#111113" }}>
            Transparencia Total
          </h3>
          <p style={{ fontSize: "0.9rem", color: "#6e6e73", lineHeight: 1.6 }}>
            Operamos con pasarelas certificadas y plataformas globales líderes como Amazon Services LLC y Payhip para total tranquilidad.
          </p>
        </div>
      </div>

      {/* Callout */}
      <div
        style={{
          textAlign: "center",
          background: "#ffffff",
          border: "1px solid rgba(0, 0, 0, 0.06)",
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.03)",
          color: "#1d1d1f",
          padding: "48px 30px",
          borderRadius: 28,
        }}
      >
        <h2 style={{ fontSize: "1.8rem", fontWeight: 800, marginBottom: 12, letterSpacing: "-0.02em", color: "#1d1d1f" }}>
          Descubre el nuevo estándar de eParadise
        </h2>
        <p style={{ color: "#6e6e73", maxWidth: 540, margin: "0 auto 24px", fontSize: "0.95rem" }}>
          Explora nuestros equipos insignia o ponte en contacto con nuestro equipo para asesoramiento personalizado.
        </p>
        <div style={{ display: "flex", justifyContent: "center", gap: 14, flexWrap: "wrap" }}>
          <Link href='/fisicos' className='btn-apple-primary'>
            <span>Ver Hardware</span>
            <ArrowRight size={16} />
          </Link>
          <Link
            href='/contacto'
            className='btn-apple-glass'
            style={{ background: "#ffffff", color: "#1d1d1f", borderColor: "rgba(0,0,0,0.12)" }}
          >
            <span>Contactar</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
