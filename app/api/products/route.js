import { NextResponse } from "next/server";
import { getProducts } from "@/lib/notion";

export async function GET(request) {
  const query =
    new URL(request.url).searchParams.get("query")?.toLowerCase().trim() ?? "";
  const products = await getProducts();
  const matches = products.filter((product) =>
    `${product.titulo} ${product.resumen}`.toLowerCase().includes(query),
  );
  return NextResponse.json(matches);
}
