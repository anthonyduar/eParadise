"use client";

import { useEffect } from "react";

/**
 * Detects if the page is being loaded inside an iframe or with an #embed / ?embed=true URL flag.
 * When in embedded mode:
 * 1. Adds 'is-embedded-mode' to document.documentElement and document.body
 * 2. Hides headers, footers, cookie banners
 * 3. Removes all internal scrollbars (overflow: visible) so the parent modal handles 100% of scrolling
 * 4. Posts real-time content height messages to the parent window (type: 'eparadise-resize')
 *    so the parent iframe can automatically expand to fit the embedded content.
 */
export default function EmbedDetector() {
  useEffect(() => {
    const isEmbed = () => {
      try {
        const inIframe =
          typeof window !== "undefined" && window.self !== window.top;
        const hash =
          typeof window !== "undefined"
            ? window.location.hash.toLowerCase()
            : "";
        const search =
          typeof window !== "undefined"
            ? window.location.search.toLowerCase()
            : "";
        return inIframe || hash.includes("embed") || search.includes("embed");
      } catch {
        return true;
      }
    };

    if (isEmbed()) {
      document.documentElement.classList.add("is-embedded-mode");
      document.body.classList.add("is-embedded-mode");

      // Calcula la altura real total de todo el contenido hasta abajo
      const postHeight = () => {
        try {
          const body = document.body;
          const html = document.documentElement;
          if (!body || !html) return;

          const article = document.getElementById("art-cuerpo");
          const height = article
            ? Math.ceil(article.getBoundingClientRect().bottom + window.scrollY)
            : Math.max(
                body.scrollHeight,
                body.offsetHeight,
                html.clientHeight,
                html.scrollHeight,
                html.offsetHeight,
              );

          if (window.parent && window.parent !== window) {
            window.parent.postMessage(
              {
                type: "eparadise-resize",
                height,
                source: "eparadise",
              },
              "*",
            );
          }
        } catch {
          // ignore cross-origin errors
        }
      };

      // Envío inmediato y sincronizado con carga de fuentes e imágenes
      postHeight();
      const t1 = setTimeout(postHeight, 200);
      const t2 = setTimeout(postHeight, 600);
      const t3 = setTimeout(postHeight, 1500);
      const t4 = setTimeout(postHeight, 3000);

      // ResizeObserver para detectar cualquier cambio dinámico de tamaño
      let observer;
      if (typeof ResizeObserver !== "undefined" && document.body) {
        observer = new ResizeObserver(() => {
          postHeight();
        });
        observer.observe(document.body);
      }

      window.addEventListener("resize", postHeight);

      // También responde a solicitudes de altura desde el padre
      const handleParentMessage = (event) => {
        if (event.data === "eparadise-request-height") {
          postHeight();
        }
      };
      window.addEventListener("message", handleParentMessage);

      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
        clearTimeout(t3);
        clearTimeout(t4);
        if (observer) observer.disconnect();
        window.removeEventListener("resize", postHeight);
        window.removeEventListener("message", handleParentMessage);
      };
    } else {
      document.documentElement.classList.remove("is-embedded-mode");
      document.body.classList.remove("is-embedded-mode");
    }
  }, []);

  return null;
}
