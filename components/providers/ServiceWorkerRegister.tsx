"use client";

import { useEffect } from "react";

/**
 * Registers the PWA service worker. Only runs in production builds, since a
 * service worker in dev interferes with hot reloading and asset caching.
 */
export function ServiceWorkerRegister() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") {
      return;
    }

    if (!("serviceWorker" in navigator)) {
      return;
    }

    const register = () => {
      navigator.serviceWorker
        .register("/sw.js")
        .catch((error) => {
          console.error("Service worker registration failed:", error);
        });
    };

    // Register after load so it doesn't compete with the initial page render.
    if (document.readyState === "complete") {
      register();
    } else {
      window.addEventListener("load", register);
      return () => window.removeEventListener("load", register);
    }
  }, []);

  return null;
}
