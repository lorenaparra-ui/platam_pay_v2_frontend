import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type { ConfigData, ConfigStore, ConfigStoreState } from "@/types/config.types";
import { fetchConfigData } from "@/services/config.service";

const initialState: ConfigStoreState = {
  data: {
    documentTypes: [],
    businessTypes: [],
    businessSeniority: [],
    cities: [],
    phoneCodes: [],
  },
  loading: false,
  error: null,
  initialized: false,
};

/**
 * Store global de configuración (datos transversales).
 * - Solo se hidrata en el cliente; consumir desde Client Components.
 * - initializeConfig() se ejecuta una vez desde el layout (ConfigInitializer).
 */
export const useConfigStore = create<ConfigStore>()(
  devtools(
    (set, get) => ({
      ...initialState,

      setData: (data) =>
        set(
          (state) => ({ data: { ...state.data, ...data } }),
          undefined,
          "config/setData"
        ),

      setLoading: (loading) =>
        set({ loading }, undefined, "config/setLoading"),

      setError: (error) => set({ error }, undefined, "config/setError"),

      reset: () => set(initialState, undefined, "config/reset"),

      initializeConfig: async () => {
        const { initialized, loading } = get();
        if (initialized || loading) return;

        set({ loading: true, error: null }, undefined, "config/initializeConfig/pending");

        try {
          const data = await fetchConfigData();
          set(
            { data, loading: false, error: null, initialized: true },
            undefined,
            "config/initializeConfig/fulfilled"
          );
        } catch (err) {
          const message =
            err instanceof Error ? err.message : "Error al cargar la configuración";
          set(
            { loading: false, error: message, initialized: true },
            undefined,
            "config/initializeConfig/rejected"
          );
        }
      },
    }),
    { name: "ConfigStore" }
  )
);

/**
 * Hook de conveniencia: misma forma que el antiguo useConfigData (Context).
 * Consume el store directamente; para uso en Client Components.
 */
export function useConfigData(): ConfigData & { loading: boolean } {
  const data = useConfigStore((state) => state.data);
  const loading = useConfigStore((state) => state.loading);
  return { ...data, loading };
}
