import type { Option } from "@/interfaces/form";

/**
 * Datos de configuración transversal que se cargan al iniciar la app.
 * Usado en formularios (tipos de documento, ciudades, CIIU, etc.).
 */
export interface ConfigData {
  documentTypes: Option[];
  businessTypes: Option[];
  businessSeniority: Option[];
  cities: Option[];
  phoneCodes: Option[];
}

/**
 * Estado estándar de un slice con data + loading + error + initialized.
 * Patrón reutilizable para cualquier store que cargue datos asincrónicos.
 */
export interface SliceState<T> {
  data: T;
  loading: boolean;
  error: string | null;
  initialized: boolean;
}

/**
 * Estado completo del store de configuración.
 */
export type ConfigStoreState = SliceState<ConfigData>;

/**
 * Acciones del store de configuración.
 */
export interface ConfigStoreActions {
  setData: (data: Partial<ConfigData>) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  reset: () => void;
  /** Carga datos iniciales una sola vez; evita ejecuciones duplicadas. */
  initializeConfig: () => Promise<void>;
}

export type ConfigStore = ConfigStoreState & ConfigStoreActions;
