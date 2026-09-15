import Link from "next/link";

export default function ProductCard({ product }) {
  return (
    <article className='card'>
      <img src={product.imagen_url} alt={product.titulo} />
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
