import Link from "next/link";

export const metadata = { title: "Contacto | eParadise" };

export default function ContactPage() {
  return (
    <section className='hero'>
      <div className='contacto-container'>
        <h1>Contáctanos</h1>
        <form
          action='https://api.web3forms.com/submit'
          method='POST'
          className='contacto-form'
        >
          <input
            type='hidden'
            name='access_key'
            value='f0dbd793-0aee-4e4f-bd81-040d9411522d'
          />
          <input type='text' name='name' placeholder='Tu Nombre' required />
          <input type='email' name='email' placeholder='Tu Email' required />
          <textarea
            name='message'
            placeholder='¿Cómo podemos ayudarte?'
            rows='5'
            required
          />
          <button type='submit' className='btn-enviar'>
            Enviar Mensaje
          </button>
        </form>
        <Link href='/' className='btn-volver'>
          ← Volver al inicio
        </Link>
      </div>
    </section>
  );
}
