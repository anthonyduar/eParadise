import requests
import os
import re
import html as html_module
from supabase import create_client, Client

# === CONFIGURACIÓN ===
NOTION_TOKEN = os.getenv("NOTION_TOKEN")
DATABASE_ID = os.getenv("DATABASE_ID")
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

def _notion_rich_text_a_markdown(rich_text_list):
    if not rich_text_list: return ""
    partes = []
    for t in rich_text_list:
        if t.get("type") != "text": continue
        texto_obj = t.get("text") or {}
        contenido = texto_obj.get("content", "")
        anot = t.get("annotations") or {}
        
        # Aplicamos formato Markdown según anotaciones de Notion
        if anot.get("code"): contenido = f"`{contenido}`"
        if anot.get("bold"): contenido = f"_{contenido}_"
        if anot.get("italic"): contenido = f"*{contenido}*"
        if anot.get("strikethrough"): contenido = f"~~{contenido}~~"
        
        if t.get("text").get("link"):
            url = t["text"]["link"]["url"]
            contenido = f"[{contenido}]({url})"
            
        partes.append(contenido)
    return "".join(partes)

def ejecutar_generador():
    print("🔗 Sincronizando Notion con Supabase...")
    url = f"https://api.notion.com/v1/databases/{DATABASE_ID}/query"
    payload = {"filter": {"property": "Estado", "status": {"equals": "Publicar"}}}
    res = requests.post(url, json=payload, headers={"Authorization": f"Bearer {NOTION_TOKEN}", "Notion-Version": "2022-06-28"}).json()
    
    # Limpia la tabla para que no haya duplicados
    supabase.table("articulos").delete().neq("id", 0).execute()

    for page in res.get("results", []):
        p = page["properties"]
        try:
            titulo = p["Nombre"]["title"][0]["text"]["content"]
            tipo = p["Tipo"]["select"]["name"].lower()
            resumen = _notion_rich_text_a_markdown(p["Resumen"]["rich_text"])
            cuerpo = _notion_rich_text_a_markdown(p["Cuerpo"]["rich_text"])
            link = p["Link"]["url"]
            img_url = p["Imagen"]["url"]

            supabase.table("articulos").insert({
                "titulo": titulo,
                "resumen": resumen,
                "contenido": cuerpo,
                "imagen_url": img_url,
                "tipo": tipo,
                "link_compra": link,
                "slug": crear_slug(titulo)
            }).execute()
            print(f"✅ Sincronizado: {titulo}")
        except Exception as e:
            print(f"⚠️ Error: {e}")

    res_sitemap = supabase.table("articulos").select("slug").execute()
    urls = ['<url><loc>https://eparadise.vercel.app/</loc></url>', '<url><loc>https://eparadise.vercel.app/acerca</loc></url>', '<url><loc>https://eparadise.vercel.app/fisicos</loc></url>', '<url><loc>https://eparadise.vercel.app/digitales</loc></url>', '<url><loc>https://eparadise.vercel.app/contacto</loc></url>', '<url><loc>https://eparadise.vercel.app/legal</loc></url>']
    urls += [f'<url><loc>https://eparadise.vercel.app/articulo/{a["slug"]}</loc></url>' for a in res_sitemap.data if a.get("slug")]
    xml = f'<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  ' + '\n  '.join(urls) + '\n</urlset>'
    open("sitemap.xml", "w", encoding="utf-8").write(xml)

def crear_slug(texto):
    # Toma solo las primeras 3 palabras del título
    palabras = texto.split()[:3]
    texto_corto = " ".join(palabras)
    
    # Genera el slug limpio
    slug = texto_corto.lower().strip()
    slug = re.sub(r'[^\w\s-]', '', slug)
    slug = re.sub(r'[\s_-]+', '-', slug)
    return slug

if __name__ == "__main__":
    ejecutar_generador()