"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Lenis from "lenis";

export default function SmoothScroll({ children }) {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const refreshFromWordPress = () => {
      if (document.visibilityState === "visible") {
        router.refresh();
      }
    };

    window.addEventListener("focus", refreshFromWordPress);
    document.addEventListener("visibilitychange", refreshFromWordPress);

    return () => {
      window.removeEventListener("focus", refreshFromWordPress);
      document.removeEventListener("visibilitychange", refreshFromWordPress);
    };
  }, [router]);

  useEffect(() => {
    // Si la página está incrustada dentro de un iframe o con flag #embed,
    // no inicializamos Lenis para no atrapar el scroll y permitir que el modal principal haga scroll fluido
    const isEmbedded =
      typeof window !== "undefined" &&
      (window.self !== window.top ||
        window.location.hash.toLowerCase().includes("embed") ||
        new URLSearchParams(window.location.search).has("embed"));

    if (isEmbedded) return;

    // Initialize Lenis smooth scroll engine (as on landonorris.com)
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.6,
      infinite: false,
    });

    window.lenis = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    const animationFrameId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(animationFrameId);
      lenis.destroy();
      delete window.lenis;
    };
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (window.lenis) {
        window.lenis.scrollTo(0, { immediate: true });
      } else {
        window.scrollTo(0, 0);
      }
    }
  }, [pathname]);

  return <>{children}</>;
}
