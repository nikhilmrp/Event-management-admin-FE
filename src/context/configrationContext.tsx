"use client";
import { getVendorAllTypes, VendorType } from "@/lib/api/services/configrations/vendortype";
import { createContext, useContext, useEffect, useState } from "react";

type Configurations = {
  vendorTypes: VendorType[];
};

const ConfigrationContext = createContext<Configurations | undefined>(undefined);

export const ConfigrationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [vendorTypes, setVendorTypes] = useState<VendorType[]>([]);
  const fetchVendorTypes = async () => {
    const res = await getVendorAllTypes();
    setVendorTypes(res.data);
  };

  useEffect(() => {
    fetchVendorTypes();
  }, []);

  return (
    <ConfigrationContext.Provider value={{ vendorTypes }}>{children}</ConfigrationContext.Provider>
  );
};

export const useConfigrations = () => {
  const context = useContext<Configurations | undefined>(ConfigrationContext);
  if (!context) {
    throw new Error("useConfigrations must be used within a ConfigrationProvider");
  }
  return context;
};
