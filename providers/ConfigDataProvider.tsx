"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { transversalService } from "@/lib/services/transversal";
import { Option } from "@/interfaces/form";


interface ConfigDataContextType {
  documentTypes: Option[];
  businessTypes: Option[];
  businessSeniority: Option[];
  cities: Option[];
  fetchCities: (countryId: number) => void;
  loading: boolean;
}

const ConfigDataContext = createContext<ConfigDataContextType | undefined>(undefined);

export function ConfigDataProvider({ children }: { children: React.ReactNode }) {
  const [documentTypes, setDocumentTypes] = useState<Option[]>([]);
  const [businessTypes, setBusinessTypes] = useState<Option[]>([]);
  const [businessSeniority, setBusinessSeniority] = useState<Option[]>([]);
  const [cities, setCities] = useState<Option[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = () => {
      try {
        // Cargamos los datos estáticos del servicio
        const docs = transversalService.getAllDocumentTypes();
        const busTypes = transversalService.getAllBusinessTypes();
        const busSeniority = transversalService.getAllBusinessSeniority();
       

        setDocumentTypes(docs);
        setBusinessTypes(busTypes);
        setBusinessSeniority(busSeniority);
      } catch (error) {
        console.error("Failed to load configuration data", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const fetchCities = (countryId: number) => {
    const result = transversalService.getAllCities(countryId);
    setCities(result);
  };

  const value = {
    documentTypes,
    businessTypes,
    businessSeniority,
    cities,
    fetchCities,
    loading,
  };

  return (
    <ConfigDataContext.Provider value={value}>
      {children}
    </ConfigDataContext.Provider>
  );
}

export function useConfigData() {
  const context = useContext(ConfigDataContext);
  if (context === undefined) {
    throw new Error("useConfigData must be used within a ConfigDataProvider");
  }
  return context;
}