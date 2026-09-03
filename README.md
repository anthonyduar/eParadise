# 🛒 eParadise | E-commerce Híbrido & Automatizado
**[Ver sitio en vivo 🌐](https://tu-sitio.vercel.app)**

**eParadise** es una tienda online moderna que combina la venta de productos digitales (**Payhip**) y productos físicos (**Amazon Affiliates**). Es un sitio de alto rendimiento donde el diseño se controla desde código y el contenido se gestiona de forma externa mediante **Notion**.

---

## 🎯 ¿Cómo funciona? (El Proceso)

He diseñado un flujo de trabajo híbrido que separa el desarrollo visual de la gestión de contenidos:

1. **Desarrollo y Estética (VS Code):** Todo el diseño, estilos CSS y lógica visual los desarrollo en **VS Code** con asistencia de **Gemini AI**. Cuando realizo mejoras, hago un `git push` manual para actualizar la estructura de la tienda.
2. **Redacción Pro con Script Propio:** Para crear artículos, uso un **panel de redacción personalizado** que desarrollé. Este envía automáticamente los datos (Nombre, Resumen, Cuerpo, Imagen, Tipo, Fecha, Link y estado) a mi base de datos en **Notion** vía API.
3. **Sincronización (GitHub Actions):** Una vez que el artículo está en Notion, activo manualmente el **Workflow en GitHub**. Este proceso extrae la información y la centraliza en Supabase, lo que permite generar los archivos correspondientes manteniendo el repositorio de GitHub limpio de activos pesados.
4. **Despliegue automático:** Al finalizar la actualización en GitHub, **Vercel** detecta los cambios y publica la nueva versión de la tienda al instante, asegurando que el contenido esté siempre sincronizado.

---

## 🚀 Tecnologías Utilizadas

* **Frontend:** HTML5, CSS3 y JavaScript (Diseño asistido por **Gemini AI**).
* **Automatización:** Script de Python para generación de contenido.
* **Gestión de Datos:** Notion API como CMS Headless y Supabase para persistencia de activos.
* **CI/CD:** GitHub Actions (Manual Run Workflow).
* **Hosting:** [Vercel](https://eparadise.vercel.app)

---

## 🔒 Seguridad y Propiedad Intelectual

* **Claves Cifradas:** Todas las credenciales críticas (`NOTION_API_KEY`, `DATABASE_ID`, `SUPABASE_KEY`) están protegidas como **GitHub Secrets**. No están visibles en el código fuente ni en el historial de despliegue.
* **Arquitectura Blindada:** Al ser un sitio estático, no existen bases de datos expuestas a vulnerabilidades, garantizando la seguridad total de los enlaces de afiliados y activos digitales.
* **⚠️ Aviso Legal y Licencia:** Este repositorio es para **exhibición de portafolio profesional**. El sistema de automatización y el código están bajo la licencia **GPL v3**. Queda estrictamente prohibida su venta o uso comercial sin autorización expresa del autor.

---
Desarrollado por [anthonyduar] - Ingeniería aplicada a la automatización de E-commerce y activos digitales.
