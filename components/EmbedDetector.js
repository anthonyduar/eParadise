"use client";

import { useEffect } from "react";

/**
 * Detects if the page is being loaded inside an iframe or with an #embed / ?embed=true URL flag.
 * When detected, adds 'is-embedded-mode' to document.documentElement and document.body
 * to seamlessly hide global headers, footers, and banners for a clean, full-width embedded view.
 */
export default function EmbedDetector() {
  useEffect(() => {
    const applyEmbedMode = () => {
      try {
        const inIframe = typeof window !== "undefined" && window.self !== window.top;
        const hash = typeof window !== "undefined" ? window.location.hash.toLowerCase() : "";
        const search = typeof window !== "undefined" ? window.location.search.toLowerCase() : "";
        const isEmbedFlag = hash.includes("embed") || search.includes("embed");

        if (inIframe || isEmbedFlag) {
          document.documentElement.classList.add("is-embedded-mode");
          document.body.classList.add("is-embedded-mode");
        } else {
          document.documentElement.classList.remove("is-embedded-mode");
          document.body.classList.remove("is-embedded-mode");
        }
      } catch {
        // Cross-origin iframe security restriction means we are definitely in an iframe
        document.documentElement.classList.add("is-embedded-mode");
        document.body.classList.add("is-embedded-mode");
      }
    };

    applyEmbedMode();
    window.addEventListener("hashchange", applyEmbedMode);
    return () => window.removeEventListener("hashchange", applyEmbedMode);
  }, []);

  return null;
}
