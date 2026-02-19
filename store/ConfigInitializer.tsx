"use client";

import { useEffect } from "react";
import { useConfigStore } from "./config.store";

/**
 * Client Component que ejecuta initializeConfig() al montar.
 * Montar una sola vez en app/layout.tsx. Evita doble ejecución en Strict Mode:
 * el store comprueba initialized/loading antes de hacer la petición.
 */
export function ConfigInitializer() {
  const initializeConfig = useConfigStore((state) => state.initializeConfig);

  useEffect(() => {
    initializeConfig();
  }, [initializeConfig]);

  return null;
}
