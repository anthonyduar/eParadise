# 🛒 eParadise | E-commerce Híbrido & Automatizado

[Ver sitio en vivo 🌐](https://eparadise.vercel.app)

**eParadise** es una tienda online moderna orientada a la comercialización de productos digitales (Payhip) y de afiliados (Amazon). Cuenta con una arquitectura de alto rendimiento donde el diseño se controla mediante código y el contenido se gestiona de forma externa y automatizada.

---

## 🎯 ¿Cómo funciona? (El Proceso de Desarrollo y Gestión)

He diseñado un flujo de trabajo híbrido que separa por completo la estructura visual de la redacción de contenidos:

1. **Diseño y Estructura (Figma a Código):** 
   - El prototipado y diseño visual se planean primero en **Figma**.
   - La implementación inicial y maquetación se desarrollan utilizando **Google IDX**.
2. **Control Local y Despliegue (VS Code & Vercel):**
   - El proyecto se traslada al entorno local manejándolo con **VS Code**.
   - Los cambios de código e interfaz se sincronizan con **GitHub** mediante commits manuales.
   - **Vercel** detecta los cambios automáticamente y despliega la tienda al instante.
3. **Gestión de Artículos y Contenido (WordPress / Pantheon):**
   - Los artículos y las reseñas de productos se redactan y gestionan desde un entorno de **WordPress alojado en Pantheon**.
   - Gracias a la integración headless, estos contenidos se sincronizan y publican de forma automatizada en el sitio desplegado en Vercel.

---

## 🚀 Tecnologías Utilizadas

* **Frontend:** Next.js (App Router), React y estilos personalizados.
* **CMS & Contenido:** WordPress (Pantheon).
* **Control de Versiones:** Git y GitHub.
* **Hosting & CI/CD:** Vercel.

---

## 🔒 Seguridad y Propiedad Intelectual

* **Arquitectura Segura:** Al tratarse de un entorno optimizado y estático/headless, se evita la exposición de vulnerabilidades, resguardando de forma segura los enlaces de afiliados de Amazon y Payhip.
* **⚠️ Aviso Legal y Licencia:** Este repositorio es exclusivamente para exhibición de portafolio profesional. Todos los derechos reservados (**All Rights Reserved**). Queda estrictamente prohibida la copia, uso, modificación, redistribución o comercialización de este código sin autorización expresa del autor.
