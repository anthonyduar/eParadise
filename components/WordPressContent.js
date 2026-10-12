import React from "react";
import ReactMarkdown from "react-markdown";

/**
 * Checks whether an anchor tag, URL, or markdown link should be transformed into an interactive iframe.
 */
export function isEmbedLink(href, attrsString = "", linkText = "") {
  if (!href || typeof href !== "string") return false;

  // 1. Explicit hash flag: #embed, #incrustar, #iframe, or #crop-X
  if (/#(?:embed|incrustar|iframe|crop)[^\s"'>]*/i.test(href)) return true;

  // 2. Query parameter: ?embed=true or ?embed=1
  if (/[?&]embed=(?:true|1)/i.test(href)) return true;

  // 3. HTML attributes
  if (attrsString) {
    if (/\bdata-embed\b/i.test(attrsString)) return true;
    if (/\bdata-interactive\b/i.test(attrsString)) return true;
    if (/rel=["']?(?:embed|interactive)["']?/i.test(attrsString)) return true;
    if (/target=["']?_embed["']?/i.test(attrsString)) return true;
    if (
      /class=["'][^"']*\b(?:embed|incrustar|wp-embed|embed-iframe|interactive-window)\b[^"']*["']/i.test(
        attrsString,
      )
    ) {
      return true;
    }
  }

  // 4. Link text or label
  if (linkText) {
    const cleanText = String(linkText).trim().toLowerCase();
    if (
      cleanText === "embed" ||
      cleanText === "incrustar" ||
      cleanText === "[embed]" ||
      cleanText === "[incrustar]" ||
      cleanText === "iframe" ||
      cleanText === "[iframe]"
    ) {
      return true;
    }
    if (
      cleanText.startsWith("embed:") ||
      cleanText.startsWith("incrustar:") ||
      cleanText.startsWith("iframe:")
    ) {
      return true;
    }
  }

  return false;
}

/**
 * Generates the HTML for the interactive cropped iframe window.
 * Configured with the exact same width as WordPress images for seamless visual continuity,
 * and with CSS clipping applied to hide the top header / navigation menu bar of the embedded site.
 */
export function createInteractiveEmbedHtml(
  rawUrl,
  title = "Ventana Interactiva",
  customCrop = null,
) {
  let cleanUrl = (rawUrl || "").trim();
  let cropPx = 65; // Desplazamiento CSS por defecto para ocultar cabecera o barra de menú superior

  // Soporte para recorte personalizado mediante el hash (ej. #embed:80px, #embed-80) o atributo
  const cropMatch = cleanUrl.match(
    /#(?:embed|incrustar|iframe|crop)[-:]?(\d+)(?:px)?/i,
  );
  if (cropMatch && cropMatch[1]) {
    cropPx = parseInt(cropMatch[1], 10);
  } else if (customCrop) {
    const num = parseInt(String(customCrop), 10);
    if (!isNaN(num) && num > 0) cropPx = num;
  }

  // Limpia el flag #embed o ?embed=true del src final del iframe para cargar la página limpia
  cleanUrl = cleanUrl
    .replace(/#(?:embed|incrustar|iframe|crop)[^\s"'>]*/i, "")
    .replace(/([?&])embed=(?:true|1)&?/i, "$1")
    .replace(/[?&]$/, "");

  let domain = "";
  try {
    const parsed = new URL(cleanUrl);
    domain = parsed.hostname.replace(/^www\./, "");
  } catch {
    const dMatch = cleanUrl.match(/^https?:\/\/([^/?#]+)/i);
    domain = dMatch ? dMatch[1].replace(/^www\./, "") : "Enlace Externo";
  }

  const safeTitle = (title || `Vista interactiva de ${domain}`)
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

  const styleAttr =
    cropPx !== 65 ? ` style="--embed-top-crop: ${cropPx}px;"` : "";

  return `
<div class="wp-interactive-embed-container"${styleAttr} data-embed-url="${cleanUrl}">
  <div class="wp-interactive-embed-header">
    <div class="wp-interactive-embed-dots">
      <span class="wp-interactive-dot dot-red"></span>
      <span class="wp-interactive-dot dot-yellow"></span>
      <span class="wp-interactive-dot dot-green"></span>
    </div>
    <div class="wp-interactive-embed-title">
      <span class="wp-interactive-badge">Ventana Interactiva</span>
      <span class="wp-interactive-domain">${domain}</span>
    </div>
    <a href="${cleanUrl}" target="_blank" rel="noopener noreferrer" class="wp-interactive-open-link" title="Abrir en ventana completa">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:middle;margin-right:4px;"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
      <span>Abrir</span>
    </a>
  </div>
  <div class="wp-interactive-crop-frame">
    <iframe
      src="${cleanUrl}"
      title="${safeTitle}"
      class="wp-interactive-iframe"
      loading="lazy"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      sandbox="allow-scripts allow-same-origin allow-popups allow-forms allow-presentation"
    ></iframe>
  </div>
</div>`.trim();
}

/**
 * Transforms WordPress content: converts designated external links into interactive cropped iframes.
 */
export function transformWordPressEmbeds(content) {
  if (!content || typeof content !== "string") return "";

  let result = content;

  // 1. Bloques de incrustación nativos de WordPress Gutenberg:
  // <figure class="wp-block-embed ..."><div class="wp-block-embed__wrapper">(<a href="...">...</a> o texto URL)</div></figure>
  result = result.replace(
    /<figure[^>]*class="[^"]*\bwp-block-embed\b[^"]*"[^>]*>[\s\S]*?<div[^>]*class="[^"]*\bwp-block-embed__wrapper\b[^"]*"[^>]*>([\s\S]*?)<\/div>[\s\S]*?<\/figure>/gi,
    (match, innerWrapper) => {
      const linkMatch = innerWrapper.match(
        /<a\b([^>]*)href=["']([^"']+)["']([^>]*)>([\s\S]*?)<\/a>/i,
      );
      if (linkMatch) {
        const [, , href, , text] = linkMatch;
        return createInteractiveEmbedHtml(
          href,
          text.replace(/<[^>]+>/g, "").trim(),
        );
      }
      const rawUrlMatch = innerWrapper.match(/(https?:\/\/[^\s<"']+)/i);
      if (rawUrlMatch) {
        return createInteractiveEmbedHtml(rawUrlMatch[1]);
      }
      return match;
    },
  );

  // 2. Párrafos que contienen un enlace marcado para incrustar: <p><a ...>...</a></p>
  result = result.replace(
    /<p(?:\s+[^>]*)?>\s*(<a\b([^>]*?)href=["']([^"']+)["']([^>]*?)>([\s\S]*?)<\/a>)\s*<\/p>/gi,
    (match, fullAnchor, beforeHref, href, afterHref, linkText) => {
      const allAttrs = `${beforeHref} ${afterHref}`;
      if (isEmbedLink(href, allAttrs, linkText)) {
        const customCrop = (allAttrs.match(
          /data-(?:top-)?crop=["']?(\d+)/i,
        ) || [])[1];
        return createInteractiveEmbedHtml(
          href,
          linkText.replace(/<[^>]+>/g, "").trim(),
          customCrop,
        );
      }
      return match;
    },
  );

  // 3. Enlaces HTML individuales marcados para incrustar: <a ...>...</a>
  result = result.replace(
    /<a\b([^>]*?)href=["']([^"']+)["']([^>]*?)>([\s\S]*?)<\/a>/gi,
    (match, beforeHref, href, afterHref, linkText) => {
      const allAttrs = `${beforeHref} ${afterHref}`;
      // Evita procesar enlaces internos ya generados para el encabezado de la ventana interactiva
      if (allAttrs.includes("wp-interactive")) return match;
      if (isEmbedLink(href, allAttrs, linkText)) {
        const customCrop = (allAttrs.match(
          /data-(?:top-)?crop=["']?(\d+)/i,
        ) || [])[1];
        return createInteractiveEmbedHtml(
          href,
          linkText.replace(/<[^>]+>/g, "").trim(),
          customCrop,
        );
      }
      return match;
    },
  );

  // 4. Enlaces en sintaxis Markdown: [texto](https://...#embed) o [embed](https://...)
  result = result.replace(
    /\[([^\]]+)\]\((https?:\/\/[^\s\)]+)\)/gi,
    (match, text, href) => {
      if (isEmbedLink(href, "", text)) {
        return createInteractiveEmbedHtml(href, text);
      }
      return match;
    },
  );

  // 5. Enlaces Markdown solos en una línea con #embed: https://...#embed
  result = result.replace(
    /(?:^|\n)\s*(https?:\/\/[^\s]+#(?:embed|incrustar|iframe)[^\s]*)\s*(?:\n|$)/gi,
    (match, href) => {
      return "\n\n" + createInteractiveEmbedHtml(href) + "\n\n";
    },
  );

  // 6. Si ya existe un iframe directo en el contenido de WordPress pero sin contenedor adaptado:
  result = result.replace(
    /<iframe\b([\s\S]*?)src=["']([^"']+)["']([\s\S]*?)>([\s\S]*?)<\/iframe>/gi,
    (match, beforeSrc, src, afterSrc) => {
      // Evita envolver si ya es parte de nuestra ventana interactiva
      if (match.includes("wp-interactive") || beforeSrc.includes("wp-interactive") || afterSrc.includes("wp-interactive")) {
        return match;
      }
      return createInteractiveEmbedHtml(src);
    },
  );

  return result;
}

/**
 * Helper to convert Markdown formatting (headings, lists, bold) if mixed inside WordPress content.
 */
function parseMixedMarkdown(text) {
  if (!text) return "";
  let formatted = text
    .replace(/^### (.*$)/gim, "<h3>$1</h3>")
    .replace(/^## (.*$)/gim, "<h2>$1</h2>")
    .replace(/^# (.*$)/gim, "<h1>$1</h1>")
    .replace(/\*\*(.*?)\*\*/gim, "<strong>$1</strong>")
    .replace(/\*(.*?)\*/gim, "<em>$1</em>");

  // Transforma listas con viñetas
  formatted = formatted.replace(/(?:^[*-] .*(?:\n|$))+/gim, (listBlock) => {
    const items = listBlock
      .trim()
      .split("\n")
      .map((line) => `<li>${line.replace(/^[*-] /, "").trim()}</li>`)
      .join("");
    return `<ul>${items}</ul>`;
  });

  return formatted;
}

/**
 * Main component to render WordPress post content in articles / modals.
 * Replaces external embed links with interactive cropped iframes.
 */
export default function WordPressContent({ content }) {
  if (!content) {
    return <p>Contenido detallado en preparación.</p>;
  }

  // Transforma los enlaces externos señalados para incrustar en ventanas interactivas
  const transformedContent = transformWordPressEmbeds(content);

  // Verifica si el contenido tiene etiquetas HTML (incluyendo las ventanas generadas o bloques Gutenberg)
  const hasHtml = /<\/?[a-z][\s\S]*>/i.test(transformedContent);

  if (hasHtml) {
    // Si contiene markdown mixto (como ## o *), lo convertimos para un renderizado visual perfecto
    const finalHtml = parseMixedMarkdown(transformedContent);
    return (
      <div
        className="wp-rendered-entry"
        dangerouslySetInnerHTML={{ __html: finalHtml }}
      />
    );
  }

  // Si es texto plano o markdown puro, renderiza con ReactMarkdown
  return (
    <div className="wp-rendered-entry">
      <ReactMarkdown>{transformedContent}</ReactMarkdown>
    </div>
  );
}
