"use client";

import { Send } from "lucide-react";

export default function ContactForm() {
  const handleSubmit = async (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: new FormData(form),
    });
    const result = await response.json();

    if (response.ok && result.success) {
      window.alert("¡Enviado!");
      form.reset();
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: "flex", flexDirection: "column", gap: 18 }}
    >
      <input
        type='hidden'
        name='access_key'
        value='74baae1a-d4db-41e1-a29c-8b7e936794de'
      />
      <input type='hidden' name='subject' value='Mensaje de eParadise' />

      <div>
        <label
          htmlFor='contact-name'
          style={{
            display: "block",
            fontSize: "0.82rem",
            fontWeight: 600,
            color: "#555",
            marginBottom: 6,
          }}
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
          style={{
            display: "block",
            fontSize: "0.82rem",
            fontWeight: 600,
            color: "#555",
            marginBottom: 6,
          }}
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
          style={{
            display: "block",
            fontSize: "0.82rem",
            fontWeight: 600,
            color: "#555",
            marginBottom: 6,
          }}
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
        style={{
          width: "100%",
          justifyContent: "center",
          padding: "14px",
          marginTop: 8,
        }}
      >
        <span>Enviar Mensaje</span>
        <Send size={16} />
      </button>
    </form>
  );
}
