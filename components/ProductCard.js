import Link from "next/link";
import Image from "next/image"; // 👈 1. Importamos el optimizador de Next.js

export default function ProductCard({ product }) {
  return (
    <article className='card'>
      {/* Contenedor relativo para controlar el tamaño de la imagen en la card */}
      <div style={{ position: "relative", width: "100%", height: "200px", overflow: "hidden", borderRadius: "10px 10px 0 0" }}>
        {/* 👈 2. Cambiamos la etiqueta <img> vieja por <Image /> */}
        <Image 
          src={product.imagen_url || "/img/logo.png"} 
          alt={product.titulo}
          fill // Hace que la imagen se adapte perfectamente al tamaño de la caja de la card
          sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw' // Optimiza la descarga según el tamaño de la pantalla
          style={{ objectFit: "cover" }} // Mantiene la imagen bien recortada sin deformarse
          priority={false} // Se deja en false (lazy) para que solo carguen las imágenes que el usuario ve al hacer scroll
        />
      </div>
      <div className='card-info'>
        <h3>{product.titulo}</h3>
        <p>{product.resumen}</p>
        <div className='card-buttons'>
          <Link
            href={`/articulo/${product.slug}`}
            className='btn btn-secondary'
          >
            Ver más
          </Link>
          <a
            href={product.link_compra}
            target='_blank'
            rel='noopener noreferrer'
            className={`btn btn-primary ${product.tipo}`}
          >
            Comprar
          </a>
        </div>
      </div>
    </article>
  );
}
