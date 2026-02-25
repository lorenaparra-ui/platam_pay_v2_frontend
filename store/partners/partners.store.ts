import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type { Partner } from "@/features/partners/interfaces";

export type PartnersStoreState = {
  partner: Partner | null;
  loading: boolean;
  error: string | null;
};

export type PartnersStoreActions = {
  setPartner: (partner: Partner | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  /** Hidrata el store con el partner inicial (desde Server Component vía Provider). */
  hydrate: (partner: Partner | null) => void;
  reset: () => void;
};

const initialState: PartnersStoreState = {
  partner: null,
  loading: false,
  error: null,
};

export type PartnersStore = PartnersStoreState & PartnersStoreActions;

export const usePartnersStore = create<PartnersStore>()(
  devtools(
    (set) => ({
      ...initialState,

      setPartner: (partner) =>
        set({ partner, error: null }, undefined, "partners/setPartner"),

      setLoading: (loading) =>
        set({ loading }, undefined, "partners/setLoading"),

      setError: (error) => set({ error }, undefined, "partners/setError"),

      hydrate: (partner) =>
        set(
          { partner, loading: false, error: null },
          undefined,
          "partners/hydrate"
        ),

      reset: () => set(initialState, undefined, "partners/reset"),
    }),
    { name: "PartnersStore" }
  )
);
