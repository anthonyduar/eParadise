import InstagramIcon from "@/components/InstagramIcon";
import ContactForm from "@/components/ContactForm";

export const metadata = {
  title: "Contacto | eParadise",
  description:
    "Canal oficial de contacto de eParadise. Soporte, consultas técnicas y alianzas comerciales.",
};

export default function ContactPage() {
  return (
    <main className='apple-subpage-wrapper'>
      {/* 1. Título grande arriba con fondo blanco estilo Sección 1 del Home, sin botón de volver atrás */}
      <header className='apple-subpage-hero'>
        <h1 className='apple-subpage-title'>Contacto</h1>
        <p className='apple-subpage-subhead'>
          Estamos a tu disposición para resolver dudas sobre productos, pedidos o licenciamiento digital.
        </p>

        {/* Imagen grande en la misma posición que los carruseles de catálogo */}
        <div className='apple-subpage-hero-image-box'>
          <img
            src='/img/contacto.webp'
            alt='Contacto eParadise'
            className='apple-subpage-hero-static-img'
          />
        </div>
      </header>

      {/* 2. Franja gris clara divisoria como en el Home */}
      <div className='apple-divider-strip' />

      {/* 3. Lienzo predominantemente blanco con franja gris alrededor */}
      <section className='apple-canvas-page-section'>
        <div className='apple-canvas-container' style={{ maxWidth: 840 }}>
          <a
            href='https://www.instagram.com/eparadiseve/'
            target='_blank'
            rel='noopener noreferrer'
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              background:
                "linear-gradient(90deg, rgba(225, 48, 108, 0.08) 0%, rgba(131, 58, 180, 0.08) 100%)",
              border: "1px solid rgba(225, 48, 108, 0.25)",
              padding: "16px 20px",
              borderRadius: 16,
              marginBottom: 32,
              textDecoration: "none",
              color: "#111113",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <div
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: 10,
                  background:
                    "linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#fff",
                }}
              >
                <InstagramIcon size={20} color='#fff' />
              </div>
              <div>
                <p style={{ fontWeight: 700, fontSize: "0.95rem", margin: 0 }}>
                  Canal Directo en Instagram
                </p>
                <p style={{ fontSize: "0.8rem", color: "#6e6e73", margin: 0 }}>
                  Escríbenos por mensaje directo a @eparadiseve para atención inmediata
                </p>
              </div>
            </div>
            <span
              style={{ fontSize: "0.82rem", fontWeight: 600, color: "#e1306c" }}
            >
              Abrir Chat →
            </span>
          </a>

          <div>
            <h2
              style={{
                fontSize: "1.35rem",
                fontWeight: 700,
                marginBottom: 20,
                color: "#111113",
              }}
            >
              Envíanos un Mensaje
            </h2>
            <ContactForm />
          </div>
        </div>
      </section>
    </main>
  );
}
