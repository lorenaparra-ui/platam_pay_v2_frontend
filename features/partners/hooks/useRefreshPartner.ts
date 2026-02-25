import { useCallback } from "react";
import { usePartnersStore } from "@/store/partners/partners.store";
import { partnerService } from "../services/partners.service";

/**
 * Hook para refrescar el partner actual desde el cliente.
 * El store no llama al servicio; este hook sí y actualiza el store.
 * Útil cuando se necesita recargar datos del partner sin recargar la página.
 */
export function useRefreshPartner(partnerId: string | undefined) {
  const setPartner = usePartnersStore((state) => state.setPartner);
  const setLoading = usePartnersStore((state) => state.setLoading);
  const setError = usePartnersStore((state) => state.setError);

  return useCallback(async () => {
    if (!partnerId) return;
    setLoading(true);
    setError(null);
    try {
      const partner = await partnerService.getById(partnerId);
      setPartner(partner);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al cargar el partner");
      setPartner(null);
    } finally {
      setLoading(false);
    }
  }, [partnerId, setPartner, setLoading, setError]);
}
