import Link from "next/link";
import { Mail, MessageSquare, Send, ArrowLeft } from "lucide-react";
import InstagramIcon from "@/components/InstagramIcon";

export const metadata = {
  title: "Contacto | eParadise",
  description: "Canal oficial de contacto de eParadise. Soporte, consultas técnicas y alianzas comerciales.",
};

export default function ContactPage() {
  return (
    <main className='secondary-page-container' style={{ maxWidth: 780 }}>
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

      <header className='secondary-hero-header' style={{ marginBottom: 36 }}>
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
          Atención & Soporte
        </span>
        <h1 className='secondary-hero-title'>Ponte en Contacto</h1>
        <p className='secondary-hero-sub'>
          Estamos a tu disposición para resolver dudas sobre productos, pedidos o licenciamiento digital.
        </p>
      </header>

      {/* Instagram Direct Quick Action */}
      <a
        href='https://www.instagram.com/eparadiseve/'
        target='_blank'
        rel='noopener noreferrer'
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "linear-gradient(90deg, rgba(225, 48, 108, 0.08) 0%, rgba(131, 58, 180, 0.08) 100%)",
          border: "1px solid rgba(225, 48, 108, 0.25)",
          padding: "16px 20px",
          borderRadius: 20,
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
              background: "linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
            }}
          >
            <InstagramIcon size={20} color='#fff' />
          </div>
          <div>
            <p style={{ fontWeight: 700, fontSize: "0.95rem", margin: 0 }}>Canal Directo en Instagram</p>
            <p style={{ fontSize: "0.8rem", color: "#6e6e73", margin: 0 }}>Escríbenos por mensaje directo a @eparadiseve para atención inmediata</p>
          </div>
        </div>
        <span style={{ fontSize: "0.82rem", fontWeight: 600, color: "#e1306c" }}>Abrir Chat →</span>
      </a>

      {/* Form Card */}
      <div
        style={{
          background: "#ffffff",
          padding: "36px 30px",
          borderRadius: 28,
          border: "1px solid rgba(0,0,0,0.07)",
          boxShadow: "0 15px 40px rgba(0,0,0,0.04)",
        }}
      >
        <h2 style={{ fontSize: "1.3rem", fontWeight: 700, marginBottom: 20, color: "#111113" }}>
          Envíanos un Mensaje
        </h2>

                <form
          action='https://api.web3forms.com/submit'
          method='POST'
          style={{ display: "flex", flexDirection: "column", gap: 18 }}
        >
          <input
            type='hidden'
            name='access_key'
            value='74baae1a-d4db-41e1-a29c-8b7e936794de'
          />
          <input 
            type='hidden' 
            name='subject' 
            value='Mensaje de eParadise' 
          />

          <div>
            <label
              htmlFor='contact-name'
              style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "#555", marginBottom: 6 }}
            >
              Nombre Completo
            </label>
            <input
              id='contact-name'
              type='text'
              name='name'
              placeholder='Ej. Alejandro Morales'
              required
              style={{
                width: "100%",
                padding: "12px 16px",
                borderRadius: 12,
                border: "1px solid rgba(0,0,0,0.12)",
                fontSize: "0.95rem",
                fontFamily: "inherit",
                background: "#fafafc",
                outline: "none",
              }}
            />
          </div>

          <div>
            <label
              htmlFor='contact-email'
              style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "#555", marginBottom: 6 }}
            >
              Correo Electrónico
            </label>
            <input
              id='contact-email'
              type='email'
              name='email'
              placeholder='nombre@ejemplo.com'
              required
              style={{
                width: "100%",
                padding: "12px 16px",
                borderRadius: 12,
                border: "1px solid rgba(0,0,0,0.12)",
                fontSize: "0.95rem",
                fontFamily: "inherit",
                background: "#fafafc",
                outline: "none",
              }}
            />
          </div>

          <div>
            <label
              htmlFor='contact-message'
              style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "#555", marginBottom: 6 }}
            >
              ¿Cómo podemos ayudarte?
            </label>
            <textarea
              id='contact-message'
              name='message'
              placeholder='Escribe tu consulta sobre disponibilidad, compatibilidad o soporte de activos digitales...'
              rows='5'
              required
              style={{
                width: "100%",
                padding: "12px 16px",
                borderRadius: 12,
                border: "1px solid rgba(0,0,0,0.12)",
                fontSize: "0.95rem",
                fontFamily: "inherit",
                background: "#fafafc",
                outline: "none",
                resize: "vertical",
              }}
            />
          </div>

          <button
            type='submit'
            className='btn-apple-primary'
            style={{ width: "100%", justifyContent: "center", padding: "14px", marginTop: 8 }}
          >
            <span>Enviar Mensaje</span>
            <Send size={16} />
          </button>
        </form>
      </div>
    </main>
  );
}
