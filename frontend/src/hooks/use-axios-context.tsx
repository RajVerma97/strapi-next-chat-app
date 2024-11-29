"use client";
// axios-context.tsx
import React, { createContext, useContext, ReactNode } from "react";
import axios, { AxiosInstance } from "axios";
import { NEXT_PUBLIC_BACKEND } from "@/contants/constants";

// Create an Axios context with the default value as undefined
const AxiosContext = createContext<AxiosInstance | undefined>(undefined);

interface AxiosProviderProps {
  children: ReactNode;
}

// Provide Axios instance through context
export function AxiosProvider({ children }: AxiosProviderProps) {
  const axiosInstance = axios.create({
    baseURL: NEXT_PUBLIC_BACKEND,
  });

  return (
    <AxiosContext.Provider value={axiosInstance}>
      {children}
    </AxiosContext.Provider>
  );
}

// Custom hook to use Axios instance
export function useAxiosContext() {
  const context = useContext(AxiosContext);
  if (context === undefined) {
    throw new Error("useAxiosContext must be used within an AxiosProvider");
  }
  return context;
}
