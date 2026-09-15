import { Client } from "@notionhq/client";

// Inicialización oficial de la SDK
const notion = new Client({ auth: process.env.NOTION_TOKEN });

function getRichText(property) {
  return property?.rich_text?.map((item) => item.plain_text).join("") || "";
}

export async function getProducts() {
  try {
    const database = await notion.databases.retrieve({
      database_id: process.env.NOTION_DATABASE_ID,
    });
    const dataSourceId = database.data_sources?.[0]?.id;

    if (!dataSourceId) {
      throw new Error("La base de datos no contiene ningún data source");
    }

    const response = await notion.dataSources.query({
      data_source_id: dataSourceId,
      filter: {
        property: "Estado",
        status: {
          equals: "Publicar",
        },
      },
    });

    return response.results.map((page) => {
      const props = page.properties;

      let imagenUrl = "";
      if (props.Imagen) {
        if (props.Imagen.type === "files" && props.Imagen.files?.length > 0) {
          imagenUrl =
            props.Imagen.files[0]?.file?.url ||
            props.Imagen.files[0]?.external?.url ||
            "";
        } else if (props.Imagen.type === "url") {
          imagenUrl = props.Imagen.url || "";
        } else if (props.Imagen.type === "rich_text") {
          imagenUrl = getRichText(props.Imagen);
        }
      }

      return {
        id: page.id,
        titulo: props.Nombre?.title?.[0]?.plain_text || "Producto sin nombre",
        resumen: getRichText(props.Resumen),
        cuerpo: getRichText(props.Cuerpo),
        imagen_url: imagenUrl,
        tipo: props.Tipo?.select?.name?.toLowerCase().trim() || "",
        link_compra: props.Link?.url || getRichText(props.Link) || "#",
        slug: page.id,
        created_at: props.Fecha?.date?.start || new Date().toISOString(),
      };
    });
  } catch (error) {
    console.error(
      "Error crítico cargando productos de Notion:",
      error.message || error,
    );
    return [];
  }
}

export async function getProductBySlug(slug) {
  const products = await getProducts();
  return products.find((product) => product.slug === slug) ?? null;
}

export function filterProducts(products, type) {
  if (!Array.isArray(products)) return [];
  return products
    .filter((product) => product.tipo === type.toLowerCase().trim())
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
}
