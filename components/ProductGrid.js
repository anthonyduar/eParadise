import ProductCard from "@/components/ProductCard";

export default function ProductGrid({
  products,
  emptyMessage = "No hay productos disponibles.",
}) {
  if (!products.length)
    return (
      <p
        style={{
          textAlign: "center",
          gridColumn: "1 / -1",
          padding: "50px",
          opacity: 0.6,
        }}
      >
        {emptyMessage}
      </p>
    );
  return products.map((product) => (
    <ProductCard key={product.slug} product={product} />
  ));
}
