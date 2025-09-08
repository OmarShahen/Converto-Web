"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { serverRequest } from "@/lib/axios";
import { useSearchParams } from "next/navigation";
import toast from "react-hot-toast";

type StoreContextType = {
  store: any | null;
  setStore: (store: any | null) => void;
  refreshStore: () => Promise<void>;
};

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider = ({ children }: { children: React.ReactNode }) => {
  const [store, setStoreState] = useState<any | null>(null);
  const searchParams = useSearchParams();
  const storeId = searchParams.get("storeId");

  useEffect(() => {
    if (storeId) {
      refreshStore();
    }
  }, [storeId]);

  const setStore = (store: any | null) => {
    setStoreState(store);
  };

  const refreshStore = async () => {
    if (!storeId) return;

    try {
      const response = await serverRequest.get(`/v1/stores/${storeId}`);
      setStore(response.data.store);
    } catch (error: any) {
      console.error("Failed to fetch store:", error);
      toast.error(error?.response?.data?.message || "Failed to fetch store");
    }
  };

  return (
    <StoreContext.Provider value={{ store, setStore, refreshStore }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used within a StoreProvider");
  return ctx;
};
