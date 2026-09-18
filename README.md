# 🛒 eParadise | E-commerce Híbrido & Automatizado

**[Ver sitio en vivo 🌐](https://tu-sitio.vercel.app)**

**eParadise** es una tienda online moderna que combina la venta de productos digitales (**Payhip**) y productos físicos (**Amazon Affiliates**). Es un sitio de alto rendimiento donde el diseño se controla desde código y el contenido se gestiona de forma externa mediante **Notion**.

---

## 🎯 ¿Cómo funciona? (El Proceso)

He diseñado un flujo de trabajo híbrido que separa el desarrollo visual de la gestión de contenidos:

1. **Desarrollo y Estética (VS Code):** Todo el diseño, estilos CSS y lógica visual los desarrollo en **VS Code** con asistencia de **Gemini AI**. Cuando realizo mejoras, hago un `git push` manual para actualizar la estructura de la tienda.
2. **Gestión de Contenido:** Creo cada artículo y subo los datos (Nombre, Resumen, Cuerpo, Imagen, Tipo, Fecha, Link y Estado) a mi base de datos en **Notion**.
3. **Sincronización (GitHub Actions):** Una vez que el artículo está en Notion, activo manualmente el **Workflow en GitHub**. Este proceso extrae la información y la centraliza en Supabase, lo que permite generar los archivos correspondientes manteniendo el repositorio de GitHub limpio de activos pesados.
4. **Despliegue automático:** Al finalizar la actualización en GitHub, **Vercel** detecta los cambios y publica la nueva versión de la tienda al instante, asegurando que el contenido esté siempre sincronizado.

---

## 🚀 Tecnologías Utilizadas

- **Frontend:** Next.js con App Router, React y CSS reutilizando `style.css`.
- **Gestión de Datos:** Notion API como CMS Headless y Supabase para persistencia de activos.
- **CI/CD:** GitHub Actions (Manual Run Workflow).
- **Hosting:** [Vercel](https://eparadise.vercel.app)

---

## 🔒 Seguridad y Propiedad Intelectual

- **Claves Cifradas:** Todas las credenciales críticas (`NOTION_API_KEY`, `DATABASE_ID`, `SUPABASE_KEY`) están protegidas como **GitHub Secrets**. No están visibles en el código fuente ni en el historial de despliegue.
- **Arquitectura Blindada:** Al ser un sitio estático, no existen bases de datos expuestas a vulnerabilidades, garantizando la seguridad total de los enlaces de afiliados y activos digitales.
- **⚠️ Aviso Legal y Licencia:** Este repositorio es exclusivamente para exhibición de portafolio profesional. Todos los derechos están reservados (All Rights Reserved). Queda estrictamente prohibida la copia, uso, modificación, redistribución o comercialización de este código sin autorización expresa del autor.

---

Desarrollado por [anthonyduar] - Ingeniería aplicada a la automatización de E-commerce y activos digitales.

## Desarrollo local

```bash
npm install
npm run dev
```

La aplicación queda disponible en `http://localhost:3000`. Las rutas migradas son `/`, `/acerca`, `/fisicos`, `/digitales`, `/contacto`, `/legal` y `/articulo/[slug]`.

## Conexión con WordPress / Pantheon

La capa de datos está centralizada en `lib/wordpress.js` y consulta el Custom Post Type `tienda` mediante la API REST de WordPress. Configura `WORDPRESS_URL` en `.env.local` con la URL base de tu sitio Pantheon, por ejemplo:

```bash
WORDPRESS_URL=https://tu-sitio.pantheonsite.io
```

Los productos se obtienen de `/wp-json/wp/v2/tienda?_embed` y sus campos personalizados proceden de ACF.
